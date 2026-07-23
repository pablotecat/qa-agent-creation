# Paso 5: Generacion de Documentacion

## Objetivo del Paso

Generar la documentacion final del analisis (reporte markdown) y, a partir de ella ya completa, el handoff JSON minimo delegado a la skill dedicada. El paso concluye con ambos artefactos persistidos correctamente; la validacion del handoff se hace contra el schema antes de entregar.

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros agentes consumiran sin acceso a la fuente original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No extraigas mas contenido de las fuentes originales ni sigas normalizando redaccion.


## Secuencia

1. Genera documentation.QATesting-analysis-report.md siguiendo la guía `.github/skills/qa-test-documentation-workflow/references/analysis-report-guidance.md`.
2. Con el reporte ya completo, genera el handoff JSON usando la skill compartida `qa-handoff-creation` (`.github/skills/qa-handoff-creation/SKILL.md`), sustituyendo `{agent}` por `documentation.QATesting`.
3. Actualiza ./tests/Documentation/HANDOFF_Summary.md.
4. Revisa consistencia y trazabilidad entre el handoff JSON generado y el resumen markdown.

## Restricciones operativas

- Trabaja sobre los requisitos, gaps y agrupamiento producidos en los pasos 01–04. Si detectas un faltante en este punto, regístralo como "decisión pendiente" en el reporte (sección Notas de Cierre) y continúa; no vuelvas a las fuentes originales.
- La estructura y el nombre del reporte markdown: siguen la guía `references/analysis-report-guidance.md` (no los definas tú).
- La estructura y el nombre del handoff JSON: siguen la skill `qa-handoff-creation` (no los definas tú).
- La validación de consistencia entre JSON y markdown es parte del entregable.

## Checklist de completitud

- [ ] Se genero documentation.QATesting-analysis-report.md con el formato esperado.
- [ ] El handoff JSON fue generado por la skill de handoff asociada.
- [ ] Los counts (req/gap/área/endpoint) reportados en el markdown coinciden numéricamente con los del handoff JSON; el `status` del handoff coincide con el estado del análisis.
- [ ] Se actualizo ./tests/Documentation/HANDOFF_Summary.md.
- [ ] Se verifico consistencia y trazabilidad entre JSON y markdown.
- [ ] El paso 5 esta completo y el workflow puede cerrarse.
