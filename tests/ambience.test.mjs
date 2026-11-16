import test from 'node:test';import assert from 'node:assert/strict';import {ambienceFor} from '../game/ambience.mjs';import {STORY} from '../game/story/vertical-slice.mjs';
test('ambience maps confrontation to ominous',()=>assert.equal(ambienceFor(STORY.c06,'c06'),'ominous'));
test('calmer harbour scene has lighter ambience',()=>assert.equal(ambienceFor(STORY.c01,'c01'),'calm'));
test('tragedy scene has tragic ambience',()=>assert.equal(ambienceFor(STORY.c13,'c13'),'ominous'));
test('other scenes have atmospheric fallback',()=>assert.equal(ambienceFor(STORY.p00,'p00'),'mystery'));
