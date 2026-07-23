---
name: qa-test-generator-workflow
description: Workflow del agente generator.QATesting para crear Test Cases con pasos numerados Given/When/Then y handoff consolidado.
disable-model-invocation: true
argument-hint: Handoff del planner o analysis-report de documentation con requisitos, suites y nombres de tests
user-invocable: false
compatibility: 
  - agents: [generator.QATesting]
---

Workflow para `generator.QATesting`: diseña Test Cases con pasos numerados Given/When/Then y entrega handoff consolidado. El flujo operativo se divide en archivos bajo `./steps/`. DEBES seguir la secuencia de pasos y las reglas de cada uno.

## Mapa de pasos

`01 Análisis de Entrada` → `02 Particionado por Acceptance Criteria (verificación de IDs en origen)` → `03 Diseño de Pasos de Test Cases` → `04 Marcaje de Provisionales` → `05 Revisión de Trazabilidad` → `06 Generación de Handoff y Reporte`

## Guardarrail de entregables

El único paso que escribe entregables (handoff JSON, `generator.QATesting-test-cases.md`, work-log, `HANDOFF_Summary.md`) es el paso 06. Los pasos 01–05 solo construyen estado interno: asimilar entrada, particionar por AC, redactar pasos, marcar provisionales, verificar trazabilidad.

## Invariante canónica: verificación de IDs en splits

La verificación de IDs en splits (presencia de `Original ID` + patrón de IDs derivados `{original_id}a`, `{original_id}b`, ...) se hace **en el paso 02, en el origen del split**. No se reabren pasos posteriores para corregir IDs: si una verificación posterior (p. ej. en el paso 05) detecta inconsistencia, se vuelve al paso 02 a corregir; los pasos 03 en adelante no corrigen IDs.

## Log de Trabajo

Tras cerrar cada paso, documenta una fila en `generator.QATesting-work-log.md` siguiendo la plantilla canónica en `references/work-log-template.md` (formato único; no uses otro).

## Manejo de Bloqueos y Retroalimentacion

El pipeline QA es manual: no existe ningun orquestador que pueda invocar al agente que produjo el documento de entrada por ti. Si detectas que el documento de entrada es insuficiente para crear Test Cases (falta de Acceptance Criteria, escenarios sin contexto, requisitos ambiguos, etc.) o que la cobertura de ACs es imposible de alcanzar, NO intentes reinvocar al agente origen NI ejecutar sus instrucciones o workflow. Tu unica responsabilidad es dejar registrado el problema y dejar la decision en manos del usuario.

Si encuentras gaps que bloquean la creación de Test Cases:
- Reportar el gap en el handoff JSON con `status: blocked` o `status: partial`.
- Especificar en `work_performed.sections_untouched` qué no se pudo completar.
- Documentar el punto de decisión en `generator.QATesting-test-cases.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes", para que el usuario decida si reinvoca al agente origen para obtener más contexto.

Si algún paso no se puede redactar con certeza por falta de definición:
- Escribir una acción provisional en el paso afectado.
- Marcar el paso como `🟡 PROVISIONAL/NO DEFINIDO` con motivo en el paso 04 (Marcaje de Provisionales).
- No detener el flujo: avanzar al siguiente Test Case o al siguiente paso.

Si la cobertura de Acceptance Criteria es imposible de alcanzar:
- Crear handoff con `status: partial`.
- Documentar la limitación en `generator.QATesting-test-cases.md`, sección "Notas de Cierre para Revisión Humana → Decisiones Pendientes".
