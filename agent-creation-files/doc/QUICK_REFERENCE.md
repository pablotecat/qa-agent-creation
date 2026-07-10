# Handoff Format - Quick Reference

## Frontmatter Estandar para `.agent.md`

Usar solo campos soportados por VS Code para custom agents:

```yaml
---
name: Test Documentation Agent
description: Extrae y normaliza requisitos QA en formato Gherkin
tools: [read, search, edit]
user-invocable: false
argument-hint: Solicitud QA u origen de requisitos
---
```

Reglas de este proyecto:
- Permitidos: `name`, `description`, `tools`, `user-invocable`, `argument-hint` (opcional), `agents` (opcional)
- No permitidos en frontmatter: `role`, `inputs`, `outputs`, `non_goals`, `owned_decisions`, `applyTo`
- Los campos de dominio QA deben ir en body markdown como secciones: `Role`, `Interface`, `Non-goals`, `Owned decisions`

## Estructura Mínima Requerida

```json
{
  "handoff": {
    "metadata": {
      "from_agent": "test_documentation|test_planner|test_prioritization",
      "to_agent": "test_documentation|test_planner|test_prioritization|orchestrator",
      "session_id": "uuid",
      "timestamp": "ISO8601",
      "retry_count": 0,
      "correlation_id": "string"
    },
    "context": {
      "user_request_id": "string",
      "phase": "planning_layer",
      "status": "ready_for_handoff"
    },
    "executive_summary": {
      "state_snapshot": "Una frase corta del estado",
      "critical_findings": ["hallazgo 1", "hallazgo 2"],
      "recommendation": "Qué debe enfatizar el siguiente agente"
    },
    "artifacts_references": {
      "path_pattern": "./tests/Documentation/path/",
      "summary_md": "./tests/Documentation/HANDOFF_Summary.md",
      "raw_data": "./tests/Documentation/path/raw/",
      "version_hash": "sha256_hash"
    },
    "delta_changes": {
      "added": ["item1", "item2"],
      "modified": [],
      "removed": [],
      "updated_by": "test_documentation",
      "rationale": "Breve explicación de por qué"
    },
    "validation_checklist": {
      "status": "passed",
      "checks": {
        "check_1": true,
        "check_2": true
      }
    },
    "next_agent_instructions": {
      "must_validate": ["validación 1", "validación 2"],
      "can_skip": ["qué no repetir"],
      "decision_points": ["dónde decidir"]
    },
    "feedback_hooks": {
      "if_gaps_found": {
        "escalate_to": "test_documentation"
      },
      "if_coverage_impossible": {
        "escalate_to": "orchestrator"
      },
      "if_conflict_detected": {
        "conflict_resolution_strategy": "Cómo resolver"
      }
    }
  }
}
```

## Por Agente: Qué Incluir

### Test Documentation → Test Planner

**executive_summary:**
- `state_snapshot`: "Extracción completada: 12 requisitos, 3 funcionalidades, 4 gaps"
- `critical_findings`: Lista de gaps identificados
- `recommendation`: "Considerar estos gaps al diseñar suites"

**artifacts_references:**
- `path_pattern`: "./tests/Documentation/requirements/extracted/"
- `raw_data`: "./tests/Documentation/requirements/extracted/by_area/"

**delta_changes:**
- `added`: Áreas/requisitos nuevos
- `updated_by`: "test_documentation"
- `rationale`: "Extracción de requisitos completada según spec"

**next_agent_instructions:**
- `must_validate`: ["Revisar gaps", "Validar suficiencia de requisitos"]
- `can_skip`: ["Re-extraer requisitos", "Re-normalizar Gherkin"]

---

### Test Planner → Test Prioritization

**executive_summary:**
- `state_snapshot`: "Diseño completado: 3 suites, 28 casos, 92% cobertura"
- `critical_findings`: ["Auth es HIGH complexity", "Registration depende de Auth"]
- `recommendation`: "Enfatizar en suite Auth; es bloqueante"

**artifacts_references:**
- `path_pattern`: "./tests/Documentation/test_planning/suites/"
- `raw_data`: "./tests/Documentation/test_planning/"

**delta_changes:**
- `added`: Suite names ("Suite: Auth (12 escenarios)")
- `updated_by`: "test_planner"
- `rationale`: "Suites diseñadas considerando gaps y dependencies"

**next_agent_instructions:**
- `must_validate`: ["Evaluar riesgo por suite", "Justificar automatización"]
- `can_skip`: ["Re-diseñar suites", "Cambiar precondiciones"]

---

### Test Prioritization → Orchestrator/Generator

**executive_summary:**
- `state_snapshot`: "Priorización completada: 18 auto, 10 manual, 64% coverage"
- `critical_findings`: ["Auth es CRITICAL", "Network tests = manual exploratory"]
- `recommendation`: "Iniciar implementación por Auth smoke tests"

**artifacts_references:**
- `path_pattern`: "./tests/Documentation/prioritization/"
- `raw_data`: "./tests/Documentation/prioritization/"

**delta_changes:**
- `added`: ["Risk matrix", "Automation selection", "Justification audit"]
- `updated_by`: "test_prioritization"
- `rationale`: "Matriz evaluada por riesgo, costo y factibilidad"

**next_agent_instructions:**
- `must_validate`: ["Revisar order", "Validar feasibility de implementación"]
- `can_skip`: ["Re-evaluar riesgo", "Re-diseñar suites"]

---

## Validación Rápida

