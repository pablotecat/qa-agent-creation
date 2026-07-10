---
name: "QA Test Prioritization Report Enforcement"
description: "Usar cuando el agente test-prioritization genera su resumen markdown. Obliga el uso de la skill y la estructura del reporte."
applyTo: ".github/agents/qa-team/test-prioritization.agent.md"
---
# QA Test Prioritization Report Enforcement

- DEBES usar la skill `.github/skills/qa-test-prioritization-report/SKILL.md` al producir el resumen markdown.
- DEBES generar exactamente un archivo de resumen markdown llamado `validation-report.md` por ejecución.
- El resumen DEBE incluir todas las secciones obligatorias definidas por la skill.
- Los puntajes de riesgo, el alcance MVP y la recomendación DEBEN coincidir con el handoff JSON.
- Si el handoff de entrada es fragmentario o insuficiente, solicita contexto ampliado antes de asignar prioridades.
