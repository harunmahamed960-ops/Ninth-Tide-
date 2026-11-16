# Ninth Tide — Production Tracker

**Planning baseline:** 2026-11-16  
**Target:** 2026-12-04 mobile PWA beta (estimate, contingent on tests)  
**Current completion estimate:** 20% — prototype exists locally, but game source is not yet committed to GitHub.  
**Measurement:** completion percentages are milestone gates, not elapsed time. Update only after acceptance criteria pass.

| Dates (2026) | Target | Milestone | Acceptance gate |
|---|---:|---|---|
| Nov 16–18 | 30% | Repository and source import | Game source, assets, PWA manifest, tests committed; launches from repo |
| Nov 19–22 | 50% | Mobile visual novel UI | 360–430px touch QA, readable dialogue, sprite expressions, transitions |
| Nov 23–26 | 75% | Narrative and gameplay | Investigations/evidence, meaningful stats, 9 reachable endings verified |
| Nov 27–30 | 90% | Sound and polish | Browser voice fallback, opt-in sound, motion controls, performance pass |
| Dec 1–4 | 100% | Beta release | Offline install, save/load and restore, real Android QA, no blocker bugs |

## Immediate actions
- [x] Dedicated private GitHub repository
- [x] Development instructions and project roadmap
- [ ] Import prepared mobile development kit (currently a local ZIP; not in GitHub)
- [ ] Add CI syntax, story graph, and save/load tests
- [ ] Establish a stable preview build

## Quality requirements
- No hardcoded claims of guaranteed browser voice quality.
- No external art dependencies at runtime; original artwork only.
- Save format must be versioned and import/export tested.
- Keep four lives, Resolve, Secrets, Tide, key characters, and nine distinct endings.
- Maintain accessible keyboard and touch navigation.
- A phase is complete only after testing and review; do not inflate progress.

## Scope
Mobile-first web/PWA beta first. APK is optional after beta; not part of the December 4 completion gate.
