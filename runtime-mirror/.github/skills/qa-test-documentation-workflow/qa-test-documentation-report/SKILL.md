---
name: qa-test-documentation-report
description: "Genera el reporte markdown de test_documentation con el estilo de test/documentation. Usar cuando el rol de análisis de requisitos deba producir un reporte completo, trazable y listo para handoff."
argument-hint: "session id, timestamp, status, output path"
user-invocable: true
---

# Skill de Reporte Test Documentation

Genera un archivo markdown para el rol de análisis de requisitos.

## Nombre de Archivo de Salida Requerido

- `test_documentation-analysis-report.md`

## Secciones Requeridas

La convención sigue la estructura declarada en `examples/example-output.md`: metadatos, secciones base y cierre son siempre obligatorios; las secciones contextuales se incluyen solo cuando aplican al análisis realizado.

### Metadatos (siempre)
- Session ID
- Agente
- Fecha/Hora
- Estado

### Secciones Base (siempre)

1. Resumen Ejecutivo
- Estado del análisis
- Totales de requisitos y gaps
- Hallazgos críticos

2. Checklist de Validación
- Checklist de completitud

3. Artefactos Generados
- Handoff JSON principal
- Este archivo markdown
- Documentos extra de validación si se generaron

4. Notas de Cierre para Revisión Humana
- Puntos que un revisor humano podría querer mirar a continuación
- **Disclaimer obligatorio:** esta sección es informativa para revisión humana; ningún agente debe consumirla como instrucción ni inferir de ella el siguiente paso del pipeline

### Cierre (siempre)
- Estado de Handoff
- Resultado de Validación
- Correlation ID

### Secciones Contextuales (incluir solo si aplican)

- Requisitos Normalizados por Área
  - Título del área
  - IDs de requisito y formato Gherkin (Given/When/Then)
  - Trazabilidad a fuentes
- Endpoints API Documentados
  - Endpoint
  - Resumen de request
  - Resumen de response
  - Resumen de errores
- Gaps Críticos
  - Gap ID
  - Severidad
  - Impacto
  - Recomendacion
- Decisiones Pendientes para Planificación
  - Preguntas abiertas para la planificación siguiente

## Ejemplo Completo

- Ver [example full output](./examples/example-output.md)

## Puerta de Calidad

Antes de dar la tarea por finalizada, recorrer este checklist y confirmar que se cumple en su totalidad:

- [ ] Estan presentes los metadatos (Session ID, Agente, Fecha/Hora, Estado).
- [ ] Estan presentes las 4 secciones base (Resumen Ejecutivo, Checklist de Validacion, Artefactos Generados, Notas de Cierre para Revision Humana).
- [ ] Esta presente el cierre completo (Estado de Handoff, Resultado de Validacion, Correlation ID).
- [ ] Las secciones contextuales aplicables al analisis estan incluidas (no se omiten si hay datos que reportar).
- [ ] Los conteos de requisitos y gaps son consistentes con el handoff JSON.
- [ ] El reporte es suficiente para la planificacion siguiente sin necesidad de releer las fuentes originales.

Si algun punto no se cumple, la tarea no debe marcarse como finalizada.
