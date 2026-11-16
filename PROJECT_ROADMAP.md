# Ninth Tide — Full Visual Novel Production Tracker

**Baseline:** November 16, 2026  
**Target:** December 4, 2026 **beta** (aggressive estimate, not a guarantee)  
**Previous alpha-era estimate:** 26% (retained for historical comparison; **not** full-game completion).  
**Current full-game status:** planning and core architecture started; no credible full-game completion percentage yet.

## Scope
- 10 endings; 12 principal characters; prologue, 8 chapters and finale (10 content sections).
- 10–15 hours of **total unique narrative content**; target 8–10 hours initial route and 4–6 hours alternate material.
- Original high-contrast cel-shaded anime sprites, expressive poses, dramatic dialogue UI.
- Investigations, evidence presentation, contradiction confrontations, irreversible choices, meaningful relationship dimensions.
- Original refined British narration; no voice cloning.
- The old single-file alpha is a temporary proof of concept, not the full game foundation.

## Planned checkpoint schedule
| Dates | Planned gate | Deliverable | Status |
|---|---:|---|---|
| Nov 16–18 | 30% | Story bible, engine architecture, chapter/evidence schema, playable vertical-slice groundwork | In progress |
| Nov 19–22 | 50% | Full visual novel interface, investigation engine, chapter runner | Not started |
| Nov 23–26 | 75% | Authored chapter drafts, character routes, testimony confrontations | Not started |
| Nov 27–30 | 90% | Original artwork, narration/audio, ending content, polish | Not started |
| Dec 1–4 | 100% beta | Integrated playable beta, offline saves, mobile QA and critical bug fixes | Not started |

**Progress accounting:** percentages are target gates, never automatic time-based completion. Report actual implementation, authored content volume, asset coverage, test pass rate and estimated playtime independently. The schedule must be revised if full-length authored content cannot meet quality criteria.

## Work completed
- [x] Private repository, initial PWA shell, compact alpha
- [x] Full-game story bible and ten-ending outline
- [x] Architecture and content schema specification
- [x] Initial immutable state and relationship-effect module
- [x] First automated state/catalog tests

## Next acceptance gate
- [ ] Implement data-driven Prologue and Chapter 1 vertical slice
- [ ] Evidence inspection, collection, and presentation
- [ ] Integrate chapter runner and visual UI (replace alpha after tests)
- [ ] Verify tests in CI and on mobile browsers
- [ ] Measure actual authored word count and playtime

See [Story Bible](docs/STORY_BIBLE.md) and [Engine Specification](docs/ENGINE_SPEC.md).
