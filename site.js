
const S={
  sabah:{n:"Günaydın",t:"07:00",if:"Hafta içi saat 07:00",L:{yatak:.2,mutfak:.15},cur:{salon:0,yatak:0},ac:null,dev:{tv:"off"},k:{kombi:"22,0 °C",alarm:"Kapalı",priz:"Açık",w:"340 W"},
    then:["Yatak odası ışığı %20 loş açıldı","Perdeler açıldı","Kombi 22 °C konfor moduna geçti","Mutfak ışığı %15 loş açıldı","Akıllı hoparlör kişiye özel günaydın karşılaması yapar"]},
  cikis:{n:"Evden çıkış",t:"08:15",if:"Evdeki son telefon evden uzaklaştı",L:{},cur:{salon:0,yatak:0},ac:null,dev:{tv:"off",kapi:"act",hareket:"act"},k:{kombi:"18,0 °C",alarm:"Kurulu",priz:"Kapalı",w:"45 W"},
    then:["Tüm ışıklar söndü","Ütü ve TV prizleri kapandı","Kombi 18 °C ekonomi moduna indi","Alarm kuruldu, kapı ve hareket izleniyor"]},
  donus:{n:"Eve dönüş",t:"18:42",if:"Varış zamanına göre eve dönüş hazırlığı",L:{salon:1,antre:1,mutfak:.6},cur:{salon:0,yatak:0},ac:null,dev:{tv:"off",kapi:"act"},k:{kombi:"22,5 °C",alarm:"Kapalı",priz:"Açık",w:"410 W"},
    then:["Kombi ısıtmaya başladı","Telefona alarmı kapatma hatırlatması gönderildi; alarm konuma göre kendiliğinden kapanmaz","Alarm, kullanıcı uygulamadan onaylayınca kapatıldı","Kapı açıldı, antre ve salon ışığı yandı"]},
  film:{n:"Film gecesi",t:"21:00",if:"Uygulamada \"Film\" seçildi",L:{salon:.15},cur:{salon:1,yatak:0},ac:null,dev:{tv:"act"},k:{kombi:"22,0 °C",alarm:"Kapalı",priz:"TV açık",w:"230 W"},
    then:["Salon ışığı %15'e kısıldı","Salon perdesi kapandı","TV prizi açıldı"]},
  gece:{n:"İyi geceler",t:"23:30",if:"Yatak başındaki butona basıldı",L:{},cur:{salon:1,yatak:1},ac:null,dev:{tv:"off",kapi:"act"},k:{kombi:"19,5 °C",alarm:"Gece",priz:"Kapalı",w:"60 W"},
    then:["Tüm ışıklar ve TV prizi kapandı","Perdeler kapandı","Kombi 19,5 °C gece moduna indi","Alarm gece moduna geçti"]},
  kalk:{n:"Gece kalkınca",t:"03:12",if:"Antrede hareket (23:00–06:00 arası)",L:{antre:.2,banyo:.2},cur:{salon:1,yatak:1},ac:null,dev:{tv:"off",hareket:"act"},k:{kombi:"19,5 °C",alarm:"Gece",priz:"Kapalı",w:"70 W"},
    then:["Antre ve banyo ışığı %20 yandı","2 dakika hareket olmazsa kendiliğinden sönecek"]},
  nem:{n:"Banyo nemi",t:"07:25",if:"Banyoda nem %70'i geçti",L:{banyo:1,yatak:.4},cur:{salon:0,yatak:0},ac:null,fan:1,nem:"%74",dev:{tv:"off",nem:"act"},k:{kombi:"22,0 °C",alarm:"Kapalı",priz:"Açık",w:"380 W"},
    then:["Aspiratör çalıştı","Nem normale dönünce gecikmeli durur; azami çalışma süresi cihaz ve ortam için ayrıca belirlenir"]},
  yaz:{n:"Yaz akşamı",t:"17:50",if:"Ev 26 °C'yi geçti ve eve dönülüyor",L:{},cur:{salon:1,yatak:0},ac:"24°",dev:{tv:"off"},k:{kombi:"Kapalı",klima:"24 °C",alarm:"Kurulu",priz:"Açık",w:"1,1 kW"},
    then:["Klima 24 °C'de çalışmaya başladı","Güneş alan salon perdesi kapandı"]},
  pencere:{n:"Pencere açık",t:"14:05",if:"Salon penceresi 2 dakikadır açık",L:{},cur:{salon:0,yatak:0},ac:null,dev:{tv:"off",pencere:"act"},k:{kombi:"Beklemede",alarm:"Kapalı",priz:"Açık",w:"95 W"},
    then:["Kombi beklemeye alındı","Pencere kapanınca ısıtma kaldığı yerden devam edecek","Bildirim: Salon penceresi açık"]},
  su:{n:"Su baskını",alert:1,t:"10:30",if:"Mutfakta su algılandı",L:{mutfak:1},alarmRoom:"mutfak",cur:{salon:0,yatak:0},ac:null,dev:{tv:"off",su:"alarm"},k:{kombi:"22,0 °C",alarm:"SU!",priz:"Kesildi",w:"120 W"},
    then:["Telefona acil bildirim gitti, siren çaldı","Ana su vanası kapandı","Bulaşık makinesi prizi kesildi"]},
  duman:{n:"Duman",alert:1,t:"19:05",if:"Yatak odasında duman algılandı",L:{salon:1,yatak:1,mutfak:1,antre:1,banyo:1},alarmRoom:"yatak",cur:{salon:0,yatak:0},ac:null,dev:{tv:"off",duman:"alarm"},k:{kombi:"22,0 °C",alarm:"DUMAN!",priz:"Açık",w:"520 W"},
    then:["Tüm ışıklar tam açıldı, kaçış yolu aydınlandı","Klima ve aspiratör durduruldu","Evdeki herkese bildirim gitti"]},
  tatil:{n:"Tatil",t:"20:10",if:"Tatil modu açık",L:{salon:1},cur:{salon:1,yatak:1},ac:null,dev:{tv:"off",kapi:"act"},k:{kombi:"16,0 °C",alarm:"Kurulu",priz:"Kapalı",w:"120 W"},
    then:["Salon ışığı rastgele bir saatte yandı","Perdeler akşam kapandı","Kombi 16 °C örnek tatil ayarında; donma koruması cihaz ayarına bağlı","Kapı izleniyor, bildirim açık"]}
};

