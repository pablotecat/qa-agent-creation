# Escalation Log

| Timestamp | From | To | Reason | Retry_Count | Resolution |
|-----------|------|----|--------|-------------|------------|
| 2026-07-10T12:22:30Z | test_planner | orchestrator | Retry limit reached and validation failed for planner handoff | 3 | Session blocked by policy |
| 2026-07-10T12:50:40Z | orchestrator | orchestrator | User-requested retry completed with valid handoffs | 1 | Session reopened and closed as completed_with_warnings |
