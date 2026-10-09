export type Locale = "ckb" | "ar" | "en";

export interface Translations {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    githubLabel: string;
  };
  hero: {
    title: string;
    description: string;
    highlights: {
      apps: { title: string; subtitle: string };
      speed: { title: string; subtitle: string };
      infra: { title: string; subtitle: string };
      prod: { title: string; subtitle: string };
    };
  };
  filters: {
    all: string;
    transit: string;
    services: string;
    realtime: string;
  };
  card: {
    readMore: string;
    hdMockups: string;
    viewMockups: string;
  };
  detail: {
    breadcrumbHome: string;
    breadcrumbProducts: string;
    mobileShowcase: string;
    mobileSubtitle: string;
    featuresBadge: string;
    featuresTitle: string;
    servicesBadge: string;
    servicesTitle: string;
    prevProject: string;
    allProjects: string;
    nextProject: string;
  };
  productsPage: {
    badge: string;
    title: string;
    description: string;
  };
  cta: {
    badge: string;
    title: string;
    button: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
  };
  contact: {
    badge: string;
    title: string;
    reason: string;
    selectReason: string;
    reasons: {
      project: string;
      support: string;
      partnership: string;
      other: string;
    };
    name: string;
    namePlaceholder: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  footer: {
    description: string;
    engineerLabel: string;
    engineerName: string;
    productsTitle: string;
    navTitle: string;
    contactTitle: string;
    copyright: string;
    tagline: string;
  };
}

