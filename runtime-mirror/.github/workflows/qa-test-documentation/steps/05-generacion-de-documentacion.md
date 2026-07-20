# Paso 5: Generacion de Documentacion

## Objetivo del Paso

Generar la documentacion final del analisis (reporte markdown) y, a partir de ella ya completa, el handoff JSON minimo delegado a la skill dedicada. El paso concluye con ambos artefactos persistidos correctamente; la validacion del handoff se hace contra el schema antes de entregar.

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros agentes consumiran sin acceso a la fuente original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No extraigas mas contenido de las fuentes originales ni sigas normalizando redaccion.


## Secuencia

1. Genera documentation.QATesting-analysis-report.md siguiendo la guía `.github/workflows/qa-test-documentation/references/analysis-report-guidance.md`.
2. Con el reporte ya completo, genera el handoff JSON usando la skill compartida `qa-handoff-creation` (`.github/skills/qa-handoff-creation/SKILL.md`), sustituyendo `{agent}` por `documentation.QATesting`.
3. Actualiza ./tests/Documentation/HANDOFF_Summary.md.
4. Revisa consistencia y trazabilidad entre el handoff JSON generado y el resumen markdown.

## Que NO hacer en este paso

- No extraigas nuevos requisitos ni gaps en este punto.
- No modifiques el agrupamiento por area ni la normalizacion ya aplicada.
- No definas tu mismo la estructura o el nombre del reporte en markdown: eso vive en la guía de report asociada.
- No definas tu mismo la estructura o el nombre del handoff JSON: eso vive en la skill de handoff asociada.
- No omitas la validacion de consistencia entre JSON y markdown antes de entregar.

## Checklist de completitud

- [ ] Se genero documentation.QATesting-analysis-report.md con el formato esperado.
- [ ] El handoff JSON fue generado por la skill de handoff asociada.
- [ ] El handoff refleja fielmente los hechos del reporte (`work_performed`, `checks`, `counts`).
- [ ] Se actualizo ./tests/Documentation/HANDOFF_Summary.md.
- [ ] Se verifico consistencia y trazabilidad entre JSON y markdown.
- [ ] El paso 5 esta completo y el workflow puede cerrarse.