// Independent emergency demos; no live equipment is connected.
const emergencyBase={alert:1,t:'10:30',L:{salon:1,yatak:1,mutfak:1,antre:1,banyo:1},cur:{salon:0,yatak:0},ac:null,dev:{tv:'off'},k:{kombi:'Kapalı',alarm:'ACİL',priz:'Seçili kapalı',w:'—'}};
function emergency(n,condition,safety,then,extra={}){return {...emergencyBase,n,if:condition,safety,then,...extra};}
S.su=emergency('Su · iki oda','Mutfak ve banyoda su algılandı',{water:'Kapalı · doğrulandı',wet:['mutfak','banyo']},['Mutfak ve banyo su sensörleri alarm verdi','Ana kullanım suyu vanası kapandı; konum geri bildirimi alındı','Kullanıcıya iki odanın bilgisi iletildi','Kontrol sonrası vana yetkili kişi tarafından yeniden açılmalı'],{alarmRooms:['mutfak','banyo']});
S.su_mutfak=emergency('Su · mutfak','Mutfak su sensörü tetiklendi',{water:'Kapalı · doğrulandı',wet:['mutfak']},['Mutfak planda işaretlendi','Ana kullanım suyu vanası kapandı','Kullanıcıya su kaçağı uyarısı iletildi'],{alarmRooms:['mutfak']});
S.su_banyo=emergency('Su · banyo','Banyo su sensörü tetiklendi',{water:'Kapalı · doğrulandı',wet:['banyo']},['Banyo planda işaretlendi','Ana kullanım suyu vanası kapandı','Kullanıcıya su kaçağı uyarısı iletildi'],{alarmRooms:['banyo']});
S.duman=emergency('Yangın','Sertifikalı duman alarmı tetiklendi',{gas:'Kapalı · doğrulandı',lock:'Serbest · doğrulandı',heat:'Isı alarmı',fire:true},['Sesli yangın alarmı ve tahliye bildirimi etkin','Gaz kesme vanası kapandı; konum doğrulandı','Kaçış aydınlatması açıldı; uygun çıkış kilitleri serbest bırakıldı','Klima/aspiratör acil durum projesine göre durduruldu'],{alarmRooms:['yatak'],dev:{tv:'off',duman:'alarm'}});
S.isi=emergency('Isı alarmı','Uygun ısı dedektörü alarm verdi',{gas:'Kapalı · doğrulandı',lock:'Serbest · doğrulandı',heat:'Isı alarmı',fire:true},['Duman veya CO onayı beklenmeden alarm oluşturuldu','Gaz vanası kapandı; çıkış kilidi serbest bırakıldı','Kaçış aydınlatması ve tahliye bildirimi etkin'],{alarmRooms:['mutfak']});
S.co=emergency('CO alarmı','Sertifikalı CO alarmı tetiklendi',{gas:'Kapalı · doğrulandı',lock:'Serbest · doğrulandı',co:'CO alarmı'},['Yerel CO alarmı ve tahliye bildirimi etkin','Projelendirilmiş gaz kesme adımı uygulandı','Uyumlu çıkış kilidi serbest bırakıldı','CO alarmı tek başına yangın olarak sınıflandırılmadı'],{alarmRooms:['salon']});
S.sarsinti=emergency('Sarsıntı','Doğrulanmış sismik alarm girişi (örnek)',{gas:'Kapalı · doğrulandı',lock:'Serbest · doğrulandı',vibration:'Sismik alarm'},['Gaz vanası kapandı; durum doğrulandı','Acil durum planındaki çıkış kilitleri serbest bırakıldı','Kaçış aydınlatması açıldı; uyarı iletildi','Genel titreşim sensörü tek başına bu doğrulamayı sağlamaz']);
S.sensor=emergency('Sensör çevrimdışı','Banyo su sensöründen durum alınamıyor',{bath:'Bilinmiyor · çevrimdışı'},['Sensör durumu kuru kabul edilmedi','Bakım uyarısı: banyo su sensörü bağlantısını kontrol edin'],{alert:0});
S.vana=emergency('Vana arızası','Su kaçağı var; vana kapanma onayı gelmedi',{water:'Kapanma doğrulanamadı',wet:['mutfak']},['Kapatma komutu gönderildi fakat kapalı bilgisi alınamadı','Su akışı kesilmiş varsayılmadı','Kullanıcıya acil yerinde kontrol uyarısı iletildi'],{alarmRooms:['mutfak']});

function departureWarnings({occupancy,door,iron,feedback='confirmed'}){
 if(occupancy==='occupied')return [];
 const warnings=[];
 if(door==='open')warnings.push('Dış kapı açık kaldı. Kapının kapanmasını kontrol edin.');
 if(door==='unknown')warnings.push('Dış kapı sensörüne erişilemiyor; kapının kapalı olduğu doğrulanamadı.');
 if(iron==='consuming'||iron==='on')warnings.push(feedback==='confirmed'?'Ütü prizine kapatma komutu gönderildi. Kapalı geri bildirimi alındı; priz çıkışına enerji kesildi (demo).':'Ütü prizine kapatma komutu gönderildi ancak kapanma doğrulanamadı. Enerjinin kesildiğini varsaymayın; yerinde kontrol gerekiyor.');
 if(iron==='unknown')warnings.push('Ütü prizine erişilemiyor; kapatma ve enerji kesilmesi doğrulanamadı. Yerinde kontrol gerekiyor.');
 return warnings;
}
function departureScene(input){
 const warnings=departureWarnings(input),empty=input.occupancy==='empty';
 const cut=empty&&['on','consuming'].includes(input.iron)&&(input.feedback||'confirmed')==='confirmed';
 const uncertain=input.iron==='unknown'||(empty&&['on','consuming'].includes(input.iron)&&input.feedback==='failed');
 const socket=cut||input.iron==='off'?'Ütü kapalı':uncertain?'Doğrulanamadı':'Ütü açık';
 return {...S.cikis,n:'Çıkış kontrolü',if:empty?'Evdeki son kişi ayrıldı':'Evde başka biri var',alert:warnings.length?1:0,safety:{lock:'Kilit durumu bağımsız'},
 dev:{tv:'off',kapi:input.door==='open'?'alarm':''},
 k:{...S.cikis.k,alarm:input.door==='open'?'Kapı açık':'Kontrol',priz:socket,w:'—'},
 then:warnings.length?[...warnings,'İşlem sonucu telefon uygulamasına iletildi (demo).','Ütü prizi otomatik yeniden açılmaz.']:['Son kişi ayrılma koşulu yoksa otomatik priz kapatma uygulanmaz.','Ev boş ve kapı/priz durumları uygunsa risk uyarısı oluşturulmaz.']};
}
S.cikis_kapi=departureScene({occupancy:'empty',door:'open',iron:'off'});S.cikis_kapi.n='Çıkış · kapı açık';
S.cikis_utu=departureScene({occupancy:'empty',door:'closed',iron:'consuming'});S.cikis_utu.n='Çıkış · ütü prizi';
S.ayrilis=departureScene({occupancy:'empty',door:'open',iron:'consuming'});S.ayrilis.n='Çıkış kontrolü';

S.ziyaretci={...S.donus,n:'Kapıda ziyaretçi',t:'14:25',if:'Dış kapı kamerası kişi algıladı',safety:{},then:['Dış kapıda kişi algılandı.','Telefon uygulamasına kamera bildirimi gönderildi (demo).','4 saniyelik örnek olay kaydı başlatıldı.','Kapı kilidi açılmadı; ziyaretçi bildirimi kilit açma komutu değildir.']};
const phoneMessages={
 ziyaretci:['Dış kapı · Birisi geldi','Kamera kişi algıladı. Örnek olay kaydı başlatıldı. Kamera bölümünden simüle edilmiş kaydı inceleyebilirsiniz; kapı kilidi değiştirilmedi.'],
 cikis_kapi:["Evden çıktınız · Kapı açık","Dış kapı açık kaldı. Kapının kapandığı doğrulanamadı; kontrol edin."],
 cikis_utu:["Evden çıktınız · Ütü prizi","Evden çıkışta ütü prizi kapatıldı ve kapalı geri bildirimi alındı. Priz çıkışına enerji kesildi (demo); otomatik yeniden açılmayacak."],
 ayrilis:["Evden çıkış kontrolü","Dış kapı açık kaldı. Ütü prizi kapatıldı; kapalı geri bildirimi alındı. Kapıyı kontrol edin."],
 su:['Su kaçağı · Mutfak ve banyo','İki odada su algılandı. Ana kullanım suyu vanasının kapandığı doğrulandı. Kaçak noktalarını kontrol ettirin.'],
 su_mutfak:['Su kaçağı · Mutfak','Mutfakta su algılandı. Ana su vanasının kapandığı doğrulandı.'],
 su_banyo:['Su kaçağı · Banyo','Banyoda su algılandı. Ana su vanasının kapandığı doğrulandı.'],
 duman:['Yangın alarmı · Yatak odası','Duman alarmı etkin. Gaz vanası kapandı, çıkış kilitleri serbest bırakıldı ve kaçış aydınlatması açıldı.'],
 isi:['Isı alarmı · Mutfak','Isı dedektörü alarm verdi. Gaz vanası kapandı, çıkış kilitleri serbest bırakıldı ve kaçış aydınlatması açıldı.'],
 co:['CO alarmı · Salon','CO alarmı etkin. Projelendirilmiş gaz kesme adımı uygulandı, çıkış kilidi serbest bırakıldı. Tahliye uyarısı etkin.'],
 sarsinti:['Doğrulanmış sismik alarm','Gaz vanası kapandı; acil durum planındaki çıkış kilitleri serbest bırakıldı ve aydınlatma açıldı.'],
 sensor:['Sensör bağlantısı kesildi · Banyo','Su sensörünün durumu bilinmiyor. Banyo kuru kabul edilmedi. Sensör bağlantısını kontrol ettirin.'],
 vana:['Acil kontrol · Su vanası','Mutfakta su kaçağı algılandı. Kapatma komutu gönderildi ancak vana kapanması doğrulanamadı. Yerinde kontrol gerekiyor.']
};
for(const [key,msg] of Object.entries(phoneMessages))S[key].then.push('Telefon bildirimi: '+msg[0]+' — '+msg[1]);
let currentPhoneEvent=null;
function renderPhoneNotification(s,message){
 const push=document.getElementById('phone-alert');
 document.getElementById('phone-app').hidden=true;document.getElementById('phone-lockscreen').hidden=false;
 document.getElementById('phone-clock').textContent=s.t;document.getElementById('phone-large-clock').textContent=s.t;
 push.hidden=!message;document.getElementById('phone-idle').hidden=!!message;document.getElementById('phone-replay').disabled=!message;
 currentPhoneEvent=message?{s,message}:null;
 if(!message){document.getElementById('phone-announcement').textContent='';return;}
 document.getElementById('phone-alert-title').textContent=message[0];document.getElementById('phone-alert-body').textContent=message[1];
 document.getElementById('phone-event-title').textContent=message[0];document.getElementById('phone-event-summary').textContent=s.if;
 const list=document.getElementById('phone-actions');list.textContent='';s.then.filter(x=>!x.startsWith('Telefon bildirimi:')).forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});
 document.getElementById('phone-read').textContent='Gördüm';document.getElementById('phone-read').disabled=false;
 document.getElementById('phone-announcement').textContent='Demo uygulama bildirimi: '+message[0];
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&push.animate)push.animate([{opacity:0,transform:'translateY(-12px)'},{opacity:1,transform:'translateY(0)'}],{duration:350});
 window.dispatchEvent(new CustomEvent('demo-phone-notification'));
}

