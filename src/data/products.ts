import { StaticImageData } from "next/image";

// App icons
import chessmacnerIcon from "@/assets/icons/ayewar-chessmacner-icon.png";
import dallakIcon from "@/assets/icons/ayewar-dallak-icon.png";
import dallakPartnersIcon from "@/assets/icons/ayewar-dallak-partners-icon.png";
import raidersIcon from "@/assets/icons/ayewar-raiders-icon.png";
import studentsIcon from "@/assets/icons/ayewar-students-icon.png";
import zidobidIcon from "@/assets/icons/ayewar-zidobid-icon.png";

// Chessmacner mockups (9)
import chessmacner1 from "@/assets/mockup/chessmacner/mockup-1.png";
import chessmacner2 from "@/assets/mockup/chessmacner/mockup-2.png";
import chessmacner3 from "@/assets/mockup/chessmacner/mockup-3.png";
import chessmacner4 from "@/assets/mockup/chessmacner/mockup-4.png";
import chessmacner5 from "@/assets/mockup/chessmacner/mockup-5.png";
import chessmacner6 from "@/assets/mockup/chessmacner/mockup-6.png";
import chessmacner7 from "@/assets/mockup/chessmacner/mockup-7.png";
import chessmacner8 from "@/assets/mockup/chessmacner/mockup-8.png";
import chessmacner9 from "@/assets/mockup/chessmacner/mockup-9.png";

// Dallak mockups (9)
import dallak1 from "@/assets/mockup/dallak/mockup-1.png";
import dallak2 from "@/assets/mockup/dallak/mockup-2.png";
import dallak3 from "@/assets/mockup/dallak/mockup-3.png";
import dallak4 from "@/assets/mockup/dallak/mockup-4.png";
import dallak5 from "@/assets/mockup/dallak/mockup-5.png";
import dallak6 from "@/assets/mockup/dallak/mockup-6.png";
import dallak7 from "@/assets/mockup/dallak/mockup-7.png";
import dallak8 from "@/assets/mockup/dallak/mockup-8.png";
import dallak9 from "@/assets/mockup/dallak/mockup-9.png";

// Dallak Partners mockups (7)
import dallakPartners1 from "@/assets/mockup/dallak-partners/mockup-1.png";
import dallakPartners2 from "@/assets/mockup/dallak-partners/mockup-2.png";
import dallakPartners3 from "@/assets/mockup/dallak-partners/mockup-3.png";
import dallakPartners4 from "@/assets/mockup/dallak-partners/mockup-4.png";
import dallakPartners5 from "@/assets/mockup/dallak-partners/mockup-5.png";
import dallakPartners6 from "@/assets/mockup/dallak-partners/mockup-6.png";
import dallakPartners7 from "@/assets/mockup/dallak-partners/mockup-7.png";

// Raiders mockups (7)
import raiders1 from "@/assets/mockup/raiders/mockup-1.png";
import raiders2 from "@/assets/mockup/raiders/mockup-2.png";
import raiders3 from "@/assets/mockup/raiders/mockup-3.png";
import raiders4 from "@/assets/mockup/raiders/mockup-4.png";
import raiders5 from "@/assets/mockup/raiders/mockup-5.png";
import raiders6 from "@/assets/mockup/raiders/mockup-6.png";
import raiders7 from "@/assets/mockup/raiders/mockup-7.png";

// Students mockups (6)
import students1 from "@/assets/mockup/students/mockup-1.png";
import students2 from "@/assets/mockup/students/mockup-2.png";
import students3 from "@/assets/mockup/students/mockup-3.png";
import students4 from "@/assets/mockup/students/mockup-4.png";
import students5 from "@/assets/mockup/students/mockup-5.png";
import students6 from "@/assets/mockup/students/mockup-6.png";

// Zidobid mockups (7)
import zidobid1 from "@/assets/mockup/zidobid/mockup-1.png";
import zidobid2 from "@/assets/mockup/zidobid/mockup-2.png";
import zidobid3 from "@/assets/mockup/zidobid/mockup-3.png";
import zidobid4 from "@/assets/mockup/zidobid/mockup-4.png";
import zidobid5 from "@/assets/mockup/zidobid/mockup-5.png";
import zidobid6 from "@/assets/mockup/zidobid/mockup-6.png";
import zidobid7 from "@/assets/mockup/zidobid/mockup-7.png";

