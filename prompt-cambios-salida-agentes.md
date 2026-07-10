Acabo de copiar en el proyecto dos carpetas con salidas de ejemplo: `tests1\` y `tests2\`. Corresponden a dos ejecuciones de los agentes que se generan al instalarlos desde este mismo proyecto, sobre el mismo proyecto objetivo.

La estructura de archivos es la siguiente:

tests1\
└───Documentation
    │   escalation_log.md
    │   HANDOFF_Summary.md
    │
    ├───handoffs
    │   └───6b7675e8-...
    │           manifest.json
    │           retry_checkpoint.json
    │           test_documentation-to-test_planner-attempt-0-...
    │           test_planner-to-test_prioritization-attempt-0-...
    │           test_planner-to-test_prioritization-attempt-1-...
    │           test_planner-to-test_prioritization-attempt-3-...
    │           test_prioritization-to-orchestrator-attempt-1-...
    │
    ├───prioritization
    │       automation_selection.json
    │       justification.md
    │       risk_matrix.json
    │
    └───requirements
        └───extracted
            │   dependencies.json
            │   gaps_identified.json
            │   sources.json
            │
            └───by_area
                    api.gherkin
                    registration.gherkin
                    users_listing.gherkin

tests2\
└───Documentation
    │   escalation_log.md
    │   HANDOFF_Summary.md
    │   ORCHESTRATION_FINAL_SUMMARY.md
    │
    └───handoffs
        └───5a1b2c3d-...
                execution-summary.json
                manifest.json
                README.md
                retry_checkpoint.json
                test_documentation-analysis-report.md
                test_documentation-to-test_planner-attempt-0-...
                test_planner-execution-summary.md
                test_planner-to-test_prioritization-attempt-0-...
                test_prioritization-to-orchestrator-attempt-0-...
                validation-report.md

En `tests2` no se siguió el formato de entregables de `tests1`, pero su salida es mucho más completa y legible. Quiero que las salidas de `tests2` se conviertan en el nuevo estándar para todos los agentes que instala este proyecto.

## Agentes involucrados
Actualmente existen tres agentes trabajadores de la capa de planificación:
- **Documentator**
- **Planner**
- **Prioritization**

Y un agente coordinador:
- **Orchestrator** (su definición actual es: “Eres el Orquestador del equipo QA. No ejecutas trabajo especializado de QA: tu responsabilidad es coordinar, validar y aprobar cada transición entre agentes. Eres el único punto de entrada para el usuario y el único responsable de la persistencia de handoffs, la trazabilidad de sesión y la integridad del flujo. Nunca produces artefactos QA directamente. En su lugar, decides qué agente invocar, en qué orden, y garantizas que cada transición es válida antes de ejecutarla.”)

## Cambios que hay que implantar

### Para todos los agentes trabajadores (Documentator, Planner, Prioritization)
1. **Un único JSON de handoff**: en lugar de repartir la información en múltiples archivos (como los tres JSON del Documentator en `tests1`), cada agente debe generar **un solo archivo JSON** que contenga toda la información estructurada que el siguiente agente u Orchestrator pueda necesitar. El formato libre de `tests2` (por ejemplo `test_documentation-to-test_planner-attempt-0-...json`) es válido, aunque sea extenso.
2. **Un resumen en Markdown**: cada agente debe producir **un archivo `.md` de resumen** con la misma filosofía que los vistos en `tests2` (`test_documentation-analysis-report.md`, `test_planner-execution-summary.md`, etc.). Estos resúmenes deben:
   - Contener **secciones mínimas** (comunes a todos los agentes y otras específicas de cada uno). De momento, deduce esas secciones examinando los `.md` de `tests2` y pregúntame si algo no queda claro.
   - **No limitarse** a esas secciones: si un agente considera que necesita comunicar algo adicional, puede añadir las secciones que crea oportunas.
   - Ser tan completos y legibles como los de `tests2`.

### Para el Documentator específicamente
- **Eliminar** la generación de archivos `.gherkin` y los tres JSON sueltos (`dependencies.json`, `gaps_identified.json`, `sources.json`). Toda esa información debe consolidarse en el JSON único y en el resumen `.md`.

### Para el Orchestrator
- **Resumen final**: debe generar un archivo `.md` con las conclusiones consolidadas de todos los agentes, similar a `ORCHESTRATION_FINAL_SUMMARY.md`. El nombre `README.md` no es adecuado; usa `ORCHESTRATION_FINAL_SUMMARY.md` o un nombre similar que indique claramente que es el resumen de la orquestación.
- **Handoff fragmentado**: actualmente el Orchestrator tiene prohibido modificar los handoff y los pasa íntegros. A partir de ahora, cuando un agente posterior solo necesite una parte de la información (por ejemplo, el Planner solo necesita los gaps, o solo los tests de un área concreta), el Orchestrator **extraerá ese fragmento del JSON del agente anterior** y se lo pasará en el handoff, acompañado de un mensaje que indique claramente:
  - Que se trata de **información fragmentada**.
  - Que el agente puede **solicitar más información antes de inferir lo que le falta**, si lo necesita.
- El agente destino debe estar instruido para **reclamar la información completa si el fragmento no le basta**, en lugar de hacer suposiciones.

## Tu tarea
Revisa el proyecto instalador en el que te encuentras. Identifica los archivos de definición de cada agente (prompts, plantillas, JSON de configuración o contratos) y modifícalos para que cumplan exactamente con las directrices anteriores. No generes ejemplos ni scripts de ayuda; solo actualiza las definiciones de los agentes.

Si para determinar las secciones mínimas de los resúmenes `.md` necesitas mi confirmación, dedúcelas primero analizando los `.md` de `tests2` y luego pregúntame antes de escribirlas en las plantillas.