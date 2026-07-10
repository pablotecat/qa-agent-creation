# Test Planning and Prioritization Report

## Suite priorities
1. Smoke: register, listing, navigation, server start
2. Functional: CRUD API/UI, validation, modal flows
3. Regression: XSS, concurrency, browser matrix, destructive paths

## Automation priority
- Tier 1: register happy path, validation, list retrieval, form success, navigation
- Tier 2: update, email edge cases, multi-browser, headers
- Tier 3: performance, concurrency, delete, extended list checks

## Risks to track
- XSS
- Missing auth
- Race conditions
- Validation mismatch
