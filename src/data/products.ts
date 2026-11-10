import { StaticImageData } from "next/image";
import { Locale } from "@/i18n/translations";

// App icons
import ledgerIcon from "@/assets/icons/ledger-icon.png";
import soraghIcon from "@/assets/icons/soragh-icon.png";
import chessmacnerIcon from "@/assets/icons/ayewar-chessmacner-icon.png";
import dallakIcon from "@/assets/icons/ayewar-dallak-icon.png";
import dallakPartnersIcon from "@/assets/icons/ayewar-dallak-partners-icon.png";
import raidersIcon from "@/assets/icons/raiders-symbol.svg";
import studentsIcon from "@/assets/icons/passengers-symbol.svg";
import zidobidIcon from "@/assets/icons/ayewar-zidobid-icon.png";

import ledger1 from "@/assets/mockup/ledger/splash-1.jpg";
import ledger2 from "@/assets/mockup/ledger/home-2.jpg";
import ledger3 from "@/assets/mockup/ledger/excuse-3.jpg";
import ledger4 from "@/assets/mockup/ledger/session-4.jpg";
import ledger5 from "@/assets/mockup/ledger/detail-5.jpg";

import soragh1 from "@/assets/mockup/soragh/home-1.png";
import soragh2 from "@/assets/mockup/soragh/map-2.png";
import soragh3 from "@/assets/mockup/soragh/profile-3.png";
import soragh4 from "@/assets/mockup/soragh/search-4.png";
import soragh5 from "@/assets/mockup/soragh/form-5.png";
import soragh6 from "@/assets/mockup/soragh/scan-6.png";

import chessmancer1 from "@/assets/mockup/chessmancer/screen-1.jpeg";
import chessmancer2 from "@/assets/mockup/chessmancer/screen-2.jpeg";
import chessmancer3 from "@/assets/mockup/chessmancer/screen-3.jpeg";
import chessmancer4 from "@/assets/mockup/chessmancer/screen-4.jpeg";
import chessmancer5 from "@/assets/mockup/chessmancer/screen-5.jpeg";
import chessmancer6 from "@/assets/mockup/chessmancer/screen-6.jpeg";
import chessmancer7 from "@/assets/mockup/chessmancer/screen-7.jpeg";
import chessmancer8 from "@/assets/mockup/chessmancer/screen-8.jpeg";
import chessmancer9 from "@/assets/mockup/chessmancer/screen-9.jpeg";
import chessmancer10 from "@/assets/mockup/chessmancer/screen-10.jpeg";
import chessmancer11 from "@/assets/mockup/chessmancer/screen-11.jpeg";
import chessmancer12 from "@/assets/mockup/chessmancer/screen-12.jpeg";

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
import raiders8 from "@/assets/mockup/raiders/mockup-8.png";

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

export interface ProductContent {
  name: string;
  nameSub?: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  fullDescription: string;
  features: { title: string; description: string }[];
  services: string[];
}

export interface Product {
  slug: string;
  mockupColor: string;
  icon: StaticImageData;
  mockups: StaticImageData[];
  cardMockups?: StaticImageData[];
  translations: Record<Locale, ProductContent>;
  // Convenience properties referencing default ckb
  name: string;
  nameKu: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  fullDescription: string;
  features: { title: string; description: string }[];
  services: string[];
}

export function getProductContent(product: Product, locale: Locale): ProductContent {
  return product.translations[locale] || product.translations.ckb;
}

