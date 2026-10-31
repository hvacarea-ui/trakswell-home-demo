/* Local, deterministic Turkish design request parser. No network or language model.
 * Parsing only produces a reviewable request; the editor owns preview and apply.
 * An add quantity is the desired minimum count per target room, not an increment.
 */
(function () {
  'use strict';

  const roomLabels = Object.freeze({ salon: 'Salon', yatak: 'Yatak odası', mutfak: 'Mutfak', antre: 'Antre', hol: 'Hol', banyo: 'Banyo', wc: 'WC', merdiven: 'Merdiven', balkon: 'Balkon', teras: 'Teras', all: 'Tüm odalar', selected: 'Seçili oda' });
  const builtin = [
    ['sensor-motion', 'Hareket sensörü', ['hareket sensoru', 'hareket sensor', 'pir sensoru', 'pir sensor']],
    ['sensor-water', 'Su kaçağı sensörü', ['su kacagi sensoru', 'su kacak sensoru', 'su sensoru', 'su sensor', 'kacak sensoru']],
    ['sensor-smoke', 'Duman sensörü', ['duman sensoru', 'duman sensor', 'duman dedektoru']],
    ['sensor-temperature', 'Sıcaklık sensörü', ['sicaklik sensoru', 'sicaklik sensor', 'isi sensoru', 'isi sensor']],
    ['sensor-door', 'Kapı/pencere sensörü', ['kapi pencere sensoru', 'kapi sensoru', 'pencere sensoru', 'kapi sensor', 'pencere sensor']],
    ['automation-light', 'Akıllı aydınlatma', ['akilli aydinlatma', 'akilli isik', 'akilli lamba', 'aydinlatma']],
    ['automation-curtain', 'Motorlu perde', ['motorlu perde', 'akilli perde', 'perde otomasyonu', 'perde']],
    ['automation-climate', 'İklim kontrolü', ['iklim kontrolu', 'iklim kontrol', 'akilli termostat', 'isitma kontrolu', 'klima kontrolu']],
    ['automation-socket', 'Akıllı priz', ['akilli priz']],
    ['furniture-sofa', 'Kanepe', ['kanepe', 'koltuk']],
    ['furniture-bed', 'Yatak', ['yatak', 'yatag', 'karyola']],
    ['furniture-table', 'Masa', ['masa']],
    ['furniture-wardrobe', 'Dolap', ['dolap', 'dolab', 'gardirop']],
    ['furniture-desk', 'Çalışma masası', ['calisma masasi', 'calisma masa']]
  ].map(([id, name, aliases]) => ({ id, name, aliases, builtin: true }));
  const numbers = Object.freeze({ bir: 1, tek: 1, iki: 2, uc: 3, dort: 4, bes: 5, alti: 6, yedi: 7, sekiz: 8, dokuz: 9, on: 10, yirmi: 20, otuz: 30, yuz: 100, bin: 1000 });
  const suffix = '(?:si|su|sini|sunu|sine|suna|i|u|yi|yu|ini|unu|ine|una|ni|nu|na|ne|a|e|ya|ye|ler|lar|leri|lari|lerini|larini|lere|lara|lerin|larin|lerine|larina|nin|nun|den|dan|ten|tan)?';
  const numberPattern = '-?\\d+(?:[.,]\\d+)?|(?:on|yirmi|otuz) (?:bir|iki|uc|dort|bes|alti|yedi|sekiz|dokuz)|bir|iki|uc|dort|bes|alti|yedi|sekiz|dokuz|on|yirmi|otuz|yuz|bin';
  const invalidContext = /\b(?:veya|yahut|belki|yerine|degil|haric|disinda|olmadan|olmazsa)\b|\bya da\b/;
  const noChangePattern = /\b(?:ekleme|eklemeyin|eklemeyiniz|eklenmesin|koyma|koymayin|konmasin|yerlestirme|yerlestirmeyin|yerlestirilmesin|takma|takmayin|takilmasin|kaldirma|kaldirmayin|silme|silmeyin|cikarma|cikarmayin|sokme|sokmeyin|degistirme|degistirmeyin|koru|koruyun|dokunma|dokunmayin)\b|\bayni kalsin\b/g;
  const removePattern = /\b(?:kaldir(?:in)?|cikar(?:in)?|sil(?:in)?|sok(?:un)?|istemiyorum|istemiyoruz|olmasin|olmamali)\b|\biptal et\b/g;
  const addPattern = /\b(?:ekle(?:yin)?|istiyorum|istiyoruz|olsun|koy(?:un)?|yerlestir(?:in)?|tak(?:in)?)\b|\bilave et\b/g;
  const additionProcessPattern = /\b(?:eklenmesini|eklemeyi|eklemek|konmasini|koyulmasini|koymayi|koymak|yerlestirilmesini|yerlestirmeyi|yerlestirmek|takilmasini|takmayi|takmak|ilave edilmesini)\b/;
  const noAdditionPattern = new RegExp(additionProcessPattern.source + '\\s+(?:(?:de|da|hic|asla|kesinlikle|pek|artik|simdi|su anda)\\s+)*(?:istemiyorum|istemiyoruz)\\b', 'g');
  const unsupportedQuantityPattern = /\b(?:daha|fazladan|ekstra|birer|ikiser|ucer|dorder|beser|altisar|yediser|sekizer|dokuzar|onar|yirmiser|otuzar|yuzer|biner)\b|\b\d+['’]?(?:er|ser|ar|sar)\b/;
  const structuralValuePattern = /\b(?:\d{1,2}\s*\+\s*\d{1,2}|\d+(?:[.,]\d+)?\s*(?:m2|metrekare)|(?:tek|bir|iki|uc|\d+)\s+kat(?:li|a)?|dubleks|tripleks|balkonlu|balkonsuz)\b/g;
  const unsupportedActionPattern = /\b(?:ac|acin|acilsin|acma|acmayin|kapat[a-z]*|calistir[a-z]*|kilitle[a-z]*|aktiflestir[a-z]*|ayarla[a-z]*|boya[a-z]*|buyut[a-z]*|kucult[a-z]*|tasi|tasiyin|tasinsin|dondur[a-z]*|degistir[a-z]*)\b|\b(?:rengini|boyutunu|yerini|sicakligini)\b/;
  const unclearPolarityPattern = /\b(?:kaldir[a-z]*|cikar[a-z]*|sil[a-z]*|sok[a-z]*|istem[a-z]*|olma[a-z]*|ekleme[a-z]*|koyma[a-z]*|takma[a-z]*|yerlestirme[a-z]*)\b/;
  const unsupportedRoomPattern = /\b(?:garaj(?:a|da|daki)|bahce(?:ye|de|deki)|ofis(?:e|te|teki)|kiler(?:e|de|deki)|depo(?:ya|da|daki)|(?:cocuk|ebeveyn|misafir|calisma) oda[a-z]*)\b/;
  const specificScopePattern = /\b(?:\d+\.?\s*kat(?:ta|taki|in|indaki)|(?:zemin|ust|alt|birinci|ikinci|ucuncu) kat[a-z]*|(?:salon|banyo|mutfak|hol|antre|wc|teras|balkon)\s+\d+['’]?\s*(?:ye|ya|de|da|e|a)|\d+\s*(?:nolu|numarali)\s+(?:salon|banyo|mutfak|hol|oda))\b/;
  const questionPattern = /\b(?:neden|nicin|nasil|kac|hangisi|hangileri|nedir|calismiyor|arizali|bozuk)\b|\b(?:var mi|uygun mu|ne kadar|fiyati|maliyeti)\b/;
  const colorPattern = /\b(?:kirmizi|mavi|yesil|sari|siyah|beyaz|pembe|mor|turuncu|gri)\b/;
  const politeWords = /\b(?:lutfen|bana|ben|benim|bizim|evim|evime|evimde|evin|evi|ev|bir|icin|ve|ile|de|da|ayrica|hem|daha|olan|olsun|istiyorum|istiyoruz|yap|yapin|olustur|olusturun|hazirla|hazirlayin|plan|plani|planimi|tasarim|tasarimi|tasarimimi|adet|tane|eklemek|koymak|yerlestirmek|istiyorum)\b/g;

  function normalize(value) {
    return String(value).toLocaleLowerCase('tr').replace(/[çğıöşüâîû²]/g, char => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', '²': '2' }[char])).replace(/[’‘]/g, "'");
  }
  function escape(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function unique(values) { return [...new Set(values)]; }
  function numeric(value) { if (Object.hasOwn(numbers, value)) return numbers[value]; const parts = value.split(' '); if (parts.length === 2 && numbers[parts[0]] >= 10 && numbers[parts[1]] < 10) return numbers[parts[0]] + numbers[parts[1]]; return Number(value.replace(',', '.')); }
  function overlaps(a, b) { return a.start < b.end && b.start < a.end; }
  function matches(pattern, text) { return [...text.matchAll(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'))]; }
  function span(match, extra = {}) { return { start: match.index, end: match.index + match[0].length, ...extra }; }
  function negatedStructureFollowing(value) {
    return /^\s*(?:ve\s+)*(?:bir\s+)?(?:(?:ev|plan|duzen|olsun)\s*)?(?:istem[a-z]*|olma[a-z]*|kaldir[a-z]*|sil[a-z]*|cikar[a-z]*|degistirme[a-z]*|ekleme[a-z]*|yapma[a-z]*|hazirlama[a-z]*|olusturma[a-z]*)\b/.test(value.replace(structuralValuePattern, ' '));
  }
  function sourceRoomKind(item) {
    const room = normalize(item.room || '');
    if (/^salon|^yemek/.test(room)) return 'salon';
    if (/^ebeveyn yatak|^cocuk|^misafir/.test(room)) return 'yatak';
    if (/^ebeveyn banyo|^banyo/.test(room)) return 'banyo';
    if (/^mutfak/.test(room)) return 'mutfak';
    if (/^antre/.test(room)) return 'antre';
    if (/^koridor/.test(room)) return 'hol';
    if (/^wc$/.test(room)) return 'wc';
    if (/^balkon/.test(room)) return 'balkon';
    return null;
  }
  function itemAliases(item) {
    if (item.builtin) return item.aliases;
    const aliases = [normalize(item.name)];
    if (item.exampleProduct && !/uyumlu|home assistant|\/|\(/i.test(item.exampleProduct)) aliases.push(normalize(item.exampleProduct));
    // These aliases identify one catalog device, rather than an arbitrary room set.
    const special = {
      'device-zigbee-hub': ['zigbee hub', 'zigbee merkezi'],
      'device-varlik-sensoru-mmwave': ['varlik sensoru', 'mmwave sensoru'],
      'device-ic-kamera': ['ic kamera', 'ev ici kamera'],
      'device-dis-kamera': ['dis kamera', 'dis mekan kamerasi'],
      'device-sesli-asistan-hoparloru': ['sesli asistan', 'akilli hoparlor'],
      'device-duvar-kontrol-paneli-ekranli': ['duvar kontrol paneli', 'nspanel pro'],
      'device-akilli-radyator-vanasi': ['akilli radyator vanasi', 'radyator vanasi'],
      'device-motorlu-su-vanasi': ['motorlu su vanasi', 'akilli su vanasi'],
      'device-beyaz-esya-entegrasyonu': ['beyaz esya entegrasyonu', 'home assistant entegrasyonu']
    };
    aliases.push(...(special[item.id] || []));
    return unique(aliases).filter(alias => !['sensorler', 'sensor', 'guvenlik sensorleri', 'oturma', 'aydinlatma', 'sulama'].includes(alias));
  }
  function aliasRegex(alias) {
    const words = alias.match(/[a-z0-9]+/g);
    if (!words?.length) return null;
    return new RegExp('\\b' + words.map(escape).join("[\\s/(),+'’–—-]+") + "['’]?" + suffix + '\\b', 'g');
  }
  function getItemMatches(text, inventory) {
    const bySpan = new Map();
    for (const item of [...builtin, ...inventory]) for (const alias of itemAliases(item)) {
      const regex = aliasRegex(alias); if (!regex) continue;
      for (const match of text.matchAll(regex)) {
        const key = match.index + ':' + (match.index + match[0].length);
        if (!bySpan.has(key)) bySpan.set(key, span(match, { kind: 'item', options: [] }));
        const options = bySpan.get(key).options;
        if (!options.some(option => option.id === item.id)) options.push(item);
      }
    }
    return [...bySpan.values()];
  }
  function getRoomMatches(text) {
    const definitions = [
      ['all', /\b(?:(?:tum|butun) (?:odalara|odalarda|odalar|odaya|evde|eve)|her (?:odaya|odada|oda)|evin tamamina|her yere|allrooms)\b/g],
      ['selected', /\b(?:(?:secili|mevcut|bu) (?:odaya|odada|oda|odamda|odama)|currentroom)\b/g],
      ['yatak', /\b(?:yatak oda[a-z]*|yatakodasina|yatakodasinda)\b/g],
      ['salon', /\b(?:salon(?:a|da|daki|umda|uma)?|oturma (?:odasina|odasinda|odasi|alanina|alaninda))\b/g],
      ['mutfak', /\b(?:mutfak(?:ta|taki)?|mutfaga|mutfagima|mutfagimda)\b/g],
      ['banyo', /\bbanyo(?:ya|da|daki|ma|mda)?\b/g],
      ['hol', /\b(?:hol(?:e|de|deki|ler(?:e|de|deki)?)?|koridor(?:a|da|daki|lar(?:a|da|daki)?)?)\b/g],
      ['antre', /\b(?:antre(?:ye|de|deki)?|giris(?:e|te|teki)?)\b/g],
      ['wc', /\b(?:wc(?:ye|de)?|tuvalet(?:e|te|teki)?)\b/g],
      ['merdiven', /\bmerdiven(?:e|de|lere|lerde)?\b/g],
      ['balkon', /\bbalkon(?:a|da|daki)\b/g],
      ['teras', /\bteras(?:a|ta|taki)?\b/g]
    ];
    return definitions.flatMap(([roomKind, regex]) => [...text.matchAll(regex)].map(match => span(match, { kind: 'room', roomKind })));
  }
  function clauses(text, protectedSpans = []) {
    const result = []; let start = 0;
    const delimiters = /[,;\n.!?]|\b(?:ama|ancak|fakat)\b/g;
    for (const match of text.matchAll(delimiters)) {
      const index = match.index;
      if ((match[0] === ',' || match[0] === '.') && /\d/.test(text[index - 1] || '') && /\d/.test(text[index + 1] || '')) continue;
      if (protectedSpans.some(value => value.start < index && value.end > index)) continue;
      result.push({ start, end: index }); start = index + match[0].length;
    }
    result.push({ start, end: text.length });
    return result.filter(value => text.slice(value.start, value.end).trim());
  }
  function parse(input, context = {}) {
    context = context && typeof context === 'object' ? context : {};
    const original = typeof input === 'string' ? input : '';
    const result = { mode: 'update', settings: {}, items: [], summary: [], warnings: [], unmatched: [], recognized: [], hasChanges: false };
    const warn = message => { if (!result.warnings.includes(message)) result.warnings.push(message); };
    if (!original.trim()) { warn('Ev ölçüsünü veya eklemek/kaldırmak istediğiniz nesneyi yazın.'); return result; }
    if (original.length > 4000) { warn('İsteği en fazla 4000 karakterle ve kısa cümlelerle yazın.'); return result; }
    const text = normalize(original), consumed = [], settingsEvidence = [], inventory = Array.isArray(window.TrakswellDesignCatalog) ? window.TrakswellDesignCatalog : [];
    // These forms need a relationship/exclusion model beyond these rules. Fail closed.
    if (invalidContext.test(text)) { result.unmatched.push(original.trim()); warn('Alternatif veya istisna içeren istek otomatik uygulanamaz. Tek bir ölçü/seçenek ve açık oda hedefleriyle yeniden yazın.'); return result; }
    if (specificScopePattern.test(text) || unsupportedRoomPattern.test(text)) { result.unmatched.push(original.trim()); warn('Numaralı, belirli kattaki veya bu yardımcıda tanımlı olmayan oda otomatik seçilemez. Önce hedef odayı seçin ve “seçili odaya” yazın.'); return result; }
    const consume = value => consumed.push({ start: value.start, end: value.end });
    const excerpt = value => original.slice(value.start, value.end).trim();
    const initialClauses = clauses(text);
    const clauseFor = value => initialClauses.find(part => value.start >= part.start && value.start < part.end) || { start: 0, end: text.length };
    const structureFollowing = (value, clause) => {
      let following = text.slice(value.end, clause.end), index = initialClauses.indexOf(clause);
      // Commas can join a measurement list governed by one trailing negation.
      // An explicit positive verb or sentence boundary closes that list.
      while (index >= 0 && index + 1 < initialClauses.length && !following.replace(structuralValuePattern, ' ').replace(/\b(?:ve|bir|ev|plan|duzen)\b/g, ' ').trim()) {
        const current = initialClauses[index], next = initialClauses[index + 1];
        if (!/^\s*,\s*$/.test(text.slice(current.end, next.start))) break;
        following += ' ' + text.slice(next.start, next.end); index++;
      }
      return following;
    };
    const structural = (match, values, label) => {
      const value = span(match), clause = clauseFor(value), sentence = text.slice(clause.start, clause.end);
      // A final negation can govern several adjacent measurements, such as
      // “3+1 150 m2 ev istemiyorum”. Do not retain only the earlier measurement.
      const negated = negatedStructureFollowing(structureFollowing(value, clause));
      consume(value);
      if (invalidContext.test(sentence) || questionPattern.test(sentence) || negated || /\ben (?:az|fazla)\b|\b(?:minimum|maksimum|altinda|ustunde|arasinda)\b/.test(sentence)) {
        warn('Ölçü/kat isteği belirsiz olduğu için değiştirilmedi: “' + excerpt(clause) + '”.');
        for (const key of Object.keys(values)) settingsEvidence.push({ key, invalid: true });
        return;
      }
      for (const [key, amount] of Object.entries(values)) settingsEvidence.push({ key, amount, label });
    };
    for (const match of text.matchAll(/\b(\d{1,2})\s*\+\s*(\d{1,2})\b/g)) structural(match, { bedrooms: Number(match[1]), living: Number(match[2]) }, match[1] + '+' + match[2] + ' oda düzeni');
    for (const match of text.matchAll(/\b(\d+(?:[.,]\d+)?)\s*(?:m2|metrekare)\b/g)) structural(match, { area: Number(match[1].replace(',', '.')) }, match[1] + ' m² kapalı alan');
    for (const match of text.matchAll(/\b(tek|bir|iki|uc|\d+)\s+kat(?:li|a)?\b|\b(dubleks|tripleks)\b/g)) structural(match, { floors: match[2] ? (match[2] === 'dubleks' ? 2 : 3) : numeric(match[1]) }, (match[2] || match[1] + ' kat'));
    const balconyRules = [
      [false, /\bbalkonsuz\b|\bbalkon(?:u)?\s+(?:istemiyorum|istemiyoruz|olmasin|olmamali|kaldir(?:in)?|cikar(?:in)?|sil(?:in)?)\b/g],
      [true, /\bbalkonlu\b|\bbalkon(?:u)?\s+(?:istiyorum|istiyoruz|olsun|ekle(?:yin)?|ilave et)\b/g]
    ];
    for (const [amount, regex] of balconyRules) for (const match of text.matchAll(regex)) {
      const value = span(match), clause = clauseFor(value); consume(value);
      const following = /^balkon(?:lu|suz)$/.test(match[0]) ? structureFollowing(value, clause) : text.slice(value.end, clause.end);
      if (invalidContext.test(text.slice(clause.start, clause.end)) || questionPattern.test(text.slice(clause.start, clause.end)) || negatedStructureFollowing(following)) { settingsEvidence.push({ key: 'balcony', invalid: true }); warn('Balkon isteği belirsiz olduğu için değiştirilmedi: “' + excerpt(clause) + '”.'); }
      else settingsEvidence.push({ key: 'balcony', amount, label: amount ? 'Balkon eklensin' : 'Balkon kaldırılsın' });
    }
    for (const match of text.matchAll(/\bbalkon(?:u)?\s+(?:ekleme(?:yin)?|kaldirma(?:yin)?|silme(?:yin)?|cikarma(?:yin)?)\b/g)) { consume(span(match)); result.recognized.push('Balkon değiştirilmeyecek.'); }
    const limits = { bedrooms: [1, 12], living: [1, 3], area: [45, 600], floors: [1, 3] };
    for (const key of ['bedrooms', 'living', 'area', 'floors', 'balcony']) {
      const evidence = settingsEvidence.filter(value => value.key === key); if (!evidence.length) continue;
      const values = unique(evidence.map(value => value.amount).filter(value => value !== undefined));
      if (evidence.some(value => value.invalid) || values.length !== 1) { if (values.length > 1) warn('Birbiriyle çelişen ' + ({ bedrooms: 'oda sayıları', living: 'salon sayıları', area: 'alan ölçüleri', floors: 'kat sayıları', balcony: 'balkon istekleri' }[key]) + ' var; bu ayar değiştirilmedi.'); continue; }
      const value = values[0];
      if (limits[key] && (!Number.isFinite(value) || value < limits[key][0] || value > limits[key][1] || (key !== 'area' && !Number.isInteger(value)))) { warn(({ bedrooms: 'Oda sayısı', living: 'Salon sayısı', area: 'Kapalı alan', floors: 'Kat sayısı' }[key]) + ' ' + limits[key].join('–') + ' aralığında olmalı; bu ayar değiştirilmedi.'); continue; }
      result.settings[key] = value;
    }
    // A contradictory N+M layout never applies half of its structure.
    if (settingsEvidence.some(value => value.key === 'bedrooms') && (!Object.hasOwn(result.settings, 'bedrooms') || !Object.hasOwn(result.settings, 'living'))) { delete result.settings.bedrooms; delete result.settings.living; }
    for (const match of text.matchAll(/\b(?:yeni (?:bir )?plan (?:olustur|hazirla)|bastan (?:olustur|hazirla))\b/g)) {
      const value = span(match), clause = clauseFor(value); consume(value);
      if (!invalidContext.test(text.slice(clause.start, clause.end))) result.mode = 'new';
      else warn('Yeni plan oluşturma isteği belirsiz; mevcut plan korunacak.');
    }
    if (/\b(?:degistirmeden|bozmadan|koruyarak)\b|\b(?:mevcut |eski )?(?:plan[a-z]*|ev[a-z]*)\s+(?:degistirme[a-z]*|koru[a-z]*|bozma[a-z]*|ayni kalsin)\b/.test(text)) {
      if (result.mode === 'new' || Object.keys(result.settings).length) warn('Mevcut planı koruma isteğiyle çelişen yeni plan/ölçü değişikliği hazırlanmadı.');
      result.mode = 'update'; result.settings = {};
    }
    const presetDefinitions = [
      { id: 'comfort', name: 'Konfor', regex: /\b(?:konfor(?:u)?(?: artir)?|konforlu(?: (?:bir )?ev)?)\b/g, devices: [['automation-curtain', 'salon'], ['automation-curtain', 'yatak'], ['automation-climate', 'salon']] },
      { id: 'security', name: 'Güvenlik', regex: /\b(?:guvenlik(?: istiyorum)?|guvenligi(?: artir)?|guvenli(?: (?:bir )?ev| olsun)?)\b/g, devices: [['sensor-door', 'antre'], ['sensor-motion', 'hol'], ['sensor-smoke', 'hol'], ['sensor-water', 'mutfak'], ['sensor-water', 'banyo']] },
      { id: 'energy', name: 'Enerji tasarrufu', regex: /\b(?:enerji tasarrufu|enerji tasarruflu|elektrik tasarrufu|enerji verimliligi|enerji verimli|enerjiden tasarruf)\b/g, devices: [['sensor-motion', 'hol'], ['automation-light', 'salon'], ['automation-socket', 'salon'], ['sensor-temperature', 'salon']] }
    ];
    const presetMatches = presetDefinitions.flatMap(preset => [...text.matchAll(preset.regex)].map(match => span(match, { kind: 'preset', preset })));
    const candidates = [...getItemMatches(text, inventory), ...getRoomMatches(text), ...presetMatches].filter(value => !consumed.some(used => overlaps(value, used)));
    candidates.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start || (a.kind === 'room' ? -1 : 1));
    const chosen = [];
    for (const value of candidates) if (!chosen.some(other => overlaps(value, other))) chosen.push(value);
    chosen.sort((a, b) => a.start - b.start);
    const parts = clauses(text, chosen);
    let inheritedTargets = [], pendingTargets = [], previousItemTypes = [];
    for (const part of parts) {
      const content = text.slice(part.start, part.end), localMatches = chosen.filter(value => value.start >= part.start && value.end <= part.end);
      const roomMatches = localMatches.filter(value => value.kind === 'room'), entries = localMatches.filter(value => value.kind !== 'room');
      roomMatches.forEach(consume);
      const noAddition = matches(noAdditionPattern, content).map(match => ({ ...span(match), action: 'none' }));
      const actions = [
        ...noAddition,
        ...matches(noChangePattern, content).map(match => ({ ...span(match), action: 'none' })),
        ...matches(removePattern, content).map(match => ({ ...span(match), action: 'remove' })).filter(value => !noAddition.some(other => overlaps(value, other))),
        ...matches(addPattern, content).map(match => ({ ...span(match), action: 'add' })).filter(value => !noAddition.some(other => overlaps(value, other)))
      ].map(value => ({ ...value, start: value.start + part.start, end: value.end + part.start })).filter(value => !consumed.some(used => overlaps(value, used))).sort((a, b) => a.start - b.start);
      actions.forEach(consume);
      if (!entries.length) {
        if ((roomMatches.length || actions.length) && previousItemTypes.length) {
          result.items = result.items.filter(item => !previousItemTypes.includes(item.type));
          warn('Nesne adı tekrarlanmayan oda/istisna cümlesi belirsiz; ilişkili nesne önerileri hazırlanmadı: “' + excerpt(part) + '”.');
        } else if (roomMatches.length) pendingTargets = unique([...pendingTargets, ...roomMatches.map(value => value.roomKind)]);
        continue;
      }
      if (questionPattern.test(content)) { entries.forEach(consume); warn('Soru veya arıza bildirimi plan değişikliği olarak uygulanmaz: “' + excerpt(part) + '”.'); continue; }
      if (invalidContext.test(content)) { entries.forEach(consume); warn('Alternatif, istisna veya çelişki içeren bölüm uygulanmadı: “' + excerpt(part) + '”.'); continue; }
      let activeTargets = inheritedTargets; const trailingTargets = new Set();
      for (let index = 0; index < entries.length; index++) {
        const entry = entries[index], previousEnd = index ? entries[index - 1].end : part.start, nextStart = entries[index + 1]?.start ?? part.end;
        const before = roomMatches.filter(value => value.start >= previousEnd && value.end <= entry.start && !trailingTargets.has(value));
        if (before.length || pendingTargets.length) { activeTargets = unique([...pendingTargets, ...before.map(value => value.roomKind)]); pendingTargets = []; }
        const after = roomMatches.filter(value => value.start >= entry.end && value.end <= nextStart && !/\bve\b/.test(text.slice(entry.end, value.start)));
        if (!before.length && after.length) { activeTargets = unique(after.map(value => value.roomKind)); after.forEach(value => trailingTargets.add(value)); }
        const targets = activeTargets.length ? activeTargets : ['selected'];
        const afterActions = actions.filter(value => value.start >= entry.end && value.start < nextStart);
        const allActions = unique(actions.map(value => value.action));
        const actionKinds = unique(afterActions.map(value => value.action));
        const action = actionKinds.length === 1 ? actionKinds[0] : actionKinds.length > 1 ? 'ambiguous' : allActions.length <= 1 ? (allActions[0] || 'add') : 'ambiguous';
        consume(entry);
        if (action === 'none') { result.recognized.push('“' + excerpt(entry) + '” için değişiklik yapılmayacak.'); continue; }
        if (action === 'ambiguous') { warn('Ekleme/kaldırma yönü belirsiz: “' + excerpt(entry) + '”.'); continue; }
        const actionWindow = text.slice(previousEnd, nextStart);
        const leading = text.slice(previousEnd, entry.start), trailing = text.slice(entry.end, nextStart);
        const precedingJoin = [...leading.matchAll(/\bve\b/g)].pop(), followingJoin = /\bve\b/.exec(trailing);
        const previousAction = actions.filter(value => value.start >= previousEnd && value.end <= entry.start).pop();
        const entryStart = Math.max(previousEnd, precedingJoin ? previousEnd + precedingJoin.index + precedingJoin[0].length : previousEnd, previousAction?.end || previousEnd);
        const entryEnd = followingJoin ? entry.end + followingJoin.index : nextStart;
        const entryActionWindow = text.slice(entryStart, entryEnd);
        if (action === 'remove' && additionProcessPattern.test(entryActionWindow)) { warn('Ekleme işlemiyle ilgili olumsuz ifade mevcut nesneleri kaldırmaz; bu nesne değiştirilmedi: “' + excerpt(entry) + '”.'); continue; }
        if (unsupportedActionPattern.test(actionWindow) || /\b(?:devre disi|devreden|pasiflestir|durdur|duraklat|sustur)\b/.test(actionWindow) || (colorPattern.test(actionWindow) && !actions.some(value => value.action === 'add' || value.action === 'remove'))) { warn('Canlı cihaz kontrolü, renk, boyut veya taşıma komutu desteklenmiyor: “' + excerpt(part) + '”.'); continue; }
        if (unsupportedRoomPattern.test(actionWindow)) { warn('Bu oda hedefi otomatik seçilemiyor: “' + excerpt(part) + '”. Önce odayı seçip “seçili odaya” yazın.'); continue; }
        const unknownActionText = actionWindow.split('');
        for (const value of consumed) for (let pos = Math.max(previousEnd, value.start); pos < Math.min(nextStart, value.end); pos++) unknownActionText[pos - previousEnd] = ' ';
        if (unclearPolarityPattern.test(unknownActionText.join(''))) { warn('Ekleme/kaldırma yönü tam anlaşılamadı: “' + excerpt(part) + '”. “Ekle”, “kaldır” veya “değiştirme” kullanın.'); continue; }
        if (targets.includes('all') && targets.length > 1 || targets.includes('selected') && targets.length > 1) { warn('Oda hedefi belirsiz: “' + excerpt(part) + '”.'); continue; }
        if (entry.kind === 'preset') {
          if (action !== 'add') { warn(entry.preset.name + ' bir hedef başlığıdır; kaldırılacak cihazı adıyla belirtin.'); continue; }
          for (const [type, roomKind] of entry.preset.devices) for (const target of activeTargets.length ? targets : [roomKind]) result.items.push({ type, roomKind: target, action: 'add', quantity: 1 });
          result.recognized.push(entry.preset.name + ' hedefi için örnek cihaz önerileri hazırlandı; uygulamadan önce listeyi kontrol edin.');
          continue;
        }
        if (unsupportedQuantityPattern.test(entryActionWindow)) { warn('“Daha/fazladan” veya “ikişer” gibi eklemeli/dağıtmalı adetler otomatik uygulanamaz. Oda başına ulaşılacak toplam adedi yazın: “' + excerpt(part) + '”.'); continue; }
        let options = entry.options;
        const base = options.filter(option => option.builtin);
        if (base.length) options = base;
        if (context.professional !== true && !base.length) { warn('“' + excerpt(entry) + '” ayrıntılı envanterdedir; kullanmak için Profesyonel tasarım modunu açın.'); continue; }
        const effectiveKinds = targets.map(value => value === 'selected' ? context.selectedRoomKind : value).filter(Boolean);
        if (options.length > 1) {
          const exact = options.filter(option => effectiveKinds.includes(sourceRoomKind(option)));
          if (exact.length === 1) options = exact;
          else { const devices = options.filter(option => option.inventoryType === 'smart-device'); if (devices.length === 1) options = devices; }
        }
        if (options.length !== 1) { warn('Birden fazla envanter seçeneği var: “' + excerpt(entry) + '”. Odayı veya daha ayrıntılı ürün adını belirtin.'); continue; }
        const beforeText = text.slice(previousEnd, entry.start), afterText = text.slice(entry.end, nextStart);
        const quantityBefore = new RegExp('(?:^|\\s)(' + numberPattern + ')\\s*(?:adet|tane)?\\s*$').exec(beforeText);
        const quantityAfter = new RegExp('^\\s*(' + numberPattern + ')\\s*(?:adet|tane)\\b').exec(afterText);
        const quantityMatch = quantityBefore || quantityAfter;
        let quantity = action === 'add' ? 1 : undefined;
        if (quantityMatch) {
          quantity = numeric(quantityMatch[1]);
          const start = quantityBefore ? previousEnd + quantityMatch.index : entry.end + quantityMatch.index;
          consume({ start, end: start + quantityMatch[0].length });
          if (!Number.isInteger(quantity) || quantity < 1 || quantity > 30) { warn('Nesne sayısı 1–30 arasında tam sayı olmalı: “' + excerpt(entry) + '”.'); continue; }
          const quantityPrefix = beforeText.split('');
          for (const value of consumed) for (let pos = Math.max(previousEnd, value.start); pos < Math.min(entry.start, value.end); pos++) quantityPrefix[pos - previousEnd] = ' ';
          if (new RegExp('\\b(?:' + numberPattern + ')\\b').test(quantityPrefix.join(''))) { warn('Aynı nesne önünde birden fazla sayı var; kesin bir adet yazın: “' + excerpt(part) + '”.'); continue; }
        }
        if (/\b(?:en fazla|en cok|maksimum)\b|\b\d+\s*(?:den|dan)?\s*(?:fazla|az|kadar)\b/.test(actionWindow)) { warn('Üst sınır veya karşılaştırmalı adet otomatik uygulanamaz; kesin bir sayı yazın: “' + excerpt(part) + '”.'); continue; }
        const targetPrefix = beforeText.split('');
        for (const value of consumed) for (let pos = Math.max(previousEnd, value.start); pos < Math.min(entry.start, value.end); pos++) targetPrefix[pos - previousEnd] = ' ';
        if (/\b[a-z]{3,}(?:ya|ye|na|ne|da|de|ta|te|a|e)\b/.test(targetPrefix.join('').replace(politeWords, ' '))) { warn('Oda hedefinin bir bölümü tanınmadı; seçili odaya yönlendirilmedi: “' + excerpt(part) + '”.'); continue; }
        // Bare recognized item lists mean add. An unknown verb/modifier must not
        // silently turn an unsupported request (for example “azalt”) into add.
        if (!actions.length) {
          const unparsed = actionWindow.split('');
          for (const value of consumed) for (let pos = Math.max(previousEnd, value.start); pos < Math.min(nextStart, value.end); pos++) unparsed[pos - previousEnd] = ' ';
          const residue = unparsed.join('').replace(politeWords, ' ').replace(/[\s,;:.!?+'"()\/–—-]+/g, ' ').trim();
          if (residue) { warn('Nesne adı anlaşıldı ancak işlem belirsiz; “ekle” veya “kaldır” yazarak netleştirin: “' + excerpt(part) + '”.'); continue; }
        }
        for (const roomKind of targets) result.items.push({ type: options[0].id, roomKind, action, ...(quantity === undefined ? {} : { quantity }) });
      }
      if (activeTargets.length) inheritedTargets = activeTargets;
      previousItemTypes = unique(entries.filter(entry => entry.kind === 'item').flatMap(entry => entry.options.map(option => option.id)));
    }
    // Repeated compatible mentions merge; opposite intents never win by order.
    const grouped = new Map(), conflicting = new Set();
    const effectiveRoom = item => item.roomKind === 'selected' ? (context.selectedRoomKind || 'selected') : item.roomKind;
    for (const item of result.items) for (const other of result.items) if (item !== other && item.type === other.type && item.action !== other.action && (item.roomKind === 'all' || other.roomKind === 'all' || (!context.selectedRoomKind && (item.roomKind === 'selected' || other.roomKind === 'selected')) || effectiveRoom(item) === effectiveRoom(other))) { conflicting.add(item); conflicting.add(other); }
    for (const item of result.items) {
      if (conflicting.has(item)) { warn('Aynı nesne ve örtüşen odalar için hem ekleme hem kaldırma istendi; bu nesne değiştirilmedi.'); continue; }
      const key = item.type + ':' + item.roomKind;
      if (!grouped.has(key)) grouped.set(key, []); grouped.get(key).push(item);
    }
    result.items = [];
    for (const values of grouped.values()) {
      if (unique(values.map(value => value.action)).length > 1) { warn('Aynı nesne için hem ekleme hem kaldırma istendi; değiştirilmedi: ' + values[0].type + '.'); continue; }
      if (unique(values.map(value => value.quantity).filter(value => value !== undefined)).length > 1) { warn('Aynı nesne ve oda için farklı adetler istendi; nesne sayısı değiştirilmedi.'); continue; }
      const value = { ...values[0] };
      if (value.action === 'remove' && values.some(item => item.quantity === undefined)) delete value.quantity;
      else value.quantity = Math.max(...values.map(item => item.quantity || 1));
      result.items.push(value);
    }
    const allItems = new Map([...builtin, ...inventory].map(item => [item.id, item]));
    if (result.mode === 'new') result.summary.push('Mevcut planın yerine yeni bir taslak oluşturulsun.');
    if (Object.hasOwn(result.settings, 'bedrooms')) result.summary.push(result.settings.bedrooms + '+' + result.settings.living + ' oda düzeni.');
    if (Object.hasOwn(result.settings, 'area')) result.summary.push(result.settings.area + ' m² toplam kapalı alan.');
    if (Object.hasOwn(result.settings, 'floors')) result.summary.push(result.settings.floors + ' kat.');
    if (Object.hasOwn(result.settings, 'balcony')) result.summary.push(result.settings.balcony ? 'Balkon eklensin.' : 'Balkon kaldırılsın.');
    for (const item of result.items) result.summary.push(roomLabels[item.roomKind] + ': ' + (allItems.get(item.type)?.name || item.type) + (item.action === 'add' ? ' en az ' + item.quantity + ' adet olsun.' : item.quantity ? ' en fazla ' + item.quantity + ' adet kaldırılsın.' : ' seçenekleri kaldırılsın.'));
    for (const part of parts) {
      let remainder = text.slice(part.start, part.end).split('');
      for (const value of consumed) for (let index = Math.max(part.start, value.start); index < Math.min(part.end, value.end); index++) remainder[index - part.start] = ' ';
      const unknown = remainder.join('').replace(politeWords, ' ').replace(/[\s,;:.!?+'"()\/–—-]+/g, ' ').trim();
      if (unknown) { const phrase = excerpt(part); if (!result.unmatched.includes(phrase)) result.unmatched.push(phrase); }
    }
    for (const phrase of result.unmatched) warn('Bu bölümde desteklenmeyen veya anlaşılamayan ifade var: “' + phrase + '”. Yalnızca önizlemede listelenen değişiklikler hazırlanır.');
    result.summary.push(...result.recognized);
    result.hasChanges = result.mode === 'new' || Object.keys(result.settings).length > 0 || result.items.length > 0;
    if (!result.hasChanges && !result.warnings.length) warn('Bu istekte uygulanacak bir değişiklik yok.');
    return result;
  }

  window.TrakswellDesignAssistant = Object.freeze({ parse, kind: 'local-rules', version: 1 });
})();
