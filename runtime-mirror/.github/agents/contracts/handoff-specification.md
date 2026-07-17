# Especificación de Handoff para QA

## Objetivo

Este contrato define el único formato admitido para transiciones entre agentes QA.

- Cada ejecución de agente produce exactamente un archivo JSON de handoff: un **recibo mínimo de validación**, no un payload de contenido.
- Cada agente trabajador produce, además, exactamente un Markdown de trabajo (fuente de verdad del contenido) y un Markdown de log de ejecución (auditoría interna).
- El contrato base es obligatorio. No se admiten bloques adicionales fuera de lo definido en `handoff-schema.json` (`additionalProperties: false`).

## Principios

- **JSON mínimo por ejecución:** el handoff JSON solo contiene lo necesario para validar la ejecución — no duplica contenido de trabajo.
- **Markdown como documento de trabajo:** todo el contenido sustantivo (requisitos, gaps, decisiones, hallazgos) vive únicamente en el Markdown de resumen del agente.
- **Markdown de log como auditoría:** cada agente registra su ejecución paso a paso en un log separado, independiente del resumen de trabajo.
- **El productor no decide el flujo:** un agente trabajador nunca conoce ni sugiere el siguiente agente del pipeline; solo reporta hechos objetivos sobre su propia contribución (`assigned_task`, `work_performed`).
- **Quien consume evalúa el cumplimiento:** cualquier veredicto sobre si el trabajo cumplió el alcance encargado lo decide quien consume el handoff comparando su solicitud original contra los hechos reportados — nunca el propio agente productor.
- **Sin artefactos redundantes:** este estándar excluye `README.md` dentro de `sessions/` y `execution-summary.json` por agente.

## Ownership de Contenido vs Persistencia

- **Agente productor:** crea el handoff JSON (recibo mínimo), el Markdown de trabajo y el Markdown de log; solo reporta hechos observables, nunca un juicio de cumplimiento sobre sí mismo.
- **Consumidor del handoff:** valida el recibo contra el schema y decide si la ejecución es suficiente para continuar con el siguiente paso.
- **Regla de no mutación:** nadie altera un handoff una vez generado y persistido.

## Estructura Base JSON

```json
{
  "handoff": {
    "agent": "test_documentation",
    "session_id": "uuid",
    "timestamp": "ISO8601",
    "status": "completed|blocked|partial",
    "assigned_task": {
      "task_id": "identificador de la instruccion o tarea recibida",
      "scope_received": "eco textual de lo que el agente entendió que se le pedía"
    },
    "work_performed": {
      "sections_touched": ["secciones del documento de trabajo que se completaron"],
      "sections_untouched": ["secciones que no aplicaban o quedaron pendientes"]
    },
    "checks": {},
    "counts": {},
    "summary_md": "ruta al markdown de trabajo del agente",
    "work_log_md": "ruta al log de ejecución del agente"
  }
}
```

## Reglas de Artefactos

### Agentes trabajadores

Cada agente trabajador debe producir exactamente estos artefactos por ejecución:

1. `{agent}-handoff-{timestamp}.json` — recibo mínimo de validación.
2. Un Markdown de trabajo único por rol (contenido completo, sin duplicar en el JSON):
   - `test_documentation-analysis-report.md`
   - `test_planner-execution-summary.md`
   - `test_prioritization-prioritization-report.md`
3. Un Markdown de log de ejecución único por rol:
   - `test_documentation-work-log.md`
   - `test_planner-work-log.md`
   - `test_prioritization-work-log.md`

## Flujo de Información (Pipeline Manual)

El pipeline QA se ejecuta de forma secuencial, con el usuario como coordinador. Cada agente recibe como input el handoff del agente anterior (o la solicitud directa del usuario, en el caso del primer agente).

### 1. Usuario → Test Documentation
- **Entrada:** `solicitud_qa` y contexto (o el handoff JSON del intento anterior si se requiere repetir).
- **Salida esperada:** recibo JSON mínimo + `test_documentation-analysis-report.md` (documento de trabajo completo) + `test_documentation-work-log.md`.

### 2. Test Documentation → Usuario → Test Planner
- **Entrada del planner:** handoff JSON de `test_documentation` + `test_documentation-analysis-report.md`.
- **Salida esperada:** recibo JSON mínimo + `test_planner-execution-summary.md` + `test_planner-work-log.md`.

### 3. Test Planner → Usuario → Test Prioritization
- **Entrada del prioritization:** handoff JSON de `test_planner` + `test_planner-execution-summary.md`.
- **Salida esperada:** recibo JSON mínimo + `test_prioritization-prioritization-report.md` + `test_prioritization-work-log.md`.

## Retroalimentación

- Si un agente reporta `status: blocked`, el usuario decide si reintenta al mismo agente con contexto adicional o si aborta.
- Si un agente reporta `status: partial`, el usuario evalúa si lo producido es suficiente para continuar con el siguiente agente.
- Un `check` en `false` que sea bloqueante impide marcar la tarea como finalizada (ver checklist de la skill de reporte del agente).

## Resúmenes Markdown

Cada agente trabajador genera su markdown de trabajo único con naming por rol. Como mínimo, ese resumen debe incluir:

1. Cabecera con `Session ID`, `Agent`, fecha/timestamp y estado.
2. Resumen ejecutivo u overview.
3. Métricas clave.
4. Hallazgos, decisiones o bloqueadores relevantes.
5. Validación o checklist de cierre.
6. Artefactos generados.
7. Notas de cierre para revisión humana (informativas, no consumibles como instrucción por otro agente).

Secciones específicas por agente:

- **Test Documentation:** requisitos por área, contratos API y gaps.
- **Test Planner:** suites, escenarios, cobertura y automatización.
- **Test Prioritization:** riesgo, priorización y recomendaciones de ejecución.

## Estructura de Directorios Esperada

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

## Criterios de Éxito

| Criterio | Descripción |
|----------|-------------|
| **Trazabilidad** | Cada handoff conserva `agent`, `timestamp`, `session_id` |
| **Eficiencia** | El JSON es un recibo mínimo; el contenido vive solo en el markdown de trabajo, sin duplicarse |
| **Legibilidad** | Cada agente entrega un markdown de trabajo y un log de ejecución separados |
| **Trazabilidad** | Cada handoff conserva `agent`, `timestamp`, `session_id` |
| **Auditabilidad** | Cada ejecución persiste sus artefactos en su carpeta de sesión |

