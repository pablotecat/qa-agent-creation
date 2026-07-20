# Objetivo

Instalar de forma determinista los archivos runtime de agentes QA definidos en este repositorio.

# Principio de autoridad unica

- **`runtime-mirror/.github/`** es la unica fuente de verdad.
- Todo lo que este dentro de `runtime-mirror/.github/` se instala; lo que no este, no se instala.
- No existe lista de archivos en ningún documento — el filesystem del mirror es la lista.

# Regla de separacion de autoridad

- Este documento solo gobierna la instalacion.
- Tras copiar los archivos runtime, la autoridad operativa pasa a los artefactos instalados en `.github/`.
- El instalador no debe redefinir contratos de handoff, reglas de validacion ni flujos multiagente.

# Politica de sobrescritura (interactiva global por ejecucion)

Antes de copiar cualquier archivo, si ya existen archivos en la carpeta `.github/` del proyecto destino, el instalador DEBE preguntar al usuario una unica opcion global:

- `fail_if_exists` — abortar si cualquier archivo ya existe.
- `overwrite` — sobrescribir todos los archivos existentes.
- `skip_if_exists` — saltar los archivos que ya existan, copiar solo los nuevos.

Reglas:
- La opcion elegida se aplica a TODOS los archivos de la instalacion.
- No se permiten excepciones por archivo en la misma ejecucion.
- Si el usuario no responde o responde fuera de opciones validas, la instalacion no inicia.

# Procedimiento de instalacion

El instalador DEBE:

1. Leer el contenido de `runtime-mirror/.github/` de forma recursiva (archivos y estructura de directorios).
2. Preguntar la politica de sobrescritura si `.github/` ya existe en el destino.
3. Copiar **todo** el arbol `runtime-mirror/.github/` → `<proyecto-destino>/.github/` respetando:
   - Estructura de directorios identica.
   - Politica de sobrescritura seleccionada.
4. Verificar que todos los archivos copiados existen en el destino.
5. Reportar resultado: archivos copiados, saltados y errores (si los hay).

El instalador NO DEBE:

- Usar `install-manifest.json` como lista de archivos — el mirror es la fuente.
- Hardcodear rutas o nombres de archivo.
- Inferir o reconstruir archivos ausentes en el mirror.
- Modificar el contenido de los archivos al copiar.

# Archivos que NO se instalan (solo bootstrap)

Los siguientes archivos pertenecen al repositorio de instalacion y no se copian al proyecto destino:

- `./install-prompt.md`
- `./install-manifest.json`
- `./README.md`
- `./ORCHESTRATION-RECOVERY.md` (raiz del repo)

# Nota posterior a la instalacion

- La operacion QA posterior a la copia se define en los archivos runtime instalados.
- Los archivos instalados son editables tras la copia.
- Si falta un archivo en `runtime-mirror/`, simplemente no se instalara; si se requiere, anadirlo al mirror antes de ejecutar la instalacion.