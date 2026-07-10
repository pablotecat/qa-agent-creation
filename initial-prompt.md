# Objetivo

Implementar agentes para un equipo de QA en modo Orchestra. Solo el Orquestador QA es invocable por el usuario; el resto de agentes se ejecutan por enrutamiento interno.

# Alcance de esta version

- Implementar solo Orquestador QA y agentes de la capa de Planificacion.
- No implementar capas de Creacion, Ejecucion y Analisis en esta iteracion.

# Aclaraciones operativas para esta iteracion

- Naming obligatorio por transicion/reintento: `{from}-to-{to}-attempt-{retry_count}-{timestamp}.json`.
- Metaartefactos obligatorios del Orquestador por sesion:
	- `manifest.json` (indice de handoffs persistidos y estado de validacion)
	- `retry_checkpoint.json` (tracking de retries por `correlation_id`)

# Reglas operativas para la creación de Agentes
- El root oficial de outputs y trazabilidad es `./tests/Documentation/`.
- Sólo el Agente QA Orchestator debe ubicarse en `.github/agents/` para uso directo por Copilot. 
- Todos los Qgentes que no sean el Orchestator se guardarán en `.github/agents/qa-team/`. El Orchestator tiene la referencia de esta carpeta para buscar los Agentes
- Responsabilidad de validacion de schema:
	- El Orquestador validar los handoffs antes de enrutar al siguiente agente.
- La persistencia oficial de handoffs es responsabilidad del Orquestador QA.
- Entrada inicial recomendada para `solicitud_qa`:
	- `.github/prompts/prompt-to-agent.md`
- Ruta canonica de persistencia de handoffs: `./tests/Documentation/handoffs/{session_id}/`.

# Copia obligatoria de archivos runtime

Despues de generar los agentes en `.github/agents/`, copiar SOLO estos archivos al proyecto objetivo.

Destino recomendado para soporte runtime: `.github/agents/qa-team/docs/`

1. `./agent-creation-files/doc/HANDOFF_SPECIFICATION.md` -> `.github/agents/qa-team/docs/HANDOFF_SPECIFICATION.md`
2. `./agent-creation-files/doc/handoff-schema.json` -> `.github/agents/qa-team/docs/handoff-schema.json`
3. `./agent-creation-files/doc/handoff-hooks-routing.md` -> `.github/agents/qa-team/docs/handoff-hooks-routing.md`
4. `./agent-creation-files/doc/QUICK_REFERENCE.md` -> `.github/agents/qa-team/docs/QUICK_REFERENCE.md`
5. `./agent-creation-files/doc/orchestration-config.json` -> `.github/agents/qa-team/docs/orchestration-config.json`
6. `./prompt-to-agent.md` -> `.github/prompts/prompt-to-agent.md`

Estos archivos SI son necesarios para el funcionamiento posterior de los agentes.

# Archivos de bootstrap (NO copiar al proyecto final)

No copiar estos archivos porque son de un solo uso durante creacion/scaffolding:

- `./initial-prompt.md`
- `./README.md`
- `./agent-creation-files/README.md`
- `./agent-creation-files/INDEX.md`
- `./agent-creation-files/IMPLEMENTATION_CHECKLIST.md`
- `./agent-creation-files/agent-templates/*`
- `./agent-creation-files/examples/*`

El objetivo es que, una vez copiados los archivos runtime, la carpeta plantilla pueda eliminarse sin romper el sistema de agentes.

# Fuente de verdad y orden de lectura obligatorio

Antes de crear o modificar cualquier agente, DEBE leerse y aplicarse este orden:

1. `./agent-creation-files/README.md` (guia principal y flujo recomendado)
2. `./agent-creation-files/doc/HANDOFF_SPECIFICATION.md` (formato hibrido de handoff)
3. `./agent-creation-files/doc/handoff-schema.json` (validacion formal de handoffs)
4. `./agent-creation-files/doc/handoff-hooks-routing.md` (routing de escaladas y anti-bucles)
5. `./agent-creation-files/IMPLEMENTATION_CHECKLIST.md` (gates de implementacion y validacion)
6. `./agent-creation-files/doc/QUICK_REFERENCE.md` (referencia rapida y checklist pre-handoff)

Despues de copiar los archivos runtime, para operacion normal de los agentes usar como fuente de verdad:

1. `.github/agents/qa-team/docs/orchestration-config.json`
2. `.github/agents/qa-team/docs/handoff-schema.json`
3. `.github/agents/qa-team/docs/HANDOFF_SPECIFICATION.md`
4. `.github/agents/qa-team/docs/handoff-hooks-routing.md`
5. `.github/agents/qa-team/docs/QUICK_REFERENCE.md`

# Reglas globales obligatorias (MUST)

