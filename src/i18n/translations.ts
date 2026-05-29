export type Lang = 'ru' | 'et' | 'fi';

export const defaultLang: Lang = 'ru';

export const langLabels: Record<Lang, string> = {
  ru: 'РУ',
  et: 'ET',
  fi: 'FI',
};

export function getLangFromUrl(url: URL): Lang {
  const segs = url.pathname.split('/').filter(Boolean);
  const first = segs[0];
  const second = segs[1];
  if (first === 'et' || first === 'fi') return first;
  // /blog/et/... and /blog/fi/... paths
  if (first === 'blog' && (second === 'et' || second === 'fi')) return second as Lang;
  return 'ru';
}

export function getLocalizedPath(lang: Lang, path: string = '/'): string {
  if (lang === 'ru') return path;
  return `/${lang}${path === '/' ? '' : path}`;
}

// ─────────────────────────────────────────────────────────────
// Translation shape
// ─────────────────────────────────────────────────────────────
type UI = {
  meta: { title: string; description: string };
  nav: { home: string; about: string; blog: string; stories: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaCall: string;
    ctaAbout: string;
    s1n: string; s1l: string;
    s2n: string; s2l: string;
    s3n: string; s3l: string;
    s4n: string; s4l: string;
  };
  features: {
    sup: string; title: string;
    f1t: string; f1d: string;
    f2t: string; f2d: string;
    f3t: string; f3d: string;
    f4t: string; f4d: string;
  };
  services: {
    sup: string; title: string; cta: string;
    s1t: string; s1d: string; s1b1: string; s1b2: string; s1b3: string;
    s2t: string; s2d: string; s2b1: string; s2b2: string; s2b3: string;
    s3t: string; s3d: string; s3b1: string; s3b2: string; s3b3: string;
  };
  about: {
    sup: string; name: string; desc: string;
    e1t: string; e1s: string;
    e2t: string; e2s: string;
    e3t: string; e3s: string;
    btn: string; photoLabel: string;
    badgeLabel: string; badgeSub: string;
  };
  reviews: {
    sup: string; title: string;
    r1n: string; r1c: string; r1t: string;
    r2n: string; r2c: string; r2t: string;
    r3n: string; r3c: string; r3t: string;
  };
  contact: {
    sup: string; title: string; desc: string;
    lPhone: string; lEmail: string; lAddress: string; hours: string;
    formTitle: string;
    fName: string; fNameP: string;
    fPhone: string; fPhoneP: string;
    fService: string; fServiceP: string;
    sv1: string; sv2: string; sv3: string; sv4: string;
    fMsg: string; fMsgP: string;
    submitBtn: string; submitHint: string;
    successTitle: string; successText: string;
  };
  footer: {
    desc: string; hours: string;
    contactTitle: string; socialTitle: string;
    ig1: string; ig2: string; yt: string;
    copyright: string; location: string;
  };
};

