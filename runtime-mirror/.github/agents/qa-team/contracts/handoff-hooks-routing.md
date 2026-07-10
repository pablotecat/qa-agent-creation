# Feedback Hooks Routing Guide

## Propósito

Definir explícitamente a qué agente volver en caso de problemas, previniendo bucles infinitos y garantizando que cada escalada tiene un propósito claro.

## Modo Operativo del Orquestador

- Modo de ejecución: secuencial.
- Resolución de prerequisitos por defecto: **pre-resolución**.
- Ningún routing es válido sin persistencia previa del handoff recibido.
- Si el siguiente agente solo necesita parte del contexto, el Orquestador puede generar un **handoff derivado fragmentado** con nueva metadata y referencia explícita al handoff origen.
- Ningún agente debe inferir datos ausentes de un fragmento; debe pedir el handoff completo o contexto adicional antes de continuar.

## Matriz de Escaladas

### Test Documentation Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_gaps_found` | test_documentation | Vuelve a extraer/normalizar | "Gap en session expiry detection → re-extract con contexto de Auth flow" |
| `if_conflict_detected` | test_documentation | Resuelve contradicciones en requisitos | "Email validation rules inconsistentes entre Registration y Users" |

**Salida esperada del retry:**
- Requisitos adicionales o clarificados
- JSON consolidado actualizado
- `test_documentation-summary.md` actualizado

---

### Test Planner Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_gaps_found` | test_documentation | Los gaps de Planner van a Documentation | "Gap: precondiciones indefinidas en Auth suite → Documentation debe re-extraer contexto" |
| `if_coverage_impossible` | test_planner | Re-diseña suite con constraints | "No es posible cubrir 100% con los requisitos dados → redesign suite con cobertura pragmática" |

**Salida esperada del retry:**
- JSON consolidado re-diseñado
- Precondiciones clarificadas
- `test_planner-summary.md` actualizado

---

### Test Prioritization Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_coverage_impossible` | test_planner | Factibilidad de automatización cuestionable | "No hay escenarios de Planner suficientes para cobertura de Smoke → re-design suite" |
| `if_conflict_detected` | test_prioritization | Conflicto en matriz (riesgo vs costo) | "Suite X marcada CRITICAL pero imposible automatizar → rebalancear" |

**Salida esperada del retry:**
- JSON consolidado re-evaluado
- Selección de automatización justificada
- `test_prioritization-summary.md` actualizado

---

## Reglas para Handoffs Fragmentados

### Cuándo fragmentar

El Orquestador solo debe fragmentar cuando:

1. El agente destino no necesita el payload completo para avanzar.
2. El fragmento puede señalar claramente qué se incluye y qué se omite.
3. El fragmento conserva referencia al handoff origen persistido.

### Qué debe incluir el fragmento

Todo handoff fragmentado debe incluir `fragment_context` con:

- `source_handoff_correlation_id`
- `source_handoff_path`
- `included_sections`
- `omitted_sections`
- `consumer_notice`
- `request_full_context_when_needed=true`

### Obligación del agente receptor

Si el fragmento no basta, el agente receptor debe:

1. Escalar o pedir contexto adicional antes de inferir.
2. Explicar en `delta_changes.rationale` qué parte faltó.
3. Mantener la trazabilidad al handoff origen.

---

## Prevención de Bucles Infinitos

### Guardrail 1: Retry Counter
```json
{
  "metadata": {
    "retry_count": 0  // Incrementa en cada escalada
  }
}
```

**Regla:** Si `retry_count >= 3`, abortar y escalate a `orchestrator` con `context.status=failed` y `status_global=blocked`

### Guardrail 2: Escalation Path Clarity

Cada agente SOLO puede escalar a:
- **Test Documentation:** escalate a self (retry) o orchestrator
- **Test Planner:** escalate a test_documentation, self (retry), u orchestrator
- **Test Prioritization:** escalate a test_planner, test_documentation, self (retry), u orchestrator

### Guardrail 3: Rationale Audit

Toda escalada DEBE incluir:
```json
{
  "delta_changes": {
    "rationale": "Por qué escalamos y qué esperamos que el siguiente agente haga"
  }
}
```

### Guardrail 4: Persistencia Previa Al Routing

Toda transicion (nominal o de escalada) DEBE cumplir:

1. Orquestador persiste el handoff recibido en `./tests/Documentation/handoffs/{session_id}/`.
2. Orquestador actualiza `manifest.json` y `retry_checkpoint.json`.
3. Solo despues de persistencia exitosa se considera valida la transicion.

**Regla:** Si la persistencia falla, NO hay routing y se trata como fallo de orquestacion.

---

## Ejemplo: Flujo con Retroalimentación

### Escenario
Planner recibe requisitos de Documentation, detecta gap en precondiciones de Auth flow.

**Paso 1: Planner crea handoff con escalada**
```json
{
  "handoff": {
    "metadata": {
      "from_agent": "test_planner",
      "to_agent": "test_documentation",
      "retry_count": 1,
      "correlation_id": "planner-gap-001"
    },
    "context": {
      "status": "escalated"
    },
    "feedback_hooks": {
      "if_gaps_found": {
        "escalate_to": "test_documentation"
      }
    },
    "delta_changes": {
      "rationale": "Gap detectado en precondiciones de Auth flow. Documentation debe re-extraer contexto de session management y token lifecycle."
    }
  }
}
```

**Paso 2: Documentation recibe y re-procesa**
- Re-extrae requisitos de Auth flow
- Actualiza el JSON consolidado
- Incrementa `retry_count` a 2
- Crea nuevo handoff a Planner

**Paso 3: Planner intenta nuevamente**
- Si sigue habiendo gap → incrementa `retry_count` a 3 y escalate a orchestrator
- Si gap resuelto → continúa con diseño de suites

---

## Registro de Escaladas

Se DEBE mantener un archivo centralizado:

**`./tests/Documentation/escalation_log.md`**
```markdown
# Escalation Log

| Timestamp | From | To | Reason | Retry_Count | Resolution |
|-----------|------|-----|--------|-------------|------------|
| 2026-07-08T10:30Z | test_planner | test_documentation | Gap in Auth preconditions | 1 | ✅ Resolved - session management re-extracted |
| 2026-07-08T10:45Z | test_prioritization | test_planner | Coverage impossible | 1 | ✅ Redesign - added 3 new scenarios |
```

---

## Criterios de Éxito

✅ **No hay bucles infinitos:** max 3 reintentos antes de abortar
✅ **Cada escalada tiene destino claro:** `escalate_to` es específico
✅ **Conflictos enrutable:** `if_conflict_detected` siempre incluye `escalate_to`
✅ **Trazabilidad auditada:** `rationale` + `timestamp` + `correlation_id`
✅ **Resolución esperada documentada:** Cada escalada especifica qué se espera del retry
✅ **Escalation log centralizado:** Auditoría de todas las escaladas
✅ **Persistencia canonica garantizada:** No hay transicion efectiva sin handoff persistido
✅ **Fragmentación responsable:** todo fragmento declara sus omisiones y obliga a pedir contexto adicional cuando haga falta
