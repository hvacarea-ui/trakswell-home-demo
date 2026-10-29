/* A local, explicit plan helper: interpret, review, then apply one undoable change. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id),editor=$('plan-editor'),viewer=editor?.closest('.plan-wrap');
 const api=window.TrakswellPlan,engine=window.TrakswellDesignAssistant;
 if(!editor||!viewer||!api||!engine)return;
 const toggle=document.createElement('button');toggle.type='button';toggle.id='design-assistant-toggle';toggle.textContent='Tasarım yardımcısı';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','design-assistant');$('professional-design-toggle').after(toggle);
 const panel=document.createElement('section');panel.id='design-assistant';panel.className='design-assistant';panel.hidden=true;panel.setAttribute('aria-labelledby','assistant-title');
 panel.innerHTML=`<div class="assistant-heading"><h3 id="assistant-title">Siz anlatın, birlikte planlayalım.</h3><button type="button" id="assistant-close" aria-label="Tasarım yardımcısını kapat">×</button></div>
 <p>Oda sayısını, alanı, katı ve evinizde istediğiniz cihazları yazın. Önce anladıklarımı göstereceğim; siz uygula dediğinizde tasarım değişecek.</p>
 <label for="assistant-request">Nasıl bir ev istiyorsunuz?</label><textarea id="assistant-request" maxlength="1200" rows="4" placeholder="3+1, 135 m², dubleks. Balkon istemiyorum. Salona motorlu perde, banyoya su kaçağı sensörü ekle."></textarea>
 <div class="assistant-examples" aria-label="Örnek istekler"><button type="button" data-example="3+1, 135 m², dubleks, balkon olsun.">Evimi oluştur</button><button type="button" data-example="Salona motorlu perde, banyoya su kaçağı sensörü ekle.">Konfor ve güvenlik</button><button type="button" data-example="Holde hareket sensörü ve akıllı aydınlatma olsun.">Sensör ve aydınlatma</button></div>
 <label for="assistant-mode">Nasıl ilerleyelim?</label><select id="assistant-mode"><option value="update">Mevcut tasarım üzerinden ilerle</option><option value="new">Yeni bir plan öner</option></select>
 <button type="button" id="assistant-review" class="assistant-primary">İsteğimi değerlendir</button>
 <p id="assistant-status" class="assistant-status" role="status" aria-live="polite"></p>
 <div id="assistant-preview" class="assistant-preview" hidden><h4>Planınıza uygulanacaklar</h4><ul id="assistant-changes"></ul><div id="assistant-warnings" class="assistant-warnings" hidden><strong>Netleştirilecek noktalar</strong><ul></ul></div><button type="button" id="assistant-apply" class="assistant-primary">Bu değişiklikleri uygula</button></div>
 <button type="button" id="assistant-undo" hidden>Yardımcının son değişikliğini geri al</button>
 <p class="assistant-note">Oda, alan, kat, balkon ve cihaz tercihleri desteklenir. Anlaşılmayan istekler ayrıca gösterilir. Cihazların çalışması ve montajı proje aşamasında belirlenir.</p>`;
 editor.querySelector('summary').after(panel);
 let preview=null,parsed=null,mutating=false,canUndo=false;
 const examples=panel.querySelectorAll('[data-example]');
 function list(node,values){node.replaceChildren();for(const value of values){const li=document.createElement('li');li.textContent=value;node.append(li);}}
 function message(text){$('assistant-status').textContent=text;}
 function invalidate(reason=''){
  const hadPreview=!!preview;preview=null;parsed=null;$('assistant-preview').hidden=true;$('assistant-apply').disabled=true;
  if(hadPreview&&reason)message(reason);
 }
 function open(active){panel.hidden=!active;viewer.classList.toggle('assistant-open',active);toggle.setAttribute('aria-expanded',String(active));if(active){$('dock-tab-plan').click();const dock=panel.closest('.dock-panel');if(dock)dock.scrollTop=0;$('assistant-request').focus({preventScroll:true});}else toggle.focus({preventScroll:true});window.dispatchEvent(new Event('resize'));}
 toggle.addEventListener('click',()=>open(panel.hidden));$('assistant-close').addEventListener('click',()=>open(false));
 for(const example of examples)example.addEventListener('click',()=>{$('assistant-request').value=example.dataset.example;invalidate();message('Örneği kendi evinize göre değiştirebilir, ardından değerlendirebilirsiniz.');$('assistant-request').focus();});
 $('assistant-request').addEventListener('input',()=>invalidate('İsteğiniz değişti. Yeniden değerlendirin.'));
 $('assistant-mode').addEventListener('change',()=>invalidate('İlerleme tercihi değişti. Yeniden değerlendirin.'));
 $('assistant-review').addEventListener('click',()=>{
  invalidate();const text=$('assistant-request').value.trim();if(!text){message('Örneğin “3+1, 135 m², dubleks; salona motorlu perde” yazabilirsiniz.');$('assistant-request').focus();return;}
  try{
   const state=api.getState(),plan=api.getExport(),room=plan.rooms.find(item=>item.id===state.selectedRoom);
   parsed=engine.parse(text,{professional:state.professional,selectedRoomKind:room?.kind,settings:plan.settings});
   const warnings=[...(parsed.warnings||[])];
   if(parsed.unmatched?.length)warnings.push(...parsed.unmatched.map(value=>'Uygulanmayan ifade: '+value));
   if(!parsed.hasChanges){message('Uygulayabileceğim net bir plan değişikliği bulamadım. Oda, ölçü veya cihaz adıyla daha açık yazın.');showWarnings(warnings);return;}
   const request={...parsed,mode:$('assistant-mode').value==='new'?'new':parsed.mode||'update'};
   preview=api.previewAssistance(request);
   if(preview.error){message(preview.error);showWarnings([...warnings,...(preview.warnings||[])]);preview=null;return;}
   list($('assistant-changes'),preview.summary||parsed.summary||[]);showWarnings([...warnings,...(preview.warnings||[])]);
   $('assistant-preview').hidden=false;$('assistant-apply').disabled=!!preview.noChanges;
   message(preview.noChanges?'Bu istekler mevcut planınızda zaten karşılanıyor.':'Anladıklarımı aşağıda görebilirsiniz. Kontrol edip uygulayın.');
  }catch(error){preview=null;message('İstek değerlendirilemedi. Daha kısa bir cümleyle tekrar deneyin.');console.error('Tasarım yardımcısı:',error);}
 });
 function showWarnings(values){const unique=[...new Set(values.filter(Boolean))];list($('assistant-warnings').querySelector('ul'),unique);$('assistant-warnings').hidden=!unique.length;if(unique.length)$('assistant-preview').hidden=false;if(!preview){$('assistant-changes').replaceChildren();$('assistant-apply').disabled=true;}}
 $('assistant-apply').addEventListener('click',()=>{
  if(!preview)return;mutating=true;
  try{const result=api.applyAssistance(preview);if(!result.ok){invalidate();message(result.error||'Plan değişti. İsteğinizi yeniden değerlendirin.');return;}preview=null;$('assistant-preview').hidden=true;canUndo=true;$('assistant-undo').hidden=false;message('Tasarımınız güncellendi. 3B görünümde inceleyebilir, geri alabilir veya kaydedip teklif adımına geçebilirsiniz.');$('assistant-request').value='';}
  finally{mutating=false;}
 });
 $('assistant-undo').addEventListener('click',()=>{if(!canUndo)return;mutating=true;try{const result=api.undoAssistance();canUndo=false;$('assistant-undo').hidden=true;invalidate();message(result?.ok===false?result.error:'Yardımcının son değişikliği geri alındı. Önceki tasarımınız geri geldi.');}finally{mutating=false;}});
 function onPlanChange(){if(mutating)return;invalidate('Planınız veya seçili oda değişti. İsteğinizi yeniden değerlendirin.');canUndo=!!api.canUndoAssistance?.();$('assistant-undo').hidden=!canUndo;}
 window.addEventListener('plan-changed',onPlanChange);window.addEventListener('home-type-change',onPlanChange);window.addEventListener('professional-design-change',onPlanChange);
 new MutationObserver(()=>{if(!viewer.classList.contains('showroom-active')&&(!panel.hidden||viewer.classList.contains('assistant-open'))){panel.hidden=true;if(viewer.classList.contains('assistant-open'))viewer.classList.remove('assistant-open');toggle.setAttribute('aria-expanded','false');invalidate();canUndo=false;$('assistant-undo').hidden=true;}}).observe(viewer,{attributes:true,attributeFilter:['class']});
})();