function syncSafety(s){
 const key=Object.keys(S).find(k=>S[k]===s),message=phoneMessages[key];
 renderPhoneNotification(s,message);
const v=s.safety||{};const wet=v.wet||[];
 const fields={'safe-lock':v.lock||'Normal kullanım','safe-gas':v.gas||'Açık (demo)','safe-water':v.water||'Açık (demo)','sensor-kitchen':wet.includes('mutfak')?'Su algılandı':'Kuru','sensor-bath':v.bath||(wet.includes('banyo')?'Su algılandı':'Kuru'),'sensor-co':v.co||'Normal','sensor-heat':v.heat||'Normal','sensor-vibration':v.vibration||'Normal'};
 for(const [id,value] of Object.entries(fields)){const e=document.getElementById(id);e.textContent=value;e.dataset.alert=String(!['Normal','Kuru','Normal kullanım','Açık (demo)'].includes(value));}
 document.querySelector('svg.house').setAttribute('data-water',wet.join(','));
 document.getElementById('safety-message').textContent=s.safety?s.if+' · Tüm işlem ve doğrulamalar simülasyondur.':'Bağımsız örnek senaryo. Gerçek olay sonrası vanalar otomatik yeniden açılmaz.';
}


// Örnek kural: hedef ile başlama eşiği arasında 2 K fark (ölü bant) bırakılır.
// Hedefin hemen üstünde/altında başlatmak, gerçek cihazda sık aç-kapaya yol açar.
const CLIMATE_RULE={summer:{target:24,start:26},winter:{target:22,start:20}};
function evaluateClimateRule({season,location,time,start,end,temperature,windowState}){
 const minutes=value=>{if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(value))return NaN;const [h,m]=value.split(':').map(Number);return h*60+m;};
 const now=minutes(time),from=minutes(start),until=minutes(end);
 if(![now,from,until,temperature].every(Number.isFinite)||temperature<5||temperature>40||from===until)throw new Error('Saatleri ve 5–40 °C aralığındaki sıcaklığı kontrol edin. Başlangıç ve bitiş farklı olmalı.');
 const scheduled=from<until?now>=from&&now<until:now>=from||now<until;
 let reason,mode='idle';
 if(windowState==='open')reason='Pencere açık: ısıtma ve soğutma beklemede.';
 else if(location==='away')reason='Ev boş: konfor ısıtması ve soğutması beklemede.';
 else if(!scheduled)reason='Seçilen saat programın dışında: cihazlar beklemede.';
 else if(season==='summer'&&temperature>CLIMATE_RULE.summer.start){mode='cool';reason='Yaz, evde olma/eve yaklaşma ve program koşulları sağlandı; oda '+CLIMATE_RULE.summer.start+' °C başlama eşiğinin üstünde. Klima '+CLIMATE_RULE.summer.target+' °C hedefine geçti ve hedefe ulaşınca durur.';}
 else if(season==='winter'&&temperature<CLIMATE_RULE.winter.start){mode='heat';reason='Kış, evde olma/eve yaklaşma ve program koşulları sağlandı; oda '+CLIMATE_RULE.winter.start+' °C başlama eşiğinin altında. Kombi '+CLIMATE_RULE.winter.target+' °C hedefine geçti ve hedefe ulaşınca durur.';}
 else if(season==='mild')reason='Geçiş mevsimi: bu örnek programda ısıtma ve soğutma beklemede.';
 else reason='Oda sıcaklığı başlama eşiğine ulaşmadı (yaz: '+CLIMATE_RULE.summer.start+' °C üstü, kış: '+CLIMATE_RULE.winter.start+' °C altı). Cihaz gereksiz yere çalıştırılmadı.';
 return {mode,reason,scheduled};
}
S.iklim={...S.yaz,n:'Konum ve saat',if:'Koşulları Otomasyon sekmesinden ayarlayın',then:['Yazın soğutma, kışın ısıtma; konum, saat ve sıcaklık birlikte değerlendirilir.']};

const $=id=>document.getElementById(id);
const ORDER=Object.keys(S), ROOMS=["salon","yatak","mutfak","antre","banyo"], DEVS=["pencere","tv","duman","su","kapi","hareket","nem"];
const chips=$('chips');
ORDER.forEach(k=>{const b=document.createElement('button');b.type='button';b.className='chip'+(S[k].alert?' alert':'');b.dataset.s=k;b.textContent=S[k].n;b.setAttribute('aria-pressed','false');chips.append(b);});
function curtain(a,b,closed,x0,x1){const w=Math.max(0,Math.min(1,Number(closed)))*(x1-x0)/2;$(a).setAttribute('width',w);$(b).setAttribute('width',w);$(b).setAttribute('x',x1-w);}
function run(k){
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  const s=S[k];
  if(k==='sabah')s.then[4]=greetingText();
  syncRoomButtons(s.L);
  syncRemote(s);
  syncSafety(s);
  syncWallPanel(s,k);
  syncRobot(s,k);
  syncCamera(k);
  chips.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s===k)));
  ROOMS.forEach(r=>{const g=$('r-'+r),v=s.L[r]||0;g.classList.toggle('on',v>0);g.classList.toggle('alarm',(s.alarmRoom===r||(s.alarmRooms||[]).includes(r)));
    g.querySelector('.glow').style.opacity=v;g.querySelector('.bulb').style.fill=v?(s.alarmRoom===r?'#FF8A82':'#F2C062'):'';});
  curtain('cs1','cs2',s.cur.salon,70,220);curtain('cy1','cy2',s.cur.yatak,350,470);
  $('ac').classList.toggle('ac-on',!!s.ac);$('ac-t').textContent=s.ac?'KLİMA '+s.ac:'KLİMA';
  $('fan').classList.toggle('fan-on',!!s.fan);$('nem-t').textContent='NEM '+(s.nem||'%52');
  DEVS.forEach(d=>{const g=$('d-'+d),st=s.dev[d]||'';g.classList.remove('act','alarm','off');if(st)g.classList.add(st);});
  $('k-kombi').textContent=s.k.kombi;$('k-klima').textContent=s.k.klima||'Kapalı';
  $('k-alarm').textContent=s.k.alarm;$('k-alarm').className=s.alert?'warn':'';
  $('k-perde').textContent=(s.cur.salon&&s.cur.yatak)?'Kapalı':(s.cur.salon||s.cur.yatak)?'Kısmen':'Açık';
  $('k-priz').textContent=s.k.priz;$('k-w').textContent=s.k.w;
  $('clock').textContent=s.t;$('r-if').textContent=s.if;
  const ul=$('r-then');ul.textContent='';s.then.forEach(l=>{const li=document.createElement('li');li.textContent=l;ul.append(li);});
  window.dispatchEvent(new CustomEvent('demo-scene-change',{detail:k}));
}
let cur=ORDER.indexOf('donus'),timer=null;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function setAuto(on){clearInterval(timer);timer=null;$('auto').setAttribute('aria-pressed',String(on));$('auto').textContent=on?'Oynatmayı durdur':'Senaryoları oynat';
  if(on)timer=setInterval(()=>{do{cur=(cur+1)%ORDER.length;}while(S[ORDER[cur]].safety);run(ORDER[cur]);},4200);}
chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cur=ORDER.indexOf(b.dataset.s);run(b.dataset.s);setAuto(false);});
$('auto').addEventListener('click',()=>setAuto($('auto').getAttribute('aria-pressed')!=='true'));
document.addEventListener('visibilitychange',()=>{if(document.hidden)setAuto(false);});

const roomNames={salon:'Salon',yatak:'Yatak odası',mutfak:'Mutfak',antre:'Antre',banyo:'Banyo'};
const roomState={};
function syncRoomButtons(lights){
  ROOMS.forEach(room=>{roomState[room]=!!lights[room];const button=$('toggle-'+room);if(button){button.setAttribute('aria-pressed',String(roomState[room]));button.lastElementChild.textContent=roomState[room]?'Açık':'Kapalı';}});
  $('room-feedback').textContent='Senaryo uygulandı. Oda ışıklarını ayrıca değiştirebilirsiniz.';
}
ROOMS.forEach(room=>{
  const button=document.createElement('button');button.type='button';button.id='toggle-'+room;button.className='room-button';button.setAttribute('aria-label',roomNames[room]+' ışığı');button.setAttribute('aria-pressed','false');
  const label=document.createElement('span');label.textContent=roomNames[room];const state=document.createElement('span');state.textContent='Kapalı';button.append(label,state);
  button.addEventListener('click',()=>{
    setAuto(false);roomState[room]=!roomState[room];button.setAttribute('aria-pressed',String(roomState[room]));state.textContent=roomState[room]?'Açık':'Kapalı';
    const group=$('r-'+room);group.classList.toggle('on',roomState[room]);group.classList.remove('alarm');group.querySelector('.glow').style.opacity=roomState[room]?1:0;group.querySelector('.bulb').style.fill=roomState[room]?'#F2C062':'';
    chips.querySelectorAll('.chip').forEach(chip=>chip.setAttribute('aria-pressed','false'));
    $('r-if').textContent='Manuel oda kontrolü';$('r-then').textContent='';
    const item=document.createElement('li');item.textContent=roomNames[room]+' ışığı '+(roomState[room]?'açıldı.':'kapatıldı.');$('r-then').append(item);
    lightLevels[room]=roomState[room]?100:0;refreshLightControl();
    $('k-w').textContent='—';$('room-feedback').textContent=item.textContent+' Diğer cihaz ayarları korundu.';
  });$('room-buttons').append(button);
});


const lightLevels={};
let bedroomCurtain=0;
function refreshLightControl(){const level=lightLevels[$('control-room').value]||0;$('light-level').value=level;$('light-value').textContent='%'+level;}
function setToggle(id,on,text){$(id).setAttribute('aria-pressed',String(on));$(id).textContent=text+(on?'Açık':'Kapalı');}
function syncRemote(s){
  ROOMS.forEach(r=>lightLevels[r]=Math.round((s.L[r]||0)*100));refreshLightControl();
  bedroomCurtain=s.cur.yatak;$('curtain-level').value=s.cur.salon*100;$('curtain-value').textContent='%'+Math.round(s.cur.salon*100)+' kapalı';
  const temp=parseFloat(s.k.kombi.replace(',','.'));$('temperature-level').value=Number.isFinite(temp)?temp:22;$('temperature-value').textContent=Number.isFinite(temp)?s.k.kombi:'Isıtma beklemede';
  setToggle('climate-toggle',!!s.ac,'Klima: ');setToggle('alarm-toggle',['Kurulu','Gece'].includes(s.k.alarm),'Alarm: ');setToggle('socket-toggle',s.dev.tv==='act','TV prizi: ');
  $('remote-feedback').textContent=s.n+' senaryosu kumandaya ve ev görünümüne uygulandı.';
}
function manualFeedback(message){setAuto(false);chips.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed','false'));$('k-w').textContent='—';$('r-if').textContent='Kumanda panelinden değişiklik';$('r-then').textContent='';const item=document.createElement('li');item.textContent=message;$('r-then').append(item);$('remote-feedback').textContent=message;}
$('control-room').addEventListener('change',refreshLightControl);
$('light-level').addEventListener('input',()=>{
  const room=$('control-room').value,level=Number($('light-level').value),g=$('r-'+room);lightLevels[room]=level;roomState[room]=level>0;
  g.classList.remove('alarm');g.classList.toggle('on',level>0);g.querySelector('.glow').style.opacity=level/100;g.querySelector('.bulb').style.fill=level?'#F2C062':'';
  $('toggle-'+room).setAttribute('aria-pressed',String(level>0));$('toggle-'+room).lastElementChild.textContent=level?'Açık':'Kapalı';refreshLightControl();manualFeedback(roomNames[room]+' ışığı %'+level+' olarak ayarlandı.');
});
function changeCurtain(value){$('curtain-level').value=value;$('curtain-value').textContent='%'+value+' kapalı';curtain('cs1','cs2',value/100,70,220);$('k-perde').textContent=value===0&&!bedroomCurtain?'Açık':value===100&&bedroomCurtain?'Kapalı':'Kısmen';manualFeedback('Salon perdesi %'+value+' kapatıldı.');}
$('curtain-level').addEventListener('input',()=>changeCurtain(Number($('curtain-level').value)));
document.querySelectorAll('[data-curtain]').forEach(b=>b.addEventListener('click',()=>changeCurtain(Number(b.dataset.curtain))));
$('temperature-level').addEventListener('input',()=>{const value=Number($('temperature-level').value).toLocaleString('tr-TR')+' °C';$('temperature-value').textContent=value;$('k-kombi').textContent=value;manualFeedback('Isıtma hedefi '+value+' olarak ayarlandı.');});
$('climate-toggle').addEventListener('click',()=>{const on=$('climate-toggle').getAttribute('aria-pressed')!=='true';setToggle('climate-toggle',on,'Klima: ');$('ac').classList.toggle('ac-on',on);$('ac-t').textContent=on?'KLİMA 24°':'KLİMA';$('k-klima').textContent=on?'24 °C':'Kapalı';manualFeedback(on?'Klima 24 °C ayarında açıldı.':'Klima kapatıldı.');});
$('alarm-toggle').addEventListener('click',()=>{const on=$('alarm-toggle').getAttribute('aria-pressed')!=='true';setToggle('alarm-toggle',on,'Alarm: ');$('k-alarm').textContent=on?'Kurulu':'Kapalı';$('k-alarm').className='';['kapi','hareket'].forEach(d=>$('d-'+d).classList.toggle('act',on));ROOMS.forEach(r=>$('r-'+r).classList.remove('alarm'));['su','duman'].forEach(d=>$('d-'+d).classList.remove('alarm'));manualFeedback(on?'Alarm kuruldu; kapı ve hareket izleme etkin.':'Alarm kapatıldı.');});
$('socket-toggle').addEventListener('click',()=>{const on=$('socket-toggle').getAttribute('aria-pressed')!=='true';setToggle('socket-toggle',on,'TV prizi: ');$('d-tv').classList.toggle('act',on);$('d-tv').classList.toggle('off',!on);$('k-priz').textContent=on?'TV açık':'TV kapalı';manualFeedback(on?'TV prizi açıldı.':'TV prizi kapatıldı.');});


function syncWallPanel(s,key){
 $('panel-scene').textContent=s.n;$('panel-time').textContent=s.t;
 $('panel-climate').textContent=s.ac?('Klima '+(s.k.klima||s.ac)):s.k.kombi;$('panel-alarm').textContent=s.k.alarm;
 $('wall-panel-select').value=key;
 const audio=!!s.alert?'Acil uyarı':key==='sabah'?'Günaydın':key==='film'?'Sinema modu':'Beklemede';
 $('panel-audio').textContent=audio;$('speaker-toggle').setAttribute('aria-pressed','false');$('speaker-toggle').textContent='Müzik: Kapalı';
 document.querySelector('svg.house').setAttribute('data-scene',s.n);document.querySelector('svg.house').setAttribute('data-audio',s.alert?'alarm':key==='sabah'?'greeting':key==='film'?'cinema':'off');
 $('voice-feedback').textContent=s.alert?'Acil uyarı öncelikli; müzik durduruldu (simülasyon).':key==='sabah'?greetingText():'Hoparlör durumu senaryoya göre güncellendi. Günaydın karşılamasını Dinle düğmesiyle seslendirebilirsiniz.';
}
ORDER.forEach(key=>{const option=document.createElement('option');option.value=key;option.textContent=S[key].n;$('wall-panel-select').append(option);});
function choosePanelScene(key){cur=ORDER.indexOf(key);setAuto(false);run(key);}
$('wall-panel-select').addEventListener('change',()=>choosePanelScene($('wall-panel-select').value));
document.querySelectorAll('[data-panel-scene]').forEach(b=>b.addEventListener('click',()=>choosePanelScene(b.dataset.panelScene)));
$('voice-run').addEventListener('click',()=>{choosePanelScene($('voice-command').value);$('voice-feedback').textContent='Örnek komut uygulandı: '+$('voice-command').selectedOptions[0].textContent;});
$('speaker-toggle').addEventListener('click',()=>{
 if(document.querySelector('svg.house').getAttribute('data-audio')==='alarm'){$('voice-feedback').textContent='Acil uyarı sırasında müzik başlatılmaz.';return;}
 const on=$('speaker-toggle').getAttribute('aria-pressed')!=='true';$('speaker-toggle').setAttribute('aria-pressed',String(on));$('speaker-toggle').textContent=on?'Müzik: Açık':'Müzik: Kapalı';$('panel-audio').textContent=on?'Müzik modu':'Beklemede';document.querySelector('svg.house').setAttribute('data-audio',on?'music':'off');$('voice-feedback').textContent='Müzik durumu simülasyonda '+(on?'açıldı.':'kapatıldı.');
});


function greetingText(){const name=$('greeting-name').value.trim();return name?'Günaydın, '+name+'! Güzel bir gün dilerim.':'Günaydın! Güzel bir gün dilerim.';}
$('greeting-name').addEventListener('input',()=>{
 $('greeting-preview').textContent=greetingText();
 if($('wall-panel-select').value==='sabah')run('sabah');
});
$('greeting-listen').addEventListener('click',()=>{
 choosePanelScene('sabah');$('greeting-preview').textContent=greetingText();
 if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){$('voice-feedback').textContent='Bu tarayıcıda seslendirme desteklenmiyor. Karşılama metni ekranda gösteriliyor.';return;}
 const speech=new window.SpeechSynthesisUtterance(greetingText());speech.lang='tr-TR';speech.rate=.9;speech.volume=.75;
 const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('tr'));if(voice)speech.voice=voice;
 speech.onerror=()=>{$('voice-feedback').textContent='Seslendirme tamamlanamadı. Cihazın ses ve Türkçe ses desteğini kontrol edin.';};
 window.speechSynthesis.speak(speech);$('voice-feedback').textContent='Loş sabah ışıkları açıldı. Karşılama seslendiriliyor: '+greetingText();
});
$('greeting-stop').addEventListener('click',()=>{window.speechSynthesis?.cancel();$('voice-feedback').textContent='Seslendirme durduruldu.';});


