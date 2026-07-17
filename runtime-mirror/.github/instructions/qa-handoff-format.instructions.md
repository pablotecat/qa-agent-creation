---
description: "Usar cuando se crean o validan handoffs de QA. Obliga bloques requeridos, validación de schema e integridad de updated_by."
name: "QA Handoff Format"
applyTo: ".github/agents/**/*.agent.md"
---
# QA Handoff Format

- Todo handoff entre agentes debe incluir estos bloques: metadata, context, executive_summary, artifacts_references, delta_changes, validation_checklist, next_agent_instructions y feedback_hooks.
- Toda ejecucion especializada debe producir exactamente un handoff JSON y exactamente un resumen Markdown usando el nombre de archivo específico por rol definido por la skill e instrucción de enforcement de ese rol.
- Valida todos los handoffs especializados contra `.github/agents/contracts/handoff-schema.json` antes de entregar.
- Si `validation_checklist.status=failed`, no entregues el handoff como completado.
- Si `validation_checklist.status=warning`, la entrega está permitida solo con trazabilidad explícita.
- Mantén `delta_changes.updated_by` igual al agente especializado productor.
- No estandarices `README.md` dentro de `sessions/` ni `execution-summary.json` por agente.
- No alteres `from_agent`, `to_agent`, `updated_by` ni payloads previamente persistidos en handoffs existentes.
