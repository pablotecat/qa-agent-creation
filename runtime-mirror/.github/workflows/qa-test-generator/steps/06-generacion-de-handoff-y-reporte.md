# Paso 6: Generacion de Handoff y Reporte

## Objetivo del Paso

Generar el entregable final del agente: el documento markdown `generator.QATesting-test-cases.md` y, a partir de él ya completo, el handoff JSON mínimo delegado a la skill compartida. El paso concluye con ambos artefactos persistidos correctamente; la validación del handoff se hace contra el schema antes de entregar. Este paso solo persiste lo ya diseñado, marcado y verificado; no redacta pasos, ni marca provisionales, ni revisa trazabilidad (eso ya se hizo en 03, 04, 05).

## Modelo Recomendado

Usa el modelo de razonamiento mas potente disponible. Este paso produce el entregable final que otros consumidores leerán sin acceso al documento de entrada original: exige maxima precision y consistencia.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es ensamblar, validar y persistir el entregable final. No redactes nuevos pasos ni marques nuevos provisionales, ni replantees la trazabilidad ya verificada.

## Secuencia

1. Genera `generator.QATesting-test-cases.md` siguiendo la guía `.github/workflows/qa-test-generator/references/generator-report-guidance.md` y la plantilla OBLIGATORIA `references/assets/test-case-template.md` (anatomía B: Prerrequisitos + pasos numerados Given/When/Then sin expecteds inline en los pasos previos + último paso Then con Expected Result nuclear).
2. Con el documento ya completo, genera el handoff JSON usando la skill compartida `qa-handoff-creation` (`.github/skills/qa-handoff-creation/SKILL.md`), sustituyendo `{agent}` por `generator`. Patrón de nombre: `generator.QATesting-handoff-{timestamp}.json`.
3. Actualiza `./tests/Documentation/HANDOFF_Summary.md`.
4. Revisa consistencia y trazabilidad entre el handoff JSON generado y el documento markdown (`work_performed`, `checks`, `counts`):
   - `checks`: mapa de booleanos con validaciones objetivas (p. ej. `original_id_preserved`, `splits_follow_pattern`, `every_test_has_ac`, `every_test_has_nuclear_then`, `every_step_clear_or_provisional`).
   - `counts`: mapa de conteos objetivos (p. ej. `test_cases_total`, `test_cases_splitted`, `steps_provisional_total`, `acceptance_criteria_covered`, `acceptance_criteria_uncovered`, `mode_planner_handoff` o `mode_documentation_directo`).
5. Valida el handoff JSON contra `assets/handoff-schema.json` (de la skill compartida `qa-handoff-creation`).
6. Si la validación falla o la consistencia JSON↔MD está rota, corrige el handoff JSON (no los Test Cases): los Test Cases ya están diseñados y verificados en los pasos anteriores.

## Que NO hacer en este paso

- No redactes nuevos pasos ni marques nuevos provisionales (pasos 03 y 04 ya cerrados).
- No replantees la trazabilidad (paso 05 ya cerrado).
- No replantees el particionado por AC ni los IDs (paso 02 ya cerrado).
- No definas tu mismo la estructura o el nombre del documento markdown: eso vive en la guía de report asociada.
- No definas tu mismo la estructura o el nombre del handoff JSON: eso vive en la skill de handoff asociada.
- No omitas la validación de consistencia entre JSON y markdown antes de entregar.
- No nombres agentes específicos del pipeline como sucesores o predecesores.

## Checklist de completitud

- [ ] Se generó `generator.QATesting-test-cases.md` con el formato esperado por la guía y la plantilla OBLIGATORIA.
- [ ] El handoff JSON fue generado por la skill `qa-handoff-creation` con el patrón de nombre correcto.
- [ ] El handoff refleja fielmente los hechos del documento (`work_performed`, `checks`, `counts`).
- [ ] Se actualizó `./tests/Documentation/HANDOFF_Summary.md`.
- [ ] Se verificó consistencia y trazabilidad entre JSON y markdown.
- [ ] El handoff valida contra `assets/handoff-schema.json` (de la skill compartida).
- [ ] El paso 6 está completo y el workflow puede cerrarse.
