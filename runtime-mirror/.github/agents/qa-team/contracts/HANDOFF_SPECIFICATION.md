# Especificación de Handoff para QA

## Objetivo

Este contrato define el único formato admitido para transiciones entre agentes QA.

- Cada transición produce exactamente un archivo JSON de handoff: un **recibo mínimo de validación**, no un payload de contenido.
- Cada agente trabajador produce, además, exactamente un Markdown de trabajo (fuente de verdad del contenido) y un Markdown de log de ejecución (auditoría interna).
- El Orquestador valida, persiste y decide el siguiente paso; nunca muta el payload de un handoff ya recibido.
- El contrato base es obligatorio. No se admiten bloques adicionales fuera de lo definido en `handoff-schema.json` (`additionalProperties: false`).

## Principios

- **JSON mínimo por transición:** el handoff JSON solo contiene lo necesario para que el Orquestador valide y enrute — no duplica contenido de trabajo.
- **Markdown como documento de trabajo:** todo el contenido sustantivo (requisitos, gaps, decisiones, hallazgos) vive únicamente en el Markdown de resumen del agente.
- **Markdown de log como auditoría:** cada agente registra su ejecución paso a paso en un log separado, independiente del resumen de trabajo.
- **El productor no decide el flujo:** un agente trabajador nunca conoce ni sugiere el siguiente agente del pipeline; solo reporta hechos objetivos sobre su propia contribución (`assigned_task`, `work_performed`).
- **El Orquestador calcula el cumplimiento:** cualquier veredicto sobre si el trabajo cumplió el alcance encargado (`scope_compliance`) lo calcula el Orquestador comparando su instrucción original contra los hechos reportados — nunca el propio agente productor.
- **Persistencia previa al routing:** ninguna transición es válida hasta que el Orquestador haya persistido el JSON del handoff.
- **Sin artefactos redundantes:** este estándar excluye `README.md` dentro de `handoffs/` y `execution-summary.json` por agente.

## Ownership de Contenido vs Persistencia

- **Agente productor:** crea el handoff JSON (recibo mínimo), el Markdown de trabajo y el Markdown de log; solo reporta hechos observables, nunca un juicio de cumplimiento sobre sí mismo.
- **Orquestador QA:** valida el recibo contra el schema, persiste los artefactos, calcula `scope_compliance` en sus propios metaartefactos (`manifest.json`) y decide el siguiente paso.
- **Regla de no mutación:** el Orquestador no altera un handoff recibido.

## Estructura Base JSON

```json
{
  "handoff": {
    "agent": "test_documentation",
    "session_id": "uuid",
    "timestamp": "ISO8601",
    "correlation_id": "{session_id}.{agent}.{retry_count}",
    "retry_count": 0,
    "status": "completed|blocked|partial",
    "assigned_task": {
      "task_id": "eco del identificador de instrucción emitido por el Orquestador",
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
3. Un Markdown de log de ejecución único por rol:
  - `test_documentation-work-log.md`

### Orquestador

El Orquestador mantiene estos artefactos de sesión:

1. `manifest.json`
2. `retry_checkpoint.json`
3. `HANDOFF_Summary.md`
4. `ORCHESTRATION_FINAL_SUMMARY.md`

`HANDOFF_Summary.md` es un log transversal de transiciones. `ORCHESTRATION_FINAL_SUMMARY.md` es el resumen final consolidado de la orquestación.

## Flujo de Información

### 1. Orquestador → Test Documentation
- **Entrada:** `solicitud_qa` y contexto de sesión (o, en un reintento, `assigned_task.task_id` y el alcance encargado).
- **Salida esperada:** recibo JSON mínimo + `test_documentation-analysis-report.md` (documento de trabajo completo) + `test_documentation-work-log.md`.

### 2. Test Documentation → Orquestador
- **Entrada:** recibo JSON con referencia a ambos markdown.
- **El Orquestador:** valida el recibo, compara `assigned_task.scope_received` contra su instrucción original, calcula `scope_compliance`, y decide el siguiente paso (reintentar, cerrar sesión, o invocar a otro agente cuando exista).

> Nota: se añadirán más transiciones (p. ej. Test Documentation → siguiente agente del pipeline) conforme se incorporen nuevos agentes al catálogo. Por ahora `test_documentation` es el único agente trabajador definido en `orchestration-config.json`.

## Retroalimentación
- Si `test_documentation` reporta `status: blocked`, el Orquestador decide si reintenta al mismo agente (self-retry) según `handoff-hooks-routing.md`.
- Máximo 3 reintentos por `correlation_id`; al superarlo, el Orquestador aborta y marca la sesión como `blocked`.
- Toda escalada requiere persistencia previa por el Orquestador.

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

## Guardrails contra Bucles Infinitos

1. **Retry policy del Orquestador:** máximo 3 intentos por `correlation_id`.
2. **Validation checklist:** un `check` en `false` que sea bloqueante impide marcar la tarea como finalizada (ver checklist de la skill de reporte del agente).
3. **Registro de bloqueos:** todo `status: blocked` se registra en `escalation_log.md` con su motivo y `retry_count`.

## Estructura de Directorios Esperada

```text
./tests/Documentation/
├── HANDOFF_Summary.md
├── ORCHESTRATION_FINAL_SUMMARY.md
├── escalation_log.md
└── handoffs/
  └── session_{session_N}_{session_id}/
        ├── manifest.json
        ├── retry_checkpoint.json
        ├── test_documentation-handoff-{timestamp}.json
        ├── test_documentation-analysis-report.md
        └── test_documentation-work-log.md
```

## Criterios de Éxito

| Criterio | Descripción |
|----------|-------------|
| **Trazabilidad** | Cada handoff conserva `agent`, `timestamp`, `correlation_id` |
| **Eficiencia** | El JSON es un recibo mínimo; el contenido vive solo en el markdown de trabajo, sin duplicarse |
| **Legibilidad** | Cada agente entrega un markdown de trabajo y un log de ejecución separados |
| **No-bucles** | Máximo 3 reintentos por `correlation_id` antes de abortar |
| **Auditabilidad** | El Orquestador registra persistencia, routing y el veredicto de `scope_compliance` en sus propios metaartefactos |

## Metaartefactos de Orquestación

### manifest.json
- Índice oficial de handoffs persistidos por sesión.
- Debe registrar al menos: `agent`, `path`, `timestamp`, `validation_status`, `correlation_id`, `retry_count`, `scope_compliance`.

### retry_checkpoint.json
- Estado operativo de reintentos por `correlation_id`.
- Debe registrar al menos: `max_attempts`, `current_retry_count`, `last_error`, `last_updated`.

