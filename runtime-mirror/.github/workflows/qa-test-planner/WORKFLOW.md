---
name: qa-test-planner
description: Workflow operativo del agente planner.QATesting para diseño de suites, cobertura, precondiciones y handoff
argument-hint: Handoff de documentation.QATesting con requisitos consolidados, dependencias y gaps
user-invocable: false
---

Workflow para planner.QATesting. El flujo operativo se encuentra dividido en archivos dentro de ./steps/. DEBES seguir la secuencia de pasos y las reglas de cada uno. Tras ejecutar cada paso DEBES documentar el Log de Trabajo en `planner.QATesting-work-log.md`, usando la plantilla Tabla de Log como único formato.

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
| 01 - Analisis de Handoff de Entrada | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 02 - Diseno de Suites | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 03 - Modelamiento de Cobertura | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 04 - Definicion de Precondiciones | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 05 - Trazabilidad Estructural | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |
| 06 - Generacion de Handoff y Reporte | <HH:MM:ss> | <HH:MM:ss> | <mm:ss> | <nombre modelo> | <in_progress\|completed\|blocked\|partial> | <n/n> | <lista o N/A> | <lista o N/A> | <detalle o none> |

Notas de columnas:
- Tiempo dedicado: diferencia entre hora inicio y hora fin del paso, en minutos y segundos.
- Checklist completado: proporcion de items marcados frente al total del checklist de ese paso (ej. 5/5).
- Skill usada: nombre de las skills, instrucciones u otros recursos consultados o aplicados durante ese paso (ej. nombres de archivo o de skill); "N/A" si no se uso ninguno.
- Artefactos generados: rutas de archivos creados o actualizados durante ese paso.
- Comentarios / Bloqueos: gaps, decisiones relevantes o motivo de bloqueo; "none" si no aplica.

## Manejo de Bloqueos y Retroalimentacion

El pipeline QA es manual: no existe ningun orquestador que pueda invocar a documentation.QATesting por ti. Si detectas que el handoff entrante es insuficiente o que la cobertura es imposible de alcanzar, NO intentes reinvocar a documentation.QATesting NI ejecutar sus instruccones o workflow. Tu unica responsabilidad es dejar registrado el problema y dejar la decision en manos del usuario.

Si encuentras gaps que bloquean el diseño de cobertura:
- Reportar el gap en el handoff JSON con `status: blocked` o `status: partial`.
- Especificar en `work_performed.sections_untouched` qué no se pudo completar.
- Registrar el punto de decision en `next_agent_instructions.decision_points` para que el usuario decida si reinvoca documentation.QATesting para obtener mas contexto.

Si cobertura es imposible de alcanzar:
- Crear handoff con `status: partial`.
- Re-diseñar suites con cobertura pragmática (ej: 85% en lugar de 100%).
- Justificar la decisión en `next_agent_instructions.decision_points`.
