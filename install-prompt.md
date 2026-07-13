# Objetivo

Implementar agentes para un equipo de QA en modo Orchestra con instalacion determinista.

# Alcance de esta version

- Implementar solo QA Orchestrator y agentes de la capa de Planificacion.
- No implementar capas de Creacion, Ejecucion y Analisis en esta iteracion.

# Contrato de autoridad (sin duplicidad)

- `install-manifest.json` es la unica fuente de verdad para mapeo de archivos (`source -> destination`).
- `install-prompt.md` define comportamiento del agente instalador, guardrails y reglas funcionales.
- Si hay conflicto entre rutas declaradas en prompt y manifest, la instalacion DEBE abortar con error explicito.

# Reglas operativas para creacion de agentes

- El root oficial de outputs y trazabilidad es `./tests/Documentation/`.
- Solo el agente QA Orchestrator debe ubicarse en `.github/agents/`.
- Los agentes subordinados se ubican en `.github/agents/qa-team/`.
- Los contratos runtime se ubican en `.github/agents/qa-team/contracts/`.
- Las instrucciones runtime se ubican en `.github/instructions/`.
- El prompt inicial de ejecucion se ubica en `.github/prompts/prompt-to-agent.md`.
- La ruta canonica de persistencia de handoffs es `./tests/Documentation/handoffs/session_{session_N}_{session_id}/`.
- `session_N` DEBE ser incremental por proyecto actual (1..N) y asignarse al inicio de cada nueva sesion.

# Politica de sobrescritura (interactiva global por ejecucion)

Antes de copiar cualquier archivo runtime, si ya existen los agentes en la carpeta .github del proyecto, el agente instalador DEBE preguntar al usuario una unica opcion global:

- `fail_if_exists`
- `overwrite`
- `skip_if_exists`

Reglas:
- La opcion elegida se aplica a TODOS los archivos de la instalacion.
- No se permiten excepciones por archivo en la misma ejecucion.
- Si el usuario no responde o responde fuera de opciones validas, la instalacion no inicia.

# Instalacion runtime (manifest-driven)

El instalador DEBE:

1. Cargar y validar `./install-manifest.json`.
2. Filtrar entradas con `classification=runtime`.
3. Copiar archivos desde `runtime_mirror_root` a sus destinos exactos.
4. Aplicar la politica global de overwrite seleccionada.
5. Verificar que todos los `required=true` quedaron instalados.
6. Reportar errores por archivo con id de entrada del manifest.

El instalador NO DEBE:

- Hardcodear rutas fuera del manifest.
- Duplicar listas de copiado en este prompt.
- Copiar entradas con `classification=bootstrap`.
- Copiar ejemplos al destino final (bootstrap-only).

# Archivos bootstrap (no copiar al proyecto final)

Los siguientes artefactos son de scaffolding y referencia:

- `./install-prompt.md`
- `./README.md`

# Fuente de verdad para operacion runtime (en destino)

1. `.github/agents/qa-team/contracts/orchestration-config.json`
2. `.github/agents/qa-team/contracts/handoff-schema.json`
3. `.github/agents/qa-team/contracts/HANDOFF_SPECIFICATION.md`
4. `.github/agents/qa-team/contracts/handoff-hooks-routing.md`
5. `.github/instructions/qa-handoff-format.instructions.md`
6. `.github/instructions/qa-routing-guardrails.instructions.md`
7. `.github/instructions/qa-orchestrator-policy.instructions.md`

# Reglas globales obligatorias (MUST)

