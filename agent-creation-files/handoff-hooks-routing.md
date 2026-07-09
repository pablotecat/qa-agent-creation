# Feedback Hooks Routing Guide

## Propósito

Definir explícitamente a qué agente volver en caso de problemas, previniendo bucles infinitos y garantizando que cada escalada tiene un propósito claro.

## Matriz de Escaladas

### Test Documentation Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_gaps_found` | test_documentation | Vuelve a extraer/normalizar | "Gap en session expiry detection → re-extract con contexto de Auth flow" |
| `if_conflict_detected` | test_documentation | Resuelve contradicciones en requisitos | "Email validation rules inconsistentes entre Registration y Users" |

**Salida esperada del retry:**
- Requisitos adicionales o clarificados
- Gherkin re-normalizado
- Gaps actualizados en `gaps_identified.json`

---

### Test Planner Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_gaps_found` | test_documentation | Los gaps de Planner van a Documentation | "Gap: precondiciones indefinidas en Auth suite → Documentation debe re-extraer contexto" |
| `if_coverage_impossible` | test_planner | Re-diseña suite con constraints | "No es posible cubrir 100% con los requisitos dados → redesign suite con cobertura pragmática" |
| `if_risk_reassessment` | orchestrator | Impacto > 1 suite | "Riesgo de cambio de alcance en Auth afecta todas las suites" |

**Salida esperada del retry:**
- Suites re-diseñadas
- Precondiciones clarificadas
- Coverage model actualizado
- Decisión auditada en `decision_log.md`

---

### Test Prioritization Feedback Hooks

| Condición | Escalate To | Estrategia | Ejemplo |
|-----------|-------------|-----------|---------|
| `if_coverage_impossible` | test_planner | Factibilidad de automatización cuestionable | "No hay escenarios de Planner suficientes para cobertura de Smoke → re-design suite" |
| `if_impossibility_due_to_gaps` | test_documentation | Gaps originales impiden priorización | "Gap en performance reqs impide evaluar riesgo de Auth → volver a Documentation" |
| `if_conflict_detected` | test_prioritization | Conflicto en matriz (riesgo vs costo) | "Suite X marcada CRITICAL pero imposible automatizar → rebalancear" |
| `if_orchestrator_decision_needed` | orchestrator | Trade-off complejo | "Costo de automatización completa > valor esperado → Orq decide scope" |

**Salida esperada del retry:**
- Matriz de riesgo re-evaluada
- Selección de automatización justificada
- `justification.md` con auditoría de decisiones

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
- Actualiza `gaps_identified.json`
- Incrementa `retry_count` a 2
- Crea nuevo handoff a Planner

**Paso 3: Planner intenta nuevamente**
- Si sigue habiendo gap → incrementa `retry_count` a 3 y escalate a orchestrator
- Si gap resuelto → continúa con diseño de suites

---

## Registro de Escaladas

Se DEBE mantener un archivo centralizado:

**`Documentation/escalation_log.md`**
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
✅ **Trazabilidad auditada:** `rationale` + `timestamp` + `correlation_id`
✅ **Resolución esperada documentada:** Cada escalada especifica qué se espera del retry
✅ **Escalation log centralizado:** Auditoría de todas las escaladas
✅ **Persistencia canonica garantizada:** No hay transicion efectiva sin handoff persistido
