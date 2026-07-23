#!/usr/bin/env node
// @qatesting/install — Copia el runtime de agentes QA (.github/) al proyecto destino.
// Overwrite forzado e idempotente. Sin dependencias externas. Node >= 16.7 (fs.cpSync).

import { existsSync, cpSync, statSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, relative } from "node:path";

// Directorios runtime del paquete que se copian al destino/.github/.
// Estos subdirs viven en la raíz del paquete publicado (lado a lado con bin/).
const RUNTIME_DIRS = ["agents", "instructions", "prompts", "skills"];

// Resuelve la raíz del paquete (carpeta que contiene este bin/).
const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

// Destino: <cwd>/.github/  (cwd del usuario que ejecuta npx)
const destRoot = resolve(process.cwd(), ".github");

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}

function countFiles(entryPath) {
  // Cuenta archivos (no directorios) de forma recursiva; ignora errores.
  let count = 0;
  const stack = [entryPath];
  while (stack.length > 0) {
    const cur = stack.pop();
    let stat;
    try {
      stat = statSync(cur);
    } catch {
      continue;
    }
    if (stat.isFile()) {
      count += 1;
    } else if (stat.isDirectory()) {
      try {
        const entries = readdirSync(cur, { withFileTypes: true });
        for (const e of entries) stack.push(join(cur, e.name));
      } catch {
        // ignore unreadable dir
      }
    }
  }
  return count;
}

function main() {
  console.log("@qatesting/install — instalando runtime QA en .github/\n");

  if (!existsSync(packageRoot)) {
    fail(`No se pudo resolver la raíz del paquete: ${packageRoot}`);
  }

  // Validar que al menos una carpeta runtime existe en el paquete.
  const available = RUNTIME_DIRS.filter((d) => {
    const p = join(packageRoot, d);
    return existsSync(p) && statSync(p).isDirectory();
  });

  if (available.length === 0) {
    fail(
      `No se encontraron carpetas runtime (${RUNTIME_DIRS.join(", ")}) en ${packageRoot}. El paquete publicado puede estar corrupto.`
    );
  }

  // Overwrite forzado idempotente: force:true + recursive:true.
  // errorOnExist se mantiene false para que re-ejecuciones no fallen.
  let totalFiles = 0;
  let copiedDirs = 0;

  for (const dir of available) {
    const src = join(packageRoot, dir);
    const dst = join(destRoot, dir);
    try {
      cpSync(src, dst, {
        recursive: true,
        force: true,
        errorOnExist: false,
        preserveTimestamps: true,
      });
      copiedDirs += 1;
      const files = countFiles(src);
      totalFiles += files;
      console.log(
        `  ✓ ${dir.padEnd(14)} → ${relative(process.cwd(), dst)}  (${files} ${files === 1 ? "archivo" : "archivos"})`
      );
    } catch (err) {
      fail(`Error copiando '${dir}': ${err.message}`);
    }
  }

  console.log(
    `\n✔ ${totalFiles} ${totalFiles === 1 ? "archivo copiado" : "archivos copiados"} en ${copiedDirs} ${copiedDirs === 1 ? "carpeta" : "carpetas"} → ${relative(process.cwd(), destRoot) || ".github"}`
  );
  console.log(
    `\nLos agentes QA están disponibles en .github/. Ya puedes invocarlos desde GitHub Copilot.`
  );
}

main();
