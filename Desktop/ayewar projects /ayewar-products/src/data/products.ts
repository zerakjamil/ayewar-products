import { StaticImageData } from "next/image";

// App icons
import chessifyIcon from "@/assets/icons/ayewar-chessify-icon.png";
import raidersIcon from "@/assets/icons/ayewar-raiders-icon.png";
import studentsIcon from "@/assets/icons/ayewar-students-icon.png";
import zidobidIcon from "@/assets/icons/ayewar-zidobid-icon.png";

// ChessIFY mockups
import chessify1 from "@/assets/mockup/chessify/mockup-1.png";
import chessify2 from "@/assets/mockup/chessify/mockup-2.png";
import chessify3 from "@/assets/mockup/chessify/mockup-3.png";
import chessify4 from "@/assets/mockup/chessify/mockup-4.png";
import chessify5 from "@/assets/mockup/chessify/mockup-5.png";
import chessify6 from "@/assets/mockup/chessify/mockup-6.png";
import chessify7 from "@/assets/mockup/chessify/mockup-7.png";
import chessify8 from "@/assets/mockup/chessify/mockup-8.png";
import chessify9 from "@/assets/mockup/chessify/mockup-9.png";

// Raiders mockups
import raiders1 from "@/assets/mockup/raiders/mockup-1.png";
import raiders2 from "@/assets/mockup/raiders/mockup-2.png";
import raiders3 from "@/assets/mockup/raiders/mockup-3.png";
import raiders4 from "@/assets/mockup/raiders/mockup-4.png";
import raiders5 from "@/assets/mockup/raiders/mockup-5.png";
import raiders6 from "@/assets/mockup/raiders/mockup-6.png";
import raiders7 from "@/assets/mockup/raiders/mockup-7.png";

// Students mockups
import students1 from "@/assets/mockup/students/mockup-1.png";
import students2 from "@/assets/mockup/students/mockup-2.png";
import students3 from "@/assets/mockup/students/mockup-3.png";
import students4 from "@/assets/mockup/students/mockup-4.png";
import students5 from "@/assets/mockup/students/mockup-5.png";
import students6 from "@/assets/mockup/students/mockup-6.png";

export interface Product {
  slug: string;
  name: string;
  nameKu: string;
  category: string;
  description: string;
  fullDescription: string;
  mockupColor: string;
  icon: StaticImageData;
  mockups: StaticImageData[];
  features: { title: string; description: string }[];
  technologies: string[];
  services: string[];
}

