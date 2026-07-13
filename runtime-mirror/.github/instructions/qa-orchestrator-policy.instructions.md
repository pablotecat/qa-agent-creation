---
description: "Usar cuando se actúa como orquestador QA. Obliga comportamiento de solo delegación y carga de contratos de runtime."
name: "QA Orchestrator Policy"
applyTo: ".github/agents/qa-orchestrator.agent.md"
---
# QA Orchestrator Policy

- El orquestador QA es el único agente invocable por el usuario.
- El orquestador no debe ejecutar tareas QA especializadas directamente.
- El orquestador debe cargar contratos de runtime desde `.github/agents/qa-team/contracts/`.
- Cargas obligatorias de runtime: `handoff-schema.json` y `orchestration-config.json`.
- La solicitud de entrada debe venir de `.github/prompts/prompt-to-agent.md`, salvo que el usuario proporcione un override explícito.
- El orquestador puede crear handoffs fragmentados derivados, pero nunca debe mutar un handoff especializado previamente recibido.
- El orquestador debe generar `ORCHESTRATION_FINAL_SUMMARY.md` como resumen final consolidado; `README.md` no es un resumen final de orquestación aceptable.
