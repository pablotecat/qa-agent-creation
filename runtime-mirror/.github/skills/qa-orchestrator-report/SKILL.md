---
name: qa-orchestrator-report
description: "Genera el reporte markdown final del orquestador con el estilo de test/documentation. Usar cuando la orquestación deba consolidar los resultados de todos los agentes y cerrar la sesión."
argument-hint: "session id, start time, end time, status, output path"
user-invocable: true
---

# Skill de Reporte Final del Orquestador

Genera un archivo markdown para el rol de orquestador.

## Nombre de Archivo de Salida Requerido

- `ORCHESTRATION_FINAL_SUMMARY.md`

## Secciones Requeridas

1. Cabecera de Sesión
2. Resumen de Solicitud Original
3. Resultados por Etapa o Agente
4. Consolidación de Gaps y Bloqueadores
5. Estadísticas de Sesión
6. Estructura de Artefactos
7. Verificación de Criterios de Éxito
8. Recomendación Final
9. Estado de Cierre

## Ejemplos de Formato por Sección

### 1) Cabecera de Sesion
```markdown
# QA Orchestration - Resumen Final

**Session ID:** <uuid>
**Inicio:** <ISO-8601>
**Fin:** <ISO-8601>
**Estado:** ✅ COMPLETED
```

### 2) Resumen de Solicitud
```markdown
## Resumen de Solicitud Original

- Tipo de solicitud: <text>
- Modo de pipeline: <text>
- Resultado: <text>
```

### 3) Resultados por Etapa
```markdown
## Resultados por Etapa

### Etapa 1 - Documentacion
- Estado: ✅
- Salidas clave: <conteos y archivos>

### Etapa 2 - Planificacion
- Estado: ✅
- Salidas clave: <conteos y archivos>
```

### 4) Gaps y Bloqueadores
```markdown
## Consolidacion de Gaps y Bloqueadores

| Gap | Severidad | Bloquea Flujo | Disposicion |
|-----|-----------|---------------|-------------|
| <gap> | <severidad> | <si/no> | <aceptado/escalado> |
```

### 5) Estadisticas de Sesion
```markdown
## Estadisticas de Sesion

| Metrica | Valor |
|---------|-------|
| Agentes despachados | <count> |
| Handoffs procesados | <count> |
| Retries usados | <count> |
| Escalaciones | <count> |
```

### 6) Artefactos
```markdown
## Estructura de Artefactos

- manifest.json
- retry_checkpoint.json
- HANDOFF_Summary.md
- ORCHESTRATION_FINAL_SUMMARY.md
```

### 7) Criterios de Exito
```markdown
## Verificacion de Criterios de Exito

- [x] Todas las transiciones requeridas persistidas
- [x] Todos los handoffs enrutados validados
- [x] Estado final asignado
```

### 8) Recomendacion Final
```markdown
## Recomendacion Final

**Recomendacion:** <PROCEED|PARTIAL|STOP>
**Razon:** <motivo breve>
```

### 9) Cierre
```markdown
## Estado de Cierre

**Sesion Cerrada:** ✅ <timestamp>
```

## Ejemplo Completo

- Ver [example full output](./examples/example-output.md)

## Puerta de Calidad

Marcar como completo solo si:
- La consolidación está completa en todas las etapas ejecutadas.
- El estado del reporte coincide con el estado final del manifest.
- La recomendación final es explícita y accionable.
