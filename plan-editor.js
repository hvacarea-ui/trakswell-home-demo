/* Editable room data is separate from the presentation model. */
window.createHomePlanEditor = function({T,scene,house,camera,canvas,render,fit}) {
  const $=id=>document.getElementById(id), root=new T.Group();scene.add(root);root.visible=false;
  let type='',rooms=[],selected='',history=[],cache={},meshes=[],walls=[],lights=[];
  const clone=x=>JSON.parse(JSON.stringify(x));
  const fields=['name','kind','width','depth','height','x','z','floor'];
  const cleanRooms=data=>data.map(r=>Object.fromEntries(['id',...fields].map(k=>[k,r[k]])));
  const kinds=['salon','yatak','mutfak','antre','hol','banyo','wc','merdiven','balkon','teras'];
  const names={salon:'Salon',yatak:'Yatak odası',mutfak:'Mutfak',antre:'Antre',hol:'Hol',banyo:'Banyo',wc:'WC',merdiven:'Merdiven',balkon:'Balkon',teras:'Teras'};
  const customType=t=>typeof t==='string'&&/^(?:[1-9]|1[0-2])\+[1-3] özel plan$/.test(t);
  function registerType(value){for(const id of ['model-type','konut']){const select=$(id);if(![...select.options].some(o=>o.value===value)){const o=document.createElement('option');o.value=value;o.textContent=value;select.append(o);}}}
  registerType('Özel plan');
  for(const kind of ['hol','wc','merdiven','balkon','teras']){const o=document.createElement('option');o.value=kind;o.textContent=names[kind];$('edit-kind').append(o);}
  const builder=document.createElement('div');builder.className='custom-home-builder';builder.innerHTML='<h3>Kendi ev tipinizi oluşturun</h3><p>Örneğin 5 oda + 2 salon. Mutfak, banyo, WC ve bağlantı holü ayrıca eklenir. Komşu alanların kapıları otomatik açılır; ölçüleri aşağıdan değiştirebilirsiniz.</p><div><label>Oda sayısı<input id="custom-bedrooms" type="number" min="1" max="12" value="5"></label><label>Salon sayısı<input id="custom-living" type="number" min="1" max="3" value="2"></label><label>Balkon sayısı<input id="custom-balconies" type="number" min="0" max="4" value="1"></label></div><button id="custom-create" type="button">Bu sayılarla yeni plan oluştur</button><p id="custom-error" role="status"></p><small>Yeni plan mevcut düzenin yerine geçer. Önce mevcut planı indirebilirsiniz.</small>';
  $('plan-editor').querySelector('summary').after(builder);
  $('model-type').addEventListener('change',()=>{if($('model-type').value==='Özel plan')window.dispatchEvent(new CustomEvent('open-showroom',{detail:'plan'}));});
  $('custom-create').addEventListener('click',()=>{
    const beds=Number($('custom-bedrooms').value),living=Number($('custom-living').value),balconies=Number($('custom-balconies').value);
    if(![beds,living,balconies].every(Number.isInteger)||beds<1||beds>12||living<1||living>3||balconies<0||balconies>4||$('custom-balconies').value===''){$('custom-error').textContent='1–12 oda, 1–3 salon ve 0–4 balkon seçin.';return;}
    const value=beds+'+'+living+' özel plan';registerType(value);$('model-type').value=value;$('model-type').dispatchEvent(new Event('change',{bubbles:true}));record();rooms=customRooms(beds,living,balconies);selected=rooms[0].id;$('edit-enabled').checked=true;setEnabled();$('custom-error').textContent=value+' ve '+balconies+' balkon oluşturuldu.';
  });
  function makeRoom(id,kind,x,z,width,depth,floor=0){return {id,name:names[kind],kind,x,z,width,depth,height:2.6,floor};}
  function customRooms(beds,living,balconies=0){
    const uses=[...Array(living).fill('salon'),...Array(beds).fill('yatak'),'mutfak','banyo','wc'],rows=Math.ceil(uses.length/2),length=rows*4,counts={};
    const result=uses.map((kind,i)=>{const r=makeRoom('custom-'+i,kind,i%2?3:-3,Math.floor(i/2)*4-length/2+2,4,4);r.name=names[kind]+' '+(counts[kind]=(counts[kind]||0)+1);return r;});
    result.push(makeRoom('custom-hall','hol',0,0,2,length));
    for(let i=0;i<balconies;i++){const room=result[i];result.push(makeRoom('custom-balcony-'+i,'balkon',room.x<0?-6:6,room.z,2,3.8));}
    return result;
  }
  const limits={width:[1.5,12],depth:[1.5,40],height:[2,4],x:[-25,25],z:[-25,25],floor:[0,1]};
  $('edit-depth').max='40';
  function defaults(t){
    if(customType(t)){const [beds,living]=t.split(' ')[0].split('+').map(Number);return customRooms(beds,living);}
    if(t==='Dubleks')return [
      makeRoom('salon','salon',-3,-2,4,4),makeRoom('mutfak','mutfak',-3,2,4,4),makeRoom('banyo','banyo',3,-3,4,2),makeRoom('wc','wc',3,-1,4,2),makeRoom('stairs','merdiven',3,2,4,4),makeRoom('hall','hol',0,0,2,8),makeRoom('balcony','balkon',-6,-2,2,4),
      makeRoom('bed-1','yatak',-3,-2,4,4,1),makeRoom('bed-2','yatak',3,-2,4,4,1),makeRoom('upper-hall','hol',0,0,2,8,1),makeRoom('landing','hol',2,2,2,4,1)
    ];
    const beds=({'2+1 daire':2,'3+1 daire':3,'4+1 daire':4,'Villa / müstakil':4})[t]||1;
    const result=customRooms(beds,1,1);
    if(t==='Villa / müstakil'){const balcony=result.find(r=>r.kind==='balkon');balcony.kind='teras';balcony.name='Teras';}
    if(t==='İş yeri'){const room=result.find(r=>r.kind==='yatak');room.name='Çalışma alanı';room.kind='salon';}
    return result;
  }
  function valid(data){return Array.isArray(data)&&data.length>0&&data.length<=24&&data.every(r=>r&&typeof r==='object'&&typeof r.id==='string'&&r.id.length>0&&r.id.length<=80&&typeof r.name==='string'&&r.name.trim().length>0&&r.name.length<=40&&kinds.includes(r.kind)&&Object.entries(limits).every(([k,[a,b]])=>Number.isFinite(r[k])&&r[k]>=a&&r[k]<=b)&&(r.floor===0||r.floor===1))&&new Set(data.map(r=>r.id)).size===data.length;}
  const savedBox=document.createElement('div');savedBox.className='custom-home-builder';savedBox.innerHTML='<label for="saved-plan-picker">Kayıtlı planlarınız</label><select id="saved-plan-picker"></select><p id="saved-plan-status" role="status"></p>';
  builder.before(savedBox);
  savedBox.append($('plan-load'),$('plan-forget'));
  const allowedType=value=>customType(value)||['2+1 daire','3+1 daire','4+1 daire','Dubleks','Villa / müstakil','İş yeri','Özel plan'].includes(value);
  function readStored(value){try{if(!allowedType(value))return null;const raw=localStorage.getItem('trakswell-plan-v1:'+value);if(!raw||raw.length>200000)return null;const data=JSON.parse(raw);return valid(data)?cleanRooms(data):null;}catch{return null;}}
  function refreshSaved(){const picker=$('saved-plan-picker'),previous=picker.value;picker.replaceChildren();let unavailable=false;
    try{for(const key of Object.keys(localStorage).sort()){if(!key.startsWith('trakswell-plan-v1:'))continue;const value=key.slice('trakswell-plan-v1:'.length),data=readStored(value);if(!data)continue;registerType(value);const option=document.createElement('option');option.value=value;option.textContent=value+' · '+data.length+' alan';picker.append(option);}}catch{unavailable=true;}
    if([...picker.options].some(o=>o.value===previous))picker.value=previous;
    picker.disabled=!picker.options.length;$('saved-plan-status').textContent=unavailable?'Tarayıcı kayıt alanına erişilemiyor. Plan dosyanızı içe aktarabilirsiniz.':picker.options.length?'Yüklemek istediğiniz planı seçip “Kaydı yükle” düğmesine basın.':'Henüz geçerli bir kayıtlı plan yok.';
  }
  refreshSaved();
  function record(){history.push(clone(rooms));if(history.length>30)history.shift();}
  function material(c,extra={}){return new T.MeshStandardMaterial({color:c,roughness:.7,...extra});}
  function block(parent,x,y,z,w,h,d,c){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material(c));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function dispose(){root.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of [].concat(o.material)){m.map?.dispose();m.dispose();}}});root.clear();meshes=[];walls=[];lights=[];}
  // Shared-edge doors line up in both adjoining rooms, including hall-to-room doors.
  function openings(r,axis,sign){
    const result=[],edge=(axis==='x'?r.x:r.z)+sign*(axis==='x'?r.width:r.depth)/2;
    for(const other of rooms){
      if(other===r||other.floor!==r.floor)continue;
      if(![r.kind,other.kind].some(kind=>['hol','antre','balkon','teras'].includes(kind)))continue;
      const otherEdge=(axis==='x'?other.x:other.z)-sign*(axis==='x'?other.width:other.depth)/2;
      if(Math.abs(edge-otherEdge)>.04)continue;
      const center=axis==='x'?r.z:r.x,otherCenter=axis==='x'?other.z:other.x,span=axis==='x'?r.depth:r.width,otherSpan=axis==='x'?other.depth:other.width;
      const low=Math.max(center-span/2,otherCenter-otherSpan/2),high=Math.min(center+span/2,otherCenter+otherSpan/2);
      if(high-low>=1.15)result.push({at:(low+high)/2-center,width:Math.min(1.1,high-low-.25)});
    }
    if(!result.length&&['hol','antre'].includes(r.kind)&&axis==='z'&&sign===1&&r.floor===0)result.push({at:0,width:1.1});
    // Upper landing meets the open stairwell, with no wall across the stair exit.
    if(r.id==='landing'&&axis==='x'&&sign===1)result.push({at:-1.4,width:1.1});
    return result.sort((a,b)=>a.at-b.at);
  }
  function rebuild(){
    dispose();
    for(const r of rooms){
      const group=new T.Group();group.position.set(r.x,r.floor*4.2,r.z);group.userData.roomId=r.id;root.add(group);
      const w=r.width,d=r.depth;
      const floor=block(group,0,-.12,0,w,.24,d,r.id===selected?'#b99159':['banyo','wc'].includes(r.kind)?'#bbbfc0':['hol','antre'].includes(r.kind)?'#c3b29b':'#987b5b');meshes.push(floor);
      for(const [x,z,bw,bd,nx,nz] of [[0,-d/2,w,.12,0,-1],[0,d/2,w,.12,0,1],[-w/2,0,.12,d,-1,0],[w/2,0,.12,d,1,0]]){
        const height=['balkon','teras'].includes(r.kind)?1:r.height;
        const axis=nx?'x':'z',span=nx?d:w,gaps=openings(r,axis,nx||nz);
        const part=(from,to,h,cy)=>{if(to-from<.01||h<=0)return;const wall=block(group,nx?x:(from+to)/2,cy,nx?(from+to)/2:z,nx?.12:to-from,h,nx?to-from:.12,'#e0d8cb');walls.push({wall,nx,nz});};
        let start=-span/2;
        for(const gap of gaps){const a=gap.at-gap.width/2,b=gap.at+gap.width/2;part(start,a,height,height/2);part(a,b,height-2.1,2.1+(height-2.1)/2);
          if(height>1){for(const p of [a,b])block(group,nx?x:p,1.05,nx?p:z,nx?.17:.055,2.1,nx?.055:.17,'#f2eadc');block(group,nx?x:gap.at,2.12,nx?gap.at:z,nx?.17:gap.width+.12,.06,nx?gap.width+.12:.17,'#f2eadc');}
          start=b;
        }
        part(start,span/2,height,height/2);
      }
      // Furniture dimensions remain usable in compact rooms.
      const sx=Math.min(1,w/4),sz=Math.min(1,d/4);
      if(r.kind==='yatak'){
        block(group,0,.28,0,1.5*sx,.5,2.4*sz,'#a57b54');block(group,0,.6,0,1.5*sx,.18,2.4*sz,'#e9e1d3');block(group,0,.73,.35*sz,1.5*sx,.1,1.6*sz,'#536878');block(group,0,.8,-.8*sz,1.1*sx,.15,.5*sz,'#fff0da');
      }else if(r.kind==='salon'){
        block(group,-w/2+.55,.45,0,.8,.6,Math.min(2.5,d-.4),'#c9bdad');block(group,-w/2+.2,.9,0,.16,.9,Math.min(2.5,d-.4),'#c9bdad');block(group,.25,.5,0,Math.min(1,w*.3),.15,Math.min(1.5,d*.4),'#a57b54');
      }else if(r.kind==='mutfak'){
        block(group,0,.5,-d/2+.4,w-.3,1,.65,'#a57b54');block(group,0,1.04,-d/2+.4,w-.25,.08,.72,'#eeebe4');
      }else if(r.kind==='banyo'){
        block(group,w/2-.5,.4,0,.8,.65,Math.min(2,d-.3),'#eeebe4');block(group,w/2-.5,.74,0,.6,.03,Math.min(1.7,d-.5),'#79a7b5');
      }else if(r.kind==='wc'){
        block(group,w/2-.25,.6,0,.25,1,.6,'#eeebe4');block(group,w/2-.65,.4,0,.7,.45,.5,'#eeebe4');block(group,-w/2+.35,.85,-d/2+.3,.5,.15,.4,'#eeebe4');
      }else if(r.kind==='merdiven'){
        for(let i=0;i<14;i++){const h=(i+1)*.3;block(group,w/2-.75,h/2,d/2-(i+.5)*d/14,1.25,h,d/14,'#a57b54');}
        block(group,0,4.1,-d/2+.2,w-.2,.2,.4,'#a57b54');
      }else if(['balkon','teras'].includes(r.kind)){block(group,0,.4,0,1,.08,.7,'#a57b54');block(group,0,.2,0,.1,.4,.1,'#24272b');}
      // Circulation spaces intentionally stay clear of furniture.
      block(group,0,r.height-.28,0,.025,.55,.025,'#b29458');
      const bulb=new T.Mesh(new T.SphereGeometry(.14,12,8),material('#fff0ce',{emissive:'#ffc075',emissiveIntensity:1}));bulb.position.set(0,r.height-.6,0);group.add(bulb);
      const light=new T.PointLight('#ffc075',20,Math.max(w,d)*1.5,2);light.position.copy(bulb.position);group.add(light);const puddle=new T.Mesh(new T.CircleGeometry(Math.min(w,d)*.22,24),new T.MeshBasicMaterial({color:'#36bfff',transparent:true,opacity:.6,side:T.DoubleSide}));puddle.rotation.x=-Math.PI/2;puddle.position.set(0,.02,d*.2);puddle.visible=false;group.add(puddle);lights.push({kind:r.kind,bulb,light,puddle});
    }
    cache[type]=clone(rooms);sync();populate();warn();render();
    window.dispatchEvent(new CustomEvent('plan-changed'));
  }
  function populate(){
    $('edit-room').textContent='';for(const r of rooms){const option=document.createElement('option');option.value=r.id;option.textContent=r.name+' · '+(r.width*r.depth).toFixed(1)+' m²';$('edit-room').append(option);}
    if(!rooms.some(r=>r.id===selected))selected=rooms[0].id;
    $('edit-room').value=selected;const r=rooms.find(r=>r.id===selected);for(const f of fields)$('edit-'+f).value=r[f];
    $('plan-undo').disabled=!history.length;$('room-delete').disabled=rooms.length===1;$('room-add').disabled=rooms.length>=24;
    $('editor-status').textContent=rooms.length+' alan · Toplam '+rooms.reduce((s,r)=>s+r.width*r.depth,0).toFixed(1)+' m² · '+r.name+' seçili';
  }
  function warn(){let overlap=false;for(let i=0;i<rooms.length;i++)for(let j=i+1;j<rooms.length;j++){const a=rooms[i],b=rooms[j];if(a.floor===b.floor&&Math.abs(a.x-b.x)<(a.width+b.width)/2-.02&&Math.abs(a.z-b.z)<(a.depth+b.depth)/2-.02)overlap=true;}
    const disconnected=rooms.some(r=>!['balkon','teras'].includes(r.kind)&&!['x','z'].some(axis=>[-1,1].some(sign=>openings(r,axis,sign).length)));
    $('editor-warning').textContent=overlap?'Bazı odalar üst üste geliyor. X/Z konumlarını veya ölçülerini düzenleyin.':disconnected?'Bazı alanların kapı bağlantısı yok. Bir kenarını hol veya komşu odayla birleştirin; kapı boşluğu otomatik açılır.':'';
  }
  function fitPlan(){const bounds=new T.Box3().setFromObject(root);fit(bounds);}
  function setEnabled(){window.dispatchEvent(new CustomEvent('plan-changed'));root.visible=$('edit-enabled').checked;house.visible=!root.visible;$('editor-fields').hidden=!root.visible;if(root.visible){rebuild();fitPlan();}else window.dispatchEvent(new CustomEvent('home-type-change',{detail:type}));render();}
  $('edit-enabled').addEventListener('change',setEnabled);
  $('edit-room').addEventListener('change',()=>{selected=$('edit-room').value;rebuild();});
  for(const f of fields)$('edit-'+f).addEventListener('change',()=>{
    const input=$('edit-'+f),r=rooms.find(r=>r.id===selected);let value=f==='name'?input.value.trim():f==='kind'?input.value:Number(input.value);
    if((limits[f]&&(input.value===''||!Number.isFinite(value)||value<limits[f][0]||value>limits[f][1]))||(f==='floor'&&!Number.isInteger(value))||(f==='kind'&&!kinds.includes(value))||(f==='name'&&(!value||value.length>40))){input.value=r[f];$('editor-warning').textContent='Geçerli bir değer girin; ölçüler belirtilen sınırlar içinde olmalı.';return;}
    record();r[f]=value;rebuild();
  });
  $('room-add').addEventListener('click',()=>{if(rooms.length>=24)return;record();const edge=Math.max(...rooms.map(r=>r.x+r.width/2));const r={id:'room-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),name:'Yeni oda',kind:'yatak',width:3,depth:3,height:2.6,x:Math.min(25,edge+1.5),z:0,floor:0};rooms.push(r);selected=r.id;rebuild();fitPlan();});
  $('room-delete').addEventListener('click',()=>{if(rooms.length<2)return;record();rooms=rooms.filter(r=>r.id!==selected);selected=rooms[0].id;rebuild();});
  $('plan-undo').addEventListener('click',()=>{if(!history.length)return;rooms=history.pop();selected=rooms[0].id;rebuild();fitPlan();});
  $('plan-fit').addEventListener('click',fitPlan);
  $('plan-reset').addEventListener('click',()=>{record();rooms=defaults(type);selected=rooms[0].id;rebuild();fitPlan();});
  function save(){try{localStorage.setItem('trakswell-plan-v1:'+type,JSON.stringify(rooms));refreshSaved();$('saved-plan-picker').value=type;return true;}catch{return false;}}
  $('plan-save').textContent='Tasarımımı kaydet ve teklif iste →';
  $('plan-save').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('save-design-request')));
  $('plan-load').addEventListener('click',()=>{const value=$('saved-plan-picker').value||type,data=readStored(value);if(!data){refreshSaved();$('editor-warning').textContent='Seçilen plan için geçerli kayıt bulunamadı.';return;}registerType(value);if(type!==value){$('model-type').value=value;$('model-type').dispatchEvent(new Event('change',{bubbles:true}));}record();rooms=data;selected=rooms[0].id;$('edit-enabled').checked=true;setEnabled();$('editor-status').textContent=value+' kaydı yüklendi. Düzenlemeye devam edebilirsiniz.';});
  function getExport(){return {format:'trakswell-home-plan',version:1,units:'metres',homeType:type,createdAt:new Date().toISOString(),rooms:clone(rooms)};}
  function download(data=getExport()){
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='trakswell-ev-plani.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('editor-status').textContent='Plan dosyası indirilmeye hazırlandı. E-postanıza bu dosyayı ayrıca ekleyin.';
  }
  $('plan-download').addEventListener('click',()=>download());
  // Bu tarayıcıdaki tüm kayıtlı planları siler; ekrandaki plan değişmez.
  $('plan-forget')?.addEventListener('click',()=>{
    let removed=0;
    try{for(const key of Object.keys(localStorage))if(key.startsWith('trakswell-plan-v1:')){localStorage.removeItem(key);removed++;}}
    catch{$('editor-warning').textContent='Tarayıcı kayıt alanına erişilemedi; kayıt silinemedi.';return;}
    $('editor-warning').textContent='';
    refreshSaved();
    $('editor-status').textContent=removed?'Bu tarayıcıdaki '+removed+' kayıtlı plan silindi. Ekrandaki plan değişmedi.':'Bu tarayıcıda kayıtlı plan yok.';
  });
  $('plan-import').addEventListener('click',()=>$('plan-file').click());
  $('plan-file').addEventListener('change',async()=>{
    const file=$('plan-file').files[0];if(!file)return;
    try{
      if(file.size>200000)throw Error();const data=JSON.parse(await file.text());
      const types=['2+1 daire','3+1 daire','4+1 daire','Dubleks','Villa / müstakil','İş yeri'];
      if(!data||data.format!=='trakswell-home-plan'||data.version!==1||data.units!=='metres'||!(types.includes(data.homeType)||customType(data.homeType)||data.homeType==='Özel plan')||!valid(data.rooms))throw Error();
      // Copy only known data fields. Imported files never execute code.
      const clean=cleanRooms(data.rooms);
      registerType(data.homeType);if(type!==data.homeType){$('model-type').value=data.homeType;$('model-type').dispatchEvent(new Event('change',{bubbles:true}));}
      record();rooms=clean;selected=rooms[0].id;$('edit-enabled').checked=true;setEnabled();$('editor-status').textContent='Plan dosyası açıldı. Düzenlemeye devam edebilirsiniz.';
    }catch{$('editor-warning').textContent='Dosya açılamadı. Geçerli bir Trakswell plan dosyası seçin (en fazla 200 KB).';}
    finally{$('plan-file').value='';}
  });
  function sync(){const wet=(document.querySelector('svg.house').getAttribute('data-water')||'').split(',');for(const {kind,bulb,light,puddle} of lights){const control=({hol:'antre',merdiven:'antre',wc:'banyo',balkon:'salon',teras:'salon'})[kind]||kind;puddle.visible=['banyo','mutfak'].includes(kind)&&wet.includes(kind);const value=Number(document.querySelector('#r-'+control+' .glow')?.style.opacity||0);bulb.material.emissiveIntensity=value*3.5;light.intensity=value*28;}}
  function changeType(value){if(type)cache[type]=clone(rooms);type=value;rooms=clone(cache[type]||(customType(type)?readStored(type):null)||defaults(type));selected=rooms[0].id;history=[];if(root.visible){rebuild();fitPlan();}}
  function pick(event){if(!root.visible)return;const rect=canvas.getBoundingClientRect();const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);const hit=ray.intersectObjects(root.children,true).find(h=>h.object.visible);if(hit){let obj=hit.object;while(obj&&!obj.userData.roomId)obj=obj.parent;if(obj){selected=obj.userData.roomId;rebuild();}}}
  function view(yaw){walls.forEach(({wall,nx,nz})=>wall.visible=nx*Math.sin(yaw)+nz*Math.cos(yaw)<.18);}
  const api={changeType,sync,pick,view,isEnabled:()=>root.visible,getExport,download,save};
  window.TrakswellPlan=api;
  return api;
};
