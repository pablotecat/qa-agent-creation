---
name: qa-documentation-workflow
description: Workflow para extraer, normalizar y entregar requisitos QA. Usar para generar analysis-report consolidado.
disable-model-invocation: true
argument-hint: "solicitud QA y fuentes de requisitos. Opcional: 'to <path>' para destino, o 'preview'/'no-save' para chat-only."
user-invocable: true
compatibility: 
  - agents: [QA.documentation]
---

Workflow de documentación QA: extrae, normaliza y entrega requisitos consolidados en un reporte markdown.

## Mapa de pasos

DEBES leer y ejecutar los pasos en orden:

`01 Extracción de Requisitos` → `02 Identificación de Gaps` → `03 Particionado por Área` → `04 Normalización y Estructuración` → `05 Generación de Reporte`

## Log de Trabajo (traza incremental)

El work-log `QA.documentation-work-log.md` es **traza incremental**. Se escribe **una fila tras cada paso, dentro de ese paso**, siguiendo las instrucciones de `references/work-log-guidance.md`.


### Feedback al usuario

- Mientras ejecutas cada paso: salvo que el usuario indique lo contrario, no escribas nada en el chat, salvo errores o decisiones pendientes.
- Cuando termines cada paso: responde en chat **exactamente una línea seca** con el formato `<nombre-del-paso> OK.`
- Cuando termines de escribir archivos: responde en chat **exactamente una línea seca** con el formato `<nombre-del-workflow> OK; reporte: <ruta>; work-log: <ruta>`.

