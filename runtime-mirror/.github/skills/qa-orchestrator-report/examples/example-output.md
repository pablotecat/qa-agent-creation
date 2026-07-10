# Ejemplos de ORCHESTRATION_FINAL_SUMMARY.md

## Convención Unificada (secciones y campos)

- Metadatos: `Session ID`, `Agente`, `Fecha/Hora`, `Estado`
- Secciones base: `Resumen Ejecutivo`, `Resultados por Agente`, `Checklist de Validación`, `Artefactos Generados`, `Recomendación del Orquestador`
- Cierre: `Estado de Cierre`, `Resultado de Validación`, `Siguiente Fase`, `Correlation ID` (si aplica)

## Ejemplo 1 - Cierre Completo

# QA Orchestration - Resumen Final
**Session ID:** <SESSION_ID>
**Agente:** qa-orchestrator
**Inicio:** <ISO_8601_START>
**Fin:** <ISO_8601_END>
**Duración:** <DURATION>
**Estado:** ✅ **COMPLETED**

---

## 🎯 Solicitud Original
**Tipo:** <REQUEST_TYPE>
**Proyecto:** <PROJECT_NAME>
**Modo:** <PIPELINE_MODE>
**Resultado:** <RESULT_SUMMARY>

---

## 📊 Resultados por Agente

### 1️⃣ Test Documentation Agent
**Responsabilidad:** <RESPONSIBILITY>
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ **COMPLETED**

| Métrica | Resultado |
|---------|-----------|
| Requisitos Extraídos | <REQ_COUNT> |
| Áreas de Testing | <AREA_COUNT> |
| Gaps Identificados | <GAP_DISTRIBUTION> |
| Trazabilidad | <TRACEABILITY_PERCENT>% ✅ |

**Artefactos:**
- <DOCUMENTATION_HANDOFF_JSON>
- test_documentation-analysis-report.md

---

### 2️⃣ Test Planner Agent
**Responsabilidad:** <RESPONSIBILITY>
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ **COMPLETED**

| Métrica | Resultado |
|---------|-----------|
| Test Suites Diseñadas | <SUITE_COUNT> |
| Total Escenarios | <SCENARIO_COUNT> |
| Cobertura Funcional | <FUNCTIONAL_COVERAGE>% |
| Automatización | <AUTOMATION_SUMMARY> |

**Artefactos:**
- <PLANNER_HANDOFF_JSON>
- test_planner-execution-summary.md

---

### 3️⃣ Test Prioritization Agent
**Responsabilidad:** <RESPONSIBILITY>
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ **COMPLETED**

| Métrica | Resultado |
|---------|-----------|
| Matriz de Riesgo | ✅ Aplicada (<RISK_MODEL>) |
| MVP Identificado | <MVP_SCOPE_SUMMARY> |
| Nivel de Confianza | <CONFIDENCE_LEVEL> |
| **Recomendación Final** | **🚀 <FINAL_RECOMMENDATION>** |

**Artefactos:**
- <PRIORITIZATION_HANDOFF_JSON>
- validation-report.md

---

## 🔍 Análisis de Gaps vs Ejecución

| Gap | Severidad | Bloquea MVP? | Workaround | Estado |
|-----|-----------|-------------|-----------|--------|
| <GAP_1> | 🔴 CRITICAL | ❌ NO | <WORKAROUND_1> | ✅ ACEPTADO |
| <GAP_2> | 🟡 HIGH | ❌ NO | <WORKAROUND_2> | ✅ ACEPTADO |

---

## 📈 Estadísticas de Sesión

| Métrica | Valor |
|---------|-------|
| **Total Agentes Desplegados** | <AGENT_COUNT> |
| **Handoffs Procesados** | <HANDOFF_COUNT> |
| **Handoffs Validados** | <VALIDATED_RATIO> |
| **Retries Necesarios** | <RETRY_COUNT> |
| **Escalaciones** | <ESCALATION_COUNT> |
| **Estado de Sesión** | ✅ COMPLETED |

---

## ✅ Criterios de Éxito - Cumplimiento

| Criterio | Estado | Notas |
|----------|--------|-------|
| ✅ Requisitos extraídos y normalizados | PASSED | <NOTE_1> |
| ✅ Test suites diseñadas | PASSED | <NOTE_2> |
| ✅ Handoffs validados | PASSED | <NOTE_3> |

---

## 📋 Recomendación del Orquestador

🚀 **RECOMENDACIÓN: <PROCEED/PARTIAL/STOP>**

- **Nivel de Confianza:** <CONFIDENCE_LEVEL>
- **Nivel de Riesgo:** <RISK_LEVEL>
- **Bloqueadores:** <BLOCKER_STATUS>
- **Siguiente Fase:** <NEXT_PHASE>

---

**Estado de Cierre:** ✅ <ISO_8601_END>

## Ejemplo 2 - Cierre con Warnings

# QA Orchestration - Resumen Final
**Session ID:** <SESSION_ID>
**Agente:** qa-orchestrator
**Inicio:** <ISO_8601_START>
**Fin:** <ISO_8601_END>
**Estado:** ⚠️ **COMPLETED WITH WARNINGS**

---

## 📊 Resultados por Agente

### 1️⃣ Test Documentation Agent
**Estado:** ✅ **COMPLETED**

### 2️⃣ Test Planner Agent
**Estado:** ⚠️ **COMPLETED WITH WARNINGS**

### 3️⃣ Test Prioritization Agent
**Estado:** ✅ **COMPLETED**

---

## 🔍 Análisis de Gaps vs Ejecución

| Gap | Severidad | Bloquea MVP? | Workaround | Estado |
|-----|-----------|-------------|-----------|--------|
| <BLOCKING_GAP> | 🔴 CRITICAL | ⚠️ PARTIAL | <WORKAROUND> | ⚠️ MITIGATED TEMPORARILY |

---

## 📋 Recomendación del Orquestador

⚠️ **RECOMENDACIÓN: PROCEED WITH CAUTION**

- **Escalaciones Requeridas:** <ESCALATION_REQUIRED>
- **Condición para Continuar:** <CONDITION>

---

**Estado de Cierre:** ⚠️ <ISO_8601_END>

## Ejemplo 3 - Cierre Bloqueado

# QA Orchestration - Resumen Final
**Session ID:** <SESSION_ID>
**Agente:** qa-orchestrator
**Inicio:** <ISO_8601_START>
**Fin:** <ISO_8601_END>
**Estado:** ❌ **BLOCKED**

---

## 📊 Resultados por Agente

### 1️⃣ Test Documentation Agent
**Estado:** ✅ **COMPLETED**

### 2️⃣ Test Planner Agent
**Estado:** ❌ **FAILED**

---

## 📈 Estadísticas de Sesión

| Métrica | Valor |
|---------|-------|
| **Retries Necesarios** | <RETRY_COUNT_REACHED_LIMIT> |
| **Escalaciones** | <ESCALATION_COUNT> |
| **Estado de Sesión** | ❌ BLOCKED |

---

## 📋 Recomendación del Orquestador

❌ **RECOMENDACIÓN: STOP AND ESCALATE**

- **Bloqueadores:** <BLOCKER_DESCRIPTION>
- **Escalaciones Requeridas:** <ESCALATION_TARGET>
- **Siguiente Fase:** Reintento manual de pipeline tras resolución de bloqueo

---

**Estado de Cierre:** ❌ <ISO_8601_END>
