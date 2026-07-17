# Ejemplos de validation-report.md (test_prioritization)

## Convención Unificada (secciones y campos)

- Metadatos: `Session ID`, `Agente`, `Fecha/Hora`, `Estado`
- Secciones base: `Validación contra Handoff Schema`, `Checklist de Cumplimiento`, `Estado de Handoff`
- Cierre: `Resultado de Validación`, `Siguiente Agente` (cuando aplique), `Correlation ID` (cuando aplique)

## Ejemplo 1 - Validación Completa PASSED

# Validación de Handoff - <FROM_AGENT> → <TO_AGENT>

**Session ID:** <SESSION_ID>
**Archivo:** <HANDOFF_FILENAME>.json
**Agente:** test_prioritization
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ PASSED

---

## ✅ Validación contra Handoff Schema

### Metadata - Required Fields
- [x] from_agent: "<FROM_AGENT>" (pattern: ^[a-z][a-z0-9_]{2,30}$)
- [x] to_agent: "<TO_AGENT>" (pattern: ^[a-z][a-z0-9_]{2,30}$)
- [x] session_id: "<SESSION_ID>" (UUID format)
- [x] timestamp: "<ISO_8601_TIMESTAMP>" (ISO 8601)
- [x] session_id: "<SESSION_ID>" (UUID format)
- [x] timestamp: "<ISO_8601_TIMESTAMP>" (ISO 8601)

### Context - Required Fields
- [x] user_request_id: "<USER_REQUEST_ID>" (string)
- [x] phase: "planning_layer" (enum: valid)
- [x] status: "ready_for_handoff" (enum: valid)

### Executive Summary - Required Fields
- [x] state_snapshot: "<STATE_SNAPSHOT>"
- [x] critical_findings: [array with <N> items]
- [x] recommendation: "<RECOMMENDATION>"

### Checklist de Validación - Campos Requeridos
- [x] status: "passed"
- [x] checks: {<CHECK_KEYS_AND_RESULTS>}

---

## ✅ Contenido Adicional (Extraschema pero Enriquecedor)

### Resumen de Matriz de Riesgo
```json
✅ Suites evaluadas: <SUITE_COUNT>
✅ Modelo de puntaje: <RISK_FORMULA>
✅ Severidades: <SEVERITY_DISTRIBUTION>
```

### MVP y Fases
```json
✅ MVP: <MVP_SUITES>
✅ Next Phase: <NEXT_PHASE_SUITES>
✅ Time Estimate: <TIME_ESTIMATE>
```

---

## 🎯 Checklist de Cumplimiento

| Requisito | Estado | Notas |
|-------------|--------|-------|
| Cumplimiento de schema | ✅ PASSED | All required fields present |
| Completitud de priorización | ✅ PASSED | MVP and phases documented |
| Claridad de recomendación | ✅ PASSED | Go/No-go explicit |

---

## 🚀 Estado de Handoff

✅ **This handoff is READY**

**Resultado de Validación:** ✅ VALIDATION PASSED - READY FOR HANDOFF

## Ejemplo 2 - Validación con WARNING

# Validación de Handoff - <FROM_AGENT> → <TO_AGENT>

**Session ID:** <SESSION_ID>
**Archivo:** <HANDOFF_FILENAME>.json
**Agente:** test_prioritization
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ⚠️ WARNING

---

## ⚠️ Validación contra Handoff Schema

### Metadata - Required Fields
- [x] agent valid
- [x] session_id valid

### Advisory Findings
- [ ] <OPTIONAL_BLOCK_1> missing (non-blocking)
- [ ] <OPTIONAL_BLOCK_2> partially populated (non-blocking)

---

## 🎯 Checklist de Cumplimiento

| Requisito | Estado | Notas |
|-------------|--------|-------|
| Cumplimiento de schema | ✅ PASSED | Required blocks valid |
| Completitud advisory | ⚠️ WARNING | Optional sections incomplete |
| Elegibilidad de routing | ⚠️ ALLOWED WITH TRACE | Route with warning log |

---

## 🚀 Estado de Handoff

⚠️ **READY WITH WARNINGS**

**Resultado de Validación:** ⚠️ VALIDATION WARNING - PROCEED WITH TRACE

## Ejemplo 3 - Validación FAILED

# Validación de Handoff - <FROM_AGENT> → <TO_AGENT>

**Session ID:** <SESSION_ID>
**Archivo:** <HANDOFF_FILENAME>.json
**Agente:** test_prioritization
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ❌ FAILED

---

## ❌ Validación contra Handoff Schema

### Blocking Errors
- [ ] status field missing
- [ ] assigned_task missing

---

## 🎯 Checklist de Cumplimiento

| Requisito | Estado | Notas |
|-------------|--------|-------|
| Cumplimiento de schema | ❌ FAILED | Blocking fields missing |
| Elegibilidad de routing | ❌ BLOCKED | Do not route |

---

## 🚫 Estado de Handoff

❌ **NOT READY FOR SUBMISSION**

### Acciones Requeridas
1. ❌ Rechazar handoff
2. ⏳ Solicitar corrección al agente productor

**Resultado de Validación:** ❌ VALIDATION FAILED - DO NOT PROCEED