let lastRobotScene={key:'donus',scene:S.donus};
function syncRobot(scene,key){
 lastRobotScene={key,scene};const equipped=$('robot-equipped').checked;
 const away=key==='cikis'||(key==='ayrilis'&&scene.if==='Evdeki son kişi ayrıldı');
 const mode=!equipped?'absent':scene.alert?'paused':away?'clean':'return';
 const svg=document.querySelector('svg.house');svg.setAttribute('data-robot',mode);
 $('robot-status').textContent=mode==='absent'?'Robot süpürge seçili değil.':mode==='paused'?'Acil durum: temizlik durduruldu.':mode==='clean'?'Ev boş · Robot temizliğe başladı.':'Robot şarj istasyonuna dönüyor.';
}
$('robot-equipped').addEventListener('change',()=>syncRobot(lastRobotScene.scene,lastRobotScene.key));
$('robot-away').addEventListener('click',()=>choosePanelScene('cikis'));
$('robot-home').addEventListener('click',()=>choosePanelScene('donus'));
S.cikis.then.push('Robot süpürge varsa ve evde kimse kalmadıysa temizlik başlar.');
S.donus.then.push('Robot süpürge varsa temizlik biter ve şarj istasyonuna döner.');


let cameraSequence=0,cameraRecordTimer=null,cameraReplayTimer=null;
const cameraRecords=[];
function syncCamera(key){
 if(key==='ziyaretci')startCameraEvent();
 else if(cameraRecordTimer===null&&cameraReplayTimer===null){$('camera-person').hidden=true;document.querySelector('svg.house').setAttribute('data-visitor','false');}
}
function drawCameraRecords(){
 $('camera-records').textContent='';
 cameraRecords.forEach(record=>{const row=document.createElement('button');row.type='button';row.textContent='▶ Olay '+record.id+' · '+record.time+' · 4 sn · DEMO';row.addEventListener('click',()=>replayCameraRecord(record));$('camera-records').append(row);});
}
function replayCameraRecord(record){
 if(cameraRecordTimer!==null){$('camera-feedback').textContent='Örnek kayıt devam ediyor; tamamlanınca oynatabilirsiniz.';return;}
 clearTimeout(cameraReplayTimer);$('camera-person').hidden=false;$('camera-preview').classList.add('is-replaying');$('camera-record-state').textContent='Olay '+record.id+' · Örnek kayıt oynatılıyor';
 cameraReplayTimer=setTimeout(()=>{cameraReplayTimer=null;$('camera-preview').classList.remove('is-replaying');$('camera-person').hidden=true;$('camera-record-state').textContent='Örnek kayıt sona erdi';},4000);
}
function startCameraEvent(){
 if(cameraRecordTimer!==null){$('camera-feedback').textContent='Ziyaretçi olayı zaten kaydediliyor (demo).';return;}
 clearTimeout(cameraReplayTimer);cameraReplayTimer=null;$('camera-preview').classList.remove('is-replaying');
 const record={id:++cameraSequence,time:S.ziyaretci.t};$('camera-person').hidden=false;
 document.querySelector('svg.house').setAttribute('data-visitor','true');$('camera-record-state').textContent='● Örnek kayıt sürüyor · 4 sn';$('camera-feedback').textContent='Uygulama bildirimi gösterildi. Örnek olay kaydı hazırlanıyor.';
 cameraRecordTimer=setTimeout(()=>{cameraRecordTimer=null;cameraRecords.unshift(record);cameraRecords.splice(10);drawCameraRecords();$('camera-record-state').textContent='Örnek olay kaydı hazır';$('camera-feedback').textContent='Olay '+record.id+' kaydı listeye eklendi. Oynat düğmesiyle simülasyonu inceleyebilirsiniz.';$('camera-person').hidden=true;document.querySelector('svg.house').setAttribute('data-visitor','false');},4000);
}
$('camera-visitor').addEventListener('click',()=>choosePanelScene('ziyaretci'));

