/* A guided showroom and a local-only project shortlist. */
(()=>{
 const $=id=>document.getElementById(id),host=$('house-3d'),viewer=host.closest('.plan-wrap');
 const scenes={donus:{title:'Eve dönüş',detail:'Antre ve salon ışıkları yandı. Isıtma hedefi eve dönüş için değişti.',systems:'Aydınlatma ve iklimlendirme'},film:{title:'Film zamanı',detail:'Salon ışığı %15 seviyesine indi; salon perdesi kapandı.',systems:'Kısılabilir aydınlatma ve uyumlu perde motoru'},cikis:{title:'Evden çıkış',detail:'Işıklar söndü, örnek prizler kapandı ve alarm kuruldu.',systems:'Aydınlatma, uyumlu priz/röle ve güvenlik sensörleri'},sabah:{title:'Günaydın',detail:'Yatak odası %20, mutfak %15 loş aydınlandı; perdeler açıldı.',systems:'Kısılabilir aydınlatma ve perde kontrolü'},su:{title:'Su kaçağı bildirimi',detail:'Mutfak ve banyoda kaçak işaretlendi; örnek vana işlemi ve telefon bildirimi oluştu.',systems:'Su sensörleri, uygun vana kontrolü ve bildirim altyapısı'}};
 let current='donus',guide=-1,applying=false,scope='',savedPlan=null,returnFocus=null,handingOff=false,professional=false,previousDock=null,switchingProfessional=false,observedPlanSignature=null;const favorites=new Set();
 const steps=['sabah','film','cikis','su'];
 const toolbar=document.createElement('div');toolbar.className='showroom-toolbar';toolbar.innerHTML='<div><button type="button" id="showroom-fullscreen" aria-pressed="false">⛶ Tam ekran</button><button type="button" id="tour-start" aria-expanded="false" aria-controls="tour-panel">Bana nasıl çalıştığını göster</button></div><button type="button" id="scene-wish" aria-pressed="false">♡ Eve dönüşü projeme ekle</button><p id="showroom-status" role="status"></p>';
 host.before(toolbar);
 const fullControls=document.createElement('div');fullControls.className='fullscreen-scenes';fullControls.hidden=true;
 Object.entries(scenes).forEach(([key,data])=>{const b=document.createElement('button');b.type='button';b.textContent=data.title;b.dataset.fullScene=key;b.addEventListener('click',()=>choose(key));fullControls.append(b);});toolbar.after(fullControls);
 const guidePanel=document.createElement('div');guidePanel.id='tour-panel';guidePanel.className='tour-panel';guidePanel.hidden=true;guidePanel.innerHTML='<div><span id="tour-count"></span><h3 id="tour-title"></h3><p id="tour-description" role="status"></p></div><div class="tour-actions"><button type="button" id="tour-back">← Önceki</button><button type="button" id="tour-next">Sonraki →</button><button type="button" id="tour-exit">Turu bırak</button></div>';
 host.after(guidePanel);
 const shortlist=document.createElement('div');shortlist.className='scene-shortlist';shortlist.innerHTML='<div><h3>Evimde istediklerim <span id="wish-count">0</span></h3><p>Beğendiğiniz senaryoları ekleyin. Bu liste teklif taslağınıza taşınır; sipariş oluşturmaz.</p></div><ul id="wish-list"></ul><p id="wish-empty">Henüz senaryo seçmediniz. Evi deneyip beğendiğiniz senaryoyu yukarıdaki kalp düğmesiyle ekleyin.</p><a href="#teklif" id="wish-quote">Bu seçimlerle teklif taslağımı hazırla →</a>';
 viewer.append(shortlist);
 const workspace=document.createElement('div');workspace.className='showroom-workspace';const stage=document.createElement('div');stage.className='showroom-stage';
 host.before(workspace);stage.append(host,guidePanel,viewer.querySelector('.view-tools'),$('view-status'));workspace.append(stage,$('advanced-controls'));
 const saveButton=document.createElement('button');saveButton.type='button';saveButton.id='design-request';saveButton.textContent='Tasarımımı kaydet ve teklif iste →';toolbar.append(saveButton);
 const professionalButton=document.createElement('button');professionalButton.type='button';professionalButton.id='professional-design-toggle';professionalButton.textContent='Profesyonel tasarım';professionalButton.setAttribute('aria-pressed','false');professionalButton.setAttribute('aria-controls','plan-editor');saveButton.before(professionalButton);
 professionalButton.disabled=!window.TrakswellPlan;
 function setProfessionalDesign(active){
  const next=Boolean(active);if(next===professional)return;
  if(next)previousDock=viewer.querySelector('.dock-tabs [aria-selected="true"]')?.id||null;
  professional=next;viewer.classList.toggle('professional-mode',professional);professionalButton.setAttribute('aria-pressed',String(professional));professionalButton.textContent=professional?'✓ Profesyonel tasarım':'Profesyonel tasarım';
  switchingProfessional=true;
  try{window.TrakswellPlan?.setProfessional?.(professional);}finally{observedPlanSignature=currentPlanSignature();switchingProfessional=false;}
  if(professional)$('dock-tab-plan').click();else if(previousDock){$(previousDock)?.click();previousDock=null;}
  window.dispatchEvent(new CustomEvent('professional-design-change',{detail:professional}));window.dispatchEvent(new Event('resize'));
 }
 professionalButton.addEventListener('click',()=>setProfessionalDesign(!professional));
 toolbar.prepend(viewer.querySelector('.model-picker'));
 // Tasarım alanındaki h3 başlıkları için bölüm başlığı (ekran okuyucu başlık sırası h1 → h2 → h3).
 const studioHeading=document.createElement('h2');studioHeading.className='visually-hidden';studioHeading.textContent='Ev tasarım alanı';viewer.prepend(studioHeading);
 $('view-panel').textContent='Tam ekranda kumanda ↗';
 function setStudio(active){viewer.classList.toggle('showroom-active',active);$('advanced-controls').hidden=!active;fullControls.hidden=!active;document.body.classList.toggle('studio-open',active);$('showroom-fullscreen').textContent=active?'× Tasarımdan çık':'⛶ Tam ekran · Evi keşfet';$('showroom-fullscreen').setAttribute('aria-pressed',String(active));$('advanced-toggle').setAttribute('aria-expanded',String(active));if(!active){setProfessionalDesign(false);stopTour();viewer.classList.remove('showroom-fallback');if(!handingOff)returnFocus?.focus({preventScroll:true});}window.dispatchEvent(new Event('resize'));}
 async function openStudio(mode){handingOff=false;if(!viewer.classList.contains('showroom-active')){returnFocus=document.activeElement;setStudio(true);try{if(!viewer.requestFullscreen)throw Error();await viewer.requestFullscreen();}catch{viewer.classList.add('showroom-fallback');window.dispatchEvent(new Event('resize'));}}if(mode==='plan'){$('dock-tab-plan').click();if(window.TrakswellPlan&&!$('edit-enabled').checked){$('edit-enabled').checked=true;$('edit-enabled').dispatchEvent(new Event('change'));}}else $('dock-tab-remote').click();$('showroom-fullscreen').focus({preventScroll:true});}
 async function closeStudio(){if(document.fullscreenElement===viewer)await document.exitFullscreen();setStudio(false);}
 window.addEventListener('open-showroom',e=>openStudio(e.detail));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&viewer.classList.contains('showroom-fallback')){e.preventDefault();closeStudio();}if(e.key==='Tab'&&viewer.classList.contains('showroom-active')){const items=[...viewer.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(n=>!n.disabled&&n.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}});
 async function saveDesign(){
  if(handingOff)return;handingOff=true;
  try{savedPlan=window.TrakswellPlan?.getExport()||null;observedPlanSignature=currentPlanSignature();const persisted=savedPlan?window.TrakswellPlan.save():false;invalidate();await closeStudio();$('project-selection').hidden=false;$('project-selection').textContent=(savedPlan?(persisted?'Ev planınız bu tarayıcıya kaydedildi; “Plan düzenle” sekmesindeki “Kayıtlı planları sil” ile kaldırabilirsiniz. ':'Tarayıcı kalıcı kayda izin vermedi; planınız bu açık sayfada korundu. ')+(describeRequestPlan(savedPlan)[0]||savedPlan.homeType)+' planınız, her odanın sensör, otomasyon ve mobilya seçimleriyle teklif taslağına eklendi. ':'Seçtiğiniz senaryolar teklif taslağına eklendi. ')+'İletişim bilgilerinizi doldurarak talep metninizi önizleyin. Form otomatik gönderim yapmaz.';$('teklif').scrollIntoView({behavior:'auto'});$('ad').focus({preventScroll:true});}
  finally{observedPlanSignature=currentPlanSignature();handingOff=false;}
 }
 saveButton.addEventListener('click',saveDesign);window.addEventListener('save-design-request',saveDesign);$('wish-quote').addEventListener('click',e=>{e.preventDefault();saveDesign();});
 function invalidate(){$('request-result').hidden=true;$('ok').hidden=true;refreshFormChoices();}
 // Compare known design fields, ignoring timestamps and import object-key order.
 function planSignature(plan){const config=plan.settings;return JSON.stringify({homeType:plan.homeType,settings:config?{bedrooms:config.bedrooms,living:config.living,area:config.area,floors:config.floors,balcony:config.balcony}:null,rooms:plan.rooms.map(room=>({id:room.id,name:room.name,kind:room.kind,width:room.width,depth:room.depth,height:room.height,x:room.x,z:room.z,floor:room.floor,items:(room.items||[]).map(item=>({id:item.id,type:item.type,x:item.x,z:item.z,rotation:item.rotation}))}))});}
 function currentPlanSignature(){const plan=window.TrakswellPlan?.getExport();return plan?planSignature(plan):null;}
 function isPlanPresentationChange(){return handingOff||switchingProfessional||currentPlanSignature()===observedPlanSignature;}
 function clearOutdatedPlan(){const signature=currentPlanSignature(),changed=observedPlanSignature!==null&&signature!==observedPlanSignature;observedPlanSignature=signature;if(handingOff||switchingProfessional||!savedPlan||!changed)return;if(signature!==planSignature(savedPlan)){savedPlan=null;$('konut').value=window.TrakswellPlan?.getExport().homeType||$('model-type').value;$('project-selection').textContent='Planınız değişti. Güncel tasarımınızı kaydedip teklif adımına devam edin.';invalidate();}}
 observedPlanSignature=currentPlanSignature();
 window.addEventListener('plan-changed',clearOutdatedPlan);
 window.addEventListener('home-type-change',clearOutdatedPlan);
 function renderWish(){
  const data=scenes[current];$('scene-wish').disabled=!data;$('scene-wish').textContent=data?(favorites.has(current)?'✓ '+data.title+' projemde':'♡ '+data.title+' · Evimde istiyorum'):'Bu ayar için hazır senaryo seçin';$('scene-wish').setAttribute('aria-pressed',String(favorites.has(current)));
  $('wish-count').textContent=favorites.size;$('wish-empty').hidden=!!favorites.size;$('wish-list').textContent='';
  for(const key of favorites){const li=document.createElement('li'),text=document.createElement('span'),remove=document.createElement('button');text.textContent=scenes[key].title;remove.type='button';remove.textContent='Kaldır';remove.setAttribute('aria-label',scenes[key].title+' seçimini kaldır');remove.addEventListener('click',()=>{favorites.delete(key);renderWish();invalidate();$('scene-wish').focus();});li.append(text,remove);$('wish-list').append(li);}
  fullControls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.fullScene===current)));
 }
 function stopTour(){guide=-1;guidePanel.hidden=true;$('tour-start').setAttribute('aria-expanded','false');$('tour-start').textContent='Bana nasıl çalıştığını göster';window.dispatchEvent(new CustomEvent('showroom-highlight',{detail:null}));}
 function choose(key){if(guide>=0)stopTour();window.dispatchEvent(new CustomEvent('trakswell-try-scene',{detail:key}));}
 function step(index){guide=index;guidePanel.hidden=false;$('tour-start').setAttribute('aria-expanded','true');$('tour-start').textContent='Rehberli tur açık';$('tour-count').textContent=(index+1)+' / '+steps.length+' · Siz ilerlettikçe değişir';const key=steps[index];$('tour-title').textContent=scenes[key].title;$('tour-description').textContent=scenes[key].detail;$('tour-back').disabled=index===0;$('tour-next').textContent=index===steps.length-1?'Turu tamamla':'Sonraki →';applying=true;window.dispatchEvent(new CustomEvent('trakswell-try-scene',{detail:key}));applying=false;window.dispatchEvent(new CustomEvent('showroom-highlight',{detail:key}));}
 $('tour-start').addEventListener('click',()=>{if(guide>=0){stopTour();return;}step(0);});$('tour-back').addEventListener('click',()=>{if(guide>0)step(guide-1);});$('tour-next').addEventListener('click',()=>{if(guide===steps.length-1){stopTour();$('showroom-status').textContent='Tur tamamlandı. Şimdi serbestçe deneyebilir veya beğendiğiniz senaryoları projenize ekleyebilirsiniz.';$('tour-start').focus();}else if(guide>=0)step(guide+1);});$('tour-exit').addEventListener('click',()=>{stopTour();$('tour-start').focus();});
 $('scene-wish').addEventListener('click',()=>{if(!scenes[current])return;if(favorites.has(current))favorites.delete(current);else favorites.add(current);renderWish();invalidate();$('showroom-status').textContent=scenes[current].title+(favorites.has(current)?' projenize eklendi.':' projenizden kaldırıldı.');});
 window.addEventListener('demo-scene-change',e=>{current=e.detail;if(guide>=0&&!applying)stopTour();renderWish();});
 new MutationObserver(()=>{if(!$('chips').querySelector('[aria-pressed="true"]')){current='';stopTour();renderWish();}}).observe($('chips'),{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 $('showroom-fullscreen').addEventListener('click',()=>viewer.classList.contains('showroom-active')?closeStudio():openStudio());
 document.addEventListener('fullscreenchange',()=>setStudio(document.fullscreenElement===viewer));
 document.querySelectorAll('[data-scope]').forEach(b=>b.addEventListener('click',()=>{scope=scope===b.dataset.scope?'':b.dataset.scope;document.querySelectorAll('[data-scope]').forEach(x=>{const active=x.dataset.scope===scope;x.setAttribute('aria-pressed',String(active));x.textContent=active?'✓ Başlangıç kapsamım':'Bu kapsamı değerlendirelim';});$('scope-status').textContent=scope?'Seçilen başlangıç: '+scope+'. Teklif taslağına eklenecek.':'Bir başlangıç kapsamı seçebilirsiniz. Kesin içerik keşifle belirlenir.';invalidate();}));
 window.TrakswellExperience={getPlan:()=>savedPlan?JSON.parse(JSON.stringify(savedPlan)):null,isPlanPresentationChange,isRestoringPlan:()=>handingOff||switchingProfessional,summary:()=>{const lines=[];if(favorites.size){lines.push('Beğendiğim senaryolar: '+[...favorites].map(k=>scenes[k].title).join(', '));lines.push('Değerlendirilecek altyapı: '+[...new Set([...favorites].map(k=>scenes[k].systems))].join('; '));}if(scope)lines.push('Örnek başlangıç kapsamı: '+scope);return lines.join('\n');}};
 // Read about the service first; make all project choices together above the form.
 const needsSection=document.querySelector('.needs-section');
 $('teklif').before(needsSection,$('kapsamlar'));
 needsSection.id='proje-secimleri';
 // One shared handoff for both selection groups, with a live form summary.
 const continueButton=$('needs-continue');
 const scopeLink=$('kapsamlar')?.querySelector('a[href="#teklif"]');if(scopeLink)scopeLink.replaceWith(continueButton);else console.error('Trakswell: #kapsamlar içindeki teklif bağlantısı bulunamadı; devam düğmesi taşınmadı.');
 continueButton.textContent='Seçimlerimle devam et →';
 const formChoices=document.createElement('section');formChoices.id='form-choices';formChoices.className='full form-choices';formChoices.setAttribute('aria-labelledby','form-choices-title');
 formChoices.innerHTML='<h3 id="form-choices-title" tabindex="-1">Seçimleriniz</h3><p>Kontrol edin, ardından iletişim bilgilerinizi doldurun.</p><ul id="form-choice-list" aria-live="polite"></ul><a href="#proje-secimleri">Seçimlerimi düzenle ↑</a>';
 $('f').prepend(formChoices);
 function refreshFormChoices(){
   const list=$('form-choice-list');if(!list)return;list.replaceChildren();
   const entries=[],priorities=window.TrakswellPreferences?.summary();
   if(priorities)entries.push('Öncelikleriniz: '+priorities);
   if(scope)entries.push('Başlangıç kapsamınız: '+scope);
   if(favorites.size)entries.push('Beğendiğiniz senaryolar: '+[...favorites].map(k=>scenes[k].title).join(', '));
   if(savedPlan)entries.push(...describeRequestPlan(savedPlan).map((line,index)=>(index===0?'Kaydedilen ev planınız: ':'')+line));
   if(!entries.length)entries.push('Henüz seçim yapmadınız. Yukarıdan seçim yapabilir veya ihtiyacınızı aşağıdaki not alanına yazabilirsiniz.');
   for(const entry of entries){const li=document.createElement('li');li.textContent=entry;list.append(li);}
 }
 continueButton.addEventListener('click',()=>{refreshFormChoices();$('form-choices-title').focus({preventScroll:true});});
 new MutationObserver(refreshFormChoices).observe(needsSection,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 refreshFormChoices();
 document.querySelectorAll('.needs-picker .intro-cards article').forEach(card=>{const choice=card.querySelector('[data-need]');if(choice)card.prepend(choice);});
 document.querySelectorAll('.scope-grid article').forEach(card=>{const choice=card.querySelector('[data-scope]');if(choice)card.insertBefore(choice,card.querySelector('p'));});
 $('dock-panel-remote').append(document.querySelector('.experience-controls'),shortlist);
 const disclaimer=document.querySelector('.demo-disclaimer');if(disclaimer)viewer.append(disclaimer);
 const invitation=document.createElement('div');invitation.className='studio-invitation';
 invitation.innerHTML='<strong>Evinizi tasarlamak için tam ekrana geçin.</strong><p>Odaları düzenleyin, kumandayı kullanın ve senaryoları deneyin. Hazır olduğunuzda planınızı kaydedip teklif isteyin.</p>';
 toolbar.before(invitation);
 document.querySelector('.hero .lead').textContent='Evinizin neler yapabileceğini keşfedin. Kendi planınızı ve senaryolarınızı tam ekran tasarım alanında hazırlayın.';
 // A single control group at a time keeps the house visible and the remote legible.
 const remote=document.querySelector('.remote-console');
 const remoteNav=document.createElement('div');remoteNav.className='simple-remote-nav';remoteNav.setAttribute('role','tablist');remoteNav.setAttribute('aria-label','Neyi değiştirmek istersiniz?');
 const remoteBody=document.createElement('div');remoteBody.className='simple-remote-body';
 // Kartlar sıra numarasıyla değil data-remote adıyla seçilir; HTML sırası değişse de doğru başlığa bağlanır.
 const remoteCard=name=>{const node=remote.querySelector('.remote-grid>.remote-card[data-remote="'+name+'"]');if(!node)console.error('Trakswell: data-remote="'+name+'" kumanda kartı bulunamadı.');return node;};
 const groups=[['Işık',remoteCard('light')],['Perde',remoteCard('curtain')],['Sıcaklık',remoteCard('temperature')],['Alarm ve priz',remoteCard('security')],['Ses',remote.querySelector('.audio-options')],['Robot',remote.querySelector('.robot-controls')?.closest('details')],['Kamera',remote.querySelector('.camera-demo')?.closest('details')],['Duvar paneli',remote.querySelector('.wall-panel-ui')]].filter(([,node])=>node);
 const groupButtons=[],groupPanels=[];
 function selectRemote(index,focus=false){groupButtons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;groupPanels[i].hidden=i!==index;});if(focus)groupButtons[index].focus();}
 groups.forEach(([title,node],index)=>{
   const button=document.createElement('button');button.type='button';button.textContent=title;button.id='remote-choice-'+index;button.setAttribute('role','tab');button.setAttribute('aria-controls','remote-content-'+index);
   const panel=document.createElement('div');panel.id='remote-content-'+index;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;
   if(node.tagName==='DETAILS'){node.open=true;node.classList.add('remote-unwrapped');}
   panel.append(node);remoteNav.append(button);remoteBody.append(panel);groupButtons.push(button);groupPanels.push(panel);
   button.addEventListener('click',()=>selectRemote(index));button.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight')next=(index+1)%groups.length;else if(e.key==='ArrowLeft')next=(index+groups.length-1)%groups.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=groups.length-1;else return;e.preventDefault();selectRemote(next,true);});
 });
 remote.querySelector('.remote-grid').remove();remote.querySelector('.remote-title h3').textContent='Neyi değiştirmek istersiniz?';
 remote.querySelector('.remote-title').after(remoteNav,remoteBody);selectRemote(0);
 function showWallControls(){selectRemote(groups.findIndex(([name])=>name==='Duvar paneli'));}
 window.addEventListener('open-wall-panel',showWallControls);$('view-panel').addEventListener('click',showWallControls);
 const wishes=document.createElement('details');wishes.className='compact-wishes';const wishesTitle=document.createElement('summary');wishesTitle.textContent='Seçtiğim senaryoları gör';shortlist.before(wishes);wishes.append(wishesTitle,shortlist);
 setStudio(false);renderWish();
})();

