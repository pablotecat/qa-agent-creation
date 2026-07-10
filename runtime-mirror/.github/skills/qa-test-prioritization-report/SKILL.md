---
name: qa-test-prioritization-report
description: "Genera el reporte markdown de test_prioritization con el estilo de test/documentation. Usar cuando priorización deba entregar scoring de riesgo, corte MVP y recomendación de ejecución."
argument-hint: "session id, timestamp, status, output path"
user-invocable: true
---

# Skill de Reporte Test Prioritization

Genera un archivo markdown para el rol de priorización.

## Nombre de Archivo de Salida Requerido

- `validation-report.md`

## Nota de Baseline

Esta skill usa el estilo de `validation-report` como baseline temporal para reportes de priorización en este repositorio.

## Secciones Requeridas

1. Cabecera de Ejecución
2. Resumen de Estado de Validación
3. Resumen de Matriz de Riesgo
4. Resultado de Priorización (MVP vs Siguiente Fase)
5. Resumen de Selección de Automatización
6. Bloqueadores y Workarounds
7. Recomendación Final
8. Checklist de Validación
9. Artefactos Generados
10. Próximo Paso

## Ejemplos de Formato por Sección

### 1) Cabecera de Ejecucion
```markdown
# Test Prioritization - Validation Report

**Session ID:** <uuid>
**Agente:** test_prioritization
**Timestamp:** <ISO-8601>
**Estado:** ✅ COMPLETED
```

### 2) Estado de Validacion
```markdown
## Resumen de Estado de Validacion

- Estado de schema: PASSED
- Completitud de priorizacion: PASSED
- Nivel de confianza: <percent>
```

### 3) Matriz de Riesgo
```markdown
## Resumen de Matriz de Riesgo

| Suite | Impacto | Probabilidad | Esfuerzo | Prioridad |
|------|---------|--------------|----------|-----------|
| <suite> | <1-5> | <1-5> | <1-5> | <P0/P1/P2> |
```

### 4) Resultado de Priorizacion
```markdown
## Resultado de Priorizacion

### Alcance MVP
- <suite 1>
- <suite 2>

### Siguiente Fase
- <suite 3>
```

### 5) Seleccion de Automatizacion
```markdown
## Resumen de Seleccion de Automatizacion

- Escenarios automatizados: <count>
- Escenarios manuales: <count>
- Porcentaje de automatizacion: <percent>
```

### 6) Bloqueadores y Workarounds
```markdown
## Bloqueadores y Workarounds

| Item | Severidad | Bloquea MVP | Workaround |
|------|-----------|-------------|------------|
| <gap> | <severidad> | <si/no> | <accion> |
```

### 7) Recomendacion Final
```markdown
## Recomendacion Final

**Decision:** <PROCEED_TO_EXECUTION|PARTIAL|BLOCKED>
**Razon:** <short justification>
```

### 8) Checklist de Validacion
```markdown
## Checklist de Validacion

- [x] Todas las suites puntuadas
- [x] Corte MVP documentado
- [x] Recomendacion emitida
```

### 9) Artefactos
```markdown
## Artefactos Generados

- test_prioritization-to-orchestrator-attempt-<n>-<timestamp>.json
- validation-report.md
```

### 10) Proximo Paso
```markdown
## Proximo Paso

**Siguiente Responsable:** orchestrator
**Accion:** consolidar y cerrar planning layer
```

## Ejemplo Completo

- Ver [example full output](./examples/example-output.md)

## Puerta de Calidad

Marcar como completo solo si:
- Las asignaciones de prioridad están respaldadas por evidencia explícita de riesgo.
- El corte MVP y la recomendación no son ambiguos.
- El contenido del reporte es consistente con el handoff JSON.
