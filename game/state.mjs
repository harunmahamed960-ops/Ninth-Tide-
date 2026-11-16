import {CHARACTERS,CHAPTERS,ENDINGS} from './schema.mjs';
export const SAVE_VERSION=2;
const clamp=(n,min=-99,max=99)=>Math.max(min,Math.min(max,n));
export function newGame(){
 return {version:SAVE_VERSION,chapter:CHAPTERS[0].id,scene:'p00_wake',lives:4,
  stats:{resolve:0,secrets:0,tide:0},
  relationships:Object.fromEntries(CHARACTERS.map(c=>[c.id,{trust:0,suspicion:0,loyalty:0}])),
  inventory:[],evidence:[],claims:[],flags:{},history:[],ending:null};
}
export function applyEffects(previous,effects={}){
 const state=structuredClone(previous);
 if(effects.lives!==undefined)state.lives=clamp(state.lives+effects.lives,0,4);
 for(const [key,delta] of Object.entries(effects.stats??{})){
  if(!(key in state.stats)||!Number.isInteger(delta))throw Error('Invalid stat effect: '+key);
  state.stats[key]=clamp(state.stats[key]+delta);
 }
 for(const [character,values] of Object.entries(effects.relationships??{})){
  if(!state.relationships[character])throw Error('Unknown character: '+character);
  for(const [key,delta] of Object.entries(values)){
   if(!(key in state.relationships[character])||!Number.isInteger(delta))throw Error('Invalid relationship effect');
   state.relationships[character][key]=clamp(state.relationships[character][key]+delta);
  }
 }
 for(const id of effects.addEvidence??[])if(!state.evidence.includes(id))state.evidence.push(id);
 for(const id of effects.addClaims??[])if(!state.claims.includes(id))state.claims.push(id);
 for(const [key,value] of Object.entries(effects.flags??{}))state.flags[key]=Boolean(value);
 if(effects.scene)state.scene=effects.scene;
 if(effects.chapter){if(!CHAPTERS.some(c=>c.id===effects.chapter))throw Error('Unknown chapter');state.chapter=effects.chapter;}
 if(effects.ending){if(!ENDINGS.some(e=>e.id===effects.ending))throw Error('Unknown ending');state.ending=effects.ending;}
 return state;
}
export function serializeSave(state){if(state.version!==SAVE_VERSION)throw Error('Unsupported save version');return JSON.stringify(state);}
export function deserializeSave(raw){
 const state=JSON.parse(raw);
 if(state?.version!==SAVE_VERSION||!Number.isInteger(state.lives)||state.lives<0||state.lives>4||!state.relationships||!state.stats||!Array.isArray(state.evidence))throw Error('Invalid or incompatible save');
 return state;
}
