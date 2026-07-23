---
name: qa-test-documentation-workflow
description: Workflow del agente documentation.QATesting para extraer, normalizar y entregar requisitos con handoff.
disable-model-invocation: true
argument-hint: solicitud QA y fuentes de requisitos
user-invocable: false
compatibility: 
  - agents: [documentation.QATesting]
---

Workflow para `documentation.QATesting`: extrae, normaliza y entrega requisitos con handoff. El flujo operativo se divide en archivos bajo `./steps/`. DEBES seguir la secuencia de pasos y las reglas de cada uno.

## Mapa de pasos

`01 Extracción de Requisitos` → `02 Identificación de Gaps` → `03 Particionado por Área` → `04 Normalización y Estructuración` → `05 Generación de Documentación`

## Guardarrail de entregables

El único paso que escribe entregables (handoff JSON, analysis report, work-log, `HANDOFF_Summary.md`) es el paso 05. Los pasos 01–04 solo construyen estado interno: extraer requisitos, identificar gaps, agrupar por área, normalizar redacción.

## Log de Trabajo

Tras cerrar cada paso, documenta una fila en `documentation.QATesting-work-log.md` siguiendo la plantilla canónica en `references/work-log-template.md` (formato único; no uses otro).
