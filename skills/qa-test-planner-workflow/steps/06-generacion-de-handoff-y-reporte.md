# Paso 6: Generacion de Handoff y Reporte

## Objetivo del Paso

Generar el entregable final del planner: el reporte markdown `planner.QATesting-execution-summary.md` y, a partir de él ya completo, el handoff JSON minimo delegado a la skill dedicada. El paso concluye con ambos artefactos persistidos correctamente; la validación del handoff se hace contra el schema antes de entregar.

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros agentes consumiran sin acceso a la fuente original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No diseñes nuevas suites ni replantees cobertura, precondiciones o trazabilidad.

## Secuencia

1. Genera `planner.QATesting-execution-summary.md` siguiendo la guía `.github/skills/qa-test-planner-workflow/references/planner-report-guidance.md`.
2. Con el reporte ya completo, genera el handoff JSON usando la skill compartida `qa-handoff-creation` (`.github/skills/qa-handoff-creation/SKILL.md`), sustituyendo `{agent}` por `planner.QATesting`.
3. Actualiza `./tests/Documentation/HANDOFF_Summary.md`.
4. Revisa consistencia y trazabilidad entre el handoff JSON generado y el resumen markdown (`work_performed`, `checks`, `counts`).

## Checklist de completitud

- [ ] Se generó `planner.QATesting-execution-summary.md` con el formato esperado por la guía.
- [ ] El handoff JSON fue generado por la skill de handoff asociada.
- [ ] Los counts (suites/escenarios/requisitos cubiertos/porcentaje de cobertura) reportados en el markdown coinciden numéricamente con los del handoff JSON; el `status` del handoff coincide con el estado del plan.
- [ ] Se actualizó `./tests/Documentation/HANDOFF_Summary.md`.
- [ ] Se verificó consistencia y trazabilidad entre JSON y markdown.
- [ ] El paso 6 esta completo y el workflow puede cerrarse.
