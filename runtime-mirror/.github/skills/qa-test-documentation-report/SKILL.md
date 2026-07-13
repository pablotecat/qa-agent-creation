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

1. Cabecera de Ejecución
- Session ID
- Agente o rol
- Fecha o timestamp
- Estado

2. Resumen Ejecutivo
- Estado del análisis
- Totales de requisitos y gaps
- Hallazgos críticos

3. Requisitos Normalizados por Área
- Título del área
- IDs de requisito y descripción corta de comportamiento
- Trazabilidad a fuentes

4. Endpoints API Documentados
- Endpoint
- Resumen de request
- Resumen de response
- Resumen de errores

5. Gaps Críticos
- Gap ID
- Severidad
- Impacto
- Recomendacion

6. Decisiones Pendientes para Planificación
- Preguntas abiertas para la planificación siguiente

7. Checklist de Validación
- Checklist de completitud
- Declaración de fuera de alcance

8. Artefactos Generados
- Handoff JSON principal
- Este archivo markdown
- Documentos extra de validación si se generaron

9. Próximo Paso
- Siguiente responsable
- Qué validar a continuación

## Ejemplos de Formato por Sección

### 1) Cabecera de Ejecucion
```markdown
# Test Documentation - Analisis Completado

**Session ID:** <uuid>
**Agente:** test_documentation
**Fecha:** <YYYY-MM-DD>
**Estado:** ✅ COMPLETED
```

### 2) Resumen Ejecutivo
```markdown
## Resumen Ejecutivo

- Requisitos extraidos: <count>
- Gaps identificados: <count por severidad>
- Areas de testing identificadas: <count>
- Recomendacion: <recomendacion accionable>
```

### 3) Requisitos por Area
```markdown
## Requisitos Normalizados por Area

### Area: <nombre>
| ID | Titulo | Comportamiento | Fuente |
|----|--------|----------------|--------|
| REQ-001 | <titulo> | Given ... When ... Then ... | file.js:10-20 |
```

### 4) Endpoints API
```markdown
## Endpoints API Documentados

### POST /api/example
- Request: { ... }
- Response: { ... }
- Errores: 400, 404
```

### 5) Gaps Criticos
```markdown
## Gaps Criticos

| Gap ID | Severidad | Impacto | Recomendacion |
|--------|-----------|---------|----------------|
| GAP-001 | CRITICAL | <impacto> | <recomendacion> |
```

### 6) Decisiones Pendientes
```markdown
## Decisiones Pendientes para Planificacion

1. <punto de decision 1>
2. <punto de decision 2>
```

### 7) Checklist de Validacion
```markdown
## Checklist de Validacion

- [x] Requisitos extraidos
- [x] Gaps clasificados
- [x] Trazabilidad verificada
- [ ] <pendiente si es parcial>
```

### 8) Artefactos
```markdown
## Artefactos Generados

- test_documentation-to-test_planner-attempt-<n>-<timestamp>.json
- test_documentation-analysis-report.md
```

### 9) Proximo Paso
```markdown
## Proximo Paso

**Siguiente Responsable:** test_planner
**Estado del Handoff:** READY
```

## Ejemplo Completo

- Ver [example full output](./examples/example-output.md)

## Puerta de Calidad

Marcar como completo solo si:
- Estan presentes todas las secciones requeridas.
- Los conteos de requisitos y gaps son consistentes con el handoff JSON.
- El reporte es suficiente para la planificacion siguiente sin releer fuentes originales.
