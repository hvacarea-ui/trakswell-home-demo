/* Trakswell — procedural, interactive 3D cutaway. All assets are local geometry. */
(() => {
  const host = document.getElementById('house-3d');
  const status = document.getElementById('view-status');
  function unavailable(message){status.textContent=message;const note=document.createElement('p');note.className='no-script';note.textContent=message;host.append(note);}
  if (!window.THREE) { unavailable('3B görünüm yüklenemedi. Oda ve senaryo kontrolleri kullanılabilir.'); return; }
  const T = window.THREE;
  const _labelPos=new T.Vector3();
  const isStudio=()=>!!host.closest('.showroom-active');
  let renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
  catch { unavailable('Bu cihazda 3B görünüm açılamadı. Kumanda panelinden senaryoları deneyebilirsiniz.'); return; }
  // Keep native 1× clarity; limit only high-density buffer cost on smaller devices.
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)'),coarsePointer=matchMedia('(pointer: coarse)');
  const lowCapability=(navigator.deviceMemory>0&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4);
  function pixelRatioFor(w,h){const budget=lowCapability?3000000:coarsePointer.matches?4000000:6000000,dpr=window.devicePixelRatio||1;return Math.max(1,Math.min(dpr,lowCapability?1.5:2,Math.sqrt(budget/Math.max(1,w*h))));}
  renderer.setPixelRatio(pixelRatioFor(1,1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Döndürülebilen üç boyutlu ev modeli. Alternatif olarak görünüm düğmelerini kullanın.');
  renderer.domElement.setAttribute('role', 'img');
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(35, 1, .1, 100);
  const target = new T.Vector3(0, .2, .7);
  const initialTarget = target.clone();
  let yaw = .40, elevation = .86, distance = 24, homeDistance = 24;
  let frameRequest=null,needsDraw=false,viewportVisible=true,contextLost=false,lastWidth=0,lastHeight=0,lastPixelRatio=0,labelMetricsDirty=true;
  const house = new T.Group(); scene.add(house);
  let planEditor = null;
  let transparentView=false;
  // Keep original materials untouched: furnishings often share them with walls/floors.
  function createTransparency(){
    const entries=new Map(),materials=new Map();let enabled=false;
    function ghost(original,opacity){
      let variants=materials.get(original);if(!variants){variants=new Map();materials.set(original,variants);}
      if(!variants.has(opacity)){const clone=original.clone();clone.transparent=true;clone.opacity=Math.min(original.opacity,opacity);clone.depthWrite=false;variants.set(opacity,clone);}
      return variants.get(opacity);
    }
    function apply(mesh,entry){
      mesh.material=enabled?(Array.isArray(entry.material)?entry.material.map(m=>ghost(m,entry.opacity)):ghost(entry.material,entry.opacity)):entry.material;
      mesh.castShadow=enabled?false:entry.castShadow;mesh.receiveShadow=enabled?false:entry.receiveShadow;
    }
    function add(object,opacity){object.traverse(mesh=>{if(!mesh.isMesh)return;let entry=entries.get(mesh);if(entry)entry.opacity=Math.min(entry.opacity,opacity);else{entry={material:mesh.material,castShadow:mesh.castShadow,receiveShadow:mesh.receiveShadow,opacity};entries.set(mesh,entry);}if(enabled)apply(mesh,entry);});}
    function setEnabled(value){enabled=!!value;for(const [mesh,entry] of entries)apply(mesh,entry);if(enabled)refresh();}
    function refresh(){if(!enabled)return;for(const [original,variants] of materials)for(const [opacity,clone] of variants){clone.color?.copy(original.color);clone.emissive?.copy(original.emissive);if('emissiveIntensity' in original)clone.emissiveIntensity=original.emissiveIntensity;clone.opacity=Math.min(original.opacity,opacity);}}
    function clear(){setEnabled(false);entries.clear();for(const variants of materials.values())for(const clone of variants.values())clone.dispose();materials.clear();}
    return {add,setEnabled,refresh,clear};
  }
  const structureView=createTransparency();
  const showroomMarkers=[];
  const walls = [], lamps = {}, curtains = {}, tvScreens = [];
  const fixtureMaterials = {};
  function lampGlass(room) {
    const material = new T.MeshStandardMaterial({ color:'#fff0ce', roughness:.4, emissive:'#ffc075', emissiveIntensity:0 });
    (fixtureMaterials[room] ||= []).push(material);
    return material;
  }
  // Aynı görünümdeki nesneler tek malzemeyi paylaşır. Sonradan değiştirilen malzemeler
  // (lamba camı, LED, ekran) bu önbelleği kullanmaz; doğrudan oluşturulur.
  const materialCache = new Map();
  const mat = (color, roughness = .75, metalness = 0) => {
    const key = color + '|' + roughness + '|' + metalness;
    if (!materialCache.has(key)) materialCache.set(key, new T.MeshStandardMaterial({ color, roughness, metalness }));
    return materialCache.get(key);
  };
  // Aynı geometriyi tekrar eden parçalar tek çizim çağrısında (InstancedMesh) çizilir.
  const _instanceMatrix = new T.Matrix4(), _instancePos = new T.Vector3(), _instanceScale = new T.Vector3(), _instanceQuat = new T.Quaternion();
  function instanced(geometry, material, items, { castShadow = true, receiveShadow = true, parent = house } = {}) {
    const mesh = new T.InstancedMesh(geometry, material, items.length);
    items.forEach((item, index) => {
      _instancePos.set(item.x, item.y, item.z);
      _instanceScale.set(item.sx ?? 1, item.sy ?? 1, item.sz ?? 1);
      _instanceMatrix.compose(_instancePos, _instanceQuat, _instanceScale);
      mesh.setMatrixAt(index, _instanceMatrix);
      if (item.color) mesh.setColorAt(index, new T.Color(item.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.castShadow = castShadow; mesh.receiveShadow = receiveShadow;
    parent.add(mesh);
    return mesh;
  }
  const plaster = mat('#e7dfd1'), trim = mat('#eee8de'), charcoal = mat('#24272b');
  const oak = mat('#a57b54'), fabric = mat('#d4c6b5'), cream = mat('#f1e7d6'), teal = mat('#426169');
  const brass = mat('#b29458', .35, .7), porcelain = mat('#eeebe4', .25);
  function box(x,y,z,w,h,d,m,parent=house) {
    const mesh = new T.Mesh(new T.BoxGeometry(w,h,d),m); mesh.position.set(x,y,z);
    mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);if(m===plaster||m===trim)structureView.add(mesh,.12);return mesh;
  }
  function cylinder(x,y,z,rt,rb,h,m,segments=24) {
    const mesh=new T.Mesh(new T.CylinderGeometry(rt,rb,h,segments),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;house.add(mesh);return mesh;
  }
  function sphere(x,y,z,sx,sy,sz,m) {
    const mesh=new T.Mesh(new T.SphereGeometry(1,16,12),m);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;house.add(mesh);return mesh;
  }
  function wall(x,z,w,d,nx,nz) {
    const group=new T.Group();box(x,1.3,z,w,2.6,d,plaster,group);box(x,2.62,z,w+.025,.07,d+.025,trim,group);
    box(x,.12,z,w+.025,.18,d+.025,trim,group);house.add(group);walls.push({group,nx,nz});return group;
  }
  // Thick slab, timber planks and stone floors. No flattened furniture textures.
  box(0,-.23,0,12.5,.42,9.5,mat('#7b756c'));
  box(0,-.03,0,12.25,.10,9.25,mat('#d4c4ad'));
  const timber = ['#99734e','#b58d64','#a88059','#b99471','#ac8159'];
  const planks=[];
  for(let x=-5.9,i=0;x<6;x+=.36,i++) for(let z=-4.4,j=0;z<4.4;z+=1.1,j++) {
    planks.push({x,y:.035,z,color:timber[(i*7+j*3)%timber.length]});
  }
  // Örnek rengi malzeme rengiyle çarpılır; beyaz taban malzeme önceki renkleri aynen verir.
  instanced(new T.BoxGeometry(.345,.055,1.08), new T.MeshStandardMaterial({color:'#ffffff',roughness:.75,metalness:0}), planks);
  const stone=mat('#bbb9b1');
  const grout=[];
  for(const [cx,cz,w,d] of [[-4,2.7,3.8,3.1],[3.9,2.7,3.9,3.1]]){
    box(cx,.08,cz,w,.06,d,stone);
    for(let x=cx-w/2;x<cx+w/2;x+=.65) grout.push({x,y:.116,z:cz,sx:.012,sy:.005,sz:d});
    for(let z=cz-d/2;z<cz+d/2;z+=.65) grout.push({x:cx,y:.116,z,sx:w,sy:.005,sz:.012});
  }
  instanced(new T.BoxGeometry(1,1,1), mat('#8b8b85'), grout, {castShadow:false});
  // Openings are gaps in the geometry, with jambs and an open door leaf.
  function partition(x,z,length,axis,openings=[],y=0,height=2.6,cutaway=false){
    const g=new T.Group();house.add(g);
    const piece=(a,b,h,cy)=>{if(b-a<.01)return;box(x+(axis==='x'?(a+b)/2:0),y+cy,z+(axis==='z'?(a+b)/2:0),axis==='x'?b-a:.16,h,axis==='z'?b-a:.16,plaster,g);};
    let edge=-length/2;
    for(const {at=0,width=1,door=true} of openings.slice().sort((a,b)=>a.at-b.at)){
      const a=at-width/2,b=at+width/2;piece(edge,a,height,height/2);
      if(height>2.12)piece(a,b,height-2.12,2.12+(height-2.12)/2);
      for(const p of [a,b])box(x+(axis==='x'?p:0),y+1.07,z+(axis==='z'?p:0),axis==='x'?.065:.22,2.14,axis==='z'?.065:.22,trim);
      box(x+(axis==='x'?at:0),y+2.14,z+(axis==='z'?at:0),axis==='x'?width+.12:.22,.08,axis==='z'?width+.12:.22,trim);
      if(door){const hinge=new T.Group();hinge.position.set(x+(axis==='x'?a:0),y,z+(axis==='z'?a:0));hinge.rotation.y=(axis==='x'?0:-Math.PI/2)-Math.PI*.36;house.add(hinge);box(width/2,1.03,0,width,2.06,.055,oak,hinge);box(width-.13,1.0,.05,.10,.035,.055,brass,hinge);structureView.add(hinge,.12);}
      edge=b;
    }
    piece(edge,length/2,height,height/2);
    if(cutaway)walls.push({group:g,nx:axis==='z'?Math.sign(x):0,nz:axis==='x'?Math.sign(z):0});
    return g;
  }
  partition(0,-4.6,12.3,'x',[{at:0,width:1.5,door:false}],0,2.6,true);
  wall(-6.1,0,.18,9.2,-1,0);wall(6.1,0,.18,9.2,1,0);
  partition(0,4.6,12.3,'x',[{at:-4,width:1.25,door:false},{at:0,width:1.3}],0,2.6,true);
  partition(-1.15,-1.85,5.5,'z',[{at:1.4,width:1.2}],0,1.6);
  partition(1.15,-1.85,5.5,'z',[{at:1.4,width:1.2}],0,1.6);
  box(-3.65,.8,.9,4.9,1.6,.16,plaster);box(3.65,.8,.9,4.9,1.6,.16,plaster);
  partition(-1.95,2.75,3.7,'z',[{at:-.75,width:1.1}],0,1.6);
  partition(1.95,2.75,3.7,'z',[{at:-1,width:1},{at:.9,width:.9}],0,1.6);
  // The entrance continues through a clear central hall, never through a bedroom.
  box(0,.12,-1.8,2.15,.035,5.4,mat('#c3b29b'));
  box(-1.55,.8,.9,.8,1.6,.16,plaster);box(1.55,.8,.9,.8,1.6,.16,plaster);
  // Separate WC, reached directly from the entrance hall.
  box(2.8,.8,2.72,1.7,1.6,.12,plaster);box(3.65,.8,3.66,.12,1.6,1.88,plaster);
  box(3.35,.7,3.7,.28,1.1,.65,porcelain);sphere(2.98,.46,3.7,.49,.25,.32,porcelain);
  sphere(2.92,.66,3.7,.32,.025,.21,mat('#b8b7b1'));box(2.48,1.0,4.31,.55,.16,.36,porcelain);
  // Rear windows and curtains (both have depth, mounted on rear wall).
  const windowStart=house.children.length;
  const glass=mat('#789aa8',.22,.15);
  const curtainPleat=new T.BoxGeometry(.085,2.15,.09);
  for(const [name,cx,w] of [['salon',-3.2,3.9],['yatak',3.45,3.6]]){
    box(cx,1.65,-4.48,w,1.5,.07,charcoal);box(cx,1.65,-4.42,w-.13,1.36,.05,glass);
    box(cx,1.65,-4.36,.045,1.4,.04,charcoal);box(cx,2.55,-4.22,w+.3,.045,.06,brass);
    const pair=[];
    for(const side of [-1,1]){
      const g=new T.Group();g.position.set(cx+side*w/2,1.4,-4.2);
      instanced(curtainPleat,mat('#d2bca0'),Array.from({length:12},(_,i)=>({x:side*(i+.5)*-.08,y:0,z:Math.sin(i*2)*.035})),{parent:g});
      house.add(g);pair.push({g,side});
    } curtains[name]={pair,w};
  }
  house.children.slice(windowStart).forEach(object=>structureView.add(object,.12));
  // Living room: upholstered sofa, arms, back cushions, rug, coffee table and TV.
  box(-3.25,.13,-1.7,4.2,.035,2.7,mat('#c8c1b1'));
  box(-4.9,.35,-2.4,1.25,.5,3.0,mat('#8c8275'));
  box(-5.44,.85,-2.4,.24,1.1,3.12,fabric);
  for(const z of [-3.77,-1.03])box(-4.85,.67,z,1.4,.7,.23,fabric);
  for(const z of [-3.3,-2.4,-1.5]){
    box(-4.8,.65,z,1.05,.22,.83,cream);const p=box(-5.14,1.0,z,.28,.58,.76,fabric);p.rotation.z=-.16;
  }
  box(-4.72,.88,-3.3,.55,.18,.5,teal).rotation.z=-.2;
  cylinder(-2.8,.5,-2.2,.77,.77,.13,oak);cylinder(-2.8,.27,-2.2,.25,.36,.4,charcoal);
  box(-2.65,.6,-2.3,.38,.045,.3,cream);cylinder(-3,.63,-2.05,.1,.08,.16,porcelain);
  box(-1.5,.33,-2.7,.45,.5,2.6,oak);
  const tv=box(-1.5,1.15,-2.7,.12,1.15,2.25,charcoal);
  const screen=box(-1.58,1.15,-2.7,.025,1.02,2.08,new T.MeshStandardMaterial({color:'#17202c',emissive:'#5085b0',emissiveIntensity:.25}));tvScreens.push(screen);
  // Accent chair, floor lamp and shelving.
  box(-2.1,.46,-3.65,.88,.55,.8,teal);box(-2.1,.9,-4.0,.9,.7,.16,teal);
  cylinder(-5.5,.15,-.2,.3,.3,.06,brass);
  cylinder(-5.5,1.1,-.2,.035,.035,2,brass);cylinder(-5.5,2.03,-.2,.34,.49,.4,lampGlass('salon'));
  const bedroomStart=house.children.length;
  // Bedroom: raised bed, upholstered headboard, mattress, quilt and pillows.
  box(3.65,.3,-2.45,2.6,.45,3.25,oak);box(3.65,.65,-2.45,2.55,.35,3.13,cream);
  box(3.65,.88,-1.86,2.58,.16,1.9,mat('#536878'));
  box(3.65,1.15,-4.0,2.85,1.6,.18,fabric);
  for(const x of [2.99,4.31])box(x,.91,-3.48,1.03,.22,.63,porcelain);
  for(const x of [1.7,5.45]){box(x,.43,-3.6,.65,.72,.68,oak);cylinder(x,.8,-3.6,.15,.15,.04,brass);cylinder(x,.94,-3.6,.035,.035,.3,brass);cylinder(x,1.16,-3.6,.17,.25,.3,lampGlass('yatak'));}
  box(5.7,1.1,-.7,.48,2.1,1.55,mat('#c6b69e'));
  const bedroomObjects=house.children.slice(bedroomStart);
  // Kitchen: full-height cabinetry, stone worktops, hob and island stools.
  for(let x=-5.4;x<-2.2;x+=.65){box(x,.55,1.5,.63,1,.65,oak);box(x,1.08,1.5,.66,.09,.72,porcelain);box(x,.66,1.86,.31,.025,.035,brass);}
  box(-5.62,1.2,2.65,.65,2.25,.95,mat('#c5c6c4',.3,.4));
  box(-3.3,1.14,1.5,.8,.035,.48,charcoal);
  for(const x of [-3.5,-3.1])for(const z of [1.36,1.64])cylinder(x,1.166,z,.085,.085,.01,mat('#787a7b'));
  box(-3.8,.58,3.2,1.9,1,.8,oak);box(-3.8,1.12,3.2,2.1,.10,.95,porcelain);
  for(const x of [-4.3,-3.3]){cylinder(x,.72,4.03,.26,.26,.14,teal);for(const dx of [-.15,.15])box(x+dx,.35,4.03,.05,.65,.05,charcoal);}
  // Hall console, runner and decorative mirror.
  box(0,.13,2.8,1.3,.04,3.1,mat('#787163'));box(-1.6,.55,2.85,.38,1,1.6,oak);
  // Bathroom: shower frame, vanity, basin and bathtub with inset water.
  box(5.15,.39,2.85,1.3,.65,2.3,porcelain);box(5.15,.73,2.85,.98,.045,1.93,mat('#79a7b5',.18,.25));
  box(3.0,.6,1.5,1.4,1,.7,oak);box(3.0,1.13,1.5,1.5,.1,.8,porcelain);cylinder(3.0,1.22,1.5,.35,.25,.14,porcelain);
  box(3,1.8,1.03,1.2,.8,.06,mat('#93a7b0',.12,.8));
  const terraceStart=house.children.length;
  // Terrace and planting give the house a grounded architectural setting.
  box(-4,-.15,5.7,4.2,.25,2,mat('#c3b5a0'));
  cylinder(-4,.49,5.8,.45,.45,.1,oak);cylinder(-4,.2,5.8,.08,.12,.5,charcoal);
  for(const x of [-4.85,-3.15]){box(x,.3,5.8,.56,.12,.6,fabric);box(x,.6,6.08,.56,.6,.1,fabric);}
  for(let x=-6;x<=-2;x+=.5)box(x,.5,6.66,.04,1,.04,charcoal);
  box(-4,1.03,6.66,4.2,.06,.06,brass);
  for(const x of [-6.05,-1.95]){box(x,1.03,5.7,.06,.06,2,brass);for(const z of [4.8,5.4,6,6.6])box(x,.5,z,.04,1,.04,charcoal);}
  box(0,-.13,5.2,1.95,.25,1.2,stone);
  const terraceObjects=house.children.slice(terraceStart);
  function plant(x,z,size=1){cylinder(x,.22,z,.23,.18,.44,mat('#bba88f'));cylinder(x,.7,z,.025,.04,1,oak);for(let i=0;i<7;i++){const a=i*2.4;sphere(x+Math.cos(a)*.22*size,1+Math.sin(i)*.25,z+Math.sin(a)*.22*size,.19*size,.38*size,.12*size,mat(i%2?'#51654a':'#778166'));}}
  plant(-5.7,-3.8);plant(-1.6,.45,.65);plant(5.6,4.0);
  const outdoorPlantStart=house.children.length;plant(-5.65,6.2,.7);terraceObjects.push(...house.children.slice(outdoorPlantStart));
  // Physical fixtures remain visible when off; their diffusers follow room dimming.
  function pendant(room,x,z,radius,drop) {
    cylinder(x,2.66,z,.13,.13,.07,charcoal);
    cylinder(x,2.66-drop/2,z,.014,.014,drop,brass);
    const y=2.66-drop;
    cylinder(x,y,z,radius*.42,radius,.22,brass);
    cylinder(x,y-.12,z,radius*.89,radius*.89,.045,lampGlass(room));
    sphere(x,y-.18,z,radius*.38,.12,radius*.38,lampGlass(room));
  }
  pendant('salon',-2.8,-2.2,.48,.64);
  for(const x of [-4.45,-3.8,-3.15])pendant('mutfak',x,3.2,.21,.68);
  // Hall ceiling light and visible bathroom mirror sconces.
  cylinder(0,2.51,2.8,.34,.34,.09,brass);
  cylinder(0,2.44,2.8,.30,.30,.07,lampGlass('antre'));
  for(const x of [2.2,3.8]){
    box(x,1.85,1.05,.13,.4,.12,brass);
    sphere(x,1.85,1.22,.13,.23,.13,lampGlass('banyo'));
  }
  // Warm room lamps illuminate solid geometry. Ambient light keeps unlit rooms readable.
  scene.add(new T.HemisphereLight('#cdd9f0','#6a5948',1.25));
  const sun=new T.DirectionalLight('#fff2d8',3);sun.position.set(-7,14,8);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.1,far:40});sun.shadow.bias=-.0004;sun.shadow.normalBias=.035;scene.add(sun);
  // Wall tablet, smart speaker and visibly mounted sensors.
  const panelCanvas=document.createElement('canvas');panelCanvas.width=1024;panelCanvas.height=640;
  const panelContext=panelCanvas.getContext?.('2d');
  panelContext?.scale(2,2);
  const panelTexture=panelContext?new T.CanvasTexture(panelCanvas):null;
  if(panelTexture)panelTexture.colorSpace=T.SRGBColorSpace;
  const tabletBody=box(-1.83,1.4,2.8,.09,.72,1.13,charcoal);
  const panelTargets=[tabletBody];
  const tablet=new T.Mesh(new T.PlaneGeometry(1.02,.62),new T.MeshBasicMaterial({map:panelTexture,color:panelTexture?'#ffffff':'#7894b8',side:T.DoubleSide}));
  tablet.rotation.y=Math.PI/2;tablet.position.set(-1.77,1.4,2.8);house.add(tablet);
  panelTargets.push(tablet);
  cylinder(-2,.26,.32,.28,.3,.5,oak);
  cylinder(-2,.72,.32,.19,.21,.42,charcoal);
  const speakerRing=cylinder(-2,.94,.32,.195,.195,.025,new T.MeshStandardMaterial({color:'#5597b4',emissive:'#55c8ff',emissiveIntensity:0}));
  for(let i=0;i<8;i++)box(-2,.58+i*.035,.53,.24,.012,.015,mat('#6e7782'));
  const sensorLEDs=[];
  function sensor(x,y,z,id){
    box(x,y,z,.28,.22,.12,porcelain);
    const led=sphere(x,y-.04,z+.075,.035,.035,.025,new T.MeshStandardMaterial({color:'#75c4cf',emissive:'#75c4cf',emissiveIntensity:.3}));sensorLEDs.push({id,led});
  }
  sensor(-1.15,1.85,-4.25,'sensor-co');sensor(1.25,1.85,-4.25,'sensor-heat');sensor(1.15,1.1,.35,'sensor-vibration');
  sensor(-3.35,.22,2.4,'sensor-kitchen');sensor(4.45,.22,3.5,'sensor-bath');
  // Etiketler 3B dokuya çizilmez; ekrandaki konuma yansıtılan HTML öğeleridir.
  // Böylece model küçük görünse de yazı boyutu sabit ve okunur kalır.
  const deviceLabels=[];
  const deviceHelp={
    'Duvar paneli ↗':['Duvar paneli','Işıkları, perdeleri ve ev senaryolarını tek ekrandan yönetin. Kumandayı açmak için dokunun.'],
    'Akıllı ses':['Akıllı ses sistemi','Uyumlu hoparlörlerden müzik, kapı zili ve senaryo bildirimleri duyabilirsiniz.'],
    'CO':['Karbonmonoksit sensörü','Karbonmonoksit artışını algılayan uyumlu sensör, sesli uyarı ve telefon bildirimi başlatabilir.'],
    'Isı':['Sıcaklık sensörü','Oda sıcaklığını ölçer; uyumlu ısıtma ve soğutma cihazları seçtiğiniz hedefe göre çalışır.'],
    'Su':['Su kaçağı sensörü','Zemindeki suyu algılar ve bildirim gönderir. Uyumlu motorlu vana varsa suyu kapatma senaryosu eklenebilir.'],
    'Titreşim':['Titreşim sensörü','Kapı veya penceredeki olağan dışı titreşimi algılayarak belirlediğiniz uyarıyı başlatabilir.'],
    'Dış kapı kamerası':['Dış kapı kamerası','Kapınızdaki ziyaretçiyi uyumlu kamera üzerinden görmenizi ve telefonunuza bildirim gelmesini sağlar.']
  };
  const tooltip=document.createElement('div');tooltip.id='device-tooltip';tooltip.className='device-tooltip';tooltip.role='tooltip';tooltip.hidden=true;
  const tipTitle=document.createElement('strong'),tipText=document.createElement('p');tooltip.append(tipTitle,tipText);host.append(tooltip);
  let tipNode=null,tipTimer;
  function hideTip(){clearTimeout(tipTimer);if(tipNode)tipNode.removeAttribute('aria-describedby');tooltip.hidden=true;tipNode=null;}
  function positionTip(){
    if(!tipNode)return;if(tipNode.hidden||!house.visible){hideTip();return;}
    const r=tipNode.getBoundingClientRect(),h=host.getBoundingClientRect();
    tooltip.style.left=Math.max(8,Math.min(host.clientWidth-tooltip.offsetWidth-8,r.left-h.left+r.width/2-tooltip.offsetWidth/2))+'px';
    const above=r.top-h.top-tooltip.offsetHeight-9;
    tooltip.style.top=Math.max(8,Math.min(host.clientHeight-tooltip.offsetHeight-8,above>=8?above:r.bottom-h.top+9))+'px';
  }
  function showTip(node,text){clearTimeout(tipTimer);if(tipNode&&tipNode!==node)tipNode.removeAttribute('aria-describedby');tipNode=node;const info=deviceHelp[text];tipTitle.textContent=info[0];tipText.textContent=info[1];tooltip.hidden=false;node.setAttribute('aria-describedby',tooltip.id);positionTip();}
  function deferTip(){clearTimeout(tipTimer);tipTimer=setTimeout(()=>{if(!tooltip.matches(':hover')&&!tipNode?.matches(':hover,:focus'))hideTip();},160);}
  tooltip.addEventListener('pointerenter',()=>clearTimeout(tipTimer));tooltip.addEventListener('pointerleave',deferTip);
  host.addEventListener('keydown',e=>{if(e.key==='Escape')hideTip();});
  document.addEventListener('pointerdown',e=>{if(!tooltip.contains(e.target)&&!e.target.closest('.device-label'))hideTip();});
  function deviceLabel(text,x,y,z,action){
    const anchor=new T.Object3D();anchor.position.set(x,y,z);house.add(anchor);
    const node=document.createElement('button');node.type='button';node.className='device-label';node.textContent=text;node.hidden=true;
    node.setAttribute('aria-label',action?.label||deviceHelp[text][0]+' hakkında bilgi');
    node.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showTip(node,text);});
    node.addEventListener('pointerleave',deferTip);node.addEventListener('focus',()=>showTip(node,text));node.addEventListener('blur',deferTip);
    node.addEventListener('click',()=>{showTip(node,text);if(action){hideTip();action.run();}});
    host.append(node);deviceLabels.push({node,anchor});return anchor;
  }
  deviceLabel('Duvar paneli ↗',-1.8,2.05,2.8,{label:'Duvar paneli kontrollerini aç',run:()=>window.dispatchEvent(new CustomEvent('open-wall-panel'))});
  deviceLabel('Akıllı ses',-2,1.3,.32);
  deviceLabel('CO',-1.15,2.2,-4.2);deviceLabel('Isı',1.25,2.2,-4.2);
  deviceLabel('Su',-3.35,.65,2.4);deviceLabel('Su',4.45,.65,3.5);
  deviceLabel('Titreşim',1.15,1.55,.35);
  const robotDock=new T.Vector3(-4.1,0,-.25);
  const chargingBase=box(robotDock.x,.2,robotDock.z+.38,.8,.38,.28,charcoal);
  const robotStart=house.children.length;
  cylinder(0,.24,0,.32,.34,.18,porcelain);
  cylinder(0,.34,0,.25,.25,.025,charcoal);
  cylinder(.08,.39,0,.07,.07,.09,porcelain);
  const robotLED=box(0,.36,-.19,.12,.018,.035,new T.MeshStandardMaterial({color:'#6fc8d2',emissive:'#6fc8d2',emissiveIntensity:1}));
  const robotParts=house.children.slice(robotStart),robot=new T.Group();robotParts.forEach(part=>robot.add(part));house.add(robot);robot.position.copy(robotDock);robot.name='smart-vacuum';
  const route=[[-3.8,-.3],[-1.3,-.3],[-1.3,-.85],[-3.8,-.85]].map(([x,z])=>new T.Vector3(x,0,z));
  let robotMode='',robotRouteIndex=0,robotAnimation=null,robotTime=null;const robotDelta=new T.Vector3();
  function stopRobotAnimation(){if(robotAnimation!==null)window.cancelAnimationFrame(robotAnimation);robotAnimation=null;robotTime=null;}
  function resumeRobotAnimation(){if(robotAnimation===null&&canDraw()&&house.visible&&!reducedMotion.matches&&(robotMode==='clean'||robotMode==='return'))robotAnimation=window.requestAnimationFrame(animateRobot);}
  function animateRobot(time){
    robotAnimation=null;
    if(!canDraw()||!house.visible||reducedMotion.matches){robotTime=null;return;}
    if(robotMode!=='clean'&&robotMode!=='return'){robotTime=null;return;}
    const dt=robotTime===null?0:Math.min((time-robotTime)/1000,.05);robotTime=time;
    const goal=robotMode==='clean'?route[robotRouteIndex]:robotDock;
    const delta=robotDelta.copy(goal).sub(robot.position),length=delta.length();
    if(length<.03){
      if(robotMode==='clean')robotRouteIndex=(robotRouteIndex+1)%route.length;
      else{robot.position.copy(robotDock);robotMode='docked';robotTime=null;document.getElementById('robot-status').textContent='Robot şarj istasyonunda · Şarj oluyor (demo).';frame();return;}
    }else{robot.position.addScaledVector(delta.normalize(),Math.min(length,dt*.85));robot.rotation.y=Math.atan2(delta.x,delta.z);}
    frame();robotAnimation=window.requestAnimationFrame(animateRobot);
  }
  function syncRobotModel(){
    const command=document.querySelector('svg.house').getAttribute('data-robot')||'return';
    robot.visible=command!=='absent';chargingBase.visible=command!=='absent';
    robotLED.material.emissive.set(command==='paused'?'#ff6040':'#6fc8d2');
    if(command===robotMode||(command==='return'&&robotMode==='docked')){resumeRobotAnimation();return;}
    stopRobotAnimation();
    robotMode=command;robotTime=null;
    if(command==='return'&&robot.position.distanceTo(robotDock)<.03){robotMode='docked';document.getElementById('robot-status').textContent='Robot şarj istasyonunda · Şarj oluyor (demo).';}
    else resumeRobotAnimation();
  }
  // Exterior entrance camera, aimed away from the door toward the visitor.
  box(.8,2.25,4.7,.14,.2,.3,charcoal);
  const doorCamera=box(.8,2.25,4.93,.3,.24,.4,porcelain);
  const cameraLens=cylinder(.8,2.25,5.15,.085,.085,.035,charcoal);cameraLens.rotation.x=Math.PI/2;
  const cameraLED=sphere(.9,2.3,5.15,.025,.025,.025,new T.MeshStandardMaterial({color:'#7fc9d8',emissive:'#7fc9d8',emissiveIntensity:.4}));
  deviceLabel('Dış kapı kamerası',.8,2.8,4.95);
  const visitorStart=house.children.length;
  sphere(0,1.55,5.8,.15,.18,.15,mat('#bcab99'));
  box(0,1.08,5.8,.42,.65,.25,teal);
  box(-.12,.48,5.8,.14,.65,.17,charcoal);box(.12,.48,5.8,.14,.65,.17,charcoal);
  const visitorParts=house.children.slice(visitorStart),visitor=new T.Group();visitorParts.forEach(part=>visitor.add(part));house.add(visitor);visitor.visible=false;
  const waterMarkers={};
  for(const [name,x,z] of [['mutfak',-4,2.4],['banyo',3.8,3.5]]){
    const puddle=new T.Mesh(new T.CircleGeometry(.85,40),new T.MeshBasicMaterial({color:'#36bfff',transparent:true,opacity:.65,side:T.DoubleSide,depthWrite:false}));
    puddle.rotation.x=-Math.PI/2;puddle.position.set(x,.14,z);puddle.scale.set(1.15,.65,1);puddle.visible=false;house.add(puddle);waterMarkers[name]=puddle;
    // Floor-mounted leak sensor with a status indicator.
    box(x+.65,.18,z,.18,.10,.18,porcelain);
  }
  // CO and temperature detector housings on the rear wall.
  box(-1.1,1.85,-4.36,.28,.34,.12,porcelain);
  box(1.2,1.85,-4.36,.25,.30,.12,porcelain);
  const roomPositions={salon:[-3,2.2,-2],yatak:[3.6,2.2,-2.2],mutfak:[-4,2.1,2.8],antre:[0,2.1,2.8],banyo:[4,2.1,2.7]};
  for(const [name,pos] of Object.entries(roomPositions)){
    const light=new T.PointLight('#ffc075',18,7,2);light.position.set(...pos);house.add(light);
    const strip=box(pos[0],.16,pos[2],name==='salon'?3:2,.025,.025,new T.MeshStandardMaterial({color:'#efd5a3',emissive:'#ffb34d',emissiveIntensity:1.5}));
    lamps[name]={light,strip};
  }
  // Prebuilt variant groups avoid recreating GPU resources on each selection.
  function variant(build){const start=house.children.length;build();const parts=house.children.slice(start);const group=new T.Group();parts.forEach(p=>group.add(p));house.add(group);group.visible=false;return group;}
  function extraRoom(x,z,y=0,study=false){
    box(x,y-.15,z,3.95,.3,3.8,oak);
    box(x,y+1.1,z-1.85,3.95,2.2,.14,plaster);
    box(x-1.93,y+.85,z,.14,1.7,3.7,plaster);
    box(x+1.93,y+.85,z,.14,1.7,3.7,plaster);
    partition(x,z+1.9,3.95,'x',[{at:1.2,width:.95}],y,1.3);
    if(study){box(x,y+.75,z-1,2,.12,.8,oak);for(const dx of [-.85,.85])box(x+dx,y+.35,z-1,.08,.7,.65,charcoal);box(x,y+1.08,z-1.15,.85,.5,.08,charcoal);box(x,y+.45,z+.1,.65,.15,.65,teal);box(x,y+.8,z+.4,.65,.7,.1,teal);}
    else{box(x,y+.3,z,1.5,.45,2.6,oak);box(x,y+.58,z,1.5,.22,2.55,cream);box(x,y+.74,z+.4,1.52,.12,1.65,teal);box(x,y+.78,z-.85,1.1,.2,.48,cream);}
    cylinder(x+1.3,y+.65,z-1.2,.18,.25,.35,lampGlass('yatak'));
  }
  const annexes=[-4,0,4].map((x,i)=>variant(()=>extraRoom(x,-8.15,0,i===2)));
  const annexHalls=[1,2,3].map(count=>variant(()=>{
    const width=count===3?12.1:8.1,cx=count===3?0:-2;
    box(cx,-.12,-5.45,width,.24,1.7,mat('#c3b29b'));
    box(cx-width/2,1.1,-5.45,.14,2.2,1.7,plaster);box(cx+width/2,1.1,-5.45,.14,2.2,1.7,plaster);
    if(count===1)box(0,1.1,-6.3,3.9,2.2,.14,plaster);
  }));
  const rearClosure=variant(()=>box(0,1.3,-4.6,1.5,2.6,.16,plaster));
  const villaGarden=variant(()=>{
    box(2,-.4,1,20,.2,20,mat('#647950'));
    box(9,-.23,0,5.2,.18,11,mat('#ded3be'));
    box(9,-.10,-.4,3.9,.14,7.6,porcelain);
    box(9,-.015,-.4,3.5,.04,7.2,mat('#3da8c0',.18,.25));
    for(const z of [-2.4,1.2]){box(6.8,.2,z,.85,.3,2.1,cream);box(6.8,.48,z-.65,.85,.12,.8,cream).rotation.x=-.32;}
    for(const x of [-7.5,11.4])for(const z of [-7,5,8])plant(x,z,1.5);
    for(let x=-6;x<6;x+=1.3)box(x,-.2,8,.85,.13,1.4,mat('#ccc6b8'));
    for(const z of [6.6,8.5]){box(0,2.8,z,5.6,.12,.12,oak);for(const x of [-2.8,2.8])box(x,1.4,z,.13,2.8,.13,oak);}
  });
  const duplexUpper=variant(()=>{
    extraRoom(-3,-2.65,3.15);extraRoom(1,-2.65,3.15,true);
    // Stairwell occupies the rear-right bay; the bathroom below remains clear.
    for(let i=0;i<14;i++){
      const top=(i+1)*.225,z=.35-i*.30;box(5.05,top/2,z,1.35,top,.30,oak);
      box(4.34,top+.47,z,.04,.94,.04,charcoal);
    }
    const rail=box(4.34,2.6,-1.6,.055,.055,4.9,brass);rail.rotation.x=.64;
    box(4.45,3.02,-4.05,2.6,.26,.9,oak);
    box(3.45,3.02,-2,1,.26,4.2,oak);
    box(-.65,3.02,-.2,8.8,.26,1.1,oak);
    for(let i=0;i<10;i++)box(-4.9+i*.94,3.7,.37,.04,1.1,.04,charcoal);
    box(-.65,4.25,.37,8.8,.055,.055,brass);
  });
  const office=variant(()=>{
    for(const z of [-3.2,-1.2])for(const x of [2.1,4.6]){
      box(x,.78,z,1.7,.12,.8,oak);for(const dx of [-.7,.7])box(x+dx,.36,z,.07,.72,.65,charcoal);
      box(x,1.14,z-.1,.8,.5,.06,charcoal);box(x,.47,z+.7,.6,.15,.6,teal);box(x,.8,z+.95,.6,.65,.1,teal);
    }
  });
  structureView.add(duplexUpper,.08);
  const transparencyButton=document.createElement('button');transparencyButton.type='button';transparencyButton.id='view-transparent';transparencyButton.className='model-transparency-toggle';transparencyButton.textContent='◫ Şeffaf görünüm';transparencyButton.setAttribute('aria-pressed','false');transparencyButton.title='Duvarları ve üst katı saydamlaştırarak arkadaki odaları görün';host.append(transparencyButton);
  const transparencyStatus=document.createElement('span');transparencyStatus.className='visually-hidden';transparencyStatus.setAttribute('role','status');host.append(transparencyStatus);
  function setTransparent(value){transparentView=!!value;structureView.setEnabled(transparentView);planEditor?.setTransparent(transparentView);transparencyButton.setAttribute('aria-pressed',String(transparentView));transparencyButton.textContent=transparentView?'✓ Şeffaf görünüm':'◫ Şeffaf görünüm';transparencyStatus.textContent=transparentView?'Şeffaf görünüm açık. Duvarların ve üst katın arkasındaki odaları görebilirsiniz.':'Normal görünüm açık.';frame();}
  transparencyButton.addEventListener('click',()=>setTransparent(!transparentView));
  const descriptions={
    '2+1 daire':'Kompakt daire: salon ve iki yatak odası. Ek odalar yatak odası ışık grubuna bağlıdır.',
    '3+1 daire':'Aile dairesi: salon ve üç yatak odası. Ek odalar yatak odası ışık grubuna bağlıdır.',
    '4+1 daire':'Geniş daire: salon, üç yatak odası ve çalışma odası. Ek odalar ortak ışık grubuna bağlıdır.',
    'Villa / müstakil':'Müstakil ev: geniş yerleşim, bahçe, havuz, şezlonglar ve teras. Dış alanlar tanıtım amaçlıdır.',
    'Dubleks':'İki seviyeli örnek: üst katta yatak ve çalışma alanı, bağlantı merdiveni. Üst kat lambaları yatak odası grubuna bağlıdır.',
    'İş yeri':'Ofis yerleşimi: çalışma masaları, ekranlar, ortak salon ve mutfak. Oda kontrolleri ortak ışık gruplarını kullanır.'
  };
  function changeHomeType(type){
    const count=({'2+1 daire':1,'3+1 daire':2,'4+1 daire':3,'Villa / müstakil':3})[type]||0;
    annexes.forEach((g,i)=>g.visible=i<count);annexHalls.forEach((g,i)=>g.visible=i===count-1);rearClosure.visible=count===0;
    villaGarden.visible=type==='Villa / müstakil';duplexUpper.visible=type==='Dubleks';office.visible=type==='İş yeri';
    bedroomObjects.forEach(o=>o.visible=!office.visible&&!duplexUpper.visible);
    terraceObjects.forEach(o=>o.visible=true);
    homeDistance=(villaGarden.visible?42:duplexUpper.visible?27:count?34:27)*Math.max(1,1.05/camera.aspect);
    distance=homeDistance;yaw=.4;elevation=.86;
    target.set(villaGarden.visible?2:0,duplexUpper.visible?1.3:.2,count?-1:.7);
    initialTarget.copy(target);
    document.getElementById('model-description').textContent=(descriptions[type]||'Örnek yerleşim.')+' Hol, kapı geçişleri, WC ve balkon/teras örnek yerleşime dahildir. Gerçek proje ev planınıza göre hazırlanır.';
    sync();
    planEditor?.changeType(type);
  }
  window.addEventListener('home-type-change',e=>changeHomeType(e.detail));
  const ground=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({opacity:.25}));ground.rotation.x=-Math.PI/2;ground.position.y=-.46;ground.receiveShadow=true;scene.add(ground);
  if(window.createHomePlanEditor)planEditor=window.createHomePlanEditor({T,scene,house,camera,canvas:renderer.domElement,render:frame,createTransparency,fit:bounds=>{
    const size=bounds.getSize(new T.Vector3());bounds.getCenter(target);
    initialTarget.copy(target);
    const fov=camera.fov*Math.PI/180;
    homeDistance=Math.max(size.x/Math.max(.3,camera.aspect),size.z,size.y*2)/(2*Math.tan(fov/2))*1.35;
    distance=Math.max(14,homeDistance);camera.far=Math.max(100,distance*3);camera.updateProjectionMatrix();frame();
  }});
  function updateCamera(){
    camera.position.set(target.x+distance*Math.sin(yaw)*Math.cos(elevation),target.y+distance*Math.sin(elevation),target.z+distance*Math.cos(yaw)*Math.cos(elevation));camera.lookAt(target);
  }
  function canDraw(){return !document.hidden&&!contextLost&&viewportVisible;}
  function frame(){
    // Picking and cursor-centred zoom need the current camera before the next paint.
    updateCamera();needsDraw=true;
    if(frameRequest===null&&canDraw())frameRequest=window.requestAnimationFrame(drawFrame);
  }
  function drawFrame(){
    frameRequest=null;if(!needsDraw||!canDraw())return;
    const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;
    needsDraw=false;updateCamera();
    // View-dependent cutaway: walls facing the observer are removed, revealing interior volumes.
    walls.forEach(w=>w.group.visible=transparentView||w.nx*Math.sin(yaw)+w.nz*Math.cos(yaw)<.18);
    planEditor?.view(yaw);
    structureView.refresh();
    renderer.render(scene,camera);
    const labelsOn=house.visible&&width>=240;
    // Text is fixed. Measure all labels together only after a viewport/font change.
    if(labelsOn&&labelMetricsDirty){for(const {node} of deviceLabels)node.hidden=false;for(const label of deviceLabels){label.width=label.node.offsetWidth;label.height=label.node.offsetHeight;}labelMetricsDirty=false;}
    // Çakışan etiketlerden listede sonra geleni gizlenir (öncelik: dizideki sıra). Model döndürülünce
    // ya da yakınlaştırılınca gizlenen etiket yeniden görünür.
    const placed=[];
    for(const {node,anchor,width:labelWidth,height:labelHeight} of deviceLabels){
      if(!labelsOn){node.hidden=true;continue;}
      const p=anchor.getWorldPosition(_labelPos).project(camera);
      if(p.z<-1||p.z>1||Math.abs(p.x)>1||Math.abs(p.y)>1){node.hidden=true;continue;}
      const x=(p.x+1)*width/2,y=(1-p.y)*height/2;
      node.style.left=x.toFixed(1)+'px';node.style.top=y.toFixed(1)+'px';node.hidden=false;
      const box={l:x-labelWidth/2-3,r:x+labelWidth/2+3,t:y-labelHeight-3,b:y+3};
      if(placed.some(o=>box.l<o.r&&box.r>o.l&&box.t<o.b&&box.b>o.t))node.hidden=true;else placed.push(box);
    }
    positionTip();
    for(const {node,object} of showroomMarkers){
      const p=object.getWorldPosition(_labelPos).project(camera);
      node.hidden=!house.visible||p.z < -1||p.z > 1||Math.abs(p.x)>1||Math.abs(p.y)>1;
      const margin=Math.min(width/2,node.offsetWidth/2+8);
      node.style.left=Math.max(margin,Math.min(width-margin,(p.x+1)*width/2))+'px';
      node.style.top=Math.max(32,(1-p.y)*height/2)+'px';
    }
  }
  window.addEventListener('showroom-highlight',e=>{
    showroomMarkers.splice(0).forEach(({node})=>node.remove());
    const items={sabah:[[lamps.yatak.light,'Yatak odası · %20 ışık']],film:[[lamps.salon.light,'Salon · %15 ışık']],cikis:[[lamps.salon.light,'Evden çıkış · ışıklar kapalı']],su:[[waterMarkers.mutfak,'Mutfak · kaçak uyarısı']]};
    for(const [object,label] of items[e.detail]||[]){const node=document.createElement('span');node.className='showroom-marker';node.textContent=label;host.append(node);showroomMarkers.push({node,object});}
    frame();
  });
  function sync(){
    visitor.visible=document.querySelector('svg.house').getAttribute('data-visitor')==='true';
    cameraLED.material.emissive.set(visitor.visible?'#ff5848':'#7fc9d8');cameraLED.material.emissiveIntensity=visitor.visible?2:.4;
    syncRobotModel();
    const audio=document.querySelector('svg.house').getAttribute('data-audio')||'off';
    speakerRing.material.emissive.set(audio==='alarm'?'#ff5040':'#55c8ff');speakerRing.material.emissiveIntensity=audio==='off'?0:2;
    for(const {id,led} of sensorLEDs){const active=document.getElementById(id)?.dataset.alert==='true';led.material.emissive.set(active?'#ff5040':'#75c4cf');led.material.emissiveIntensity=active?2:.3;}
    if(panelContext){
      const ctx=panelContext;ctx.fillStyle='#172234';ctx.fillRect(0,0,512,320);ctx.fillStyle='#eebd6d';ctx.font='bold 25px sans-serif';ctx.fillText('TRAKSWELL HOME',24,40);
      ctx.fillStyle='#ffffff';ctx.font='bold 31px sans-serif';ctx.fillText(document.getElementById('panel-scene')?.textContent||'Ev kontrolü',24,100,460);
      ctx.font='23px sans-serif';ctx.fillStyle='#b9ccdf';ctx.fillText('Isıtma: '+document.getElementById('panel-climate').textContent,24,155,460);ctx.fillText('Alarm: '+document.getElementById('panel-alarm').textContent,24,200,460);ctx.fillText('Ses: '+document.getElementById('panel-audio').textContent,24,245,460);
      panelTexture.needsUpdate=true;
    }
    const wet=(document.querySelector('svg.house').getAttribute('data-water')||'').split(',');
    for(const [room,marker] of Object.entries(waterMarkers))marker.visible=wet.includes(room);
    for(const [name,{light,strip}] of Object.entries(lamps)){
      const node=document.querySelector('#r-'+name+' .glow');const value=Number(node?.style.opacity||0);
      const alarm=document.getElementById('r-'+name).classList.contains('alarm');
      light.intensity=value*28;light.color.set(alarm?'#ff4840':'#ffc075');strip.material.emissive.set(alarm?'#ff4840':'#ffb34d');strip.material.emissiveIntensity=value*3;
      for(const material of fixtureMaterials[name] || []){
        material.emissive.set(alarm?'#ff4840':'#ffc075');
        material.emissiveIntensity=value*3.5;
        material.color.set(value>0?'#fff0ce':'#b9b3a7');
      }
    }
    for(const [name,id] of [['salon','cs1'],['yatak','cy1']]){
      const ratio=Number(document.getElementById(id).getAttribute('width'))/(name==='salon'?75:60);
      const data=curtains[name];for(const {g} of data.pair)g.scale.x=.16+ratio*(data.w/2/.96-.16);
    }
    tvScreens.forEach(s=>s.material.emissiveIntensity=document.getElementById('d-tv').classList.contains('act')?.8:0);
    planEditor?.sync();
    frame();
  }
  new MutationObserver(sync).observe(document.querySelector('svg.house'),{subtree:true,attributes:true,attributeFilter:['style','class','width','data-water','data-scene','data-audio','data-robot','data-visitor']});
  function refreshVisibility(){
    if(!canDraw()){if(frameRequest!==null)window.cancelAnimationFrame(frameRequest);frameRequest=null;stopRobotAnimation();return;}
    frame();resumeRobotAnimation();
  }
  document.addEventListener('visibilitychange',refreshVisibility);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{viewportVisible=entries[0].isIntersecting;refreshVisibility();},{rootMargin:'80px',threshold:0}).observe(host);
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)stopRobotAnimation();else resumeRobotAnimation();});
  window.addEventListener('plan-changed',()=>{if(house.visible)resumeRobotAnimation();else stopRobotAnimation();});
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;const oldScale=Math.max(1,1.05/camera.aspect);
    // Tarayıcı yakınlaştırması veya tam ekran değişince yoğunluk yeniden hesaplanır.
    const pixelRatio=pixelRatioFor(w,h);
    if(w===lastWidth&&h===lastHeight&&pixelRatio===lastPixelRatio)return;
    if(pixelRatio!==lastPixelRatio)renderer.setPixelRatio(pixelRatio);renderer.setSize(w,h,false);lastWidth=w;lastHeight=h;lastPixelRatio=pixelRatio;labelMetricsDirty=true;camera.aspect=w/h;const ratio=Math.max(1,1.05/camera.aspect)/oldScale;distance*=ratio;homeDistance*=ratio;camera.far=Math.max(100,distance*3);camera.updateProjectionMatrix();frame();}
  new ResizeObserver(resize).observe(host);
  window.addEventListener('resize',resize);
  coarsePointer.addEventListener('change',resize);
  document.fonts?.ready.then(()=>{labelMetricsDirty=true;frame();});
  const canvas=renderer.domElement;
  const zoomRay=new T.Raycaster();
  function zoom(factor,event){
    const next=T.MathUtils.clamp(distance*factor,2.5,Math.max(80,homeDistance*2));
    if(next===distance)return;
    let before=null,mouse=null;
    const plane=new T.Plane(new T.Vector3(0,1,0),-target.y);
    if(event){
      const rect=canvas.getBoundingClientRect();
      if(rect.width>0&&rect.height>0){
        mouse=new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
        camera.updateMatrixWorld();zoomRay.setFromCamera(mouse,camera);
        before=zoomRay.ray.intersectPlane(plane,new T.Vector3());
      }
    }
    distance=next;camera.far=Math.max(100,distance*3);camera.updateProjectionMatrix();frame();
    if(before&&mouse){
      camera.updateMatrixWorld();zoomRay.setFromCamera(mouse,camera);
      const after=zoomRay.ray.intersectPlane(plane,new T.Vector3());
      if(after){target.add(before.sub(after));frame();}
    }
  }
  const wheelHint=document.createElement('div');wheelHint.className='wheel-hint';wheelHint.setAttribute('aria-hidden','true');
  wheelHint.textContent=(/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?'⌘':'Ctrl')+' + tekerlek ile yakınlaştırın · Tam ekranda serbest';
  host.append(wheelHint);let wheelHintTimer=null;
  function showWheelHint(){wheelHint.classList.add('is-visible');clearTimeout(wheelHintTimer);wheelHintTimer=setTimeout(()=>wheelHint.classList.remove('is-visible'),1600);}
  // Dinleyici kapsayıcıda: imleç etiketin üstündeyken de aynı davranış geçerli.
  host.addEventListener('wheel',event=>{
    // Sayfa içinde tekerlek sayfayı kaydırır; model yalnızca bilinçli hareketle yakınlaşır.
    if(!isStudio()&&!event.ctrlKey&&!event.metaKey){showWheelHint();return;}
    event.preventDefault();
    const unit=event.deltaMode===1?16:event.deltaMode===2?host.clientHeight:1;
    zoom(Math.exp(T.MathUtils.clamp(event.deltaY*unit,-150,150)*.002),event);
  },{passive:false});
  const panelRay=new T.Raycaster();
  function hitsPanel(event){
    if(!house.visible)return false;
    const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return false;
    camera.updateMatrixWorld();house.updateMatrixWorld(true);
    panelRay.setFromCamera(new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
    return panelRay.intersectObjects(panelTargets,false).length>0;
  }
  // Etkin işaretçiler: bir parmak/fare döndürür, iki parmak yakınlaştırır.
  const pointers=new Map();
  let drag=null, clickStart=null, moved=false, pinch=null,planDragging=false;
  function pinchState(){const [a,b]=[...pointers.values()];return {distance:Math.hypot(a.x-b.x,a.y-b.y),clientX:(a.x+b.x)/2,clientY:(a.y+b.y)/2};}
  canvas.addEventListener('pointerdown',e=>{
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    // Etkin olmayan bir işaretçi için yakalama hata fırlatır; hareket yine de işlenmeli.
    try{canvas.setPointerCapture(e.pointerId);}catch{}
    if(pointers.size===1){
      if(planEditor?.beginDrag(e)){planDragging=true;drag=null;clickStart=null;moved=true;pinch=null;return;}
      drag={x:e.clientX,y:e.clientY};clickStart={...drag};moved=false;pinch=null;
    }
    else if(pointers.size===2){if(planDragging){planEditor?.endDrag(true);planDragging=false;}pinch=pinchState();drag=null;clickStart=null;moved=true;}
  });
  canvas.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId)){canvas.style.cursor=hitsPanel(e)?'pointer':'grab';return;}
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(planDragging){planEditor?.drag(e);return;}
    if(pinch&&pointers.size>=2){const next=pinchState();if(next.distance>0&&pinch.distance>0)zoom(pinch.distance/next.distance,next);pinch=next;return;}
    if(!drag)return;
    if(clickStart&&Math.hypot(e.clientX-clickStart.x,e.clientY-clickStart.y)>=5)moved=true;
    yaw-=(e.clientX-drag.x)*.007;elevation=T.MathUtils.clamp(elevation+(e.clientY-drag.y)*.004,.45,1.35);drag={x:e.clientX,y:e.clientY};frame();
  });
  function releasePointer(e,isUp){
    if(!pointers.has(e.pointerId))return;
    pointers.delete(e.pointerId);
    if(planDragging){planEditor?.endDrag(!isUp);planDragging=false;}
    if(isUp&&pointers.size===0&&clickStart&&!moved){if(hitsPanel(e))window.dispatchEvent(new CustomEvent('open-wall-panel'));else planEditor?.pick(e);}
    if(pointers.size<2)pinch=null;
    if(pointers.size===1){const p=[...pointers.values()][0];drag={x:p.x,y:p.y};clickStart=null;}
    if(pointers.size===0){drag=null;clickStart=null;}
  }
  canvas.addEventListener('pointerup',e=>releasePointer(e,true));
  for(const event of ['pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>releasePointer(e,false));
  document.getElementById('view-left').addEventListener('click',()=>{yaw-=.3;frame();});
  document.getElementById('view-right').addEventListener('click',()=>{yaw+=.3;frame();});
  document.getElementById('view-zoom').addEventListener('click',()=>zoom(.75));
  document.getElementById('view-zoom-out').addEventListener('click',()=>zoom(1/.75));
  document.getElementById('view-reset').addEventListener('click',()=>{yaw=.4;elevation=.86;distance=homeDistance;target.copy(initialTarget);frame();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;refreshVisibility();status.textContent='3B görüntü bağlantısı kesildi. Kumanda paneli kullanılabilir; görüntü geri geldiğinde yenilenir.';});
  canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;labelMetricsDirty=true;status.textContent='3B görünüm yeniden hazır.';refreshVisibility();});
  status.textContent='Fare tekerleği: imlecin olduğu yere yaklaş / uzaklaş · Sürükle: döndür · İlk görünüm: sıfırla';
  changeHomeType(document.getElementById('model-type').value);resize();sync();
})();
