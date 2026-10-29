/* Keep third-party playback resources out of the initial page load. */
(()=>{
 const shell=document.getElementById('promo-video-shell'),play=document.getElementById('promo-video-play');
 if(!shell||!play)return;
 play.addEventListener('click',()=>{
  play.disabled=true;
  const frame=document.createElement('iframe');frame.className='promo-video-player';
  frame.width='1280';frame.height='720';frame.title='Trakswell Home — Eviniz, sizin kontrolünüzde | YouTube tanıtım videosu';
  frame.src='https://www.youtube-nocookie.com/embed/4jazB48-N-E?playsinline=1&rel=0&hl=tr&cc_lang_pref=tr&autoplay=1';
  frame.referrerPolicy='strict-origin-when-cross-origin';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;
  shell.replaceWith(frame);frame.focus({preventScroll:true});
 },{once:true});
})();
