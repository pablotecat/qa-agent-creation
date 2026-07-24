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

`01 Extracción de Requisitos` → `02 Identificación de Gaps` → `03 Particionado por Área` → `04 Normalización y Estructuración` → `05 Generación de Reporte`

## Guardarrail de entregables

El único paso que escribe entregables (analysis report, work-log) es el paso 05. Los pasos 01–04 solo construyen estado interno: extraer requisitos, identificar gaps, agrupar por área, normalizar redacción.

## Log de Trabajo

Tras cerrar cada paso, documenta una fila en `QA.documentation-work-log.md` siguiendo la plantilla canónica en `references/work-log-template.md` (formato único; no uses otro).

## Resolución de output (uso standalone)

**Los Agentes Ignoran esta sección**.

Cuando esta skill se invoca sin un agente (`QA.documentation`), resuelve el directorio de salida (`output_dir`) así:

1. **Path explícito en la invocación**: si el usuario indica un destino (patrones como `to <path>`, `save [to] <path>`, `en <path>`), úsalo como `output_dir`.
2. **Keyword `preview` o `no-save`**: si la invocación la contiene, **modo chat-only**: no se escribe nada a disco; el reporte se muestra por chat y se anuncia que no se persistió.
3. **Default**: en caso contrario, `output_dir` = `./qa-tmp/qa-documentation-workflow/<timestamp>/` (relativo al cwd del workspace; `<timestamp>` en ISO8601 compacto `YYYYMMDD-HHMMSS`).

### Artefactos a escribir (salvo modo chat-only)

- Reporte `QA.documentation-analysis-report.md` → en `output_dir`.
- Work-log `QA.documentation-work-log.md` → en `output_dir`.

### Feedback al usuario

- Tras escribir: anuncia en chat la ruta del reporte y una línea con la ruta del work-log (silenciosa) + un resumen breve del reporte (primeras ~20 líneas o digest).
- En modo chat-only: muestra el reporte completo por chat y anuncia que no se persistió.

### Errores recuperables

Si el `output_dir` indicado no se puede escribir (permisos, path inválido): no preguntes; anuncia el error y cae al default `qa-tmp/` si es posible, o a chat-only si no. Solo en este caso se informa al usuario.
