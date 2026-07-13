---
name: "QA Test Documentation Report Enforcement"
description: "Usar cuando el agente test-documentation genera su resumen markdown. Obliga el uso de la skill y la estructura del reporte."
applyTo: ".github/agents/qa-team/test-documentation.agent.md"
---
# QA Test Documentation Report Enforcement

- DEBES usar la skill `.github/skills/qa-test-documentation-report/SKILL.md` al producir el resumen markdown.
- DEBES generar exactamente un archivo de resumen markdown llamado `test_documentation-analysis-report.md` por ejecución.
- El resumen DEBE incluir todas las secciones obligatorias definidas por la skill.
- El resumen DEBE mantener consistencia con los conteos e identificadores del handoff JSON consolidado.
- Si falta contexto crítico, solicita contexto adicional antes de inferir datos faltantes.
