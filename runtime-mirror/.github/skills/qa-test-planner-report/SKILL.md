---
name: qa-test-planner-report
description: "Genera el reporte markdown de planner.QATesting con el estilo de test/documentation. Usar cuando planificación deba entregar suites, cobertura, precondiciones y decisiones de ejecución."
argument-hint: "session id, timestamp, status, output path"
user-invocable: true
---

# Skill de Reporte Test Planner

Genera un archivo markdown para el rol de planificación.

## Nombre de Archivo de Salida Requerido

- `planner.QATesting-execution-summary.md`

## Secciones Requeridas

1. Cabecera de Ejecución
2. Resumen y Métricas Clave
3. Suites Diseñadas
4. Análisis de Cobertura
5. Decisiones de Automatización
6. Decisiones de Diseño y Supuestos
7. Precondiciones y Orden de Ejecución
8. Checklist de Validación
9. Artefactos Generados
10. Próximos Pasos para Priorización

## Ejemplos de Formato por Sección

### 1) Cabecera de Ejecucion
```markdown
# Test Planner Agent - Resumen de Ejecucion

**Session ID:** <uuid>
**Agente:** planner.QATesting
**Timestamp:** <ISO-8601>
**Estado:** ✅ COMPLETED
```

### 2) Resumen y Metricas Clave
```markdown
## Resumen

| Metrica | Valor | Estado |
|---------|-------|--------|
| Suites de Prueba Definidas | <count> | ✅ |
| Escenarios Totales | <count> | ✅ |
| Requisitos Cubiertos | <cubiertos>/<total> | ✅ |
| Cobertura Funcional | <percent> | ✅ |
```

### 3) Suites Diseñadas
```markdown
## Suites Diseñadas

### SUITE-001: <name>
- Requisitos: REQ-001, REQ-002
- Escenarios: <count>
- Dependencias: <lista o ninguna>
```

### 4) Analisis de Cobertura
```markdown
## Analisis de Cobertura

- Requisitos cubiertos: <count>
- Requisitos no cubiertos: <count>
- Porcentaje de cobertura: <percent>
```

### 5) Decisiones de Automatizacion
```markdown
## Decisiones de Automatizacion

- Estrategia: <E2E/API/Mixed>
- Razon: <motivo>
- Tiempo estimado de ejecucion: <time>
```

### 6) Decisiones y Supuestos
```markdown
## Decisiones de Diseño y Supuestos

### Decision 1
- Decision: <texto>
- Impacto: <text>
```

### 7) Precondiciones y Orden
```markdown
## Precondiciones y Orden de Ejecucion

1. <suite o fase 1>
2. <suite o fase 2>
```

### 8) Checklist de Validacion
```markdown
## Checklist de Validacion

- [x] 5+ suites definidas (o menos justificadas)
- [x] Modelo de cobertura incluido
- [x] Precondiciones documentadas
```

### 9) Artefactos
```markdown
## Artefactos Generados

- planner.QATesting-to-prioritization.QATesting-attempt-<n>-<timestamp>.json
- planner.QATesting-execution-summary.md
```

### 10) Proximos Pasos
```markdown
## Proximos Pasos para Priorizacion

**Siguiente Responsable:** prioritization.QATesting
- Validar postura de riesgo y corte MVP
- Confirmar recomendacion go/no-go
```

## Ejemplo Completo

- Ver [example full output](./examples/example-output.md)

## Puerta de Calidad

Marcar como completo solo si:
- Los números de suites y cobertura son consistentes con el handoff JSON.
- El orden de ejecución es explícito.
- Priorización puede continuar sin suponer contexto de planificación faltante.
