# QA Agent Creation

Repositorio de instalacion para agentes QA en modo Orchestra, con instalacion determinista basada en `install-manifest.json` y runtime mirror.

## Objetivo

Construir e instalar un flujo multiagente donde:

- Solo QA Orchestrator es invocable por el usuario.
- Los agentes de Planificacion colaboran por handoffs JSON validados.
- Cada agente trabajador genera un único handoff JSON y un único resumen Markdown `{agent_name}-summary.md`.
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

## Contratos clave runtime

- Handoffs validan contra `.github/agents/qa-team/contracts/handoff-schema.json`.
- El Orchestrator debe cargar en runtime:
  - `.github/agents/qa-team/contracts/handoff-schema.json`
  - `.github/agents/qa-team/contracts/orchestration-config.json`
- El Orchestrator persiste handoffs en `./tests/Documentation/handoffs/session_{session_N}_{session_id}/` antes de enrutar.
- El Orchestrator puede generar handoffs fragmentados solo como nuevos JSON derivados con trazabilidad al handoff origen.
- No son parte del estándar `README.md` dentro de `handoffs/`, `execution-summary.json` por agente ni `validation-report.md` por agente.

## Estructura de outputs esperada

```text
./tests/Documentation/
|-- HANDOFF_Summary.md
|-- ORCHESTRATION_FINAL_SUMMARY.md
|-- escalation_log.md
`-- handoffs/
  `-- session_{session_N}_{session_id}/
        |-- manifest.json
        |-- retry_checkpoint.json
        |-- test_documentation-to-test_planner-attempt-{retry_count}-{timestamp}.json
        |-- test_documentation-summary.md
        |-- test_planner-to-test_prioritization-attempt-{retry_count}-{timestamp}.json
        |-- test_planner-summary.md
        |-- test_prioritization-to-orchestrator-attempt-{retry_count}-{timestamp}.json
        `-- test_prioritization-summary.md
```

## Nota operativa

`prompt-to-agent.md` es plantilla editable y se instala como `.github/prompts/prompt-to-agent.md`.

## Licencia

Pendiente de definir.