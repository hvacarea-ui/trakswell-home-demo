/* Compact, readable rotating information with explicit playback control. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const sections=[...document.querySelectorAll('.site-information')];
 const benefits=sections.filter(d=>!d.querySelector('#sss')).map(d=>{
   const section=d.querySelector('section');
   const description=section.querySelector('p.lead')||[...section.querySelectorAll('p')].find(p=>!p.classList.contains('eyebrow'));
   return {title:d.querySelector('summary').textContent,description:description?.textContent||'Projenize uygun seçenekleri ayrıntılarda inceleyin.',href:section.id?'#'+section.id:null};
 });
 const delivery=document.getElementById('teslim-deneyimi');
 delivery.querySelectorAll('article').forEach(a=>benefits.push({title:a.querySelector('h3').textContent,description:a.querySelector('p').textContent}));
 const questions=[...document.querySelectorAll('#sss details, #teslim-deneyimi details')].map(d=>({title:d.querySelector('summary').textContent,description:d.querySelector('p').textContent}));
 const container=document.createElement('section');container.className='information-strips';container.setAttribute('aria-label','Akıllı ev hakkında bilgiler ve sorular');
 delivery.before(container);delivery.hidden=true;
 function strip(title,items,id,anchor){
   const row=document.createElement('section');row.className='info-strip';row.id=anchor;row.setAttribute('aria-labelledby',id);
   const heading=document.createElement('div');heading.className='strip-heading';
   const h=document.createElement('h2');h.id=id;h.textContent=title;
   const controls=document.createElement('div');controls.className='strip-controls';
   const previous=document.createElement('button'),pause=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');
   for(const b of [previous,pause,next])b.type='button';
   previous.textContent='←';previous.setAttribute('aria-label',title+' · Önceki');next.textContent='→';next.setAttribute('aria-label',title+' · Sonraki');pause.className='strip-pause';count.className='strip-count';
   controls.append(count,previous,pause,next);heading.append(h,controls);
   const cards=document.createElement('div');cards.className='strip-cards';cards.setAttribute('aria-live','off');
   row.append(heading,cards);container.append(row);
   const compact=matchMedia('(max-width:760px)');
   let index=0,paused=reduced.matches,hover=false,focused=false,visible=true,timer=null;
   const size=()=>compact.matches?1:2;
   function render(){cards.replaceChildren();for(let offset=0;offset<Math.min(size(),items.length);offset++){
     const item=items[(index+offset)%items.length],card=document.createElement('article'),label=document.createElement('h3'),p=document.createElement('p');
     label.textContent=item.title;p.textContent=item.description;card.append(label,p);
     if(item.href){const a=document.createElement('a');a.href=item.href;a.textContent='Ayrıntıları oku →';a.addEventListener('click',()=>{paused=true;state();});card.append(a);}
     cards.append(card);
   }count.textContent=(index+1)+' / '+items.length;}
   function schedule(){clearTimeout(timer);timer=null;if(paused||hover||focused||document.hidden||!visible)return;timer=setTimeout(()=>{const rect=row.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight)advance(1);schedule();},8000);}
   function state(){pause.textContent=paused?'Oynat':'Duraklat';pause.setAttribute('aria-label',title+' · '+pause.textContent);schedule();}
   function advance(direction){index=(index+direction+items.length)%items.length;render();}
   previous.addEventListener('click',()=>{paused=true;state();advance(-1);});next.addEventListener('click',()=>{paused=true;state();advance(1);});pause.addEventListener('click',()=>{paused=!paused;state();});
   row.addEventListener('mouseenter',()=>{hover=true;schedule();});row.addEventListener('mouseleave',()=>{hover=false;schedule();});
   row.addEventListener('focusin',()=>{focused=true;schedule();});row.addEventListener('focusout',e=>{focused=row.contains(e.relatedTarget);schedule();});
   document.addEventListener('visibilitychange',schedule);
   if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:0}).observe(row);
   reduced.addEventListener('change',()=>{if(reduced.matches){paused=true;state();}});
   compact.addEventListener('change',()=>{render();schedule();});state();render();
 }
 strip('Evinizde neler değişir?',benefits,'benefit-strip-title','evinizde-neler-degisir');
 strip('Merak ettikleriniz',questions,'question-strip-title','sorular');
 window.dispatchEvent(new Event('site-navigation-ready'));
})();