export interface Product {
  slug: string;
  name: string;
  nameKu: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  fullDescription: string;
  mockupColor: string;
  icon: StaticImageData;
  mockups: StaticImageData[];
  features: { title: string; description: string }[];
  services: string[];
}

export const products: Product[] = [
  {
    slug: "chessmancer",
    name: "Ayewar Chessmancer",
    nameKu: "ئەیوار Chessmancer",
    category: "پلاتفۆرمی فێربوون و ڕاهێنانی شەتڕەنج",
    badge: "AI & Tactics Engine",
    tagline: "ڕاهێنانی زیرەکی شەتڕەنج و شیکاری پۆزیشن بە ئەلگۆریتمی پێشکەوتوو",
    icon: chessmacnerIcon,
    mockups: [
      chessmacner1,
      chessmacner2,
      chessmacner3,
      chessmacner4,
      chessmacner5,
      chessmacner6,
      chessmacner7,
      chessmacner8,
      chessmacner9,
    ],
    description:
      "فێربوونی ستراتیژی شەتڕەنج لەگەڵ پلاتفۆرمی فێربوونی گشتگیرمان. Chessmancer تاکتیکی مەشق، شیکردنەوەی پۆزیشن، و سیستەمی هەڵسەنگاندنی ELO ی پێشکەوتوو لەخۆ دەگرێت بۆ یارمەتیدانی یاریزانانی هەموو ئاستەکان بۆ باشترکردنی یارییان.",
    fullDescription:
      "ئەیوار Chessmancer پلاتفۆرمێکی تەواو پێشکەوتووی شەتڕەنجە کە تێیدا یاریزان دەتوانێت تاکتیکە ئاڵۆزەکان مەشق بکات، پۆزیشنە یارییەکان بە بزوێنەری شەتڕەنج شیکار بکات، و لەگەڵ سیستەمی فەرمی ELO بەردەوام ئاستی خۆی بەرز بکاتەوە. ئەپەکە خاوەنی مۆدی ئۆنلاین و ئۆفلاینە و بۆ ئاستی سەرەتایی تا پیشەگەر دیزاین کراوە.",
    mockupColor: "#2d9bf0",
    features: [
      {
        title: "ئاسان لە بەکارهێنان",
        description: "ڕووکاری ئەپلیکەیشنەکەمان بۆ بەکارهێنانی گشتگیر دیزاین کراوە",
      },
      {
        title: "دەستگەیشتنی خێرا",
        description: "بگە بە ناوەڕۆکی دڵخوازت تەنها بە چەند کلیکێک",
      },
      {
        title: "ڕوون و ئاشکرا",
        description: "بەبێ هیچ کرێیەکی شاراوە. بەبێ کرێی کردنەوەی حساب. ڕوونی تەواو",
      },
      {
        title: "بەهێز",
        description: "شەتڕەنجەکەت بەڕێوەببە لە مۆبایلەکەتەوە. ئۆنلاین و ئۆفلاین یاری بکە",
      },
    ],
    services: ["دیزاینی UI/UX و پرۆتۆتایپ", "ئەندازیاری بزوێنەر و ژیری دەستکرد", "پەرەپێدانی تەواوەتی بەرهەم", "تاقیکردنەوە و دڵنیایی جۆری"],
  },
  {
    slug: "dallak",
    name: "Dallak",
    nameKu: "دەللاک (Dallak)",
    category: "پلاتفۆرمی مۆدێرن بۆ حجزکردنی سەرتاشخانە و ساڵۆنەکان",
    badge: "Consumer Luxury Mobile",
    tagline: "ئەزموونێکی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاش و حجزکردنی نۆرە",
    icon: dallakIcon,
    mockups: [
      dallak1,
      dallak2,
      dallak3,
      dallak4,
      dallak5,
      dallak6,
      dallak7,
      dallak8,
      dallak9,
    ],
    description:
      "ئەپلیکەیشنی تایبەتی کڕیاران بە دیزاینی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاشە پیشەگەرەکان، گەڕان لەناو پۆرتفۆلیۆی ستۆدیۆ، دیاریکردنی خزمەتگوزاری و حجزکردنی ڕاستەوخۆی نۆرە بە کەمترین هەنگاو.",
    fullDescription:
      "دەللاک (Dallak) ئەپڵیکەیشنێکی مۆبایلی ئاست بەرزە کە لەسەر مۆدێلی مۆنۆکرۆمی تاریک و تێگەیشتنی وردی مۆدێرن بنیاد نراوە. کڕیاران دەتوانن لە چوار بەشی سەرەکی (Feed · Discover · Bookings · Profile) باشترین سەرتاشەکانی دەوروبەریان بدۆزنەوە، وێنە و ڤیدیۆی کارەکانیان ببینن، خشتەی کاتژمێری بەردەست هەڵبژێرن و بلیتی دیجیتالی خۆیان لە ڕێگەی QR وەربگرن.",
    mockupColor: "#E5A93C",
    features: [
      {
        title: "دۆزینەوەی سەرتاشە پیشەگەرەکان",
        description: "گەڕان بەپێی شوێن، پلەبەندی کڕیاران، و شێوازی تاشین",
      },
      {
        title: "سیستەمی حجزکردنی ڕاستەوخۆ",
        description: "دیاریکردنی خزمەتگوزاری و کاتژمێری گونجاو لە چەند چرکەیەکدا",
      },
      {
        title: "پۆرتفۆلیۆ و ڤیدیۆی ستۆدیۆ",
        description: "بینینی نموونەی کارە نوێکان پێش بڕیاردان",
      },
      {
        title: "ئاگادارکردنەوە و بلیتی QR",
        description: "بەدواداچوونی نۆرە و نۆتیفیکەیشنی کاتی هاتنی کاتژمێر",
      },
    ],
    services: ["ئەندازیاری ئەپی مۆبایل بۆ iOS و Android", "دیزاینی ناسنامەی براند و ڕووکار", "سیستەمی نۆتیفیکەیشنی دەستبەجێ", "تەلارسازی داتابەیس و خزمەتگوزارییەکان"],
  },
  {
    slug: "dallak-partners",
    name: "Dallak Partners",
    nameKu: "دەللاک هاوبەشان (Dallak Partners)",
    category: "پلاتفۆرمی بەڕێوەبردنی سەرتاشخانە و ستۆدیۆکانی جوانکاری",
    badge: "Business CRM & Studio",
    tagline: "سیستەمی بەڕێوەبردنی کڕیاران، خشتەی کار و دارایی بۆ سەرتاشەکان",
    icon: dallakPartnersIcon,
    mockups: [
      dallakPartners1,
      dallakPartners2,
      dallakPartners3,
      dallakPartners4,
      dallakPartners5,
      dallakPartners6,
      dallakPartners7,
    ],
    description:
      "ئەپلیکەیشنی تایبەت بە سەرتاش و ستۆدیۆکان بۆ بەڕێوەبردنی نۆرەی کڕیاران، پەسەندکردن یان ڕەتکردنەوەی داواکارییەکان، چاودێری داهاتی ڕۆژانە، و بڵاوکردنەوەی وێنە و ڤیدیۆی مۆدێلەکان لە ستۆدیۆ.",
    fullDescription:
      "دەللاک هاوبەشان (Dallak Partners) باڵی بەڕێوەبردنی پلاتفۆرمی دەللاکە کە ڕێگە بە سەرتاش و خاوەن ساڵۆنەکان دەدات تەواوی بازرگانییەکەیان لە ناو مۆبایلەوە بەڕێوە ببەن. لە پەسەندکردنی داواکاری حجزەوە تا شیکاری دارایی ڕۆژانە و بەڕێوەبردنی پەیوەندی کڕیاران (CRM)، هەموو شتێک بە وردی لەگەڵ دەللاک کڕیار لە یەک کاتدا هاوسەنگ دەمێنێتەوە.",
    mockupColor: "#D97706",
    features: [
      {
        title: "داشبۆردی زیرەکی ڕۆژانە",
        description: "بینینی داهاتی ڕۆژانە، ژمارەی سەرتاشین و خشتەی کاتژمێرەکان",
      },
      {
        title: "بەڕێوەبردنی نۆرە و داواکارییەکان",
        description: "پەسەندکردن یان ڕەتکردنەوەی خێرای کاتی حجزەکان",
      },
      {
        title: "ستۆدیۆی نمایش و کارەکان",
        description: "بڵاوکردنەوەی وێنە و ڤیدیۆی کاری سەرتاشەکان",
      },
      {
        title: "سیستەمی CRM و تۆماری کڕیاران",
        description: "تۆماری بەردەوامی کڕیارەکان و مێژووی سەردانیکردنیان",
      },
    ],
    services: ["ئەپی کارگێڕی مۆبایل بۆ بزنس", "شیکاری داهات و دارایی پێشکەوتوو", "بەڕێوەبردنی CRM و کڕیاران", "هاوئاهەنگی کاتی ڕاستەوخۆ"],
  },
  {
    slug: "raiders",
    name: "Ayewar Raiders",
    nameKu: "ئەیوار Raiders",
    category: "پلاتفۆرمی هات و چۆ بۆ شۆفێری پاسەکانی کوردستان",
    badge: "Fleet Dispatch & GIS",
    tagline: "بەڕێوەبردنی هێڵ و پاس، چاودێری نەخشە و ئابوونەی مانگانەی سەرنشینان",
    icon: raidersIcon,
    mockups: [raiders1, raiders2, raiders3, raiders4, raiders5, raiders6, raiders7],
    description:
      "پلاتفۆرمێکی تایبەت بۆ شۆفێرەکانی پاس لە کوردستان کە دەتوانن بە ئاسانی پلانەکانی بەشداریکردن بەڕێوەبەن، مووشتەریە ئامادەبووەکان بەدواداچوون بکەن، شوێنەکانیان چاودێری بکەن، و ئامارە ڕاستەوخۆکانی گەشتەکانیان ببینن.",
    fullDescription:
      "ئەیوار Raiders پلاتفۆرمێکی پێشکەوتووە بۆ شۆفێرەکانی پاس لە کوردستان. شۆفێرەکان دەتوانن پلانەکانی بەشداریکردنی مووشتەریان بەڕێوەبەن، مووشتەریە ئامادەبووەکان بەدواداچوون بکەن، شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن، و ئامارەکانی گەشتەکانیان ببینن. بەم پلاتفۆرمە، کارەکانی ڕۆژانەی شۆفێرەکان ئاسانتر و کاریگەرتر دەبن.",
    mockupColor: "#7C3AED",
    features: [
      {
        title: "بەڕێوەبردنی پلانەکانی بەشداریکردن",
        description: "پەیوەندی لەگەڵ مووشتەریان بەڕێوەببە و پلانەکانیان بەدواداچوون بکە",
      },
      {
        title: "بەدواداچوونی مووشتەریە ئامادەبووەکان",
        description: "موشتەریەکانی کە لە گەشتەکاندا ئامادە نین بەدواداچوون بکە",
      },
      {
        title: "چاودێری شوێنەکان",
        description: "شوێنی ڕاستەوخۆی پاسەکان ببینە و چاودێری بکە",
      },
      {
        title: "ئامارە ڕاستەوخۆکانی گەشتەکان",
        description: "ئامارەکانی گەشتەکانت لە ڕاستەوخۆدا ببینە و بەڕێوەی ببە",
      },
    ],
    services: ["سیستەمی چاودێری جوگرافی و GPS", "بەڕێوەبردنی بەشداریکردنی سەرنشین", "دیزاین و پرۆتۆتایپی ئەپی شۆفێر", "ئەندازیاری داتای هاتوچۆ"],
  },
  {
    slug: "students",
    name: "Ayewar Students",
    nameKu: "ئەیوار Students",
    category: "پلاتفۆرمی هات و چۆ بۆ مووشتەریەکانی پاسەکانی کوردستان",
    badge: "Passenger Transit App",
    tagline: "بەدواداچوونی ڕاستەوخۆی پاس لەسەر نەخشە و کاتی خەمڵێنراوی گەیشتن",
    icon: studentsIcon,
    mockups: [students1, students2, students3, students4, students5, students6],
    description:
      "لاپەڕەی مووشتەری بۆ پلاتفۆرمی Ayewar Raiders. مووشتەریەکان دەتوانن زانیاری شۆفێرەکانیان ببینن، شوێنەکانیان چاودێری بکەن، ئامارە ڕاستەوخۆکانی گەشتەکان ببینن، و پلانەکانی بەشداریکردنی مانگانە بەڕێوەبەن.",
    fullDescription:
      "ئەیوار Students لاپەڕەی مووشتەری پلاتفۆرمی Ayewar Raiders یە بۆ مووشتەریەکانی پاسەکانی کوردستان. مووشتەریەکان دەتوانن زانیاری شۆفێرەکانیان ببینن، شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن، ئامارەکانی گەشتەکان ببینن، و پلانەکانی بەشداریکردنی مانگانە بەڕێوەبەن. بەم پلاتفۆرمە، گەشتکردن لە کوردستان ئاسانتر و متمانەپێکراوتر دەبێت.",
    mockupColor: "#10B981",
    features: [
      {
        title: "زانیاری شۆفێرەکان",
        description: "زانیاری تەواوی شۆفێرەکەت ببینە و متمانەی پێ بکە",
      },
      {
        title: "چاودێری شوێنەکان",
        description: "شوێنی ڕاستەوخۆی پاسەکەت ببینە و چاودێری بکە",
      },
      {
        title: "ئامارە ڕاستەوخۆکانی گەشتەکان",
        description: "ئامارەکانی گەشتەکانت لە ڕاستەوخۆدا ببینە",
      },
      {
        title: "پەیوەندی لەگەڵ شۆفێرەکان",
        description: "پەیوەندی ڕاستەوخۆ لەگەڵ شۆفێرەکەت بگرە",
      },
    ],
    services: ["ئەپی مۆبایلی سەرنشین بۆ قوتابیان", "سیستەمی ژماردنی کاتی گەیشتن", "دیزاینی ڕووکاری خێرا و سادە", "ئاگادارکردنەوەی جووڵەی پاس"],
  },
  {
    slug: "zidobid",
    name: "Ayewar Zidobid",
    nameKu: "ئەیوار Zidobid",
    category: "ئەپلیکەیشنی مزادەی ڕاستەوخۆ و بازاڕی دیجیتاڵی",
    badge: "Real-Time Auction Engine",
    tagline: "سیستەمی پێشبڕکێی نرخی ڕاستەوخۆ بە کەمترین دواکەوتنی میلیچرکەیی",
    icon: zidobidIcon,
    mockups: [
      zidobid1,
      zidobid2,
      zidobid3,
      zidobid4,
      zidobid5,
      zidobid6,
      zidobid7,
    ],
    description:
      "ئەپلیکەیشنی مزادەی کاتی ڕاستەوخۆ (Live Auction) کە تێیدا فرۆشیار کاڵاکان بە وردەکاری تەواو بڵاو دەکاتەوە و کڕیاران لە میلیچرکەدا پێشبڕکێی نرخ دەکەن بە شەفافیەتی تەواو.",
    fullDescription:
      "ئەیوار Zidobid ئەپلیکەیشنی پێشکەوتووی مزادەی کاتی ڕاستەوخۆیە لە کوردستان. فرۆشیاران کاڵا بەنرخەکانیان دادەنێن و بەشداربووان لە ڕێگەی بزوێنەری کاتی ڕاستەوخۆی خێراوە بەشدار دەبن لە پێشبڕکێی نرخدا. کاتژمێری ژماردنی پێچەوانە، ئاگادارکردنەوەی کەسی پێشەنگ و سیستەمی دڵنیایی مامەڵەکان ئەزموونێکی بێ کێشە دابین دەکەن.",
    mockupColor: "#F43F5E",
    features: [
      {
        title: "بڵاوکردنەوەی کاڵاکان",
        description: "فرۆشیار دەتوانێت کاڵاکانی خۆی بڵاو بکاتەوە بۆ مزادە",
      },
      {
        title: "مزادەی ڕاستەوخۆ",
        description: "بەشداری لە مزادەکاندا لە ڕاستەوخۆدا و بە شێوەیەکی پێشکەوتوو",
      },
      {
        title: "چاودێری بەشداریکردنەکان",
        description: "بینینی بەشداریکردنەکانی تر لە ڕاستەوخۆدا",
      },
      {
        title: "ئاگادارکردنەوەکان",
        description: "ئاگادارکردنەوە لەسەر نوێکاریەکانی مزادەکان",
      },
    ],
    services: ["ئەندازیاری سۆکێتی کاتی ڕاستەوخۆ", "سیستەمی شەفافیەت و پاراستنی مامەڵە", "دیزاینی ئەپڵیکەیشنی مزادە", "خێرایی بەرز بە کەمترین دواکەوتن"],
  },
];