run('donus');setAuto(false);
$('phone-alert').addEventListener('click',()=>{$('phone-lockscreen').hidden=true;$('phone-app').hidden=false;});
$('phone-back').addEventListener('click',()=>{$('phone-app').hidden=true;$('phone-lockscreen').hidden=false;});
$('phone-read').addEventListener('click',()=>{$('phone-read').textContent='Görüldü';$('phone-read').disabled=true;$('phone-announcement').textContent='Demo bildirimi görüldü. Koruma durumları değiştirilmedi.';});
$('phone-test').addEventListener('click',()=>{cur=ORDER.indexOf('su');setAuto(false);run('su');});
$('phone-replay').addEventListener('click',()=>{if(currentPhoneEvent)renderPhoneNotification(currentPhoneEvent.s,currentPhoneEvent.message);});



$('exit-check').addEventListener('click',()=>{
 const input={occupancy:$('exit-occupancy').value,door:$('exit-door').value,iron:$('exit-iron').value,feedback:$('exit-feedback').value};
 const warnings=departureWarnings(input);S.ayrilis=departureScene(input);
 if(warnings.length)phoneMessages.ayrilis=['Evden çıkış · Kontrol ve önlem',warnings.join(' ')];else delete phoneMessages.ayrilis;
 cur=ORDER.indexOf('ayrilis');setAuto(false);run('ayrilis');
 $('exit-result').textContent=warnings.length?'Telefon demosuna uyarı geldi: '+warnings.join(' '):input.occupancy==='occupied'?'Evde biri var: son kişi ayrılma kuralı çalışmadı.':'Kapı kapalı, ütü prizi kapalı: risk uyarısı yok.';
});

$('auto-evaluate').addEventListener('click',()=>{
 try{
 const input={season:$('auto-season').value,location:$('auto-location').value,time:$('auto-time').value,start:$('auto-start').value,end:$('auto-end').value,temperature:$('auto-temperature').value===''?NaN:Number($('auto-temperature').value),windowState:$('auto-window').value};
 const result=evaluateClimateRule(input),cool=result.mode==='cool',heat=result.mode==='heat';
 S.iklim={n:'Konum ve saat',t:input.time,if:result.reason,L:input.location==='home'?{salon:.6}:{},cur:{salon:cool?1:0,yatak:0},ac:cool?'24°':null,dev:{tv:'off',pencere:input.windowState==='open'?'act':''},k:{kombi:heat?CLIMATE_RULE.winter.target+' °C':'Beklemede',klima:cool?CLIMATE_RULE.summer.target+' °C':'Kapalı',alarm:'Kapalı',priz:'Açık',w:'—'},then:[result.reason,'Konum: '+$('auto-location').selectedOptions[0].textContent,'Program: '+input.start+'–'+input.end+' · Oda: '+input.temperature+' °C','Cihazın kendi güvenlik korumaları bu örnek kuraldan bağımsızdır.']};
 cur=ORDER.indexOf('iklim');setAuto(false);run('iklim');$('automation-result').textContent=result.reason;
 }catch(error){$('automation-result').textContent=error.message;}
});
for(const id of ['auto-season','auto-location','auto-time','auto-temperature','auto-start','auto-end','auto-window'])$(id).addEventListener('input',()=>{$('automation-result').textContent='Koşullar değişti. Modeli güncellemek için “Koşulları uygula” seçin.';});

$('flt').addEventListener('click',e=>{const b=e.target.closest('.chip-l');if(!b)return;
  $('flt').querySelectorAll('.chip-l').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  document.querySelectorAll('#scen .scen').forEach(c=>c.hidden=!(b.dataset.f==='all'||c.dataset.c===b.dataset.f));});

// İşletme iletişim bilgileri: WhatsApp için ülke koduyla yalnızca rakam girin.
const CONTACT = { whatsapp: '', email: '' };
let requestPlan=null;
$('download-request-plan').addEventListener('click',()=>{if(requestPlan)window.TrakswellPlan?.download(requestPlan);});
window.addEventListener('plan-changed',()=>{$('request-result').hidden=true;$('ok').hidden=true;requestPlan=null;});
let selectedProject='';
function syncHomeType(source){
  const value=source.value;$('konut').value=value;$('model-type').value=value;
  $('model-type-label').textContent='3B model / '+value;
  $('request-result').hidden=true;$('ok').hidden=true;
  window.dispatchEvent(new CustomEvent('home-type-change',{detail:value}));
}
$('model-type').addEventListener('change',()=>syncHomeType($('model-type')));
$('konut').addEventListener('change',()=>syncHomeType($('konut')));
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  selectedProject=button.dataset.project;
  $('project-selection').textContent='Proje başlangıcı: '+selectedProject+' · Konut tipini aşağıdan değiştirebilirsiniz.';
  $('project-selection').hidden=false;
  if(selectedProject==='Villa / dubleks')$('konut').value='Villa / müstakil';
  if(selectedProject==='Mevcut daire')$('konut').value='3+1 daire';
  $('konut').dispatchEvent(new Event('change',{bubbles:true}));
  $('request-result').hidden=true;$('ok').hidden=true;
  $('teklif').scrollIntoView({behavior:reduce?'instant':'smooth'});
  $('ad').focus({preventScroll:true});
}));
document.querySelectorAll('[data-demo]').forEach(link=>link.addEventListener('click',()=>{
  cur=ORDER.indexOf(link.dataset.demo);run(link.dataset.demo);setAuto(false);
  $('ev-demo').focus({preventScroll:true});
}));
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = $('main-menu');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');mainMenu.dataset.open='false';}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));mainMenu.dataset.open=String(open);});
mainMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){closeMenu();menuToggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeMenu();});
matchMedia('(min-width:881px)').addEventListener('change',closeMenu);
if(CONTACT.whatsapp){$('business-phone').hidden=false;$('phone-link').textContent='+'+CONTACT.whatsapp;$('phone-link').href='tel:+'+CONTACT.whatsapp;}
if(CONTACT.email){$('business-email').hidden=false;$('email-link').textContent=CONTACT.email;$('email-link').href='mailto:'+CONTACT.email;}
if(CONTACT.whatsapp||CONTACT.email)$('delivery-note').textContent='Önce talebinizi kontrol edin, ardından WhatsApp veya e-posta uygulamanızda gönderimi tamamlayın. Form bilgileri bu sayfada kaydedilmez.';
function syncEmail(){const active=document.querySelector('input[name=zm]:checked').value==='E-posta';$('email-field').hidden=!active;$('eposta').disabled=!active;$('eposta').required=active;$('tel').required=!active;if(active)fieldError('tel','');if(!active)fieldError('eposta','');}
function fieldError(id,message){$(id).setAttribute('aria-invalid',String(!!message));$(id+'-error').textContent=message;$(id+'-error').hidden=!message;}
function normalizePhone(value){let digits=value.replace(/\D/g,'');if(digits.startsWith('0090'))digits=digits.slice(4);else if(digits.startsWith('90')&&digits.length===12)digits=digits.slice(2);else if(digits.startsWith('0')&&digits.length===11)digits=digits.slice(1);return /^[2-5]\d{9}$/.test(digits)?'+90'+digits:null;}
$('f').addEventListener('input',e=>{if(['ad','tel','eposta'].includes(e.target.id))fieldError(e.target.id,'');$('request-result').hidden=true;$('ok').hidden=true;});
$('f').addEventListener('change',()=>{syncEmail();$('request-result').hidden=true;$('ok').hidden=true;});
syncEmail();
$('f').addEventListener('submit',e=>{
  e.preventDefault();
  const ok=$('ok'),name=$('ad').value.trim(),phone=normalizePhone($('tel').value),email=$('eposta').value.trim();
  const wantsEmail=!$('eposta').disabled;
  fieldError('ad',(name.length<2||name.length>100)?'Lütfen adınızı ve soyadınızı yazın.':'');
  fieldError('tel',(!wantsEmail||$('tel').value.trim())&&!phone?'Geçerli bir Türkiye telefon numarası girin (ör. 0532 123 45 67).':'');
  fieldError('eposta',wantsEmail&&(!email||!$('eposta').validity.valid)?'Geçerli bir e-posta adresi girin.':'');
  const invalid=$('f').querySelector('[aria-invalid="true"]');
  ok.hidden=false;$('request-result').hidden=true;
  if(invalid){ok.classList.add('err');ok.textContent='Lütfen işaretli alanları kontrol edin.';invalid.focus();return;}
  ok.classList.remove('err');
  const systems=[...document.querySelectorAll('input[name=sy]:checked')].map(i=>i.value).join(', ')||'Görüşmede belirlemek istiyorum';
  const preference=document.querySelector('input[name=zm]:checked').value;
  const lines=['Trakswell Home — Teklif talebi','Ad soyad: '+name];if(phone)lines.push('Telefon: '+phone);
  if(wantsEmail)lines.push('E-posta: '+email);
  if(selectedProject)lines.push('Proje başlangıcı: '+selectedProject);
  const priorities=window.TrakswellPreferences?.summary();if(priorities)lines.push('Yaşam önceliklerim: '+priorities);
  const experience=window.TrakswellExperience?.summary();if(experience)lines.push(experience);
  lines.push('Şehir / ilçe: '+($('ilce').value.trim()||'Belirtilmedi'),'Konut tipi: '+$('konut').value,'İlgilenilen sistemler: '+systems,'İletişim tercihi: '+preference,'Not: '+($('not').value.trim()||'Yok'));
  requestPlan=window.TrakswellExperience?.getPlan()||(window.TrakswellPlan?.isEnabled()?window.TrakswellPlan.getExport():null);
  if(requestPlan){
    lines.push('','Müşterinin hazırladığı ev planı: '+requestPlan.homeType,
      'Oda sayısı: '+requestPlan.rooms.length+' · Alan: '+requestPlan.rooms.reduce((sum,r)=>sum+r.width*r.depth,0).toFixed(1)+' m²',
      ...requestPlan.rooms.map(r=>r.name+': '+r.width+' × '+r.depth+' m, kat '+r.floor),
      'Tam ölçüler ve yerleşim plan dosyasındadır. Plan dosyasını bu e-postaya ayrıca ekleyeceğim.');
  }
  $('download-request-plan').hidden=!requestPlan;$('plan-email-note').hidden=!requestPlan;
  const message=lines.join('\n');
  $('request-text').value=message;$('request-result').hidden=false;
  $('send-whatsapp').hidden=!CONTACT.whatsapp;$('send-email').hidden=!CONTACT.email;
  if(CONTACT.whatsapp)$('send-whatsapp').href='https://wa.me/'+CONTACT.whatsapp+'?text='+encodeURIComponent(message);
  if(CONTACT.email)$('send-email').href='mailto:'+CONTACT.email+'?subject='+encodeURIComponent('Akıllı ev teklif talebi')+'&body='+encodeURIComponent(message);
  ok.textContent=CONTACT.whatsapp||CONTACT.email?'Talebiniz hazır; henüz gönderilmedi. Özeti kontrol edip bir gönderim kanalı seçin.':'Talebiniz hazır; henüz gönderilmedi. İşletme iletişim bilgileri eklenene kadar metni kopyalayabilirsiniz.';
});
$('copy-request').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText($('request-text').value);$('ok').textContent='Talep metni kopyalandı. Henüz gönderilmedi.';}
  catch{$('request-text').focus();$('request-text').select();$('ok').textContent='Otomatik kopyalama kullanılamıyor. Seçili metni cihazınızın kopyalama komutuyla kopyalayın.';}
});

