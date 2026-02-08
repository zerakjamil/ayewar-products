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
    nameKu: "ئەیوار ChessIFY",
    category: "پلاتفۆرمی فێربوونی شەتڕەنج",
    icon: chessifyIcon,
    mockups: [chessify1, chessify2, chessify3, chessify4, chessify5, chessify6, chessify7, chessify8, chessify9],
    description:
      "فێربوونی ستراتیژی شەتڕەنج لەگەڵ پلاتفۆرمی فێربوونی گشتگیرمان. ChessIFY تاکتیکی مەشق، شیکردنەوەی پۆزیشن، و سیستەمی هەڵسەنگاندنی ELO ی پێشکەوتوو لەخۆ دەگرێت بۆ یارمەتیدانی یاریزانانی هەموو ئاستەکان بۆ باشترکردنی یارییان.",
    fullDescription:
      "ئەیوار ChessIFY فێربوونی شەتڕەنج دەکاتە شتێکی ئاسان، خێرا، و کاریگەر. حسابێکی تەواو بکەرەوە ڕاستەوخۆ لە مۆبایلەکەت لە ماوەی کەمتر لە ٥ خولەکدا، بە تەواوی بەخۆڕایی. لەگەڵ ئەپلیکەیشنی ChessIFY، دەتوانیت تاکتیکەکانت فێربیت لە هەر کاتێک و لە هەر شوێنێک. مەشق بکە، کێبڕکێ بکە لەگەڵ یاریزانانی تر لە ناوخۆ و جیهاندا، و چاودێری پێشکەوتنەکەت بکە بە ئاسانی.",
    mockupColor: "#2d9bf0",
    features: [
      {
        title: "ئاسان لە بەکارهێنان",
        description: "ڕووکاری ئەپلیکەیشنەکەمان بۆ بەکارهێنانی گشتگیر دیزاین کراوە",
      },
      {
        title: "دەستگەیشتنی خێرا",
        description: "بگە بە ناوەڕۆکی دڵخوازت تەنها بە چەند کلیکێک ",
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
    technologies: ["Unity", "C#", "Laravel API", "Python (for chess engine)", "postgreSQL","Socket.IO"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
  {
    slug: "raiders",
    name: "Ayewar Raiders",
    nameKu: "ئەیوار Raiders",
    category: "پلاتفۆرمی هات و چۆ بۆ شۆفێری پاسەکانی کوردستان",
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
    technologies: ["Expo", "React Native", "PHP", "Laravel", "Python", "PostgreSQL"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
  {
    slug: "students",
    name: "Ayewar Students",
    nameKu: "ئەیوار Students",
    category: "پلاتفۆرمی هات و چۆ بۆ مووشتەریەکانی پاسەکانی کوردستان",
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
    technologies: ["Expo", "React Native", "PHP", "Laravel", "Python", "PostgreSQL"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
  {
    slug: "zidobid",
    name: "Ayewar Zidobid",
    nameKu: "ئەیوار Zidobid",
    category: "ئەپلیکەیشنی مزادەی ڕاستەوخۆ",
    icon: zidobidIcon,
    mockups: [],
    description:
      "ئەپلیکەیشنی مزادەی ڕاستەوخۆ کە تێیدا فرۆشیارێک کاڵاکان بڵاو دەکاتەوە و بەکارهێنەرەکان دەتوانن لە ڕاستەوخۆدا مزادەیان لەسەر بکەن.",
    fullDescription:
      "ئەیوار Zidobid ئەپلیکەیشنی مزادەی ڕاستەوخۆیە کە فرۆشیارێک کاڵاکانی خۆی بڵاو دەکاتەوە و بەکارهێنەرەکان دەتوانن لە ڕاستەوخۆدا مزادەیان لەسەر بکەن. بە سیستەمی ڕاستەوخۆی مزادە، هەموو بەشداریکردنەکان لە کاتی ڕاستەوخۆدا ڕوو دەدەن، و بەکارهێنەرەکان دەتوانن بەشداری بکەن لە هەر کاتێک و لە هەر شوێنێک.",
    mockupColor: "#F59E0B",
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
    technologies: ["Expo", "React Native", "PHP", "Laravel", "Python", "PostgreSQL","Node.js"],
    services: ["دۆزینەوەی پرۆژە", "UI/UX و پرۆتۆتایپ", "گەشەپێدانی تەواو", "تاقیکردنەوەی نەرمەکاڵا"],
  },
];
