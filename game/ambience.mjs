// Original synthesized atmosphere. No external audio, samples, or autoplay.
let ctx=null,master=null,voices=[],current=null,enabled=false;
const presets={
calm:{freq:[82.4,123.5,164.8],gain:.036,filter:620,rate:.09},
mystery:{freq:[73.4,110,146.8],gain:.043,filter:450,rate:.12},
ominous:{freq:[55,82.4,110],gain:.053,filter:285,rate:.16},
tragic:{freq:[65.4,98,130.8],gain:.044,filter:365,rate:.075}
};
function ensure(){if(ctx)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ctx=new C();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);for(let i=0;i<3;i++){const osc=ctx.createOscillator(),filter=ctx.createBiquadFilter(),gain=ctx.createGain(),lfo=ctx.createOscillator(),depth=ctx.createGain();osc.type=i===0?'sine':'triangle';filter.type='lowpass';gain.gain.value=0;lfo.type='sine';lfo.frequency.value=.07+i*.03;depth.gain.value=.003;osc.connect(filter);filter.connect(gain);gain.connect(master);lfo.connect(depth);depth.connect(gain.gain);osc.start();lfo.start();voices.push({osc,filter,gain,lfo,depth});}}
function tone(name){if(!presets[name])name='mystery';current=name;if(!ctx)return;const p=presets[name],now=ctx.currentTime;voices.forEach((v,i)=>{v.osc.frequency.setTargetAtTime(p.freq[i],now,1.4);v.filter.frequency.setTargetAtTime(p.filter+(i*95),now,1.2);v.gain.gain.setTargetAtTime(p.gain/(i+1),now,1.5);v.lfo.frequency.setTargetAtTime(p.rate+i*.03,now,1.3);});}
export function ambienceFor(scene,id){if(scene.confrontation||['intense','defiant'].includes(scene.expression)||['p01','p03','c06','c06_fail','c07','c10','c13'].includes(id))return 'ominous';if(['p05','p07','c09','c12'].includes(id))return 'tragic';if(['p08','c01','c02','c11'].includes(id))return 'calm';return 'mystery';}
export function setSceneAmbience(scene,id){tone(ambienceFor(scene,id));}
export async function toggleAmbience(){ensure();if(!ctx)return false;await ctx.resume();enabled=!enabled;master.gain.setTargetAtTime(enabled?1:0,ctx.currentTime,.18);if(enabled&&current)tone(current);return enabled;}
export function isAmbienceEnabled(){return enabled;}
export function stopAmbience(){if(ctx){enabled=false;master.gain.setTargetAtTime(0,ctx.currentTime,.1);}}
