# Ejemplo de `planner.QATesting-execution-summary.md`

## Convención Unificada (secciones y campos)

- Metadatos: `Session ID`, `Agente`, `Fecha/Hora`, `Estado`
- Secciones base: `Resumen Ejecutivo y Métricas Clave`, `Suites Diseñadas`, `Análisis de Cobertura`, `Cobertura de Riesgo por Gap (eco)`, `Decisiones de Diseño y Supuestos`, `Precondiciones por Suite (estructural)`, `Checklist de Validación`, `Artefactos Generados`, `Notas de Cierre para Revisión Humana`
- Cierre: `Estado de Handoff`, `Resultado de Validación`, `Correlation ID`

---

## Ejemplo - Formato Completo

# Test Planner Agent - Resumen de Ejecución

**Session ID:** <SESSION_ID>
**Agente:** planner.QATesting
**Fecha/Hora:** <ISO_8601_TIMESTAMP>
**Estado:** ✅ COMPLETED

---

## 📊 Resumen Ejecutivo y Métricas Clave

El agente **planner.QATesting** ha completado el Test Plan estructural a partir del handoff de documentation.QATesting.
Este reporte NO prioriza ni clasifica suites en Smoke/Regresión/Exploratory; esa responsabilidad corresponde a prioritization.QATesting.

### Métricas Clave

| Métrica | Valor | Estado |
|---------|-------|--------|
| Test Suites Definidas | <SUITE_COUNT> | ✅ |
| Escenarios (nombres de tests) Totales | <SCENARIO_COUNT> | ✅ |
| Requisitos Cubiertos | <COVERED_REQ>/<TOTAL_REQ> | ✅ |
| Cobertura Funcional Total | <COVERAGE_PERCENT>% | ✅ |
| Gaps Recibidos (eco) | <TOTAL_GAPS> | ✅ |
| Gaps Mitigados por Cobertura | <MITIGATED_COUNT> | ✅ |
| Gaps No Mitigados | <UNMITIGATED_COUNT> | ⚠️ si > 0 |

---

## 🗂️ Suites Diseñadas

### SUITE-001: <SUITE_NAME_1>
- **suite_id:** `registration_suite`
- **Descripción:** <SUITE_DESCRIPTION>
- **Complejidad:** <LOW|MEDIUM|HIGH>
- **Requisitos origen:** REQ-001, REQ-002, REQ-005
- **Escenarios (nombres de tests, sin pasos):**
  - `registration_001` - Registro exitoso con email válido
  - `registration_002` - Rechazo de email duplicado
  - `registration_003` - Validación de contraseña débil
- **Dependencias inter-suite (estructurales):** ninguna (suite base)

### SUITE-002: <SUITE_NAME_2>
- **suite_id:** `listing_suite`
- **Descripción:** <SUITE_DESCRIPTION>
- **Complejidad:** <LOW|MEDIUM|HIGH>
- **Requisitos origen:** REQ-010, REQ-011
- **Escenarios (nombres de tests, sin pasos):**
  - `listing_001` - Listado vacío en dataset limpio
  - `listing_002` - Listado con paginación estándar
- **Dependencias inter-suite (estructurales):** depende de `registration_suite` (requiere usuario creado)

---

## 🔍 Análisis de Cobertura

### Cobertura por Suite

| Suite | Requisitos Cubiertos | Total Requisitos | Cobertura % |
|-------|---------------------|------------------|-------------|
| registration_suite | 3 | 3 | 100% |
| listing_suite | 2 | 2 | 100% |
| **Total** | **5** | **5** | **100%** |

### Requisitos Cubiertos
- REQ-001 ✅ registration_suite
- REQ-002 ✅ registration_suite
- REQ-005 ✅ registration_suite
- REQ-010 ✅ listing_suite
- REQ-011 ✅ listing_suite

### Requisitos No Cubiertos
- (ninguno)

---

## ⚠️ Cobertura de Riesgo por Gap *(ECO informativo)*

