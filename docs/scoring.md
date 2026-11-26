# Scoring

Every scan produces an overall score from 0 to 100, a grade, and four category scores. The score is meant for comparing and gating — the findings themselves are what to act on.

## Points per finding

| Severity | Deduction |
|---|---|
| critical | 40 |
| high | 15 |
| medium | 6 |
| low | 2 |
| info | 0 |

Deductions are summed per rule, with two caps so that one noisy rule cannot dominate:

- low findings of a rule count for at most **10** points,
- all non-critical findings of a rule count for at most **30** points.

Critical findings are never capped. The score is `100 − total deduction`, floored at 0.

## Hard caps

| Condition | Maximum score |
|---|---|
| Any critical finding | 40 (F) |
| A tool, prompt or resource the official MCP TypeScript SDK rejects — this breaks the whole list in many clients | 59 (D) |

## Grades

| Grade | Score |
|---|---|
| **A** | 90–100 |
| **B** | 80–89 |
| **C** | 65–79 |
| **D** | 50–64 |
| **F** | below 50 |

## Category scores

*security*, *efficiency*, *quality* and *compliance* are calculated the same way, using only the findings of rules in that category (see the [rule table](rules.md)). Hard caps apply only to the overall score. Baseline changes (MCP010) count as security.

## Example

A server with one high MCP004 finding and six low MCP201 findings: 15 + min(6 × 2, 10) = 25 → score 75, grade **C**; security 85, quality 90.
