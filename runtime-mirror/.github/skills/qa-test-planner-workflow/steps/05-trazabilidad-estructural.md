# Paso 5: Trazabilidad Estructural

## Objetivo del Paso

Documentar relaciones estructurales de trazabilidad: cada suite a sus requisitos origen, y cada escenario a su criterio de aceptación. Documentar relaciones e impactos entre suites y entre escenarios.

## Modelo Recomendado

Un modelo estándar es suficiente: esta es una tarea de estructuración de relaciones ya existentes.

## Enfoque Exclusivo

Durante este paso tu unico objetivo es documentar trazabilidad estructural. No diseñes nuevas suites ni replantees la cobertura ni las precondiciones.

## Secuencia

1. Para cada suite, documenta su relación con los requisitos origen (`requirements` ya definidos en Paso 2).
2. Para cada escenario, documenta su relación con el criterio de aceptación correspondiente del handoff entrante.
3. Documenta relaciones e impactos estructurales entre suites (qué suite impacta a cuál y por qué).
4. Verifica que la trazabilidad sea bidireccional: desde suite→requisito y desde requisito→suite.

## Que NO hacer en este paso

- No diseñes nuevas suites ni replantees las del Paso 2.
- No replantees el coverage model del Paso 3.
- No replantees las precondiciones del Paso 4.
- No re-evalues severidad de gaps ni replanees mitigaciones.
- No generes el handoff JSON ni el reporte markdown todavía.

## Checklist de completitud

- [ ] Trazabilidad suite→requisito documento para cada suite.
- [ ] Trazabilidad escenario→criterio de aceptación documentada.
- [ ] Relaciones e impactos estructurales entre suites documentados.
- [ ] Trazabilidad bidireccional suite↔requisito verificada.
- [ ] El paso 5 esta completo antes de continuar.
