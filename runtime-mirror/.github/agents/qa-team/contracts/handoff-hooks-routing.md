# Feedback Hooks Routing Guide

## Propósito

Definir cómo el Orquestador maneja bloqueos reportados por un agente trabajador, previniendo bucles infinitos y garantizando trazabilidad de cada reintento.

## Estado Actual

Con un único agente trabajador (`test_documentation`) en el catálogo, todavía no existen escaladas entre agentes distintos. Este documento se ampliará con una matriz de escaladas cruzadas cuando se incorporen más agentes al pipeline (ver `orchestration-config.json` → `agent_catalog`).

## Modo Operativo del Orquestador

- Modo de ejecución: secuencial.
- Resolución de prerequisitos por defecto: **pre-resolución**.
- Ningún routing es válido sin persistencia previa del handoff recibido.

## Manejo de Bloqueos (Self-Retry)

- Si `test_documentation` reporta `status: blocked` en su handoff, el Orquestador puede reintentar invocando al mismo agente con contexto adicional (self-retry).
- El Orquestador incrementa el `retry_count` para el siguiente intento sobre el mismo `correlation_id` base (`{session_id}.{agent}.{retry_count}`).
- **Regla:** si `retry_count >= 3`, el Orquestador aborta y marca la sesión como `blocked` en su propio estado global, registrando el motivo en `escalation_log.md`.

## Guardrail: Persistencia Previa Al Routing

Toda transición (nominal o de reintento) DEBE cumplir:

1. El Orquestador persiste el handoff recibido en `./tests/Documentation/sessions/session_{session_N}_{session_id}/agent-{agent}/`.
2. El Orquestador actualiza `manifest.json` y `retry_checkpoint.json`.
3. Solo después de persistencia exitosa se considera válida la transición.

**Regla:** si la persistencia falla, no hay routing y se trata como fallo de orquestación.

## Registro de Bloqueos

Se DEBE mantener un archivo centralizado:

**`./tests/Documentation/escalation_log.md`**
```markdown
# Escalation Log

| Timestamp | Agente | Motivo | Retry_Count | Resolución |
|-----------|--------|--------|-------------|------------|
| 2026-07-08T10:30Z | test_documentation | Gap bloqueante en requisitos de Auth | 1 | ✅ Resuelto - contexto adicional provisto |
```

## Criterios de Éxito

✅ **No hay bucles infinitos:** máximo 3 reintentos antes de abortar
✅ **Trazabilidad auditada:** `correlation_id` + `timestamp` + `retry_count`
✅ **Escalation log centralizado:** auditoría de todos los bloqueos
✅ **Persistencia canónica garantizada:** no hay transición efectiva sin handoff persistido

## Pendiente

- Matriz de escaladas entre agentes distintos (cuando exista más de un agente trabajador en el catálogo).

