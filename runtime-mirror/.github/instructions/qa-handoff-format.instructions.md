---
description: "Usar cuando se crean, validan o enrutan handoffs de QA. Obliga bloques requeridos, validación de schema e integridad de updated_by."
name: "QA Handoff Format"
applyTo: ".github/agents/**/*.agent.md"
---
# QA Handoff Format

- Todo handoff entre agentes debe incluir estos bloques: metadata, context, executive_summary, artifacts_references, delta_changes, validation_checklist, next_agent_instructions y feedback_hooks.
- Toda transición especializada debe producir exactamente un handoff JSON y exactamente un resumen Markdown usando el nombre de archivo específico por rol definido por la skill e instrucción de enforcement de ese rol.
- Valida todos los handoffs especializados contra `.github/agents/qa-team/contracts/handoff-schema.json` antes de enrutar.
- Si `validation_checklist.status=failed`, no enrutes.
- Si `validation_checklist.status=warning`, el enrutamiento está permitido solo con trazabilidad explícita.
- Mantén `delta_changes.updated_by` igual al agente especializado productor.
- No estandarices `README.md` dentro de `sessions/` ni `execution-summary.json` por agente.
- El Orquestador persiste los handoffs recibidos pero nunca modifica `from_agent`, `to_agent`, `updated_by` ni payloads previamente persistidos.
- Si el Orquestador envía un fragmento, debe crear un handoff nuevo y válido contra schema con `metadata.handoff_kind=fragment` y `fragment_context`.
