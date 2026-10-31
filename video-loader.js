/* Keep third-party playback resources out of the initial page load. */
(()=>{
 const shell=document.getElementById('promo-video-shell'),play=document.getElementById('promo-video-play');
 if(!shell||!play)return;
 const original=[...shell.childNodes];let activeFrame=null;
 const dialog=document.createElement('dialog');dialog.className='video-privacy-dialog';dialog.setAttribute('aria-labelledby','video-privacy-title');
 dialog.innerHTML='<h2 id="video-privacy-title">YouTube videosunu etkinleştir</h2><p>Video açıldığında YouTube’a bağlanılır. IP adresiniz, cihaz ve oynatma bilgileriniz Google tarafından işlenebilir; yurt dışındaki sistemlere aktarılabilir.</p><p>Tercih bu açık sayfa içindir. Alt menüdeki “Video tercihini sıfırla” oynatıcıyı kapatır; önceden iletilen verileri geri almaz.</p><a href="privacy.html#cerezler" target="_blank" rel="noopener noreferrer">Veri kullanımı ve hizmetler</a><div><button type="button" data-allow>YouTube’u etkinleştir ve oynat</button><button type="button" data-deny>Şimdi değil</button></div>';
 document.body.append(dialog);
 play.addEventListener('click',()=>dialog.showModal());
 dialog.querySelector('[data-deny]').onclick=()=>dialog.close();
 dialog.querySelector('[data-allow]').onclick=()=>{
  dialog.close();
  const frame=document.createElement('iframe');frame.className='promo-video-player';
  frame.width='1280';frame.height='720';frame.title='Trakswell Home — Eviniz, sizin kontrolünüzde | YouTube tanıtım videosu';
  frame.src='https://www.youtube-nocookie.com/embed/4jazB48-N-E?playsinline=1&rel=0&hl=tr&cc_lang_pref=tr&autoplay=1';
  frame.referrerPolicy='strict-origin-when-cross-origin';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;
  activeFrame=frame;shell.replaceChildren(frame);frame.focus({preventScroll:true});
 };
 document.getElementById('video-privacy-reset')?.addEventListener('click',()=>{if(activeFrame){activeFrame.remove();activeFrame=null;shell.replaceChildren(...original)}dialog.showModal();});
})();
