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