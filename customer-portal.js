/* Submit only after an explicit action; plans stay in memory until server acknowledgement. */
(()=>{
 const $=id=>document.getElementById(id),result=$('request-result');if(!result)return;
 if(window.TRAKSWELL_PUBLIC_API!==true){
  const intro=$('request-intro');if(intro)intro.firstChild.textContent='Seçimlerinizi ve iletişim bilgilerinizi tek bir özette hazırlayın. Bu önizlemede gönderim kapalıdır. ';
  $('delivery-note').textContent='Bu sürümde gönderim kapalıdır. Form bir özet hazırlar; bilgileriniz bize iletilmez. Metni kopyalayabilir, planı dosya olarak indirebilirsiniz.';
  const privacy=document.querySelector('#veri-bilgisi .wrap>p:not(.eyebrow)');if(privacy)privacy.textContent='Bu sürümde form bilgileri ve ev planı sunucuya gönderilmez. Tasarım bu açık sayfanın belleğinde tutulur. Kaybetmemek için planı JSON olarak indirin. Önceki sürümde cihazınıza kaydedilmiş planlar otomatik silinmez.';
  $('f').addEventListener('submit',()=>{if(!$('f').querySelector('[aria-invalid="true"]'))$('ok').textContent='Özetiniz hazır; gönderim yapılmadı. Bu sürümde talepler bize iletilmez. Metni kopyalayabilir veya planı indirebilirsiniz.';});return;
 }
 document.body.classList.add('portal-connected');
 const controls=document.createElement('div');controls.className='send-actions';
 controls.innerHTML='<p><a href="privacy.html" target="_blank" rel="noopener noreferrer">Teklif talebi aydınlatmasını incele</a></p><label class="portal-consent"><input type="checkbox" id="portal-consent"> Aydınlatma açıklamasını inceledim. Bu seçim pazarlama izni veya açık rıza değildir.</label><button type="button" class="btn btn-lamp" id="portal-send" disabled>Talebimi gönder</button><button type="button" class="btn btn-ghost" id="portal-save-design" disabled>Yalnızca tasarımımı kaydet</button><p id="portal-status" class="form-note" role="status" aria-live="polite"></p>';
 result.append(controls);let previous='',requestKey='',busy=false,completed='';
 let privacy=null;
 const privacyReady=fetch('/api/privacy',{cache:'no-store'}).then(async response=>{
  if(!response.ok)throw Error();privacy=await response.json();
  if(privacy.enabled!==true||typeof privacy.noticeVersion!=='string')throw Error();
  controls.querySelectorAll('button').forEach(b=>b.disabled=false);
  $('portal-status').textContent=privacy.testOnly?'Yalnız yerel test: gerçek müşteri bilgisi girmeyin. İşletme aydınlatması henüz tamamlanmadı.':'Aydınlatmayı ve özeti inceleyerek talebinizi gönderebilirsiniz.';
 }).catch(()=>{privacy=null;const message='Gönderim şu anda kapalı. İşletme bilgileri ve aydınlatma koşulları doğrulanmadan başvuru alınmaz. Tasarımınızı cihazınıza indirebilirsiniz.';$('portal-status').textContent=message;$('delivery-note').textContent=message;const info=document.querySelector('#veri-bilgisi .wrap>p:not(.eyebrow)');if(info)info.textContent=message;controls.querySelectorAll('button').forEach(b=>b.disabled=true);});
 // Consent is part of the prepared summary, not a change to the customer's design/form.
 for(const type of ['input','change'])$('portal-consent').addEventListener(type,event=>event.stopPropagation());
 function capture(kind){const plan=window.TrakswellExperience?.getPlan()||(window.TrakswellPlan?.isEnabled()?window.TrakswellPlan.getExport():null);return {kind,contact:{name:$('ad').value.trim(),phone:$('tel').value.trim(),email:$('eposta').disabled?'':$('eposta').value.trim(),location:$('ilce').value.trim()},homeType:plan?.homeType||$('konut').value,systems:[...document.querySelectorAll('input[name="sy"]:checked')].map(x=>x.value),preference:document.querySelector('input[name="zm"]:checked').value,notes:$('not').value.trim(),summary:[window.TrakswellPreferences?.summary(),window.TrakswellExperience?.summary()].filter(Boolean).join('\n'),noticeAcknowledged:$('portal-consent').checked,noticeVersion:privacy?.noticeVersion,plan};}
 function serialize(data){return JSON.stringify({...data,plan:data.plan?{...data.plan,createdAt:undefined}:null});}
 async function send(kind){
  if(busy)return;
  await privacyReady;if(busy||!privacy)return;
  const data=capture(kind),status=$('portal-status');
  if(!data.noticeAcknowledged){status.textContent='Göndermeden önce aydınlatma metnini inceleyin.';return}
  if(kind==='design'&&!data.plan){status.textContent='Önce ev tasarımınızı hazırlayıp form adımına geçin.';return}
  const serialized=serialize(data);
  if(completed===serialized){status.textContent='Bu kayıt zaten sunucuya iletildi.';return}
  if(previous!==serialized){previous=serialized;requestKey=crypto.randomUUID()}
  busy=true;controls.querySelectorAll('button').forEach(b=>b.disabled=true);status.textContent='Kaydediliyor…';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
  try{
   const response=await fetch('/api/submissions',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':requestKey},body:serialized,signal:controller.signal});
   let value;
   try{value=await response.json()}catch{throw Error('Sunucunun kayıt yanıtı doğrulanamadı. Tasarımınız açık sayfada korunuyor; aynı talebi yeniden deneyebilirsiniz.')}
   if(!response.ok)throw Error(value?.error||'Kayıt tamamlanamadı. Tekrar deneyebilirsiniz.');
   if(typeof value?.id!=='string'||!/^[a-zA-Z0-9-]{1,100}$/.test(value.id))throw Error('Kayıt numarası doğrulanamadı. Aynı talebi yeniden deneyebilirsiniz.');
   completed=serialized;
   const changed=serialize(capture(kind))!==serialized;
   status.textContent=(changed?'Önceki gönderiminiz alındı. Son değişiklikler henüz gönderilmedi; özeti yeniden hazırlayın.':kind==='design'?'Tasarımınız kaydedildi.':'Talebiniz ve varsa ev tasarımınız alındı.')+' Kayıt no: '+value.id;
   $('ok').textContent=status.textContent;
   if(!changed&&data.plan&&$('project-selection'))$('project-selection').textContent='Ev planınız sunucuya kaydedildi. Kayıt no: '+value.id;
  }catch(error){
   status.textContent=controller.signal.aborted?'Sunucudan zamanında yanıt alınamadı. Kayıt durumunu doğrulamak için yeniden deneyin; aynı talep iki kez kaydedilmez. Tasarımınız açık sayfada korunuyor.':error.message;
  }finally{clearTimeout(timer);busy=false;controls.querySelectorAll('button').forEach(b=>b.disabled=false)}
 }
 $('portal-send').onclick=()=>send('inquiry');$('portal-save-design').onclick=()=>send('design');
 $('f').addEventListener('submit',()=>{if(!$('f').querySelector('[aria-invalid="true"]')){$('portal-status').textContent=privacy?'Özeti ve aydınlatmayı kontrol edin. Gönder veya tasarımı kaydet düğmesiyle işlemi tamamlayın.':'Gönderim kapalı. Özetinizi kopyalayabilir veya planı cihazınıza indirebilirsiniz.';$('portal-save-design').hidden=!capture('design').plan;}});
})();