;

// Move existing controls without replacing nodes or losing their event handlers.
(()=>{
 const demo=document.getElementById('ev-demo'),layout=demo.querySelector('.panel-layout');
 const hero=document.querySelector('.hero'),grid=hero.querySelector('.hero-grid'),needs=$('ihtiyac-secimi');
 hero.querySelector('.home-moment')?.remove();grid.insertBefore(demo,needs);
 const needsSection=document.createElement('section');needsSection.className='needs-section';needs.classList.add('wrap');needsSection.append(needs);hero.after(needsSection);
 const dock=document.createElement('aside');dock.id='advanced-controls';dock.className='control-dock';dock.setAttribute('aria-label','Ev kontrol araçları');
 const remote=demo.querySelector('.remote-console');
 const audioDetails=document.createElement('details');audioDetails.className='audio-options';const audioSummary=document.createElement('summary');audioSummary.textContent='Ses sistemi ve günaydın karşılaması';audioDetails.append(audioSummary,demo.querySelector('.morning-greeting'),demo.querySelector('.voice-demo'));remote.append(audioDetails,demo.querySelector('.robot-controls'),demo.querySelector('.camera-demo'));
 const scenario=document.createElement('div');scenario.className='dock-scenario';
 const label=document.createElement('label');label.htmlFor='scenario-picker';label.textContent='Senaryo seç';
 const select=document.createElement('select');select.id='scenario-picker';
 const manual=document.createElement('option');manual.value='';manual.textContent='Manuel kontrol';select.append(manual);
 const chips=document.getElementById('chips');chips.querySelectorAll('button').forEach(b=>{const option=document.createElement('option');option.value=b.dataset.s;option.textContent=b.textContent;select.append(option);});
 select.addEventListener('change',()=>{if(select.value)chips.querySelector('[data-s="'+select.value+'"]').click();});
 const sync=()=>{const active=chips.querySelector('[aria-pressed="true"]');select.value=active?active.dataset.s:'';};
 new MutationObserver(sync).observe(chips,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});sync();
 scenario.append(label,select);dock.append(scenario);
 const wallPanel=demo.querySelector('.wall-panel-ui');remote.prepend(wallPanel);
 for(const [selector,title] of [['.robot-controls','Robot süpürge'],['.camera-demo','Dış kapı kamerası']]){
  const node=remote.querySelector(selector),group=document.createElement('details'),heading=document.createElement('summary');
  group.className='control-group';heading.textContent=title;node.before(group);group.append(heading,node);
 }
 const tabs=document.createElement('div');tabs.className='dock-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Kontrol bölümleri');dock.append(tabs);
 const sections=[['rooms','Odalar',demo.querySelector('.room-controls')],['remote','Kumanda',demo.querySelector('.remote-console')],['plan','Plan düzenle',document.getElementById('plan-editor')],['safety','Acil durum',demo.querySelector('.safety-panel')],['phone','Telefon',demo.querySelector('.phone-simulator')],['automation','Otomasyon',demo.querySelector('.automation-panel')]];
 const buttons=[],panels=[];
 function activate(index,focus=false){buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});if(focus)buttons[index].focus();}
 sections.forEach(([id,title,node],index)=>{
  const button=document.createElement('button');button.type='button';button.id='dock-tab-'+id;button.textContent=title;button.setAttribute('role','tab');button.setAttribute('aria-controls','dock-panel-'+id);
  const panel=document.createElement('div');panel.className='dock-panel';panel.id='dock-panel-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;
  panel.append(node);if(id==='plan')node.open=true;
  buttons.push(button);panels.push(panel);tabs.append(button);dock.append(panel);
  button.addEventListener('click',()=>activate(index));
  button.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight')next=(index+1)%buttons.length;else if(e.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;else if(e.key==='ArrowDown')next=(index+3)%buttons.length;else if(e.key==='ArrowUp')next=(index+buttons.length-3)%buttons.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;else return;e.preventDefault();activate(next,true);});
 });
 dock.querySelector('.automation-panel').append(demo.querySelector('.departure-check'));
 dock.insertBefore(tabs,dock.firstChild);
 layout.append(dock);activate(0);
 const experienceControls=document.createElement('div');experienceControls.className='experience-controls';
 experienceControls.append(demo.querySelector('.quick-scenes'),$('quick-result'),demo.querySelector('.try-actions'),$('advanced-toggle'),demo.querySelector('.demo-to-plan'));
 layout.after(experienceControls);
 // Keep the house at its full width when controls are opened.
 experienceControls.after(dock);
 function openWallPanel(){
   showAdvanced(true);
   activate(sections.findIndex(s=>s[0]==='remote'));
   const panel=dock.querySelector('.wall-panel-ui');panel.scrollIntoView({block:'nearest',behavior:'auto'});
   document.getElementById('wall-panel-select').focus({preventScroll:true});
   if(panel.animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches)panel.animate([{boxShadow:'0 0 0 3px #edb24e'},{boxShadow:'0 0 0 0 transparent'}],{duration:900});
 }
 window.addEventListener('open-wall-panel',openWallPanel);
 document.getElementById('view-panel').addEventListener('click',openWallPanel);
 window.addEventListener('demo-phone-notification',()=>activate(sections.findIndex(s=>s[0]==='phone'),dock.contains(document.activeElement)));
 // Advanced controls remain available on request; first-time visitors start with four scenes.
 const advancedToggle=$('advanced-toggle');
 function showAdvanced(open){const active=!!document.querySelector('.showroom-active');dock.hidden=!(open&&active);advancedToggle.setAttribute('aria-expanded',String(open&&active));advancedToggle.textContent='Kendi evini tasarla →';if(open&&!active)window.dispatchEvent(new CustomEvent('open-showroom'));}
 showAdvanced(false);
 advancedToggle.addEventListener('click',()=>{activate(sections.findIndex(s=>s[0]==='plan'));window.dispatchEvent(new CustomEvent('open-showroom',{detail:'plan'}));});
 window.addEventListener('open-wall-panel',()=>showAdvanced(true));
 $('view-panel').addEventListener('click',()=>showAdvanced(true));
 window.addEventListener('demo-phone-notification',()=>{if(document.querySelector('.showroom-active'))showAdvanced(true);});
 const quickScenes=['donus','film','cikis','sabah'],seen=new Set();
 const explanations={donus:'Antre ve salon ışıkları yandı, ısıtma hedefi eve dönüşe göre değişti. Alarm, telefondaki hatırlatmayı onaylayınca kapandı.',film:'Salon ışığı %15’e kısıldı, salon perdesi kapandı. Film atmosferi hazır.',cikis:'Işıklar söndü, örnek prizler kapandı ve alarm kuruldu. Robot varsa temizliğe başlar.',sabah:'Yatak odası loş aydınlandı, perdeler açıldı. Güne yumuşak bir başlangıç.'};
 function refreshQuick(key,count=true){
   if(count&&quickScenes.includes(key))seen.add(key);
   document.querySelectorAll('[data-quick-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.quickScene===key)));
   $('quick-result').textContent=explanations[key]||'Seçiminiz uygulandı. Olay ve cihaz ayrıntılarını kontrol panelinde inceleyebilirsiniz.';
   $('try-progress').textContent=seen.size?seen.size+' / 4 günlük senaryoyu denediniz':'Bir düğmeye dokunun; evde ne değiştiğini görün.';
   $('try-next').textContent=seen.size===4?'Baştan dene ↻':'Sıradaki senaryoyu dene →';
 }
 function tryScene(key){setAuto(false);if(window.TrakswellPlan?.isEnabled()&&!document.querySelector('.showroom-active')){$('edit-enabled').checked=false;$('edit-enabled').dispatchEvent(new Event('change'));}run(key);}
 window.addEventListener('trakswell-try-scene',e=>{if(Object.hasOwn(S,e.detail))tryScene(e.detail);});
 document.querySelectorAll('[data-quick-scene]').forEach(b=>b.addEventListener('click',()=>tryScene(b.dataset.quickScene)));
 $('try-next').addEventListener('click',()=>{if(seen.size===4)seen.clear();tryScene(quickScenes.find(key=>!seen.has(key))||'donus');});
 $('demo-restart').addEventListener('click',()=>{seen.clear();tryScene('donus');seen.clear();refreshQuick('donus',false);$('view-reset').click();showAdvanced(false);});
 window.addEventListener('demo-scene-change',e=>refreshQuick(e.detail));refreshQuick('donus',false);
 new MutationObserver(()=>{if(!chips.querySelector('[aria-pressed="true"]')){document.querySelectorAll('[data-quick-scene]').forEach(b=>b.setAttribute('aria-pressed','false'));$('quick-result').textContent='Kendi ayarınızı yapıyorsunuz. Hazır bir senaryoya dönmek için üstteki düğmelerden birini seçebilirsiniz.';}}).observe(chips,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
})();

