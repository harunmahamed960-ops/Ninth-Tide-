import {CHAPTER_TWO,CHAPTER_TWO_EVIDENCE} from './chapter-two.mjs';
// Ninth Tide: authored Prologue, Chapter 1 and Chapter 2.
// Scene text and branching decisions are original. End of slice is not a game ending.
export const STORY={
...CHAPTER_TWO,
p00:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Narrator',expression:'still',text:'The sea has forgotten how to move. It lies beneath the cliffs like black glass, reflecting a castle that should not exist. Somewhere within it, a bell tolls nine times. On the ninth, you open your eyes.',next:'p01'},
p01:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Narrator',text:'Your coat is wet. Your mouth tastes of iron. On the sand beside you lies a body wearing your face. The dead hand clutches a paper sealed with the royal crest.',next:'p02'},
p02:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'You',text:'There is a moment in which the sensible thing would be to scream. You discover that you are considering several alternatives.',choices:[
{id:'solemn',label:'Kneel beside the body.',tone:'serious',to:'p03',effects:{stats:{resolve:1},flags:{protagonist_solemn:true}}},
{id:'dry',label:'“I suppose one of us had a worse morning.”',tone:'dry',to:'p03',effects:{stats:{secrets:1},flags:{protagonist_dry:true}}},
{id:'dense',label:'Check whether the corpse is actually you.',tone:'dense',to:'p03',effects:{flags:{protagonist_dense:true}}}
]},
p03:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Narrator',text:'The corpse is cold. Its left wrist bears a crescent-shaped scar. Yours does too. A thin line of salt runs from its eyes to the mouth, as if the dead have learned to weep seawater.',next:'p04'},
p04:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Narrator',text:'Something shifts beneath the corpse’s coat. You can examine the shore before leaving. A poor investigation is a kind of confession: it tells the truth what you did not care to see.',investigation:{required:['warrant','scar'],hotspots:[
{id:'warrant',name:'Sealed warrant',description:'The document orders the execution of an unnamed traitor at the ninth bell. The signature beneath the order is unmistakably yours.',evidence:'royal_warrant'},
{id:'scar',name:'Crescent scar',description:'The body and your own wrist carry the same old wound. One scar is faded; the other seems freshly healed.',evidence:'matching_scar'},
{id:'bell',name:'Distant bell',description:'Nine bells sound from the castle, but the ninth rings from somewhere behind you.',evidence:'ninth_bell_echo'},
{id:'footprints',name:'Footprints in the sand',description:'Two sets of prints lead from the water. Only one set returns. The tide has not moved enough to erase either.',evidence:'two_sets_of_prints'}
],next:'p05'}},
p05:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Mara',expression:'guarded',text:'“Step away from that body.” A woman in a torn guard’s cloak stands on the path. Her sword is drawn, though her hand trembles. “Last time, you promised not to look.”',next:'p06'},
p06:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'You',text:'The stranger studies your face with the expression of someone watching a grave open.',choices:[
{id:'ask_name',label:'“Who are you? And what do you mean, last time?”',to:'p07',effects:{relationships:{mara:{trust:1}}}},
{id:'show_warrant',label:'Show her the warrant and demand an explanation.',to:'p07',requiresEvidence:'royal_warrant',effects:{relationships:{mara:{suspicion:1}},stats:{secrets:1}}},
{id:'hold_ground',label:'“Put the sword away. Then we talk.”',to:'p07',effects:{relationships:{mara:{loyalty:1}},stats:{resolve:1}}}
]},
p07:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Mara',text:'“Mara Veyne. I was sworn to protect the Crown. Now I protect what it wants buried.” She looks toward the corpse. “You have four lives left. I counted.”',next:'p08'},
p08:{chapter:'prologue',place:'THE SHORE / BEFORE DAWN',bg:'shore',speaker:'Narrator',text:'She offers a gloved hand. Behind her, the castle rises another inch from the sea. Stone groans like an animal dreaming of its own bones.',choices:[
{id:'follow_mara',label:'Take Mara’s hand and follow her.',to:'c01',effects:{relationships:{mara:{trust:1}},flags:{accepted_mara_hand:true}}},
{id:'walk_alone',label:'Refuse the hand, but follow at a distance.',to:'c01',effects:{relationships:{mara:{suspicion:1}},flags:{kept_distance:true}}}
]},
c01:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Narrator',text:'At the harbour, every boat has a name painted over another name. The gulls are silent. A child in a red scarf watches from the roof of a customs office.',next:'c02'},
c02:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Mara',text:'“Nobody enters the castle without a name. The tide takes them at the gate. We need a passage token, and we need to know who signed your death warrant.”',next:'c03'},
c03:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Cassian',expression:'smile',text:'“You need a token?” The man at the fish stall is impeccably dressed for someone selling nothing. “How fortunate. I have exactly one. How unfortunate for your purse.”',choices:[
{id:'deal',label:'Offer to trade information instead of money.',to:'c04',effects:{relationships:{cassian:{trust:1}},stats:{secrets:1}}},
{id:'threat',label:'Ask what the guard would think of his business.',to:'c04',effects:{relationships:{cassian:{suspicion:1}},stats:{resolve:1}}},
{id:'banter',label:'“Do you sell fish, or only disappointment?”',to:'c04',effects:{flags:{joked_with_cassian:true}}}
]},
c04:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Cassian',text:'“That depends on the customer.” He slips a brass disc into his palm. On one side is a crowned gull. On the other, a number that has been scratched out. “Find what the customs office is hiding. Then we can talk.”',next:'c05'},
c05:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Narrator',text:'The customs office smells of damp paper and extinguished candles. A ledger lies open beneath a glass weight. Someone has torn a page from its centre. Examine the room.',investigation:{required:['ledger','seal'],hotspots:[
{id:'ledger',name:'Harbour ledger',description:'The last registered arrival was the ship Mercy’s Wake. Its passenger count was corrected from thirteen to twelve in different ink.',evidence:'altered_ledger'},
{id:'seal',name:'Customs seal',description:'The seal on a locked dispatch bears the same crescent mark as the scar on your wrist.',evidence:'crescent_seal'},
{id:'window',name:'Salt-stained window',description:'The window latch has been forced from inside. A strand of red thread hangs from the splintered wood.',evidence:'red_thread'},
{id:'portrait',name:'Portrait behind the desk',description:'A portrait of the King hangs crooked. Beneath the frame someone has carved: THE DEAD ARE NOT THE MISSING.',evidence:'carved_warning'}
],next:'c06'}},
c06:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Talia',expression:'defiant',text:'“Put that down.” The girl from the rooftop drops through the window. “That ledger belongs to people who were never allowed to leave.” She points at the altered passenger count. “Tell me what you noticed.”',confrontation:{question:'What proves the passenger count was deliberately changed?',correct:'altered_ledger',options:['altered_ledger','royal_warrant','matching_scar','crescent_seal'],success:'c07',failure:'c06_fail'}},
c06_fail:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Talia',text:'“That proves something else. Look at the numbers. Someone changed thirteen to twelve after the ship arrived.” She folds her arms and waits.',next:'c06'},
c07:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Talia',text:'“Good. They removed a passenger without removing the ship.” She turns the ledger toward the light. A second name appears in faded ink beneath the correction: yours.',next:'c08'},
c08:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Narrator',text:'Outside, a street sweeper pauses at the door. He has light-brown skin and dark curls beneath a weathered cap. His badge reads HARUN MAHAMED. He studies the office clock, which has no hands.',next:'c09'},
c09:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Harun',text:'“Funny thing about this place,” he murmurs, adjusting his broom. “They keep cleaning up yesterday, but tomorrow’s the mess.” Then he is gone before anyone can ask what he means.',next:'c10'},
c10:{chapter:'chapter-1',place:'CUSTOMS OFFICE',bg:'office',speaker:'Mara',text:'Mara reads the hidden name. Her expression hardens. “The Crown said you came here alone.” She looks at the page, then at the scar on your wrist. “They lied about the ship.”',choices:[
{id:'trust_talia',label:'Give Talia a copy of the evidence.',to:'c11',effects:{relationships:{talia:{trust:2}},flags:{shared_ledger:true}}},
{id:'protect_evidence',label:'Keep the evidence hidden until you know more.',to:'c11',effects:{relationships:{mara:{trust:1}},flags:{withheld_ledger:true}}},
{id:'confront_cassian',label:'Ask Cassian why the ledger was changed.',to:'c11',effects:{relationships:{cassian:{suspicion:1}},flags:{suspect_cassian:true}}}
]},
c11:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Cassian',text:'Cassian weighs the ledger page without touching it. “Thirteen passengers,” he says softly. “And twelve names. That is not a mistake. That is a method.” He gives you the brass token.',next:'c12'},
c12:{chapter:'chapter-1',place:'HARBOUR OF LOST NAMES',bg:'harbour',speaker:'Narrator',text:'At the gate, the token fits. The castle opens like a wound. Beyond it, music spills from a theatre that has been underwater for a century. Someone is applauding, very slowly.',next:'c13'},
c13:{chapter:'chapter-1',place:'THE CASTLE GATE',bg:'gate',speaker:'Mara',text:'“There’s something I should have told you on the shore.” Her voice catches. “The body you found was not the first one. I buried you three times.”',next:'slice_end'},
slice_end:{chapter:'chapter-1',place:'THE CASTLE GATE',bg:'gate',speaker:'Narrator',text:'The first bell rings. Beyond the doors, a theatre prepares for its final performance. The words Mara has spoken cannot be taken back. The masquerade is about to begin.',next:'m01'}
};
export const EVIDENCE={
...CHAPTER_TWO_EVIDENCE,
royal_warrant:{name:'Royal death warrant',type:'document',description:'Orders an unnamed execution at the ninth bell. Bears your signature.'},
matching_scar:{name:'Matching crescent scars',type:'physical',description:'Your wrist and the corpse bear the same scar.'},
ninth_bell_echo:{name:'Ninth bell echo',type:'memory',description:'The ninth toll came from behind the shore.'},
two_sets_of_prints:{name:'Two sets of footprints',type:'physical',description:'Two sets emerged from the water; only one returned.'},
altered_ledger:{name:'Altered harbour ledger',type:'document',description:'Passenger count changed from thirteen to twelve in different ink.'},
crescent_seal:{name:'Crescent customs seal',type:'document',description:'The dispatch seal matches the mark on your wrist.'},
red_thread:{name:'Red thread',type:'physical',description:'Found on the inside of a forced window latch.'},
carved_warning:{name:'Carved warning',type:'document',description:'THE DEAD ARE NOT THE MISSING.'}
};
