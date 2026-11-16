/* Mobile enhancement layer. Safe to load after the main game script. */
(()=>{'use strict';
 const state={installed:false};
 const $=id=>document.getElementById(id);
 function init(){
   if(state.installed)return;state.installed=true;
   // A visible touch target is used instead of invisible overlays so choices remain clickable.
   const theatre=$('theatre'),next=$('btnNext');
   if(theatre&&next){theatre.addEventListener('click',event=>{
     if(event.target.closest('button,a,[role=button],.choice-area,.dialogue'))return;
     if(!next.disabled&&next.offsetParent!==null)next.click();
   });}
   // Do not steal keyboard shortcuts from editable controls or modal dialogs.
   document.addEventListener('keydown',event=>{
     if(event.code!=='Enter'||event.repeat||event.target.closest('input,textarea,select,[contenteditable=true]'))return;
     if($('modalCover')&&!$('modalCover').classList.contains('hidden'))return;
     const choices=$('choices');if(choices&&!choices.classList.contains('hidden'))return;
     if(next&&!next.disabled&&next.offsetParent!==null){event.preventDefault();next.click();}
   });
   // Restore correct viewport after mobile keyboard / orientation changes.
   const viewport=()=>document.documentElement.style.setProperty('--nt-vh',window.innerHeight*.01+'px');
   viewport();window.addEventListener('resize',viewport,{passive:true});
   if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
