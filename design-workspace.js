/* Keep the library beside the house on wide screens, inside the editor on phones. */
(()=>{
 'use strict';
 const library=document.getElementById('professional-catalog');
 const viewer=document.querySelector('.plan-wrap'),workspace=document.querySelector('.showroom-workspace');
 if(!library||!viewer||!workspace)return;
 const home=document.createComment('Professional library home');library.before(home);
 const wide=matchMedia('(min-width:1200px)');
 const libraryShortcut=document.createElement('button');libraryShortcut.type='button';libraryShortcut.className='library-shortcut';libraryShortcut.textContent='Nesne kütüphanesini aç ↓';libraryShortcut.hidden=true;document.getElementById('plan-setup').after(libraryShortcut);
 libraryShortcut.addEventListener('click',()=>{const panel=library.closest('.dock-panel');if(panel)panel.scrollTo({top:panel.scrollTop+library.getBoundingClientRect().top-panel.getBoundingClientRect().top,behavior:'auto'});document.getElementById('professional-search').focus({preventScroll:true});});
 function arrange(){
  const side=wide.matches&&viewer.classList.contains('professional-mode')&&viewer.classList.contains('showroom-active');
  if(side){if(library.parentElement!==workspace)workspace.prepend(library);}
  else if(library.previousSibling!==home)home.after(library);
  workspace.classList.toggle('has-design-library',side);
  libraryShortcut.hidden=side||!viewer.classList.contains('professional-mode');
  window.dispatchEvent(new Event('resize'));
 }
 window.addEventListener('professional-design-change',arrange);
 wide.addEventListener('change',arrange);
 arrange();
})();
