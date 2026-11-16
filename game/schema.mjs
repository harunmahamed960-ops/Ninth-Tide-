// Full-scale game schema: independent from the temporary index.html alpha.
export const CHAPTERS=Object.freeze([
 ['prologue','The Body on the Shore'],['chapter-1','The Harbour of Lost Names'],
 ['chapter-2','The Masquerade Murder'],['chapter-3','The Library of False Memories'],
 ['chapter-4','The Trial Beneath the Sea'],['chapter-5','The Engine That Eats Tomorrow'],
 ['chapter-6','The Saint and the Sinner'],['chapter-7',"The King's Unspoken Crime"],
 ['chapter-8','Four Lives, One Truth'],['finale','When the Ninth Tide Falls']
].map(([id,title])=>Object.freeze({id,title})));
export const CHARACTERS=Object.freeze([
 ['mara','Mara Veyne'],['elias','Elias Thorne'],['vesper','Vesper Noctis'],
 ['aldren','King Aldren Vael'],['seraphine','Seraphine Vale'],['cassian','Cassian Rook'],
 ['isolde','Isolde Fen'],['lucien','Lucien Ashcroft'],['nerissa','Nerissa Quell'],
 ['oren','Father Oren Bell'],['talia','Talia Wren'],['corvin','Admiral Corvin Dusk']
].map(([id,name])=>Object.freeze({id,name})));
export const ENDINGS=Object.freeze([
 ['tenth-dawn','The Tenth Dawn'],['crown-of-salt','Crown of Salt'],
 ['maras-last-oath',"Mara's Last Oath"],['archivists-truth',"The Archivist's Truth"],
 ['final-masquerade','The Final Masquerade'],['drowned-god','The Drowned God'],
 ['iron-verdict','The Iron Verdict'],['kingdom-forgotten','A Kingdom Forgotten'],
 ['ninth-sacrifice','The Ninth Sacrifice'],['unwritten-sea','The Unwritten Sea']
].map(([id,title])=>Object.freeze({id,title})));
export const EVIDENCE_TYPES=Object.freeze(['document','physical','testimony','medical','mechanical','memory']);
export function validateCatalog(){
 for(const [name,items] of [['chapter',CHAPTERS],['character',CHARACTERS],['ending',ENDINGS]]){
  if(new Set(items.map(x=>x.id)).size!==items.length)throw Error('Duplicate '+name+' ID');
  if(new Set(items.map(x=>x.title??x.name)).size!==items.length)throw Error('Duplicate '+name+' name');
 }
 return true;
}
