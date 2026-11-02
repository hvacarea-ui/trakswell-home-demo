(()=>{'use strict';fetch('privacy-config.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(c=>{
const fields={legalName:'Veri sorumlusu',address:'Başvuru / tebligat adresi',contactEmail:'Başvuru e-postası',purposes:'İşleme amaçları',legalBasis:'Hukuki sebepler',collection:'Toplama yöntemi',recipients:'Alıcı grupları ve aktarım amaçları',retention:'Saklama ve imha',transferAssessment:'Yurt dışına aktarım koşulları'};
const ready=c.approved===true&&Object.keys(fields).every(k=>typeof c[k]==='string'&&c[k].trim());
// Identity and contact details already appear in the server-rendered business section.
const list=document.getElementById('privacy-fields');list.replaceChildren();for(const [key,label] of Object.entries(fields)){if(['legalName','address','contactEmail'].includes(key))continue;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=c[key]||'Henüz tamamlanmadı — müşteri gönderimi kapalı.';list.append(dt,dd)}
if(ready)document.getElementById('privacy-status').textContent='Teklif talebi aydınlatması · Sürüm: '+c.noticeVersion;
}).catch(()=>{});})();
