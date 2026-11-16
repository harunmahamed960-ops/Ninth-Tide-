import {STORY,EVIDENCE} from './story/vertical-slice.mjs';
import {newGame,applyEffects,serializeSave,deserializeSave} from './state.mjs';
const $=id=>document.getElementById(id);
const STORAGE='ninth-tide-full-slice-v2';
let state=newGame();let inspected=new Set();
const portraitIds={Narrator:'narrator',You:'you',Mara:'mara',Cassian:'cassian',Talia:'talia',Harun:'harun'};
const moodFor=(scene)=>{if(['intense','furious','defiant'].includes(scene.expression))return 'intense';if(['tense','guarded','worried'].includes(scene.expression))return 'tense';if(scene.confrontation||scene.speaker==='Mara'&&['p05','c10','c13'].includes(state.scene))return 'tense';return 'neutral';};
const chapterNames={prologue:'PROLOGUE · THE BODY ON THE SHORE','chapter-1':'CHAPTER ONE · HARBOUR OF LOST NAMES'};
function button(label,handler,primary=false,kind=''){const el=document.createElement('button');el.textContent=label;if(primary)el.classList.add('primary');if(kind)el.classList.add(kind);el.addEventListener('click',handler);$('actions').append(el);}
function advance(to,effects={}){state=applyEffects(state,{...effects,scene:to,chapter:STORY[to].chapter});state.history.push(to);inspected=new Set();render();}
function render(){const scene=STORY[state.scene];if(!scene)throw Error('Missing scene '+state.scene);
 $('chapter').textContent=chapterNames[scene.chapter]||'END OF SLICE';$('place').textContent=scene.place;
 $('stage').className='stage '+(scene.bg||'shore');$('speaker').textContent=scene.speaker;
 $('figure').src='./assets/portraits/'+(portraitIds[scene.speaker]||'narrator')+'-'+moodFor(scene)+'.svg';$('figure').alt=scene.speaker+' — '+moodFor(scene)+' expression';$('figure').classList.toggle('hidden',scene.speaker==='Narrator');
 $('dialogue').textContent=scene.text;$('stats').textContent='♥ '+state.lives+'/4 · Resolve '+state.stats.resolve+' · Secrets '+state.stats.secrets+' · Tide '+state.stats.tide;
 $('progress').textContent=state.history.length+' scene transitions';$('actions').replaceChildren();
 if(scene.investigation){for(const hotspot of scene.investigation.hotspots){button((inspected.has(hotspot.id)?'✓ ':'Examine · ')+hotspot.name,()=>inspect(hotspot),false,'inspect-choice');}
  const ready=scene.investigation.required.every(id=>inspected.has(id));if(ready)button('Conclude investigation →',()=>advance(scene.investigation.next),true);
 }else if(scene.confrontation){const owned=scene.confrontation.options.filter(id=>state.evidence.includes(id));for(const id of owned)button('Present evidence · '+EVIDENCE[id].name,()=>present(scene.confrontation,id),false,'evidence-choice');}
 else if(scene.choices){for(const choice of scene.choices){if(choice.requiresEvidence&&!state.evidence.includes(choice.requiresEvidence))continue;button(choice.label,()=>advance(choice.to,choice.effects));}}
 else if(scene.next){button('Continue →',()=>advance(scene.next),true);}
 else if(scene.endOfSlice){button('Restart the story',()=>{state=newGame();inspected=new Set();render();},true);}
}
function inspect(hotspot){if(!inspected.has(hotspot.id)){inspected.add(hotspot.id);state=applyEffects(state,{addEvidence:[hotspot.evidence]});}showModal(hotspot.name,hotspot.description);render();}
function present(confrontation,id){if(id===confrontation.correct){advance(confrontation.success,{relationships:{talia:{trust:1}},flags:{solved_ledger_contradiction:true}});}else{state=applyEffects(state,{relationships:{talia:{suspicion:1}},flags:{wrong_ledger_accusation:true}});advance(confrontation.failure);}}
function showModal(title,description){$('drawerTitle').textContent=title;$('drawerBody').replaceChildren();const p=document.createElement('p');p.textContent=description;$('drawerBody').append(p);$('drawer').classList.remove('hidden');$('closeDrawer').focus();}
function journal(){const wrap=document.createElement('div');for(const id of state.evidence){const e=EVIDENCE[id];if(!e)continue;const item=document.createElement('div');item.className='evidence';const strong=document.createElement('strong');strong.textContent=e.name+' · '+e.type;const p=document.createElement('p');p.className='note';p.textContent=e.description;item.append(strong,p);wrap.append(item);}if(!state.evidence.length){const p=document.createElement('p');p.textContent='No evidence collected yet.';wrap.append(p);}$('drawerTitle').textContent='Evidence Journal';$('drawerBody').replaceChildren(wrap);$('drawer').classList.remove('hidden');$('closeDrawer').focus();}
$('journal').addEventListener('click',journal);
$('closeDrawer').addEventListener('click',()=>$('drawer').classList.add('hidden'));
$('drawer').addEventListener('click',e=>{if(e.target===$('drawer'))$('drawer').classList.add('hidden');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('drawer').classList.add('hidden');});
$('save').addEventListener('click',()=>{try{localStorage.setItem(STORAGE,serializeSave(state));showModal('Saved','Your progress has been saved to this browser.');}catch{showModal('Save unavailable','This browser did not permit local saving.');}});
$('load').addEventListener('click',()=>{try{const raw=localStorage.getItem(STORAGE);if(!raw)throw Error('No saved story found');const loaded=deserializeSave(raw);if(!STORY[loaded.scene])throw Error('Unknown scene');state=loaded;inspected=new Set();render();showModal('Loaded','Story progress restored.');}catch(err){showModal('Load failed',err.message);}});
$('reset').addEventListener('click',()=>{if(confirm('Restart the story? Unsaved progress will be lost.')){state=newGame();inspected=new Set();render();}});
render();
