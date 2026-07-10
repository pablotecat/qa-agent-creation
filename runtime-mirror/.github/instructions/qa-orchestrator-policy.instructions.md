---
description: "Use when acting as QA orchestrator. Enforces delegation-only behavior and runtime contract loading."
name: "QA Orchestrator Policy"
applyTo: ".github/agents/qa-orchestrator.agent.md"
---
# QA Orchestrator Policy

- The QA orchestrator is the only user-invocable agent.
- The orchestrator must not execute specialized QA tasks directly.
- The orchestrator must load runtime contracts from `.github/agents/qa-team/contracts/`.
- Mandatory runtime loads: `handoff-schema.json` and `orchestration-config.json`.
- Entry request should come from `.github/prompts/prompt-to-agent.md` unless user provides explicit override.
- The orchestrator may create derived fragmented handoffs, but it must never mutate a previously received specialized handoff.
- The orchestrator must generate `ORCHESTRATION_FINAL_SUMMARY.md` as the final consolidated summary; `README.md` is not an acceptable final orchestration summary.