// ─────────────────────────────────────────────────────────────
// RUSSIAN
// ─────────────────────────────────────────────────────────────
const ru: UI = {
  meta: {
    title: 'Sonin Hambaravi | Стоматология в Таллине',
    description: 'Стоматологическая клиника в Таллине. Имплантация, протезирование, лечение зубов. Запись: +37253383036',
  },
  nav: { home: 'Главная', about: 'О враче', blog: 'Блог', stories: 'Истории пациентов' },
  hero: {
    badge: 'Таллин · Имплантология · Протезирование',
    title: 'Стоматология,',
    titleAccent: 'которой доверяют',
    subtitle: 'Имплантация, протезирование и лечение зубов.\nДоктор Дмитрий Сонин — 19 лет практики, Master of Oral Implantology.',
    ctaCall: 'Записаться:',
    ctaAbout: 'О докторе',
    s1n: '19', s1l: 'лет практики',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '4', s3l: 'языка общения',
    s4n: '2005', s4l: 'год основания клиники',
  },
  features: {
    sup: 'Почему выбирают нас',
    title: 'Клиника с европейским стандартом',
    f1t: '19 лет практики',
    f1d: 'Опыт работы в Эстонии и Финляндии. Тысячи успешно проведённых имплантаций и протезирований.',
    f2t: 'Master of Oral Implantology',
    f2d: 'Академическое образование в Goethe Universität Frankfurt (2018–2019). Европейский уровень имплантологии.',
    f3t: 'Цифровые технологии',
    f3d: '3D-сканер Medit, цифровое планирование имплантации и протезирования, импланты Nobel Biocare и Osstem.',
    f4t: '4 языка общения',
    f4d: 'Эстонский, финский, английский и немецкий. Пациенты из разных стран чувствуют себя комфортно.',
  },
  services: {
    sup: 'Направления лечения', title: 'Наши услуги', cta: 'Записаться на консультацию',
    s1t: 'Имплантация',
    s1d: 'Восстановление утраченных зубов с использованием имплантов Nobel Biocare, Osstem и Dentium. Пожизненный результат при правильном уходе.',
    s1b1: 'Одиночные импланты', s1b2: 'All-on-4 / All-on-6', s1b3: '3D-планирование',
    s2t: 'Протезирование',
    s2d: 'Коронки, мосты и съёмные протезы. Цифровое сканирование с Medit обеспечивает точность и комфортную посадку.',
    s2b1: 'Коронки и мосты', s2b2: 'Съёмные протезы', s2b3: 'Цифровой 3D-сканер Medit',
    s3t: 'Лечение зубов',
    s3d: 'Терапевтическое лечение кариеса и каналов, профессиональная гигиена, отбеливание. Профилактика и регулярные осмотры.',
    s3b1: 'Лечение кариеса', s3b2: 'Эндодонтия (каналы)', s3b3: 'Профессиональная гигиена',
  },
  about: {
    sup: 'О докторе', name: 'Дмитрий Сонин',
    desc: 'Стоматолог-имплантолог и протезист с 19-летним опытом работы в Эстонии и Финляндии. Специализируется на сложных случаях имплантации и полном протезировании.',
    e1t: 'Тартуский университет', e1s: 'Стоматологический факультет, 2003–2008',
    e2t: 'Master of Oral Implantology', e2s: 'Goethe Universität Frankfurt, 2018–2019',
    e3t: 'Многоязычная практика', e3s: 'Эстонский, финский, английский, немецкий',
    btn: 'Подробнее о докторе', photoLabel: 'Фото доктора',
    badgeLabel: '19 лет опыта', badgeSub: 'Имплантология',
  },
  reviews: {
    sup: 'Отзывы', title: 'Пациенты о нас',
    r1n: 'Анна К.', r1c: 'Таллин',
    r1t: 'Отличная клиника! Доктор Сонин провёл имплантацию — всё прошло безболезненно и результат превзошёл ожидания. Особенно ценю, что доктор объясняет каждый шаг лечения.',
    r2n: 'Mikael H.', r2c: 'Хельсинки',
    r2t: 'Приехал специально из Финляндии. Очень профессиональный подход, современное оборудование. Общение на финском — без языкового барьера. Рекомендую всем финским пациентам!',
    r3n: 'Марина Р.', r3c: 'Таллин',
    r3t: 'Наконец нашла стоматолога, которому доверяю. Протезирование сделано качественно, коронки отлично подогнаны. Уже направила к доктору Сонину нескольких знакомых.',
  },
  contact: {
    sup: 'Запись на приём', title: 'Запишитесь прямо сейчас',
    desc: 'Позвоните или напишите нам — ответим в течение рабочего дня и подберём удобное время.',
    lPhone: 'Телефон', lEmail: 'Email', lAddress: 'Адрес', hours: 'Пн–Сб: 10:00–17:00',
    formTitle: 'Оставьте заявку',
    fName: 'Имя', fNameP: 'Ваше имя',
    fPhone: 'Телефон', fPhoneP: '+372 ...',
    fService: 'Услуга', fServiceP: 'Выберите услугу...',
    sv1: 'Имплантация', sv2: 'Протезирование', sv3: 'Лечение зубов', sv4: 'Консультация',
    fMsg: 'Сообщение (необязательно)', fMsgP: 'Опишите ситуацию или задайте вопрос...',
    submitBtn: 'Записаться', submitHint: 'Или позвоните напрямую — ответим сразу',
    successTitle: 'Заявка отправлена!', successText: 'Мы свяжемся с вами в ближайшее время.',
  },
  footer: {
    desc: 'Стоматологическая клиника в Таллине. Имплантация, протезирование и лечение зубов с 2005 года.',
    hours: 'Пн–Сб: 10:00–17:00',
    contactTitle: 'Контакты', socialTitle: 'Мы в соцсетях',
    ig1: 'Instagram клиники', ig2: 'Instagram доктора', yt: 'YouTube',
    copyright: 'Все права защищены.', location: 'Таллин, Эстония',
  },
};

