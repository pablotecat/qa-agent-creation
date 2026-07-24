# Paso 5: Generacion de Reporte

## Objetivo del Paso

Generar el reporte markdown final del analisis y persistirlo correctamente, tras una revision de consistencia interna. Este paso produce el entregable principal del workflow.

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros agentes consumiran sin acceso a la fuente original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No extraigas mas contenido de las fuentes originales ni sigas normalizando redaccion.


## Secuencia

1. Genera `QA.documentation-analysis-report.md` siguiendo la guía `references/analysis-report-guidance.md` de esta skill.
2. Revisa la consistencia y trazabilidad internas del reporte (requisitos, gaps, agrupamiento por area, conteos por area/endpoint, estado del analisis).

## Restricciones operativas

- Trabaja sobre los requisitos, gaps y agrupamiento producidos en los pasos 01–04. Si detectas un faltante en este punto, regístralo como "decisión pendiente" en el reporte (sección Notas de Cierre) y continúa; no vuelvas a las fuentes originales.
- La estructura y el nombre del reporte markdown: siguen la guía `references/analysis-report-guidance.md` (no los definas tú).

## Checklist de completitud

- [ ] Se genero `QA.documentation-analysis-report.md` con el formato esperado.
- [ ] Los counts (req/gap/área/endpoint) del reporte son internamente consistentes y el estado del analisis queda reflejado en el reporte.
- [ ] El paso 5 esta completo y el workflow puede cerrarse.
