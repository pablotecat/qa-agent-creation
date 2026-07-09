# Objetivo

Implementar agentes para un equipo de QA en modo Orchestra. Solo el Orquestador QA es invocable por el usuario; el resto de agentes se ejecutan por enrutamiento interno.

# Alcance de esta version

- Implementar solo Orquestador QA y agentes de la capa de Planificacion.
- No implementar capas de Creacion, Ejecucion y Analisis en esta iteracion.

# Aclaraciones operativas para esta iteracion

- El root oficial de outputs y trazabilidad es `./tests/Documentation/`.
- La persistencia oficial de handoffs es responsabilidad del Orquestador QA.
- Ruta canonica de persistencia: `./tests/Documentation/handoffs/{session_id}/`.
- Naming obligatorio por transicion/reintento: `{from}-to-{to}-attempt-{n}-{timestamp}.json`.
- Metaartefactos obligatorios del Orquestador por sesion:
	- `manifest.json` (indice de handoffs persistidos y estado de validacion)
	- `retry_checkpoint.json` (tracking de retries por `correlation_id`)
- Los agentes finales deben ubicarse en `.github/agents/` para uso directo por Copilot.
- Entrada inicial recomendada para `solicitud_qa`:
	- `./qa-agent-creation/prompt-to-agent.md`
- Responsabilidad de validacion de schema:
	- El Orquestador validar los handoffs antes de enrutar al siguiente agente.

# Fuente de verdad y orden de lectura obligatorio

Antes de crear o modificar cualquier agente, DEBE leerse y aplicarse este orden:

1. `./agent-creation-files/README.md` (guia principal y flujo recomendado)
2. `./agent-creation-files/HANDOFF_SPECIFICATION.md` (formato hibrido de handoff)
3. `./agent-creation-files/handoff-schema.json` (validacion formal de handoffs)
4. `./agent-creation-files/handoff-hooks-routing.md` (routing de escaladas y anti-bucles)
5. `./agent-creation-files/IMPLEMENTATION_CHECKLIST.md` (gates de implementacion y validacion)
6. `./agent-creation-files/QUICK_REFERENCE.md` (referencia rapida y checklist pre-handoff)

# Reglas globales obligatorias (MUST)

- Todo handoff inter-agente DEBE cumplir `./agent-creation-files/HANDOFF_SPECIFICATION.md`.
- Todo handoff inter-agente DEBE validar contra `./agent-creation-files/handoff-schema.json` antes de enrutarse.
- Si `validation_checklist.status=failed`, NO se enruta; se registra error y se reintenta segun policy.
- Toda escalada DEBE seguir `./agent-creation-files/handoff-hooks-routing.md` con destino explicito y rationale.
- Todo cambio relevante DEBE resumirse en `./tests/Documentation/HANDOFF_Summary.md`.
- Todo fallo DEBE registrarse en `./tests/Documentation/escalation_log.md`.
- Ningun handoff se considera enrutado hasta que el Orquestador lo haya persistido correctamente en la ruta canonica.
- Nunca ejecutar procesos manuales para suplir el fallo de un agente.

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

# Templates obligatorios para agentes activos

Los templates base son obligatorios y deben usarse sin omitir su estructura minima:

- `./agent-creation-files/agent-templates/documentation.agent.md`
- `./agent-creation-files/agent-templates/planner.agent.md`
- `./agent-creation-files/agent-templates/prioritization.agent.md`

Cada archivo `.agent.md` debe incluir como minimo:

- frontmatter (`name`, `description`, `role`, `inputs`, `outputs`, `non_goals` y/o `owned_decisions`)
- objetivo
- pasos/fases
- formato minimo de salida
- criterios de finalizacion
- seccion de skills operativas consolidadas

# Agentes del Test Team QA

0. Orquestador QA

Debe:

- aceptar entrada minima `solicitud_qa`
- bootstrapear contexto si `contexto_compartido` no existe
- validar estructura antes de enrutar
- aplicar `retry_policy max_attempts=3`
- registrar errores por intento fallido
- abortar con `status_global=blocked` al agotar intentos
- persistir todo handoff recibido en `./tests/Documentation/handoffs/{session_id}/` antes de enrutar
- mantener `manifest.json` y `retry_checkpoint.json` por sesion
- NO mutar campos de autoria del handoff persistido
- NO usar `updated_by=orchestrator` en artifacts especializados

Skills:

- bootstrap de contexto compartido
- validacion previa al routing
- enrutamiento por estado de artefactos
- sincronizacion de contexto inter-agente
- resolucion de conflictos de responsabilidad
- replanificacion controlada
- manejo de fallos y reintentos
- guardrails de dominio y auditoria

1. Capa Planificacion

Test Documentation debe:

- extraccion de requisitos
- normalizacion de lenguaje en Gherkin
- trazabilidad a fuentes
- identificacion de huecos
- particionado por area
- mapeo de dependencias
- NO crear test cases
- NO disenar test plans
- NO priorizar requisitos

Test Planner debe:

- modelado de cobertura
- diseno de suites
- trazabilidad estructural
- definicion de precondiciones
- limite de responsabilidad
- NO priorizar

Test Prioritization debe:

- evaluacion de riesgo
- seleccion de automatizacion
- balance de cobertura
- justificacion auditable
- priorizacion basada en documentacion

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