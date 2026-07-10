# Especificación de Handoff para QA

## Objetivo

Este contrato define el único formato admitido para transiciones especializadas entre agentes QA.

- Cada transición especializada produce exactamente un archivo JSON de handoff.
- Cada agente trabajador produce exactamente un archivo Markdown de resumen humano.
- El Orquestador puede enrutar handoffs completos o generar handoffs fragmentados derivados, pero nunca muta el payload de un handoff ya recibido.
- El contrato base es obligatorio y los bloques enriquecidos extra están permitidos.

## Principios

- **JSON único por transición:** toda la información estructurada que el siguiente agente necesite debe vivir en el handoff JSON, aunque el payload sea extenso.
- **Markdown único por agente:** el resumen humano de cada agente se persiste como `{agent_name}-summary.md`.
- **Persistencia previa al routing:** ninguna transición es válida hasta que el Orquestador haya persistido el JSON del handoff.
- **Fragmentación trazable:** si el Orquestador envía solo una parte del contexto, debe crear un nuevo JSON derivado con metadata propia y aviso explícito de contexto parcial.
- **Sin artefactos redundantes:** este estándar excluye `README.md` dentro de `handoffs/`, `execution-summary.json` por agente y `validation-report.md` por agente.

## Ownership de Contenido vs Persistencia

- **Agente productor:** crea el contenido del handoff y conserva autoría en `metadata.from_agent` y `delta_changes.updated_by`.
- **Orquestador QA:** valida, persiste y enruta handoffs; también puede crear handoffs fragmentados derivados cuando el siguiente agente no necesita el payload completo.
- **Regla de no mutación:** el Orquestador no altera un handoff recibido. Si necesita fragmentarlo, crea un handoff nuevo con su propia `metadata`, nueva `correlation_id` y referencia explícita al handoff origen.
- **Regla de completitud:** todo agente receptor debe pedir el handoff completo o contexto adicional antes de inferir información ausente de un fragmento.

## Estructura Base JSON

```json
{
  "handoff": {
    "metadata": {
      "from_agent": "string",
      "to_agent": "string",
      "session_id": "uuid",
      "timestamp": "ISO8601",
      "retry_count": 0,
      "correlation_id": "{session_id}.{from_agent}-to-{to_agent}.{retry_count}",
      "handoff_kind": "full|fragment"
    },
    "context": {
      "user_request_id": "solicitud_qa original",
      "phase": "planning_layer",
      "status": "ready_for_handoff|escalated|failed|completed"
    },
    "executive_summary": {
      "state_snapshot": "descripción compacta del estado actual",
      "critical_findings": ["hallazgos que afectan al siguiente agente"],
      "recommendation": "qué debe enfatizar el siguiente agente"
    },
    "artifacts_references": {
      "path_pattern": "ruta base de la sesión",
      "summary_md": "ruta a {agent_name}-summary.md",
      "raw_data": ["rutas o identificadores de los artefactos fuente usados"],
      "version_hash": "checksum o identificador de integridad"
    },
    "delta_changes": {
      "added": ["items nuevos"],
      "modified": ["items actualizados"],
      "removed": ["items eliminados"],
      "updated_by": "nombre del agente productor",
      "rationale": "breve explicación de cambios"
    },
    "validation_checklist": {
      "status": "passed|warning|failed",
      "checks": {}
    },
    "next_agent_instructions": {
      "must_validate": ["lista de validaciones obligatorias"],
      "can_skip": ["qué NO necesita repetir"],
      "decision_points": ["dónde necesita tomar decisiones"]
    },
    "feedback_hooks": {
      "if_gaps_found": {
        "escalate_to": "agent_name"
      },
      "if_coverage_impossible": {
        "escalate_to": "agent_name"
      },
      "if_conflict_detected": {
        "escalate_to": "agent_name",
        "conflict_resolution_strategy": "texto de estrategia"
      }
    },
    "fragment_context": {
      "source_handoff_correlation_id": "correlation_id del handoff origen",
      "source_handoff_path": "ruta del handoff origen persistido",
      "included_sections": ["secciones incluidas en el fragmento"],
      "omitted_sections": ["secciones omitidas"],
      "consumer_notice": "Este handoff contiene información fragmentada; solicita el contexto completo antes de inferir datos ausentes.",
      "request_full_context_when_needed": true
    }
  }
}
```

## Reglas de Artefactos

### Agentes trabajadores

Cada agente trabajador debe producir exactamente estos artefactos por transición:

1. `{from}-to-{to}-attempt-{retry_count}-{timestamp}.json`
2. `{agent_name}-summary.md`

