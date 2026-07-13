---
description: "Usar al gestionar escalaciones QA, retries y transiciones de handoff. Evita bucles y obliga persistencia antes del routing."
name: "QA Routing Guardrails"
applyTo: ".github/agents/**/*.agent.md"
---
# QA Routing Guardrails

- El orquestador debe persistir cada handoff recibido antes de despachar al siguiente agente.
- Si la persistencia falla, el routing se bloquea y se registra como fallo de orquestación.
- La política de retries se limita a 3 intentos por correlation_id.
- Si `retry_count >= 3`, abortar con estado global `blocked`.
- Toda escalación debe incluir destino explícito y rationale.
- `feedback_hooks.if_conflict_detected` debe incluir `escalate_to`.
- El dispatch fragmentado solo está permitido cuando el orquestador emite un handoff JSON nuevo que referencia el handoff origen ya persistido.
- Cualquier agente que reciba un handoff fragmentado debe solicitar contexto completo antes de inferir información faltante.
- Nunca usar ejecución manual para reemplazar responsabilidades de un agente fallido.
