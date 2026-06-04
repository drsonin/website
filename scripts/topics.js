// Rotating topic seeds for daily blog generation
// Each entry has keywords in all four languages + stable slug per language
// Focus: implantology + prosthetics (no pediatric dentistry — no license)

export const TOPICS = [
  // === ИМПЛАНТАЦИЯ (5 тем) ===
  {
    ru: { keyword: 'имплантация зубов', slug: 'implantaciya-zubov' },
    et: { keyword: 'hambaimplantaadid', slug: 'hambaimplantaadid' },
    fi: { keyword: 'hammasimplantit', slug: 'hammasimplantit' },
    en: { keyword: 'dental implants Tallinn', slug: 'dental-implants-tallinn' },
  },
  {
    ru: { keyword: 'имплантация зубов All-on-4', slug: 'implantaciya-all-on-4' },
    et: { keyword: 'All-on-4 hambaprotees', slug: 'all-on-4-hambaprotees' },
    fi: { keyword: 'All-on-4 hammasimplantit', slug: 'all-on-4-hammasimplantit' },
    en: { keyword: 'All-on-4 dental implants Tallinn', slug: 'all-on-4-implants-tallinn' },
  },
  {
    ru: { keyword: 'одноэтапная имплантация зубов', slug: 'odnoetapnaya-implantaciya' },
    et: { keyword: 'üheaegne hambaimplantatsioon', slug: 'uheaegne-hambaimplantatsioon' },
    fi: { keyword: 'välitön hammasistutus', slug: 'valitön-hammasistutus' },
    en: { keyword: 'immediate dental implants Tallinn', slug: 'immediate-implants-tallinn' },
  },
  {
    ru: { keyword: 'цена на имплантацию зубов Таллин', slug: 'cena-implantaciya-tallinn' },
    et: { keyword: 'hambaimplantaatide hind Tallinn', slug: 'hambaimplantaatide-hind' },
    fi: { keyword: 'hammasimplanttien hinta Tallinna', slug: 'hammasimplanttien-hinta' },
    en: { keyword: 'dental implant cost Tallinn', slug: 'dental-implant-cost-tallinn' },
  },
  {
    ru: { keyword: 'костная пластика перед имплантацией', slug: 'kostnaya-plastika' },
    et: { keyword: 'luuaugmentatsiooon implantatsiooniks', slug: 'luuaugmentatsioon' },
    fi: { keyword: 'luunsiirto ennen hammasimplanttia', slug: 'luunsiirto-hammasimplantti' },
    en: { keyword: 'bone grafting for dental implants Tallinn', slug: 'bone-grafting-tallinn' },
  },

  // === ПРОТЕЗИРОВАНИЕ (4 темы) ===
  {
    ru: { keyword: 'зубные протезы и съёмные конструкции', slug: 'zubnye-protezy' },
    et: { keyword: 'hambaproteesid', slug: 'hambaproteesid' },
    fi: { keyword: 'hammasproteesit', slug: 'hammasproteesit' },
    en: { keyword: 'dentures and dental prosthetics Tallinn', slug: 'dentures-tallinn' },
  },
  {
    ru: { keyword: 'зубные коронки и мосты', slug: 'zubnye-koronki-i-mosty' },
    et: { keyword: 'hambakroonid ja sillad', slug: 'hambakroonid-ja-sillad' },
    fi: { keyword: 'hammaskruunut ja sillat', slug: 'hammaskruunut-ja-sillat' },
    en: { keyword: 'dental crowns and bridges Tallinn', slug: 'dental-crowns-bridges-tallinn' },
  },
  {
    ru: { keyword: 'циркониевые коронки на зубы', slug: 'cirkonievye-koronki' },
    et: { keyword: 'tsirkooniumkroonid', slug: 'tsirkooniumkroonid' },
    fi: { keyword: 'zirkoonikruunut', slug: 'zirkoonikruunut' },
    en: { keyword: 'zirconia dental crowns Tallinn', slug: 'zirconia-crowns-tallinn' },
  },
  {
    ru: { keyword: 'протез на имплантах', slug: 'protez-na-implantah' },
    et: { keyword: 'implantaadil tuginev protees', slug: 'implantaadil-tuginev-protees' },
    fi: { keyword: 'implanttituettu proteesi', slug: 'implanttituettu-proteesi' },
    en: { keyword: 'implant-supported dentures Tallinn', slug: 'implant-dentures-tallinn' },
  },

  // === ЭСТЕТИКА (3 темы) ===
  {
    ru: { keyword: 'зубные виниры', slug: 'zubnye-viniry' },
    et: { keyword: 'hambavinerid', slug: 'hambavinerid' },
    fi: { keyword: 'hammasvinerit', slug: 'hammasvinerit' },
    en: { keyword: 'dental veneers Tallinn', slug: 'dental-veneers-tallinn' },
  },
  {
    ru: { keyword: 'отбеливание зубов', slug: 'otbelivanie-zubov' },
    et: { keyword: 'hammaste valgendamine', slug: 'hammaste-valgendamine' },
    fi: { keyword: 'hampaiden valkaiseminen', slug: 'hampaiden-valkaiseminen' },
    en: { keyword: 'teeth whitening Tallinn', slug: 'teeth-whitening-tallinn' },
  },
  {
    ru: { keyword: 'голливудская улыбка трансформация', slug: 'transformaciya-ulybki' },
    et: { keyword: 'naeratuse muutmine', slug: 'naeratuse-muutmine' },
    fi: { keyword: 'hymy muutos', slug: 'hymy-muutos' },
    en: { keyword: 'smile makeover Tallinn', slug: 'smile-makeover-tallinn' },
  },

  // === ЛЕЧЕНИЕ (4 темы) ===
  {
    ru: { keyword: 'лечение корневых каналов', slug: 'lechenie-kornevyh-kanalov' },
    et: { keyword: 'juureravi', slug: 'juureravi' },
    fi: { keyword: 'juurihoito', slug: 'juurihoito' },
    en: { keyword: 'root canal treatment Tallinn', slug: 'root-canal-treatment-tallinn' },
  },
  {
    ru: { keyword: 'лечение пародонтоза', slug: 'lechenie-parodontoza' },
    et: { keyword: 'periodontiitravi', slug: 'periodontiitravi' },
    fi: { keyword: 'parodontiitin hoito', slug: 'parodontiitin-hoito' },
    en: { keyword: 'gum disease treatment Tallinn', slug: 'gum-disease-treatment-tallinn' },
  },
  {
    ru: { keyword: 'удаление зубов мудрости', slug: 'udalenie-zubov-mudrosti' },
    et: { keyword: 'tarkusehamba eemaldamine', slug: 'tarkusehamba-eemaldamine' },
    fi: { keyword: 'viisaudenhampaiden poisto', slug: 'viisaudenhampaiden-poisto' },
    en: { keyword: 'wisdom tooth removal Tallinn', slug: 'wisdom-tooth-removal-tallinn' },
  },
  {
    ru: { keyword: 'срочная стоматологическая помощь', slug: 'srochnaya-stomatologicheskaya-pomosh' },
    et: { keyword: 'kiire hambaabi Tallinn', slug: 'kiire-hambaabi-tallinn' },
    fi: { keyword: 'kiireellinen hammashoito Tallinna', slug: 'kiireellinen-hammashoito-tallinna' },
    en: { keyword: 'emergency dental care Tallinn', slug: 'emergency-dental-care-tallinn' },
  },

  // === МЕДИЦИНСКИЙ ТУРИЗМ (4 темы) ===
  {
    ru: { keyword: 'имплантация зубов Турция vs Таллин: реальный расчёт стоимости', slug: 'implantaciya-turciya-vs-tallinn' },
    et: { keyword: 'hambaraviturismi võrdlus Türgi vs Tallinn', slug: 'hambaraviturismi-turkgi-vs-tallinn' },
    fi: { keyword: 'hammashoitomatkailu Turkki vs Tallinna', slug: 'hammashoitomatkailu-turkki-vs-tallinna' },
    en: { keyword: 'dental implants Turkey vs Tallinn cost comparison', slug: 'dental-implants-turkey-vs-tallinn' },
    type: 'medical-tourism',
  },
  {
    ru: { keyword: 'стоматологический туризм: скрытые расходы которые никто не считает', slug: 'stomatologicheskiy-turizm-skrytye-rashody' },
    et: { keyword: 'hambaraviturismi varjatud kulud', slug: 'hambaraviturismi-varjatud-kulud' },
    fi: { keyword: 'hammaslääkärimatkailu piilotetut kustannukset', slug: 'hammaslääkärimatkailu-piilotetut' },
    en: { keyword: 'dental tourism hidden costs real calculation', slug: 'dental-tourism-hidden-costs' },
    type: 'medical-tourism',
  },
  {
    ru: { keyword: 'протезирование зубов за рубежом: риски и гарантии', slug: 'protezirovanie-za-rubezhom-riski' },
    et: { keyword: 'hambaravi välismaal riskid ja garantiid', slug: 'hambaravi-välismaal-riskid' },
    fi: { keyword: 'hammashoito ulkomailla riskit ja takuut', slug: 'hammashoito-ulkomailla-riskit' },
    en: { keyword: 'dental work abroad risks and guarantees', slug: 'dental-work-abroad-risks' },
    type: 'medical-tourism',
  },
  {
    ru: { keyword: 'почему лечить зубы в Таллине выгоднее чем в Финляндии', slug: 'lechit-zuby-tallinn-vs-finlyandiya' },
    et: { keyword: 'miks ravida hambaid Tallinnas odavamalt kui Soomes', slug: 'hambaravi-tallinn-vs-soome' },
    fi: { keyword: 'miksi hammashoito Tallinnassa on edullisempaa kuin Suomessa', slug: 'hammashoito-tallinna-vs-suomi' },
    en: { keyword: 'dental treatment Tallinn cheaper than Finland', slug: 'dental-tallinn-cheaper-finland' },
    type: 'medical-tourism',
  },

  // === ПРОЧЕЕ (4 темы) ===
  {
    ru: { keyword: 'профессиональная гигиена полости рта', slug: 'professionalnaya-gigiena' },
    et: { keyword: 'professionaalne suuhügieen', slug: 'professionaalne-suuhügieen' },
    fi: { keyword: 'ammattimainen suuhygienia', slug: 'ammattimainen-suuhygienia' },
    en: { keyword: 'professional teeth cleaning Estonia', slug: 'professional-teeth-cleaning-estonia' },
  },
  {
    ru: { keyword: 'брекеты и элайнеры', slug: 'brekety-i-elainery' },
    et: { keyword: 'brekettid ja alignerid', slug: 'brekettid-ja-alignerid' },
    fi: { keyword: 'hammasraudat ja alignerit', slug: 'hammasraudat-ja-alignerit' },
    en: { keyword: 'braces and aligners Estonia', slug: 'braces-aligners-estonia' },
  },
  {
    ru: { keyword: 'страх перед стоматологом', slug: 'strah-pered-stomatologom' },
    et: { keyword: 'hirm hambaarsti ees', slug: 'hirm-hambaarsti-ees' },
    fi: { keyword: 'hammashoitopelko', slug: 'hammashoitopelko' },
    en: { keyword: 'dental anxiety treatment Tallinn', slug: 'dental-anxiety-tallinn' },
  },
  {
    ru: { keyword: 'керамические вкладки', slug: 'keramicheskie-vkladki' },
    et: { keyword: 'keraamilised sisetäited', slug: 'keraamilised-siseaited' },
    fi: { keyword: 'keraamiset inlayit', slug: 'keraamiset-inlayit' },
    en: { keyword: 'ceramic inlays Tallinn', slug: 'ceramic-inlays-tallinn' },
  },
];
