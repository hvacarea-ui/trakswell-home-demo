/* Professional design inventory from Akilli_Ev_Envanter_3D.xlsx.
 * Source rows and raw source fields are retained; schematic primitive families
 * are presentation hints. No product dimensions, prices or compatibility claims
 * are inferred from the render primitives. The standard showroom does not use
 * this catalog unless professional design mode explicitly selects an item.
 */
(function () {
  "use strict";
  const freeze = (value) => {
    if (value && typeof value === "object") {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  };
  window.TrakswellDesignCatalog = freeze([
  {
    "id": "inventory-antre-giris-dis-kapi",
    "inventoryType": "room-item",
    "name": "Dış kapı",
    "category": "Kapı",
    "room": "Antre / Giriş",
    "description": "Standart: Çelik kapı. Lüks: Çelik kapı + akıllı kilit (parmak izi/şifre). Akıllı ev: Akıllı kilit, kapı sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "100×210 (G×Y)",
    "standard": "Çelik kapı",
    "luxury": "Çelik kapı + akıllı kilit (parmak izi/şifre)",
    "smartConnection": "Akıllı kilit, kapı sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 2
    }
  },
  {
    "id": "inventory-antre-giris-portmanto-vestiyer",
    "inventoryType": "room-item",
    "name": "Portmanto / vestiyer",
    "category": "Mobilya",
    "room": "Antre / Giriş",
    "description": "Standart: Duvar askılığı + ayna. Lüks: Gömme vestiyer dolabı (tavana kadar).",
    "primitiveType": "wardrobe",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "100×40×200",
    "standard": "Duvar askılığı + ayna",
    "luxury": "Gömme vestiyer dolabı (tavana kadar)",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 3
    }
  },
  {
    "id": "inventory-antre-giris-ayakkabilik",
    "inventoryType": "room-item",
    "name": "Ayakkabılık",
    "category": "Mobilya",
    "room": "Antre / Giriş",
    "description": "Standart: Kapaklı ayakkabılık. Lüks: Gömme ayakkabı dolabı, iç aydınlatmalı. Akıllı ev: Dolap içi LED (kapak sensörlü).",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "100×35×110",
    "standard": "Kapaklı ayakkabılık",
    "luxury": "Gömme ayakkabı dolabı, iç aydınlatmalı",
    "smartConnection": "Dolap içi LED (kapak sensörlü)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 4
    }
  },
  {
    "id": "inventory-antre-giris-ayna",
    "inventoryType": "room-item",
    "name": "Ayna",
    "category": "Mobilya",
    "room": "Antre / Giriş",
    "description": "Standart: Duvar aynası. Lüks: Aydınlatmalı boy aynası.",
    "primitiveType": "generic",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "60×120",
    "standard": "Duvar aynası",
    "luxury": "Aydınlatmalı boy aynası",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 5
    }
  },
  {
    "id": "inventory-antre-giris-puf-oturak",
    "inventoryType": "room-item",
    "name": "Puf / oturak",
    "category": "Mobilya",
    "room": "Antre / Giriş",
    "description": "Lüks: Döşemeli bench / puf.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "80×40×45",
    "standard": "–",
    "luxury": "Döşemeli bench / puf",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 6
    }
  },
  {
    "id": "inventory-antre-giris-konsol",
    "inventoryType": "room-item",
    "name": "Konsol",
    "category": "Mobilya",
    "room": "Antre / Giriş",
    "description": "Lüks: Konsol + dekor obje.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "120×35×80",
    "standard": "–",
    "luxury": "Konsol + dekor obje",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 7
    }
  },
  {
    "id": "inventory-antre-giris-paspas-yolluk",
    "inventoryType": "room-item",
    "name": "Paspas / yolluk",
    "category": "Tekstil/Dekor",
    "room": "Antre / Giriş",
    "description": "Standart: Kapı paspası. Lüks: Özel ölçü yolluk halı.",
    "primitiveType": "rug",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "60×90",
    "standard": "Kapı paspası",
    "luxury": "Özel ölçü yolluk halı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 8
    }
  },
  {
    "id": "inventory-antre-giris-tavan-aydinlatmasi",
    "inventoryType": "room-item",
    "name": "Tavan aydınlatması",
    "category": "Aydınlatma",
    "room": "Antre / Giriş",
    "description": "Standart: Tavan armatürü. Lüks: Spot + gizli LED. Akıllı ev: Hareketle yanan ışık (röle + sensör).",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Tavan armatürü",
    "luxury": "Spot + gizli LED",
    "smartConnection": "Hareketle yanan ışık (röle + sensör)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 9
    }
  },
  {
    "id": "inventory-antre-giris-elektrik-panosu-sigorta-kutusu",
    "inventoryType": "room-item",
    "name": "Elektrik panosu (sigorta kutusu)",
    "category": "Tesisat",
    "room": "Antre / Giriş",
    "description": "Standart: Standart pano. Akıllı ev: Enerji ölçer pano içinde.",
    "primitiveType": "panel",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "35×10×45",
    "standard": "Standart pano",
    "luxury": "Standart pano",
    "smartConnection": "Enerji ölçer pano içinde",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 10
    }
  },
  {
    "id": "inventory-antre-giris-diafon",
    "inventoryType": "room-item",
    "name": "Diafon",
    "category": "Tesisat",
    "room": "Antre / Giriş",
    "description": "Standart: Sesli/görüntülü diafon. Lüks: Görüntülü akıllı kapı zili. Akıllı ev: Telefona bildirim, kapı kamerası.",
    "primitiveType": "panel",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "Duvar tipi",
    "standard": "Sesli/görüntülü diafon",
    "luxury": "Görüntülü akıllı kapı zili",
    "smartConnection": "Telefona bildirim, kapı kamerası",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 11
    }
  },
  {
    "id": "inventory-antre-giris-kontrol-paneli-sahne-butonu",
    "inventoryType": "room-item",
    "name": "Kontrol paneli / sahne butonu",
    "category": "Akıllı ev",
    "room": "Antre / Giriş",
    "description": "Standart: Kablosuz 'Evden çıktım' butonu. Lüks: Dokunmatik duvar paneli (NSPanel Pro). Akıllı ev: Tüm ev senaryoları.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "86×86 mm kutu",
    "standard": "Kablosuz 'Evden çıktım' butonu",
    "luxury": "Dokunmatik duvar paneli (NSPanel Pro)",
    "smartConnection": "Tüm ev senaryoları",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 12
    }
  },
  {
    "id": "inventory-salon-oturma-kanepe-3-lu",
    "inventoryType": "room-item",
    "name": "Kanepe (3'lü)",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: 3'lü kanepe (koltuk takımı 3+3+1 veya 3+2+1). Lüks: Modüler L/köşe koltuk, deri veya kadife.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Std 220×90×85 / Köşe 300×200×85",
    "standard": "3'lü kanepe (koltuk takımı 3+3+1 veya 3+2+1)",
    "luxury": "Modüler L/köşe koltuk, deri veya kadife",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 13
    }
  },
  {
    "id": "inventory-salon-oturma-kanepe-2-li-veya-2-3-lu",
    "inventoryType": "room-item",
    "name": "Kanepe (2'li veya 2. 3'lü)",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: 2'li ya da ikinci 3'lü kanepe. Lüks: Köşe koltuk varsa yok.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "160×90×85",
    "standard": "2'li ya da ikinci 3'lü kanepe",
    "luxury": "Köşe koltuk varsa yok",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 14
    }
  },
  {
    "id": "inventory-salon-oturma-tekli-koltuk-berjer",
    "inventoryType": "room-item",
    "name": "Tekli koltuk / berjer",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: 1–2 berjer. Lüks: Elektrikli dinlenme koltuğu (recliner). Akıllı ev: Recliner için akıllı priz.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "80×85×100",
    "standard": "1–2 berjer",
    "luxury": "Elektrikli dinlenme koltuğu (recliner)",
    "smartConnection": "Recliner için akıllı priz",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 15
    }
  },
  {
    "id": "inventory-salon-oturma-orta-sehpa",
    "inventoryType": "room-item",
    "name": "Orta sehpa",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: Ahşap/cam orta sehpa. Lüks: Mermer/traverten orta sehpa.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "110×60×45",
    "standard": "Ahşap/cam orta sehpa",
    "luxury": "Mermer/traverten orta sehpa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 16
    }
  },
  {
    "id": "inventory-salon-oturma-yan-sehpa",
    "inventoryType": "room-item",
    "name": "Yan sehpa",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: 1–2 yan sehpa. Lüks: Kablosuz şarjlı yan sehpa.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "50×50×55",
    "standard": "1–2 yan sehpa",
    "luxury": "Kablosuz şarjlı yan sehpa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 17
    }
  },
  {
    "id": "inventory-salon-oturma-tv-unitesi",
    "inventoryType": "room-item",
    "name": "TV ünitesi",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: TV sehpası. Lüks: Duvar paneli + gömme/asma TV ünitesi. Akıllı ev: Hub ve modem genelde burada.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Std 180×40×50 / Lüks 300×40",
    "standard": "TV sehpası",
    "luxury": "Duvar paneli + gömme/asma TV ünitesi",
    "smartConnection": "Hub ve modem genelde burada",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 18
    }
  },
  {
    "id": "inventory-salon-oturma-kitaplik-vitrin",
    "inventoryType": "room-item",
    "name": "Kitaplık / vitrin",
    "category": "Mobilya",
    "room": "Salon / Oturma",
    "description": "Standart: Kitaplık veya vitrin. Lüks: Tavana kadar kitaplık, iç LED. Akıllı ev: Raf LED kontrolü.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "90×40×200",
    "standard": "Kitaplık veya vitrin",
    "luxury": "Tavana kadar kitaplık, iç LED",
    "smartConnection": "Raf LED kontrolü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 19
    }
  },
  {
    "id": "inventory-salon-oturma-hali",
    "inventoryType": "room-item",
    "name": "Halı",
    "category": "Tekstil/Dekor",
    "room": "Salon / Oturma",
    "description": "Standart: Makine halısı. Lüks: El dokuma / özel ölçü halı.",
    "primitiveType": "rug",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "200×290 / 240×340",
    "standard": "Makine halısı",
    "luxury": "El dokuma / özel ölçü halı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 20
    }
  },
  {
    "id": "inventory-salon-oturma-perde",
    "inventoryType": "room-item",
    "name": "Perde",
    "category": "Tekstil/Dekor",
    "room": "Salon / Oturma",
    "description": "Standart: Tül + fon perde, korniş. Lüks: Perde kutusu + motorlu tül ve fon / stor. Akıllı ev: Perde motoru (2 kanal: tül + fon).",
    "primitiveType": "curtain",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "Pencere genişliği",
    "standard": "Tül + fon perde, korniş",
    "luxury": "Perde kutusu + motorlu tül ve fon / stor",
    "smartConnection": "Perde motoru (2 kanal: tül + fon)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 21
    }
  },
  {
    "id": "inventory-salon-oturma-kirlent-tablo-saksi-bitki-vazo",
    "inventoryType": "room-item",
    "name": "Kırlent, tablo, saksı bitki, vazo",
    "category": "Tekstil/Dekor",
    "room": "Salon / Oturma",
    "description": "Lüks: Var (sanat eseri, büyük bitki).",
    "primitiveType": "plant",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Var (sanat eseri, büyük bitki)",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 22
    }
  },
  {
    "id": "inventory-salon-oturma-avize-tavan",
    "inventoryType": "room-item",
    "name": "Avize / tavan",
    "category": "Aydınlatma",
    "room": "Salon / Oturma",
    "description": "Standart: Avize. Lüks: Asma tavan gizli LED + spot + avize. Akıllı ev: Dimmer, sahneler (Sinema, Misafir).",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Avize",
    "luxury": "Asma tavan gizli LED + spot + avize",
    "smartConnection": "Dimmer, sahneler (Sinema, Misafir)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 23
    }
  },
  {
    "id": "inventory-salon-oturma-lambader",
    "inventoryType": "room-item",
    "name": "Lambader",
    "category": "Aydınlatma",
    "room": "Salon / Oturma",
    "description": "Standart: 1 lambader. Lüks: Lambader + aplik. Akıllı ev: Akıllı priz.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "40×40×170",
    "standard": "1 lambader",
    "luxury": "Lambader + aplik",
    "smartConnection": "Akıllı priz",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 24
    }
  },
  {
    "id": "inventory-salon-oturma-televizyon",
    "inventoryType": "room-item",
    "name": "Televizyon",
    "category": "Elektronik",
    "room": "Salon / Oturma",
    "description": "Standart: 55\" TV. Lüks: 75–85\" TV. Akıllı ev: IR veya TV'nin kendi Wi-Fi'ı.",
    "primitiveType": "tv",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "55\" ≈123×71 / 75\" ≈167×96",
    "standard": "55\" TV",
    "luxury": "75–85\" TV",
    "smartConnection": "IR veya TV'nin kendi Wi-Fi'ı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 25
    }
  },
  {
    "id": "inventory-salon-oturma-ses-sistemi",
    "inventoryType": "room-item",
    "name": "Ses sistemi",
    "category": "Elektronik",
    "room": "Salon / Oturma",
    "description": "Lüks: Soundbar veya 5.1 ev sinema. Akıllı ev: Sinema senaryosu.",
    "primitiveType": "speaker",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "Soundbar ≈100×10×6",
    "standard": "–",
    "luxury": "Soundbar veya 5.1 ev sinema",
    "smartConnection": "Sinema senaryosu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 26
    }
  },
  {
    "id": "inventory-salon-oturma-modem-wi-fi",
    "inventoryType": "room-item",
    "name": "Modem / Wi-Fi",
    "category": "Elektronik",
    "room": "Salon / Oturma",
    "description": "Standart: Modem. Lüks: Mesh Wi-Fi noktaları. Akıllı ev: Ağ altyapısı.",
    "primitiveType": "generic",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Modem",
    "luxury": "Mesh Wi-Fi noktaları",
    "smartConnection": "Ağ altyapısı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 27
    }
  },
  {
    "id": "inventory-salon-oturma-sesli-asistan-hoparloru",
    "inventoryType": "room-item",
    "name": "Sesli asistan hoparlörü",
    "category": "Elektronik",
    "room": "Salon / Oturma",
    "description": "Lüks: Akıllı hoparlör. Akıllı ev: Sesli komut.",
    "primitiveType": "speaker",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "–",
    "luxury": "Akıllı hoparlör",
    "smartConnection": "Sesli komut",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 28
    }
  },
  {
    "id": "inventory-salon-oturma-klima",
    "inventoryType": "room-item",
    "name": "Klima",
    "category": "İklimlendirme",
    "room": "Salon / Oturma",
    "description": "Standart: Duvar tipi split 12.000 BTU. Lüks: VRF kaset / gizli tavan. Akıllı ev: IR kumanda modülü.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "İç ünite ≈80×20×30",
    "standard": "Duvar tipi split 12.000 BTU",
    "luxury": "VRF kaset / gizli tavan",
    "smartConnection": "IR kumanda modülü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 29
    }
  },
  {
    "id": "inventory-salon-oturma-radyator",
    "inventoryType": "room-item",
    "name": "Radyatör",
    "category": "İklimlendirme",
    "room": "Salon / Oturma",
    "description": "Standart: 2 panel radyatör. Lüks: Yerden ısıtma. Akıllı ev: Akıllı radyatör vanası.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "100×60 (G×Y)",
    "standard": "2 panel radyatör",
    "luxury": "Yerden ısıtma",
    "smartConnection": "Akıllı radyatör vanası",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 30
    }
  },
  {
    "id": "inventory-salon-oturma-somine",
    "inventoryType": "room-item",
    "name": "Şömine",
    "category": "İklimlendirme",
    "room": "Salon / Oturma",
    "description": "Lüks: Elektrikli/biyoetanol şömine (villada odun). Akıllı ev: Elektrikliyse akıllı priz/röle.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "100×30×60",
    "standard": "–",
    "luxury": "Elektrikli/biyoetanol şömine (villada odun)",
    "smartConnection": "Elektrikliyse akıllı priz/röle",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 31
    }
  },
  {
    "id": "inventory-salon-oturma-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Salon / Oturma",
    "description": "Standart: Sıcaklık-nem sensörü. Lüks: + Varlık sensörü, balkon kapısı sensörü. Akıllı ev: Isıtma, ışık otomasyonu.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Sıcaklık-nem sensörü",
    "luxury": "+ Varlık sensörü, balkon kapısı sensörü",
    "smartConnection": "Isıtma, ışık otomasyonu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 32
    }
  },
  {
    "id": "inventory-yemek-alani-yemek-masasi",
    "inventoryType": "room-item",
    "name": "Yemek masası",
    "category": "Mobilya",
    "room": "Yemek Alanı",
    "description": "Standart: 6 kişilik masa. Lüks: 8–10 kişilik masif/mermer masa.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Std 180×90×75 / Lüks 240×100×75",
    "standard": "6 kişilik masa",
    "luxury": "8–10 kişilik masif/mermer masa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 33
    }
  },
  {
    "id": "inventory-yemek-alani-sandalye",
    "inventoryType": "room-item",
    "name": "Sandalye",
    "category": "Mobilya",
    "room": "Yemek Alanı",
    "description": "Standart: 6 adet. Lüks: 8–10 döşemeli sandalye.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "45×55×95",
    "standard": "6 adet",
    "luxury": "8–10 döşemeli sandalye",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 34
    }
  },
  {
    "id": "inventory-yemek-alani-konsol-bufe",
    "inventoryType": "room-item",
    "name": "Konsol / büfe",
    "category": "Mobilya",
    "room": "Yemek Alanı",
    "description": "Standart: Konsol. Lüks: Büfe + vitrin.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "180×45×85",
    "standard": "Konsol",
    "luxury": "Büfe + vitrin",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 35
    }
  },
  {
    "id": "inventory-yemek-alani-masa-ustu-sarkit",
    "inventoryType": "room-item",
    "name": "Masa üstü sarkıt",
    "category": "Aydınlatma",
    "room": "Yemek Alanı",
    "description": "Standart: Sarkıt avize. Lüks: Dimmerli lineer sarkıt. Akıllı ev: Dimmer, 'Yemek' sahnesi.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "120 uzunluk",
    "standard": "Sarkıt avize",
    "luxury": "Dimmerli lineer sarkıt",
    "smartConnection": "Dimmer, 'Yemek' sahnesi",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 36
    }
  },
  {
    "id": "inventory-mutfak-alt-dolaplar",
    "inventoryType": "room-item",
    "name": "Alt dolaplar",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Lam/akrilik kapak. Lüks: Lake kapak, kulpsuz, çekmece içi düzenleyici.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Derinlik 60, yükseklik 86–90",
    "standard": "Lam/akrilik kapak",
    "luxury": "Lake kapak, kulpsuz, çekmece içi düzenleyici",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 37
    }
  },
  {
    "id": "inventory-mutfak-ust-dolaplar",
    "inventoryType": "room-item",
    "name": "Üst dolaplar",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Üst dolap. Lüks: Tavana kadar üst dolap, cam kapak + iç LED. Akıllı ev: Dolap içi LED.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Derinlik 35, yükseklik 70–90",
    "standard": "Üst dolap",
    "luxury": "Tavana kadar üst dolap, cam kapak + iç LED",
    "smartConnection": "Dolap içi LED",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 38
    }
  },
  {
    "id": "inventory-mutfak-tezgah",
    "inventoryType": "room-item",
    "name": "Tezgah",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Granit/laminat. Lüks: Kuvars/porselen tezgah.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Derinlik 60–65",
    "standard": "Granit/laminat",
    "luxury": "Kuvars/porselen tezgah",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 39
    }
  },
  {
    "id": "inventory-mutfak-boy-dolabi",
    "inventoryType": "room-item",
    "name": "Boy dolabı",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Fırın boy dolabı. Lüks: Ankastre buzdolabı + fırın boy dolapları.",
    "primitiveType": "wardrobe",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "60×60×220",
    "standard": "Fırın boy dolabı",
    "luxury": "Ankastre buzdolabı + fırın boy dolapları",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 40
    }
  },
  {
    "id": "inventory-mutfak-mutfak-adasi",
    "inventoryType": "room-item",
    "name": "Mutfak adası",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Lüks: Ada + bar tezgahı. Akıllı ev: Ada üstü sarkıt.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "200×100×90",
    "standard": "–",
    "luxury": "Ada + bar tezgahı",
    "smartConnection": "Ada üstü sarkıt",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 41
    }
  },
  {
    "id": "inventory-mutfak-kahvalti-masasi-bar-sandalyesi",
    "inventoryType": "room-item",
    "name": "Kahvaltı masası / bar sandalyesi",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Küçük masa + 2–4 sandalye. Lüks: 2–4 bar sandalyesi.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Masa 80×80×75 / bar taburesi Y 75",
    "standard": "Küçük masa + 2–4 sandalye",
    "luxury": "2–4 bar sandalyesi",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 42
    }
  },
  {
    "id": "inventory-mutfak-evye-batarya",
    "inventoryType": "room-item",
    "name": "Evye + batarya",
    "category": "Tesisat",
    "room": "Mutfak",
    "description": "Standart: Tek gözlü evye. Lüks: Çift gözlü evye, dokunmatik batarya. Akıllı ev: Evye altı su kaçak sensörü.",
    "primitiveType": "sink",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "80×50",
    "standard": "Tek gözlü evye",
    "luxury": "Çift gözlü evye, dokunmatik batarya",
    "smartConnection": "Evye altı su kaçak sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 43
    }
  },
  {
    "id": "inventory-mutfak-su-aritma",
    "inventoryType": "room-item",
    "name": "Su arıtma",
    "category": "Tesisat",
    "room": "Mutfak",
    "description": "Lüks: Lavabo altı su arıtma.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "Dolap içi",
    "standard": "–",
    "luxury": "Lavabo altı su arıtma",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 44
    }
  },
  {
    "id": "inventory-mutfak-buzdolabi",
    "inventoryType": "room-item",
    "name": "Buzdolabı",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: No-frost solo buzdolabı. Lüks: Gardırop tipi (side-by-side) veya ankastre. Akıllı ev: Sadece izleme (kapatılmaz).",
    "primitiveType": "fridge",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "Std 70×70×190 / Lüks 91×70×178",
    "standard": "No-frost solo buzdolabı",
    "luxury": "Gardırop tipi (side-by-side) veya ankastre",
    "smartConnection": "Sadece izleme (kapatılmaz)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 45
    }
  },
  {
    "id": "inventory-mutfak-bulasik-makinesi",
    "inventoryType": "room-item",
    "name": "Bulaşık makinesi",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: Solo/yarı ankastre. Lüks: Tam ankastre. Akıllı ev: Enerji ölçüm: 'Bitti' bildirimi; altına su sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×85",
    "standard": "Solo/yarı ankastre",
    "luxury": "Tam ankastre",
    "smartConnection": "Enerji ölçüm: 'Bitti' bildirimi; altına su sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 46
    }
  },
  {
    "id": "inventory-mutfak-firin",
    "inventoryType": "room-item",
    "name": "Fırın",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: Ankastre fırın. Lüks: Fırın + buharlı fırın + çekmeceli ısıtıcı. Akıllı ev: Uzaktan AÇILMAZ; sadece izleme.",
    "primitiveType": "oven",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×56×60",
    "standard": "Ankastre fırın",
    "luxury": "Fırın + buharlı fırın + çekmeceli ısıtıcı",
    "smartConnection": "Uzaktan AÇILMAZ; sadece izleme",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 47
    }
  },
  {
    "id": "inventory-mutfak-ocak",
    "inventoryType": "room-item",
    "name": "Ocak",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: 4 gözlü gazlı ocak. Lüks: İndüksiyon 80–90 cm / aspiratörlü ocak. Akıllı ev: Gaz dedektörü + gaz kesme vanası.",
    "primitiveType": "oven",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×52",
    "standard": "4 gözlü gazlı ocak",
    "luxury": "İndüksiyon 80–90 cm / aspiratörlü ocak",
    "smartConnection": "Gaz dedektörü + gaz kesme vanası",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 48
    }
  },
  {
    "id": "inventory-mutfak-davlumbaz-aspirator",
    "inventoryType": "room-item",
    "name": "Davlumbaz / aspiratör",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: 60–90 cm davlumbaz. Lüks: Ada davlumbazı / tezgaha gömme. Akıllı ev: +Plus: röle ile kontrol.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "90×50",
    "standard": "60–90 cm davlumbaz",
    "luxury": "Ada davlumbazı / tezgaha gömme",
    "smartConnection": "+Plus: röle ile kontrol",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 49
    }
  },
  {
    "id": "inventory-mutfak-mikrodalga",
    "inventoryType": "room-item",
    "name": "Mikrodalga",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Standart: Solo mikrodalga. Lüks: Ankastre mikrodalga.",
    "primitiveType": "oven",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "50×40×30",
    "standard": "Solo mikrodalga",
    "luxury": "Ankastre mikrodalga",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 50
    }
  },
  {
    "id": "inventory-mutfak-sarap-sogutucu",
    "inventoryType": "room-item",
    "name": "Şarap soğutucu",
    "category": "Beyaz eşya",
    "room": "Mutfak",
    "description": "Lüks: Ankastre şarap soğutucu.",
    "primitiveType": "fridge",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×57×82",
    "standard": "–",
    "luxury": "Ankastre şarap soğutucu",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 51
    }
  },
  {
    "id": "inventory-mutfak-cay-makinesi-kahve-makinesi-su-isitici-tost-makinesi-blender",
    "inventoryType": "room-item",
    "name": "Çay makinesi, kahve makinesi, su ısıtıcı, tost makinesi, blender",
    "category": "Küçük ev aleti",
    "room": "Mutfak",
    "description": "Lüks: + Ankastre espresso makinesi. Akıllı ev: Çay/kahve makinesine akıllı priz (sabah otomatik).",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "Tezgah üstü",
    "standard": "Var",
    "luxury": "+ Ankastre espresso makinesi",
    "smartConnection": "Çay/kahve makinesine akıllı priz (sabah otomatik)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 52
    }
  },
  {
    "id": "inventory-mutfak-cop-kovasi",
    "inventoryType": "room-item",
    "name": "Çöp kovası",
    "category": "Mobilya",
    "room": "Mutfak",
    "description": "Standart: Tek kova. Lüks: Dolap içi ayrıştırmalı.",
    "primitiveType": "generic",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Dolap içi",
    "standard": "Tek kova",
    "luxury": "Dolap içi ayrıştırmalı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 53
    }
  },
  {
    "id": "inventory-mutfak-mutfak-aydinlatmasi",
    "inventoryType": "room-item",
    "name": "Mutfak aydınlatması",
    "category": "Aydınlatma",
    "room": "Mutfak",
    "description": "Standart: Tavan armatürü + dolap altı LED. Lüks: Spot + dolap altı LED + ada sarkıtı. Akıllı ev: Hareketle gece ışığı.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Tavan armatürü + dolap altı LED",
    "luxury": "Spot + dolap altı LED + ada sarkıtı",
    "smartConnection": "Hareketle gece ışığı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 54
    }
  },
  {
    "id": "inventory-mutfak-kombi",
    "inventoryType": "room-item",
    "name": "Kombi",
    "category": "İklimlendirme",
    "room": "Mutfak",
    "description": "Standart: Duvar tipi kombi (mutfak/balkon). Lüks: Kombi veya merkezi sistem. Akıllı ev: Kuru kontaklı röle / akıllı termostat.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "40×30×70",
    "standard": "Duvar tipi kombi (mutfak/balkon)",
    "luxury": "Kombi veya merkezi sistem",
    "smartConnection": "Kuru kontaklı röle / akıllı termostat",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 55
    }
  },
  {
    "id": "inventory-mutfak-guvenlik-sensorleri",
    "inventoryType": "room-item",
    "name": "Güvenlik sensörleri",
    "category": "Akıllı ev",
    "room": "Mutfak",
    "description": "Standart: Su kaçak sensörü. Lüks: + Gaz dedektörü, ısı dedektörü, motorlu su vanası. Akıllı ev: Kaçakta bildirim + vana kapatma.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Su kaçak sensörü",
    "luxury": "+ Gaz dedektörü, ısı dedektörü, motorlu su vanası",
    "smartConnection": "Kaçakta bildirim + vana kapatma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 56
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-karyola-baza-baslik",
    "inventoryType": "room-item",
    "name": "Karyola / baza + başlık",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: 160×200 baza + başlık. Lüks: 180×200 veya 200×200, döşemeli aydınlatmalı başlık panel. Akıllı ev: Başlık LED.",
    "primitiveType": "bed",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Std 170×210×110 / Lüks 200×220×120",
    "standard": "160×200 baza + başlık",
    "luxury": "180×200 veya 200×200, döşemeli aydınlatmalı başlık panel",
    "smartConnection": "Başlık LED",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 57
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-yatak",
    "inventoryType": "room-item",
    "name": "Yatak",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: Ortopedik yatak. Lüks: Visco / yaylı premium yatak.",
    "primitiveType": "bed",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "160×200",
    "standard": "Ortopedik yatak",
    "luxury": "Visco / yaylı premium yatak",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 58
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-komodin",
    "inventoryType": "room-item",
    "name": "Komodin",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: 2 adet. Lüks: 2 adet, kablosuz şarjlı. Akıllı ev: Başucu sahne butonu.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "50×40×50",
    "standard": "2 adet",
    "luxury": "2 adet, kablosuz şarjlı",
    "smartConnection": "Başucu sahne butonu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 59
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-gardirop",
    "inventoryType": "room-item",
    "name": "Gardırop",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: 4 kapaklı gardırop. Lüks: Tavana kadar sürgülü gömme dolap / giyinme odası. Akıllı ev: Dolap içi LED.",
    "primitiveType": "wardrobe",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Std 200×60×220",
    "standard": "4 kapaklı gardırop",
    "luxury": "Tavana kadar sürgülü gömme dolap / giyinme odası",
    "smartConnection": "Dolap içi LED",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 60
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-sifonyer-ayna",
    "inventoryType": "room-item",
    "name": "Şifonyer + ayna",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: Şifonyer + ayna. Lüks: Makyaj masası + aydınlatmalı ayna.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "120×45×80",
    "standard": "Şifonyer + ayna",
    "luxury": "Makyaj masası + aydınlatmalı ayna",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 61
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-yatak-ucu-bench-puf",
    "inventoryType": "room-item",
    "name": "Yatak ucu bench / puf",
    "category": "Mobilya",
    "room": "Ebeveyn Yatak Odası",
    "description": "Lüks: Döşemeli bench.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "140×40×45",
    "standard": "–",
    "luxury": "Döşemeli bench",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 62
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-hali",
    "inventoryType": "room-item",
    "name": "Halı",
    "category": "Tekstil/Dekor",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: 160×230 halı. Lüks: Yatak altı büyük halı.",
    "primitiveType": "rug",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "160×230 / 200×300",
    "standard": "160×230 halı",
    "luxury": "Yatak altı büyük halı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 63
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-perde",
    "inventoryType": "room-item",
    "name": "Perde",
    "category": "Tekstil/Dekor",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: Tül + karartma fon. Lüks: Motorlu karartma (blackout) + tül. Akıllı ev: Perde motoru (sabah alarmına bağlı).",
    "primitiveType": "curtain",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "Pencere genişliği",
    "standard": "Tül + karartma fon",
    "luxury": "Motorlu karartma (blackout) + tül",
    "smartConnection": "Perde motoru (sabah alarmına bağlı)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 64
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-aydinlatma",
    "inventoryType": "room-item",
    "name": "Aydınlatma",
    "category": "Aydınlatma",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: Tavan armatürü + 2 abajur. Lüks: Gizli LED + okuma apliği + zemin gece ışığı. Akıllı ev: Gece yürüme ışığı (varlık sensörü).",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Tavan armatürü + 2 abajur",
    "luxury": "Gizli LED + okuma apliği + zemin gece ışığı",
    "smartConnection": "Gece yürüme ışığı (varlık sensörü)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 65
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-televizyon",
    "inventoryType": "room-item",
    "name": "Televizyon",
    "category": "Elektronik",
    "room": "Ebeveyn Yatak Odası",
    "description": "Lüks: 50\" TV.",
    "primitiveType": "tv",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "50\" ≈112×65",
    "standard": "–",
    "luxury": "50\" TV",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 66
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-klima-radyator",
    "inventoryType": "room-item",
    "name": "Klima / radyatör",
    "category": "İklimlendirme",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: 1 radyatör. Lüks: Radyatör + klima. Akıllı ev: Radyatör vanası, IR modülü.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "Radyatör 100×60",
    "standard": "1 radyatör",
    "luxury": "Radyatör + klima",
    "smartConnection": "Radyatör vanası, IR modülü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 67
    }
  },
  {
    "id": "inventory-ebeveyn-yatak-odasi-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Ebeveyn Yatak Odası",
    "description": "Standart: Pencere sensörü. Lüks: + Sıcaklık-nem, varlık sensörü. Akıllı ev: 'Uyku' senaryosu: tüm ev kapanır.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Pencere sensörü",
    "luxury": "+ Sıcaklık-nem, varlık sensörü",
    "smartConnection": "'Uyku' senaryosu: tüm ev kapanır",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 68
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-dus",
    "inventoryType": "room-item",
    "name": "Duş",
    "category": "Islak hacim",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: 90×90 duş kabini. Lüks: Walk-in cam duş + yağmur başlık / küvet veya jakuzi.",
    "primitiveType": "bathtub",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "90×90 / 120×90",
    "standard": "90×90 duş kabini",
    "luxury": "Walk-in cam duş + yağmur başlık / küvet veya jakuzi",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 69
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-lavabo-dolap",
    "inventoryType": "room-item",
    "name": "Lavabo + dolap",
    "category": "Islak hacim",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: 80 cm lavabo dolabı. Lüks: Çift lavabo 140 cm + aydınlatmalı ayna. Akıllı ev: Ayna aydınlatması.",
    "primitiveType": "sink",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "80×46×85",
    "standard": "80 cm lavabo dolabı",
    "luxury": "Çift lavabo 140 cm + aydınlatmalı ayna",
    "smartConnection": "Ayna aydınlatması",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 70
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-klozet",
    "inventoryType": "room-item",
    "name": "Klozet",
    "category": "Islak hacim",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: Asma klozet. Lüks: Akıllı klozet (bidet, ısıtmalı).",
    "primitiveType": "toilet",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "36×52",
    "standard": "Asma klozet",
    "luxury": "Akıllı klozet (bidet, ısıtmalı)",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 71
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-havlupan",
    "inventoryType": "room-item",
    "name": "Havlupan",
    "category": "Islak hacim",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: Su havlupanı. Lüks: Elektrikli havlupan. Akıllı ev: Zamanlayıcı (röle).",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "50×100",
    "standard": "Su havlupanı",
    "luxury": "Elektrikli havlupan",
    "smartConnection": "Zamanlayıcı (röle)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 72
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-aspirator",
    "inventoryType": "room-item",
    "name": "Aspiratör",
    "category": "Tesisat",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: Aspiratör. Lüks: Sessiz aspiratör. Akıllı ev: Nem sensörüne bağlı çalışma.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "Duvar/tavan",
    "standard": "Aspiratör",
    "luxury": "Sessiz aspiratör",
    "smartConnection": "Nem sensörüne bağlı çalışma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 73
    }
  },
  {
    "id": "inventory-ebeveyn-banyosu-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Ebeveyn Banyosu",
    "description": "Standart: Su kaçak sensörü. Lüks: + Nem, hareket sensörü. Akıllı ev: Hareketle ışık.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Su kaçak sensörü",
    "luxury": "+ Nem, hareket sensörü",
    "smartConnection": "Hareketle ışık",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 74
    }
  },
  {
    "id": "inventory-cocuk-odasi-karyola",
    "inventoryType": "room-item",
    "name": "Karyola",
    "category": "Mobilya",
    "room": "Çocuk Odası",
    "description": "Standart: Tek kişilik karyola. Lüks: Ranza / çatı yatak / Montessori yatak.",
    "primitiveType": "bed",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "100×200 (yatak)",
    "standard": "Tek kişilik karyola",
    "luxury": "Ranza / çatı yatak / Montessori yatak",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 75
    }
  },
  {
    "id": "inventory-cocuk-odasi-calisma-masasi-sandalye",
    "inventoryType": "room-item",
    "name": "Çalışma masası + sandalye",
    "category": "Mobilya",
    "room": "Çocuk Odası",
    "description": "Standart: 120×60 masa + sandalye. Lüks: Yükseklik ayarlı masa + ergonomik sandalye. Akıllı ev: Masa lambası akıllı priz.",
    "primitiveType": "desk",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "120×60×75",
    "standard": "120×60 masa + sandalye",
    "luxury": "Yükseklik ayarlı masa + ergonomik sandalye",
    "smartConnection": "Masa lambası akıllı priz",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 76
    }
  },
  {
    "id": "inventory-cocuk-odasi-gardirop",
    "inventoryType": "room-item",
    "name": "Gardırop",
    "category": "Mobilya",
    "room": "Çocuk Odası",
    "description": "Standart: 2–3 kapaklı. Lüks: Gömme dolap.",
    "primitiveType": "wardrobe",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "120×60×200",
    "standard": "2–3 kapaklı",
    "luxury": "Gömme dolap",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 77
    }
  },
  {
    "id": "inventory-cocuk-odasi-kitaplik-oyuncak-dolabi",
    "inventoryType": "room-item",
    "name": "Kitaplık / oyuncak dolabı",
    "category": "Mobilya",
    "room": "Çocuk Odası",
    "description": "Standart: Kitaplık. Lüks: Kitaplık + oyuncak düzenleyici.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "80×30×180",
    "standard": "Kitaplık",
    "luxury": "Kitaplık + oyuncak düzenleyici",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 78
    }
  },
  {
    "id": "inventory-cocuk-odasi-hali-perde",
    "inventoryType": "room-item",
    "name": "Halı, perde",
    "category": "Tekstil/Dekor",
    "room": "Çocuk Odası",
    "description": "Standart: Oyun halısı, karartma perde. Lüks: Motorlu karartma perde. Akıllı ev: Perde motoru (lüks).",
    "primitiveType": "curtain",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Oyun halısı, karartma perde",
    "luxury": "Motorlu karartma perde",
    "smartConnection": "Perde motoru (lüks)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 79
    }
  },
  {
    "id": "inventory-cocuk-odasi-aydinlatma",
    "inventoryType": "room-item",
    "name": "Aydınlatma",
    "category": "Aydınlatma",
    "room": "Çocuk Odası",
    "description": "Standart: Tavan + gece lambası. Lüks: Renkli LED, yıldızlı tavan. Akıllı ev: Gece ışığı otomasyonu.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Tavan + gece lambası",
    "luxury": "Renkli LED, yıldızlı tavan",
    "smartConnection": "Gece ışığı otomasyonu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 80
    }
  },
  {
    "id": "inventory-cocuk-odasi-sensor-guvenlik",
    "inventoryType": "room-item",
    "name": "Sensör / güvenlik",
    "category": "Akıllı ev",
    "room": "Çocuk Odası",
    "description": "Standart: Pencere sensörü. Lüks: + Bebek kamerası, sıcaklık-nem. Akıllı ev: Oyun konsolu/TV akıllı prizle saat sınırı.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Pencere sensörü",
    "luxury": "+ Bebek kamerası, sıcaklık-nem",
    "smartConnection": "Oyun konsolu/TV akıllı prizle saat sınırı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 81
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-calisma-masasi",
    "inventoryType": "room-item",
    "name": "Çalışma masası",
    "category": "Mobilya",
    "room": "Misafir / Çalışma Odası",
    "description": "Standart: 140×70 masa. Lüks: L masa / elektrikli yükseklik ayarlı masa.",
    "primitiveType": "desk",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "140×70×75",
    "standard": "140×70 masa",
    "luxury": "L masa / elektrikli yükseklik ayarlı masa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 82
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-ofis-koltugu",
    "inventoryType": "room-item",
    "name": "Ofis koltuğu",
    "category": "Mobilya",
    "room": "Misafir / Çalışma Odası",
    "description": "Standart: Ofis koltuğu. Lüks: Ergonomik koltuk.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "65×65×120",
    "standard": "Ofis koltuğu",
    "luxury": "Ergonomik koltuk",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 83
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-kitaplik",
    "inventoryType": "room-item",
    "name": "Kitaplık",
    "category": "Mobilya",
    "room": "Misafir / Çalışma Odası",
    "description": "Standart: Kitaplık. Lüks: Duvar boyu kitaplık.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "90×35×200",
    "standard": "Kitaplık",
    "luxury": "Duvar boyu kitaplık",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 84
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-misafir-yatagi",
    "inventoryType": "room-item",
    "name": "Misafir yatağı",
    "category": "Mobilya",
    "room": "Misafir / Çalışma Odası",
    "description": "Standart: Çekyat (yatak olabilen kanepe). Lüks: 140×200 misafir yatağı veya kanepe-yatak.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "200×90×85",
    "standard": "Çekyat (yatak olabilen kanepe)",
    "luxury": "140×200 misafir yatağı veya kanepe-yatak",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 85
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-yazici-bilgisayar",
    "inventoryType": "room-item",
    "name": "Yazıcı / bilgisayar",
    "category": "Elektronik",
    "room": "Misafir / Çalışma Odası",
    "description": "Standart: Yazıcı. Lüks: Yazıcı + ikinci monitör. Akıllı ev: Akıllı priz (bekleme tüketimi kesme).",
    "primitiveType": "generic",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Yazıcı",
    "luxury": "Yazıcı + ikinci monitör",
    "smartConnection": "Akıllı priz (bekleme tüketimi kesme)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 86
    }
  },
  {
    "id": "inventory-misafir-calisma-odasi-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Misafir / Çalışma Odası",
    "description": "Lüks: Varlık sensörü + radyatör vanası. Akıllı ev: Oda boşken ışık/ısı düşer.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "–",
    "luxury": "Varlık sensörü + radyatör vanası",
    "smartConnection": "Oda boşken ışık/ısı düşer",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 87
    }
  },
  {
    "id": "inventory-banyo-genel-kuvet-dus",
    "inventoryType": "room-item",
    "name": "Küvet / duş",
    "category": "Islak hacim",
    "room": "Banyo (genel)",
    "description": "Standart: 170×70 küvet veya duş kabini. Lüks: Duş + küvet ayrı.",
    "primitiveType": "bathtub",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "170×70",
    "standard": "170×70 küvet veya duş kabini",
    "luxury": "Duş + küvet ayrı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 88
    }
  },
  {
    "id": "inventory-banyo-genel-lavabo-ayna-dolabi",
    "inventoryType": "room-item",
    "name": "Lavabo + ayna dolabı",
    "category": "Islak hacim",
    "room": "Banyo (genel)",
    "description": "Standart: 65–80 cm lavabo dolabı + ayna dolabı. Lüks: Aydınlatmalı ayna dolabı.",
    "primitiveType": "sink",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "80×46×85",
    "standard": "65–80 cm lavabo dolabı + ayna dolabı",
    "luxury": "Aydınlatmalı ayna dolabı",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 89
    }
  },
  {
    "id": "inventory-banyo-genel-klozet",
    "inventoryType": "room-item",
    "name": "Klozet",
    "category": "Islak hacim",
    "room": "Banyo (genel)",
    "description": "Standart: Klozet. Lüks: Asma klozet.",
    "primitiveType": "toilet",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "36×52",
    "standard": "Klozet",
    "luxury": "Asma klozet",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 90
    }
  },
  {
    "id": "inventory-banyo-genel-camasir-makinesi",
    "inventoryType": "room-item",
    "name": "Çamaşır makinesi",
    "category": "Beyaz eşya",
    "room": "Banyo (genel)",
    "description": "Standart: Çamaşır makinesi (çoğu evde banyoda). Lüks: Kiler/çamaşır odasında. Akıllı ev: Enerji ölçüm: 'Yıkama bitti'; altına su sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×85",
    "standard": "Çamaşır makinesi (çoğu evde banyoda)",
    "luxury": "Kiler/çamaşır odasında",
    "smartConnection": "Enerji ölçüm: 'Yıkama bitti'; altına su sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 91
    }
  },
  {
    "id": "inventory-banyo-genel-kurutma-makinesi",
    "inventoryType": "room-item",
    "name": "Kurutma makinesi",
    "category": "Beyaz eşya",
    "room": "Banyo (genel)",
    "description": "Lüks: Çamaşır makinesi üstüne kurutma. Akıllı ev: 'Kurutma bitti' bildirimi.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×85",
    "standard": "–",
    "luxury": "Çamaşır makinesi üstüne kurutma",
    "smartConnection": "'Kurutma bitti' bildirimi",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 92
    }
  },
  {
    "id": "inventory-banyo-genel-termosifon-sofben",
    "inventoryType": "room-item",
    "name": "Termosifon / şofben",
    "category": "Tesisat",
    "room": "Banyo (genel)",
    "description": "Standart: Kombi yoksa termosifon. Akıllı ev: Zamanlayıcı röle.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "Ø45×80",
    "standard": "Kombi yoksa termosifon",
    "luxury": "–",
    "smartConnection": "Zamanlayıcı röle",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 93
    }
  },
  {
    "id": "inventory-banyo-genel-havlupan-aspirator",
    "inventoryType": "room-item",
    "name": "Havlupan + aspiratör",
    "category": "Islak hacim",
    "room": "Banyo (genel)",
    "description": "Lüks: Elektrikli havlupan. Akıllı ev: Nem bazlı aspiratör.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "50×100",
    "standard": "Var",
    "luxury": "Elektrikli havlupan",
    "smartConnection": "Nem bazlı aspiratör",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 94
    }
  },
  {
    "id": "inventory-banyo-genel-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Banyo (genel)",
    "description": "Standart: Su kaçak sensörü. Lüks: + Hareket, nem sensörü. Akıllı ev: Hareketle ışık.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Su kaçak sensörü",
    "luxury": "+ Hareket, nem sensörü",
    "smartConnection": "Hareketle ışık",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 95
    }
  },
  {
    "id": "inventory-wc-klozet-kucuk-lavabo-ayna",
    "inventoryType": "room-item",
    "name": "Klozet + küçük lavabo + ayna",
    "category": "Islak hacim",
    "room": "WC",
    "description": "Lüks: Asma klozet, tezgah üstü lavabo.",
    "primitiveType": "toilet",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "Lavabo 45×35",
    "standard": "Var",
    "luxury": "Asma klozet, tezgah üstü lavabo",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 96
    }
  },
  {
    "id": "inventory-wc-aspirator",
    "inventoryType": "room-item",
    "name": "Aspiratör",
    "category": "Tesisat",
    "room": "WC",
    "description": "Standart ve lüks envanterde yer alır. Akıllı ev: Işık kapandıktan sonra gecikmeli çalışma.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Var",
    "smartConnection": "Işık kapandıktan sonra gecikmeli çalışma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 97
    }
  },
  {
    "id": "inventory-wc-hareket-sensoru",
    "inventoryType": "room-item",
    "name": "Hareket sensörü",
    "category": "Akıllı ev",
    "room": "WC",
    "description": "Standart: Hareketle ışık.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Hareketle ışık",
    "luxury": "Hareketle ışık",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 98
    }
  },
  {
    "id": "inventory-balkon-teras-oturma",
    "inventoryType": "room-item",
    "name": "Oturma",
    "category": "Mobilya",
    "room": "Balkon / Teras",
    "description": "Standart: Bistro masa + 2 sandalye. Lüks: Dış mekân köşe oturma grubu, şezlong, salıncak.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Masa Ø60",
    "standard": "Bistro masa + 2 sandalye",
    "luxury": "Dış mekân köşe oturma grubu, şezlong, salıncak",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 99
    }
  },
  {
    "id": "inventory-balkon-teras-tente-pergola",
    "inventoryType": "room-item",
    "name": "Tente / pergola",
    "category": "Mobilya",
    "room": "Balkon / Teras",
    "description": "Lüks: Motorlu tente veya bioklimatik pergola. Akıllı ev: Tente motoru, rüzgar sensörü.",
    "primitiveType": "curtain",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Balkon genişliği",
    "standard": "–",
    "luxury": "Motorlu tente veya bioklimatik pergola",
    "smartConnection": "Tente motoru, rüzgar sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 100
    }
  },
  {
    "id": "inventory-balkon-teras-saksi-bitkiler",
    "inventoryType": "room-item",
    "name": "Saksı bitkiler",
    "category": "Tekstil/Dekor",
    "room": "Balkon / Teras",
    "description": "Lüks: Damla sulamalı saksılar. Akıllı ev: Sulama vanası (zamanlı).",
    "primitiveType": "plant",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Damla sulamalı saksılar",
    "smartConnection": "Sulama vanası (zamanlı)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 101
    }
  },
  {
    "id": "inventory-balkon-teras-camasir-kurutmalik",
    "inventoryType": "room-item",
    "name": "Çamaşır kurutmalık",
    "category": "Mobilya",
    "room": "Balkon / Teras",
    "description": "Standart envanterde yer alır.",
    "primitiveType": "generic",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "180×55×95",
    "standard": "Var",
    "luxury": "–",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 102
    }
  },
  {
    "id": "inventory-balkon-teras-klima-dis-unitesi",
    "inventoryType": "room-item",
    "name": "Klima dış ünitesi",
    "category": "İklimlendirme",
    "room": "Balkon / Teras",
    "description": "Standart ve lüks envanterde yer alır.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "≈80×30×55",
    "standard": "Var",
    "luxury": "Var",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 103
    }
  },
  {
    "id": "inventory-balkon-teras-dis-aydinlatma",
    "inventoryType": "room-item",
    "name": "Dış aydınlatma",
    "category": "Aydınlatma",
    "room": "Balkon / Teras",
    "description": "Standart: Aplik. Lüks: LED şerit + dış spot. Akıllı ev: Gün batımında otomatik yanma.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Aplik",
    "luxury": "LED şerit + dış spot",
    "smartConnection": "Gün batımında otomatik yanma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 104
    }
  },
  {
    "id": "inventory-balkon-teras-kapi-sensoru",
    "inventoryType": "room-item",
    "name": "Kapı sensörü",
    "category": "Akıllı ev",
    "room": "Balkon / Teras",
    "description": "Standart: Balkon kapısı sensörü. Akıllı ev: Klima açıkken kapı açılırsa uyarı.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Balkon kapısı sensörü",
    "luxury": "Var",
    "smartConnection": "Klima açıkken kapı açılırsa uyarı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 105
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-raf-sistemi",
    "inventoryType": "room-item",
    "name": "Raf sistemi",
    "category": "Mobilya",
    "room": "Kiler / Çamaşır Odası",
    "description": "Standart: Raflar. Lüks: Gömme düzenleyici dolaplar.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Duvar boyu",
    "standard": "Raflar",
    "luxury": "Gömme düzenleyici dolaplar",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 106
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-derin-dondurucu",
    "inventoryType": "room-item",
    "name": "Derin dondurucu",
    "category": "Beyaz eşya",
    "room": "Kiler / Çamaşır Odası",
    "description": "Lüks: Dikey derin dondurucu. Akıllı ev: Sadece izleme (kapatılmaz).",
    "primitiveType": "fridge",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×65×85",
    "standard": "–",
    "luxury": "Dikey derin dondurucu",
    "smartConnection": "Sadece izleme (kapatılmaz)",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 107
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-camasir-kurutma-ust-uste",
    "inventoryType": "room-item",
    "name": "Çamaşır + kurutma (üst üste)",
    "category": "Beyaz eşya",
    "room": "Kiler / Çamaşır Odası",
    "description": "Lüks envanterde yer alır. Akıllı ev: 'Bitti' bildirimi.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×170",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "'Bitti' bildirimi",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 108
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-utu-utu-masasi",
    "inventoryType": "room-item",
    "name": "Ütü + ütü masası",
    "category": "Küçük ev aleti",
    "room": "Kiler / Çamaşır Odası",
    "description": "Standart: Ütü. Lüks: Buhar kazanlı ütü. Akıllı ev: Akıllı priz: 1 saat sonra otomatik kapanma.",
    "primitiveType": "table",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "Masa 120×38",
    "standard": "Ütü",
    "luxury": "Buhar kazanlı ütü",
    "smartConnection": "Akıllı priz: 1 saat sonra otomatik kapanma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 109
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-supurge",
    "inventoryType": "room-item",
    "name": "Süpürge",
    "category": "Küçük ev aleti",
    "room": "Kiler / Çamaşır Odası",
    "description": "Standart: Elektrikli süpürge. Lüks: Robot süpürge + istasyon / merkezi süpürge. Akıllı ev: Herkes çıkınca robot süpürge çalışır.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "İstasyon ≈40×45×50",
    "standard": "Elektrikli süpürge",
    "luxury": "Robot süpürge + istasyon / merkezi süpürge",
    "smartConnection": "Herkes çıkınca robot süpürge çalışır",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 110
    }
  },
  {
    "id": "inventory-kiler-camasir-odasi-su-kacak-sensoru",
    "inventoryType": "room-item",
    "name": "Su kaçak sensörü",
    "category": "Akıllı ev",
    "room": "Kiler / Çamaşır Odası",
    "description": "Standart ve lüks envanterde yer alır.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Var",
    "luxury": "Var",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 111
    }
  },
  {
    "id": "inventory-koridor-merdiven-dubleks-villa-koridor-aydinlatmasi",
    "inventoryType": "room-item",
    "name": "Koridor aydınlatması",
    "category": "Aydınlatma",
    "room": "Koridor / Merdiven (dubleks-villa)",
    "description": "Standart: Tavan armatürü. Lüks: Spot + zemin LED. Akıllı ev: Hareketle ışık.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Tavan armatürü",
    "luxury": "Spot + zemin LED",
    "smartConnection": "Hareketle ışık",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 112
    }
  },
  {
    "id": "inventory-koridor-merdiven-dubleks-villa-merdiven",
    "inventoryType": "room-item",
    "name": "Merdiven",
    "category": "Aydınlatma",
    "room": "Koridor / Merdiven (dubleks-villa)",
    "description": "Standart: Tavan/aplik. Lüks: Basamak LED aydınlatması. Akıllı ev: Hareketle sırayla yanan basamak ışığı.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "Basamak başına LED",
    "standard": "Tavan/aplik",
    "luxury": "Basamak LED aydınlatması",
    "smartConnection": "Hareketle sırayla yanan basamak ışığı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 113
    }
  },
  {
    "id": "inventory-koridor-merdiven-dubleks-villa-duman-dedektoru",
    "inventoryType": "room-item",
    "name": "Duman dedektörü",
    "category": "Akıllı ev",
    "room": "Koridor / Merdiven (dubleks-villa)",
    "description": "Standart: Koridor tavanı. Lüks: Her katta. Akıllı ev: Alarmda siren + bildirim.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Ø10",
    "standard": "Koridor tavanı",
    "luxury": "Her katta",
    "smartConnection": "Alarmda siren + bildirim",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 114
    }
  },
  {
    "id": "inventory-koridor-merdiven-dubleks-villa-kat-butonu",
    "inventoryType": "room-item",
    "name": "Kat butonu",
    "category": "Akıllı ev",
    "room": "Koridor / Merdiven (dubleks-villa)",
    "description": "Lüks: Her kat girişinde 'Katı kapat' butonu.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "86×86 mm",
    "standard": "–",
    "luxury": "Her kat girişinde 'Katı kapat' butonu",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 115
    }
  },
  {
    "id": "inventory-teknik-oda-kazan-dairesi-villa-kazan-isi-pompasi-boyler",
    "inventoryType": "room-item",
    "name": "Kazan / ısı pompası + boyler",
    "category": "Tesisat",
    "room": "Teknik Oda / Kazan Dairesi (villa)",
    "description": "Standart: Kombi. Lüks: Yoğuşmalı kazan veya ısı pompası + boyler. Akıllı ev: Kuru kontak, sıcaklık sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Kombi",
    "luxury": "Yoğuşmalı kazan veya ısı pompası + boyler",
    "smartConnection": "Kuru kontak, sıcaklık sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 116
    }
  },
  {
    "id": "inventory-teknik-oda-kazan-dairesi-villa-hidrofor-su-deposu",
    "inventoryType": "room-item",
    "name": "Hidrofor / su deposu",
    "category": "Tesisat",
    "room": "Teknik Oda / Kazan Dairesi (villa)",
    "description": "Lüks envanterde yer alır. Akıllı ev: Enerji ölçüm, seviye/kaçak sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "Enerji ölçüm, seviye/kaçak sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 117
    }
  },
  {
    "id": "inventory-teknik-oda-kazan-dairesi-villa-jenerator-ups",
    "inventoryType": "room-item",
    "name": "Jeneratör / UPS",
    "category": "Tesisat",
    "room": "Teknik Oda / Kazan Dairesi (villa)",
    "description": "Lüks envanterde yer alır. Akıllı ev: Durum izleme.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "Durum izleme",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 118
    }
  },
  {
    "id": "inventory-teknik-oda-kazan-dairesi-villa-gunes-paneli-inverteri",
    "inventoryType": "room-item",
    "name": "Güneş paneli inverteri",
    "category": "Tesisat",
    "room": "Teknik Oda / Kazan Dairesi (villa)",
    "description": "Lüks envanterde yer alır. Akıllı ev: Üretim takibi.",
    "primitiveType": "panel",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "Üretim takibi",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 119
    }
  },
  {
    "id": "inventory-teknik-oda-kazan-dairesi-villa-ag-dolabi",
    "inventoryType": "room-item",
    "name": "Ağ dolabı",
    "category": "Elektronik",
    "room": "Teknik Oda / Kazan Dairesi (villa)",
    "description": "Lüks: Modem, switch, kamera kaydedici (NVR).",
    "primitiveType": "cabinet",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "60×60×100",
    "standard": "–",
    "luxury": "Modem, switch, kamera kaydedici (NVR)",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 120
    }
  },
  {
    "id": "inventory-bahce-villa-bahce-oturma-grubu",
    "inventoryType": "room-item",
    "name": "Bahçe oturma grubu",
    "category": "Mobilya",
    "room": "Bahçe (villa)",
    "description": "Standart: Masa + sandalye. Lüks: Dış mekân köşe oturma, şezlonglar, pergola. Akıllı ev: Pergola motoru.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Masa + sandalye",
    "luxury": "Dış mekân köşe oturma, şezlonglar, pergola",
    "smartConnection": "Pergola motoru",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 121
    }
  },
  {
    "id": "inventory-bahce-villa-mangal-barbeku",
    "inventoryType": "room-item",
    "name": "Mangal / barbekü",
    "category": "Mobilya",
    "room": "Bahçe (villa)",
    "description": "Standart: Taşınabilir mangal. Lüks: Bahçe mutfağı + barbekü.",
    "primitiveType": "oven",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Taşınabilir mangal",
    "luxury": "Bahçe mutfağı + barbekü",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 122
    }
  },
  {
    "id": "inventory-bahce-villa-havuz",
    "inventoryType": "room-item",
    "name": "Havuz",
    "category": "Tesisat",
    "room": "Bahçe (villa)",
    "description": "Lüks: Havuz + pompa + filtre. Akıllı ev: Pompa zamanlayıcı röle, havuz ışığı.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "–",
    "luxury": "Havuz + pompa + filtre",
    "smartConnection": "Pompa zamanlayıcı röle, havuz ışığı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 123
    }
  },
  {
    "id": "inventory-bahce-villa-sulama",
    "inventoryType": "room-item",
    "name": "Sulama",
    "category": "Tesisat",
    "room": "Bahçe (villa)",
    "description": "Standart: Hortum. Lüks: Otomatik sulama (vana + nem). Akıllı ev: Sulama vanası, hava durumuna göre.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Hortum",
    "luxury": "Otomatik sulama (vana + nem)",
    "smartConnection": "Sulama vanası, hava durumuna göre",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 124
    }
  },
  {
    "id": "inventory-bahce-villa-bahce-aydinlatmasi",
    "inventoryType": "room-item",
    "name": "Bahçe aydınlatması",
    "category": "Aydınlatma",
    "room": "Bahçe (villa)",
    "description": "Standart: Duvar apliği. Lüks: Yol, ağaç ve cephe aydınlatması. Akıllı ev: Gün batımı otomasyonu.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Duvar apliği",
    "luxury": "Yol, ağaç ve cephe aydınlatması",
    "smartConnection": "Gün batımı otomasyonu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 125
    }
  },
  {
    "id": "inventory-bahce-villa-bahce-kapisi",
    "inventoryType": "room-item",
    "name": "Bahçe kapısı",
    "category": "Tesisat",
    "room": "Bahçe (villa)",
    "description": "Standart: Manuel. Lüks: Motorlu bahçe kapısı. Akıllı ev: Kuru kontaklı röle ile telefondan açma.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Manuel",
    "luxury": "Motorlu bahçe kapısı",
    "smartConnection": "Kuru kontaklı röle ile telefondan açma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 126
    }
  },
  {
    "id": "inventory-bahce-villa-dis-kamera",
    "inventoryType": "room-item",
    "name": "Dış kamera",
    "category": "Akıllı ev",
    "room": "Bahçe (villa)",
    "description": "Standart: 1 adet. Lüks: Çevre kameraları (4–8). Akıllı ev: Hareket bildirimi, kayıt.",
    "primitiveType": "camera",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "–",
    "standard": "1 adet",
    "luxury": "Çevre kameraları (4–8)",
    "smartConnection": "Hareket bildirimi, kayıt",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 127
    }
  },
  {
    "id": "inventory-garaj-villa-garaj-kapisi",
    "inventoryType": "room-item",
    "name": "Garaj kapısı",
    "category": "Tesisat",
    "room": "Garaj (villa)",
    "description": "Standart: Manuel/motorlu. Lüks: Motorlu seksiyonel kapı. Akıllı ev: Kuru kontaklı röle + kapı sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "250×220",
    "standard": "Manuel/motorlu",
    "luxury": "Motorlu seksiyonel kapı",
    "smartConnection": "Kuru kontaklı röle + kapı sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 128
    }
  },
  {
    "id": "inventory-garaj-villa-elektrikli-arac-sarji",
    "inventoryType": "room-item",
    "name": "Elektrikli araç şarjı",
    "category": "Tesisat",
    "room": "Garaj (villa)",
    "description": "Lüks: Duvar tipi şarj ünitesi. Akıllı ev: Enerji ölçüm, gece tarifesinde şarj.",
    "primitiveType": "panel",
    "geometryGroup": "fixture",
    "physical": true,
    "dimensionsText": "30×15×40",
    "standard": "–",
    "luxury": "Duvar tipi şarj ünitesi",
    "smartConnection": "Enerji ölçüm, gece tarifesinde şarj",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 129
    }
  },
  {
    "id": "inventory-garaj-villa-raf-alet-dolabi",
    "inventoryType": "room-item",
    "name": "Raf / alet dolabı",
    "category": "Mobilya",
    "room": "Garaj (villa)",
    "description": "Standart: Raf. Lüks: Alet dolabı sistemi.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Raf",
    "luxury": "Alet dolabı sistemi",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 130
    }
  },
  {
    "id": "inventory-garaj-villa-garaj-aydinlatmasi",
    "inventoryType": "room-item",
    "name": "Garaj aydınlatması",
    "category": "Aydınlatma",
    "room": "Garaj (villa)",
    "description": "Standart: Floresan/LED. Lüks: LED panel. Akıllı ev: Kapı açılınca yanma.",
    "primitiveType": "lamp",
    "geometryGroup": "lighting",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Floresan/LED",
    "luxury": "LED panel",
    "smartConnection": "Kapı açılınca yanma",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 131
    }
  },
  {
    "id": "inventory-ofis-resepsiyon-resepsiyon-bankosu",
    "inventoryType": "room-item",
    "name": "Resepsiyon bankosu",
    "category": "Mobilya",
    "room": "Ofis – Resepsiyon",
    "description": "Standart: Banko. Lüks: Logo aydınlatmalı tasarım banko.",
    "primitiveType": "desk",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "200×70×110",
    "standard": "Banko",
    "luxury": "Logo aydınlatmalı tasarım banko",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 132
    }
  },
  {
    "id": "inventory-ofis-resepsiyon-bekleme-koltuklari-sehpa",
    "inventoryType": "room-item",
    "name": "Bekleme koltukları + sehpa",
    "category": "Mobilya",
    "room": "Ofis – Resepsiyon",
    "description": "Standart: 2–3 koltuk. Lüks: Deri bekleme grubu.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "2–3 koltuk",
    "luxury": "Deri bekleme grubu",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 133
    }
  },
  {
    "id": "inventory-ofis-resepsiyon-logo-duvari-bitki",
    "inventoryType": "room-item",
    "name": "Logo duvarı / bitki",
    "category": "Dekor",
    "room": "Ofis – Resepsiyon",
    "description": "Lüks: Işıklı logo, canlı bitki duvarı. Akıllı ev: Logo ışığı mesai saatinde.",
    "primitiveType": "plant",
    "geometryGroup": "decor",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Işıklı logo, canlı bitki duvarı",
    "smartConnection": "Logo ışığı mesai saatinde",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 134
    }
  },
  {
    "id": "inventory-ofis-resepsiyon-giris-kontrolu",
    "inventoryType": "room-item",
    "name": "Giriş kontrolü",
    "category": "Akıllı ev",
    "room": "Ofis – Resepsiyon",
    "description": "Standart: Şifreli kilit. Lüks: Kartlı/yüz tanımalı giriş. Akıllı ev: Giriş kaydı, kamera.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Şifreli kilit",
    "luxury": "Kartlı/yüz tanımalı giriş",
    "smartConnection": "Giriş kaydı, kamera",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 135
    }
  },
  {
    "id": "inventory-ofis-acik-ofis-calisma-masasi",
    "inventoryType": "room-item",
    "name": "Çalışma masası",
    "category": "Mobilya",
    "room": "Ofis – Açık Ofis",
    "description": "Standart: Kişi başı 140×70 masa. Lüks: Yükseklik ayarlı masa.",
    "primitiveType": "desk",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "140×70×75",
    "standard": "Kişi başı 140×70 masa",
    "luxury": "Yükseklik ayarlı masa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 136
    }
  },
  {
    "id": "inventory-ofis-acik-ofis-ofis-koltugu-keson",
    "inventoryType": "room-item",
    "name": "Ofis koltuğu + keson",
    "category": "Mobilya",
    "room": "Ofis – Açık Ofis",
    "description": "Standart: Koltuk + 3 çekmeceli keson. Lüks: Ergonomik koltuk.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "Keson 40×55×60",
    "standard": "Koltuk + 3 çekmeceli keson",
    "luxury": "Ergonomik koltuk",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 137
    }
  },
  {
    "id": "inventory-ofis-acik-ofis-dosya-dolabi-paravan",
    "inventoryType": "room-item",
    "name": "Dosya dolabı / paravan",
    "category": "Mobilya",
    "room": "Ofis – Açık Ofis",
    "description": "Lüks: Akustik paravan.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "80×40×200",
    "standard": "Var",
    "luxury": "Akustik paravan",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 138
    }
  },
  {
    "id": "inventory-ofis-acik-ofis-yazici",
    "inventoryType": "room-item",
    "name": "Yazıcı",
    "category": "Elektronik",
    "room": "Ofis – Açık Ofis",
    "description": "Standart: Ortak yazıcı. Akıllı ev: Mesai dışı akıllı prizle kapanır.",
    "primitiveType": "generic",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Ortak yazıcı",
    "luxury": "Var",
    "smartConnection": "Mesai dışı akıllı prizle kapanır",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 139
    }
  },
  {
    "id": "inventory-ofis-acik-ofis-aydinlatma-iklim",
    "inventoryType": "room-item",
    "name": "Aydınlatma / iklim",
    "category": "Akıllı ev",
    "room": "Ofis – Açık Ofis",
    "description": "Standart: Gruplu aydınlatma. Lüks: Doluluk sensörlü bölge kontrolü. Akıllı ev: Mesai senaryosu, enerji ölçüm.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Gruplu aydınlatma",
    "luxury": "Doluluk sensörlü bölge kontrolü",
    "smartConnection": "Mesai senaryosu, enerji ölçüm",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 140
    }
  },
  {
    "id": "inventory-ofis-yonetici-odasi-yonetici-masasi-koltuk",
    "inventoryType": "room-item",
    "name": "Yönetici masası + koltuk",
    "category": "Mobilya",
    "room": "Ofis – Yönetici Odası",
    "description": "Standart: 160×80 masa. Lüks: 180–200 cm yönetici masası, deri koltuk.",
    "primitiveType": "desk",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "180×90×75",
    "standard": "160×80 masa",
    "luxury": "180–200 cm yönetici masası, deri koltuk",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 141
    }
  },
  {
    "id": "inventory-ofis-yonetici-odasi-misafir-koltuklari",
    "inventoryType": "room-item",
    "name": "Misafir koltukları",
    "category": "Mobilya",
    "room": "Ofis – Yönetici Odası",
    "description": "Standart: 2 adet. Lüks: Deri kanepe + sehpa.",
    "primitiveType": "sofa",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "2 adet",
    "luxury": "Deri kanepe + sehpa",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 142
    }
  },
  {
    "id": "inventory-ofis-yonetici-odasi-kitaplik-dolap",
    "inventoryType": "room-item",
    "name": "Kitaplık / dolap",
    "category": "Mobilya",
    "room": "Ofis – Yönetici Odası",
    "description": "Lüks: Arka duvar ünitesi.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Arka duvar ünitesi",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 143
    }
  },
  {
    "id": "inventory-ofis-yonetici-odasi-perde-panel",
    "inventoryType": "room-item",
    "name": "Perde / panel",
    "category": "Akıllı ev",
    "room": "Ofis – Yönetici Odası",
    "description": "Lüks: Motorlu perde + duvar paneli. Akıllı ev: Toplantı senaryosu.",
    "primitiveType": "curtain",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "–",
    "standard": "–",
    "luxury": "Motorlu perde + duvar paneli",
    "smartConnection": "Toplantı senaryosu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 144
    }
  },
  {
    "id": "inventory-ofis-toplanti-odasi-toplanti-masasi",
    "inventoryType": "room-item",
    "name": "Toplantı masası",
    "category": "Mobilya",
    "room": "Ofis – Toplantı Odası",
    "description": "Standart: 6–8 kişilik. Lüks: 10–12 kişilik, kablo kutulu.",
    "primitiveType": "table",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "300×120×75",
    "standard": "6–8 kişilik",
    "luxury": "10–12 kişilik, kablo kutulu",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 145
    }
  },
  {
    "id": "inventory-ofis-toplanti-odasi-sandalyeler",
    "inventoryType": "room-item",
    "name": "Sandalyeler",
    "category": "Mobilya",
    "room": "Ofis – Toplantı Odası",
    "description": "Standart: 6–8. Lüks: 10–12 döşemeli.",
    "primitiveType": "chair",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "6–8",
    "luxury": "10–12 döşemeli",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 146
    }
  },
  {
    "id": "inventory-ofis-toplanti-odasi-ekran-projeksiyon",
    "inventoryType": "room-item",
    "name": "Ekran / projeksiyon",
    "category": "Elektronik",
    "room": "Ofis – Toplantı Odası",
    "description": "Standart: Projeksiyon veya 65\" ekran. Lüks: 75–86\" ekran + konferans kamerası. Akıllı ev: 'Sunum' senaryosu.",
    "primitiveType": "tv",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Projeksiyon veya 65\" ekran",
    "luxury": "75–86\" ekran + konferans kamerası",
    "smartConnection": "'Sunum' senaryosu",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 147
    }
  },
  {
    "id": "inventory-ofis-toplanti-odasi-beyaz-tahta",
    "inventoryType": "room-item",
    "name": "Beyaz tahta",
    "category": "Mobilya",
    "room": "Ofis – Toplantı Odası",
    "description": "Lüks: Cam yazı panosu.",
    "primitiveType": "generic",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "180×90",
    "standard": "Var",
    "luxury": "Cam yazı panosu",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 148
    }
  },
  {
    "id": "inventory-ofis-toplanti-odasi-doluluk-sensoru",
    "inventoryType": "room-item",
    "name": "Doluluk sensörü",
    "category": "Akıllı ev",
    "room": "Ofis – Toplantı Odası",
    "description": "Lüks envanterde yer alır. Akıllı ev: Oda boşalınca ışık/klima kapanır.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "Oda boşalınca ışık/klima kapanır",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 149
    }
  },
  {
    "id": "inventory-ofis-cay-ocagi-tezgah-dolaplar",
    "inventoryType": "room-item",
    "name": "Tezgah + dolaplar",
    "category": "Mobilya",
    "room": "Ofis – Çay Ocağı",
    "description": "Standart ve lüks envanterde yer alır.",
    "primitiveType": "cabinet",
    "geometryGroup": "furniture",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Var",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 150
    }
  },
  {
    "id": "inventory-ofis-cay-ocagi-buzdolabi",
    "inventoryType": "room-item",
    "name": "Buzdolabı",
    "category": "Beyaz eşya",
    "room": "Ofis – Çay Ocağı",
    "description": "Standart: Mini/orta buzdolabı. Lüks: Solo buzdolabı. Akıllı ev: Sadece izleme.",
    "primitiveType": "fridge",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×145",
    "standard": "Mini/orta buzdolabı",
    "luxury": "Solo buzdolabı",
    "smartConnection": "Sadece izleme",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 151
    }
  },
  {
    "id": "inventory-ofis-cay-ocagi-cay-kahve-makinesi-su-isitici-mikrodalga",
    "inventoryType": "room-item",
    "name": "Çay / kahve makinesi, su ısıtıcı, mikrodalga",
    "category": "Küçük ev aleti",
    "room": "Ofis – Çay Ocağı",
    "description": "Lüks: + Espresso makinesi, su sebili. Akıllı ev: Çay makinesi mesai başında otomatik açılır.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "+ Espresso makinesi, su sebili",
    "smartConnection": "Çay makinesi mesai başında otomatik açılır",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 152
    }
  },
  {
    "id": "inventory-ofis-cay-ocagi-bulasik-makinesi",
    "inventoryType": "room-item",
    "name": "Bulaşık makinesi",
    "category": "Beyaz eşya",
    "room": "Ofis – Çay Ocağı",
    "description": "Lüks envanterde yer alır. Akıllı ev: Su kaçak sensörü.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "60×60×85",
    "standard": "–",
    "luxury": "Var",
    "smartConnection": "Su kaçak sensörü",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 153
    }
  },
  {
    "id": "inventory-ofis-server-sistem-odasi-rack-kabinet",
    "inventoryType": "room-item",
    "name": "Rack kabinet",
    "category": "Elektronik",
    "room": "Ofis – Server / Sistem Odası",
    "description": "Standart: Duvar tipi kabinet. Lüks: Ayaklı kabinet.",
    "primitiveType": "cabinet",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "60×80×200",
    "standard": "Duvar tipi kabinet",
    "luxury": "Ayaklı kabinet",
    "smartConnection": "–",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 154
    }
  },
  {
    "id": "inventory-ofis-server-sistem-odasi-ups",
    "inventoryType": "room-item",
    "name": "UPS",
    "category": "Elektronik",
    "room": "Ofis – Server / Sistem Odası",
    "description": "Standart ve lüks envanterde yer alır. Akıllı ev: Durum izleme.",
    "primitiveType": "generic",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Var",
    "smartConnection": "Durum izleme",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 155
    }
  },
  {
    "id": "inventory-ofis-server-sistem-odasi-klima",
    "inventoryType": "room-item",
    "name": "Klima",
    "category": "İklimlendirme",
    "room": "Ofis – Server / Sistem Odası",
    "description": "Lüks: Hassas klima. Akıllı ev: Sıcaklık alarmı.",
    "primitiveType": "generic",
    "geometryGroup": "appliance",
    "physical": true,
    "dimensionsText": "–",
    "standard": "Var",
    "luxury": "Hassas klima",
    "smartConnection": "Sıcaklık alarmı",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 156
    }
  },
  {
    "id": "inventory-ofis-server-sistem-odasi-sensorler",
    "inventoryType": "room-item",
    "name": "Sensörler",
    "category": "Akıllı ev",
    "room": "Ofis – Server / Sistem Odası",
    "description": "Standart: Sıcaklık sensörü. Lüks: + Su kaçak, kapı sensörü. Akıllı ev: Alarm bildirimi.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Küçük",
    "standard": "Sıcaklık sensörü",
    "luxury": "+ Su kaçak, kapı sensörü",
    "smartConnection": "Alarm bildirimi",
    "source": {
      "sheet": "Oda Envanteri",
      "row": 157
    }
  },
  {
    "id": "device-zigbee-hub",
    "inventoryType": "smart-device",
    "name": "Zigbee hub",
    "category": "Akıllı cihaz",
    "room": "Salon",
    "rooms": "Salon",
    "description": "Örnek ürün: Zigbee Bridge Ultra. Yerleşim: TV ünitesi rafı / evin ortası.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈10 cm kare",
    "exampleProduct": "Zigbee Bridge Ultra",
    "mounting": "TV ünitesi rafı / evin ortası",
    "visibility": "Evet (küçük kutu)",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 2
    }
  },
  {
    "id": "device-anahtar-arkasi-role-notrlu",
    "inventoryType": "smart-device",
    "name": "Anahtar arkası röle (nötrlü)",
    "category": "Akıllı cihaz",
    "room": "Tüm odalar",
    "rooms": "Tüm odalar",
    "description": "Örnek ürün: ZBMINIR2 / MINI R4. Yerleşim: Anahtar kutusunun içi.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Kutu içi",
    "exampleProduct": "ZBMINIR2 / MINI R4",
    "mounting": "Anahtar kutusunun içi",
    "visibility": "Hayır",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 3
    }
  },
  {
    "id": "device-anahtar-arkasi-role-notrsuz",
    "inventoryType": "smart-device",
    "name": "Anahtar arkası röle (nötrsüz)",
    "category": "Akıllı cihaz",
    "room": "Nötr olmayan noktalar",
    "rooms": "Nötr olmayan noktalar",
    "description": "Örnek ürün: ZBMINI-L2. Yerleşim: Anahtar kutusunun içi.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Kutu içi",
    "exampleProduct": "ZBMINI-L2",
    "mounting": "Anahtar kutusunun içi",
    "visibility": "Hayır",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 4
    }
  },
  {
    "id": "device-akilli-dokunmatik-anahtar",
    "inventoryType": "smart-device",
    "name": "Akıllı dokunmatik anahtar",
    "category": "Akıllı cihaz",
    "room": "Salon, antre, yatak odası",
    "rooms": "Salon, antre, yatak odası",
    "description": "Örnek ürün: TX Ultimate / M5. Yerleşim: Mevcut anahtar yerine, yerden ≈110 cm.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "86×86 mm",
    "exampleProduct": "TX Ultimate / M5",
    "mounting": "Mevcut anahtar yerine, yerden ≈110 cm",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 5
    }
  },
  {
    "id": "device-duvar-kontrol-paneli-ekranli",
    "inventoryType": "smart-device",
    "name": "Duvar kontrol paneli (ekranlı)",
    "category": "Akıllı cihaz",
    "room": "Antre / salon",
    "rooms": "Antre / salon",
    "description": "Örnek ürün: NSPanel Pro. Yerleşim: Antre veya salon duvarı, ≈140 cm.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "86×86 mm + ekran",
    "exampleProduct": "NSPanel Pro",
    "mounting": "Antre veya salon duvarı, ≈140 cm",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 6
    }
  },
  {
    "id": "device-kablosuz-sahne-butonu",
    "inventoryType": "smart-device",
    "name": "Kablosuz sahne butonu",
    "category": "Akıllı cihaz",
    "room": "Antre, yatak odası",
    "rooms": "Antre, yatak odası",
    "description": "Örnek ürün: SNZB-01P. Yerleşim: Komodin, antre konsolu, duvar.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈5 cm",
    "exampleProduct": "SNZB-01P",
    "mounting": "Komodin, antre konsolu, duvar",
    "visibility": "Evet (küçük)",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 7
    }
  },
  {
    "id": "device-perde-motoru",
    "inventoryType": "smart-device",
    "name": "Perde motoru",
    "category": "Akıllı cihaz",
    "room": "Salon, yatak odaları",
    "rooms": "Salon, yatak odaları",
    "description": "Örnek ürün: Uyumlu Zigbee perde motoru. Yerleşim: Perde kutusu / korniş içinde.",
    "primitiveType": "curtain",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Ray = pencere genişliği",
    "exampleProduct": "Uyumlu Zigbee perde motoru",
    "mounting": "Perde kutusu / korniş içinde",
    "visibility": "Ray görünür",
    "package": "Standart (salon) / Plus (tümü)",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 8
    }
  },
  {
    "id": "device-panjur-modulu",
    "inventoryType": "smart-device",
    "name": "Panjur modülü",
    "category": "Akıllı cihaz",
    "room": "Panjurlu pencereler",
    "rooms": "Panjurlu pencereler",
    "description": "Örnek ürün: MINI-RBS (panjur). Yerleşim: Panjur anahtar kutusu içi.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Kutu içi",
    "exampleProduct": "MINI-RBS (panjur)",
    "mounting": "Panjur anahtar kutusu içi",
    "visibility": "Hayır",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 9
    }
  },
  {
    "id": "device-akilli-radyator-vanasi",
    "inventoryType": "smart-device",
    "name": "Akıllı radyatör vanası",
    "category": "Akıllı cihaz",
    "room": "Tüm radyatörlü odalar",
    "rooms": "Tüm radyatörlü odalar",
    "description": "Örnek ürün: TRVZB. Yerleşim: Radyatör vana yerine.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈5×5×9 cm",
    "exampleProduct": "TRVZB",
    "mounting": "Radyatör vana yerine",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 10
    }
  },
  {
    "id": "device-kombi-kontrolu",
    "inventoryType": "smart-device",
    "name": "Kombi kontrolü",
    "category": "Akıllı cihaz",
    "room": "Mutfak/balkon (kombi)",
    "rooms": "Mutfak/balkon (kombi)",
    "description": "Örnek ürün: Kuru kontaklı röle / akıllı termostat. Yerleşim: Kombi yanı veya salon duvarı.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈9×9 cm",
    "exampleProduct": "Kuru kontaklı röle / akıllı termostat",
    "mounting": "Kombi yanı veya salon duvarı",
    "visibility": "Termostat görünür",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 11
    }
  },
  {
    "id": "device-sicaklik-nem-sensoru",
    "inventoryType": "smart-device",
    "name": "Sıcaklık-nem sensörü",
    "category": "Akıllı cihaz",
    "room": "Salon, yatak odaları",
    "rooms": "Salon, yatak odaları",
    "description": "Örnek ürün: SNZB-02D. Yerleşim: İç duvar, yerden ≈150 cm, güneş almayan.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈6 cm",
    "exampleProduct": "SNZB-02D",
    "mounting": "İç duvar, yerden ≈150 cm, güneş almayan",
    "visibility": "Evet (küçük ekran)",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 12
    }
  },
  {
    "id": "device-kapi-pencere-sensoru",
    "inventoryType": "smart-device",
    "name": "Kapı/pencere sensörü",
    "category": "Akıllı cihaz",
    "room": "Dış kapı, balkon, pencereler",
    "rooms": "Dış kapı, balkon, pencereler",
    "description": "Örnek ürün: SNZB-04P. Yerleşim: Kasanın üst köşesi (iki parça).",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈5×2 cm",
    "exampleProduct": "SNZB-04P",
    "mounting": "Kasanın üst köşesi (iki parça)",
    "visibility": "Evet (küçük)",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 13
    }
  },
  {
    "id": "device-hareket-sensoru-pir",
    "inventoryType": "smart-device",
    "name": "Hareket sensörü (PIR)",
    "category": "Akıllı cihaz",
    "room": "Koridor, antre, WC",
    "rooms": "Koridor, antre, WC",
    "description": "Örnek ürün: SNZB-03P. Yerleşim: Oda köşesi, ≈220 cm.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈6 cm",
    "exampleProduct": "SNZB-03P",
    "mounting": "Oda köşesi, ≈220 cm",
    "visibility": "Evet",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 14
    }
  },
  {
    "id": "device-varlik-sensoru-mmwave",
    "inventoryType": "smart-device",
    "name": "Varlık sensörü (mmWave)",
    "category": "Akıllı cihaz",
    "room": "Salon, yatak, banyo",
    "rooms": "Salon, yatak, banyo",
    "description": "Örnek ürün: SNZB-06P. Yerleşim: Tavan veya duvar.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈8 cm",
    "exampleProduct": "SNZB-06P",
    "mounting": "Tavan veya duvar",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 15
    }
  },
  {
    "id": "device-su-kacak-sensoru",
    "inventoryType": "smart-device",
    "name": "Su kaçak sensörü",
    "category": "Akıllı cihaz",
    "room": "Mutfak, banyo, kiler",
    "rooms": "Mutfak, banyo, kiler",
    "description": "Örnek ürün: SNZB-05P. Yerleşim: Zemin: evye altı, makine arkası, banyo.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈5 cm",
    "exampleProduct": "SNZB-05P",
    "mounting": "Zemin: evye altı, makine arkası, banyo",
    "visibility": "Evet (zeminde)",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 16
    }
  },
  {
    "id": "device-motorlu-su-vanasi",
    "inventoryType": "smart-device",
    "name": "Motorlu su vanası",
    "category": "Akıllı cihaz",
    "room": "Mutfak / su girişi",
    "rooms": "Mutfak / su girişi",
    "description": "Örnek ürün: Uyumlu Zigbee vana motoru. Yerleşim: Ana su giriş vanası üstü (sayaçtan sonra).",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈10 cm",
    "exampleProduct": "Uyumlu Zigbee vana motoru",
    "mounting": "Ana su giriş vanası üstü (sayaçtan sonra)",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 17
    }
  },
  {
    "id": "device-gaz-dedektoru",
    "inventoryType": "smart-device",
    "name": "Gaz dedektörü",
    "category": "Akıllı cihaz",
    "room": "Mutfak",
    "rooms": "Mutfak",
    "description": "Örnek ürün: Uyumlu dedektör. Yerleşim: Doğalgazda tavana yakın (≈30 cm içi), ocak/kombi yakını.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "≈8 cm",
    "exampleProduct": "Uyumlu dedektör",
    "mounting": "Doğalgazda tavana yakın (≈30 cm içi), ocak/kombi yakını",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 18
    }
  },
  {
    "id": "device-duman-isi-dedektoru",
    "inventoryType": "smart-device",
    "name": "Duman / ısı dedektörü",
    "category": "Akıllı cihaz",
    "room": "Koridor, salon, mutfak",
    "rooms": "Koridor, salon, mutfak",
    "description": "Örnek ürün: Uyumlu dedektör. Yerleşim: Tavan; mutfakta ısı dedektörü.",
    "primitiveType": "sensor",
    "geometryGroup": "sensor",
    "physical": true,
    "dimensionsText": "Ø10 cm",
    "exampleProduct": "Uyumlu dedektör",
    "mounting": "Tavan; mutfakta ısı dedektörü",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 19
    }
  },
  {
    "id": "device-siren",
    "inventoryType": "smart-device",
    "name": "Siren",
    "category": "Akıllı cihaz",
    "room": "Antre",
    "rooms": "Antre",
    "description": "Örnek ürün: Uyumlu siren. Yerleşim: Antre/koridor duvarı.",
    "primitiveType": "speaker",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "≈8 cm",
    "exampleProduct": "Uyumlu siren",
    "mounting": "Antre/koridor duvarı",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 20
    }
  },
  {
    "id": "device-goruntulu-kapi-zili",
    "inventoryType": "smart-device",
    "name": "Görüntülü kapı zili",
    "category": "Akıllı cihaz",
    "room": "Giriş",
    "rooms": "Giriş",
    "description": "Örnek ürün: Uyumlu kapı zili. Yerleşim: Dış kapı yanı, ≈140 cm.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈5×13 cm",
    "exampleProduct": "Uyumlu kapı zili",
    "mounting": "Dış kapı yanı, ≈140 cm",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 21
    }
  },
  {
    "id": "device-akilli-kilit",
    "inventoryType": "smart-device",
    "name": "Akıllı kilit",
    "category": "Akıllı cihaz",
    "room": "Giriş",
    "rooms": "Giriş",
    "description": "Örnek ürün: Uyumlu kilit. Yerleşim: Dış kapı.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Kapı kolu",
    "exampleProduct": "Uyumlu kilit",
    "mounting": "Dış kapı",
    "visibility": "Evet",
    "package": "+Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 22
    }
  },
  {
    "id": "device-ic-kamera",
    "inventoryType": "smart-device",
    "name": "İç kamera",
    "category": "Akıllı cihaz",
    "room": "Salon, çocuk odası",
    "rooms": "Salon, çocuk odası",
    "description": "Örnek ürün: CAM Slim / CAM Pan. Yerleşim: Raf veya tavan köşesi.",
    "primitiveType": "camera",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "≈7 cm",
    "exampleProduct": "CAM Slim / CAM Pan",
    "mounting": "Raf veya tavan köşesi",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 23
    }
  },
  {
    "id": "device-dis-kamera",
    "inventoryType": "smart-device",
    "name": "Dış kamera",
    "category": "Akıllı cihaz",
    "room": "Bahçe, giriş",
    "rooms": "Bahçe, giriş",
    "description": "Örnek ürün: Dış mekân kamerası. Yerleşim: Cephe/saçak altı.",
    "primitiveType": "camera",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "≈15 cm",
    "exampleProduct": "Dış mekân kamerası",
    "mounting": "Cephe/saçak altı",
    "visibility": "Evet",
    "package": "+Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 24
    }
  },
  {
    "id": "device-enerji-olcer",
    "inventoryType": "smart-device",
    "name": "Enerji ölçer",
    "category": "Akıllı cihaz",
    "room": "Antre (pano)",
    "rooms": "Antre (pano)",
    "description": "Örnek ürün: POWCT / POWR320D. Yerleşim: Elektrik panosu içi.",
    "primitiveType": "panel",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Pano içi",
    "exampleProduct": "POWCT / POWR320D",
    "mounting": "Elektrik panosu içi",
    "visibility": "Hayır",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 25
    }
  },
  {
    "id": "device-akilli-priz",
    "inventoryType": "smart-device",
    "name": "Akıllı priz",
    "category": "Akıllı cihaz",
    "room": "Lambader, ütü, çay makinesi",
    "rooms": "Lambader, ütü, çay makinesi",
    "description": "Örnek ürün: S60 / iPlug. Yerleşim: Mevcut prize takılı.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈5 cm",
    "exampleProduct": "S60 / iPlug",
    "mounting": "Mevcut prize takılı",
    "visibility": "Evet",
    "package": "Standart",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 26
    }
  },
  {
    "id": "device-ir-kumanda-modulu",
    "inventoryType": "smart-device",
    "name": "IR kumanda modülü",
    "category": "Akıllı cihaz",
    "room": "Salon, yatak odası",
    "rooms": "Salon, yatak odası",
    "description": "Örnek ürün: eWeLink uyumlu IR modül. Yerleşim: Klima ve TV'yi gören raf/duvar.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈7 cm",
    "exampleProduct": "eWeLink uyumlu IR modül",
    "mounting": "Klima ve TV'yi gören raf/duvar",
    "visibility": "Evet (küçük)",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 27
    }
  },
  {
    "id": "device-sesli-asistan-hoparloru",
    "inventoryType": "smart-device",
    "name": "Sesli asistan hoparlörü",
    "category": "Akıllı cihaz",
    "room": "Salon, mutfak",
    "rooms": "Salon, mutfak",
    "description": "Örnek ürün: Alexa / Google uyumlu hoparlör. Yerleşim: Salon rafı, mutfak.",
    "primitiveType": "speaker",
    "geometryGroup": "electronics",
    "physical": true,
    "dimensionsText": "≈10 cm",
    "exampleProduct": "Alexa / Google uyumlu hoparlör",
    "mounting": "Salon rafı, mutfak",
    "visibility": "Evet",
    "package": "Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 28
    }
  },
  {
    "id": "device-kuru-kontakli-role",
    "inventoryType": "smart-device",
    "name": "Kuru kontaklı röle",
    "category": "Akıllı cihaz",
    "room": "Garaj, bahçe kapısı, kombi",
    "rooms": "Garaj, bahçe kapısı, kombi",
    "description": "Örnek ürün: Uyumlu kuru kontak röle. Yerleşim: Kapı/garaj motor kutusu, kombi.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "Kutu içi",
    "exampleProduct": "Uyumlu kuru kontak röle",
    "mounting": "Kapı/garaj motor kutusu, kombi",
    "visibility": "Hayır",
    "package": "+Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 29
    }
  },
  {
    "id": "device-sulama-kontrolu",
    "inventoryType": "smart-device",
    "name": "Sulama kontrolü",
    "category": "Akıllı cihaz",
    "room": "Bahçe, teras",
    "rooms": "Bahçe, teras",
    "description": "Örnek ürün: Uyumlu sulama vanası. Yerleşim: Bahçe musluğu / vana kutusu.",
    "primitiveType": "generic",
    "geometryGroup": "automation",
    "physical": true,
    "dimensionsText": "≈10 cm",
    "exampleProduct": "Uyumlu sulama vanası",
    "mounting": "Bahçe musluğu / vana kutusu",
    "visibility": "Evet",
    "package": "+Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 30
    }
  },
  {
    "id": "device-beyaz-esya-entegrasyonu",
    "inventoryType": "smart-device",
    "name": "Beyaz eşya entegrasyonu",
    "category": "Akıllı cihaz",
    "room": "Mutfak, çamaşır",
    "rooms": "Mutfak, çamaşır",
    "description": "Örnek ürün: Home Assistant (HomeWhiz, Home Connect vb.). Yerleşim: Yazılım.",
    "primitiveType": "generic",
    "geometryGroup": "software",
    "physical": false,
    "dimensionsText": "–",
    "exampleProduct": "Home Assistant (HomeWhiz, Home Connect vb.)",
    "mounting": "Yazılım",
    "visibility": "Hayır",
    "package": "+Plus",
    "source": {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "row": 31
    }
  }
]);
  window.TrakswellDesignPropertyTypes = freeze([
  {
    "id": "home-2-1",
    "name": "2+1",
    "kind": "home",
    "features": [
      {
        "name": "Tipik brüt alan (m²)",
        "value": "85–100",
        "sourceRow": 2
      },
      {
        "name": "Antre",
        "value": 1,
        "sourceRow": 3
      },
      {
        "name": "Salon / Oturma",
        "value": 1,
        "sourceRow": 4
      },
      {
        "name": "Yemek alanı",
        "value": "Salonda",
        "sourceRow": 5
      },
      {
        "name": "Mutfak",
        "value": 1,
        "sourceRow": 6
      },
      {
        "name": "Ebeveyn yatak odası",
        "value": 1,
        "sourceRow": 7
      },
      {
        "name": "Diğer yatak odaları (çocuk/misafir/çalışma)",
        "value": 1,
        "sourceRow": 8
      },
      {
        "name": "Giyinme odası",
        "value": 0,
        "sourceRow": 9
      },
      {
        "name": "Ebeveyn banyosu",
        "value": 0,
        "sourceRow": 10
      },
      {
        "name": "Genel banyo",
        "value": 1,
        "sourceRow": 11
      },
      {
        "name": "WC",
        "value": "0–1",
        "sourceRow": 12
      },
      {
        "name": "Balkon / Teras",
        "value": 1,
        "sourceRow": 13
      },
      {
        "name": "Kiler / Çamaşır odası",
        "value": 0,
        "sourceRow": 14
      },
      {
        "name": "Koridor / Merdiven",
        "value": "Koridor",
        "sourceRow": 15
      },
      {
        "name": "Teknik oda / Kazan dairesi",
        "value": 0,
        "sourceRow": 16
      },
      {
        "name": "Bahçe",
        "value": 0,
        "sourceRow": 17
      },
      {
        "name": "Garaj",
        "value": 0,
        "sourceRow": 18
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 2
    }
  },
  {
    "id": "home-3-1",
    "name": "3+1",
    "kind": "home",
    "features": [
      {
        "name": "Tipik brüt alan (m²)",
        "value": "120–140",
        "sourceRow": 2
      },
      {
        "name": "Antre",
        "value": 1,
        "sourceRow": 3
      },
      {
        "name": "Salon / Oturma",
        "value": 1,
        "sourceRow": 4
      },
      {
        "name": "Yemek alanı",
        "value": "Salonda",
        "sourceRow": 5
      },
      {
        "name": "Mutfak",
        "value": 1,
        "sourceRow": 6
      },
      {
        "name": "Ebeveyn yatak odası",
        "value": 1,
        "sourceRow": 7
      },
      {
        "name": "Diğer yatak odaları (çocuk/misafir/çalışma)",
        "value": 2,
        "sourceRow": 8
      },
      {
        "name": "Giyinme odası",
        "value": 0,
        "sourceRow": 9
      },
      {
        "name": "Ebeveyn banyosu",
        "value": 1,
        "sourceRow": 10
      },
      {
        "name": "Genel banyo",
        "value": 1,
        "sourceRow": 11
      },
      {
        "name": "WC",
        "value": 1,
        "sourceRow": 12
      },
      {
        "name": "Balkon / Teras",
        "value": "1–2",
        "sourceRow": 13
      },
      {
        "name": "Kiler / Çamaşır odası",
        "value": "0–1",
        "sourceRow": 14
      },
      {
        "name": "Koridor / Merdiven",
        "value": "Koridor",
        "sourceRow": 15
      },
      {
        "name": "Teknik oda / Kazan dairesi",
        "value": 0,
        "sourceRow": 16
      },
      {
        "name": "Bahçe",
        "value": 0,
        "sourceRow": 17
      },
      {
        "name": "Garaj",
        "value": 0,
        "sourceRow": 18
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 3
    }
  },
  {
    "id": "home-4-1",
    "name": "4+1",
    "kind": "home",
    "features": [
      {
        "name": "Tipik brüt alan (m²)",
        "value": "160–190",
        "sourceRow": 2
      },
      {
        "name": "Antre",
        "value": 1,
        "sourceRow": 3
      },
      {
        "name": "Salon / Oturma",
        "value": 1,
        "sourceRow": 4
      },
      {
        "name": "Yemek alanı",
        "value": "Salonda / ayrı",
        "sourceRow": 5
      },
      {
        "name": "Mutfak",
        "value": 1,
        "sourceRow": 6
      },
      {
        "name": "Ebeveyn yatak odası",
        "value": 1,
        "sourceRow": 7
      },
      {
        "name": "Diğer yatak odaları (çocuk/misafir/çalışma)",
        "value": 3,
        "sourceRow": 8
      },
      {
        "name": "Giyinme odası",
        "value": "0–1",
        "sourceRow": 9
      },
      {
        "name": "Ebeveyn banyosu",
        "value": 1,
        "sourceRow": 10
      },
      {
        "name": "Genel banyo",
        "value": 1,
        "sourceRow": 11
      },
      {
        "name": "WC",
        "value": 1,
        "sourceRow": 12
      },
      {
        "name": "Balkon / Teras",
        "value": 2,
        "sourceRow": 13
      },
      {
        "name": "Kiler / Çamaşır odası",
        "value": 1,
        "sourceRow": 14
      },
      {
        "name": "Koridor / Merdiven",
        "value": "Koridor",
        "sourceRow": 15
      },
      {
        "name": "Teknik oda / Kazan dairesi",
        "value": 0,
        "sourceRow": 16
      },
      {
        "name": "Bahçe",
        "value": 0,
        "sourceRow": 17
      },
      {
        "name": "Garaj",
        "value": 0,
        "sourceRow": 18
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 4
    }
  },
  {
    "id": "home-dubleks",
    "name": "Dubleks",
    "kind": "home",
    "features": [
      {
        "name": "Tipik brüt alan (m²)",
        "value": "200–260",
        "sourceRow": 2
      },
      {
        "name": "Antre",
        "value": 1,
        "sourceRow": 3
      },
      {
        "name": "Salon / Oturma",
        "value": "1 + kat oturma alanı",
        "sourceRow": 4
      },
      {
        "name": "Yemek alanı",
        "value": "Ayrı",
        "sourceRow": 5
      },
      {
        "name": "Mutfak",
        "value": 1,
        "sourceRow": 6
      },
      {
        "name": "Ebeveyn yatak odası",
        "value": 1,
        "sourceRow": 7
      },
      {
        "name": "Diğer yatak odaları (çocuk/misafir/çalışma)",
        "value": "3–4",
        "sourceRow": 8
      },
      {
        "name": "Giyinme odası",
        "value": 1,
        "sourceRow": 9
      },
      {
        "name": "Ebeveyn banyosu",
        "value": 1,
        "sourceRow": 10
      },
      {
        "name": "Genel banyo",
        "value": "1–2",
        "sourceRow": 11
      },
      {
        "name": "WC",
        "value": "1–2",
        "sourceRow": 12
      },
      {
        "name": "Balkon / Teras",
        "value": "2 + teras",
        "sourceRow": 13
      },
      {
        "name": "Kiler / Çamaşır odası",
        "value": 1,
        "sourceRow": 14
      },
      {
        "name": "Koridor / Merdiven",
        "value": "Merdiven",
        "sourceRow": 15
      },
      {
        "name": "Teknik oda / Kazan dairesi",
        "value": "0–1",
        "sourceRow": 16
      },
      {
        "name": "Bahçe",
        "value": "0–1",
        "sourceRow": 17
      },
      {
        "name": "Garaj",
        "value": 0,
        "sourceRow": 18
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 5
    }
  },
  {
    "id": "home-villa",
    "name": "Villa",
    "kind": "home",
    "features": [
      {
        "name": "Tipik brüt alan (m²)",
        "value": "250–400+",
        "sourceRow": 2
      },
      {
        "name": "Antre",
        "value": 1,
        "sourceRow": 3
      },
      {
        "name": "Salon / Oturma",
        "value": "1–2",
        "sourceRow": 4
      },
      {
        "name": "Yemek alanı",
        "value": "Ayrı",
        "sourceRow": 5
      },
      {
        "name": "Mutfak",
        "value": "1 + bahçe mutfağı",
        "sourceRow": 6
      },
      {
        "name": "Ebeveyn yatak odası",
        "value": 1,
        "sourceRow": 7
      },
      {
        "name": "Diğer yatak odaları (çocuk/misafir/çalışma)",
        "value": "3–5",
        "sourceRow": 8
      },
      {
        "name": "Giyinme odası",
        "value": "1–2",
        "sourceRow": 9
      },
      {
        "name": "Ebeveyn banyosu",
        "value": 1,
        "sourceRow": 10
      },
      {
        "name": "Genel banyo",
        "value": "2–4",
        "sourceRow": 11
      },
      {
        "name": "WC",
        "value": "1–2",
        "sourceRow": 12
      },
      {
        "name": "Balkon / Teras",
        "value": "Teras + bahçe",
        "sourceRow": 13
      },
      {
        "name": "Kiler / Çamaşır odası",
        "value": 1,
        "sourceRow": 14
      },
      {
        "name": "Koridor / Merdiven",
        "value": "Merdiven",
        "sourceRow": 15
      },
      {
        "name": "Teknik oda / Kazan dairesi",
        "value": 1,
        "sourceRow": 16
      },
      {
        "name": "Bahçe",
        "value": 1,
        "sourceRow": 17
      },
      {
        "name": "Garaj",
        "value": "1",
        "sourceRow": 18
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 6
    }
  },
  {
    "id": "office-kucuk-ofis-510-kisi",
    "name": "Küçük ofis (5–10 kişi)",
    "kind": "office",
    "features": [
      {
        "name": "Resepsiyon / bekleme",
        "value": 1,
        "sourceRow": 21
      },
      {
        "name": "Açık ofis",
        "value": 1,
        "sourceRow": 22
      },
      {
        "name": "Yönetici odası",
        "value": 1,
        "sourceRow": 23
      },
      {
        "name": "Toplantı odası",
        "value": 1,
        "sourceRow": 24
      },
      {
        "name": "Çay ocağı",
        "value": 1,
        "sourceRow": 25
      },
      {
        "name": "Server / sistem odası",
        "value": "0 (dolap)",
        "sourceRow": 26
      },
      {
        "name": "WC",
        "value": "1–2",
        "sourceRow": 27
      },
      {
        "name": "Arşiv / depo",
        "value": "0–1",
        "sourceRow": 28
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 2
    }
  },
  {
    "id": "office-orta-ofis-1030-kisi",
    "name": "Orta ofis (10–30 kişi)",
    "kind": "office",
    "features": [
      {
        "name": "Resepsiyon / bekleme",
        "value": 1,
        "sourceRow": 21
      },
      {
        "name": "Açık ofis",
        "value": "1–2",
        "sourceRow": 22
      },
      {
        "name": "Yönetici odası",
        "value": "2–3",
        "sourceRow": 23
      },
      {
        "name": "Toplantı odası",
        "value": "1–2",
        "sourceRow": 24
      },
      {
        "name": "Çay ocağı",
        "value": 1,
        "sourceRow": 25
      },
      {
        "name": "Server / sistem odası",
        "value": 1,
        "sourceRow": 26
      },
      {
        "name": "WC",
        "value": "2–4",
        "sourceRow": 27
      },
      {
        "name": "Arşiv / depo",
        "value": 1,
        "sourceRow": 28
      }
    ],
    "source": {
      "sheet": "Konut Tipleri",
      "column": 3
    }
  }
]);
  window.TrakswellDesignCatalogInfo = freeze({
  "schemaVersion": 1,
  "sourceFile": "Akilli_Ev_Envanter_3D.xlsx",
  "sourceSha256": "7d2c30f7f6bf4d798f971aac502b5be40abede49adc6e9585f1ab51caad0c54a",
  "itemCount": 186,
  "roomItemCount": 156,
  "smartDeviceCount": 30,
  "sourceNotes": [
    {
      "text": "Ölçüler 3D modelleme için tipik değerlerdir; markaya ve projeye göre değişir.",
      "source": {
        "sheet": "Oda Envanteri",
        "row": 160
      }
    },
    {
      "text": "Standart = orta segment 2+1 / 3+1 daire. Lüks = 4+1, dubleks, villa veya üst segment.",
      "source": {
        "sheet": "Oda Envanteri",
        "row": 161
      }
    },
    {
      "text": "Yeşil yazılı hücreler akıllı ev ile kontrol/izleme yapılan noktalardır (bkz. 'Akıllı Cihaz Yerleşimi').",
      "source": {
        "sheet": "Oda Envanteri",
        "row": 162
      }
    },
    {
      "text": "Güvenlik: fırın ve ocak uzaktan açılmaz; buzdolabı ve derin dondurucu otomasyonla kapatılmaz.",
      "source": {
        "sheet": "Oda Envanteri",
        "row": 163
      }
    },
    {
      "text": "Not: 'Uyumlu' yazan ürünlerde eWeLink/Zigbee uyumluluğunu satın almadan önce doğrula.",
      "source": {
        "sheet": "Akıllı Cihaz Yerleşimi",
        "row": 33
      }
    },
    {
      "text": "Paket: Standart / Plus / +Plus — o cihazın ilk girdiği paket.",
      "source": {
        "sheet": "Akıllı Cihaz Yerleşimi",
        "row": 34
      }
    }
  ],
  "geometryNote": "3D şekiller yerleşim için temsili çizimlerdir. Kaynak ölçü metinleri ürünün kesin ölçüsü değildir.",
  "sourceSections": [
    {
      "sheet": "Oda Envanteri",
      "dataRange": "A2:G157",
      "entryCount": 156
    },
    {
      "sheet": "Akıllı Cihaz Yerleşimi",
      "dataRange": "A2:G31",
      "entryCount": 30
    },
    {
      "sheet": "Konut Tipleri",
      "dataRange": "A1:F18",
      "entryCount": 5,
      "kind": "home"
    },
    {
      "sheet": "Konut Tipleri",
      "dataRange": "A20:C28",
      "entryCount": 2,
      "kind": "office"
    }
  ]
});
})();
