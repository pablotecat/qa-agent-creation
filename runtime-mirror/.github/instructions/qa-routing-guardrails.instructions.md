---
description: "Use when handling QA escalations, retries, and handoff transitions. Prevents loops and enforces persistence-before-routing."
name: "QA Routing Guardrails"
applyTo: ".github/agents/**/*.agent.md"
---
# QA Routing Guardrails

- The orchestrator must persist each received handoff before dispatching the next agent.
- If persistence fails, routing is blocked and logged as orchestration failure.
- Retry policy is capped at 3 attempts per correlation_id.
- On `retry_count >= 3`, abort with global status `blocked`.
- Escalations must include an explicit destination and rationale.
- `feedback_hooks.if_conflict_detected` must include `escalate_to`.
- Never use manual execution to replace failed agent responsibilities.
