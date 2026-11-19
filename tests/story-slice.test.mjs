import test from 'node:test';import assert from 'node:assert/strict';
import {STORY,EVIDENCE} from '../game/story/vertical-slice.mjs';
test('all story links and evidence references resolve',()=>{for(const [id,s] of Object.entries(STORY)){for(const dest of [s.next,s.investigation?.next,s.confrontation?.success,s.confrontation?.failure,...(s.choices||[]).map(c=>c.to)].filter(Boolean))assert.ok(STORY[dest],id+' -> '+dest);for(const h of s.investigation?.hotspots||[])assert.ok(EVIDENCE[h.evidence],id+' missing evidence '+h.evidence);for(const e of s.confrontation?.options||[])assert.ok(EVIDENCE[e],id+' missing confrontation evidence '+e);}});
test('all required inspection hotspots exist',()=>{for(const [id,s] of Object.entries(STORY)){if(!s.investigation)continue;const ids=new Set(s.investigation.hotspots.map(h=>h.id));for(const required of s.investigation.required)assert.ok(ids.has(required),id+' missing '+required);}});
test('slice contains authored prologue, chapter one, and confrontations',()=>{const scenes=Object.values(STORY);assert.ok(scenes.filter(s=>s.chapter==='prologue').length>=8);assert.ok(scenes.filter(s=>s.chapter==='chapter-1').length>=12);assert.ok(scenes.some(s=>s.confrontation));assert.ok(scenes.some(s=>s.endOfSlice));});
test('player tone choice and cameo are present',()=>{const options=STORY.p02.choices.map(c=>c.tone);assert.deepEqual(options,['serious','dry','dense']);assert.ok(Object.values(STORY).some(s=>s.speaker==='Harun'));});

test('Chapter 2 starts from the existing Chapter 1 save boundary',()=>{
 assert.equal(STORY.c13.next,'slice_end');
 assert.equal(STORY.slice_end.next,'m01');
 assert.equal(STORY.m01.chapter,'chapter-2');
 assert.equal(STORY.chapter2_end.chapter,'chapter-2');
 assert.equal(STORY.chapter2_end.endOfSlice,true);
});
test('Chapter 2 contains a full investigation and two solvable contradictions',()=>{
 const chapter=Object.entries(STORY).filter(([,s])=>s.chapter==='chapter-2');
 assert.ok(chapter.length>=50,'expected 50+ Chapter 2 scenes');
 const investigations=chapter.filter(([,s])=>s.investigation);
 const confrontations=chapter.filter(([,s])=>s.confrontation);
 assert.ok(investigations.length>=2);
 assert.ok(confrontations.length>=2);
 const guaranteed=new Set();
 for(const [,scene] of chapter){
  if(scene.investigation) for(const h of scene.investigation.hotspots){
   if(scene.investigation.required.includes(h.id))guaranteed.add(h.evidence);
  }
 }
 for(const [id,scene] of confrontations){
  assert.ok(guaranteed.has(scene.confrontation.correct),id+' cannot be solved with mandatory evidence');
  assert.ok(scene.confrontation.options.includes(scene.confrontation.correct),id+' correct choice missing');
  assert.ok(scene.confrontation.successEffects,'Chapter 2 confrontation should define consequences');
 }
});
test('Chapter 2 changes relationships, flags, and stats without adding state fields',()=>{
 const choices=Object.values(STORY).filter(s=>s.chapter==='chapter-2').flatMap(s=>s.choices??[]);
 assert.ok(choices.some(c=>c.effects?.relationships?.mara));
 assert.ok(choices.some(c=>c.effects?.relationships?.cassian));
 assert.ok(choices.some(c=>c.effects?.relationships?.talia));
 assert.ok(choices.some(c=>c.effects?.flags));
 assert.ok(choices.some(c=>c.effects?.stats));
});