// ─────────────────────────────────────────────────────────────
// ESTONIAN
// ─────────────────────────────────────────────────────────────
const et: UI = {
  meta: {
    title: 'Sonin Hambaravi | Hambaarst Tallinnas',
    description: 'Hambaravikliinik Tallinnas. Implantatsioon, proteesimine, hambararavi. Registreeri: +37253383036',
  },
  nav: { home: 'Avaleht', about: 'Arsti kohta', blog: 'Blogi', stories: 'Patsientide lood' },
  hero: {
    badge: 'Tallinn · Implantoloogia · Proteesimine',
    title: 'Hambaarst,',
    titleAccent: 'kellele usaldatakse',
    subtitle: 'Implantatsioon, proteesimine ja hambararavi.\nDoktor Dmitri Sonin — 19 aastat kogemust, Master of Oral Implantology.',
    ctaCall: 'Registreeri:',
    ctaAbout: 'Arsti kohta',
    s1n: '19', s1l: 'aastat kogemust',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '4', s3l: 'suhtluskeelt',
    s4n: '2005', s4l: 'kliiniku asutamisaasta',
  },
  features: {
    sup: 'Miks valida meid',
    title: 'Euroopa standarditega kliinik',
    f1t: '19 aastat praktikat',
    f1d: 'Kogemus Eestis ja Soomes. Tuhandeid edukalt teostatud implantatsioone ja proteesimisi.',
    f2t: 'Master of Oral Implantology',
    f2d: 'Akadeemiline haridus Goethe Universität Frankfurdis (2018–2019). Euroopa tasemel implantoloogia.',
    f3t: 'Digitaaltehnoloogiad',
    f3d: '3D-skanner Medit, implantatsiooni ja proteesimise digitaalne planeerimine, Nobel Biocare ja Osstem implantaadid.',
    f4t: '4 suhtluskeelt',
    f4d: 'Eesti, soome, inglise ja saksa keel. Eri riikidest pärit patsiendid tunnevad end mugavalt.',
  },
  services: {
    sup: 'Ravivaldkonnad', title: 'Meie teenused', cta: 'Registreeri konsultatsioonile',
    s1t: 'Implantatsioon',
    s1d: 'Kaotatud hammaste taastamine Nobel Biocare, Osstem ja Dentium implantaatidega. Eluaegne tulemus õige hoolduse korral.',
    s1b1: 'Üksikud implantaadid', s1b2: 'All-on-4 / All-on-6', s1b3: '3D-planeerimine',
    s2t: 'Proteesimine',
    s2d: 'Kroonid, sillad ja eemaldatavad proteesid. Medit 3D-skanner tagab täpsuse ja mugavuse.',
    s2b1: 'Kroonid ja sillad', s2b2: 'Eemaldatavad proteesid', s2b3: 'Digitaalne 3D-skanner Medit',
    s3t: 'Hambararavi',
    s3d: 'Kaariese ja kanalite teraapiline ravi, professionaalne hügieen, valgendamine. Profülaktika ja regulaarsed ülevaatused.',
    s3b1: 'Kaariese ravi', s3b2: 'Endodontia (kanalid)', s3b3: 'Professionaalne hügieen',
  },
  about: {
    sup: 'Arsti kohta', name: 'Dmitri Sonin',
    desc: 'Implantoloog ja proteesist 19-aastase kogemusega Eestis ja Soomes. Spetsialiseerub keerulistele implantatsioonijuhtumitele ja täisproteseerimisele.',
    e1t: 'Tartu Ülikool', e1s: 'Stomatoloogia teaduskond, 2003–2008',
    e2t: 'Master of Oral Implantology', e2s: 'Goethe Universität Frankfurt, 2018–2019',
    e3t: 'Mitmekeelne praktika', e3s: 'Eesti, soome, inglise, saksa keel',
    btn: 'Loe lähemalt', photoLabel: 'Arsti foto',
    badgeLabel: '19 aastat kogemust', badgeSub: 'Implantoloogia',
  },
  reviews: {
    sup: 'Arvustused', title: 'Patsiendid meie kohta',
    r1n: 'Anna K.', r1c: 'Tallinn',
    r1t: 'Suurepärane kliinik! Doktor Sonin tegi implantatsiooni — kõik läks valutult ja tulemus ületas ootused. Eriti hindan, et arst selgitab iga ravisammu.',
    r2n: 'Mikael H.', r2c: 'Helsinki',
    r2t: 'Tulin spetsiaalselt Soomest. Väga professionaalne lähenemine, kaasaegne varustus. Suhtlus soome keeles — keelebarjäär puudub. Soovitan kõigile soome patsientidele!',
    r3n: 'Marina R.', r3c: 'Tallinn',
    r3t: 'Lõpuks leidsin hambaarsti, keda usaldan. Proteesimine on tehtud kvaliteetselt, kroonid istuvad suurepäraselt. Olen juba saatnud doktor Soninile mitmeid tuttavaid.',
  },
  contact: {
    sup: 'Visiidi registreerimine', title: 'Registreeri kohe',
    desc: 'Helistage või kirjutage meile — vastame tööpäeva jooksul ja leiame sobiva aja.',
    lPhone: 'Telefon', lEmail: 'E-post', lAddress: 'Aadress', hours: 'E–L: 10:00–17:00',
    formTitle: 'Jäta päring',
    fName: 'Nimi', fNameP: 'Teie nimi',
    fPhone: 'Telefon', fPhoneP: '+372 ...',
    fService: 'Teenus', fServiceP: 'Valige teenus...',
    sv1: 'Implantatsioon', sv2: 'Proteesimine', sv3: 'Hambararavi', sv4: 'Konsultatsioon',
    fMsg: 'Sõnum (valikuline)', fMsgP: 'Kirjeldage olukorda või esitage küsimus...',
    submitBtn: 'Registreeri', submitHint: 'Või helistage otse — vastame kohe',
    successTitle: 'Päring saadetud!', successText: 'Võtame teiega peagi ühendust.',
  },
  footer: {
    desc: 'Hambaravikliinik Tallinnas. Implantatsioon, proteesimine ja hambararavi alates 2005. aastast.',
    hours: 'E–L: 10:00–17:00',
    contactTitle: 'Kontaktid', socialTitle: 'Sotsiaalmeedia',
    ig1: 'Kliiniku Instagram', ig2: 'Arsti Instagram', yt: 'YouTube',
    copyright: 'Kõik õigused kaitstud.', location: 'Tallinn, Eesti',
  },
};