```python
import json
import jsonschema

# Cargar handoff y schema
with open('handoff.json') as f:
    handoff = json.load(f)
with open('agent-creation-files/doc/handoff-schema.json') as f:
    schema = json.load(f)

# Validar
try:
    jsonschema.validate(instance=handoff, schema=schema)
    print("✅ Handoff válido")
except jsonschema.ValidationError as e:
    print(f"❌ Error: {e.message}")
```

---

## Checklist Pre-Handoff

Antes de generar un handoff, verificar:

- [ ] `metadata.from_agent` es correcto
- [ ] `metadata.to_agent` es válido (no saltarse capas)
- [ ] `metadata.retry_count` < 3 (si >=3, escalate a orchestrator)
- [ ] `context.status` es one of: ready_for_handoff, escalated, failed, completed
- [ ] `executive_summary` es comprensible sin leer files
- [ ] `artifacts_references` apunta a archivos reales
- [ ] `delta_changes.updated_by` coincide con `from_agent`
- [ ] `validation_checklist.status` es passed o warning (no failed)
- [ ] `next_agent_instructions` es claro
- [ ] `feedback_hooks` especifica destino y estrategia
- [ ] JSON válido contra schema

## Checklist Pre-Routing (Orquestador)

Antes de enrutar un handoff recibido, verificar:

- [ ] Handoff persistido en `./tests/Documentation/handoffs/{session_id}/{from}-to-{to}-attempt-{retry_count}-{timestamp}.json`
- [ ] `manifest.json` actualizado con path, correlation_id, retry_count y validation_status
- [ ] `retry_checkpoint.json` actualizado para la correlacion actual
- [ ] No se mutaron `metadata.from_agent`, `metadata.to_agent`, `delta_changes.updated_by`
- [ ] Si persistencia falla, NO enrutar y registrar en `./tests/Documentation/escalation_log.md`

---

## Manejo de Errores

**Si validation_checklist.status = "failed":**
- NO generar handoff
- Registrar error en `./tests/Documentation/escalation_log.md`
- Incrementar `retry_count`
- Reintentar si count < 3

**Si la persistencia en Orquestador falla:**
- NO enrutar el handoff
- Registrar fallo de persistencia en `./tests/Documentation/escalation_log.md`
- Actualizar `retry_checkpoint.json`
- Reintentar segun policy (`max_attempts=3`)

**Si retry_count >= 3:**
- Generar handoff con `context.status = "failed"`
- Marcar en el orquestador `status_global=blocked`
- Escalate siempre a `orchestrator`
- Incluir logs completos en `rationale`

---

## Ejemplo Real: Documentation → Planner

```json
{
  "handoff": {
    "metadata": {
      "from_agent": "test_documentation",
      "to_agent": "test_planner",
      "session_id": "550e8400-e29b-41d4-a716-446655440000",
      "timestamp": "2026-07-08T10:30:00Z",
      "retry_count": 0,
      "correlation_id": "doc-planner-001"
    },
    "context": {
      "user_request_id": "req-001",
      "phase": "planning_layer",
      "status": "ready_for_handoff"
    },
    "executive_summary": {
      "state_snapshot": "Extracción: 12 requisitos, 3 áreas (Auth, Registration, Users), 4 gaps CRITICAL-MEDIUM",
      "critical_findings": [
        "Gap: Performance requirements en Auth",
        "Conflicto: Email validation rules inconsistentes",
        "Gap: Session expiry no documentado"
      ],
      "recommendation": "Considerar gaps al diseñar suite Auth; marcar como BLOCKER para resolución"
    },
    "artifacts_references": {
      "path_pattern": "./tests/Documentation/requirements/extracted/",
      "summary_md": "./tests/Documentation/HANDOFF_Summary.md",
      "raw_data": "./tests/Documentation/requirements/extracted/by_area/",
      "version_hash": "abc123def456"
    },
    "delta_changes": {
      "added": [
        "Auth Flow: 5 requisitos extraídos y normalizados",
        "User Registration: 4 requisitos extraídos y normalizados",
        "User Management: 3 requisitos extraídos y normalizados"
      ],
      "modified": [],
      "removed": [],
      "updated_by": "test_documentation",
      "rationale": "Extracción de requisitos completada. Gherkin normalizado. Trazabilidad a fuentes verificada."
    },
    "validation_checklist": {
      "status": "passed",
      "checks": {
        "requirements_extracted": true,
        "gherkin_normalized": true,
        "source_traceability": true,
        "gaps_identified": true,
        "areas_partitioned": true,
        "dependencies_mapped": true,
        "no_test_cases": true
      }
    },
    "next_agent_instructions": {
      "must_validate": [
        "Revisar gaps y determinar impacto en cobertura",
        "Validar que requisitos son suficientes para diseño de suites"
      ],
      "can_skip": [
        "No re-extraer requisitos",
        "No normalizar Gherkin nuevamente"
      ],
      "decision_points": [
        "¿Cómo diseñar suite Auth considerando session expiry gap?",
        "¿Necesita cobertura adicional por email validation conflict?"
      ]
    },
    "feedback_hooks": {
      "if_gaps_found": {
        "escalate_to": "test_documentation"
      },
      "if_coverage_impossible": {
        "escalate_to": "orchestrator"
      },
      "if_conflict_detected": {
        "conflict_resolution_strategy": "Resolver con Documentation si es ambigüedad en requisitos"
      }
    }
  }
}
```

---

## Links

- Full Spec: `HANDOFF_SPECIFICATION.md`
- Schema Validation: `handoff-schema.json`
- Feedback Routing: `handoff-hooks-routing.md`
- Implementation Guide: `README.md`
