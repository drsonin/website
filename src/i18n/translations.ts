export type Lang = 'ru' | 'et' | 'fi' | 'en';

export const defaultLang: Lang = 'ru';

export const langLabels: Record<Lang, string> = {
  ru: 'РУ',
  et: 'ET',
  fi: 'FI',
  en: 'EN',
};

export function getLangFromUrl(url: URL): Lang {
  const segs = url.pathname.split('/').filter(Boolean);
  const first = segs[0];
  const second = segs[1];
  if (first === 'et' || first === 'fi' || first === 'en') return first;
  // /blog/et/..., /blog/fi/..., /blog/en/... paths
  if (first === 'blog' && (second === 'et' || second === 'fi' || second === 'en')) return second as Lang;
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
    ctaForm: string;
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
    formTitle: string; formDesc: string;
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
    ctaForm: 'Оставить заявку',
    ctaCall: 'Записаться:',
    ctaAbout: 'О докторе',
    s1n: '19', s1l: 'лет практики',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '5', s3l: 'языков общения',
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
    f4t: '5 языков общения',
    f4d: 'Русский, эстонский, финский, английский и немецкий. Пациенты из разных стран чувствуют себя комфортно.',
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
    e3t: 'Многоязычная практика', e3s: 'Русский, эстонский, финский, английский, немецкий',
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
    formTitle: 'Имплант от 29 € в месяц — узнайте стоимость вашего лечения',
    formDesc: 'Рассрочка до 36 месяцев, 0%, без переплат. Оставьте заявку — перезвоним и рассчитаем ежемесячный платёж для вашего случая.',
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
    ctaForm: 'Saada päring',
    ctaCall: 'Registreeri:',
    ctaAbout: 'Arsti kohta',
    s1n: '19', s1l: 'aastat kogemust',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '5', s3l: 'suhtluskeelt',
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
    f4t: '5 suhtluskeelt',
    f4d: 'Vene, eesti, soome, inglise ja saksa keel. Eri riikidest pärit patsiendid tunnevad end mugavalt.',
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
    e3t: 'Mitmekeelne praktika', e3s: 'Vene, eesti, soome, inglise, saksa keel',
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
    formTitle: 'Implantaat alates 29 € kuus — teadke oma ravi hinda',
    formDesc: 'Järelmaks kuni 36 kuud, 0%, ilma lisatasudeta. Jätke päring — helistame tagasi ja arvutame teie igakuise makse.',
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
    ctaForm: 'Lähetä pyyntö',
    ctaCall: 'Varaa aika:',
    ctaAbout: 'Lääkäristä',
    s1n: '19', s1l: 'vuotta kokemusta',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '5', s3l: 'palvelukieltä',
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
    f4t: '5 palvelukieltä',
    f4d: 'Venäjä, viro, suomi, englanti ja saksa. Eri maista tulevat potilaat tuntevat olonsa mukavaksi.',
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
    e3t: 'Monikielinen käytäntö', e3s: 'Venäjä, viro, suomi, englanti, saksa',
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
    formTitle: 'Implantti alkaen 29 € / kk — selvitä hoitosi hinta',
    formDesc: 'Osamaksu jopa 36 kuukautta, 0%, ilman lisäkustannuksia. Jätä pyyntö — soitamme takaisin ja laskemme kuukausimaksusi.',
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

// ─────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────
const en: UI = {
  meta: {
    title: 'Sonin Hambaravi | Dentist in Tallinn',
    description: 'Dental clinic in Tallinn. Implants, prosthetics, dental treatment. Book: +37253383036',
  },
  nav: { home: 'Home', about: 'About', blog: 'Blog', stories: 'Patient Stories' },
  hero: {
    badge: 'Tallinn · Implantology · Prosthetics',
    title: 'Dentistry',
    titleAccent: 'you can trust',
    subtitle: 'Implants, prosthetics and dental treatment.\nDr Dmitri Sonin — 19 years of practice, Master of Oral Implantology.',
    ctaForm: 'Send a request',
    ctaCall: 'Book now:',
    ctaAbout: 'About the doctor',
    s1n: '19', s1l: 'years of practice',
    s2n: 'Master', s2l: 'Oral Implantology, Frankfurt',
    s3n: '5', s3l: 'languages spoken',
    s4n: '2005', s4l: 'clinic founded',
  },
  features: {
    sup: 'Why choose us',
    title: 'Clinic with European standards',
    f1t: '19 years of practice',
    f1d: 'Experience in Estonia and Finland. Thousands of successful implants and prosthetic restorations.',
    f2t: 'Master of Oral Implantology',
    f2d: 'Academic degree from Goethe Universität Frankfurt (2018–2019). European level of implantology.',
    f3t: 'Digital technology',
    f3d: 'Medit 3D scanner, digital implant and prosthetic planning, Nobel Biocare and Osstem implants.',
    f4t: '5 languages spoken',
    f4d: 'Russian, Estonian, Finnish, English and German. Patients from different countries feel at home.',
  },
  services: {
    sup: 'Treatments', title: 'Our services', cta: 'Book a consultation',
    s1t: 'Dental Implants',
    s1d: 'Restore missing teeth with Nobel Biocare, Osstem and Dentium implants. Lifelong results with proper care.',
    s1b1: 'Single implants', s1b2: 'All-on-4 / All-on-6', s1b3: '3D planning',
    s2t: 'Prosthetics',
    s2d: 'Crowns, bridges and dentures. Digital scanning with Medit ensures precision and a comfortable fit.',
    s2b1: 'Crowns & bridges', s2b2: 'Dentures', s2b3: 'Medit 3D scanner',
    s3t: 'Dental Treatment',
    s3d: 'Cavity treatment, root canals, professional hygiene, whitening. Preventive care and regular check-ups.',
    s3b1: 'Cavity treatment', s3b2: 'Endodontics (root canals)', s3b3: 'Professional hygiene',
  },
  about: {
    sup: 'About the doctor', name: 'Dmitri Sonin',
    desc: 'Dental implantologist and prosthetist with 19 years of experience in Estonia and Finland. Specialises in complex implantation and full-mouth rehabilitation.',
    e1t: 'University of Tartu', e1s: 'Faculty of Dentistry, 2003–2008',
    e2t: 'Master of Oral Implantology', e2s: 'Goethe Universität Frankfurt, 2018–2019',
    e3t: 'Multilingual practice', e3s: 'Russian, Estonian, Finnish, English, German',
    btn: 'More about the doctor', photoLabel: 'Photo of the doctor',
    badgeLabel: '19 years experience', badgeSub: 'Implantology',
  },
  reviews: {
    sup: 'Reviews', title: 'What patients say',
    r1n: 'Anna K.', r1c: 'Tallinn',
    r1t: 'Excellent clinic! Dr Sonin performed the implant — everything went smoothly and the result exceeded expectations. I especially appreciate that the doctor explains every step.',
    r2n: 'Mikael H.', r2c: 'Helsinki',
    r2t: 'I came specifically from Finland. Very professional approach, modern equipment. Consultation in Finnish — no language barrier. I recommend to all Finnish patients!',
    r3n: 'Marina R.', r3c: 'Tallinn',
    r3t: 'Finally found a dentist I trust. The prosthetics are high quality, crowns fit perfectly. I have already referred several friends to Dr Sonin.',
  },
  contact: {
    sup: 'Book an appointment', title: 'Book right now',
    desc: 'Call or message us — we will respond within the working day and find a convenient time.',
    lPhone: 'Phone', lEmail: 'Email', lAddress: 'Address', hours: 'Mon–Sat: 10:00–17:00',
    formTitle: 'Implant from €29/month — find out the cost of your treatment',
    formDesc: 'Instalment plan up to 36 months, 0%, no extra charges. Leave a request — we\'ll call back and calculate your monthly payment.',
    fName: 'Name', fNameP: 'Your name',
    fPhone: 'Phone', fPhoneP: '+372 ...',
    fService: 'Service', fServiceP: 'Select a service...',
    sv1: 'Implants', sv2: 'Prosthetics', sv3: 'Dental treatment', sv4: 'Consultation',
    fMsg: 'Message (optional)', fMsgP: 'Describe your situation or ask a question...',
    submitBtn: 'Book now', submitHint: 'Or call us directly — we answer immediately',
    successTitle: 'Request sent!', successText: 'We will contact you shortly.',
  },
  footer: {
    desc: 'Dental clinic in Tallinn. Implants, prosthetics and dental treatment since 2005.',
    hours: 'Mon–Sat: 10:00–17:00',
    contactTitle: 'Contact', socialTitle: 'Social media',
    ig1: 'Clinic Instagram', ig2: 'Doctor Instagram', yt: 'YouTube',
    copyright: 'All rights reserved.', location: 'Tallinn, Estonia',
  },
};

export const ui: Record<Lang, UI> = { ru, et, fi, en };

// ─────────────────────────────────────────────────────────────
// ABOUT PAGE translations
// ─────────────────────────────────────────────────────────────
export const aboutT: Record<Lang, {
  meta: { title: string; description: string };
  badge: string; name: string; subtitle: string;
  ctaForm: string; ctaCall: string;
  badgeYears: string; badgeSub: string;
  stats: [string, string, string, string];
  bioSup: string; bioTitle: string;
  bio1: string; bio2: string; bio3: string;
  eduSup: string; eduTitle: string;
  edu: { year: string; title: string; place: string; desc: string; accent: boolean }[];
  specSup: string; specTitle: string;
  specs: { title: string; items: string[] }[];
  langTitle: string; langSub: string;
  ctaTitle: string; ctaDesc: string; ctaBtn: string;
}> = {
  ru: {
    meta: { title: 'О докторе Дмитрии Сонине — Sonin Hambaravi', description: 'Стоматолог-имплантолог Дмитрий Сонин. 19 лет практики, Master of Oral Implantology (Goethe Universität Frankfurt). Таллин, Эстония.' },
    badge: 'Стоматолог-имплантолог · Таллин', name: 'Дмитрий Сонин',
    subtitle: 'Стоматолог-имплантолог и протезист с 19-летним опытом работы в Эстонии и Финляндии. Специализируется на сложных случаях имплантации, полном протезировании и восстановлении зубного ряда.',
    ctaForm: 'Оставить заявку', ctaCall: 'Позвонить',
    badgeYears: '19 лет опыта', badgeSub: 'Эстония · Финляндия',
    stats: ['лет практики', 'год основания клиники', 'языка общения', 'Oral Implantology'],
    bioSup: 'Биография', bioTitle: 'О докторе',
    bio1: 'Дмитрий Сонин — стоматолог-имплантолог и протезист, ведущий практику в Таллине с 2005 года. За 19 лет работы он специализировался на наиболее сложных областях стоматологии — имплантации и протезировании, — накопив обширный клинический опыт как в Эстонии, так и в Финляндии.',
    bio2: 'В 2018–2019 годах доктор Сонин прошёл академическую программу Master of Oral Implantology в Goethe Universität Frankfurt — одном из ведущих европейских университетов в области стоматологической имплантологии. Это позволяет ему применять самые современные хирургические и протетические протоколы в ежедневной практике.',
    bio3: 'Доктор Сонин ведёт приём на пяти языках — русском, эстонском, финском, английском и немецком, что делает клинику доступной для пациентов из разных стран. Значительную часть пациентов составляют финские граждане, специально приезжающие в Таллин для получения стоматологической помощи европейского качества по более доступным ценам.',
    eduSup: 'Образование', eduTitle: 'Академическая подготовка',
    edu: [
      { year: '2018–2019', title: 'Master of Oral Implantology', place: 'Goethe Universität Frankfurt, Германия', desc: 'Академическая программа по хирургической и протетической имплантологии. Изучение современных имплантационных систем, костной регенерации и цифровых методов планирования.', accent: true },
      { year: '2003–2008', title: 'Диплом врача-стоматолога', place: 'Тартуский университет, Эстония', desc: 'Стоматологический факультет Тартуского университета — ведущего медицинского вуза Эстонии.', accent: false },
    ],
    specSup: 'Специализации', specTitle: 'Направления работы',
    specs: [
      { title: 'Дентальная имплантация', items: ['Одиночные импланты', 'All-on-4 / All-on-6', 'Немедленная нагрузка', '3D-планирование (CBCT)', 'Направляемая хирургия'] },
      { title: 'Протезирование', items: ['Коронки и мосты (цирконий, e.max)', 'Съёмные протезы', 'Протезы на имплантах', 'Цифровое сканирование Medit', 'Временные конструкции'] },
      { title: 'Терапевтическая стоматология', items: ['Лечение кариеса', 'Эндодонтия (корневые каналы)', 'Отбеливание зубов', 'Профессиональная гигиена', 'Профилактические осмотры'] },
      { title: 'Технологии', items: ['Nobel Biocare, Osstem, Dentium', '3D-сканер Medit', 'Цифровое планирование', 'CAD/CAM коронки', 'Цифровые оттиски'] },
    ],
    langTitle: 'Мультиязычная практика', langSub: 'Доктор Сонин принимает пациентов на пяти языках',
    ctaTitle: 'Запишитесь на консультацию', ctaDesc: 'Первая консультация — это знакомство, осмотр и честный разговор о вашей ситуации. Без давления.', ctaBtn: 'Оставить заявку',
  },
  et: {
    meta: { title: 'Dr Dmitri Soninust — Sonin Hambaravi', description: 'Hambaimplantoloog Dmitri Sonin. 19 aastat praktikat, Master of Oral Implantology (Goethe Universität Frankfurt). Tallinn, Eesti.' },
    badge: 'Hambaimplantoloog · Tallinn', name: 'Dmitri Sonin',
    subtitle: 'Hambaimplantoloog ja proteesiarst 19-aastase kogemusega Eestis ja Soomes. Spetsialiseerub keerukatele implantatsioonijuhtudele, täielikule proteesimisele ja hambaravi taastamisele.',
    ctaForm: 'Saada päring', ctaCall: 'Helista',
    badgeYears: '19 aastat kogemust', badgeSub: 'Eesti · Soome',
    stats: ['aastat praktikat', 'kliiniku asutamisaasta', 'suhtluskeelt', 'Oral Implantology'],
    bioSup: 'Elulugu', bioTitle: 'Arsti kohta',
    bio1: 'Dmitri Sonin on hambaimplantoloog ja proteesiarst, kes praktiseerib Tallinnas alates 2005. aastast. 19 tööaasta jooksul on ta spetsialiseerunud hambaravi keerukaimatele valdkondadele — implantatsioonile ja proteesimisele — kogudes ulatusliku kliinilise kogemuse nii Eestis kui ka Soomes.',
    bio2: '2018–2019. aastal läbis doktor Sonin Goethe Universität Frankfurdis akadeemilise programmi Master of Oral Implantology — ühes Euroopa juhtivates ülikoolides hambaimplantoloogia valdkonnas. See võimaldab tal rakendada igapäevases praktikas kõige kaasaegsemaid kirurgilisi ja proteetilisi protokolle.',
    bio3: 'Doktor Sonin võtab patsiente vastu viiel keelel — vene, eesti, soome, inglise ja saksa keeles, mis muudab kliiniku kättesaadavaks erinevatest riikidest patsientidele. Märkimisväärse osa patsientidest moodustavad soome kodanikud, kes tulevad spetsiaalselt Tallinna saama Euroopa tasemega hambaravi taskukohasema hinnaga.',
    eduSup: 'Haridus', eduTitle: 'Akadeemiline ettevalmistus',
    edu: [
      { year: '2018–2019', title: 'Master of Oral Implantology', place: 'Goethe Universität Frankfurt, Saksamaa', desc: 'Akadeemiline programm kirurgilise ja proteetilise implantoloogia alal. Kaasaegsete implantsüsteemide, luuregeneratsiooni ja digitaalsete planeerimismeetodite uurimine.', accent: true },
      { year: '2003–2008', title: 'Hambaarsti diplom', place: 'Tartu Ülikool, Eesti', desc: 'Tartu Ülikooli hambaarstiteaduse teaduskond — Eesti juhtiv meditsiiniülikool.', accent: false },
    ],
    specSup: 'Erialad', specTitle: 'Ravivaldkonnad',
    specs: [
      { title: 'Hambaimplantatsioon', items: ['Üksikimplantaadid', 'All-on-4 / All-on-6', 'Kohene koormus', '3D-planeerimine (CBCT)', 'Juhitav kirurgia'] },
      { title: 'Proteesimine', items: ['Kroonid ja sillad (tsirkoonium, e.max)', 'Eemaldatavad proteesid', 'Implantaadil proteesid', 'Digitaalne Medit skannimine', 'Ajutised konstruktsioonid'] },
      { title: 'Terapeutiline hambaarst', items: ['Kaariese ravi', 'Endodontia (juurekanalid)', 'Hammaste valgendamine', 'Professionaalne hügieen', 'Ennetavad ülevaatused'] },
      { title: 'Tehnoloogiad', items: ['Nobel Biocare, Osstem, Dentium', 'Medit 3D-skanner', 'Digitaalne planeerimine', 'CAD/CAM kroonid', 'Digitaalsed jäljendid'] },
    ],
    langTitle: 'Mitmekeelne praktika', langSub: 'Doktor Sonin võtab patsiente vastu viiel keelel',
    ctaTitle: 'Registreeri konsultatsioonile', ctaDesc: 'Esimene konsultatsioon — see on tutvumine, ülevaatus ja aus vestlus teie olukorrast. Ilma surveta.', ctaBtn: 'Saada päring',
  },
  fi: {
    meta: { title: 'Dr Dmitri Soninista — Sonin Hambaravi', description: 'Hammasimplantologi Dmitri Sonin. 19 vuotta käytännön kokemusta, Master of Oral Implantology (Goethe Universität Frankfurt). Tallinna, Viro.' },
    badge: 'Hammasimplantologi · Tallinna', name: 'Dmitri Sonin',
    subtitle: 'Hammasimplantologi ja proteesisti, jolla on 19 vuoden kokemus Virosta ja Suomesta. Erikoistunut vaativiin implanttitapauksiin, täydelliseen protetiikkaan ja hammasrivistön kunnostamiseen.',
    ctaForm: 'Lähetä pyyntö', ctaCall: 'Soita',
    badgeYears: '19 vuoden kokemus', badgeSub: 'Viro · Suomi',
    stats: ['vuotta käytännössä', 'klinikan perustamisvuosi', 'kieltä', 'Oral Implantology'],
    bioSup: 'Elämäkerta', bioTitle: 'Lääkäristä',
    bio1: 'Dmitri Sonin on hammasimplantologi ja proteesisti, joka harjoittaa ammattia Tallinnassa vuodesta 2005. 19 työvuoden aikana hän on erikoistunut hammaslääketieteen vaativimpiin osa-alueisiin — implantoinnin ja protetiikan — keräten laajan kliinisen kokemuksen sekä Virosta että Suomesta.',
    bio2: 'Vuosina 2018–2019 tohtori Sonin suoritti Master of Oral Implantology -ohjelman Goethe Universität Frankfurtissa — yhdessä Euroopan johtavista yliopistoista hammasimplantologian alalla. Tämä mahdollistaa hänelle modernimpien kirurgisten ja proteettisten protokollien soveltamisen päivittäisessä työssä.',
    bio3: 'Tohtori Sonin vastaanottaa potilaita viidellä kielellä — venäjäksi, viroksi, suomeksi, englanniksi ja saksaksi — mikä tekee klinikasta saavutettavan eri maista tuleville potilaille. Merkittävän osan potilaista muodostavat suomalaiset, jotka matkustavat erityisesti Tallinnaan saadakseen eurooppalaisen tason hammashoitoa edullisempaan hintaan.',
    eduSup: 'Koulutus', eduTitle: 'Akateeminen koulutus',
    edu: [
      { year: '2018–2019', title: 'Master of Oral Implantology', place: 'Goethe Universität Frankfurt, Saksa', desc: 'Akateeminen ohjelma kirurgisessa ja proteettisessa implantologiassa. Modernien implanttijärjestelmien, luuregeneraation ja digitaalisten suunnittelumenetelmien opiskelu.', accent: true },
      { year: '2003–2008', title: 'Hammaslääketieteen tutkinto', place: 'Tarton yliopisto, Viro', desc: 'Tarton yliopiston hammaslääketieteellinen tiedekunta — Viron johtava lääketieteellinen yliopisto.', accent: false },
    ],
    specSup: 'Erikoisalat', specTitle: 'Hoitoalueet',
    specs: [
      { title: 'Hammasimplantointi', items: ['Yksittäiset implantit', 'All-on-4 / All-on-6', 'Välitön kuormitus', '3D-suunnittelu (CBCT)', 'Ohjattu kirurgia'] },
      { title: 'Protetiikka', items: ['Kruunut ja sillat (zirkonia, e.max)', 'Irrotettavat proteesit', 'Implanttituetut proteesit', 'Digitaalinen Medit-skannaus', 'Väliaikaiset rakenteet'] },
      { title: 'Terapeuttinen hammashoito', items: ['Karieshoidot', 'Endodontia (juurihoito)', 'Hampaiden valkaiseminen', 'Ammattimainen hygienia', 'Ehkäisevät tarkastukset'] },
      { title: 'Teknologiat', items: ['Nobel Biocare, Osstem, Dentium', 'Medit 3D-skanneri', 'Digitaalinen suunnittelu', 'CAD/CAM kruunut', 'Digitaaliset jäljennökset'] },
    ],
    langTitle: 'Monikielinen vastaanotto', langSub: 'Tohtori Sonin vastaanottaa potilaita viidellä kielellä',
    ctaTitle: 'Varaa konsultaatio', ctaDesc: 'Ensimmäinen konsultaatio — tutustuminen, tutkimus ja rehellinen keskustelu tilanteestasi. Ilman painostusta.', ctaBtn: 'Lähetä pyyntö',
  },
  en: {
    meta: { title: 'About Dr Dmitri Sonin — Sonin Hambaravi', description: 'Dental implantologist Dmitri Sonin. 19 years of practice, Master of Oral Implantology (Goethe Universität Frankfurt). Tallinn, Estonia.' },
    badge: 'Dental Implantologist · Tallinn', name: 'Dmitri Sonin',
    subtitle: 'Dental implantologist and prosthetist with 19 years of experience in Estonia and Finland. Specialises in complex implant cases, full-mouth rehabilitation and dental restorations.',
    ctaForm: 'Send a request', ctaCall: 'Call us',
    badgeYears: '19 years experience', badgeSub: 'Estonia · Finland',
    stats: ['years of practice', 'clinic founded', 'languages spoken', 'Oral Implantology'],
    bioSup: 'Biography', bioTitle: 'About the doctor',
    bio1: 'Dmitri Sonin is a dental implantologist and prosthetist who has been practising in Tallinn since 2005. Over 19 years he has specialised in the most demanding areas of dentistry — implantology and prosthetics — building extensive clinical experience in both Estonia and Finland.',
    bio2: 'In 2018–2019, Dr Sonin completed the Master of Oral Implantology programme at Goethe Universität Frankfurt — one of Europe\'s leading universities in dental implantology. This enables him to apply the most advanced surgical and prosthetic protocols in his daily practice.',
    bio3: 'Dr Sonin sees patients in five languages — Russian, Estonian, Finnish, English and German — making the clinic accessible to patients from many countries. A significant proportion of patients are Finnish citizens who travel specifically to Tallinn for European-quality dental care at more affordable prices.',
    eduSup: 'Education', eduTitle: 'Academic background',
    edu: [
      { year: '2018–2019', title: 'Master of Oral Implantology', place: 'Goethe Universität Frankfurt, Germany', desc: 'Academic programme in surgical and prosthetic implantology. Study of modern implant systems, bone regeneration and digital planning methods.', accent: true },
      { year: '2003–2008', title: 'Degree in Dentistry', place: 'University of Tartu, Estonia', desc: 'Faculty of Dentistry at the University of Tartu — Estonia\'s leading medical university.', accent: false },
    ],
    specSup: 'Specialisations', specTitle: 'Areas of treatment',
    specs: [
      { title: 'Dental Implants', items: ['Single implants', 'All-on-4 / All-on-6', 'Immediate loading', '3D planning (CBCT)', 'Guided surgery'] },
      { title: 'Prosthetics', items: ['Crowns & bridges (zirconia, e.max)', 'Removable dentures', 'Implant-supported prosthetics', 'Medit digital scanning', 'Temporary restorations'] },
      { title: 'Therapeutic Dentistry', items: ['Cavity treatment', 'Endodontics (root canals)', 'Teeth whitening', 'Professional hygiene', 'Preventive check-ups'] },
      { title: 'Technology', items: ['Nobel Biocare, Osstem, Dentium', 'Medit 3D scanner', 'Digital planning', 'CAD/CAM crowns', 'Digital impressions'] },
    ],
    langTitle: 'Multilingual practice', langSub: 'Dr Sonin sees patients in five languages',
    ctaTitle: 'Book a consultation', ctaDesc: 'The first consultation is a meeting, examination and honest conversation about your situation. No pressure.', ctaBtn: 'Send a request',
  },
};

// ─────────────────────────────────────────────────────────────
// STORIES PAGE translations (UI chrome only — stories stay in RU)
// ─────────────────────────────────────────────────────────────
export const storiesT: Record<Lang, {
  meta: { title: string; description: string };
  badge: string; title: string; subtitle: string;
  filters: { id: string; label: string }[];
  tagLabels: Record<string, string>;
  ctaTitle: string; ctaDesc: string; ctaWrite: string; ctaCall: string;
  note?: string;
}> = {
  ru: {
    meta: { title: 'Истории пациентов — Sonin Hambaravi', description: 'Реальные истории пациентов клиники Sonin Hambaravi. Из Финляндии, Швеции, Эстонии — с разными ситуациями и разными путями к нам.' },
    badge: 'Реальные люди, реальные ситуации',
    title: 'Истории наших пациентов',
    subtitle: 'Каждый пришёл со своей ситуацией. Найдите себя — и поймите, что решение возможно.',
    filters: [
      { id: 'all', label: 'Все истории' },
      { id: 'abroad', label: 'Приехал из-за рубежа' },
      { id: 'installment', label: 'Лечение в рассрочку' },
      { id: 'full-jaw', label: 'Полное восстановление' },
      { id: 'referral', label: 'По рекомендации' },
      { id: 'elsewhere', label: 'Рассматривал Турцию / Беларусь' },
      { id: 'redo', label: 'Переделали чужую работу' },
      { id: 'trust', label: 'Доверие к доктору' },
    ],
    tagLabels: { abroad: 'Из-за рубежа', installment: 'Рассрочка', 'full-jaw': 'Вся челюсть', referral: 'По рекомендации', elsewhere: 'Сравнивал варианты', redo: 'Переделали', trust: 'Доверие к врачу' },
    ctaTitle: 'Узнали себя?', ctaDesc: 'Запишитесь на консультацию — расскажите свою ситуацию, и мы найдём решение вместе.', ctaWrite: 'Написать нам', ctaCall: 'Позвонить:',
  },
  et: {
    meta: { title: 'Patsientide lood — Sonin Hambaravi', description: 'Sonin Hambaravi kliiniku patsientide tegelikud lood. Soomest, Rootsist, Eestist — erinevate olukordade ja erinevate teedega meie juurde.' },
    badge: 'Päriselu inimesed, päriselu olukorrad',
    title: 'Meie patsientide lood',
    subtitle: 'Igaüks tuli oma olukorraga. Leia end — ja mõista, et lahendus on võimalik.',
    note: 'Patsientide lood on avaldatud vene keeles.',
    filters: [
      { id: 'all', label: 'Kõik lood' },
      { id: 'abroad', label: 'Tuli välismaalt' },
      { id: 'installment', label: 'Järelmaksuga ravi' },
      { id: 'full-jaw', label: 'Täielik taastamine' },
      { id: 'referral', label: 'Soovituse põhjal' },
      { id: 'elsewhere', label: 'Kaalus Türgit / Valgevenet' },
      { id: 'redo', label: 'Parandati teiste tööd' },
      { id: 'trust', label: 'Usaldus arsti vastu' },
    ],
    tagLabels: { abroad: 'Välismaalt', installment: 'Järelmaks', 'full-jaw': 'Kogu lõualuu', referral: 'Soovituse põhjal', elsewhere: 'Võrdles variante', redo: 'Parandati', trust: 'Usaldus arstile' },
    ctaTitle: 'Kas tundsid end ära?', ctaDesc: 'Registreeri konsultatsioonile — räägi oma olukorrast ja leiame lahenduse koos.', ctaWrite: 'Kirjuta meile', ctaCall: 'Helista:',
  },
  fi: {
    meta: { title: 'Potilaiden tarinat — Sonin Hambaravi', description: 'Sonin Hambaravi -klinikan potilaiden oikeat tarinat. Suomesta, Ruotsista, Virosta — eri tilanteista ja eri reiteiltä meille.' },
    badge: 'Oikeat ihmiset, oikeat tilanteet',
    title: 'Potilaidemme tarinat',
    subtitle: 'Jokainen tuli omassa tilanteessaan. Löydä itsesi — ja ymmärrä, että ratkaisu on mahdollinen.',
    note: 'Potilaiden tarinat on julkaistu venäjäksi.',
    filters: [
      { id: 'all', label: 'Kaikki tarinat' },
      { id: 'abroad', label: 'Tuli ulkomailta' },
      { id: 'installment', label: 'Hoito osamaksulla' },
      { id: 'full-jaw', label: 'Täydellinen kunnostus' },
      { id: 'referral', label: 'Suosituksen perusteella' },
      { id: 'elsewhere', label: 'Harkitsi Turkkia / Valko-Venäjää' },
      { id: 'redo', label: 'Korjattiin toisen työ' },
      { id: 'trust', label: 'Luottamus lääkäriin' },
    ],
    tagLabels: { abroad: 'Ulkomailta', installment: 'Osamaksu', 'full-jaw': 'Koko leuka', referral: 'Suosituksesta', elsewhere: 'Vertaili vaihtoehtoja', redo: 'Korjattiin', trust: 'Luottamus' },
    ctaTitle: 'Tunnistitko itsesi?', ctaDesc: 'Varaa konsultaatio — kerro tilanteestasi ja löydämme ratkaisun yhdessä.', ctaWrite: 'Kirjoita meille', ctaCall: 'Soita:',
  },
  en: {
    meta: { title: 'Patient Stories — Sonin Hambaravi', description: 'Real patient stories from Sonin Hambaravi clinic. From Finland, Sweden, Estonia — different situations, different paths to us.' },
    badge: 'Real people, real situations',
    title: 'Our patients\' stories',
    subtitle: 'Each patient came with their own situation. Find yourself — and understand that a solution is possible.',
    note: 'Patient stories are published in Russian.',
    filters: [
      { id: 'all', label: 'All stories' },
      { id: 'abroad', label: 'Came from abroad' },
      { id: 'installment', label: 'Instalment payment' },
      { id: 'full-jaw', label: 'Full-mouth restoration' },
      { id: 'referral', label: 'By referral' },
      { id: 'elsewhere', label: 'Considered Turkey / Belarus' },
      { id: 'redo', label: 'Fixed someone else\'s work' },
      { id: 'trust', label: 'Trust in the doctor' },
    ],
    tagLabels: { abroad: 'From abroad', installment: 'Instalment', 'full-jaw': 'Full jaw', referral: 'By referral', elsewhere: 'Compared options', redo: 'Fixed', trust: 'Trust' },
    ctaTitle: 'Did you recognise yourself?', ctaDesc: 'Book a consultation — tell us your situation and we\'ll find a solution together.', ctaWrite: 'Write to us', ctaCall: 'Call us:',
  },
};
