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

  // === ДЛЯ ФИНСКИХ ПАЦИЕНТОВ (fi + en) ===
  {
    langs: ['fi', 'en'],
    fi: { keyword: 'hammasimplantti hinta Tallinna vs Helsinki vertailu', slug: 'hammasimplantti-hinta-tallinna-vs-helsinki' },
    en: { keyword: 'dental implant cost Tallinn vs Helsinki comparison', slug: 'dental-implant-tallinn-vs-helsinki' },
  },
  {
    langs: ['fi', 'en'],
    fi: { keyword: 'hammashoito Tallinnassa suomalaisille — kokemuksia ja vinkkejä', slug: 'hammashoito-tallinnassa-suomalaisille' },
    en: { keyword: 'dental treatment Tallinn for Finnish patients guide', slug: 'dental-treatment-tallinn-finnish-patients' },
  },
  {
    langs: ['fi', 'en'],
    fi: { keyword: 'All-on-4 hammasimplantit hinta Tallinna', slug: 'all-on-4-hinta-tallinna' },
    en: { keyword: 'All-on-4 dental implants Tallinn price guide', slug: 'all-on-4-implants-tallinn-price' },
  },
  {
    langs: ['fi', 'en'],
    fi: { keyword: 'hammaskruunu hinta Virossa — onko turvallista?', slug: 'hammaskruunu-hinta-viro' },
    en: { keyword: 'dental crown cost Estonia — is it safe for Finns?', slug: 'dental-crown-cost-estonia-finns' },
  },
  {
    langs: ['fi', 'en'],
    fi: { keyword: 'hammasimplantit Virossa kokemuksia suomalaisilta potilailta', slug: 'hammasimplantit-viro-kokemuksia' },
    en: { keyword: 'dental implants Estonia reviews from Finnish patients', slug: 'dental-implants-estonia-finnish-reviews' },
  },

  // === ДЛЯ ШВЕДСКИХ И НОРВЕЖСКИХ ПАЦИЕНТОВ (en) ===
  {
    langs: ['en'],
    en: { keyword: 'dental implants Tallinn for Swedish patients cost guide 2026', slug: 'dental-implants-tallinn-swedish-patients' },
  },
  {
    langs: ['en'],
    en: { keyword: 'All-on-4 Tallinn vs Stockholm price comparison', slug: 'all-on-4-tallinn-vs-stockholm' },
  },
  {
    langs: ['en'],
    en: { keyword: 'dental tourism Estonia from Norway — what to know', slug: 'dental-tourism-estonia-norway' },
  },

  // === ALL-ON-4 (все языки) ===
  {
    ru: { keyword: 'All-on-4 имплантация зубов в Таллине — цена и результат', slug: 'all-on-4-implantaciya-tallinn' },
    et: { keyword: 'All-on-4 hambaimplantaadid Tallinnas — hind ja tulemus', slug: 'all-on-4-hambaimplantaadid-tallinn' },
    fi: { keyword: 'All-on-4 kokemuksia Tallinnasta — hinta ja hoito', slug: 'all-on-4-kokemuksia-tallinna' },
    en: { keyword: 'All-on-4 dental implants Tallinn — full guide and price', slug: 'all-on-4-full-guide-tallinn' },
  },
  {
    ru: { keyword: 'протез на 4 имплантах — полная реставрация зубов', slug: 'protez-na-4-implantah' },
    et: { keyword: '4 implantaadil tuginev täisprotees', slug: '4-implantaadil-taisprotees' },
    fi: { keyword: 'kokoproteesi neljällä implantilla Tallinnassa', slug: 'kokoproteesi-neljalla-implantilla' },
    en: { keyword: 'full arch restoration 4 implants Tallinn', slug: 'full-arch-4-implants-tallinn' },
  },

  // === ДОВЕРИЕ И ГАРАНТИИ (все языки) ===
  {
    ru: { keyword: 'гарантия на зубные импланты в Эстонии — что нужно знать', slug: 'garantiya-na-implant-estoniya' },
    et: { keyword: 'hambaimplantaadi garantii Eestis — mida teada', slug: 'hambaimplantaadi-garantii-eestis' },
    fi: { keyword: 'hammasimplantin takuu Virossa — mitä tulee tietää', slug: 'hammasimplantti-takuu-viro' },
    en: { keyword: 'dental implant guarantee Estonia — what patients should know', slug: 'dental-implant-guarantee-estonia' },
  },
  {
    ru: { keyword: 'безопасно ли лечить зубы в Таллине иностранцу', slug: 'bezopasno-lechit-zuby-tallinn' },
    et: { keyword: 'kas hambaravi Tallinnas on välismaalasele ohutu', slug: 'hambaravi-tallinn-valismaalasele' },
    fi: { keyword: 'onko hammashoito Tallinnassa turvallista ulkomaalaiselle', slug: 'hammashoito-tallinna-turvallista' },
    en: { keyword: 'is dental treatment in Tallinn safe for foreign patients', slug: 'dental-treatment-tallinn-safe-foreigners' },
  },
  {
    ru: { keyword: 'что делать если имплант не прижился — гарантийный случай', slug: 'implant-ne-prizhilsya-garantiya' },
    et: { keyword: 'mida teha kui implantaat ei juurdu — garantiijuhtum', slug: 'implantaat-ei-juurdu-garantii' },
    fi: { keyword: 'mitä tehdä jos implantti ei kiinnity — takuutapaus', slug: 'implantti-ei-kiinnity-takuu' },
    en: { keyword: 'dental implant failure and guarantee what to do Tallinn', slug: 'dental-implant-failure-guarantee-tallinn' },
  },

  // === ЛАТВИЯ / РЕГИОН (en + ru) ===
  {
    langs: ['en', 'ru'],
    en: { keyword: 'dental implants Tallinn vs Riga — which is better value', slug: 'dental-implants-tallinn-vs-riga' },
    ru: { keyword: 'импланты в Таллине vs Рига — где выгоднее', slug: 'implant-tallinn-vs-riga' },
  },

  // === FAQ — реальные вопросы пациентов (hambaarst.ee) ===
  {
    ru: { keyword: 'имплант расшатался и болит — что делать', slug: 'implant-rashatalsya-chto-delat' },
    et: { keyword: 'kõikuv ja valutav implantaat — mida teha', slug: 'koikuv-implantaat-mida-teha' },
    fi: { keyword: 'implantti heiluu ja sattuu — mitä tehdä', slug: 'implantti-heiluu-mita-tehda' },
    en: { keyword: 'loose painful dental implant what to do Tallinn', slug: 'loose-painful-implant-what-to-do' },
    type: 'faq',
  },
  {
    ru: { keyword: 'зуб сломался после лечения каналов — имплант или мост', slug: 'zub-slomal-posle-kanalov-implant-ili-most' },
    et: { keyword: 'juureravi järel purunes hammas — implantaat või sild', slug: 'juureravi-järel-purunes-hammas' },
    fi: { keyword: 'hammas murtui juurihoidon jälkeen — implantti vai silta', slug: 'hammas-murtui-juurihoidon-jälkeen' },
    en: { keyword: 'tooth broke after root canal — implant or bridge Tallinn', slug: 'tooth-broke-root-canal-implant-or-bridge' },
    type: 'faq',
  },
  {
    ru: { keyword: 'нет кости для импланта — синус-лифт или костная пластика', slug: 'net-kosti-dlya-implanta-sinus-lift' },
    et: { keyword: 'implantaadiks pole luud — siinuse tõstmine või luuaugmentatsioon', slug: 'implantaadiks-pole-luud-luuaugmentatsioon' },
    fi: { keyword: 'ei luuta implanttia varten — sinuslift vai luusiirto', slug: 'ei-luuta-implanttia-varten' },
    en: { keyword: 'no bone for dental implant sinus lift or bone graft Tallinn', slug: 'no-bone-dental-implant-sinus-lift' },
    type: 'faq',
  },
  {
    ru: { keyword: 'циркониевая или металлокерамическая коронка — что лучше выбрать', slug: 'cirkon-vs-metallokeramika-chto-luchshe' },
    et: { keyword: 'tsirkoonium- või metallokeraamiline kroon — mida valida', slug: 'tsirkoonium-vs-metallokeraamiline-kroon' },
    fi: { keyword: 'zirkooni- vai metallokeramiikkakruunu — kumpi valita', slug: 'zirkooni-vs-metallokeramiikka-kruunu' },
    en: { keyword: 'zirconia vs metal ceramic crown which to choose Tallinn', slug: 'zirconia-vs-metal-ceramic-crown' },
    type: 'faq',
  },
  {
    ru: { keyword: 'All-on-4 цена и сроки лечения в Таллине — полный гид', slug: 'all-on-4-cena-sroki-tallinn-gid' },
    et: { keyword: 'All-on-4 hind ja raviaeg Tallinnas — täielik juhend', slug: 'all-on-4-hind-raviaeg-tallinn' },
    fi: { keyword: 'All-on-4 hinta ja hoitoaika Tallinnassa — täydellinen opas', slug: 'all-on-4-hinta-hoitoaika-tallinna' },
    en: { keyword: 'All-on-4 price timeline Tallinn complete patient guide', slug: 'all-on-4-price-timeline-tallinn-guide' },
    type: 'faq',
  },
  {
    ru: { keyword: 'нет зубов совсем — с чего начать лечение у стоматолога', slug: 'net-zubov-sovse-s-chego-nachat' },
    et: { keyword: 'hambad puuduvad täielikult — kust alustada ravi', slug: 'hambad-puuduvad-kust-alustada' },
    fi: { keyword: 'ei yhtään hammasta — mistä aloittaa hoito', slug: 'ei-yhtaan-hammasta-mista-aloittaa' },
    en: { keyword: 'no teeth at all where to start dental treatment Tallinn', slug: 'no-teeth-where-to-start-treatment' },
    type: 'faq',
  },
  {
    ru: { keyword: 'съёмный протез давит и болит — почему и что делать', slug: 'semnyy-protez-davit-i-bolit' },
    et: { keyword: 'eemaldatav protees surub ja valutab — miks ja mida teha', slug: 'eemaldatav-protees-surub-valutab' },
    fi: { keyword: 'irrotettava proteesi painaa ja sattuu — syy ja ratkaisu', slug: 'irrotettava-proteesi-painaa-sattuu' },
    en: { keyword: 'removable denture hurts and presses what to do Tallinn', slug: 'denture-hurts-presses-what-to-do' },
    type: 'faq',
  },
  {
    ru: { keyword: 'воспаление вокруг импланта периимплантит — лечение', slug: 'vospalenie-vokrug-implanta-periimplantit' },
    et: { keyword: 'põletik implantaadi ümber periimplantiit — ravi', slug: 'poletik-implantaadi-ümber-periimplantiit' },
    fi: { keyword: 'tulehdus implantin ympärillä periimplantiitti — hoito', slug: 'tulehdus-implantin-ympärillä-hoito' },
    en: { keyword: 'peri-implantitis inflammation around dental implant treatment', slug: 'peri-implantitis-treatment-tallinn' },
    type: 'faq',
  },
];

