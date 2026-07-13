# Escalation Log

Registro centralizado de todas las escaladas y su resolución durante la orquestación de agentes QA.

## Formato

| Timestamp | From Agent | To Agent | Reason | Retry_Count | Resolution | Status |
|-----------|-----------|-----------|--------|-------------|------------|--------|
| (empty) | (empty) | (empty) | (empty) | (empty) | (empty) | (empty) |

## Notas

- Esta tabla se actualiza automáticamente cuando ocurren escaladas
- `retry_count` aumenta en cada reintentoSi `retry_count >= 3`, la sesión se marca como `blocked` y se aborta
- Cada entrada debe incluir `correlation_id` en la columna "Reason"
- Las estrategias de resolución se documentan en la columna "Resolution"

## Guardrails

- ⚠️ Si no hay entrada para una escalada, el Orquestador registra fallo de trazabilidad
- ⚠️ Si `retry_count` alcanza 3 sin resolución, la sesión se marca `status_global=blocked`
