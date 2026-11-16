# Ninth Tide — Full Game Architecture v1

## Separation from the temporary alpha
`index.html` currently contains a small standalone prototype. Do not extend its scene dictionary into the final game. Build a separate data-driven runtime under `game/`, and replace the entry point only when a tested vertical slice exists.

## Runtime modules
- `game/schema.mjs`: canonical chapter, scene, choice, evidence, testimony, and ending IDs.
- `game/state.mjs`: versioned player state, immutable transitions, save migration, and deterministic effects.
- `game/story/`: chapter data files and narrative text, keyed by stable scene IDs.
- `game/investigation.mjs`: room hotspots, evidence acquisition, contradiction checks.
- `game/relationships.mjs`: trust, suspicion, loyalty, and route thresholds.
- `game/ui/`: dialogue box, character expression/pose, journal, evidence board, confrontations, chapter select.
- `game/audio/`: narration settings and playback with graceful fallback.
- `game/saves/`: three named slots plus export/import, autosave and versioned migrations.
- `assets/`: original layered backgrounds, sprite expression sheets, UI and audio.

## State contract
```json
{
  "version": 2,
  "chapter": "prologue",
  "scene": "p00_wake",
  "lives": 4,
  "stats": {"resolve": 0, "secrets": 0, "tide": 0},
  "relationships": {"mara": {"trust": 0, "suspicion": 0, "loyalty": 0}},
  "inventory": [],
  "evidence": [],
  "claims": [],
  "flags": {},
  "history": [],
  "ending": null
}
```

## Content schema
Scenes have `id`, `chapter`, `location`, `beats`, `choices`, and optional `investigation` or `confrontation`. Beats reference a speaker, pose/expression, background, dialogue, and optional voice cue. Choices require stable IDs and conditional predicates; effects are data objects validated before applying.

## Test gates
1. Graph: all referenced scene and evidence IDs exist, no unreachable mandatory scene, every ending reachable in at least one test path.
2. State: deterministic choice effects, nonnegative lives, versioned save round-trips, migration coverage.
3. Investigations: every mandatory contradiction has accessible evidence before the confrontation.
4. Content: route continuity, no duplicate character names/IDs, endings have unique resolution scenes.
5. Mobile: 360/390/430px, touch targets, orientation, reduced motion, offline, screen-reader semantics.
6. Performance: assets lazy-loaded, no audio autoplay, dialogue remains interactive during transitions.

## Production rule
The first full-engine vertical slice is Prologue + Chapter 1 with a working inspect / collect / present evidence loop and one substantive consequence. A content skeleton is not a playable 10-hour game.
