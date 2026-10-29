/* Lightweight preview. These examples never trigger the interactive alarm controls. */
(() => {
  const host=document.getElementById('house-3d'),viewer=host?.closest('.plan-wrap');
  if(!host||!viewer)return;
  const wrap=document.createElement('div');wrap.className='home-preview';host.before(wrap);wrap.append(host);
  const aside=document.createElement('aside');aside.className='notification-preview';aside.setAttribute('aria-label','Örnek telefon bildirimleri');
  aside.innerHTML=`<div class="preview-phone">
    <div class="preview-phone-top"><span>09:41</span><span aria-hidden="true">▂▄▆ ▰</span></div>
    <p class="preview-phone-label">EVİNİZDEN HABER VAR</p>
    <h2>Evde olmasanız da<br>haberdar olun.</h2>
    <div class="notification-window"><div class="notification-track">
      <article class="notification-slide"><div class="notification-app"><span class="notification-icon" aria-hidden="true">◉</span> TRAKSWELL HOME <small>şimdi</small></div><strong>Su kaçağı algılandı</strong><p>Banyo sensörü su algıladı. Uyumlu vana varsa suyu kapatma senaryosu devreye girebilir.</p><span class="notification-tag">Su kaçağı uyarısı</span></article>
      <article class="notification-slide"><div class="notification-app"><span class="notification-icon" aria-hidden="true">⌂</span> TRAKSWELL HOME <small>şimdi</small></div><strong>Kapınızda biri var</strong><p>Kapı zili çalıyor. Uyumlu kameranızdan ziyaretçiyi görebilir, görüntüyü telefonunuzda açabilirsiniz.</p><span class="notification-tag">Kapı bildirimi</span></article>
      <article class="notification-slide"><div class="notification-app"><span class="notification-icon" aria-hidden="true">☀</span> TRAKSWELL HOME <small>şimdi</small></div><strong>Eviniz sizi bekliyor</strong><p>Eve dönüş senaryosu çalıştı. Antre ışığı açıldı; salon sıcaklığı seçtiğiniz hedefe ayarlandı.</p><span class="notification-tag">Günlük konfor</span></article>
    </div></div>
    <div class="notification-choices" role="group" aria-label="Bildirim örneğini seçin"><button type="button" data-notification="0" aria-pressed="true">Su</button><button type="button" data-notification="1" aria-pressed="false">Kapı</button><button type="button" data-notification="2" aria-pressed="false">Konfor</button></div>
    <div class="notification-playback"><span id="notification-count">1 / 3</span><button type="button" id="notification-pause" aria-label="Bildirim geçişlerini duraklat">Ⅱ Duraklat</button></div>
    <span class="phone-home-bar" aria-hidden="true"></span>
  </div><p class="notification-demo-note">Örnek bildirimler · Gerçek cihaz bağlantısı yoktur.</p>`;
  wrap.append(aside);
  const track=aside.querySelector('.notification-track'),slides=[...aside.querySelectorAll('.notification-slide')],choices=[...aside.querySelectorAll('[data-notification]')],pause=aside.querySelector('#notification-pause');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let index=0,paused=reduced.matches,inside=false,visible=true,timer;
  function show(value){index=(value+slides.length)%slides.length;track.style.transform=`translateX(-${index*100}%)`;slides.forEach((s,i)=>s.setAttribute('aria-hidden',String(i!==index)));choices.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));aside.querySelector('#notification-count').textContent=(index+1)+' / 3';}
  function schedule(){clearTimeout(timer);if(paused||inside||document.hidden||!visible||viewer.classList.contains('showroom-active')||aside.contains(document.activeElement))return;timer=setTimeout(()=>{show(index+1);schedule();},6500);}
  function updatePause(){pause.textContent=paused?'▶ Sürdür':'Ⅱ Duraklat';pause.setAttribute('aria-label',paused?'Bildirim geçişlerini sürdür':'Bildirim geçişlerini duraklat');schedule();}
  choices.forEach((button,i)=>button.addEventListener('click',()=>{show(i);schedule();}));
  pause.addEventListener('click',()=>{paused=!paused;updatePause();});
  aside.addEventListener('pointerenter',()=>{inside=true;schedule();});aside.addEventListener('pointerleave',()=>{inside=false;schedule();});
  aside.addEventListener('focusin',schedule);aside.addEventListener('focusout',()=>setTimeout(schedule,0));
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',()=>{paused=reduced.matches;updatePause();});
  new MutationObserver(schedule).observe(viewer,{attributes:true,attributeFilter:['class']});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(aside);
  show(0);updatePause();window.dispatchEvent(new Event('resize'));
})();