- Todo handoff especializado inter-agente DEBE cumplir `HANDOFF_SPECIFICATION.md`.
- Todo handoff especializado inter-agente DEBE validar contra `handoff-schema.json` antes de enrutarse.
- Si `validation_checklist.status=failed`, NO se enruta; se registra error y se reintenta segun policy.
- Si `validation_checklist.status=warning`, se puede enrutar solo con logging de warning.
- Toda escalada DEBE seguir `handoff-hooks-routing.md` con destino explicito y rationale.
- `feedback_hooks.if_conflict_detected` DEBE incluir `escalate_to`.
- El Orchestrator usa pre-resolucion de prerequisitos por defecto.
- Ningun handoff se considera enrutado hasta que el Orchestrator lo haya persistido en la ruta canonica.
- El Orchestrator NO debe mutar autoria de artefactos especializados (`from_agent`, `to_agent`, `updated_by`).
- El Orchestrator puede generar handoffs fragmentados solo como nuevos JSON derivados, nunca mutando un handoff ya persistido.
- Nunca ejecutar procesos manuales para suplir fallo de un agente especializado.
- El Orchestrator DEBE cargar en runtime `handoff-schema.json` y `orchestration-config.json`.

# Contrato minimo del handoff

Todo handoff DEBE incluir estos bloques:

- `metadata`
- `context`
- `executive_summary`
- `artifacts_references`
- `delta_changes`
- `validation_checklist`
- `next_agent_instructions`
- `feedback_hooks`

Reglas adicionales:

- `delta_changes.updated_by` DEBE ser el agente productor.
- El Orchestrator persiste todos los handoffs recibidos pero NO muta el payload.
- Cada transición especializada produce exactamente un JSON de handoff y exactamente un resumen Markdown `{agent_name}-summary.md`.
- No forman parte del estándar `README.md` dentro de `handoffs/`, `execution-summary.json` por agente ni `validation-report.md` por agente.
- Si `metadata.handoff_kind=fragment`, el handoff DEBE incluir `fragment_context` y avisar que el agente receptor debe pedir el contexto completo antes de inferir datos ausentes.
- `retry_count` maximo: 3 intentos por `correlation_id`.
- Si se agotan intentos, el Orchestrator aborta con `status_global=blocked`.

# Flujo de implementacion obligatorio

Paso 1: Crear QA Orchestrator

1. Bootstrap de contexto compartido
2. Validacion previa al routing
3. Persistencia de handoffs recibidos en `./tests/Documentation/handoffs/session_{session_N}_{session_id}/`
4. Manejo de `manifest.json` y `retry_checkpoint.json` por sesion
5. Retry policy con `max_attempts=3`
6. Manejo de errores y logging
7. `user-invocable: true`

Paso 2: Crear Test Documentation Agent

1. Basarse en `runtime-mirror/.github/agents/qa-team/test-documentation.agent.md`
2. Extraer y normalizar requisitos en un handoff JSON consolidado
3. Identificar gaps, dependencias y contratos necesarios dentro del mismo JSON
4. Validar handoff contra schema
5. Generar `test_documentation-summary.md`
6. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
7. `user-invocable: false`

Paso 3: Crear Test Planner Agent

1. Basarse en `runtime-mirror/.github/agents/qa-team/test-planner.agent.md`
2. Recibir handoff de Documentation
3. Consumir JSON consolidado completo o fragmentado
4. Pedir contexto adicional si un fragmento no basta
5. Modelar cobertura y disenar suites
6. Definir precondiciones y trazabilidad dentro del mismo JSON
7. Generar `test_planner-summary.md`
8. Validar handoff contra schema
9. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
10. `user-invocable: false`

Paso 4: Crear Test Prioritization Agent

1. Basarse en `runtime-mirror/.github/agents/qa-team/test-prioritization.agent.md`
2. Recibir handoff de Planner
3. Consumir JSON consolidado completo o fragmentado
4. Pedir contexto adicional si un fragmento no basta
5. Evaluar riesgo y factibilidad de automatizacion
6. Balancear cobertura vs esfuerzo dentro del mismo JSON
7. Generar `test_prioritization-summary.md`
8. Validar handoff contra schema
9. Actualizar `./tests/Documentation/HANDOFF_Summary.md`
10. `user-invocable: false`

Paso 5: Validacion end-to-end (solo tras confirmacion humana)

1. Ejecutar flujo completo: Documentation -> Planner -> Prioritization
2. Validar cada handoff contra schema
3. Verificar retry policy y ausencia de bucles
4. Verificar trazabilidad en `HANDOFF_Summary.md` y `escalation_log.md`