export const products: Product[] = [
  {
    slug: "chessify",
    name: "Ayewar ChessIFY",
    nameKu: "ئایەوار ChessIFY",
    category: "پلاتفۆرمی فێربوونی شەتڕەنج",
    icon: chessifyIcon,
    mockups: [chessify1, chessify2, chessify3, chessify4, chessify5, chessify6, chessify7, chessify8, chessify9],
    description:
      "ستراتیژی شەتڕەنج فێربە لەگەڵ پلاتفۆرمی فێربوونی گشتگیرمان. ChessIFY تاکتیکی مەشق، شیکردنەوەی پۆزیشن، و سیستەمی هەڵسەنگاندنی ELO ی پێشکەوتوو لەخۆ دەگرێت بۆ یارمەتیدانی یاریزانانی هەموو ئاستەکان بۆ باشترکردنی یارییان.",
    fullDescription:
      "ئایەوار ChessIFY فێربوونی شەتڕەنج ئاسان، خێرا، و کاریگەر دەکات. حسابێکی تەواو بکەرەوە ڕاستەوخۆ لە مۆبایلەکەت لە ماوەی کەمتر لە ٥ خولەکدا، بە تەواوی بەخۆڕایی. لەگەڵ ئەپلیکەیشنی ChessIFY، دەتوانیت تاکتیکەکانت فێربیت لە هەر کاتێک و لە هەر شوێنێک. مەشق بکە، کێبڕکێ بکە لەگەڵ یاریزانانی تر لە ناوخۆ و جیهاندا، و چاودێری پێشکەوتنەکەت بکە بە ئاسانی.",
    mockupColor: "#2d9bf0",
    features: [
      {
        title: "ئاسان بۆ بەکارهێنان",
        description: "ڕووکاری ئەپلیکەیشنەکەمان بۆ بەکارهێنانی هەموو کەسێک دیزاین کراوە",
      },
      {
        title: "دەستگەیشتنی خێرا",
        description: "بگە بە ناوەڕۆکی دڵخوازت تەنها بە چەند کلیکێک",
      },
      {
        title: "ڕوون و ئاشکرا",
        description: "بێ هیچ کرێیەکی شاراوە. بێ کرێی کردنەوەی حساب. ڕوونی تەواو",
      },
      {
        title: "بەهێز",
        description: "شەتڕەنجەکەت بەڕێوەببە لە مۆبایلەکەتەوە. ئۆنلاین و ئۆفلاین یاری بکە",
      },
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Stockfish"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
  {
    slug: "raiders",
    name: "Ayewar Raiders",
    nameKu: "ئایەوار Raiders",
    category: "یاری تاکتیکی RPG",
    icon: raidersIcon,
    mockups: [raiders1, raiders2, raiders3, raiders4, raiders5, raiders6, raiders7],
    description:
      "بچۆرەوە یاری تاکتیکی RPG ی شەتڕەنجییەوە کە ستراتیژی لەگەڵ ماجەرا دەکات. تیمەکەت دروست بکە، کارەکتەرەکان نوێ بکەرەوە بە تواناکانی تایبەت، و شەڕ بکەرەوە لە کامپەینە بەرنامەکاندا.",
    fullDescription:
      "ئایەوار Raiders یاری تاکتیکی RPG یە کە مێکانیکی شەتڕەنج لەگەڵ ماجەرای RPG تێکەڵ دەکات. تیمێکی بەهێز دروست بکە، کارەکتەرەکانت نوێ بکەرەوە بە تواناکانی تایبەت، و بچۆرەوە کامپەینە ئاستیارەکانەوە. هەموو جوڵەیەک گرنگە و هەموو بڕیارێک کاریگەرییی هەیە لەسەر ئەنجامی شەڕەکان.",
    mockupColor: "#7C3AED",
    features: [
      {
        title: "کارەکتەری تایبەت",
        description: "کارەکتەرە جیاوازەکان بناسە و تیمێکی بەهێز دروست بکە",
      },
      {
        title: "کامپەینی ستراتیژیک",
        description: "بچۆرەوە کامپەینە ئاستیارەکانەوە و سەرکەوتن بەدەست بهێنە",
      },
      {
        title: "نوێکردنەوەی تواناکان",
        description: "کارەکتەرەکانت نوێ بکەرەوە و بەهێزتریان بکە",
      },
      {
        title: "مۆدی چەند یاریزان",
        description: "لەگەڵ هاوڕێکانت یاری بکە یان لە دژ یەکتر کێبڕکێ بکە",
      },
    ],
    technologies: ["Unity", "C#", "Firebase", "Photon"],
    services: ["دیزاینی یاری", "گەشەپێدانی یاری", "تاقیکردنەوە", "بڵاوکردنەوە"],
  },
  {
    slug: "students",
    name: "Ayewar Students",
    nameKu: "ئایەوار Students",
    category: "پلاتفۆرمی پەروەردەیی",
    icon: studentsIcon,
    mockups: [students1, students2, students3, students4, students5, students6],
    description:
      "هاوەڵی باشترین بۆ خوێندکاران لە کوردستان. کارەکانی خوێندنت بەڕێوەببە، ئەرکەکان بەدواداچوون بکە، پەیوەندی لەگەڵ هاوپۆلەکانت بگرە، و سەرچاوە پەروەردەییەکان بەکاربهێنە هەمووی لەیەک شوێن.",
    fullDescription:
      "ئایەوار Students پلاتفۆرمە تەواوەکەیە بۆ خوێندکاران لە کوردستان. لە خشتەی وانەکان بۆ بەدواداچوونی ئەرکەکان، لە تۆڕی خوێندکارانەوە بۆ سەرچاوە پەروەردەییەکان، هەمووی لەیەک شوێندا بەردەستە. بە تایبەت بۆ مەنهەجی پرۆسەی بولۆنیا و پێداویستیە ئەکادیمیەکانی ناوخۆ دیزاین کراوە.",
    mockupColor: "#10B981",
    features: [
      {
        title: "بەڕێوەبردنی وانەکان",
        description: "هەموو وانە و مۆدیولەکانت لەیەک شوێن بەڕێوەببە",
      },
      {
        title: "خشتەی وانەکان",
        description: "خشتەی وانەکانت بە ئاسانی ببینە و بەڕێوەی ببە",
      },
      {
        title: "تۆڕی خوێندکاران",
        description: "پەیوەندی لەگەڵ هاوپۆلەکانت بگرە و تێبینی بگۆڕە",
      },
      {
        title: "سەرچاوە پەروەردەییەکان",
        description: "دەستگەیشتن بە ماتریاڵی خوێندن و سەرچاوەکانی تر",
      },
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
  {
    slug: "zidobid",
    name: "Ayewar Zidobid",
    nameKu: "ئایەوار Zidobid",
    category: "نەریتەی زیرەک",
    icon: zidobidIcon,
    mockups: [],
    description:
      "بە متمانەوە لە کوردستان بگەشتێ. ئەپلیکەیشنی نەریتەی زیرەکمان ئاڕاستە دروستەکان، نوێکاریەکانی ترافیکی ڕاستەوخۆ، و شوێنە جوانەکانی ناوچەیی دابین دەکات.",
    fullDescription:
      "ئایەوار Zidobid نەریتەی زیرەکە بۆ کوردستان. ئاڕاستەی دروست بدۆزەرەوە، ترافیکی ڕاستەوخۆ ببینە، و شوێنە جوانەکانی ناوچەیی بدۆزەرەوە. بە نەخشەسازی وردی شارەکان و ناوچەکانی کوردستان دروست کراوە بۆ باشترین ئەزموونی گەشتکردن. لە هەولێر بۆ سلێمانی، لە دهۆک بۆ کەرکوک، هەموو ڕێگایەک بەردەستە.",
    mockupColor: "#F59E0B",
    features: [
      {
        title: "نەخشەی وردی کوردستان",
        description: "نەخشەکانی وردترین بۆ شارەکان و ناوچەکانی کوردستان",
      },
      {
        title: "ترافیکی ڕاستەوخۆ",
        description: "زانیاری ترافیکی ڕاستەوخۆ بۆ باشترین ڕێگا",
      },
      {
        title: "شوێنە جوانەکان",
        description: "شوێنە گرنگ و جوانەکانی ناوچەکەت بدۆزەرەوە",
      },
      {
        title: "گەشتکردنی ئۆفلاین",
        description: "نەخشەکان دابەزێنە و بەبێ ئینتەرنێت بیانبەکاربێنە",
      },
    ],
    technologies: ["Kotlin", "Swift", "Mapbox", "Firebase"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
];
