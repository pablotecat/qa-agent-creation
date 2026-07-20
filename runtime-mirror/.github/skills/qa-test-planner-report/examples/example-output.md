# Ejemplos de planner.QATesting-execution-summary.md

## Convención Unificada (secciones y campos)

- Metadatos: `Session ID`, `Agente`, `Fecha/Hora`, `Estado`
- Secciones base: `Resumen Ejecutivo`, `Métricas Clave`, `Checklist de Validación`, `Artefactos Generados`, `Próximo Paso`
- Cierre: `Estado de Handoff`, `Resultado de Validación`, `Siguiente Agente`, `Correlation ID`

## Ejemplo 1 - Formato Completo

# Test Planner Agent - Resumen de Ejecución

**Session ID:** <SESSION_ID>
**Agente:** planner.QATesting
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ COMPLETED

---

## 📊 Resumen Ejecutivo

El agente **planner.QATesting** ha completado su responsabilidad en la fase de Planning Layer del pipeline QA.

### Métricas Clave

| Métrica | Valor | Estado |
|---------|-------|--------|
| Test Suites Defined | <SUITE_COUNT> | ✅ (Requirement: <MIN_SUITES>+) |
| Total Scenarios | <SCENARIO_COUNT> | ✅ (Requirement: <MIN_SCENARIOS_PER_SUITE>+ per suite) |
| Requirements Covered | <COVERED_REQ>/<TOTAL_REQ> | ✅ <COVERAGE_REQ_PERCENT>% |
| Functional Coverage | <FUNCTIONAL_COVERAGE>% | ✅ (Target: <TARGET_PERCENT>%+) |
| Automation Decision | <AUTOMATION_STRATEGY> | ✅ |
| Gap Evaluation | <ASSESSED_GAPS>/<TOTAL_GAPS> assessed | ✅ |
| Estimated Execution Time | <ESTIMATED_TIME> | ✅ |

---

## Suites Diseñadas

### SUITE-<NNN>: <SUITE_NAME_1>
- **Requirements:** <REQ_RANGE_OR_LIST>
- **Scenarios:** <SCENARIO_COUNT>
- **Automation:** <AUTOMATION_DETAIL>
- **Coverage:** <COVERAGE_DETAIL>
- **Dependencies:** <DEPENDENCY_DETAIL>

### SUITE-<NNN>: <SUITE_NAME_2>
- **Requirements:** <REQ_RANGE_OR_LIST>
- **Scenarios:** <SCENARIO_COUNT>
- **Automation:** <AUTOMATION_DETAIL>
- **Coverage:** <COVERAGE_DETAIL>
- **Dependencies:** <DEPENDENCY_DETAIL>

---

## Análisis de Cobertura

### Functional Coverage: <FUNCTIONAL_COVERAGE>%

**<COVERED_REQ> de <TOTAL_REQ> requisitos directamente testeable**

- REQ-<NNN> ✅ SUITE-<NNN> (<TRACE_NOTE>)
- REQ-<NNN> ✅ SUITE-<NNN> (<TRACE_NOTE>)

**Missing:** <MISSING_REQ>/<TOTAL_REQ> = <MISSING_REASON>

### Cobertura de Riesgo por Gap

| Gap ID | Severidad | Estado de Cobertura | Mitigación |
|--------|----------|-----------------|-----------|
| GAP-<NNN> | CRITICAL | <PARTIAL/BLOCKED/ACCEPTED> | <MITIGATION_1> |
| GAP-<NNN> | HIGH | <PARTIAL/BLOCKED/ACCEPTED> | <MITIGATION_2> |

---

## Decisiones de Automatización

### All Suites: <AUTOMATION_SUMMARY>

#### Rationale
1. <RATIONALE_POINT_1>
2. <RATIONALE_POINT_2>

#### Implementation Strategy
- **Framework:** <FRAMEWORK>
- **Test Structure:** <STRUCTURE>
- **Reporting:** <REPORTING>

---

## Precondiciones y Orden de Ejecución

### Orden Recomendado de Ejecución
1. **SUITE-<NNN> (<NAME>)** - <ORDER_REASON_1>
2. **SUITE-<NNN> (<NAME>)** - <ORDER_REASON_2>

### Cadena de Dependencias de Datos
```
SUITE-<NNN> (<NAME>)
	↓ <DATA_FLOW>
	├→ SUITE-<NNN> (<NAME>)
	└→ SUITE-<NNN> (<NAME>)
```

---

## ✅ Checklist de Validación

| Criterio | Estado | Evidencia |
|----------|--------|----------|
| <CHECK_1> | ✅ | <EVIDENCE_1> |
| <CHECK_2> | ✅ | <EVIDENCE_2> |

---

## 📁 Artefactos Generados

- **Main:** `planner.QATesting-to-prioritization.QATesting-attempt-<RETRY>-<TIMESTAMP>.json`
- **This file:** `planner.QATesting-execution-summary.md`

---

## 🚀 Próximo Paso

### Validaciones Requeridas
1. <MUST_VALIDATE_1>
2. <MUST_VALIDATE_2>

### Puntos de Decisión para prioritization.QATesting
1. <DECISION_POINT_1>
2. <DECISION_POINT_2>

## Ejemplo 2 - Formato Compacto

# Test Planner - Resumen Compacto

**Session ID:** <SESSION_ID>
**Agente:** planner.QATesting
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ COMPLETED

## Prioridad de Suites
1. Smoke: <SMOKE_SCOPE>
2. Functional: <FUNCTIONAL_SCOPE>
3. Regression: <REGRESSION_SCOPE>

## Prioridad de Automatización
- Tier 1: <TIER_1_CASES>
- Tier 2: <TIER_2_CASES>
- Tier 3: <TIER_3_CASES>

## Riesgos a Monitorear
- <RISK_1>
- <RISK_2>
- <RISK_3>

## Ejemplo 3 - Completo con Warnings

# Test Planner Agent - Resumen de Ejecución

**Session ID:** <SESSION_ID>
**Agente:** planner.QATesting
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ⚠️ COMPLETED WITH WARNINGS

---

## 📊 Resumen Ejecutivo

### Métricas Clave

| Métrica | Valor | Estado |
|---------|-------|--------|
| Test Suites Defined | <SUITE_COUNT> | ✅ |
| Total Scenarios | <SCENARIO_COUNT> | ✅ |
| Functional Coverage | <FUNCTIONAL_COVERAGE>% | ⚠️ Below target |

---

## Análisis de Cobertura

### Cobertura de Riesgo por Gap

| Gap ID | Severidad | Estado de Cobertura | Mitigación |
|--------|----------|-----------------|-----------|
| GAP-<NNN> | CRITICAL | BLOCKED | <BLOCK_REASON> |

---

## Feedback Hooks y Puntos de Escalación

### if_coverage_impossible
- **Escalate to:** usuario (decide siguiente paso)
- **Condition:** <CONDITION>
- **Note:** <NOTE>

---

## 📁 Artefactos Generados

- `planner.QATesting-to-prioritization.QATesting-attempt-<RETRY>-<TIMESTAMP>.json`
- `planner.QATesting-execution-summary.md`