// Visitor-selected priorities; no tracking or persistence.
(()=>{
 const preferences={comfort:{title:'Günlük konfor',systems:['sy1','sy2','sy3'],detail:'Aydınlatma, perde ve iklimlendirmeyi günlük düzeninize göre değerlendirelim.'},cinema:{title:'Film ve atmosfer',systems:['sy1','sy3'],detail:'Salonunuz için loş ışık ve perde senaryosuyla başlayalım.'},awareness:{title:'Evden haberdar olma',systems:['sy4','sy5','sy6'],detail:'Kapı, priz ve sensör ihtiyaçlarını birlikte netleştirelim.'}};
 const chosen=new Set(),buttons=[...document.querySelectorAll('[data-need]')];
 const summary=()=>[...chosen].map(key=>preferences[key].title).join(' + ');
 window.TrakswellPreferences={summary};
 buttons.forEach(button=>button.addEventListener('click',()=>{
   const key=button.dataset.need;if(!preferences[key])return;
   if(chosen.has(key))chosen.delete(key);else chosen.add(key);
   button.setAttribute('aria-pressed',String(chosen.has(key)));button.querySelector('span').textContent=chosen.has(key)?'✓':'＋';
   const systems=new Set([...chosen].flatMap(key=>preferences[key].systems));
   document.querySelectorAll('input[name=sy]').forEach(input=>input.checked=systems.has(input.id));
   $('needs-title').textContent=chosen.size?'Sizin başlangıcınız: '+summary():'Önce size iyi gelecek yerden başlayın.';
   $('needs-summary').textContent=chosen.size?[...chosen].map(key=>preferences[key].detail).join(' '):'Bir veya birkaç öncelik seçebilirsiniz. Seçiminiz teklif taslağına aktarılır.';
   $('needs-continue').textContent='Seçimlerimle devam et →';
   $('request-result').hidden=true;$('ok').hidden=true;
 }));
})();

;

// Keep detailed information available without stacking every full section.
(()=>{
 const main=document.querySelector('main');
 const information=[...main.children].filter(node=>node.tagName==='SECTION'&&!node.classList.contains('hero')&&!node.classList.contains('needs-section')&&!['teklif','veri-bilgisi','baslangic','kapsamlar','teslim-deneyimi'].includes(node.id));
 information.sort((a,b)=>{const order=['hizmet','senaryolar'];return (order.includes(a.id)?order.indexOf(a.id):2)-(order.includes(b.id)?order.indexOf(b.id):2);});
 const accordions=[];
 information.forEach((section,index)=>{
  const title=section.querySelector('h2');if(!title)return;
  const details=document.createElement('details');details.className='site-information';details.setAttribute('name','site-information');
  const summary=document.createElement('summary');summary.textContent=title.textContent;main.insertBefore(details,document.getElementById('teklif'));details.append(summary,section);accordions.push(details);
  summary.addEventListener('click',e=>{e.preventDefault();const opening=!details.open;accordions.forEach(other=>other.open=other===details&&opening);});
 });
 let navigationVersion=0;
 function reveal(hash,scroll=false){
  if(!hash||hash==='#')return;let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return;}if(!target)return;
  const details=target.closest('.site-information');if(details)accordions.forEach(other=>other.open=other===details);
  if(scroll){const version=++navigationVersion;const schedule=window.requestAnimationFrame||((fn)=>setTimeout(fn,0));schedule(()=>schedule(()=>{if(version===navigationVersion)(details||target).scrollIntoView({block:'start',behavior:'instant'});}));}
 }
 document.addEventListener('click',e=>{const link=e.target.closest('a[href^="#"]');if(!link)return;const hash=link.getAttribute('href');if(!document.getElementById(hash.slice(1)))return;e.preventDefault();reveal(hash,true);if(window.history&&window.location.hash!==hash)window.history.pushState(null,'',hash);});
 window.addEventListener('hashchange',()=>reveal(window.location.hash,true));reveal(window.location?.hash||'',!!window.location?.hash);
})();