El JSON puede incluir bloques enriquecidos extra con requisitos, gaps, suites, matrices o cualquier otra estructura útil para el siguiente agente. Esa información ya no debe repartirse obligatoriamente en archivos auxiliares separados.

### Orquestador

El Orquestador mantiene estos artefactos de sesión:

1. `manifest.json`
2. `retry_checkpoint.json`
3. `HANDOFF_Summary.md`
4. `ORCHESTRATION_FINAL_SUMMARY.md`

`HANDOFF_Summary.md` es un log transversal de transiciones. `ORCHESTRATION_FINAL_SUMMARY.md` es el resumen final consolidado de la orquestación.

## Flujo de Información

### 1. Orquestador → Test Documentation
- **Entrada:** `solicitud_qa` y contexto de sesión.
- **Salida esperada:** JSON consolidado con requisitos, fuentes, gaps y demás estructura útil para `test_planner`.
- **Resumen:** `test_documentation-summary.md`.

### 2. Test Documentation → Test Planner
- **Entrada:** handoff completo o fragmentado derivado del JSON de Documentation.
- **Salida esperada:** JSON consolidado con suites, cobertura, precondiciones y trazabilidad útil para `test_prioritization`.
- **Resumen:** `test_planner-summary.md`.

### 3. Test Planner → Test Prioritization
- **Entrada:** handoff completo o fragmentado derivado del JSON de Planner.
- **Salida esperada:** JSON consolidado con priorización, riesgo, decisiones de automatización y recomendación final hacia Orquestador.
- **Resumen:** `test_prioritization-summary.md`.

### Retroalimentación
- Si **Planner** encuentra gaps que bloquean diseño, escala según `feedback_hooks`.
- Si **Prioritization** identifica cobertura imposible, escala según `feedback_hooks`.
- Si un agente recibe un fragmento insuficiente, debe pedir ampliación antes de inferir información faltante.
- Toda escalada también requiere persistencia previa por el Orquestador.

## Resúmenes Markdown

Cada agente trabajador genera su propio `{agent_name}-summary.md`. Como mínimo, ese resumen debe incluir:

1. Cabecera con `Session ID`, `Agent`, fecha/timestamp y estado.
2. Resumen ejecutivo u overview.
3. Métricas clave.
4. Hallazgos, decisiones o bloqueadores que condicionan al siguiente agente.
5. Validación o checklist de cierre.
6. Artefactos generados.
7. Próximo paso o estado del handoff.

Secciones específicas por agente:

- **Test Documentation:** requisitos por área, contratos API y gaps.
- **Test Planner:** suites diseñadas, cobertura, precondiciones y orden de ejecución.
- **Test Prioritization:** matriz de riesgo resumida, MVP/fases, workarounds y recomendación de ejecución.

## Guardrails contra Bucles Infinitos

1. **Cada feedback hook especifica destino y estrategia.**
2. **Retry policy del Orquestador:** máximo 3 intentos por `correlation_id`.
3. **Validation checklist:** `failed` bloquea routing; `warning` permite routing con trazabilidad explícita.
4. **Fragmentación responsable:** un handoff fragmentado debe declarar qué omite y obligar al receptor a pedir ampliación si la necesita.

## Estructura de Directorios Esperada

```text
./tests/Documentation/
├── HANDOFF_Summary.md
├── ORCHESTRATION_FINAL_SUMMARY.md
├── escalation_log.md
└── handoffs/
    └── {session_id}/
        ├── manifest.json
        ├── retry_checkpoint.json
        ├── {from}-to-{to}-attempt-{retry_count}-{timestamp}.json
        ├── test_documentation-summary.md
        ├── test_planner-summary.md
        └── test_prioritization-summary.md
```

## Criterios de Éxito

| Criterio | Descripción |
|----------|-------------|
| **Trazabilidad** | Cada handoff conserva autoría, `timestamp`, `correlation_id` y `rationale` |
| **Eficiencia** | La información estructurada vive en un JSON único por transición |
| **Legibilidad** | Cada agente entrega un Markdown único y legible |
| **No-bucles** | Feedback hooks explícitos y máximo 3 reintentos |
| **Auditabilidad** | Orquestador registra persistencia, routing y escaladas |

## Metaartefactos de Orquestación

### manifest.json
- Índice oficial de handoffs persistidos por sesión.
- Debe registrar al menos: `from_agent`, `to_agent`, `path`, `timestamp`, `validation_status`, `correlation_id`, `retry_count`, `handoff_kind`.

### retry_checkpoint.json
- Estado operativo de reintentos por `correlation_id`.
- Debe registrar al menos: `max_attempts`, `current_retry_count`, `last_error`, `last_updated`.
