# QA Agent Creation

Repositorio de instalacion para agentes QA con pipeline manual, con instalacion determinista basada en `install-manifest.json` y runtime mirror.

## Objetivo

Construir e instalar un paquete runtime de agentes QA donde:

- Todos los agentes son invocables directamente por el usuario.
- El pipeline se ejecuta de forma secuencial manual: test_documentation → test_planner → test_prioritization.
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
          ├── agent-test_documentation/
          │     ├── test_documentation-handoff-{timestamp}.json
          │     ├── test_documentation-analysis-report.md
          │     └── test_documentation-work-log.md
          ├── agent-test_planner/
          │     ├── test_planner-handoff-{timestamp}.json
          │     ├── test_planner-execution-summary.md
          │     └── test_planner-work-log.md
          └── agent-test_prioritization/
                ├── test_prioritization-handoff-{timestamp}.json
                ├── test_prioritization-prioritization-report.md
                └── test_prioritization-work-log.md
```

### Convenciones

- Cada agente crea su subcarpeta `agent-{agente}/` dentro de la sesión.
- El `session-counter.json` vive directamente en `sessions/`.
- El primer agente en ejecutarse (test_documentation) inicializa la carpeta de sesión y el counter si no existen.

## Estructura del repositorio

```text
.
|-- install-prompt.md
|-- install-manifest.json
|-- runtime-mirror/
|   |-- .github/
|   |   |-- agents/
|   |   |   |-- qa-team/
|   |   |   |   |-- test-documentation.agent.md
|   |   |   |   |-- test-planner.agent.md
|   |   |   |   |-- test-prioritization.agent.md
|   |   |   |   `-- contracts/
|   |   |   |       |-- HANDOFF_SPECIFICATION.md
|   |   |   |       |-- handoff-schema.json
|   |   |   |       `-- test-documentation.contract.md
|   |   |-- instructions/
|   |   |   `-- qa-handoff-format.instructions.md
|   |   |-- skills/
|   |   |   |-- qa-handoff-creation/
|   |   |   |-- qa-test-planner-report/
|   |   |   |-- qa-test-prioritization-report/
|   |   `-- workflows/
|   |       `-- qa-test-documentation/
```

## Bootstrap vs Runtime

- Runtime (se copia al proyecto destino): contenido en `runtime-mirror/` segun `install-manifest.json`.
- Bootstrap (no se copia): `install-prompt.md` y `README.md` de este repositorio instalador.

Los ejemplos son estrictamente bootstrap-only.