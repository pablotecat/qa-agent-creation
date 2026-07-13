---
name: "QA Orchestrator Final Report Enforcement"
description: "Usar cuando el orquestador cierra una sesión y redacta el resumen markdown final consolidado."
applyTo: ".github/agents/qa-orchestrator.agent.md"
---
# QA Orchestrator Final Report Enforcement

- DEBES usar la skill `.github/skills/qa-orchestrator-report/SKILL.md` al producir el resumen markdown final.
- DEBES generar exactamente un archivo de resumen final markdown llamado `ORCHESTRATION_FINAL_SUMMARY.md` por cada sesión cerrada.
- El resumen final DEBE incluir todas las secciones obligatorias definidas por la skill.
- Las métricas consolidadas y el estado DEBEN coincidir con los handoffs persistidos y el estado final del manifest.
- Si faltan salidas requeridas de alguna etapa, registra una escalada y bloquea el cierre en lugar de inferir resultados.