// ─────────────────────────────────────────────────────────────
// FINNISH
// ─────────────────────────────────────────────────────────────
const fi: UI = {
  meta: {
    title: 'Sonin Hambaravi | Hammaslääkäri Tallinnassa',
    description: 'Hammaslääkäriklinikka Tallinnassa. Implantointi, protetiikka, hammashoito. Varaa aika: +37253383036',
  },
  nav: { home: 'Etusivu', about: 'Lääkäristä', blog: 'Blogi', stories: 'Potilastarinat' },
  hero: {
    badge: 'Tallinna · Implantologia · Protetiikka',
    title: 'Hammaslääkäri,',
    titleAccent: 'johon luotetaan',
    subtitle: 'Implantointi, protetiikka ja hammashoito.\nTohtori Dmitri Sonin — 19 vuotta kokemusta, Master of Oral Implantology.',
    ctaCall: 'Varaa aika:',
    ctaAbout: 'Lääkäristä',
    s1n: '19', s1l: 'vuotta kokemusta',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '4', s3l: 'palvelukieltä',
    s4n: '2005', s4l: 'klinikan perustamisvuosi',
  },
  features: {
    sup: 'Miksi valita meidät',
    title: 'Klinikka eurooppalaisin standardein',
    f1t: '19 vuotta käytännön kokemusta',
    f1d: 'Kokemus Virosta ja Suomesta. Tuhansia onnistuneesti suoritettuja implantointeja ja proteettisia töitä.',
    f2t: 'Master of Oral Implantology',
    f2d: 'Akateeminen koulutus Goethe Universität Frankfurtissa (2018–2019). Eurooppalaisen tason implantologia.',
    f3t: 'Digitaaliteknologia',
    f3d: '3D-skanneri Medit, implantoinnin ja protetiikan digitaalinen suunnittelu, Nobel Biocare ja Osstem implantit.',
    f4t: '4 palvelukieltä',
    f4d: 'Viro, suomi, englanti ja saksa. Eri maista tulevat potilaat tuntevat olonsa mukavaksi.',
  },
  services: {
    sup: 'Hoitoalueet', title: 'Palvelumme', cta: 'Varaa konsultaatio',
    s1t: 'Implantointi',
    s1d: 'Menetettyjen hampaiden palauttaminen Nobel Biocare, Osstem ja Dentium implanteilla. Elinikäinen tulos oikean hoidon avulla.',
    s1b1: 'Yksittäiset implantit', s1b2: 'All-on-4 / All-on-6', s1b3: '3D-suunnittelu',
    s2t: 'Protetiikka',
    s2d: 'Kruunut, sillat ja irrotettavat proteesit. Medit 3D-skanneri varmistaa tarkkuuden ja mukavuuden.',
    s2b1: 'Kruunut ja sillat', s2b2: 'Irrotettavat proteesit', s2b3: 'Digitaalinen 3D-skanneri Medit',
    s3t: 'Hammashoito',
    s3d: 'Karieksen ja juurihoitojen terapeuttinen hoito, ammattimainen hygienia, valkaiseminen. Ennaltaehkäisy ja säännölliset tarkastukset.',
    s3b1: 'Karieshoidot', s3b2: 'Endodontia (juurihoidot)', s3b3: 'Ammattimainen hygienia',
  },
  about: {
    sup: 'Lääkäristä', name: 'Dmitri Sonin',
    desc: 'Implantiologi ja proteettinen hammaslääkäri, jolla on 19 vuoden kokemus Virosta ja Suomesta. Erikoistunut vaativiin implantointitapauksiin ja kokonaisterapiaan.',
    e1t: 'Tarton yliopisto', e1s: 'Hammaslääketieteen tiedekunta, 2003–2008',
    e2t: 'Master of Oral Implantology', e2s: 'Goethe Universität Frankfurt, 2018–2019',
    e3t: 'Monikielinen käytäntö', e3s: 'Viro, suomi, englanti, saksa',
    btn: 'Lisätietoja lääkäristä', photoLabel: 'Lääkärin kuva',
    badgeLabel: '19 vuotta kokemusta', badgeSub: 'Implantologia',
  },
  reviews: {
    sup: 'Arvostelut', title: 'Potilaat meistä',
    r1n: 'Anna K.', r1c: 'Tallinna',
    r1t: 'Erinomainen klinikka! Tohtori Sonin suoritti implantoinnin — kaikki meni kivuttomasti ja tulos ylitti odotukset. Arvostan erityisesti sitä, että lääkäri selittää jokaisen hoitovaiheen.',
    r2n: 'Mikael H.', r2c: 'Helsinki',
    r2t: 'Tulin erityisesti Suomesta. Erittäin ammattimainen lähestymistapa, moderni laitteisto. Kommunikointi suomeksi — ei kielimuuria. Suosittelen kaikille suomalaisille potilaille!',
    r3n: 'Marina R.', r3c: 'Tallinna',
    r3t: 'Löysin vihdoin hammaslääkärin, johon luotan. Protetiikka on tehty laadukkaasti, kruunut istuvat täydellisesti. Olen jo suositellut tohtori Soninia useille tuttavilleni.',
  },
  contact: {
    sup: 'Ajanvaraus', title: 'Varaa aika nyt',
    desc: 'Soita tai kirjoita meille — vastaamme saman arkipäivän aikana ja löydämme sopivan ajan.',
    lPhone: 'Puhelin', lEmail: 'Sähköposti', lAddress: 'Osoite', hours: 'Ma–La: 10:00–17:00',
    formTitle: 'Jätä pyyntö',
    fName: 'Nimi', fNameP: 'Nimesi',
    fPhone: 'Puhelin', fPhoneP: '+372 ...',
    fService: 'Palvelu', fServiceP: 'Valitse palvelu...',
    sv1: 'Implantointi', sv2: 'Protetiikka', sv3: 'Hammashoito', sv4: 'Konsultaatio',
    fMsg: 'Viesti (valinnainen)', fMsgP: 'Kuvaile tilannetta tai esitä kysymys...',
    submitBtn: 'Varaa aika', submitHint: 'Tai soita suoraan — vastaamme heti',
    successTitle: 'Pyyntö lähetetty!', successText: 'Otamme sinuun pian yhteyttä.',
  },
  footer: {
    desc: 'Hammaslääkäriklinikka Tallinnassa. Implantointi, protetiikka ja hammashoito vuodesta 2005.',
    hours: 'Ma–La: 10:00–17:00',
    contactTitle: 'Yhteystiedot', socialTitle: 'Sosiaalinen media',
    ig1: 'Klinikan Instagram', ig2: 'Lääkärin Instagram', yt: 'YouTube',
    copyright: 'Kaikki oikeudet pidätetään.', location: 'Tallinna, Viro',
  },
};

export const ui: Record<Lang, UI> = { ru, et, fi };
