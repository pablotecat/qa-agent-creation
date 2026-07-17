# Objetivo

Instalar de forma determinista los archivos runtime de agentes QA definidos en este repositorio.

# Alcance del instalador

- Copiar unicamente los archivos `classification=runtime` declarados en `install-manifest.json`.
- No definir ni reescribir comportamiento operativo del runtime una vez instalada la estructura final.

# Contrato de autoridad (sin duplicidad)

- `install-manifest.json` es la unica fuente de verdad para mapeo de archivos (`source -> destination`).
- `install-prompt.md` define comportamiento del agente instalador, guardrails y reglas funcionales.
- Si hay conflicto entre rutas declaradas en prompt y manifest, la instalacion DEBE abortar con error explicito.

# Regla de separacion de autoridad

- Este documento solo gobierna la instalacion.
- Tras copiar los archivos runtime, la autoridad operativa pasa a los artefactos instalados en `.github/`.
- El instalador no debe redefinir contratos de handoff, reglas de validacion ni flujos multiagente.

# Politica de sobrescritura (interactiva global por ejecucion)

Antes de copiar cualquier archivo runtime, si ya existen los agentes en la carpeta .github del proyecto, el agente instalador DEBE preguntar al usuario una unica opcion global:

- `fail_if_exists`
- `overwrite`
- `skip_if_exists`

Reglas:
- La opcion elegida se aplica a TODOS los archivos de la instalacion.
- No se permiten excepciones por archivo en la misma ejecucion.
- Si el usuario no responde o responde fuera de opciones validas, la instalacion no inicia.

# Instalacion runtime (manifest-driven)

El instalador DEBE:

1. Cargar y validar `./install-manifest.json`.
2. Filtrar entradas con `classification=runtime`.
3. Copiar archivos desde `runtime_mirror_root` a sus destinos exactos.
4. Aplicar la politica global de overwrite seleccionada.
5. Verificar que todos los `required=true` quedaron instalados.
6. Reportar errores por archivo con id de entrada del manifest.
7. Tratar `.github/prompts/prompt-to-agent.md` como artefacto runtime instalable si asi lo declara el manifest.

El instalador NO DEBE:

- Hardcodear rutas fuera del manifest.
- Duplicar listas de copiado en este prompt.
- Copiar entradas con `classification=bootstrap`.
- Copiar ejemplos al destino final (bootstrap-only).
- Inferir o reconstruir archivos runtime ausentes.

# Archivos bootstrap (no copiar al proyecto final)

Los siguientes artefactos son de scaffolding y referencia:

- `./install-prompt.md`
- `./README.md`

# Nota posterior a la instalacion

- La operacion QA posterior a la copia se define en los archivos runtime instalados por el manifest.
- `prompt-to-agent.md` es un artefacto runtime editable tras la copia si el manifest lo marca como tal.
- Si falta un archivo runtime requerido, la instalacion debe fallar; el instalador no debe suplirlo con reglas embebidas en este documento.