# QA Agent Creation

Repositorio de instalacion para agentes QA en modo Orchestra, con instalacion determinista basada en `install-manifest.json` y runtime mirror.

## Objetivo

Construir e instalar un paquete runtime de agentes QA donde:

- Solo QA Orchestrator es invocable por el usuario.
- El runtime final queda en estructura estandar de `.github/`.

## Alcance actual

Implementado/documentado para:

- QA Orchestrator
- Test Documentation Agent
- Test Planner Agent
- Test Prioritization Agent

No implementado en esta version:

- Capa Creacion
- Capa Ejecucion
- Capa Analisis

## Modelo de instalacion

### Fuente de verdad

- Mapeo de archivos: `install-manifest.json`
- Reglas de comportamiento del instalador: `install-prompt.md`

Si existe conflicto entre ambos, la instalacion debe abortar con error explicito.

### Politica de overwrite

El agente instalador debe preguntar SIEMPRE antes de copiar:

- `fail_if_exists`
- `overwrite`
- `skip_if_exists`

La opcion elegida se aplica globalmente a toda la instalacion.

### Limite de autoridad

- `install-prompt.md` solo gobierna la instalacion.
- Despues de copiar los archivos runtime, la operacion QA queda definida por los artefactos instalados en `.github/`.

## Estructura canónica de salida

Los artefactos generados por los agentes durante una sesión de orquestación se organizan en la siguiente estructura cuyo fin es facilitar debuguear:

```text
./tests/Documentation/
├── HANDOFF_Summary.md
├── ORCHESTRATION_FINAL_SUMMARY.md
├── escalation_log.md
└── sessions/
    ├── session-counter.json
    └── session_{session_N}_{session_id}/
          ├── agent-orchestrator/
          │     ├── manifest.json
          │     ├── retry_checkpoint.json
          │     └── ORCHESTRATION_FINAL_SUMMARY.md
          ├── agent-test_documentation/
          │     ├── test_documentation-handoff-{timestamp}.json
          │     ├── test_documentation-analysis-report.md
          │     └── test_documentation-work-log.md
          ├── agent-test_planner/
          │     ├── test_planner-handoff-{timestamp}.json
          │     └── test_planner-execution-summary.md
          └── agent-test_prioritization/
                ├── test_prioritization-handoff-{timestamp}.json
                └── validation-report.md
```

### Convenciones

- Cada agente crea su subcarpeta `agent-{agente}/` dentro de la sesión.
- Los archivos globales de trazabilidad (`HANDOFF_Summary.md`, `escalation_log.md`) permanecen en la raíz de `Documentation/`.
- El `session-counter.json` vive directamente en `sessions/`.
- La configuración canónica de rutas está en `orchestration-config.json` (`session_base_path`, `session_counter_file`).

## Estructura del repositorio

```text
.
|-- install-prompt.md
|-- install-manifest.json
|-- prompt-to-agent.md
|-- runtime-mirror/
|   |-- .github/
|   |   |-- agents/
|   |   |   |-- qa-orchestrator.agent.md
|   |   |   |-- qa-team/
|   |   |   |   |-- test-documentation.agent.md
|   |   |   |   |-- test-planner.agent.md
|   |   |   |   |-- test-prioritization.agent.md
|   |   |   |   `-- contracts/
|   |   |   |       |-- HANDOFF_SPECIFICATION.md
|   |   |   |       |-- handoff-schema.json
|   |   |   |       |-- handoff-hooks-routing.md
|   |   |   |       `-- orchestration-config.json
|   |   |-- instructions/
|   |   |   |-- qa-handoff-format.instructions.md
|   |   |   |-- qa-routing-guardrails.instructions.md
|   |   |   `-- qa-orchestrator-policy.instructions.md
|   |   `-- prompts/
|   |       `-- prompt-to-agent.md
```

## Bootstrap vs Runtime

- Runtime (se copia al proyecto destino): contenido en `runtime-mirror/` segun `install-manifest.json`.
- Bootstrap (no se copia): `install-prompt.md` y `README.md` de este repositorio instalador.

Los ejemplos son estrictamente bootstrap-only.

## Nota operativa

`runtime-mirror/.github/prompts/prompt-to-agent.md` se instala como `.github/prompts/prompt-to-agent.md`.

La semantica operativa de agentes, handoffs, routing y persistencia vive en los archivos runtime copiados al proyecto destino.

## Licencia

Pendiente de definir.