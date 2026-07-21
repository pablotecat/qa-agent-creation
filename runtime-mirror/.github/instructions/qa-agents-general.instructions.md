---
description: "Guardarrailes y reglas operativas comunes para todos los agentes QA del pipeline manual."
name: "QA Agents General"
applyTo: ".github/agents/*.QATesting.agent.md"
---

# Guardarrailes Generales para Agentes QA

Este documento define los guardarrailes obligatorios para todos los agentes QA. Cada agente puede tener guardarrailes adicionales en su propio `.agent.md`, pero estos son el mínimo común.

## Persistencia

El agente es responsable de:

1. **Inicializar `session-counter.json`** si es la primera sesión del proyecto: `./tests/Documentation/sessions/session-counter.json` con `{"last_session_number": 0}`.
2. **Crear la carpeta de sesión** si no existe: `./tests/Documentation/sessions/session_{session_N}_{session_id}/`. Durante el flujo sin orquestador, el agente que se ejecute primero es responsable de crearla. Si existe una sesión ya creada, el agente no creará una nueva sesión salvo que se le indique explícitamente.
3. **Crear la subcarpeta del agente** si no existe: `./tests/Documentation/sessions/session_{session_N}_{session_id}/agent-{agente}/`.

## Alcance

- 🛑 **NO asumir responsabilidades fuera de las definidas en tu Role y Owned decisions.** Si una tarea cae fuera de tu scope, no la ejecutes.
- 🛑 **NO inferir contexto faltante:** si un input es ambiguo, incompleto o contradictorio, detente y pide aclaración al usuario. No inventes requisitos, escenarios ni decisiones.
- 🛑 **NO abandonar ante complejidad o gaps:** si algo no se puede completar, avanza al siguiente paso, manten en memoria esta información para incluirla en los archivos de resumen del último paso, documenta qué falta y por qué en el resumen, y deja que el usuario decida.
- 🛑 **NO generar artefactos fuera de la estructura de sesión:** todos los archivos que generes, salvo indicación explícita, van en `./tests/Documentation/sessions/session_{N}_{id}/agent-{agente}/`. No crear archivos sueltos, temporales ni en rutas ad-hoc.
- 🛑 **NO sobrescribir artefactos previos de una sesión existente** sin confirmación del usuario. Generar nuevos archivos con timestamp actualizado o preguntar si se desea reemplazar.
- 🛑 **NO incluir juicio de cumplimiento propio** en el handoff JSON: `assigned_task.scope_received` es un eco fiel de la instrucción, no tu evaluación.

### Idempotencia
- Si el agente se reinvoca sobre una sesión existente, NO sobrescribir artefactos previos sin confirmación del usuario. Generar nuevos archivos con timestamp actualizado o preguntar si se desea reemplazar.