---
name: qa-planner-workflow
description: Workflow para diseñar suites de prueba, cobertura y precondiciones estructurales.
disable-model-invocation: true
argument-hint: "Handoff de QA.documentation con requisitos consolidados, dependencias y gaps. Opcional: 'to <path>' para destino, o 'preview'/'no-save' para chat-only."
user-invocable: true
compatibility: 
  - agents: [QA.planner]
---

Workflow de planificación QA: genera suites, cobertura y precondiciones estructurales y entrega el reporte `QA.planner-execution-summary.md` El flujo operativo se divide en archivos bajo `./steps/`. DEBES seguir la secuencia de pasos y las reglas de cada uno.

## Mapa de pasos

`01 Análisis de Handoff de Entrada` → `02 Diseño de Suites` → `03 Modelamiento de Cobertura` → `04 Definición de Precondiciones` → `05 Trazabilidad Estructural` → `06 Generación de Reporte`

## Guardarrail de entregables

El único paso que escribe entregables (`QA.planner-execution-summary.md`, work-log) es el paso 06. Los pasos 01–05 solo construyen estado interno: asimilar handoff de entrada, diseñar suites, modelar cobertura, definir precondiciones estructurales, trazar relaciones.

## Log de Trabajo

Tras cerrar cada paso, documenta una fila en `QA.planner-work-log.md` siguiendo la plantilla canónica en `references/work-log-template.md` (formato único; no uses otro).

## Manejo de Bloqueos y Retroalimentacion

El pipeline QA es manual: no existe ningun orquestador que pueda invocar a QA.documentation por ti. Si detectas que el handoff entrante es insuficiente o que la cobertura es imposible de alcanzar, NO intentes reinvocar a QA.documentation NI ejecutar sus instruccones o workflow. Tu unica responsabilidad es dejar registrado el problema y dejar la decision en manos del usuario.

Si encuentras gaps que bloquean el diseño de cobertura:
- Documenta el bloqueo en el reporte `QA.planner-execution-summary.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes", indicando que el estado del resultado es `blocked` o `partial` (para que, si el invocador decide generar handoff vía `qa-handoff-creation`, se refleje allí).
- Especifica en esa misma sección qué no se pudo completar (equivalente a `work_performed.sections_untouched`), para que el usuario decida si reinvoca QA.documentation para obtener mas contexto.

Si cobertura es imposible de alcanzar:
- Documenta en el reporte `QA.planner-execution-summary.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes", que el estado del resultado es `partial` (para que, si el invocador decide generar handoff vía `qa-handoff-creation`, se refleje allí).
- Re-diseñar suites con cobertura pragmática (ej: 85% en lugar de 100%).
- Justificar la decisión en `QA.planner-execution-summary.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes".

## Resolución de output (uso standalone)

**Los Agentes Ignoran esta sección**.

Cuando esta skill se invoca sin un agente (`QA.planner`), resuelve el directorio de salida (`output_dir`) así:

1. **Path explícito en la invocación**: si el usuario indica un destino (patrones como `to <path>`, `save [to] <path>`, `en <path>`), úsalo como `output_dir`.
2. **Keyword `preview` o `no-save`**: si la invocación la contiene, **modo chat-only**: no se escribe nada a disco; el reporte se muestra por chat y se anuncia que no se persistió.
3. **Default**: en caso contrario, `output_dir` = `./qa-tmp/qa-planner-workflow/<timestamp>/` (relativo al cwd del workspace; `<timestamp>` en ISO8601 compacto `YYYYMMDD-HHMMSS`).

### Artefactos a escribir (salvo modo chat-only)

- Reporte `QA.planner-execution-summary.md` → en `output_dir`.
- Work-log `QA.planner-work-log.md` → en `output_dir`.

### Feedback al usuario

- Tras escribir: anuncia en chat la ruta del reporte y una línea con la ruta del work-log (silenciosa) + un resumen breve del reporte (primeras ~20 líneas o digest).
- En modo chat-only: muestra el reporte completo por chat y anuncia que no se persistió.

### Errores recuperables

Si el `output_dir` indicado no se puede escribir (permisos, path inválido): no preguntes; anuncia el error y cae al default `qa-tmp/` si es posible, o a chat-only si no. Solo en este caso se informa al usuario.
