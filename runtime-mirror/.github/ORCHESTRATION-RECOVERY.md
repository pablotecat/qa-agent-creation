# Guía de Recuperación: Modelo de Orquestación

Este proyecto funcionó con un agente Orchestrator coordinando el pipeline QA.
Se migró a modelo manual el 2026-07-17 por limitaciones de créditos Copilot
en la capa de sub-agentes (tool `agent` de VS Code).

## Rama con la versión orquestada

`preserve/orchestration-model` — contiene el estado completo funcional
antes de la migración.

## Qué se eliminó

| Archivo | Ubicación previa | Recuperable desde |
|---------|-----------------|-------------------|
| `qa-orchestrator.agent.md` | `.github/agents/` | rama preserve |
| `qa-orchestrator-policy.instructions.md` | `.github/instructions/` | rama preserve |
| `qa-routing-guardrails.instructions.md` | `.github/instructions/` | rama preserve |
| `orchestration-config.json` | `.github/agents/contracts/` (then `qa-team/contracts/`) | rama preserve |
| `handoff-hooks-routing.md` | `.github/agents/contracts/` (then `qa-team/contracts/`) | rama preserve |
| `prompt-to-agent.md` | `.github/prompts/` | rama preserve |
| `qa-orchestrator-report/SKILL.md` | `.github/skills/` | rama preserve |
| `qa-orchestrator-report/examples/` | `.github/skills/` | rama preserve |

## Qué se modificó

| Archivo | Cambio principal | Revertible desde |
|---------|-----------------|-----------------|
| `handoff-schema.json` | Eliminados `correlation_id` y `retry_count`; actualizada descripción de `assigned_task` | rama preserve |
| `handoff-specification.md` (was `HANDOFF_SPECIFICATION.md`) | Reescrita para pipeline manual; eliminados metaartefactos de orquestación | rama preserve |
| `documentation.QATesting.agent.md` | `user-invocable: true`; sección de auto-persistencia; eliminada ref a handoff-hooks-routing | rama preserve |
| `planner.QATesting.agent.md` | `user-invocable: true`; eliminadas refs a Orquestador y fragmentos | rama preserve |
| `prioritization.QATesting.agent.md` | `user-invocable: true`; eliminadas refs a Orquestador y fragmentos | rama preserve |
| `qa-handoff-format.instructions.md` | Eliminadas reglas de routing y fragmentación | rama preserve |
| `qa-handoff-creation/SKILL.md` | Eliminados `correlation_id`, `retry_count`; refs a Orquestador | rama preserve |
| `example-handoff.json` | Eliminados `correlation_id`, `retry_count` | rama preserve |
| `README.md` | Reescrito para modelo manual | rama preserve |
| `install-manifest.json` | Eliminadas 9 entradas (archivos eliminados + entrada rota) | rama preserve |
| Skills de reporte (planner, prioritization) | Eliminadas refs a orchestrator en ejemplos | rama preserve |
| `05-generacion-de-documentacion.md` | Eliminada ref a "responsabilidad del Orquestador" | rama preserve |
| `install-prompt.md` | Eliminada ref a "políticas del orquestador" | rama preserve |

## Qué se mantuvo intacto

- `documentation.QATesting.contract.md` (non-goals y guardrails son modelo-agnósticos)
- `WORKFLOW.md` + 5 pasos del workflow de documentation
- `analysis-report-guidance.md` y `analysis-report-template.md`
- `handoff-schema.json` (campos restantes: `agent`, `session_id`, `timestamp`, `status`, etc.)
- `qa-test-planner-report/SKILL.md` (estructura del reporte)
- `qa-test-prioritization-report/SKILL.md` (estructura del reporte)
- Todo el sistema de sesión: `session-counter.json`, patrón `session_{N}_{id}`

## Cómo restaurar

1. `git checkout preserve/orchestration-model -- <archivos>` para recuperar los eliminados.
2. Restaurar `user-invocable: false` en los tres agentes trabajadores.
3. Restaurar `correlation_id` y `retry_count` en `handoff-schema.json` y el ejemplo.
4. Restaurar las 9 entradas eliminadas en `install-manifest.json`.
5. Revertir las descripciones de `assigned_task` en schema y skill.

Alternativa: `git checkout preserve/orchestration-model` para volver al estado completo.

## Cuándo considerar restaurar

- Pipeline condicional (>1 camino posible según input).
- Usuarios no técnicos que no deban conocer el orden de ejecución.
- Créditos Copilot dejen ser limitante (nuevos tiers, uso enterprise).
- Más de 5-6 agentes donde la gestión manual sea impracticable.
- Se quiera implementar un orquestador procedural (Alternativa A del diseño)
  en lugar de un agente LLM como orquestador.

## Nota sobre el modelo eliminado

El Orchestrator original era un agente LLM que hacía trabajo mayormente procedural
(crear carpetas, incrementar contadores, validar contra schema, persistir archivos).
Esto consumía créditos de orquestación de VS Code Copilot (no del modelo subyacente)
de forma multiplicativa: cada tool `agent` abría una sub-conversación completa.

Si se restaura la orquestación, considerar un orquestador procedural (workflow de pasos
ejecutado manualmente) en lugar de un agente LLM para las tareas procedurales.
