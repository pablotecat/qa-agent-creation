---
name: qa-test-planner-workflow
description: Workflow del agente planner.QATesting para diseñar suites, cobertura y precondiciones estructurales con handoff.
disable-model-invocation: true
argument-hint: Handoff de documentation.QATesting con requisitos consolidados, dependencias y gaps
user-invocable: false
compatibility: 
  - agents: [planner.QATesting]
---

Workflow para `planner.QATesting`: genera suites, cobertura y precondiciones estructurales con handoff consolidado. El flujo operativo se divide en archivos bajo `./steps/`. DEBES seguir la secuencia de pasos y las reglas de cada uno.

## Mapa de pasos

`01 Análisis de Handoff de Entrada` → `02 Diseño de Suites` → `03 Modelamiento de Cobertura` → `04 Definición de Precondiciones` → `05 Trazabilidad Estructural` → `06 Generación de Handoff y Reporte`

## Guardarrail de entregables

El único paso que escribe entregables (handoff JSON, execution summary, work-log, `HANDOFF_Summary.md`) es el paso 06. Los pasos 01–05 solo construyen estado interno: asimilar handoff de entrada, diseñar suites, modelar cobertura, definir precondiciones estructurales, trazar relaciones.

## Log de Trabajo

Tras cerrar cada paso, documenta una fila en `planner.QATesting-work-log.md` siguiendo la plantilla canónica en `references/work-log-template.md` (formato único; no uses otro).

## Manejo de Bloqueos y Retroalimentacion

El pipeline QA es manual: no existe ningun orquestador que pueda invocar a documentation.QATesting por ti. Si detectas que el handoff entrante es insuficiente o que la cobertura es imposible de alcanzar, NO intentes reinvocar a documentation.QATesting NI ejecutar sus instruccones o workflow. Tu unica responsabilidad es dejar registrado el problema y dejar la decision en manos del usuario.

Si encuentras gaps que bloquean el diseño de cobertura:
- Reportar el gap en el handoff JSON con `status: blocked` o `status: partial`.
- Especificar en `work_performed.sections_untouched` qué no se pudo completar.
- Documentar el punto de decisión en `planner.QATesting-execution-summary.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes", para que el usuario decida si reinvoca documentation.QATesting para obtener mas contexto.

Si cobertura es imposible de alcanzar:
- Crear handoff con `status: partial`.
- Re-diseñar suites con cobertura pragmática (ej: 85% en lugar de 100%).
- Justificar la decisión en `planner.QATesting-execution-summary.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes".
