---
description: "Use when creating, validating, or routing QA handoffs. Enforces required blocks, schema validation, and updated_by integrity."
name: "QA Handoff Format"
applyTo: ".github/agents/**/*.agent.md"
---
# QA Handoff Format

- Every inter-agent handoff must include these blocks: metadata, context, executive_summary, artifacts_references, delta_changes, validation_checklist, next_agent_instructions, feedback_hooks.
- Every specialized transition must produce exactly one handoff JSON and exactly one Markdown summary named `{agent_name}-summary.md`.
- Validate all specialized handoffs against `.github/agents/qa-team/contracts/handoff-schema.json` before routing.
- If `validation_checklist.status=failed`, do not route.
- If `validation_checklist.status=warning`, route is allowed only with trace logging.
- Keep `delta_changes.updated_by` equal to the producing specialized agent.
- Do not standardize `README.md` inside `handoffs/`, `execution-summary.json` per agent, or `validation-report.md` per agent.
- Orchestrator persists received handoffs but never mutates `from_agent`, `to_agent`, `updated_by`, or any previously persisted payload.
- If the Orchestrator sends a fragment, it must create a new schema-valid handoff with `metadata.handoff_kind=fragment` and `fragment_context`.