export const translations: Record<Locale, Translations> = {
  ckb: {
    nav: {
      home: "سەرەتا",
      products: "بەرهەمەکان",
      about: "دەربارە",
      contact: "پەیوەندی",
      githubLabel: "گیت‌هەب",
    },
    hero: {
      title: "بەرهەمە داهێنەرانە و پلاتفۆرمە مۆبایلە پێشکەوتووەکان",
      description:
        "کۆمەڵێک ئەپڵیکەیشن و پلاتفۆرمی کارا لە بەرهەمهێناندا (Production) لە بوارەکانی هاتوچۆ و چاودێری پاس، حجزکردنی لوکس، مزادەی کاتی ڕاستەوخۆ، و شیکاری شەتڕەنج بە ژیری دەستکرد. تەواوی پرۆسەی دیزاینی ڕووکار و سیستەمەکان بە شێوازی سەربەخۆ ئەندازیاری کراون.",
      highlights: {
        apps: {
          title: "٦ ئەپی کارای مۆبایل",
          subtitle: "ئەزموونی پێشکەوتووی iOS و Android",
        },
        speed: {
          title: "کاتی ڕاستەوخۆ و خێرا",
          subtitle: "بزوێنەری شەتڕەنج و مزادەی زیندوو",
        },
        infra: {
          title: "ژێرخانی سەربەخۆ",
          subtitle: "سێرڤەر، نەخشە و سیستەمی لۆجستیک",
        },
        prod: {
          title: "ئاستی بەرهەمهێنان",
          subtitle: "ڕاستەقینە لە بازاڕ و لەسەر سێرڤەر",
        },
      },
    },
    filters: {
      all: "هەموو بەرهەمەکان (All)",
      transit: "هاتوچۆ و لۆجستیک (Transit)",
      services: "خزمەتگوزاری و بازرگانی (Services)",
      realtime: "کاتی ڕاستەوخۆ و یاری (Real-Time)",
    },
    card: {
      readMore: "زیاتر بخوێنەرەوە",
      hdMockups: "ڕوونمای HD",
      viewMockups: "زیاتر ببینە",
    },
    detail: {
      breadcrumbHome: "سەرەتا",
      breadcrumbProducts: "بەرهەمەکان",
      mobileShowcase: "ڕوونمای مۆبایل",
      mobileSubtitle: "تەواوی ڕووکارەکان لەسەر ئامێری ڕاستەقینە دیزاین و گەشەپێدراون",
      featuresBadge: "تایبەتمەندییەکان",
      featuresTitle: "تایبەتمەندییە سەرەکییەکان",
      servicesBadge: "بواری کارکردن",
      servicesTitle: "خزمەتگوزاری و ئەندازیاری دابینکراو",
      prevProject: "پڕۆژەی پێشوو",
      allProjects: "هەموو پڕۆژەکان",
      nextProject: "پڕۆژەی دواتر",
    },
    productsPage: {
      badge: "ئیکۆسیستەمی بەرهەمەکان",
      title: "بەرهەم و پلاتفۆرمە مۆبایلەکان",
      description:
        "تەواوی بەرهەمەکان لەسەر بنەمای ئەزموونی ڕاستەقینە و دیزاینی وردی مۆدێرن بەرهەم هێنراون، و لەسەر ئاستی بەرهەمهێنان لە کوردستان کاردەکەن.",
    },
    cta: {
      badge: "هاوکاربە لەگەڵ ئێمە",
      title: "ئامادەیت بۆ باشترکردنی کارەکانت؟",
      button: "پەیوەندیمان پێوە بکە",
    },
    about: {
      badge: "دەربارەمان",
      title: "لە ئەیواردا باوەڕمان بە ئەوەیە کە گەیشتن بە تەواوی توانای داهێنەرانەت پێویستی بە کاری سەخت، دڵسۆزی، و داهێنان هەیە.",
      description:
        "ئەیوار کۆمەڵەیەکی تەکنەلۆجییە کە لە کوردستان کاردەکات و تایبەتمەندە لە دروستکردنی ئەپلیکەیشنی مۆبایل و وێب. ئێمە باوەڕمان بە دروستکردنی بەرهەمانەیە کە کاریگەریی ڕاستەقینەیان لەسەر ژیانی ڕۆژانەی خەڵکی هەبێت.",
    },
    contact: {
      badge: "پەیوەندیمان پێوە بکە",
      title: "پرۆژەیەکت هەیە، پشتگیری پێویستە، یان دەتەوێت زیاتر بزانیت؟ ئێمە لێرەین بۆ یارمەتیدانت.",
      reason: "هۆکاری پەیوەندی",
      selectReason: "جۆری هەڵبژێرە",
      reasons: {
        project: "پرۆژەی نوێ",
        support: "پشتگیری",
        partnership: "هاوکاری",
        other: "هی تر",
      },
      name: "ناوی تەواو",
      namePlaceholder: "ناوت لێرە بنووسە",
      email: "ناونیشانی ئیمەیڵ",
      phone: "ژمارەی تەلەفۆن",
      message: "نامە",
      messagePlaceholder: "نامەکەت لێرە بنووسە...",
      submit: "داواکاری بنێرە",
    },
    footer: {
      description:
        "ئیکۆسیستەمی تەکنەلۆجی ئەیوار — دروستکردن و ئەندازیاریکردنی ئەپڵیکەیشنە مۆبایل و سیستەمە خێراکان بە شێوازی سەربەخۆ.",
      engineerLabel: "ئەندازیار:",
      engineerName: "زێڕەک جەمیل (Zerak Jamil)",
      productsTitle: "بەرهەمەکان (Products)",
      navTitle: "پەڕەکان (Navigation)",
      contactTitle: "پەیوەندی و تۆڕەکان",
      copyright: "© ٢٠٢٦ ئەیوار (Ayewar) — هەموو مافەکان پارێزراون.",
      tagline: "Crafted with precision & care by Zerak Jamil",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      about: "من نحن",
      contact: "اتصل بنا",
      githubLabel: "جيت هاب",
    },
    hero: {
      title: "منتجات مبتكرة ومنصات جوال متطورة",
      description:
        "منظومة إنتاجية متكاملة من تطبيقات ومنصات الجوال في مجالات النقل، والحجوزات الفاخرة، والمزادات المباشرة، وتحليل الشطرنج بالذكاء الاصطناعي. هندسة مستقلة وتصميم شامل وبنية سحابية متقدمة.",
      highlights: {
        apps: {
          title: "٦ تطبيقات جوال نشطة",
          subtitle: "تجربة متطورة على أنظمة iOS و Android",
        },
        speed: {
          title: "سرعة فائقة وفي الوقت الفعلي",
          subtitle: "محرك شطرنج فوري ومزادات حية بدون تأخير",
        },
        infra: {
          title: "بنية تحتية مستقلة",
          subtitle: "خوادم، خرائط، وأنظمة لوجستية مستقلة",
        },
        prod: {
          title: "جاهزية إنتاجية كاملة",
          subtitle: "تعمل فعلياً في السوق وعلى خوادم خاصة",
        },
      },
    },
    filters: {
      all: "جميع المنتجات (All)",
      transit: "النقل واللوجستيات (Transit)",
      services: "الخدمات والأعمال (Services)",
      realtime: "الوقت الفعلي والألعاب (Real-Time)",
    },
    card: {
      readMore: "اقرأ المزيد",
      hdMockups: "واجهات عالية الدقة",
      viewMockups: "استكشف الواجهات",
    },
    detail: {
      breadcrumbHome: "الرئيسية",
      breadcrumbProducts: "المنتجات",
      mobileShowcase: "معاينة واجهات الجوال",
      mobileSubtitle: "كافة الواجهات مصممة ومطورة ومجربة على أجهزة فعلية",
      featuresBadge: "الميزات والقدرات",
      featuresTitle: "الميزات الأساسية للمنصة",
      servicesBadge: "نطاق العمل",
      servicesTitle: "المخرجات الهندسية والخدمات",
      prevProject: "المشروع السابق",
      allProjects: "كافة المشاريع",
      nextProject: "المشروع التالي",
    },
    productsPage: {
      badge: "منظومة المنتجات",
      title: "المنتجات ومنصات الجوال",
      description:
        "تم بناء وتطوير كافة المنتجات وفق أحدث معايير تجربة المستخدم والأنظمة الموثوقة، وتعمل بكامل طاقتها الإنتاجية.",
    },
    cta: {
      badge: "شاركنا النجاح",
      title: "هل أنت مستعد لتطوير حلولك الرقمية وتوسيع أعمالك؟",
      button: "تواصل معنا اليوم",
    },
    about: {
      badge: "من نحن",
      title: "نؤمن في آيوار بأن بلوغ التميز التقني يتطلب شغفاً، وعملاً دؤوباً، وابتكاراً مستمراً.",
      description:
        "آيوار مؤسسة تقنية رائدة متخصصة في هندسة وتطوير تطبيقات الجوال والمنصات السحابية المتقدمة، ونهدف إلى بناء منتجات تترك أثراً حقيقياً وملموساً في حياة المستخدمين اليومية.",
    },
    contact: {
      badge: "تواصل معنا",
      title: "هل لديك فكرة مشروع، أو تحتاج إلى استشارة تقنية؟ نحن هنا لمساعدتك.",
      reason: "سبب التواصل",
      selectReason: "اختر الموضوع",
      reasons: {
        project: "مشروع جديد",
        support: "دعم فني",
        partnership: "شراكة استراتيجية",
        other: "موضوع آخر",
      },
      name: "الاسم الكامل",
      namePlaceholder: "اكتب اسمك هنا",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "الرسالة",
      messagePlaceholder: "اكتب رسالتك وتفاصيل استفسارك هنا...",
      submit: "إرسال الرسالة",
    },
    footer: {
      description:
        "منظومة آيوار التقنية — هندسة وتطوير تطبيقات الجوال والأنظمة اللحظية المتقدمة باستقلالية واحترافية.",
      engineerLabel: "المهندس المسؤول:",
      engineerName: "زێڕەک جەمیل (Zerak Jamil)",
      productsTitle: "المنتجات (Products)",
      navTitle: "روابط سريعة (Navigation)",
      contactTitle: "التواصل والشبكات",
      copyright: "© ٢٠٢٦ آيوار (Ayewar) — جميع الحقوق محفوظة.",
      tagline: "تمت الهندسة والتصميم بدقة وإتقان بواسطة زێڕەک جەمیل",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      githubLabel: "GitHub",
    },
    hero: {
      title: "Innovative Products & Advanced Mobile Platforms",
      description:
        "A production-grade ecosystem of mobile applications and platforms across transit dispatch, luxury appointments, real-time auctions, and AI-powered chess. Independently engineered with end-to-end design and cloud architecture.",
      highlights: {
        apps: {
          title: "6 Active Mobile Apps",
          subtitle: "Native experiences on iOS & Android",
        },
        speed: {
          title: "Real-Time & Low Latency",
          subtitle: "Real-time chess engine & live auctions",
        },
        infra: {
          title: "Independent Infrastructure",
          subtitle: "Self-hosted servers, GIS & transit logistics",
        },
        prod: {
          title: "Production Deployed",
          subtitle: "Live in market & hosted on private cloud",
        },
      },
    },
    filters: {
      all: "All Products",
      transit: "Transit & Fleet",
      services: "Services & Commerce",
      realtime: "Real-Time & Gaming",
    },
    card: {
      readMore: "Read More",
      hdMockups: "HD Screenshots",
      viewMockups: "Explore Screens",
    },
    detail: {
      breadcrumbHome: "Home",
      breadcrumbProducts: "Products",
      mobileShowcase: "Mobile Showcase",
      mobileSubtitle: "All interfaces designed and verified on physical devices",
      featuresBadge: "Features & Capabilities",
      featuresTitle: "Core Platform Features",
      servicesBadge: "Scope of Work",
      servicesTitle: "Engineering Deliverables",
      prevProject: "Previous Project",
      allProjects: "All Projects",
      nextProject: "Next Project",
    },
    productsPage: {
      badge: "Product Ecosystem",
      title: "Products & Mobile Platforms",
      description:
        "All applications are engineered around genuine user needs, cutting-edge interface design, and reliable production deployment.",
    },
    cta: {
      badge: "Partner With Us",
      title: "Ready to elevate your digital operations?",
      button: "Contact Us Today",
    },
    about: {
      badge: "About Us",
      title: "At Ayewar, we believe reaching the peak of technical innovation demands relentless craft, dedication, and precision.",
      description:
        "Ayewar is a technology group building mobile applications and distributed systems. We focus on shipping products that make a genuine, measurable impact on daily life and business workflows.",
    },
    contact: {
      badge: "Get in Touch",
      title: "Have a project in mind, need technical support, or want to learn more? We are here to help.",
      reason: "Reason for Contact",
      selectReason: "Select a reason",
      reasons: {
        project: "New Project",
        support: "Technical Support",
        partnership: "Partnership",
        other: "Other",
      },
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      phone: "Phone Number",
      message: "Message",
      messagePlaceholder: "Write your message details here...",
      submit: "Send Message",
    },
    footer: {
      description:
        "Ayewar Technology Ecosystem — Engineering autonomous mobile applications, real-time engines, and cloud platforms.",
      engineerLabel: "Lead Engineer:",
      engineerName: "Zerak Jamil",
      productsTitle: "Products",
      navTitle: "Navigation",
      contactTitle: "Contact & Social",
      copyright: "© 2026 Ayewar — All rights reserved.",
      tagline: "Engineered and crafted with precision by Zerak Jamil",
    },
  },
};
