# QA Agent Creation

Repositorio de instalacion para agentes QA con pipeline manual, con instalacion determinista basada en `install-manifest.json` y runtime mirror.

## Objetivo

Construir e instalar un paquete runtime de agentes QA donde:

- Todos los agentes son invocables directamente por el usuario.
- El pipeline se ejecuta de forma secuencial manual: documentation.QATesting → planner.QATesting → prioritization.QATesting.
- El runtime final queda en estructura estandar de `.github/`.

## Alcance actual

Implementado/documentado para:

- Test Documentation Agent (completo)
- Test Planner Agent (borrador)
- Test Prioritization Agent (borrador)

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

Los artefactos generados por los agentes durante una sesión se organizan en la siguiente estructura cuyo fin es facilitar debuguear:

```text
./tests/Documentation/
└── sessions/
    ├── session-counter.json
    └── session_{session_N}_{session_id}/
          ├── agent-documentation.QATesting/
          │     ├── documentation.QATesting-handoff-{timestamp}.json
          │     ├── documentation.QATesting-analysis-report.md
          │     └── documentation.QATesting-work-log.md
          ├── agent-planner.QATesting/
          │     ├── planner.QATesting-handoff-{timestamp}.json
          │     ├── planner.QATesting-execution-summary.md
          │     └── planner.QATesting-work-log.md
          └── agent-prioritization.QATesting/
                ├── prioritization.QATesting-handoff-{timestamp}.json
                ├── prioritization.QATesting-prioritization-report.md
                └── prioritization.QATesting-work-log.md
```

### Convenciones

- Cada agente crea su subcarpeta `agent-{agente}/` dentro de la sesión.
- El `session-counter.json` vive directamente en `sessions/`.
- El primer agente en ejecutarse (documentation.QATesting) inicializa la carpeta de sesión y el counter si no existen.

## Estructura del repositorio

```text
.
|-- install-prompt.md
|-- install-manifest.json
|-- runtime-mirror/
|   |-- .github/
|   |   |-- agents/
|   |   |-- agents/
|   |   |   |-- documentation.QATesting.agent.md
|   |   |   |-- planner.QATesting.agent.md
|   |   |   |-- prioritization.QATesting.agent.md
|   |   |   `-- contracts/
|   |   |       `-- documentation.QATesting.contract.md
|   |   |-- instructions/
|   |   |   `-- qa-handoff-format.instructions.md
|   |   |-- skills/
|   |   |   |-- qa-handoff-creation/
|   |   |   |   |-- SKILL.md
|   |   |   |   `-- assets/
|   |   |   |       |-- handoff-specification.md
|   |   |   |       |-- handoff-schema.json
|   |   |   |       `-- example-handoff.json
|   |   |   |-- qa-test-planner-report/
|   |   |   |-- qa-test-prioritization-report/
|   |   `-- workflows/
|   |       `-- qa-test-documentation/
```

## Bootstrap vs Runtime

- Runtime (se copia al proyecto destino): contenido en `runtime-mirror/` segun `install-manifest.json`.
- Bootstrap (no se copia): `install-prompt.md` y `README.md` de este repositorio instalador.

Los ejemplos son estrictamente bootstrap-only.