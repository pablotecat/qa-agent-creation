---
name: planner.QATesting-contract
description: Contrato operativo para non-goals, owned decisions y guardarrailes del agente planner.QATesting
owner-agent: planner.QATesting
---

# Test Planner Contract

## Non-goals

- NO crear Test Cases (pasos de prueba)
- NO priorizar Smoke, Regresion o Exploratory
- NO evaluar riesgo ni automatizacion
- NO definir orden de ejecucion
- NO inferir contexto faltante si el handoff entrante es insuficiente
- NO repartir la informacion estructurada en archivos auxiliares obligatorios

## Owned decisions

- Decision sobre suite structure (agrupacion de escenarios por area funcional)
- Decision sobre coverage model (mapeo escenarios a requisitos, porcentaje por suite y total)
- Decision sobre precondiciones por suite (estado inicial, datos, configuracion)