export const products: Product[] = [
  {
    slug: "chessmancer",
    mockupColor: "#2d9bf0",
    icon: chessmacnerIcon,
    mockups: [chessmancer1, chessmancer2, chessmancer12, chessmancer3, chessmancer4, chessmancer5, chessmancer6, chessmancer7, chessmancer8, chessmancer9, chessmancer10, chessmancer11],
    cardMockups: [chessmancer1, chessmancer2],
    name: "Chessmancer",
    nameKu: "Chessmancer",
    category: "پلاتفۆرمی فێربوون و ڕاهێنانی شەتڕەنج",
    badge: "AI & Tactics Engine",
    tagline: "ڕاهێنانی زیرەکی شەتڕەنج و شیکاری پۆزیشن بە ئەلگۆریتمی پێشکەوتوو",
    description:
      "فێربوونی ستراتیژی شەتڕەنج لەگەڵ پلاتفۆرمی فێربوونی گشتگیرمان. Chessmancer تاکتیکی مەشق، شیکردنەوەی پۆزیشن، و سیستەمی هەڵسەنگاندنی ELO ی پێشکەوتوو لەخۆ دەگرێت بۆ یارمەتیدانی یاریزانانی هەموو ئاستەکان بۆ باشترکردنی یارییان.",
    fullDescription:
      "Chessmancer پلاتفۆرمێکی تەواو پێشکەوتووی شەتڕەنجە کە تێیدا یاریزان دەتوانێت تاکتیکە ئاڵۆزەکان مەشق بکات، پۆزیشنە یارییەکان بە بزوێنەری شەتڕەنج شیکار بکات، و لەگەڵ سیستەمی هەڵسەنگاندنی ELO بەردەوام ئاستی خۆی بەرز بکاتەوە. ئەپەکە خاوەنی مۆدی ئۆنلاین و ئۆفلاینە و بۆ ئاستی سەرەتایی تا پیشەگەر دیزاین کراوە.",
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
        description: "بینینی ئاست و پێشکەوتنی یاریزان لە ناو ئەپەکە",
      },
      {
        title: "بەهێز",
        description: "شەتڕەنجەکەت بەڕێوەببە لە مۆبایلەکەتەوە. ئۆنلاین و ئۆفلاین یاری بکە",
      },
    ],
    services: ["دیزاینی UI/UX و پرۆتۆتایپ", "ئەندازیاری بزوێنەر و ژیری دەستکرد", "پەرەپێدانی تەواوەتی بەرهەم", "تاقیکردنەوە و دڵنیایی جۆری"],
    translations: {
      ckb: {
        name: "Chessmancer",
        nameSub: "Chessmancer",
        category: "پلاتفۆرمی فێربوون و ڕاهێنانی شەتڕەنج",
        badge: "AI & Tactics Engine",
        tagline: "ڕاهێنانی زیرەکی شەتڕەنج و شیکاری پۆزیشن بە ئەلگۆریتمی پێشکەوتوو",
        description:
          "فێربوونی ستراتیژی شەتڕەنج لەگەڵ پلاتفۆرمی فێربوونی گشتگیرمان. Chessmancer تاکتیکی مەشق، شیکردنەوەی پۆزیشن، و سیستەمی هەڵسەنگاندنی ELO ی پێشکەوتوو لەخۆ دەگرێت.",
        fullDescription:
          "Chessmancer پلاتفۆرمێکی تەواو پێشکەوتووی شەتڕەنجە کە تێیدا یاریزان دەتوانێت تاکتیکە ئاڵۆزەکان مەشق بکات، پۆزیشنە یارییەکان بە بزوێنەری شەتڕەنج شیکار بکات، و لەگەڵ سیستەمی هەڵسەنگاندنی ELO بەردەوام ئاستی خۆی بەرز بکاتەوە.",
        features: [
          { title: "ئاسان لە بەکارهێنان", description: "ڕووکاری ئەپلیکەیشنەکەمان بۆ بەکارهێنانی گشتگیر دیزاین کراوە" },
          { title: "دەستگەیشتنی خێرا", description: "بگە بە ناوەڕۆکی دڵخوازت تەنها بە چەند کلیکێک" },
          { title: "ڕوون و ئاشکرا", description: "بینینی ئاست و پێشکەوتنی یاریزان لە ناو ئەپەکە" },
          { title: "بەهێز و گشتگیر", description: "شەتڕەنجەکەت بەڕێوەببە، ئۆنلاین و ئۆفلاین یاری بکە" },
        ],
        services: ["دیزاینی UI/UX و پرۆتۆتایپ", "ئەندازیاری بزوێنەر و ژیری دەستکرد", "پەرەپێدانی تەواوەتی بەرهەم", "تاقیکردنەوە و دڵنیایی جۆری"],
      },
      ar: {
        name: "Chessmancer",
        nameSub: "منصة تدريب وتحليل الشطرنج",
        category: "منصة تدريب وتحليل الشطرنج بالذكاء الاصطناعي",
        badge: "محرك التكتيك والذكاء الاصطناعي",
        tagline: "تدريب ذكي على استراتيجيات الشطرنج وتحليل دقيق للوضعيات",
        description:
          "تعلّم واحتراف تكتيكات الشطرنج مع منصتنا الشاملة. يوفر Chessmancer تمارين تكتيكية وتحليلاً للوضعيات ونظام تصنيف ELO متقدم لمساعدة اللاعبين من كافة المستويات.",
        fullDescription:
          "تطبيق Chessmancer منصة متطورة للشطرنج تتيح للاعبين حل المسائل التكتيكية المعقدة، وتحليل رقعة اللعب بواسطة محركات الشطرنج الآنية، وتطوير تصنيفهم عبر نظام تصنيف ELO. يدعم اللعب المباشر وغير المتصل، ومصمم للمبتدئين والمحترفين على حد سواء.",
        features: [
          { title: "سهولة الاستخدام", description: "واجهة تفاعلية مصممة لتجربة لعب سلسة ومريحة لجميع اللاعبين." },
          { title: "تحليل تكتيكي فوري", description: "فحص تحركات الرقعة وتحليل الوضعيات والاحتمالات." },
          { title: "شفافية وتصنيف دقيق", description: "تتبع دقيق لمستوى التقدم وتصنيف ELO داخل التطبيق." },
          { title: "مرونة عالية في اللعب", description: "إمكانية اللعب والتدريب أونلاين وأوفلاين من الهاتف مباشرة." },
        ],
        services: ["تصميم واجهات UI/UX", "هندسة المحركات والذكاء الاصطناعي", "التطوير البرمجي الشامل", "اختبارات الأداء والجودة"],
      },
      en: {
        name: "Chessmancer",
        nameSub: "Chess Learning & AI Tactics Platform",
        category: "Chess Learning & Tactics Platform",
        badge: "AI & Tactics Engine",
        tagline: "Intelligent chess training, position analysis, and automated evaluation",
        description:
          "Learn and master chess strategy with our comprehensive training platform. Chessmancer features tactical puzzles, position analysis, and an advanced ELO rating system to help players at every level.",
        fullDescription:
          "Chessmancer combines tactical puzzles, board analysis, and player progression in a mobile chess experience.",
        features: [
          { title: "Intuitive Interface", description: "Designed for clean focus and seamless board interaction." },
          { title: "Tactical analysis", description: "Analyze board positions and evaluate possible moves." },
          { title: "Transparent Progression", description: "Fair rating, structured puzzles, and clear progress tracking." },
          { title: "Mobile Mastery", description: "Play and study anywhere with full offline and online support." },
        ],
        services: ["UI/UX & Prototyping", "Engine & AI Engineering", "Full-Stack Development", "QA & Engine Benchmarking"],
      },
    },
  },
  {
    slug: "dallak",
    mockupColor: "#E5A93C",
    icon: dallakIcon,
    mockups: [
      dallak5,
      dallak1,
      dallak2,
      dallak3,
      dallak4,
      dallak6,
      dallak7,
      dallak8,
      dallak9,
    ],
    name: "Dallak",
    nameKu: "دەللاک (Dallak)",
    category: "پلاتفۆرمی مۆدێرن بۆ حجزکردنی سەرتاشخانە و ساڵۆنەکان",
    badge: "Consumer Luxury Mobile",
    tagline: "ئەزموونێکی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاش و حجزکردنی نۆرە",
    description:
      "ئەپلیکەیشنی تایبەتی کڕیاران بە دیزاینی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاشە پیشەگەرەکان، گەڕان لەناو پۆرتفۆلیۆی ستۆدیۆ، دیاریکردنی خزمەتگوزاری و حجزکردنی ڕاستەوخۆی نۆرە بە کەمترین هەنگاو.",
    fullDescription:
      "دەللاک (Dallak) ئەپڵیکەیشنێکی مۆبایلی ئاست بەرزە کە لەسەر مۆدێلی مۆنۆکرۆمی تاریک و تێگەیشتنی وردی مۆدێرن بنیاد نراوە. کڕیاران دەتوانن لە چوار بەشی سەرەکی (Feed · Discover · Bookings · Profile) باشترین سەرتاشەکانی دەوروبەریان بدۆزنەوە، وێنە و ڤیدیۆی کارەکانیان ببینن، خشتەی کاتژمێری بەردەست هەڵبژێرن و بلیتی دیجیتالی خۆیان لە ڕێگەی QR وەربگرن.",
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
    translations: {
      ckb: {
        name: "دەللاک (Dallak)",
        nameSub: "Dallak Client",
        category: "پلاتفۆرمی مۆدێرن بۆ حجزکردنی سەرتاشخانە و ساڵۆنەکان",
        badge: "Consumer Luxury Mobile",
        tagline: "ئەزموونێکی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاش و حجزکردنی نۆرە",
        description:
          "ئەپلیکەیشنی تایبەتی کڕیاران بە دیزاینی مۆنۆکرۆمی لوکس بۆ دۆزینەوەی سەرتاشە پیشەگەرەکان، گەڕان لەناو پۆرتفۆلیۆی ستۆدیۆ، دیاریکردنی خزمەتگوزاری و حجزکردنی ڕاستەوخۆی نۆرە.",
        fullDescription:
          "دەللاک (Dallak) ئەپڵیکەیشنێکی مۆبایلی ئاست بەرزە کە لەسەر مۆدێلی مۆنۆکرۆمی تاریک بنیاد نراوە. کڕیاران دەتوانن لە چوار بەشی سەرەکی (Feed · Discover · Bookings · Profile) باشترین سەرتاشەکان بدۆزنەوە، وێنە و ڤیدیۆی کارەکان ببینن، و نۆرە دیاری بکەن.",
        features: [
          { title: "دۆزینەوەی سەرتاشە پیشەگەرەکان", description: "گەڕان بەپێی شوێن، پلەبەندی کڕیاران، و شێوازی تاشین" },
          { title: "سیستەمی حجزکردنی ڕاستەوخۆ", description: "دیاریکردنی خزمەتگوزاری و کاتژمێری گونجاو لە چەند چرکەیەکدا" },
          { title: "پۆرتفۆلیۆ و ڤیدیۆی ستۆدیۆ", description: "بینینی نموونەی کارە نوێکان پێش بڕیاردان" },
          { title: "ئاگادارکردنەوە و بلیتی QR", description: "بەدواداچوونی نۆرە و نۆتیفیکەیشنی دەستبەجێ" },
        ],
        services: ["ئەندازیاری ئەپی مۆبایل بۆ iOS و Android", "دیزاینی ناسنامەی براند و ڕووکار", "سیستەمی نۆتیفیکەیشنی دەستبەجێ", "تەلارسازی داتابەیس و خزمەتگوزارییەکان"],
      },
      ar: {
        name: "Dallak",
        nameSub: "تطبيق العملاء لحجز الصالونات",
        category: "منصة حجز الصالونات ومصففي الشعر الفاخرة",
        badge: "تطبيق عملاء فاخر",
        tagline: "تجربة حجز فاخرة بتصميم أنيق لاكتشاف أفضل مصففي الشعر",
        description:
          "تطبيق الجوال المخصص للعملاء بتصميم عصري فاخر لاكتشاف أمهر مصففي الشعر، وتصفح معرض الأعمال، وتحديد الخدمات وحجز المواعيد بخطوات يسيرة.",
        fullDescription:
          "يُقدّم تطبيق Dallak تجربة حجز متكاملة قائمة على الفخامة والبساطة. يتيح للعملاء استكشاف نخبة الحلاقين عبر أربعة أقسام رئيسية (الرئيسية، الاستكشاف، الحجوزات، الملف الشخصي)، والاطلاع على الفيديوهات والصور الحصرية لأعمالهم، واختيار المواعيد وتلقي تذاكر الحجز الرقمية عبر رمز QR.",
        features: [
          { title: "اكتشاف نخبة مصففي الشعر", description: "البحث حسب الموقع الجغرافي، التقييمات، والتخصصات الفنية." },
          { title: "حجز فوري ومباشر", description: "تحديد الخدمات والوقت المناسب في ثوانٍ معدودة." },
          { title: "معرض الصور وفيديوهات الاستوديو", description: "مشاهدة أحدث القصات ونماذج العمل الفعلية قبل تأكيد الحجز." },
          { title: "إشعارات فورية وتذكرة QR", description: "تذكير تلقائي بالمواعيد وتذكرة فحص رقمية سريعة." },
        ],
        services: ["تطوير تطبيقات الجوال لنظامي iOS و Android", "تصميم الهوية البصرية وتجربة المستخدم", "محرك الإشعارات اللحظية", "تطوير واجهات البرمجة والبنية السحابية"],
      },
      en: {
        name: "Dallak",
        nameSub: "Consumer Grooming & Salon App",
        category: "Modern Barber & Salon Booking Platform",
        badge: "Consumer Luxury Mobile",
        tagline: "A luxury monochrome booking experience for elite barbers and salons",
        description:
          "A premium consumer mobile app featuring an obsidian luxury aesthetic for discovering elite barbers, exploring studio portfolios, selecting tailored grooming services, and booking appointments seamlessly.",
        fullDescription:
          "Dallak is a design-led barber booking mobile experience built on an obsidian dark luxury editorial aesthetic. Clients navigate four core spaces (Feed · Discover · Bookings · Profile) to find top stylists, watch portfolio reels and photos, pick available time slots, and receive live digital passes with instant QR access.",
        features: [
          { title: "Discover Elite Barbers", description: "Browse by proximity, customer reviews, and styling specializations." },
          { title: "Instant 4-Step Booking", description: "Select tailored grooming services and book available time slots in seconds." },
          { title: "Studio Portfolio & Video Reels", description: "Preview live work samples, haircuts, and stylist portfolios before booking." },
          { title: "Smart Passes & Live Alerts", description: "Real-time appointment reminders and digital QR check-in passes." },
        ],
        services: ["iOS & Android Mobile Engineering", "Brand Identity & Luxury UI/UX", "Real-Time Push Notification Engine", "Cloud API & Reservation Architecture"],
      },
    },
  },
  {
    slug: "dallak-partners",
    mockupColor: "#D97706",
    icon: dallakPartnersIcon,
    mockups: [
      dallakPartners2,
      dallakPartners1,
      dallakPartners3,
      dallakPartners4,
      dallakPartners5,
      dallakPartners6,
      dallakPartners7,
    ],
    name: "Dallak Partners",
    nameKu: "دەللاک هاوبەشان (Dallak Partners)",
    category: "پلاتفۆرمی بەڕێوەبردنی سەرتاشخانە و ستۆدیۆکانی جوانکاری",
    badge: "Business CRM & Studio",
    tagline: "سیستەمی بەڕێوەبردنی کڕیاران، خشتەی کار و دارایی بۆ سەرتاشەکان",
    description:
      "ئەپلیکەیشنی تایبەت بە سەرتاش و ستۆدیۆکان بۆ بەڕێوەبردنی نۆرەی کڕیاران، پەسەندکردن یان ڕەتکردنەوەی داواکارییەکان، چاودێری داهاتی ڕۆژانە، و بڵاوکردنەوەی وێنە و ڤیدیۆی مۆدێلەکان لە ستۆدیۆ.",
    fullDescription:
      "دەللاک هاوبەشان (Dallak Partners) باڵی بەڕێوەبردنی پلاتفۆرمی دەللاکە کە ڕێگە بە سەرتاش و خاوەن ساڵۆنەکان دەدات تەواوی بازرگانییەکەیان لە ناو مۆبایلەوە بەڕێوە ببەن. لە پەسەندکردنی داواکاری حجزەوە تا شیکاری دارایی ڕۆژانە و بەڕێوەبردنی پەیوەندی کڕیاران (CRM)، هەموو شتێک بە وردی لەگەڵ دەللاک کڕیار لە یەک کاتدا هاوسەنگ دەمێنێتەوە.",
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
    translations: {
      ckb: {
        name: "دەللاک هاوبەشان (Dallak Partners)",
        nameSub: "Dallak Business",
        category: "پلاتفۆرمی بەڕێوەبردنی سەرتاشخانە و ستۆدیۆکانی جوانکاری",
        badge: "Business CRM & Studio",
        tagline: "سیستەمی بەڕێوەبردنی کڕیاران، خشتەی کار و دارایی بۆ سەرتاشەکان",
        description:
          "ئەپلیکەیشنی تایبەت بە سەرتاش و ستۆدیۆکان بۆ بەڕێوەبردنی نۆرەی کڕیاران، پەسەندکردن یان ڕەتکردنەوەی داواکارییەکان، و چاودێری داهاتی ڕۆژانە.",
        fullDescription:
          "دەللاک هاوبەشان (Dallak Partners) باڵی بەڕێوەبردنی پلاتفۆرمی دەللاکە کە ڕێگە بە سەرتاش و خاوەن ساڵۆنەکان دەدات تەواوی بازرگانییەکەیان لە ناو مۆبایلەوە بەڕێوە ببەن.",
        features: [
          { title: "داشبۆردی زیرەکی ڕۆژانە", description: "بینینی داهاتی ڕۆژانە، ژمارەی سەرتاشین و خشتەی کاتژمێرەکان" },
          { title: "بەڕێوەبردنی نۆرە و داواکارییەکان", description: "پەسەندکردن یان ڕەتکردنەوەی خێرای کاتی حجزەکان" },
          { title: "ستۆدیۆی نمایش و کارەکان", description: "بڵاوکردنەوەی وێنە و ڤیدیۆی کاری سەرتاشەکان" },
          { title: "سیستەمی CRM و تۆماری کڕیاران", description: "تۆماری بەردەوامی کڕیارەکان و مێژووی سەردانیکردنیان" },
        ],
        services: ["ئەپی کارگێڕی مۆبایل بۆ بزنس", "شیکاری داهات و دارایی پێشکەوتوو", "بەڕێوەبردنی CRM و کڕیاران", "هاوئاهەنگی کاتی ڕاستەوخۆ"],
      },
      ar: {
        name: "Dallak Partners",
        nameSub: "تطبيق إدارة الصالونات للأعمال",
        category: "منصة إدارة الصالونات وعلاقات العملاء",
        badge: "إدارة الأعمال و CRM",
        tagline: "نظام متكامل لإدارة حجوزات العملاء، الجداول، والإيرادات المالية",
        description:
          "التطبيق المخصص للحلاقين وأصحاب الصالونات لإدارة حجوزات العملاء، وقبول أو رفض الطلبات، ومتابعة الإيرادات اليومية، ونشر أعمال الاستوديو.",
        fullDescription:
          "يُمثّل تطبيق Dallak Partners الجانب الإداري والتشغيلي لمنصة دلاك، حيث يُمكّن مصففي الشعر ومديري الصالونات من قيادة أعمالهم مباشرة من هواتفهم: من مراجعة طلبات الحجز الفورية والتقارير المالية اليومية إلى إدارة قاعدة بيانات العملاء (CRM) ومزامنة المواعيد في الوقت الفعلي.",
        features: [
          { title: "لوحة تحكم ذكية", description: "متابعة لحظية للإيرادات اليومية، عدد الزبائن، ومواعيد العمل." },
          { title: "إدارة فورية للحجوزات", description: "قبول أو تعديل طلبات المواعيد بنقرة واحدة." },
          { title: "استوديو عرض الأعمال", description: "نشر وإدارة الفيديوهات والصور الاحترافية لأحدث الأعمال." },
          { title: "نظام CRM وسجل العملاء", description: "حفظ بيانات العملاء الدائمين وسجل زياراتهم السابقة." },
        ],
        services: ["تطبيق إدارة الأعمال للجوال", "لوحات تحليلات الإيرادات والنمو", "إدارة علاقات العملاء (CRM)", "مزامنة الجداول الزمنية في الوقت الفعلي"],
      },
      en: {
        name: "Dallak Partners",
        nameSub: "Barber Business & Studio Operations",
        category: "Salon Management & Barber CRM Platform",
        badge: "Business CRM & Studio",
        tagline: "Comprehensive client management, scheduling, and revenue analytics for barbers",
        description:
          "A dedicated mobile platform for barbers and studios to approve appointments, monitor daily revenue, organize working schedules, and showcase styling portfolios.",
        fullDescription:
          "Dallak Partners is the business operations engine of the Dallak platform. Barbers and studio managers control their entire business right from their phone: from reviewing booking requests and tracking daily financial analytics to managing client histories (CRM) and publishing portfolio media in real time.",
        features: [
          { title: "Smart Daily Dashboard", description: "Real-time view of daily revenue, appointment volume, and schedule calendar." },
          { title: "One-Tap Booking Approval", description: "Rapidly review, confirm, or reschedule client appointments." },
          { title: "Studio Portfolio Showcase", description: "Upload and manage high-resolution photos and styling video reels." },
          { title: "Client CRM & History", description: "Complete client directory with appointment history and preferences." },
        ],
        services: ["Business Operations Mobile Suite", "Financial & Revenue Analytics", "Client Relationship Management (CRM)", "Real-Time Schedule Synchronization"],
      },
    },
  },
  {
    slug: "raiders",
    mockupColor: "#7C3AED",
    icon: raidersIcon,
    mockups: [raiders1, raiders2, raiders8, raiders4, raiders3, raiders5, raiders6, raiders7],
    cardMockups: [raiders4, raiders5],
    name: "Ayewar Raiders",
    nameKu: "Ayewar Raiders",
    category: "پلاتفۆرمی هات و چۆ بۆ شۆفێری پاسەکانی کوردستان",
    badge: "Fleet Dispatch & GIS",
    tagline: "بەڕێوەبردنی هێڵ و پاس، چاودێری نەخشە و ئابوونەی مانگانەی سەرنشینان",
    description:
      "پلاتفۆرمێکی تایبەت بۆ شۆفێرەکانی پاس لە کوردستان کە دەتوانن بە ئاسانی پلانەکانی بەشداریکردن بەڕێوەبەن، مووشتەریە ئامادەبووەکان بەدواداچوون بکەن، شوێنەکانیان چاودێری بکەن، و ئامارە ڕاستەوخۆکانی گەشتەکانیان ببینن.",
    fullDescription:
      "Ayewar Raiders پلاتفۆرمێکی پێشکەوتووە بۆ شۆفێرەکانی پاس لە کوردستان. شۆفێرەکان دەتوانن پلانەکانی بەشداریکردنی مووشتەریان بەڕێوەبەن، مووشتەریە ئامادەبووەکان بەدواداچوون بکەن، شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن، و ئامارەکانی گەشتەکانیان ببینن. بەم پلاتفۆرمە، کارەکانی ڕۆژانەی شۆفێرەکان ئاسانتر و کاریگەرتر دەبن.",
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
    translations: {
      ckb: {
        name: "Ayewar Raiders",
        nameSub: "Ayewar Raiders Driver",
        category: "پلاتفۆرمی هات و چۆ بۆ شۆفێری پاسەکانی کوردستان",
        badge: "Fleet Dispatch & GIS",
        tagline: "بەڕێوەبردنی هێڵ و پاس، چاودێری نەخشە و ئابوونەی مانگانەی سەرنشینان",
        description:
          "پلاتفۆرمێکی تایبەت بۆ شۆفێرەکانی پاس لە کوردستان کە دەتوانن بە ئاسانی پلانەکانی بەشداریکردن بەڕێوەبەن، مووشتەریە ئامادەبووەکان بەدواداچوون بکەن، و شوێنەکانیان چاودێری بکەن.",
        fullDescription:
          "Ayewar Raiders پلاتفۆرمێکی پێشکەوتووە بۆ شۆفێرەکانی پاس لە کوردستان. شۆفێرەکان دەتوانن پلانەکانی بەشداریکردنی مووشتەریان بەڕێوەبەن، و شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن.",
        features: [
          { title: "بەڕێوەبردنی پلانەکانی بەشداریکردن", description: "پەیوەندی لەگەڵ مووشتەریان بەڕێوەببە و پلانەکانیان بەدواداچوون بکە" },
          { title: "بەدواداچوونی مووشتەریە ئامادەبووەکان", description: "موشتەریەکانی کە لە گەشتەکاندا ئامادە نین بەدواداچوون بکە" },
          { title: "چاودێری شوێنەکان", description: "شوێنی ڕاستەوخۆی پاسەکان ببینە و چاودێری بکە" },
          { title: "ئامارە ڕاستەوخۆکانی گەشتەکان", description: "ئامارەکانی گەشتەکانت لە ڕاستەوخۆدا ببینە و بەڕێوەی ببە" },
        ],
        services: ["سیستەمی چاودێری جوگرافی و GPS", "بەڕێوەبردنی بەشداریکردنی سەرنشین", "دیزاین و پرۆتۆتایپی ئەپی شۆفێر", "ئەندازیاری داتای هاتوچۆ"],
      },
      ar: {
        name: "Ayewar Raiders",
        nameSub: "منصة إدارة أساطيل الحافلات",
        category: "منصة إدارة أساطيل الحافلات والنقل في كوردستان",
        badge: "إدارة الأساطيل والتتبع الجغرافي",
        tagline: "إدارة خطوط الحافلات، التتبع المباشر، واشتراكات الركاب الشهرية",
        description:
          "منصة مخصصة لسائقي الحافلات في كوردستان لإدارة خطط اشتراكات الركاب، وتتبع الحضور والغياب، ومراقبة مسارات الحافلات وإحصائيات الرحلات.",
        fullDescription:
          "منصة Ayewar Raiders هي حل متقدم لإدارة أساطيل الحافلات مصمم لخدمة السائقين وشركات النقل في كوردستان. يتيح للسائقين تنظيم اشتراكات الركاب الشهرية، ومتابعة حضورهم، ومراقبة مسارات الحافلات بدقة عبر نظام تحديد المواقع الجغرافي.",
        features: [
          { title: "إدارة خطط الاشتراكات", description: "تنظيم اشتراكات الركاب ومتابعة الخطط الشهرية بسهولة." },
          { title: "متابعة حضور الركاب", description: "تسجيل الركاب الحاضرين والغائبين في كل رحلة." },
          { title: "تتبع مسار الحافلة المباشر", description: "مراقبة موقع الحافلة الجغرافي وسرعتها في الوقت الفعلي." },
          { title: "إحصائيات الرحلات", description: "بيانات دقيقة عن أوقات الرحلات وكثافة الركاب اليومية." },
        ],
        services: ["أنظمة التتبع الجغرافي و GPS", "إدارة اشتراكات الركاب المتكررة", "تصميم وتطوير تطبيقات السائقين", "هندسة بيانات النقل واللوجستيات"],
      },
      en: {
        name: "Ayewar Raiders",
        nameSub: "Transit Driver Operations",
        category: "Transit Dispatch & Fleet Operations Platform",
        badge: "Fleet Dispatch & GIS",
        tagline: "Bus dispatch management, live GPS tracking, and rider subscriptions in Kurdistan",
        description:
          "A dedicated platform for bus drivers in Kurdistan to easily manage rider subscription plans, monitor attendee riders, track bus locations live, and view trip analytics.",
        fullDescription:
          "Ayewar Raiders is an advanced fleet transit platform tailored for bus operators in Kurdistan. Drivers manage monthly subscription rosters, log boarding riders, monitor real-time bus locations, and review performance stats to streamline daily operations.",
        features: [
          { title: "Subscription Management", description: "Coordinate client subscriptions and monitor recurring plans." },
          { title: "Attendee Tracking", description: "Track missing and boarded passengers on daily routes." },
          { title: "Live Fleet Telemetry", description: "Monitor real-time GPS locations and route deviations." },
          { title: "Trip Insights & Analytics", description: "View live trip status, schedules, and passenger density." },
        ],
        services: ["Geographic Tracking & GIS Telemetry", "Transit Subscription Architecture", "Driver Mobile Application Design", "Logistics & Fleet Data Engineering"],
      },
    },
  },
  {
    slug: "passengers",
    mockupColor: "#10B981",
    icon: studentsIcon,
    mockups: [students1, students2, students3, students4, students5, students6],
    name: "Ayewar Passengers",
    nameKu: "Ayewar Passengers",
    category: "پلاتفۆرمی هات و چۆ بۆ مووشتەریەکانی پاسەکانی کوردستان",
    badge: "Passenger Transit App",
    tagline: "بەدواداچوونی ڕاستەوخۆی پاس لەسەر نەخشە و کاتی خەمڵێنراوی گەیشتن",
    description:
      "لاپەڕەی مووشتەری بۆ پلاتفۆرمی Ayewar Raiders. مووشتەریەکان دەتوانن زانیاری شۆفێرەکانیان ببینن، شوێنەکانیان چاودێری بکەن، ئامارە ڕاستەوخۆکانی گەشتەکان ببینن، و پلانەکانی بەشداریکردنی مانگانە بەڕێوەبەن.",
    fullDescription:
      "Ayewar Passengers لاپەڕەی مووشتەری پلاتفۆرمی Ayewar Raiders یە بۆ مووشتەریەکانی پاسەکانی کوردستان. مووشتەریەکان دەتوانن زانیاری شۆفێرەکانیان ببینن، شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن، ئامارەکانی گەشتەکان ببینن، و پلانەکانی بەشداریکردنی مانگانە بەڕێوەبەن. بەم پلاتفۆرمە، گەشتکردن لە کوردستان ئاسانتر و متمانەپێکراوتر دەبێت.",
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
    translations: {
      ckb: {
        name: "Ayewar Passengers",
        nameSub: "Ayewar Passengers",
        category: "پلاتفۆرمی هات و چۆ بۆ مووشتەریەکانی پاسەکانی کوردستان",
        badge: "Passenger Transit App",
        tagline: "بەدواداچوونی ڕاستەوخۆی پاس لەسەر نەخشە و کاتی خەمڵێنراوی گەیشتن",
        description:
          "لاپەڕەی مووشتەری بۆ پلاتفۆرمی Ayewar Raiders. مووشتەریەکان دەتوانن زانیاری شۆفێرەکانیان ببینن، شوێنەکانیان چاودێری بکەن، و پلانەکانی بەشداریکردنی مانگانە بەڕێوەبەن.",
        fullDescription:
          "Ayewar Passengers لاپەڕەی مووشتەری پلاتفۆرمی Ayewar Raiders یە بۆ مووشتەریەکانی پاسەکانی کوردستان. مووشتەریەکان دەتوانن شوێنەکانیان لە ڕاستەوخۆدا چاودێری بکەن و پەیوەندی بە شۆفێرەوە بکەن.",
        features: [
          { title: "زانیاری شۆفێرەکان", description: "زانیاری تەواوی شۆفێرەکەت ببینە و متمانەی پێ بکە" },
          { title: "چاودێری شوێنەکان", description: "شوێنی ڕاستەوخۆی پاسەکەت ببینە و چاودێری بکە" },
          { title: "ئامارە ڕاستەوخۆکانی گەشتەکان", description: "ئامارەکانی گەشتەکانت لە ڕاستەوخۆدا ببینە" },
          { title: "پەیوەندی لەگەڵ شۆفێرەکان", description: "پەیوەندی ڕاستەوخۆ لەگەڵ شۆفێرەکەت بگرە" },
        ],
        services: ["ئەپی مۆبایلی سەرنشین بۆ قوتابیان", "سیستەمی ژماردنی کاتی گەیشتن", "دیزاینی ڕووکاری خێرا و سادە", "ئاگادارکردنەوەی جووڵەی پاس"],
      },
      ar: {
        name: "Ayewar Passengers",
        nameSub: "تطبيق الطلاب والركاب",
        category: "منصة تتبع الحافلات المدرسية والجامعية للركاب",
        badge: "تطبيق ركاب النقل",
        tagline: "تتبع الحافلة مباشرة على الخريطة ومعرفة الوقت المقدر للوصول",
        description:
          "تطبيق الركاب والطلاب التابع لمنصة Ayewar Raiders. يتيح للركاب معرفة بيانات السائق، وتتبع موقع الحافلة مباشرة، ومعرفة مواعيد الوصول وإدارة بطاقات الاشتراك.",
        fullDescription:
          "تطبيق Ayewar Passengers هو الواجهة المخصصة للطلاب والركاب في كوردستان. يمنحهم راحة البال من خلال متابعة مسار الحافلة على الخريطة في الوقت الفعلي، وحساب موعد الوصول المتوقع (ETA)، والتواصل المباشر مع السائق.",
        features: [
          { title: "بيانات السائق", description: "الاطلاع على معلومات السائق وبيانات الحافلة وأرقام الاتصال." },
          { title: "تتبع الحافلة على الخريطة", description: "مشاهدة موقع الحافلة لحظة بلحظة أثناء توجهها إليك." },
          { title: "وقت الوصول المتوقع (ETA)", description: "تحديثات دقيقة عن الوقت المتبقي لوصول الحافلة." },
          { title: "تواصل مباشر مع السائق", description: "إمكانية الاتصال أو إرسال الرسائل الفورية للسائق." },
        ],
        services: ["تطوير تطبيقات الركاب للجوال", "محرك حساب وقت الوصول الفعلي", "تصميم واجهات سريعة وسهلة", "إشعارات تنبيه اقتراب الحافلة"],
      },
      en: {
        name: "Ayewar Passengers",
        nameSub: "Student & Passenger Transit",
        category: "Passenger Transit & Route Tracking Platform",
        badge: "Passenger Transit App",
        tagline: "Live bus route tracking on map with estimated arrival time (ETA) for riders",
        description:
          "The passenger companion app for the Ayewar Raiders platform. Riders can view driver credentials, track bus positions in real time, see route updates, and manage monthly transit passes.",
        fullDescription:
          "Ayewar Passengers connects students and daily commuters across Kurdistan with their assigned buses. Riders track live bus locations on map, calculate estimated time of arrival, contact their verified driver directly, and maintain their monthly transit passes.",
        features: [
          { title: "Driver profiles", description: "View driver details, bus information, and contact numbers." },
          { title: "Live Map Tracking", description: "Track the incoming bus directly on the map in real time." },
          { title: "Accurate Arrival ETA", description: "Real-time travel updates and computed arrival times." },
          { title: "Direct Driver Connect", description: "Immediate contact via phone call and messaging." },
        ],
        services: ["Commuter Mobile App Development", "Real-Time ETA Computation Engine", "Minimalist Fast UI Design", "Geofence Movement Alerts"],
      },
    },
  },
  {
    slug: "zidobid",
    mockupColor: "#F43F5E",
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
    name: "Ayewar Zidobid",
    nameKu: "ئەیوار Zidobid",
    category: "ئەپلیکەیشنی مزادەی ڕاستەوخۆ و بازاڕی دیجیتاڵی",
    badge: "Real-Time Auction Engine",
    tagline: "سیستەمی پێشبڕکێی نرخی ڕاستەوخۆ بە کەمترین دواکەوتنی میلیچرکەیی",
    description:
      "ئەپلیکەیشنی مزادەی کاتی ڕاستەوخۆ (Live Auction) کە تێیدا فرۆشیار کاڵاکان بە وردەکاری تەواو بڵاو دەکاتەوە و کڕیاران لە میلیچرکەدا پێشبڕکێی نرخ دەکەن بە شەفافیەتی تەواو.",
    fullDescription:
      "ئەیوار Zidobid ئەپلیکەیشنی پێشکەوتووی مزادەی کاتی ڕاستەوخۆیە لە کوردستان. فرۆشیاران کاڵا بەنرخەکانیان دادەنێن و بەشداربووان لە ڕێگەی بزوێنەری کاتی ڕاستەوخۆی خێراوە بەشدار دەبن لە پێشبڕکێی نرخدا. کاتژمێری ژماردنی پێچەوانە، ئاگادارکردنەوەی کەسی پێشەنگ و سیستەمی دڵنیایی مامەڵەکان ئەزموونێکی بێ کێشە دابین دەکەن.",
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
    translations: {
      ckb: {
        name: "ئەیوار Zidobid",
        nameSub: "Ayewar Zidobid Auction",
        category: "ئەپلیکەیشنی مزادەی ڕاستەوخۆ و بازاڕی دیجیتاڵی",
        badge: "Real-Time Auction Engine",
        tagline: "سیستەمی پێشبڕکێی نرخی ڕاستەوخۆ بە کەمترین دواکەوتنی میلیچرکەیی",
        description:
          "ئەپلیکەیشنی مزادەی کاتی ڕاستەوخۆ (Live Auction) کە تێیدا فرۆشیار کاڵاکان بڵاو دەکاتەوە و کڕیاران لە میلیچرکەدا پێشبڕکێی نرخ دەکەن بە شەفافیەتی تەواو.",
        fullDescription:
          "ئەیوار Zidobid ئەپلیکەیشنی پێشکەوتووی مزادەی کاتی ڕاستەوخۆیە لە کوردستان. فرۆشیاران کاڵاکانیان دادەنێن و بەشداربووان لە ڕێگەی بزوێنەری خێراوە بەشدار دەبن لە پێشبڕکێی نرخدا.",
        features: [
          { title: "بڵاوکردنەوەی کاڵاکان", description: "فرۆشیار دەتوانێت کاڵاکانی خۆی بڵاو بکاتەوە بۆ مزادە" },
          { title: "مزادەی ڕاستەوخۆ", description: "بەشداری لە مزادەکاندا لە ڕاستەوخۆدا و بە شێوەیەکی پێشکەوتوو" },
          { title: "چاودێری بەشداریکردنەکان", description: "بینینی بەشداریکردنەکانی تر لە ڕاستەوخۆدا" },
          { title: "ئاگادارکردنەوەکان", description: "ئاگادارکردنەوە لەسەر نوێکاریەکانی مزادەکان" },
        ],
        services: ["ئەندازیاری سۆکێتی کاتی ڕاستەوخۆ", "سیستەمی شەفافیەت و پاراستنی مامەڵە", "دیزاینی ئەپڵیکەیشنی مزادە", "خێرایی بەرز بە کەمترین دواکەوتن"],
      },
      ar: {
        name: "Ayewar Zidobid",
        nameSub: "محرك المزادات الحية الفوري",
        category: "منصة المزادات الحية والأسواق الرقمية",
        badge: "محرك المزادات اللحظي",
        tagline: "محرك مزادات مباشر فائق السرعة بشفافية تامة وإشعارات فورية",
        description:
          "تطبيق متطور للمزادات المباشرة يتيح للبائعين عرض السلع والمنتجات وتنافس المشترين عليها في الوقت الفعلي بأعلى درجات الشفافية والسرعة.",
        fullDescription:
          "يُقدّم تطبيق Ayewar Zidobid تجربة مزادات حية وعصرية في كوردستان لبيع السلع الثمينة والمركبات والإلكترونيات. يعرض البائعون سلعهم مع تقارير الفحص والضمان، ويتنافس المشترون عبر محرك مزادات مباشر مع عدادات تنازلية وتنبيهات فورية للمزايدات الأعلى.",
        features: [
          { title: "مزادات مباشرة لحظية", description: "متابعة المزاد والمشاركة بالمزايدات في الوقت الفعلي." },
          { title: "فحص ومعاينة السلع", description: "معرض صور عالي الدقة، وتاريخ الفحص، وحالة السلعة." },
          { title: "سجل المزايدات الشفاف", description: "عرض سجل المزايدات السابقة وهوية المتنافسين بوضوح." },
          { title: "تنبيهات المزايدة الفورية", description: "إشعار فوري عند قيام أي مستخدم بتقديم عرض أعلى." },
        ],
        services: ["هندسة خوادم الوقت الفعلي (Sockets)", "أنظمة الشفافية وحماية العمليات", "تصميم تطبيقات المزادات للجوال", "تطوير مسارات المزايدة منخفضة التأخير"],
      },
      en: {
        name: "Ayewar Zidobid",
        nameSub: "Live Auction & Marketplace Platform",
        category: "Real-Time Live Auction & Digital Marketplace",
        badge: "Real-Time Auction Engine",
        tagline: "Live bidding, bid history, and outbid alerts",
        description:
          "A live auction mobile platform where sellers showcase items and buyers follow auctions, place bids, and review bid history.",
        fullDescription:
          "Ayewar Zidobid brings live auctions to mobile, with item listings, countdown timers, bid history, and outbid alerts.",
        features: [
          { title: "Real-Time Live Bidding", description: "Follow a live auction and place bids as it progresses." },
          { title: "Item Inspection & Gallery", description: "High-definition media galleries, condition reports, and testing history." },
          { title: "Bid Activity History", description: "Complete transparent bid logs showing competitor bids." },
          { title: "Instant Outbid Alerts", description: "Immediate notifications whenever another bidder places a higher offer." },
        ],
        services: ["Real-Time Socket Engineering", "Auction Transaction Workflows", "Auction Mobile Application Design", "Low-Latency Bidding Pipeline"],
      },
    },
  },
  {
    slug: "ledger",
    mockupColor: "#a44120",
    icon: ledgerIcon,
    mockups: [ledger1, ledger2, ledger3, ledger4, ledger5],
    cardMockups: [ledger1, ledger2],
    name: "Ledger: Train Harder Bro",
    nameKu: "Ledger: Train Harder Bro",
    category: "ڕاهێنانی وەرزشی",
    badge: "Ledger",
    tagline: "ڕاهێنانی وەرزشی",
    description: "ئەپێکی ڕاهێنانی وەرزشی بە یادخستنەوەی بەردەوام و گاڵتەجاڕی لەگەڵت کاتێک ڕاهێنان جێدەهێڵیت.",
    fullDescription: "Ledger ئەپێکی ڕاهێنانی وەرزشییە کە بە یادخستنەوەی بەردەوام، سێڵفی لەگەڵ کەرەستەی وەرزشی و گاڵتەجاڕی کاتێک ڕۆژێک ڕاهێنان جێدەهێڵیت، هانت دەدات بەردەوام بیت.",
    features: [],
    services: [],
    translations: {
      ckb: {
        name: "Ledger: Train Harder Bro",
        category: "ڕاهێنانی وەرزشی",
        badge: "Ledger",
        tagline: "ڕاهێنانی وەرزشی",
        description: "ڕاهێنان بە یادخستنەوەی بەردەوام و کەمێک گاڵتەجاڕی.",
        fullDescription: "Ledger ئەپێکی ڕاهێنانی وەرزشییە کە بە یادخستنەوەی بەردەوام، سێڵفی لەگەڵ کەرەستەی وەرزشی و گاڵتەجاڕی کاتێک ڕۆژێک ڕاهێنان جێدەهێڵیت، هانت دەدات بەردەوام بیت.",
        features: [
          { title: "یادخستنەوەی بەردەوام", description: "ئاگادارکردنەوەکان بە ئاسانی وازت لێناهێنن." },
          { title: "سێڵفی ڕاهێنان", description: "سێڵفییەک لەگەڵ دامبڵ یان کەرەستەی وەرزشی بگرە." },
          { title: "گاڵتەجاڕی", description: "ئەگەر ڕۆژێک ڕاهێنان جێبهێڵیت، ئەپەکە گاڵتەت پێ دەکات." },
        ],
        services: [],
      },
      ar: {
        name: "Ledger: Train Harder Bro",
        category: "تدريب ولياقة",
        badge: "Ledger",
        tagline: "تدريب ولياقة",
        description: "تدريب مع تذكيرات ملحّة وقليل من المزاح.",
        fullDescription: "Ledger تطبيق للياقة يحثك على الاستمرار بتذكيرات ملحّة، وصورة سيلفي مع معدات التمرين، ومزاح على حسابك عندما تفوّت يوماً.",
        features: [
          { title: "تذكيرات ملحّة", description: "إشعارات يصعب تجاهلها لتذكيرك بالتمرين." },
          { title: "سيلفي التمرين", description: "التقط صورة مع الدمبل أو إحدى معدات النادي." },
          { title: "مزاح عند الغياب", description: "يفوّتك يوم تمرين؟ التطبيق سيسخر منك قليلاً." },
        ],
        services: [],
      },
      en: {
        name: "Ledger: Train Harder Bro",
        category: "Fitness and training",
        badge: "Ledger",
        tagline: "Fitness and training",
        description: "Training with persistent reminders and a little teasing.",
        fullDescription: "Ledger keeps you training with persistent, hard-to-dismiss reminders, a selfie with a dumbbell or gym equipment, and a little mockery when you miss a day.",
        features: [
          { title: "Persistent reminders", description: "Notifications that keep nudging you to train." },
          { title: "Workout selfie", description: "Take a selfie with a dumbbell or gym equipment." },
          { title: "Miss a day?", description: "Expect the app to give you a hard time." },
        ],
        services: [],
      },
    },
  },
  {
    slug: "soragh",
    mockupColor: "#ff7520",
    icon: soraghIcon,
    mockups: [soragh1, soragh2, soragh3, soragh4, soragh5, soragh6],
    cardMockups: [soragh1, soragh2],
    name: "Soragh",
    nameKu: "سۆراغ",
    category: "دۆزینەوەی شتە ونبووەکان",
    badge: "",
    tagline: "",
    description: "ئەپێک بۆ گەڕان بەدوای شتە ونبووەکان و بڵاوکردنەوەی شتی دۆزراوە.",
    fullDescription: "سۆراغ ئەپێکە بۆ بڵاوکردنەوە و گەڕان بەدوای شتە ونبووەکان، و یارمەتیدانی ئەوانەی شتێکیان دۆزیوەتەوە بۆ دۆزینەوەی خاوەنەکەی.",
    features: [],
    services: [],
    translations: {
      ckb: {
        name: "سۆراغ (Soragh)",
        category: "دۆزینەوەی شتە ونبووەکان",
        badge: "سۆراغ",
        tagline: "دۆزینەوەی شتە ونبووەکان",
        description: "بگەڕێ بەدوای شتە ونبووەکان و شتی دۆزراوە بڵاو بکەرەوە.",
        fullDescription: "سۆراغ ئەپێکە بۆ بڵاوکردنەوە و گەڕان بەدوای شتە ونبووەکان، و یارمەتیدانی ئەوانەی شتێکیان دۆزیوەتەوە بۆ دۆزینەوەی خاوەنەکەی.",
        features: [
          { title: "شتی ونبوو", description: "بڵاوکردنەوە و گەڕان بەدوای شتە ونبووەکان." },
          { title: "شتی دۆزراوە", description: "بڵاوکردنەوەی شتی دۆزراوە بۆ یارمەتیدان لە دۆزینەوەی خاوەنەکەی." },
          { title: "گەڕان لە نەخشە", description: "بینینی شتەکان لەسەر نەخشە." },
        ],
        services: [],
      },
      ar: {
        name: "سوراغ (Soragh)",
        category: "المفقودات والمعثورات",
        badge: "سوراغ",
        tagline: "المفقودات والمعثورات",
        description: "ابحث عن المفقودات وانشر ما عثرت عليه.",
        fullDescription: "سوراغ تطبيق لنشر المفقودات والبحث عنها، ولمساعدة من يجد شيئاً على الوصول إلى صاحبه.",
        features: [
          { title: "المفقودات", description: "انشر عن الأشياء المفقودة وابحث عنها." },
          { title: "المعثورات", description: "انشر ما عثرت عليه للمساعدة في إيجاد صاحبه." },
          { title: "الخريطة", description: "استعرض الأشياء على الخريطة." },
        ],
        services: [],
      },
      en: {
        name: "Soragh",
        category: "Lost and found",
        badge: "Soragh",
        tagline: "Lost and found",
        description: "Search for lost items and post items you have found.",
        fullDescription: "Soragh is an app for posting and searching for lost items, and helping people who find something reach its owner.",
        features: [
          { title: "Lost items", description: "Post about and search for lost belongings." },
          { title: "Found items", description: "Post what you have found to help locate its owner." },
          { title: "Map", description: "Explore items on a map." },
        ],
        services: [],
      },
    },
  },
];
