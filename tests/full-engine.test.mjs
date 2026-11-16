import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTERS,CHARACTERS,ENDINGS,validateCatalog} from '../game/schema.mjs';
import {newGame,applyEffects,serializeSave,deserializeSave} from '../game/state.mjs';
test('full-scope catalog has ten chapters, twelve characters, ten endings',()=>{
 assert.equal(CHAPTERS.length,10);assert.equal(CHARACTERS.length,12);assert.equal(ENDINGS.length,10);assert.equal(validateCatalog(),true);
});
test('new game starts with four lives and independent relationship dimensions',()=>{
 const state=newGame();assert.equal(state.lives,4);assert.equal(state.relationships.mara.trust,0);assert.equal(state.relationships.mara.suspicion,0);
});
test('effects are immutable, deterministic, and bounded',()=>{
 const start=newGame();const next=applyEffects(start,{lives:-1,stats:{secrets:2},relationships:{mara:{trust:3,suspicion:1}},addEvidence:['salt-key']});
 assert.equal(start.lives,4);assert.equal(next.lives,3);assert.equal(next.stats.secrets,2);assert.deepEqual(next.evidence,['salt-key']);
 assert.deepEqual(next,applyEffects(start,{lives:-1,stats:{secrets:2},relationships:{mara:{trust:3,suspicion:1}},addEvidence:['salt-key']}));
 assert.equal(applyEffects(start,{lives:-50}).lives,0);
});
test('save round-trip and version rejection',()=>{
 const state=applyEffects(newGame(),{addEvidence:['bell-fragment']});
 assert.deepEqual(deserializeSave(serializeSave(state)),state);
 assert.throws(()=>deserializeSave('{"version":1}'));
});
