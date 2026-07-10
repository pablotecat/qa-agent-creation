---
name: "QA Test Planner Report Enforcement"
description: "Usar cuando el agente test-planner genera su resumen markdown. Obliga el uso de la skill y la estructura del reporte."
applyTo: ".github/agents/qa-team/test-planner.agent.md"
---
# QA Test Planner Report Enforcement

- DEBES usar la skill `.github/skills/qa-test-planner-report/SKILL.md` al producir el resumen markdown.
- DEBES generar exactamente un archivo de resumen markdown llamado `test_planner-execution-summary.md` por ejecución.
- El resumen DEBE incluir todas las secciones obligatorias definidas por la skill.
- Las métricas de cobertura, el conteo de suites y el conteo de escenarios DEBEN coincidir con el handoff JSON.
- Si el contexto de planificación está incompleto (incluyendo fragmentos insuficientes), solicita el contexto completo antes de inferir.