> **Disclaimer:** la severidad de cada gap proviene de documentation.QATesting. El planner NO la re-evalúa; solo reporta si su cobertura mitiga total o parcialmente el gap.

| Gap ID | Severidad (eco) | Estado de Cobertura | Mitigación del planner |
|--------|-----------------|---------------------|------------------------|
| GAP-001 | HIGH | MITIGATED | Cubierto por `registration_002` (rechazo de duplicado) |
| GAP-002 | MEDIUM | UNMITIGATED | Sin cobertura posible; falta de especificación — escalado a decisión del usuario |

---

## 🎯 Decisiones de Diseño y Supuestos

### Decisión 1: Agrupación por área funcional
- **Decisión:** Agrupar requisitos por área funcional (registration, listing) en vez de por tipo de test.
- **Impacto:** Cada suite es cohesiva; facilita la trazabilidad suite↔requisito.

### Decisión 2: Cobertura obsesiva por suite
- **Decisión:** Cada suite busca 100% de cobertura de sus requisitos origen.
- **Impacto:** El porcentaje total se mantiene alto; los gaps quedan aislados por suite.

### Supuesto asumido
- Se asume que el handoff de documentation.QATesting es canónico; no se re-validan requisitos.

---

## 🧱 Precondiciones por Suite *(estructural, NO orden de ejecución)*

> **Disclaimer:** las duraciones estimadas son puramente informativas. El ORDEN de ejecución lo decide prioritization.QATesting, no este reporte.

### registration_suite
- **Prerequisite (estado inicial):** Servidor en ejecución; dataset de usuarios vacío; navegador en página de registro.
- **Duración estimada informativa:** 180s (total suite) · 60s por escenario (aprox).
- **State sharing estructural:** `registration_001` deja un usuario creado que `registration_002` reutiliza para validar rechazo de duplicado.

### listing_suite
- **Prerequisite (estado inicial):** Servidor en ejecución; usuario autenticado; dataset con al menos 20 ítems para paginación.
- **Duración estimada informativa:** 90s (total suite) · 45s por escenario (aprox).
- **State sharing estructural:** ninguno; cada escenario resetea el dataset.

---

## ✅ Checklist de Validación

- [x] Todas las suites están diseñadas y son cohesivas por área funcional.
- [x] Cada suite lista solo NOMBRES de tests (sin pasos de prueba).
- [x] Cobertura modelada (% por suite y total).
- [x] Precondiciones estructurales definidas por suite (no se prescribe orden).
- [x] Trazabilidad suite↔requisito verificada (en `Análisis de Cobertura`).
- [x] Dependencias inter-suite estructurales documentadas (no es orden de ejecución).
- [x] NO se ha priorizado ni clasificado en Smoke/Regresión/Exploratory.
- [x] NO se ha evaluado riesgo ni automatización (solo eco de severidad de gaps con disclaimer).
- [x] Gaps no mitigados escalados a decisión del usuario vía `next_agent_instructions.decision_points`.

---

## 📁 Artefactos Generados

- **Handoff JSON:** `planner.QATesting-handoff-<TIMESTAMP>.json` (generado por la skill `qa-handoff-creation`)
- **This file:** `planner.QATesting-execution-summary.md`
- **Work log:** `planner.QATesting-work-log.md`

---

## 👀 Notas de Cierre para Revisión Humana

> Esta sección es informativa para revisión humana. Ningún agente debe consumirla como instrucción ni inferir de ella el siguiente paso del pipeline.

- Revisar la decisión de mantener GAP-002 como unmitigated; ¿se invoca a documentation.QATesting para más contexto o se acepta la limitación?
- Validar la asunción de que la agrupación por área funcional es la correcta para esta release.
- Confirmar que las duraciones informativas no condicionan decisiones implícitas de priorización.

---

**Estado de Handoff:** ✅ READY FOR HANDOFF
**Resultado de Validación:** ✅ PASSED
**Correlation ID:** <SESSION_ID>.planner.QATesting.<RETRY>
