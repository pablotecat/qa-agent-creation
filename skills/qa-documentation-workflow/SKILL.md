---
name: qa-documentation-workflow
description: Workflow para extraer, normalizar y entregar requisitos QA. Usar para generar analysis-report consolidado.
disable-model-invocation: true
argument-hint: solicitud QA y fuentes de requisitos
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
