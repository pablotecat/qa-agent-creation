# @qatesting/install

Paquete npm que instala los **agentes QA de GitHub Copilot** en cualquier proyecto. Los agentes, skills, instrucciones y prompts quedan disponibles en `.github/` del proyecto destino, listos para ser invocados desde Copilot.

```bash
npx @qatesting/install
```

## Qué hace

Copia recursivamente el runtime QA a `./.github/` del directorio actual:

- `agents/` → `.github/agents/`
- `instructions/` → `.github/instructions/`
- `prompts/` → `.github/prompts/`
- `skills/` → `.github/skills/`

La copia es **idempotente y con overwrite forzado**: re-ejecutar el comando no falla y deja los archivos idénticos. No requiere confirmación interactiva.

## Requisitos

- **Node.js ≥ 16.7** (usa `fs.cpSync` nativo, sin dependencias externas).

## Uso

```bash
# En la raíz de tu proyecto destino:
npx @qatesting/install
```

Salida esperada:

```
@qatesting/install — instalando runtime QA en .github/

  ✓ agents         → .github/agents/  (4 archivos)
  ✓ instructions   → .github/instructions/  (4 archivos)
  ✓ prompts        → .github/prompts/  (1 archivo)
  ✓ skills         → .github/skills/  (N archivos)

✔ N archivos copiados en 4 carpetas → .github/

Los agentes QA están disponibles en .github/. Ya puedes invocarlos desde GitHub Copilot.
```

## Contenido instalado

| Carpeta | Archivos | Descripción |
|---------|----------|-------------|
| `agents/` | 4 | Agentes `*.QATesting.agent.md`: `documentation`, `generator`, `planner`, `prioritization` |
| `instructions/` | 4 | Instrucciones `*.QATesting.instructions.md` por agente + `QATesting-general` |
| `prompts/` | 1 | Prompts de inicialización (`test-documentation-init.md`) |
| `skills/` | 5 dirs | `qa-handoff-creation`, `qa-test-documentation-workflow`, `qa-test-generator-workflow`, `qa-test-planner-workflow`, `qa-test-prioritization-report` (cada una con `SKILL.md` + `steps/`/`references/`/`examples/`/`assets/`) |

Los agentes son **invocables directamente** por el usuario. El pipeline QA se ejecuta de forma secuencial manual: `documentation.QATesting` → `planner.QATesting` → `prioritization.QATesting`.

## Artefactos de sesión

Los artefactos generados por los agentes durante una sesión se organizan bajo `./tests/Documentation/sessions/`, con cada agente creando su subcarpeta `agent-{agente}/` dentro de la sesión. El primer agente en ejecutarse inicializa la carpeta de sesión y el contador.

## Estructura del paquete

```text
.
├── bin/
│   └── install.mjs     # binario ESM (Node ≥16.7, fs.cpSync) expuesto como `qa-install`
├── agents/             # runtime: se copia a .github/agents/
├── instructions/       # runtime: se copia a .github/instructions/
├── prompts/            # runtime: se copia a .github/prompts/
├── skills/             # runtime: se copia a .github/skills/
├── package.json
├── README.md
└── skills-lock.json    # metadata (no se publica ni instala)
```

El campo `files` en `package.json` garantiza que el tarball npm incluya **solo** `bin/`, las 4 carpetas runtime y `README.md`. `skills-lock.json` y archivos de repositorio quedan excluidos.

## Desarrollo

```bash
# Probar el bin localmente sin publicar (en una carpeta temporal limpia):
node bin/install.mjs
```

## Publicación

```bash
npm login
npm publish --access public    # scoped package, requiere --access public
```

Para verificar qué se incluirá en el tarball antes de publicar:

```bash
npm publish --dry-run --access public
```