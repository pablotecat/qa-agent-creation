# qa-agents

Paquete npm que instala los **agentes QA de GitHub Copilot** en cualquier proyecto. El runtime no va dentro del paquete: el binario lo **descarga desde GitHub** (`pablotecat/qa-agent-creation`) en cada ejecución para obtener siempre la última versión. Los agentes, skills, instrucciones y prompts quedan disponibles en `.github/` del proyecto destino, listos para ser invocados desde Copilot.

```bash
npx qa-agents
```

## Dos modos de instalación

Este proyecto admite dos formas de instalación, según lo que necesites:

### Modo 1 — Runner completo (recomendado para el pipeline QA)

Instala **todo** el runtime (agentes + instrucciones + prompts + skills) en `.github/`:

```bash
npx qa-agents
```

Copia recursivamente a `./.github/`:

- `agents/` → `.github/agents/`
- `instructions/` → `.github/instructions/`
- `prompts/` → `.github/prompts/`
- `skills/` → `.github/skills/`

La copia es **idempotente y con overwrite forzado**: re-ejecutar el comando no falla y deja los archivos idénticos. No requiere confirmación interactiva.

### Modo 2 — Solo skills (estándar del ecosistema `skills`)

Si solo necesitas las skills (archivos `SKILL.md`) y no los agentes/instrucciones/prompts, puedes usar el CLI estándar [`skills`](https://skills.sh/), que instala en la ruta que tu agente espera (`.agents/skills/` o `.copilot/skills/` para GitHub Copilot):

```bash
npx skills add pablotecat/qa-agents
```

Esto copia únicamente las carpetas con `SKILL.md`. Es compatible con 70+ agentes. No instala los `.agent.md`, `.instructions.md` ni `prompts/`.

## Requisitos

- **Node.js ≥ 16.7** (usa `fs.cpSync` nativo, sin dependencias npm externas).
- **Git** instalado en el PATH (el runner hace un shallow clone del repo).
- El repo `pablotecat/qa-agent-creation` debe ser **público** (para clonar sin autenticación).

## Uso del runner

```bash
# En la raíz de tu proyecto destino:
npx qa-agents

# Especificar una rama alternativa:
npx qa-agents --branch develop
```

Salida esperada:

```
qa-agents — instalando runtime QA en .github/
  fuente: https://github.com/pablotecat/qa-agent-creation.git
  rama:   main

  ↓ clonando repo...
  ✓ agents         → .github/agents/  (3 archivos)
  ✓ instructions   → .github/instructions/  (4 archivos)
  ✓ prompts        → .github/prompts/  (1 archivo)
  ✓ skills         → .github/skills/  (N archivos)

✔ N archivos copiados en 4 carpetas → .github/

Los agentes QA están disponibles en .github/. Ya puedes invocarlos desde GitHub Copilot.
```

## Contenido instalado

| Carpeta | Archivos | Descripción |
|---------|----------|-------------|
| `agents/` | 3 | Agentes `QA.*.agent.md`: `documentation`, `planner`, `generator` (los archivos marcados como `old.*` se excluyen de la copia) |
| `instructions/` | 4 | Instrucciones `QA.*.instructions.md` por agente + `QATesting-general` |
| `prompts/` | 1 | Prompts de inicialización (`test-documentation-init.md`) |
| `skills/` | 5 dirs | `qa-handoff-creation`, `qa-documentation-workflow`, `qa-generator-workflow`, `qa-planner-workflow`, `qa-test-prioritization-report` (cada una con `SKILL.md` + `steps/`/`references/`/`examples/`/`assets/`) |

Los agentes son **invocables directamente** por el usuario. El pipeline QA se ejecuta de forma secuencial manual: `QA.documentation` → `QA.planner` → `QA.generator`.

## Artefactos de sesión

Los artefactos generados por los agentes durante una sesión se organizan bajo `./tests/Documentation/sessions/`, con cada agente creando su subcarpeta `QA-{agente}-agent/` dentro de la sesión. El primer agente en ejecutarse inicializa la carpeta de sesión y el contador.

## Estructura del paquete npm

El paquete publicado **solo** contiene el binario y el README; el runtime se descarga de GitHub en cada ejecución:

```text
.
├── bin/
│   └── install.mjs     # binario ESM (Node ≥16.7, fs.cpSync) expuesto como `qa-agents`
├── package.json        # name: qa-agents, files: [bin/, README.md]
└── README.md
```

El campo `files` en `package.json` garantiza que el tarball npm incluya **solo** `bin/` y `README.md`. El repositorio de GitHub (`pablotecat/qa-agent-creation`) contiene además las carpetas runtime (`agents/`, `instructions/`, `prompts/`, `skills/`) que el bin descarga y copia.

> **Nota:** las carpetas runtime del repo (`agents/`, `instructions/`, `prompts/`, `skills/`) **no se publican** en el tarball npm, pero **deben existir en el repo de GitHub** porque es lo que descarga el bin.

## Desarrollo

```bash
# Probar el bin localmente (descarga de GitHub y copia a ./.github/ del cwd):
node bin/install.mjs

# Probar con una rama alternativa:
node bin/install.mjs --branch develop
```

Para iterar sobre el runtime sin publicar en npm ni en GitHub, puedes copiar localmente las carpetas del repo a `.github/` de un proyecto de prueba con `fs.cpSync` o tu gestor de archivos.

## Publicación

```bash
npm login
npm publish                       # unscoped package, público por defecto
```

Para verificar qué se incluirá en el tarball antes de publicar:

```bash
npm publish --dry-run
```
