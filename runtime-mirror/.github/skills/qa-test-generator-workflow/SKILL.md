---
name: qa-test-generator-workflow
description: Workflow operativo del agente generator.QATesting para la creación de Test Cases con pasos numerados Given/When/Then
argument-hint: Handoff del planner o analysis-report de documentation con requisitos, suites y nombres de tests
user-invocable: false
compatibility: 
  - agents: [generator.QATesting]
---

Workflow para generator.QATesting. El flujo operativo se encuentra dividido en archivos dentro de ./steps/. DEBES seguir la secuencia de pasos y las reglas de cada uno. Tras ejecutar cada paso DEBES documentar el Log de Trabajo en `generator.QATesting-work-log.md`, usando la plantilla Tabla de Log como único formato.

## Instrucciones de Log de Trabajo

Objetivo:
- Registrar evidencia de ejecucion por paso del workflow para auditar decisiones y facilitar handoff.

Reglas:
- Crear un log por ejecucion del agente, usando la tabla de abajo como unico formato.
- Las filas son fijas: una fila por cada paso del workflow (01 a 06), en ese orden.
- No añadir, eliminar ni reordenar filas.
- Rellenar cada celda de la fila al cerrar ese paso, antes de avanzar al siguiente.
- No dejar celdas vacias: usar "N/A" o "none" cuando no aplique.
- Registrar hechos observables (horas, artefactos, decisiones), no opiniones.
- Si un paso queda bloqueado o parcial, documentarlo en "Comentarios / Bloqueos" y detener el avance hasta resolverlo o escalarlo.

Estados permitidos (columna Estado):
- in_progress
- completed
- blocked
- partial

## Tabla de Log (Plantilla)

| Paso | Hora inicio | Hora fin | Tiempo dedicado | Modelo usado | Estado | Checklist completado | Skill usada | Artefactos generados | Comentarios / Bloqueos |
|------|-------------|----------|------------------|--------------|--------|-----------------------|-------------|------------------------|--------------------------|
| 01 - Analisis de Entrada | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 02 - Particionado por Acceptance Criteria | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 03 - Diseno de Pasos de Test Cases | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 04 - Marcaje de Provisionales | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 05 - Revision de Trazabilidad | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 06 - Generacion de Handoff y Reporte | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |

Notas de columnas:
- Tiempo dedicado: diferencia entre hora inicio y hora fin del paso, en minutos y segundos.
- Checklist completado: proporcion de items marcados frente al total del checklist de ese paso (ej. 5/5).
- Skill usada: nombre de las skills, instrucciones u otros recursos consultados o aplicados durante ese paso (ej. nombres de archivo o de skill); "N/A" si no se uso ninguno.
- Artefactos generados: rutas de archivos creados o actualizados durante ese paso.
- Comentarios / Bloqueos: gaps, decisiones relevantes o motivo de bloqueo; "none" si no aplica.

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
- No reabrir pasos anteriores si una verificación falla en el paso 02: la verificación de IDs (Original ID preservado y patrón de IDs hijo en splits) se hace en el paso 02 en el origen del split. Si la verificación falla, se corrige en ese mismo paso, no en pasos posteriores.