- Todo handoff especializado inter-agente DEBE cumplir `.github/agents/qa-team/docs/HANDOFF_SPECIFICATION.md`.
- Todo handoff especializado inter-agente DEBE validar contra `.github/agents/qa-team/docs/handoff-schema.json` antes de enrutarse.
- Si `validation_checklist.status=failed`, NO se enruta; se registra error y se reintenta segun policy.
- Si `validation_checklist.status=warning`, se puede enrutar solo con registro de warning en trazabilidad.
- Toda escalada DEBE seguir `.github/agents/qa-team/docs/handoff-hooks-routing.md` con destino explicito y rationale.
- `feedback_hooks.if_conflict_detected` DEBE incluir `escalate_to`.
- El Orquestador usa pre-resolucion de prerequisitos por defecto.
- Todo cambio relevante DEBE resumirse en `./tests/Documentation/HANDOFF_Summary.md`.
- Todo fallo DEBE registrarse en `./tests/Documentation/escalation_log.md`.
- Ningun handoff se considera enrutado hasta que el Orquestador lo haya persistido correctamente en la ruta canonica.
- El despacho operativo del Orquestador hacia agentes subordinados NO debe usar handoff especializado completo ni mutar autoria de artefactos de dominio.
- Nunca ejecutar procesos manuales para suplir el fallo de un agente.

# Checklist minimo post-generacion

Antes de eliminar la carpeta plantilla, verificar:

1. Existen en `.github/agents/qa-team/docs/` los 4 archivos runtime (`HANDOFF_SPECIFICATION.md`, `handoff-schema.json`, `handoff-hooks-routing.md`, `QUICK_REFERENCE.md`).
2. Existe `orchestration-config.json` en `.github/agents/qa-team/docs/`.
3. Existe `.github/prompts/prompt-to-agent.md`.
4. Los agentes generados referencian rutas runtime en `.github/agents/qa-team/docs/` y no rutas `./agent-creation-files/...`.
5. El Orquestador puede validar handoffs contra `handoff-schema.json` y aplicar routing de escaladas.
6. Se puede eliminar la carpeta plantilla sin romper validacion ni trazabilidad de handoffs. La carpeta la eliminará el usuario manualmente.

# Contrato minimo del handoff

Todos los handoffs DEBEN incluir estos bloques minimos:

- `metadata`
- `context`
- `executive_summary`
- `artifacts_references`
- `delta_changes`
- `validation_checklist`
- `next_agent_instructions`
- `feedback_hooks`

Reglas adicionales de contrato:

- `delta_changes.updated_by` DEBE ser el agente especializado que genera el handoff.
- El Orquestador NO debe escribir `updated_by=orchestrator` en artifacts especializados.
- El Orquestador SI debe persistir todos los handoffs recibidos, pero NO debe mutar payload ni autoria (`from_agent`, `to_agent`, `updated_by`).
- `retry_count` se gestiona con maximo de 3 intentos.
- Si se agotan intentos, el Orquestador aborta con `status_global=blocked` (estado global del orquestador).

# Flujo de implementacion obligatorio (basado en README)

Paso 1: Crear Orquestador QA

1. Bootstrap de contexto compartido
2. Validacion previa al routing
3. Retry policy con `max_attempts=3`
4. Manejo de errores y logging
5. Hacerlo `user-invocable: true`

Paso 2: Crear Test Documentation Agent

1. Basarse en `./agent-creation-files/agent-templates/documentation.agent.md`
2. Implementar extraccion y normalizacion en Gherkin
3. Identificar gaps y dependencias
4. Validar handoff contra schema
5. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
6. Hacerlo `user-invocable: false`

Paso 3: Crear Test Planner Agent

1. Basarse en `./agent-creation-files/agent-templates/planner.agent.md`
2. Recibir handoff desde Documentation
3. Modelar cobertura y disenar suites
4. Definir precondiciones y trazabilidad
5. Validar handoff contra schema
6. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
7. Hacerlo `user-invocable: false`

Paso 4: Crear Test Prioritization Agent

1. Basarse en `./agent-creation-files/agent-templates/prioritization.agent.md`
2. Recibir handoff desde Planner
3. Evaluar riesgo y factibilidad de automatizacion
4. Balancear cobertura vs esfuerzo
5. Validar handoff contra schema
6. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
7. Hacerlo `user-invocable: false`

Paso 5: Validacion End-to-End (sólo ejecutar tras confirmación humana)

1. Ejecutar flujo completo: Documentation -> Planner -> Prioritization
2. Validar cada handoff contra schema
3. Verificar retry policy y ausencia de bucles
4. Verificar que `HANDOFF_Summary.md` y `escalation_log.md` reflejan trazabilidad completa



# Agentes del Test Team QA

0. Orquestador QA debe: seguir el template de `agent-templates/orchestrator.agent.md`

1. Capa Planificacion

- Test Documentation debe: seguir el template de `agent-templates/documentation.agent.md`
- Test Planner debe: seguir el template de `agent-templates/planner.agent.md`
- Test Prioritization debe: seguir el template de `agent-templates/prioritization.agent.md`

2. Capa Creacion (no implementada en esta version)

- Test Generator (pendiente)
- Test Automation (pendiente)
- Test Load (pendiente)

3. Capa Ejecucion (no implementada en esta version)

- Test CI/CD (pendiente)
- Test A11y (pendiente)
- Test Security (pendiente)

4. Capa Analisis (no implementada en esta version)

- Test Results (pendiente)
- Test Logs (pendiente)
- Test Dashboard (pendiente)