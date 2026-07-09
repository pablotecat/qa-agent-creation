# QA Agent Creation

Repositorio para diseñar e implementar un sistema de agentes QA en modo Orchestra, con handoffs estandarizados, validación formal por schema y trazabilidad entre agentes.

## Objetivo

Crear un flujo multiagente donde:

- Solo el Orquestador QA es invocable por el usuario.
- Los agentes de Planificación colaboran mediante handoffs JSON validados.
- Cada transición mantiene trazabilidad técnica y resumen humano.

## Alcance actual

Implementado/documentado para:

- Orquestador QA
- Test Documentation Agent
- Test Planner Agent
- Test Prioritization Agent

No implementado en esta versión:

- Capa Creación
- Capa Ejecución
- Capa Análisis

## Estructura del repositorio

```text
.
├── initial-prompt.md
├── prompt-to-agent.md
└── agent-creation-files/
    ├── INDEX.md
    ├── README.md
    ├── QUICK_REFERENCE.md
    ├── IMPLEMENTATION_CHECKLIST.md
    ├── HANDOFF_SPECIFICATION.md
    ├── handoff-schema.json
    ├── handoff-hooks-routing.md
    ├── agent-templates/
    │   ├── documentation.agent.md
    │   ├── planner.agent.md
    │   └── prioritization.agent.md
    └── examples/
        ├── README.md
        ├── handoff_documentation_to_planner.json
        ├── handoff_planner_to_prioritization.json
        └── handoff_feedback_gap_escalation.json
```

## Quick Start

1. Lee la guía principal en `agent-creation-files/README.md`.
2. Revisa la especificación de handoff en `agent-creation-files/HANDOFF_SPECIFICATION.md`.
3. Valida estructura y campos con `agent-creation-files/handoff-schema.json`.
4. Aplica reglas de escalado en `agent-creation-files/handoff-hooks-routing.md`.
5. Sigue el checklist en `agent-creation-files/IMPLEMENTATION_CHECKLIST.md`.
6. Usa los templates en `agent-creation-files/agent-templates/` para crear agentes.

## Contratos clave

- Todo handoff inter-agente debe validar contra el schema.
- Cada handoff incluye metadata, contexto, resumen ejecutivo, referencias de artefactos, delta de cambios, checklist de validación, instrucciones al siguiente agente y feedback hooks.
- El orquestador aplica retry policy con máximo de 3 intentos y aborta con estado global bloqueado cuando corresponde.
- El orquestador es el persistidor oficial de handoffs recibidos en `./tests/Documentation/handoffs/{session_id}/`.
- Ninguna transicion es valida hasta que el handoff quede persistido en almacenamiento canonico.
- El orquestador no debe alterar autoria ni contenido del handoff (`from_agent`, `to_agent`, `updated_by`).

## Flujo esperado

Orquestador -> Documentation -> Planner -> Prioritization

Con feedback loops controlados y auditables según la matriz de escaladas.

## Archivos de entrada relevantes

- `initial-prompt.md`: prompt base del sistema y reglas operativas.
- `prompt-to-agent.md`: ejemplo de solicitud para ejecutar estrategia QA end-to-end.

## Recomendaciones para contribuir

- Mantener consistencia entre especificación, schema, ejemplos y templates.
- No introducir cambios en el formato de handoff sin actualizar la documentación y el schema.
- Validar ejemplos JSON tras cualquier cambio estructural.

## Licencia

Pendiente de definir.
