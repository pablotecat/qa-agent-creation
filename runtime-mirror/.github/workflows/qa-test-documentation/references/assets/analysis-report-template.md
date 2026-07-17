# Ejemplos de test_documentation-analysis-report.md

## Convención Unificada (secciones y campos)

- Metadatos: `Session ID`, `Agente`, `Fecha/Hora`, `Estado`
- Secciones base: `Resumen Ejecutivo`, `Checklist de Validación`, `Artefactos Generados`, `Notas de Cierre para Revisión Humana`
- Cierre: `Estado de Handoff`, `Resultado de Validación`, `Correlation ID`

## Ejemplo - Formato Completo

# Test Documentation - Análisis Completado

**Session ID:** <SESSION_ID>
**Agente:** test_documentation
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ COMPLETED

---

## 📊 Resumen Ejecutivo

### Estado del Análisis
- **Requisitos Extraídos:** <REQ_COUNT> (normalizados en Gherkin)
- **Gaps Identificados:** <GAP_COUNT> (<CRITICAL_COUNT> CRITICAL, <HIGH_COUNT> HIGH, <MEDIUM_COUNT> MEDIUM, <LOW_COUNT> LOW)
- **Áreas de Testing:** <AREA_COUNT> (<AREA_1>, <AREA_2>, <AREA_3>, <AREA_4>, <AREA_5>)
- **Endpoints API:** <ENDPOINT_COUNT> documentados con payloads y respuestas
- **Trazabilidad:** <TRACEABILITY_PERCENT>% verificada a código fuente

### Hallazgos Críticos
```
🔴 CRITICAL: <CRITICAL_FINDING_1>
🔴 CRITICAL: <CRITICAL_FINDING_2>
🟡 HIGH: <HIGH_FINDING_1>
🟡 HIGH: <HIGH_FINDING_2>
🟡 MEDIUM: <MEDIUM_FINDING_1>
🟢 LOW: <LOW_FINDING_1>
```

---

## 📋 Requisitos Normalizados por Área

### Area 1: <AREA_NAME_1> (<REQ_AREA_1_COUNT> requisitos)
| ID | Título | Gherkin | Fuente |
|----|--------|---------|--------|
| REQ-<NNN> | <REQ_TITLE_1> | Given <...> When <...> Then <...> | <SOURCE_1> |
| REQ-<NNN> | <REQ_TITLE_2> | Given <...> When <...> Then <...> | <SOURCE_2> |

**Blocker Gaps:** <BLOCKER_GAPS_AREA_1>
**Advisory Gaps:** <ADVISORY_GAPS_AREA_1>

---

### Area 2: <AREA_NAME_2> (<REQ_AREA_2_COUNT> requisitos)
| ID | Título | Gherkin | Fuente |
|----|--------|---------|--------|
| REQ-<NNN> | <REQ_TITLE_3> | Given <...> When <...> Then <...> | <SOURCE_3> |

**Blocker Gaps:** <BLOCKER_GAPS_AREA_2>

---

## 🔗 API Endpoints Documentados

### <METHOD> <ENDPOINT_1>
```json
Request:  { <REQUEST_SCHEMA> }
Response: { <RESPONSE_SCHEMA> }
Errors:   <ERROR_SCHEMAS>
```

### <METHOD> <ENDPOINT_2>
```json
Response: { <RESPONSE_SCHEMA> }
Errors:   <ERROR_SCHEMAS>
```

---

## ⚠️ Gaps Críticos Identificados

| Gap ID | Severidad | Categoría | Título | Impacto en Testing | Recomendación |
|--------|-----------|-----------|--------|-------------------|---------------|
| GAP-<NNN> | CRITICAL | <CATEGORY_1> | <GAP_TITLE_1> | <TEST_IMPACT_1> | <RECOMMENDATION_1> |
| GAP-<NNN> | HIGH | <CATEGORY_2> | <GAP_TITLE_2> | <TEST_IMPACT_2> | <RECOMMENDATION_2> |

---

## 🎯 Decisiones Pendientes

1. <DECISION_POINT_1>
2. <DECISION_POINT_2>
3. <DECISION_POINT_3>

---

## ✅ Checklist de Validación

- [x] All requirements extracted from source code
- [x] Gherkin syntax validation (Given/When/Then format)
- [x] Source traceability verified
- [x] Gaps identified and classified by severity
- [x] No test cases created (documentation-only scope)

---

## 📁 Artefactos Generados

- **Handoff JSON:** `test_documentation-handoff-<TIMESTAMP>.json`
- **Manifest:** Updated with handoff registry and status history
- **This Summary:** `test_documentation-analysis-report.md`

---

## 🚀 Notas de Cierre para Revisión Humana

> Esta sección es informativa para revisión humana. Ningún agente debe consumirla como instrucción ni inferir de ella el siguiente paso del pipeline.

- Revisar los <REQ_COUNT> requisitos normalizados
- Evaluar los <GAP_COUNT> gaps identificados

---

**Estado de Handoff:** ✅ READY FOR HANDOFF
**Resultado de Validación:** ✅ PASSED
**Correlation ID:** <SESSION_ID>.test_documentation.<RETRY>
