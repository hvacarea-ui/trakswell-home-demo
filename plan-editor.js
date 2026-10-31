/* Editable, local-only design data is independent of the presentation model. */
window.createHomePlanEditor = function({T,scene,house,camera,canvas,render,fit,createTransparency}) {
  const $=id=>document.getElementById(id), root=new T.Group(), visibility=createTransparency();
  scene.add(root);root.visible=false;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const names={salon:'Salon',yatak:'Yatak odası',mutfak:'Mutfak',antre:'Antre',hol:'Hol',banyo:'Banyo',wc:'WC',merdiven:'Merdiven',balkon:'Balkon',teras:'Teras'};
  const fields=['name','kind','width','depth','height','x','z','floor'];
  const limits={width:[1.5,20],depth:[1.5,40],height:[2,4],x:[-25,25],z:[-25,25],floor:[0,2]};
  const outdoor=room=>['balkon','teras'].includes(room.kind);
  const floorName=floor=>floor===0?'Zemin kat':floor+'. kat';
  const round=(value,step=.25)=>Math.round(value/step)*step;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const uid=prefix=>prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
  let type='',rooms=[],settings={bedrooms:3,living:1,area:135,floors:1,balcony:true};
  let selected='',selectedItem='',history=[],cache={},walls=[],lights=[],roomGroups=new Map(),itemGroups=new Map();
  let transparent=false,professional=false,professionalRestore=null,professionalDraft=null,mode='orbit',floorFilter='all',gesture=null,applying=false;
  const builtin=[
    ['sensor-motion','Hareket sensörü','Sensör','sensor'],['sensor-water','Su kaçağı sensörü','Sensör','sensor'],
    ['sensor-smoke','Duman sensörü','Sensör','sensor'],['sensor-temperature','Sıcaklık sensörü','Sensör','sensor'],['sensor-door','Kapı/pencere sensörü','Sensör','sensor'],
    ['automation-light','Akıllı aydınlatma','Otomasyon','lamp'],['automation-curtain','Motorlu perde','Otomasyon','curtain'],
    ['automation-climate','İklim kontrolü','Otomasyon','panel'],['automation-socket','Akıllı priz','Otomasyon','panel'],
    ['furniture-sofa','Kanepe','Mobilya','sofa'],['furniture-bed','Yatak','Mobilya','bed'],['furniture-table','Masa','Mobilya','table'],
    ['furniture-wardrobe','Dolap','Mobilya','wardrobe'],['furniture-desk','Çalışma masası','Mobilya','desk']
  ].map(([id,name,category,primitiveType])=>({id,name,category,primitiveType,geometryGroup:category==='Sensör'?'sensor':category==='Otomasyon'?'automation':'furniture',room:'Tüm odalar',description:''}));
  const inventory=Array.isArray(window.TrakswellDesignCatalog)?window.TrakswellDesignCatalog:[];
  const catalog=new Map([...builtin,...inventory].map(item=>[item.id,item]));
  const catalogSearch=new Map(inventory.map(item=>[item.id,[item.name,item.description,item.category,item.room,item.rooms].join(' ').toLocaleLowerCase('tr')])),catalogRows=new Map();
  let catalogFilterSignature='',catalogMatchCount=inventory.length,roomListSignature='',floorOptionCount=-1,itemListSignature='',itemSelectButtons=new Map();
  // Normal plans keep every local light. Large custom plans retain all visible
  // fixtures while bounding the fragment shader's physical light loop.
  const ROOM_LIGHT_LIMIT=24;
  const dimensions={sofa:[2.1,.85],bed:[1.55,2.1],table:[1.1,.8],desk:[1.4,.65],wardrobe:[1.6,.6],chair:[.6,.6],cabinet:[1.2,.55],bathtub:[.8,1.8],toilet:[.5,.7],sink:[.65,.5],fridge:[.7,.7],oven:[.65,.65],tv:[1.4,.2],curtain:[1.6,.15],lamp:[.4,.4],sensor:[.22,.22],panel:[.3,.18],speaker:[.35,.35],camera:[.3,.3],plant:[.6,.6],rug:[1.8,1.3],generic:[.65,.55]};
  const editor=$('plan-editor');
  editor.innerHTML=`<summary>Ev planınızı oluşturun</summary>
    <details id="plan-setup" class="plan-setup" open><summary>1 · Ev ölçüleri</summary><p>Oda sayısı, toplam kapalı alan ve kat sayısını seçin. Hol, ıslak alanlar ve gerekli merdivenler birlikte hazırlanır.</p>
      <div class="plan-setup-grid"><label>Ev düzeni<select id="plan-layout">${[1,2,3,4,5,6].map(n=>'<option value="'+n+'"'+(n===3?' selected':'')+'>'+n+'+1</option>').join('')}</select></label>
      <label>Toplam kapalı alan (m²)<input id="plan-area" type="number" min="45" max="600" step="1" value="135"></label>
      <label>Kat sayısı<select id="plan-floors"><option value="1">1 kat</option><option value="2">2 kat</option><option value="3">3 kat</option></select></label></div>
      <label class="plan-check"><input id="plan-balcony" type="checkbox" checked> Balkon ekle · kapalı alana dahil değil</label>
      <button id="plan-generate" type="button">Evimi oluştur</button><small>Oluşturduğunuz düzeni geri alabilirsiniz. Ölçüler ve nesneler taslak amaçlıdır.</small></details>
    <label class="editor-enable"><input type="checkbox" id="edit-enabled"> Kendi planımı göster</label>
    <div id="editor-fields" hidden>
      <div class="plan-workspace-tools"><div class="plan-mode-buttons professional-only" hidden role="group" aria-label="Modelle etkileşim"><button id="plan-place-mode" type="button" aria-pressed="false">Yerleştir</button><button id="plan-orbit-mode" type="button" aria-pressed="true">Evi döndür</button></div>
      <label>Görünen kat<select id="plan-floor-filter"><option value="all">Tüm katlar</option></select></label><button id="plan-fit" type="button">Ekrana sığdır</button><button id="plan-undo" type="button" disabled>Geri al</button></div>
      <p id="plan-drag-help" class="plan-drag-help">Odaları ve eşyaları yerleştirmek için Profesyonel tasarım'ı açın.</p>
      <div class="plan-room-selection"><label>Seçili oda<select id="edit-room"></select></label><label>Oda türü<select id="edit-kind">${Object.entries(names).map(([value,name])=>'<option value="'+value+'">'+name+'</option>').join('')}</select></label><div class="editor-actions"><button id="room-add" type="button">+ Oda</button><button id="room-delete" type="button">Odayı sil</button></div></div>
      <div class="plan-room-tools professional-only" hidden><h3 id="plan-room-title">Oda seçenekleri</h3><div class="plan-nudge" role="group" aria-label="Seçili oda veya nesneyi taşı"><button type="button" data-move-room="0,-0.5" aria-label="Yarım metre geriye taşı">↑</button><button type="button" data-move-room="-0.5,0" aria-label="Yarım metre sola taşı">←</button><button type="button" data-move-room="0.5,0" aria-label="Yarım metre sağa taşı">→</button><button type="button" data-move-room="0,0.5" aria-label="Yarım metre ileri taşı">↓</button></div>
      <div class="plan-item-add"><label>Tür<select id="plan-item-category"><option>Sensör</option><option>Otomasyon</option><option>Mobilya</option></select></label><label>Seçenek<select id="plan-item-type"></select></label><button id="plan-item-add" type="button">Odaya ekle</button></div>
      <div id="plan-items-list" class="plan-items-list" aria-label="Seçili odanın nesneleri"></div><button id="plan-item-rotate" type="button" disabled>Seçili nesneyi 90° döndür</button><p class="plan-palette-note">Nesneler şematik gösterilir. Gerçek ölçü ve montaj konumu projede belirlenir.</p></div>
      <section id="professional-catalog" class="professional-catalog" hidden aria-label="Profesyonel nesne kütüphanesi"><h3>Nesne kütüphanesi</h3><label>Ara<input id="professional-search" type="search" placeholder="Nesne, cihaz veya özellik"></label><div class="catalog-filters"><label>Kategori<select id="professional-category"><option value="all">Tüm kategoriler</option></select></label><label>Oda<select id="professional-room-filter"><option value="all">Tüm odalar</option></select></label></div><p id="professional-count" role="status"></p><div id="professional-results" class="professional-results"></div><p class="plan-palette-note">Excel envanteri · Ölçü ve görünüşler şematiktir. Yazılım seçenekleri odanın listesine eklenir.</p></section>
      <details class="plan-advanced"><summary>İnce ayar · Oda ölçüleri</summary><div class="editor-grid"><label>Oda adı<input id="edit-name" maxlength="40"></label>
      <label>Genişlik (m)<input id="edit-width" type="number" min="1.5" max="20" step="0.1"></label><label>Derinlik (m)<input id="edit-depth" type="number" min="1.5" max="40" step="0.1"></label><label>Yükseklik (m)<input id="edit-height" type="number" min="2" max="4" step="0.1"></label><label>Yatay konum (m)<input id="edit-x" type="number" min="-25" max="25" step="0.25"></label><label>Dikey konum (m)<input id="edit-z" type="number" min="-25" max="25" step="0.25"></label><label>Kat<select id="edit-floor"><option value="0">Zemin kat</option><option value="1">1. kat</option><option value="2">2. kat</option></select></label></div></details>
      <details class="plan-records"><summary>Kaydet, dosya aç ve indir</summary><label>Kayıtlı plan<select id="saved-plan-picker"></select></label><p id="saved-plan-status" role="status"></p><div class="editor-actions"><button id="plan-load" type="button">Kaydı yükle</button><button id="plan-forget" type="button">Kayıtlı planları sil</button><button id="plan-download" type="button">Planı indir</button><button id="plan-import" type="button">Plan dosyası aç</button><button id="plan-reset" type="button">Başlangıç düzeni</button><input id="plan-file" type="file" accept=".json,application/json" hidden></div></details>
      <button id="plan-save" class="plan-save-primary" type="button">Tasarımımı kaydet ve teklif iste →</button><p id="editor-status" role="status" aria-live="polite"></p><p id="editor-warning" role="status"></p></div>`;
  function option(select,value,label){const node=document.createElement('option');node.value=String(value);node.textContent=label;select.append(node);}
  function registerType(value){for(const id of ['model-type','konut']){const select=$(id);if(select&&![...select.options].some(o=>o.value===value))option(select,value,value);}}
  registerType('Özel plan');
  const customType=value=>typeof value==='string'&&/^(?:[1-9]|1[0-2])\+[1-3] özel plan$/.test(value);
  const allowedType=value=>customType(value)||['2+1 daire','3+1 daire','4+1 daire','Dubleks','Villa / müstakil','İş yeri','Özel plan'].includes(value);
  const areaOf=data=>data.filter(room=>!outdoor(room)).reduce((sum,room)=>sum+room.width*room.depth,0);
  function currentRoom(){return rooms.find(room=>room.id===selected);}
  function currentItem(){return currentRoom()?.items.find(item=>item.id===selectedItem);}
  function snapshot(){return {type,rooms:clone(rooms),settings:clone(settings),selected,selectedItem,floorFilter};}
  function record(state=snapshot()){history.push(state);if(history.length>30)history.shift();}
  function notify(){window.dispatchEvent(new CustomEvent('plan-changed'));}
  function refreshSettings(){settings.balcony=rooms.some(outdoor);settings.floors=Math.max(...rooms.map(room=>room.floor))+1;}
  function itemSize(room,item){const spec=catalog.get(item.type),size=dimensions[spec?.primitiveType]||dimensions.generic,width=size[item.rotation%2?1:0],depth=size[item.rotation%2?0:1],scale=Math.min(1,(room.width-.2)/width,(room.depth-.2)/depth);return {width:width*scale,depth:depth*scale,scale};}
  function containItem(room,item){const size=itemSize(room,item);item.x=clamp(item.x,-Math.max(0,(room.width-size.width)/2-.05),Math.max(0,(room.width-size.width)/2-.05));item.z=clamp(item.z,-Math.max(0,(room.depth-size.depth)/2-.05),Math.max(0,(room.depth-size.depth)/2-.05));}
  function defaultItems(room){const types=room.kind==='salon'?['furniture-sofa','furniture-table']:room.kind==='yatak'?['furniture-bed','furniture-wardrobe']:[];return types.map((value,i)=>{const item={id:uid('item'),type:value,x:i?room.width*.28:-room.width*.18,z:i?-room.depth*.28:0,rotation:0};containItem(room,item);return item;});}
  function makeRoom(id,kind,x,z,width,depth,floor=0){const room={id,name:names[kind],kind,x,z,width,depth,height:2.6,floor,items:[]};room.items=defaultItems(room);return room;}
  function generatePlan(config){
    const uses=Array.from({length:config.floors},()=>[]);uses[0].push(...Array(config.living).fill('salon'),'mutfak','wc');
    for(let i=0;i<config.bedrooms;i++)uses[config.floors===1?0:1+i%(config.floors-1)].push('yatak');
    uses.forEach(list=>{list.push('banyo');if(list.length<2)list.push('hol');});
    const result=[],counts={},weights={salon:1.6,yatak:1,mutfak:1,banyo:.7,wc:.5,hol:.6};
    uses.forEach((list,floor)=>{
      const sides=[[],[]],sums=[0,0];for(const kind of list){const side=sums[0]<=sums[1]?0:1;sides[side].push(kind);sums[side]+=weights[kind];}
      const area=config.area/config.floors,maxRows=Math.max(...sides.map(side=>side.length));
      let width=Math.min(12,Math.max(5.6,Math.sqrt(area*1.15))),depth=area/width;
      if(depth<maxRows*1.55){depth=maxRows*1.55;width=area/depth;}
      if(depth>40){width=Math.min(20,Math.sqrt(area));depth=area/width;}
      const hall=1.5,wing=(width-hall)/2;if(wing<1.5||depth>40)throw Error('Bu oda ve kat sayısı için kapalı alanı artırın.');
      for(let side=0;side<2;side++){let edge=-depth/2;const list=sides[side],remaining=depth-list.length*1.5;
        for(const kind of list){const d=1.5+remaining*weights[kind]/sums[side],room=makeRoom(uid('room'),kind,(side?1:-1)*(hall/2+wing/2),edge+d/2,wing,d,floor);room.name=names[kind]+(['salon','yatak'].includes(kind)?' '+(counts[kind]=(counts[kind]||0)+1):'');result.push(room);edge+=d;}}
      const stair=config.floors>1?Math.max(1.5,Math.min(2.8,depth*.4)):0;
      if(depth-stair<1.5)throw Error('Bu kat sayısı için kapalı alanı artırın.');
      result.push(makeRoom(uid('hall'),'hol',0,-stair/2,hall,depth-stair,floor));
      if(stair){const room=makeRoom(uid('stairs'),'merdiven',0,depth/2-stair/2,hall,stair,floor);room.name=floor===config.floors-1?'Merdiven sahanlığı':'Merdiven';result.push(room);}
      if(config.balcony&&floor===0)result.push(makeRoom(uid('balcony'),'balkon',-width/2-1,0,2,Math.min(3.5,depth),0));
    });return result;
  }
  function defaults(value){let bedrooms=({'2+1 daire':2,'3+1 daire':3,'4+1 daire':4,'Dubleks':3,'Villa / müstakil':4,'İş yeri':2})[value]||3,living=1;if(customType(value))[bedrooms,living]=value.split(' ')[0].split('+').map(Number);const config={bedrooms,living,area:Math.max(135,bedrooms*12+living*20+25),floors:value==='Dubleks'?2:1,balcony:true};return {type:value,settings:config,rooms:generatePlan(config)};}
  function inferSettings(data){return {bedrooms:data.filter(room=>room.kind==='yatak').length,living:data.filter(room=>room.kind==='salon').length,area:areaOf(data),floors:Math.max(...data.map(room=>room.floor))+1,balcony:data.some(outdoor)};}
  function sanitizeRooms(data,legacy=false){
    if(!Array.isArray(data)||!data.length||data.length>48)throw Error('Geçersiz oda listesi.');
    const roomIds=new Set(),itemIds=new Set();let totalItems=0;
    return data.map(raw=>{
      if(!raw||typeof raw!=='object'||typeof raw.id!=='string'||!raw.id||raw.id.length>80||roomIds.has(raw.id)||typeof raw.name!=='string'||!raw.name.trim()||raw.name.length>40||!Object.hasOwn(names,raw.kind)||!Object.entries(limits).every(([key,[min,max]])=>Number.isFinite(raw[key])&&raw[key]>=min&&raw[key]<=max)||!Number.isInteger(raw.floor))throw Error('Geçersiz oda bilgisi.');
      roomIds.add(raw.id);const room=Object.fromEntries(['id',...fields].map(key=>[key,raw[key]]));room.name=room.name.trim();
      const items=raw.items===undefined?[]:raw.items;if(!Array.isArray(items)||items.length>30||(totalItems+=items.length)>400)throw Error('Bir odada en fazla 30, planda toplam 400 nesne olabilir.');
      room.items=items.map(item=>{if(!item||typeof item.id!=='string'||!item.id||item.id.length>80||itemIds.has(item.id)||!catalog.has(item.type)||!Number.isFinite(item.x)||!Number.isFinite(item.z)||Math.abs(item.x)>room.width/2||Math.abs(item.z)>room.depth/2||!Number.isInteger(item.rotation)||item.rotation<0||item.rotation>3)throw Error('Geçersiz nesne bilgisi.');itemIds.add(item.id);const clean={id:item.id,type:item.type,x:item.x,z:item.z,rotation:item.rotation};containItem(room,clean);return clean;});
      if(legacy&&raw.items===undefined)room.items=defaultItems(room);return room;
    });
  }
  function parsePlan(data,legacyType){
    if(Array.isArray(data)&&legacyType)return {type:legacyType,rooms:sanitizeRooms(data,true),settings:inferSettings(data)};
    if(!data||data.format!=='trakswell-home-plan'||![1,2].includes(data.version)||data.units!=='metres'||!allowedType(data.homeType))throw Error('Geçerli bir Trakswell plan dosyası seçin.');
    const clean=sanitizeRooms(data.rooms,data.version===1),inferred=inferSettings(clean);let config=inferred;
    if(data.version===2){const value=data.settings;if(!value||!Number.isInteger(value.bedrooms)||value.bedrooms<0||value.bedrooms>24||!Number.isInteger(value.living)||value.living<0||value.living>12||!Number.isFinite(value.area)||value.area<=0||value.area>30000||!Number.isInteger(value.floors)||value.floors<1||value.floors>3||typeof value.balcony!=='boolean')throw Error('Geçersiz plan ayarları.');config={bedrooms:value.bedrooms,living:value.living,area:value.area,floors:inferred.floors,balcony:inferred.balcony};}
    return {type:data.homeType,rooms:clean,settings:config};
  }
  function readStored(value){try{if(!allowedType(value))return null;const raw=localStorage.getItem('trakswell-plan-v2:'+value)||localStorage.getItem('trakswell-plan-v1:'+value);if(!raw||raw.length>500000)return null;return parsePlan(JSON.parse(raw),value);}catch{return null;}}
  function refreshSaved(){const picker=$('saved-plan-picker'),previous=picker.value;picker.replaceChildren();let unavailable=false;try{const types=new Set(Object.keys(localStorage).filter(key=>/^trakswell-plan-v[12]:/.test(key)).map(key=>key.slice('trakswell-plan-v1:'.length)));for(const value of [...types].sort()){const saved=readStored(value);if(!saved)continue;registerType(value);option(picker,value,value+' · '+saved.settings.area.toFixed(0)+' m² · '+saved.settings.floors+' kat');}}catch{unavailable=true;}if([...picker.options].some(node=>node.value===previous))picker.value=previous;picker.disabled=!picker.options.length;$('saved-plan-status').textContent=unavailable?'Tarayıcı kayıt alanına erişilemiyor. Bir plan dosyası açabilirsiniz.':picker.options.length?'Planınızı bu tarayıcıdan yeniden açabilirsiniz.':'Henüz kayıtlı plan yok.';}
  function material(color,extra={}){return new T.MeshStandardMaterial({color,roughness:.7,...extra});}
  function block(parent,x,y,z,w,h,d,color){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material(color));mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function ball(parent,x,y,z,r,color){const mesh=new T.Mesh(new T.SphereGeometry(r,12,8),material(color));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  function dispose(){visibility.clear();root.traverse(object=>{object.geometry?.dispose();if(object.material)for(const value of [].concat(object.material)){value.map?.dispose();value.dispose();}});root.clear();walls=[];lights=[];roomGroups.clear();itemGroups.clear();}
  function openings(room,axis,sign){const result=[],edge=(axis==='x'?room.x:room.z)+sign*(axis==='x'?room.width:room.depth)/2;for(const other of rooms){if(other===room||other.floor!==room.floor)continue;const otherEdge=(axis==='x'?other.x:other.z)-sign*(axis==='x'?other.width:other.depth)/2;if(Math.abs(edge-otherEdge)>.06)continue;if(![room.kind,other.kind].some(kind=>['hol','antre','merdiven','balkon','teras'].includes(kind)))continue;const center=axis==='x'?room.z:room.x,otherCenter=axis==='x'?other.z:other.x,span=axis==='x'?room.depth:room.width,otherSpan=axis==='x'?other.depth:other.width,low=Math.max(center-span/2,otherCenter-otherSpan/2),high=Math.min(center+span/2,otherCenter+otherSpan/2);if(high-low>=1.05)result.push({at:(low+high)/2-center,width:Math.min(1.1,high-low-.2)});}if(!result.length&&['hol','antre'].includes(room.kind)&&axis==='z'&&sign===-1&&room.floor===0)result.push({at:0,width:1.1});return result.sort((a,b)=>a.at-b.at);}
  function buildItem(parent,room,item){
    const spec=catalog.get(item.type);if(!spec||spec.geometryGroup==='software'||spec.physical===false)return;
    const group=new T.Group();group.userData.itemId=item.id;group.userData.roomId=room.id;group.position.set(item.x,0,item.z);group.rotation.y=item.rotation*Math.PI/2;
    group.scale.setScalar(itemSize(room,item).scale);parent.add(group);itemGroups.set(item.id,group);
    const primitive=spec.primitiveType,baseColor=spec.geometryGroup==='sensor'?'#77cdd4':spec.geometryGroup==='automation'?'#81a9d4':'#a8896c',color=item.id===selectedItem?'#e5b95f':baseColor;
    group.userData.baseTint=baseColor;group.userData.tintMaterials=[];
    const tinted=(mesh,c)=>{if(c===color)group.userData.tintMaterials.push(mesh.material);return mesh;};
    const b=(x,y,z,w,h,d,c=color)=>tinted(block(group,x,y,z,w,h,d,c),c),sphere=(x,y,z,r,c=color)=>tinted(ball(group,x,y,z,r,c),c);
    const legs=(w,d,h)=>{for(const x of [-w/2+.08,w/2-.08])for(const z of [-d/2+.08,d/2-.08])b(x,h/2,z,.08,h,.08,'#4b4843');};
    switch(primitive){
      case 'sofa':b(0,.35,0,2.1,.5,.85);b(0,.75,-.35,2.1,.65,.15);for(const x of [-.98,.98])b(x,.6,0,.15,.35,.85);break;
      case 'bed':b(0,.25,0,1.55,.45,2.1);b(0,.54,0,1.5,.16,2.05,'#efe6d8');b(0,.66,.35,1.52,.08,1.3,'#586f84');b(0,.7,-.7,1.1,.16,.45,'#fff1dc');break;
      case 'table':case 'desk':{const [w,d]=dimensions[primitive];b(0,.75,0,w,.1,d);legs(w,d,.7);break;}
      case 'wardrobe':b(0,1,0,1.6,2,.6);b(0,1,.315,.025,1.8,.035,'#e3d5bf');break;
      case 'chair':b(0,.45,0,.6,.12,.6);b(0,.78,-.24,.6,.65,.12);legs(.6,.6,.4);break;
      case 'cabinet':b(0,.45,0,1.2,.9,.55);break;
      case 'bathtub':b(0,.35,0,.8,.6,1.8,'#eeeae1');b(0,.67,0,.6,.04,1.5,'#81b0be');break;
      case 'toilet':b(0,.45,-.22,.5,.8,.25,'#eeeae1');b(0,.3,.1,.5,.45,.5,'#eeeae1');break;
      case 'sink':b(0,.75,0,.65,.12,.5,'#eeeae1');b(0,.35,0,.2,.7,.2);break;
      case 'fridge':b(0,1,0,.7,2,.7,'#c0c5c8');b(.22,1,.365,.04,.5,.05);break;
      case 'oven':b(0,.45,0,.65,.9,.65,'#aaaeb2');b(0,.45,.335,.5,.5,.035,'#303b44');break;
      case 'tv':b(0,1,0,1.4,.85,.14,'#243849');b(0,.5,0,.15,.2,.14);b(0,.4,0,.6,.05,.2);break;
      case 'curtain':b(0,1.25,0,1.6,2.3,.08,'#d4c5a9');b(0,2.45,0,1.7,.06,.1);break;
      case 'lamp':b(0,.7,0,.05,1.4,.05,'#b29458');sphere(0,1.5,0,.2,'#f8db9a');break;
      case 'sensor':{const y=/water|su|kaçak/i.test(spec.id+' '+spec.name)?.12:1.8;b(0,y,0,.22,.16,.18,'#f3efdf');sphere(0,y,.105,.035,color);break;}
      case 'panel':b(0,1.3,0,.3,.4,.08,'#eee9dc');b(0,1.3,.045,.25,.32,.02,color);break;
      case 'speaker':b(0,.3,0,.3,.6,.3,'#303d46');break;
      case 'camera':b(0,2,0,.26,.2,.3,'#eee9dc');sphere(0,2,.16,.07,'#263947');break;
      case 'plant':b(0,.22,0,.4,.4,.4,'#baa082');sphere(0,.72,0,.3,'#70885c');break;
      case 'rug':b(0,.025,0,1.8,.04,1.3,color);break;
      default:b(0,.32,0,.65,.6,.55);break;
    }
  }
  function rebuild(){
    dispose();
    for(const room of rooms){
      const group=new T.Group();group.position.set(room.x,room.floor*4.2,room.z);group.userData.roomId=room.id;group.userData.roomFloor=room.floor;group.visible=floorFilter==='all'||room.floor===Number(floorFilter);root.add(group);roomGroups.set(room.id,group);
      const w=room.width,d=room.depth,floorColor=['banyo','wc'].includes(room.kind)?'#b9bfc1':['hol','antre','merdiven'].includes(room.kind)?'#c4b79f':'#9a7e5f',ground=block(group,0,-.12,0,w,.24,d,room.id===selected?'#bb965f':floorColor);ground.userData.pickFloor=true;group.userData.floorMaterial=ground.material;group.userData.floorColor=floorColor;
      for(const [x,z,nx,nz] of [[0,-d/2,0,-1],[0,d/2,0,1],[-w/2,0,-1,0],[w/2,0,1,0]]){
        const height=outdoor(room)?1:room.height,span=nx?d:w,gaps=openings(room,nx?'x':'z',nx||nz);
        const part=(from,to,h,cy)=>{if(to-from<.01||h<=0)return;const wall=block(group,nx?x:(from+to)/2,cy,nx?(from+to)/2:z,nx?.12:to-from,h,nx?to-from:.12,'#e1d9cc');walls.push({wall,nx,nz});visibility.add(wall,.12);};let start=-span/2;
        for(const gap of gaps){const a=gap.at-gap.width/2,b=gap.at+gap.width/2;part(start,a,height,height/2);part(a,b,height-2.1,2.1+(height-2.1)/2);if(height>1){for(const p of [a,b])visibility.add(block(group,nx?x:p,1.05,nx?p:z,nx?.17:.055,2.1,nx?.055:.17,'#f2eadc'),.12);visibility.add(block(group,nx?x:gap.at,2.12,nx?gap.at:z,nx?.17:gap.width+.12,.06,nx?gap.width+.12:.17,'#f2eadc'),.12);}start=b;}part(start,span/2,height,height/2);
      }
      if(room.kind==='mutfak'){block(group,0,.5,-d/2+.4,w-.3,1,.65,'#a57b54');block(group,0,1.04,-d/2+.4,w-.25,.08,.72,'#eeebe4');}
      if(room.kind==='banyo'){block(group,w/2-.5,.4,0,.8,.65,Math.min(2,d-.3),'#eeebe4');block(group,w/2-.5,.74,0,.6,.03,Math.min(1.7,d-.5),'#79a7b5');}
      if(room.kind==='wc'){block(group,w/2-.25,.6,0,.25,1,.6,'#eeebe4');block(group,w/2-.65,.4,0,.7,.45,.5,'#eeebe4');}
      if(room.kind==='merdiven'&&room.floor<settings.floors-1){for(let i=0;i<14;i++){const h=(i+1)*.3;block(group,0,h/2,-d/2+(i+.5)*d/14,Math.min(1.2,w-.15),h,d/14,'#a57b54');}}
      for(const item of room.items)buildItem(group,room,item);
      if(!outdoor(room)){block(group,0,room.height-.28,0,.025,.55,.025,'#b29458');const bulbMaterial=material('#fff0ce',{emissive:'#ffc075',emissiveIntensity:1}),bulb=new T.Mesh(new T.SphereGeometry(.14,12,8),bulbMaterial);bulb.position.set(0,room.height-.6,0);group.add(bulb);const light=new T.PointLight('#ffc075',20,Math.max(w,d)*1.5,2);light.position.copy(bulb.position);group.add(light);const puddle=new T.Mesh(new T.CircleGeometry(Math.min(w,d)*.22,24),new T.MeshBasicMaterial({color:'#36bfff',transparent:true,opacity:.6,side:T.DoubleSide,depthWrite:false}));puddle.rotation.x=-Math.PI/2;puddle.position.set(0,.02,d*.2);puddle.visible=false;group.add(puddle);lights.push({kind:room.kind,room,group,bulbMaterial,light,puddle});}
      if(room.floor>0)visibility.add(group,.08);
    }
    visibility.setEnabled(transparent);updateLightBudget();sync();populate();warn();cache[type]=snapshot();render();notify();
  }
  function updateLightBudget(){const focus=currentRoom(),eligible=lights.filter(entry=>entry.group.visible);if(eligible.length>ROOM_LIGHT_LIMIT&&focus)eligible.sort((a,b)=>{const score=entry=>entry.room.id===focus.id?-1:(entry.room.x-focus.x)**2+(entry.room.z-focus.z)**2+(entry.room.floor-focus.floor)**2*100;return score(a)-score(b);});const active=new Set(eligible.slice(0,ROOM_LIGHT_LIMIT));for(const entry of lights)entry.light.visible=active.has(entry);}
  function updateCatalogHeading(){if(professional&&!$('professional-catalog').hidden&&root.visible)$('professional-count').textContent=catalogMatchCount+' seçenek · '+(currentRoom()?.name||'Bir oda seçin');}
  function refreshSelection(dataChanged=false){
    for(const [id,group] of roomGroups){group.visible=floorFilter==='all'||group.userData.roomFloor===Number(floorFilter);group.userData.floorMaterial.color.set(id===selected?'#bb965f':group.userData.floorColor);}
    for(const [id,group] of itemGroups)for(const value of group.userData.tintMaterials)value.color.set(id===selectedItem?'#e5b95f':group.userData.baseTint);
    updateLightBudget();visibility.refresh();populate();if(dataChanged)cache[type]=snapshot();else if(cache[type])Object.assign(cache[type],{selected,selectedItem,floorFilter});render();notify();
  }
  function setupFields(){if(![...$('plan-layout').options].some(node=>Number(node.value)===settings.bedrooms))option($('plan-layout'),settings.bedrooms,settings.bedrooms+'+'+settings.living);$('plan-layout').value=settings.bedrooms;$('plan-area').value=Number(settings.area.toFixed(1));$('plan-floors').value=settings.floors;$('plan-balcony').checked=settings.balcony;}
  function populate(){
    if(!rooms.some(room=>room.id===selected))selected=rooms[0]?.id||'';const room=currentRoom();if(!room)return;
    const roomSignature=JSON.stringify(rooms.map(item=>[item.id,item.name,item.floor,item.width,item.depth]));if(roomSignature!==roomListSignature){roomListSignature=roomSignature;$('edit-room').replaceChildren();for(const item of rooms)option($('edit-room'),item.id,item.name+' · '+floorName(item.floor)+' · '+(item.width*item.depth).toFixed(1)+' m²');}$('edit-room').value=selected;
    for(const field of fields)$('edit-'+field).value=room[field];
    if(floorOptionCount!==settings.floors){floorOptionCount=settings.floors;$('plan-floor-filter').replaceChildren();option($('plan-floor-filter'),'all','Tüm katlar');for(let floor=0;floor<settings.floors;floor++)option($('plan-floor-filter'),floor,floorName(floor));}$('plan-floor-filter').value=floorFilter;
    $('plan-room-title').textContent=room.name+' · Nesneler';$('plan-undo').disabled=!history.length;$('room-delete').disabled=rooms.length===1;$('room-add').disabled=rooms.length>=48;
    if(!room.items.some(item=>item.id===selectedItem))selectedItem='';$('plan-item-rotate').disabled=!selectedItem||!itemGroups.has(selectedItem);editor.querySelectorAll('[data-move-room]').forEach(button=>button.disabled=Boolean(selectedItem&&!itemGroups.has(selectedItem)));
    const list=$('plan-items-list'),itemSignature=JSON.stringify([room.id,room.items.map(item=>[item.id,item.type])]);
    if(itemSignature!==itemListSignature){itemListSignature=itemSignature;list.replaceChildren();itemSelectButtons=new Map();
      if(!room.items.length){const empty=document.createElement('p');empty.textContent='Bu odada henüz seçilmiş nesne yok.';list.append(empty);}
      for(const item of room.items){const row=document.createElement('div');row.className='plan-item-row';const select=document.createElement('button');select.type='button';select.textContent=catalog.get(item.type)?.name||item.type;select.addEventListener('click',()=>{selectedItem=item.id;refreshSelection();});itemSelectButtons.set(item.id,select);const remove=document.createElement('button');remove.type='button';remove.className='plan-item-remove';remove.textContent='×';remove.setAttribute('aria-label',select.textContent+' kaldır');const roomId=room.id;remove.addEventListener('click',()=>{const target=rooms.find(value=>value.id===roomId);if(!target)return;record();target.items=target.items.filter(value=>value.id!==item.id);if(selectedItem===item.id)selectedItem='';rebuild();});row.append(select,remove);list.append(row);}
    }
    for(const [id,button] of itemSelectButtons)button.setAttribute('aria-pressed',String(id===selectedItem));
    $('editor-status').textContent=rooms.length+' alan · '+areaOf(rooms).toFixed(1)+' m² kapalı alan · '+room.name+' seçili'+(selectedItem?' · '+catalog.get(currentItem()?.type)?.name:'');
    updateCatalogHeading();
    editor.dataset.selectedRoom=selected;editor.dataset.selectedItem=selectedItem;editor.dataset.mode=mode;editor.dataset.floor=floorFilter;editor.dataset.roomCount=String(rooms.length);editor.dataset.professional=String(professional);
  }
  function overlapping(room,x=room.x,z=room.z){return rooms.some(other=>other!==room&&other.floor===room.floor&&Math.abs(x-other.x)<(room.width+other.width)/2-.03&&Math.abs(z-other.z)<(room.depth+other.depth)/2-.03);}
  function warn(){const overlap=rooms.some(room=>overlapping(room));const disconnected=rooms.some(room=>!outdoor(room)&&!['x','z'].some(axis=>[-1,1].some(sign=>openings(room,axis,sign).length)));$('editor-warning').textContent=overlap?'Bazı alanlar üst üste geliyor. Odaları boş bir yere taşıyın.':disconnected?'Bir alanın hol bağlantısı kesildi. Odayı holün kenarına yaklaştırın; kapı otomatik açılır.':'';}
  function fitPlan(){const bounds=new T.Box3();for(const group of root.children)if(group.visible)bounds.expandByObject(group);if(!bounds.isEmpty())fit(bounds);}
  // The source viewer still updates when hidden, but its type echo must not reset editor history.
  function setEnabled(){cancelDrag();root.visible=$('edit-enabled').checked;house.visible=!root.visible;$('editor-fields').hidden=!root.visible;if(root.visible){if(!rooms.length){const initial=defaults(type||$('model-type').value);rooms=initial.rooms;settings=initial.settings;type=initial.type;selected=rooms[0].id;}rebuild();fitPlan();if(professional)refreshCatalog();}else{cache[type]=snapshot();const wasApplying=applying;applying=true;try{window.dispatchEvent(new CustomEvent('home-type-change',{detail:type}));}finally{applying=wasApplying;}}notify();render();}
  function updateType(value){registerType(value);if($('model-type').value!==value){applying=true;try{$('model-type').value=value;$('model-type').dispatchEvent(new Event('change',{bubbles:true}));}finally{applying=false;}}type=value;}
  function restore(state){cancelDrag();updateType(state.type);rooms=clone(state.rooms);settings=clone(state.settings);selected=state.selected||rooms[0].id;selectedItem=state.selectedItem||'';floorFilter=state.floorFilter||'all';setupFields();rebuild();if(root.visible)fitPlan();}
  function changeType(value){if(applying)return;cancelDrag();if(type&&rooms.length)cache[type]=snapshot();const next=cache[value]||readStored(value)||defaults(value);type=value;rooms=clone(next.rooms);settings=clone(next.settings);selected=next.selected||rooms[0].id;selectedItem='';floorFilter='all';history=[];setupFields();if(root.visible){rebuild();fitPlan();}}
  function setMode(value){cancelDrag();mode=value==='place'&&professional?'place':'orbit';$('plan-place-mode').setAttribute('aria-pressed',String(mode==='place'));$('plan-orbit-mode').setAttribute('aria-pressed',String(mode==='orbit'));$('plan-drag-help').textContent=!professional?'Odaları ve eşyaları yerleştirmek için Profesyonel tasarım’ı açın.':mode==='place'?'Odanın zeminini tutup taşıyın. Bir nesneyi tutup odanın içinde yerleştirin. Boş alanda sürükleyerek evi döndürebilirsiniz. İki parmakla yakınlaşın.':'Modeli sürükleyerek evi döndürün. Yerleştirmek için “Yerleştir”i seçin.';editor.dataset.mode=mode;}
  function setProfessional(value){const next=Boolean(value);if(next===professional)return;cancelDrag();if(next)professionalRestore={enabled:root.visible,mode,state:snapshot(),history:clone(history)};else professionalDraft={state:snapshot(),history:clone(history)};professional=next;editor.querySelectorAll('.professional-only').forEach(node=>node.hidden=!next);$('professional-catalog').hidden=!next;editor.dataset.professional=String(next);if(next){if(professionalDraft){history=clone(professionalDraft.history);restore(professionalDraft.state);}$('edit-enabled').checked=true;setEnabled();setMode('place');refreshCatalog();}else{history=clone(professionalRestore?.history||[]);if(professionalRestore?.state.rooms.length)restore(professionalRestore.state);setMode(professionalRestore?.mode||'orbit');$('edit-enabled').checked=professionalRestore?.enabled||false;setEnabled();professionalRestore=null;}}
  function sync(){const wet=(document.querySelector('svg.house').getAttribute('data-water')||'').split(',');for(const {kind,bulbMaterial,light,puddle} of lights){const control=({hol:'antre',merdiven:'antre',wc:'banyo',balkon:'salon',teras:'salon'})[kind]||kind;puddle.visible=['banyo','mutfak'].includes(kind)&&wet.includes(kind);const value=Number(document.querySelector('#r-'+control+' .glow')?.style.opacity||0);bulbMaterial.emissiveIntensity=value*3.5;light.intensity=value*28;}visibility.refresh();}
  function view(yaw){walls.forEach(({wall,nx,nz})=>wall.visible=transparent||nx*Math.sin(yaw)+nz*Math.cos(yaw)<.18);visibility.refresh();}
  function setTransparent(value){transparent=Boolean(value);visibility.setEnabled(transparent);render();}
  const ray=new T.Raycaster(),dragPlane=new T.Plane(new T.Vector3(0,1,0),0);
  function updateRay(event){const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return false;camera.updateMatrixWorld();root.updateMatrixWorld(true);ray.setFromCamera(new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);return true;}
  function isVisible(object){for(let node=object;node;node=node.parent)if(!node.visible)return false;return true;}
  function hitAt(event){if(!root.visible||!updateRay(event))return null;for(const hit of ray.intersectObjects(root.children,true)){if(!isVisible(hit.object))continue;let node=hit.object,itemId='',roomId='';while(node&&node!==root){itemId||=node.userData.itemId||'';roomId||=node.userData.roomId||'';node=node.parent;}if(roomId&&(hit.object.userData.pickFloor||itemId))return {roomId,itemId};}return null;}
  function selectHit(hit){if(selected===hit.roomId&&selectedItem===(hit.itemId||''))return;selected=hit.roomId;selectedItem=hit.itemId||'';refreshSelection();}
  function pick(event){if(gesture)return;const hit=hitAt(event);if(hit)selectHit(hit);}
  function beginDrag(event){if(!professional||mode!=='place'||!root.visible)return false;const hit=hitAt(event);if(!hit)return false;selectHit(hit);const room=currentRoom(),item=currentItem();dragPlane.constant=-room.floor*4.2;const point=ray.ray.intersectPlane(dragPlane,new T.Vector3());if(!point)return false;gesture={roomId:room.id,itemId:item?.id||'',point:point.clone(),startX:item?item.x:room.x,startZ:item?item.z:room.z,state:snapshot(),changed:false};canvas.style.cursor='grabbing';return true;}
  function snappedRoom(room,x,z){x=round(x);z=round(z);for(const other of rooms){if(other===room||other.floor!==room.floor)continue;const edgesX=[other.x-(other.width+room.width)/2,other.x+(other.width+room.width)/2],edgesZ=[other.z-(other.depth+room.depth)/2,other.z+(other.depth+room.depth)/2];if(Math.abs(z-other.z)<(room.depth+other.depth)/2+.3)for(const edge of edgesX)if(Math.abs(x-edge)<.3)x=edge;if(Math.abs(x-other.x)<(room.width+other.width)/2+.3)for(const edge of edgesZ)if(Math.abs(z-edge)<.3)z=edge;if(Math.abs(x-other.x)<.2)x=other.x;if(Math.abs(z-other.z)<.2)z=other.z;}return {x:clamp(x,-25,25),z:clamp(z,-25,25)};}
  function drag(event){if(!gesture||!updateRay(event))return;const point=ray.ray.intersectPlane(dragPlane,new T.Vector3());if(!point)return;const room=rooms.find(value=>value.id===gesture.roomId),item=room?.items.find(value=>value.id===gesture.itemId);if(!room)return;let x=gesture.startX+point.x-gesture.point.x,z=gesture.startZ+point.z-gesture.point.z;if(item){item.x=round(x,.1);item.z=round(z,.1);containItem(room,item);itemGroups.get(item.id)?.position.set(item.x,0,item.z);gesture.changed=item.x!==gesture.startX||item.z!==gesture.startZ;}else{({x,z}=snappedRoom(room,x,z));room.x=x;room.z=z;roomGroups.get(room.id)?.position.set(x,room.floor*4.2,z);gesture.changed=x!==gesture.startX||z!==gesture.startZ;}$('editor-status').textContent=(item?catalog.get(item.type).name:room.name)+' yerleştiriliyor';render();}
  function endDrag(cancel=false){if(!gesture)return;const active=gesture;gesture=null;canvas.style.cursor='grab';const room=rooms.find(value=>value.id===active.roomId),item=room?.items.find(value=>value.id===active.itemId);const blocked=!active.itemId&&room&&overlapping(room);if(cancel||blocked){if(item){item.x=active.startX;item.z=active.startZ;itemGroups.get(item.id)?.position.set(item.x,0,item.z);}else if(room){room.x=active.startX;room.z=active.startZ;roomGroups.get(room.id)?.position.set(room.x,room.floor*4.2,room.z);}refreshSelection();if(blocked&&!cancel)$('editor-warning').textContent='Bu alan dolu. Oda eski yerine döndü; boş bir yere taşıyın.';return;}if(active.changed){record(active.state);if(item)refreshSelection(true);else rebuild();}else populate();}
  function cancelDrag(){endDrag(true);}
  function addItem(typeId){if(!professional||!catalog.has(typeId))return;const room=currentRoom();if(!room)return;if(room.items.length>=30||rooms.reduce((sum,value)=>sum+value.items.length,0)>=400){$('editor-warning').textContent='Bir odada en fazla 30, planda toplam 400 nesne olabilir.';return;}record();const n=room.items.length,item={id:uid('item'),type:typeId,x:((n%3)-1)*.6,z:(Math.floor(n/3)%3-1)*.6,rotation:0};containItem(room,item);room.items.push(item);selectedItem=item.id;rebuild();}
  function fillPalette(){const select=$('plan-item-type');select.replaceChildren();for(const item of builtin.filter(item=>item.category===$('plan-item-category').value))option(select,item.id,item.name);}
  function catalogRow(item){if(catalogRows.has(item.id))return catalogRows.get(item.id);const row=document.createElement('article');row.className='catalog-item';const title=document.createElement('strong');title.textContent=item.name;const meta=document.createElement('small');meta.textContent=[item.category,item.room].filter(Boolean).join(' · ');const description=document.createElement('p');description.textContent=item.description||'Odanıza ekleyip yerini seçin.';const add=document.createElement('button');add.type='button';add.dataset.catalogId=item.id;add.textContent='Odaya ekle';add.addEventListener('click',()=>addItem(item.id));row.append(title,meta,description,add);catalogRows.set(item.id,row);return row;}
  function refreshCatalog(){
    if(!professional||!root.visible||$('professional-catalog').hidden)return;
    const query=$('professional-search').value.trim().toLocaleLowerCase('tr'),category=$('professional-category').value,room=$('professional-room-filter').value,signature=JSON.stringify([query,category,room]);
    if(signature===catalogFilterSignature){updateCatalogHeading();return;}
    catalogFilterSignature=signature;const matches=inventory.filter(item=>(category==='all'||item.category===category)&&(room==='all'||item.room===room)&&(!query||catalogSearch.get(item.id).includes(query)));
    catalogMatchCount=matches.length;const host=$('professional-results');host.replaceChildren(...matches.map(catalogRow));updateCatalogHeading();
    if(!matches.length){const empty=document.createElement('p');empty.textContent=inventory.length?'Aramanıza uygun seçenek bulunamadı.':'Envanter yüklenemedi. Üstteki temel seçenekleri kullanabilirsiniz.';host.append(empty);}
  }
  function moveSelection(dx,dz){if(!professional)return;const room=currentRoom(),item=currentItem();if(!room||(item&&!itemGroups.has(item.id)))return;const state=snapshot();if(item){item.x+=dx;item.z+=dz;containItem(room,item);itemGroups.get(item.id).position.set(item.x,0,item.z);}else{const next=snappedRoom(room,room.x+dx,room.z+dz);if(overlapping(room,next.x,next.z)){$('editor-warning').textContent='Bu alan dolu. Farklı bir yönde taşıyın.';return;}Object.assign(room,next);}record(state);if(item)refreshSelection(true);else rebuild();}
  function getExport(){return {format:'trakswell-home-plan',version:2,units:'metres',homeType:type,createdAt:new Date().toISOString(),settings:clone(settings),rooms:clone(rooms)};}
  function save(){try{localStorage.setItem('trakswell-plan-v2:'+type,JSON.stringify(getExport()));refreshSaved();$('saved-plan-picker').value=type;return true;}catch{return false;}}
  function load(value=$('saved-plan-picker').value||type){const data=readStored(value);if(!data){refreshSaved();$('editor-warning').textContent='Bu seçim için geçerli kayıt bulunamadı.';return false;}record();restore(data);$('edit-enabled').checked=true;setEnabled();$('editor-status').textContent='Kayıtlı planınız açıldı.';return true;}
  function download(data=getExport()){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='trakswell-ev-plani.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('editor-status').textContent='Plan dosyanız indirildi.';}
  function describe(data=getExport()){const planRooms=Array.isArray(data.rooms)?data.rooms:[],config=data.settings||inferSettings(planRooms),total=areaOf(planRooms);const lines=[data.homeType+' · Hedef '+Number(config.area||total).toFixed(0)+' m² · '+config.floors+' kat · '+(planRooms.some(outdoor)?'Balkon/teras var':'Balkon yok'),planRooms.length+' alan · '+total.toFixed(1)+' m² kapalı alan (balkon/teras hariç)'];for(const room of planRooms){const groups=new Map();for(const item of room.items||[]){const spec=catalog.get(item.type);if(!spec)continue;const category=spec.category||'Seçenek',values=groups.get(category)||new Map();values.set(spec.name,(values.get(spec.name)||0)+1);groups.set(category,values);}const selected=[...groups].map(([category,values])=>category+': '+[...values].map(([name,count])=>name+(count>1?' ×'+count:'')).join(', ')).join('; ');lines.push(room.name+' · '+floorName(room.floor)+' · '+room.width.toFixed(1)+' × '+room.depth.toFixed(1)+' m'+(selected?' — '+selected:''));}return lines;}
  function getState(){return {enabled:root.visible,professional,mode,transparent,floorFilter,selectedRoom:selected,selectedItem,dragging:Boolean(gesture),roomCount:rooms.length,itemCount:rooms.reduce((sum,room)=>sum+room.items.length,0),closedArea:areaOf(rooms),activeRoomLights:root.visible?lights.filter(entry=>entry.light.visible&&entry.group.visible).length:0,roomLightLimit:ROOM_LIGHT_LIMIT,settings:clone(settings)};}
  // Previews keep their own validated candidate. A caller cannot edit the returned
  // plan or reuse a preview after the source design or professional mode changes.
  const assistancePreviews=new Map(),basicIds=new Set(builtin.map(item=>item.id));
  function canonical(value){if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(key=>JSON.stringify(key)+':'+canonical(value[key])).join(',')+'}';return JSON.stringify(value);}
  function assistanceBase(){return canonical({type,settings,rooms,selected,professional,enabled:root.visible});}
  function shortSignature(value){let hash=2166136261;for(let i=0;i<value.length;i++)hash=Math.imul(hash^value.charCodeAt(i),16777619);return (hash>>>0).toString(36)+'-'+value.length;}
  function itemLabels(items){const counts=new Map();for(const item of items){const name=catalog.get(item.type)?.name||item.type;counts.set(name,(counts.get(name)||0)+1);}return [...counts].map(([name,count])=>name+' ×'+count).join(', ');}
  function assistanceRoomLabel(room){return room.name+' ('+floorName(room.floor)+')';}
  function previewAssistance(request){
    const warnings=[],summary=[];
    try{
      if(gesture)throw Error('Önce sürüklediğiniz oda veya nesneyi bırakın.');
      if(!rooms.length)throw Error('Ev görünümü henüz hazır değil. Biraz sonra yeniden deneyin.');
      if(!request||typeof request!=='object'||Array.isArray(request)||!['update','new'].includes(request.mode||'update'))throw Error('Yardımcı isteği geçerli değil.');
      const patch=request.settings||{};if(typeof patch!=='object'||Array.isArray(patch)||Object.keys(patch).some(key=>!['bedrooms','living','area','floors','balcony'].includes(key)))throw Error('Ev ayarları geçerli değil.');
      const constraints={bedrooms:[1,12],living:[1,3],area:[45,600],floors:[1,3]};
      for(const [key,value] of Object.entries(patch)){if(key==='balcony'){if(typeof value!=='boolean')throw Error('Balkon seçimi geçerli değil.');}else{const [min,max]=constraints[key];if(!Number.isFinite(value)||value<min||value>max||(key!=='area'&&!Number.isInteger(value)))throw Error('Ev düzeni için 1–12 oda, 1–3 salon, 45–600 m² ve 1–3 kat kullanılabilir.');}}
      const actions=request.items||[];if(!Array.isArray(actions)||actions.length>60)throw Error('Bir istekte en fazla 60 ayrı nesne değişikliği yapılabilir.');
      for(const action of actions){if(!action||typeof action!=='object'||!catalog.has(action.type)||(!Object.hasOwn(names,action.roomKind)&&!['all','selected'].includes(action.roomKind))||!['add','remove'].includes(action.action)||(action.quantity!==undefined&&(!Number.isInteger(action.quantity)||action.quantity<1||action.quantity>30)))throw Error('Nesne, oda veya adet bilgisi geçerli değil.');if(!professional&&!basicIds.has(action.type))throw Error('Bu envanter seçeneği için Profesyonel tasarım’ı açın.');}
      if(request.warnings!==undefined){if(!Array.isArray(request.warnings)||request.warnings.length>30||request.warnings.some(value=>typeof value!=='string'||value.length>600))throw Error('Yardımcı açıklamaları geçerli değil.');warnings.push(...request.warnings);}
      const base=assistanceBase(),actual=inferSettings(rooms),fresh=request.mode==='new';
      const layoutChanged=fresh||['bedrooms','living','area','floors'].some(key=>Object.hasOwn(patch,key)&&Math.abs(patch[key]-actual[key])>.000001);
      const config={...clone(layoutChanged?actual:settings),...patch};
      let candidate=clone(rooms),candidateType=type,candidateSelected=selected;
      const omitted=(room,items)=>{if(items.length)warnings.push(assistanceRoomLabel(room)+' kaldırılırken şu seçimler kaldırılacak: '+itemLabels(items)+'.');};
      if(layoutChanged){
        for(const [key,[min,max]] of Object.entries(constraints)){const value=config[key];if(!Number.isFinite(value)||value<min||value>max||(key!=='area'&&!Number.isInteger(value)))throw Error('Mevcut özel plan bu otomatik düzenin sınırları dışında. Oda/salon, alan ve kat sayılarını birlikte belirtin.');}
        candidate=generatePlan(config);candidateType=config.bedrooms+'+'+config.living+' özel plan';candidateSelected=candidate[0].id;
        warnings.push('Oda ölçüleri ve konumları yeniden düzenlenecek. Mevcut yerleşimin yerini önizlemedeki plan alacak; bu işlem tek adımda geri alınabilir.');
        summary.push(config.bedrooms+'+'+config.living+' düzen · '+config.area+' m² kapalı alan · '+config.floors+' kat hazırlanacak.');
        if(fresh){const previousCount=rooms.reduce((sum,room)=>sum+room.items.length,0);warnings.push('Yeni plan seçildi. Mevcut '+rooms.length+' alan ve '+previousCount+' nesne seçimi yeni planın başlangıç düzeniyle değiştirilecek.');for(const room of rooms)if(room.items.length)warnings.push(assistanceRoomLabel(room)+' eski seçimleri: '+itemLabels(room.items)+'.');}
        else{
          const defaultsByRoom=new Map(candidate.map(room=>[room.id,room.items])),assigned=new Map();candidate.forEach(room=>room.items=[]);let carried=0;
          for(const old of rooms){
            const compatible=candidate.filter(room=>room.kind===old.kind||(old.kind==='antre'&&room.kind==='hol')||(outdoor(old)&&outdoor(room)));
            compatible.sort((a,b)=>(assigned.get(a.id)||0)-(assigned.get(b.id)||0)+(a.floor===old.floor?-0.25:0)-(b.floor===old.floor?-0.25:0));
            if(!compatible.length){omitted(old,old.items);continue;}
            const target=compatible[0];assigned.set(target.id,(assigned.get(target.id)||0)+1);if(old.id===selected)candidateSelected=target.id;
            for(const original of old.items){const destination=[target,...compatible.filter(room=>room!==target)].find(room=>room.items.length<30);if(!destination)throw Error(names[old.kind]+' türündeki mevcut nesneler korunamıyor. Daha fazla oda bırakın veya önce nesne sayısını azaltın.');const item=clone(original);containItem(destination,item);destination.items.push(item);assigned.set(destination.id,Math.max(1,assigned.get(destination.id)||0));carried++;}
          }
          for(const room of candidate)if(!assigned.has(room.id))room.items=defaultsByRoom.get(room.id);
          summary.push(carried+' mevcut nesne seçimi uygun türdeki odalara taşınacak; yerleri yeni oda sınırlarına uyarlanacak.');
        }
        summary.push(...candidate.map(room=>assistanceRoomLabel(room)+': '+room.width.toFixed(1)+' × '+room.depth.toFixed(1)+' m.'));
      }else if(Object.hasOwn(patch,'balcony')&&patch.balcony!==rooms.some(outdoor)){
        if(!patch.balcony){const removed=candidate.filter(outdoor);for(const room of removed)omitted(room,room.items);candidate=candidate.filter(room=>!outdoor(room));summary.push(removed.length+' balkon/teras kaldırılacak; diğer odaların ölçü ve konumları korunacak.');if(!candidate.some(room=>room.id===candidateSelected))candidateSelected=candidate[0].id;}
        else{const anchor=candidate.find(room=>room.kind==='salon')||candidate[0],same=candidate.filter(room=>room.floor===anchor.floor),left=Math.min(...same.map(room=>room.x-room.width/2))-1,right=Math.max(...same.map(room=>room.x+room.width/2))+1;const x=left>=-25?left:right;if(x>25)throw Error('Plan sınırlarında balkon için boş yer bulunamadı. Önce odaları biraz merkeze taşıyın.');const balcony=makeRoom(uid('balcony'),'balkon',x,anchor.z,2,Math.max(1.5,Math.min(3.5,anchor.depth)),anchor.floor);candidate.push(balcony);summary.push(assistanceRoomLabel(balcony)+': 2 × '+balcony.depth.toFixed(1)+' m balkon eklenecek; kapalı alan değişmeyecek.');}
      }
      let itemTotal=candidate.reduce((sum,room)=>sum+room.items.length,0);if(itemTotal>400)throw Error('Planda toplam en fazla 400 nesne olabilir. Yeni düzen için önce nesne sayısını azaltın.');
      const beforeActions=new Map(candidate.map(room=>[room.id,clone(room.items)]));
      for(const action of actions){
        const targets=candidate.filter(room=>action.roomKind==='all'||(action.roomKind==='selected'?room.id===candidateSelected:room.kind===action.roomKind));
        if(!targets.length){warnings.push((names[action.roomKind]||'Seçili oda')+' bulunamadığı için '+catalog.get(action.type).name+' isteği uygulanmayacak.');continue;}
        for(const room of targets){const existing=room.items.filter(item=>item.type===action.type);if(action.action==='remove'){const remove=new Set(existing.slice(0,action.quantity??30).map(item=>item.id));room.items=room.items.filter(item=>!remove.has(item.id));itemTotal-=remove.size;}else{const needed=Math.max(0,(action.quantity??1)-existing.length);if(room.items.length+needed>30||itemTotal+needed>400)throw Error('Bir odada en fazla 30, planda toplam 400 nesne olabilir. İstenen adedi azaltın.');for(let i=0;i<needed;i++){const n=room.items.length,item={id:uid('item'),type:action.type,x:((n%3)-1)*.6,z:(Math.floor(n/3)%3-1)*.6,rotation:0};containItem(room,item);room.items.push(item);}itemTotal+=needed;}}
      }
      for(const room of candidate){const previous=beforeActions.get(room.id)||[],types=new Set([...previous,...room.items].map(item=>item.type));for(const value of types){const before=previous.filter(item=>item.type===value).length,after=room.items.filter(item=>item.type===value).length;if(before!==after)summary.push(assistanceRoomLabel(room)+' · '+catalog.get(value).name+': '+before+' → '+after+' adet.');}}
      const inferred=inferSettings(candidate);config.floors=inferred.floors;config.balcony=inferred.balcony;
      const plan={format:'trakswell-home-plan',version:2,units:'metres',homeType:candidateType,createdAt:new Date().toISOString(),settings:config,rooms:candidate};
      const validated=parsePlan(plan);plan.rooms=validated.rooms;plan.settings=validated.settings;
      const noChanges=canonical({type,settings,rooms})===canonical({type:plan.homeType,settings:plan.settings,rooms:plan.rooms});
      if(noChanges){summary.length=0;summary.push('İstediğiniz düzen ve nesne adetleri planda zaten mevcut.');}
      else if(!summary.length)summary.push('Plan ayarları güncellenecek; oda yerleşimi ve nesneler korunacak.');
      const token=uid('preview'),preview={token,baseSignature:shortSignature(base),summary,warnings,plan,noChanges};
      assistancePreviews.set(token,{base,integrity:canonical(preview),candidate:clone(validated),selected:candidateSelected,noChanges,summary:clone(summary)});
      while(assistancePreviews.size>6)assistancePreviews.delete(assistancePreviews.keys().next().value);
      return preview;
    }catch(error){return {error:error.message||'Bu isteğe uygun bir önizleme hazırlanamadı.',summary:[],warnings};}
  }
  function applyAssistance(preview){
    let entry;
    try{entry=assistancePreviews.get(preview?.token);if(!entry||canonical(preview)!==entry.integrity)return {ok:false,error:'Önizleme değişmiş veya artık geçerli değil. İsteği yeniden önizleyin.'};if(gesture||assistanceBase()!==entry.base)return {ok:false,error:'Önizlemeden sonra plan ya da tasarım modu değişti. Güncel plan için yeniden önizleyin.'};}
    catch{return {ok:false,error:'Önizleme geçerli değil. İsteği yeniden önizleyin.'};}
    if(entry.noChanges){assistancePreviews.delete(preview.token);return {ok:true,noChanges:true,summary:clone(entry.summary)};}
    const previous=snapshot(),previousEnabled=root.visible,previousHistory=history.slice(),previousCache={...cache};
    try{
      const candidate=clone(entry.candidate);record({...previous,restoreEnabled:previousEnabled,assistance:true});
      rooms=candidate.rooms;settings=candidate.settings;type=candidate.type;selected=entry.selected||rooms[0].id;selectedItem='';floorFilter='all';
      root.visible=true;house.visible=false;$('edit-enabled').checked=true;$('editor-fields').hidden=false;
      updateType(type);setupFields();rebuild();fitPlan();$('plan-setup').open=false;
      if(professional)refreshCatalog();assistancePreviews.delete(preview.token);
      return {ok:true,summary:clone(entry.summary)};
    }catch(error){
      history=previousHistory;cache=previousCache;root.visible=previousEnabled;house.visible=!previousEnabled;$('edit-enabled').checked=previousEnabled;$('editor-fields').hidden=!previousEnabled;
      try{restore(previous);}catch{type=previous.type;rooms=previous.rooms;settings=previous.settings;selected=previous.selected;selectedItem=previous.selectedItem;floorFilter=previous.floorFilter;}
      return {ok:false,error:'Değişiklik uygulanamadı; önceki plan korundu. '+(error.message||'Yeniden deneyin.')};
    }
  }
  function undo(){cancelDrag();if(!history.length)return {ok:false,error:'Geri alınacak değişiklik yok.'};const state=history.pop();if(typeof state.restoreEnabled==='boolean'){root.visible=state.restoreEnabled;house.visible=!state.restoreEnabled;$('edit-enabled').checked=state.restoreEnabled;$('editor-fields').hidden=!state.restoreEnabled;}restore(state);if(state.restoreEnabled===false){applying=true;try{window.dispatchEvent(new CustomEvent('home-type-change',{detail:type}));}finally{applying=false;}}if(professional)refreshCatalog();return {ok:true};}
  function canUndoAssistance(){return Boolean(history[history.length-1]?.assistance);}
  function undoAssistance(){if(!canUndoAssistance())return {ok:false,error:'Yardımcıdan sonra başka bir işlem yapıldı. Son işlemleri planın Geri al düğmesiyle geri alabilirsiniz.'};return undo();}
  $('edit-enabled').addEventListener('change',setEnabled);
  $('plan-generate').addEventListener('click',()=>{const config={bedrooms:Number($('plan-layout').value),living:1,area:Number($('plan-area').value),floors:Number($('plan-floors').value),balcony:$('plan-balcony').checked};try{if(!Number.isInteger(config.bedrooms)||config.bedrooms<1||config.bedrooms>12||!Number.isFinite(config.area)||config.area<45||config.area>600||!Number.isInteger(config.floors)||config.floors<1||config.floors>3)throw Error('1–12 oda, 45–600 m² alan ve 1–3 kat seçin.');const generated=generatePlan(config);cancelDrag();record();updateType(config.bedrooms+'+1 özel plan');rooms=generated;settings=config;selected=rooms[0].id;selectedItem='';floorFilter='all';setupFields();$('edit-enabled').checked=true;setEnabled();$('plan-setup').open=false;}catch(error){$('editor-fields').hidden=false;$('editor-warning').textContent=error.message;}});
  $('plan-place-mode').addEventListener('click',()=>setMode('place'));$('plan-orbit-mode').addEventListener('click',()=>setMode('orbit'));
  $('plan-floor-filter').addEventListener('change',()=>{cancelDrag();floorFilter=$('plan-floor-filter').value;const available=rooms.filter(room=>floorFilter==='all'||room.floor===Number(floorFilter));if(!available.some(room=>room.id===selected)){selected=available[0]?.id||rooms[0].id;selectedItem='';}refreshSelection();fitPlan();});
  $('edit-room').addEventListener('change',()=>{cancelDrag();selected=$('edit-room').value;selectedItem='';if(floorFilter!=='all')floorFilter=String(currentRoom().floor);refreshSelection();if(professional)refreshCatalog();});
  for(const field of fields)$('edit-'+field).addEventListener('change',()=>{cancelDrag();const input=$('edit-'+field),room=currentRoom();if(!room)return;const value=field==='name'?input.value.trim():field==='kind'?input.value:Number(input.value);if((limits[field]&&(input.value===''||!Number.isFinite(value)||value<limits[field][0]||value>limits[field][1]))||(field==='floor'&&!Number.isInteger(value))||(field==='kind'&&!Object.hasOwn(names,value))||(field==='name'&&(!value||value.length>40))){input.value=room[field];$('editor-warning').textContent='Belirtilen aralıkta geçerli bir değer girin.';return;}record();room[field]=value;room.items.forEach(item=>containItem(room,item));refreshSettings();if(floorFilter!=='all')floorFilter=String(room.floor);setupFields();rebuild();});
  $('room-add').addEventListener('click',()=>{if(rooms.length>=48)return;cancelDrag();const floor=floorFilter==='all'?(currentRoom()?.floor||0):Number(floorFilter),same=rooms.filter(room=>room.floor===floor),edge=Math.max(...same.map(room=>room.x+room.width/2),0);const room=makeRoom(uid('room'),'yatak',Math.min(25,edge+1.5),0,3,3,floor);if(rooms.reduce((sum,value)=>sum+value.items.length,0)+room.items.length>400){$('editor-warning').textContent='Yeni oda başlangıç mobilyalarıyla birlikte 400 nesne sınırını aşıyor. Önce birkaç nesneyi kaldırın.';return;}record();room.name='Yeni oda';rooms.push(room);selected=room.id;selectedItem='';refreshSettings();rebuild();fitPlan();});
  $('room-delete').addEventListener('click',()=>{if(rooms.length<2)return;cancelDrag();record();rooms=rooms.filter(room=>room.id!==selected);selectedItem='';refreshSettings();const available=floorFilter==='all'?rooms:rooms.filter(room=>room.floor===Number(floorFilter));if(!available.length)floorFilter='all';selected=(available[0]||rooms[0]).id;setupFields();rebuild();});
  $('plan-undo').addEventListener('click',undo);$('plan-fit').addEventListener('click',fitPlan);
  $('plan-reset').addEventListener('click',()=>{cancelDrag();const initial=defaults(type);record();restore(initial);});
  $('plan-item-category').addEventListener('change',fillPalette);$('plan-item-add').addEventListener('click',()=>addItem($('plan-item-type').value));
  $('plan-item-rotate').addEventListener('click',()=>{const item=currentItem(),room=currentRoom();if(!item||!professional||!itemGroups.has(item.id))return;record();item.rotation=(item.rotation+1)%4;containItem(room,item);const group=itemGroups.get(item.id);group.rotation.y=item.rotation*Math.PI/2;group.scale.setScalar(itemSize(room,item).scale);group.position.set(item.x,0,item.z);refreshSelection(true);});
  editor.querySelectorAll('[data-move-room]').forEach(button=>button.addEventListener('click',()=>moveSelection(...button.dataset.moveRoom.split(',').map(Number))));
  $('professional-search').addEventListener('input',refreshCatalog);$('professional-category').addEventListener('change',refreshCatalog);$('professional-room-filter').addEventListener('change',refreshCatalog);
  for(const category of [...new Set(inventory.map(item=>item.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'tr')))option($('professional-category'),category,category);
  for(const room of [...new Set(inventory.map(item=>item.room).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'tr')))option($('professional-room-filter'),room,room);
  $('plan-save').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('save-design-request')));$('plan-load').addEventListener('click',()=>load());$('plan-download').addEventListener('click',()=>download());
  $('plan-forget').addEventListener('click',()=>{let removed=0;try{for(const key of Object.keys(localStorage))if(/^trakswell-plan-v[12]:/.test(key)){localStorage.removeItem(key);removed++;}}catch{$('editor-warning').textContent='Tarayıcı kayıt alanına erişilemedi.';return;}refreshSaved();$('editor-status').textContent=removed?'Bu tarayıcıdaki '+removed+' kayıt kaldırıldı. Açık tasarımınız korunuyor.':'Bu tarayıcıda kayıt yok.';});
  $('plan-import').addEventListener('click',()=>$('plan-file').click());$('plan-file').addEventListener('change',async()=>{const file=$('plan-file').files[0];if(!file)return;try{if(file.size>500000)throw Error('En fazla 500 KB büyüklüğünde bir plan seçin.');const data=parsePlan(JSON.parse(await file.text()));cancelDrag();record();restore(data);$('edit-enabled').checked=true;setEnabled();$('editor-status').textContent='Plan dosyası açıldı. Odalar ve seçili nesneler yüklendi.';}catch(error){$('editor-warning').textContent=error instanceof SyntaxError?'Dosya açılamadı. Geçerli bir Trakswell JSON planı seçin.':error.message||'Plan dosyası açılamadı.';}finally{$('plan-file').value='';}});
  canvas.addEventListener('keydown',event=>{if(!professional||!root.visible||mode!=='place')return;const move={ArrowLeft:[-.5,0],ArrowRight:[.5,0],ArrowUp:[0,-.5],ArrowDown:[0,.5]}[event.key];if(move){event.preventDefault();moveSelection(...move);}if(event.key==='Escape')cancelDrag();});
  fillPalette();refreshSaved();setMode('orbit');
  const api={changeType,sync,pick,view,setTransparent,setProfessional,beginDrag,drag,endDrag,cancelDrag,isEnabled:()=>root.visible,getExport,getState,describe,download,save,load,previewAssistance,applyAssistance,undo,undoAssistance,canUndoAssistance};
  window.TrakswellPlan=api;
  return api;
};
