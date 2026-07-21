# Paso 6: Generacion de Handoff y Reporte

## Objetivo del Paso

Generar el entregable final del planner: el reporte markdown `planner.QATesting-execution-summary.md` y, a partir de él ya completo, el handoff JSON minimo delegado a la skill dedicada. El paso concluye con ambos artefactos persistidos correctamente; la validación del handoff se hace contra el schema antes de entregar.

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros agentes consumiran sin acceso a la fuente original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No diseñes nuevas suites ni replantees cobertura, precondiciones o trazabilidad.

## Secuencia

1. Genera `planner.QATesting-execution-summary.md` siguiendo la guía `.github/workflows/qa-test-planner/references/planner-report-guidance.md`.
2. Con el reporte ya completo, genera el handoff JSON usando la skill compartida `qa-handoff-creation` (`.github/skills/qa-handoff-creation/SKILL.md`), sustituyendo `{agent}` por `planner.QATesting`.
3. Actualiza `./tests/Documentation/HANDOFF_Summary.md`.
4. Revisa consistencia y trazabilidad entre el handoff JSON generado y el resumen markdown (`work_performed`, `checks`, `counts`).

## Que NO hacer en este paso

- No diseñes nuevas suites ni replantees el coverage model del Paso 3.
- No replantees precondiciones ni trazabilidad estructural.
- No definas tu mismo la estructura o el nombre del reporte en markdown: eso vive en la guía de report asociada.
- No definas tu mismo la estructura o el nombre del handoff JSON: eso vive en la skill de handoff asociada.
- No omitas la validación de consistencia entre JSON y markdown antes de entregar.

## Criterios de Finalización

✅ Todas las suites diseñadas y validadas (Paso 2)
✅ Cobertura modelada (% por suite y total) (Paso 3)
✅ Precondiciones estructurales definidas por suite (Paso 4)
✅ Trazabilidad estructural suite↔requisito verificada (Paso 5)
✅ Dependencias inter-suite estructurales documentadas (Paso 2)
✅ Handoff generado y validado contra schema
✅ `planner.QATesting-execution-summary.md` generado
✅ `./tests/Documentation/HANDOFF_Summary.md` actualizado
✅ Consistencia JSON↔markdown verificada

## Checklist de completitud

- [ ] Se generó `planner.QATesting-execution-summary.md` con el formato esperado por la guía.
- [ ] El handoff JSON fue generado por la skill de handoff asociada.
- [ ] El handoff refleja fielmente los hechos del reporte (`work_performed`, `checks`, `counts`).
- [ ] Se actualizó `./tests/Documentation/HANDOFF_Summary.md`.
- [ ] Se verificó consistencia y trazabilidad entre JSON y markdown.
- [ ] El paso 6 esta completo y el workflow puede cerrarse.
