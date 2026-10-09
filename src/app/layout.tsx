import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#090c10",
};

export const metadata: Metadata = {
  title: "ئەیوار | پلاتفۆرم و بەرهەمە پێشکەوتووەکان",
  description:
    "ئیکۆسیستەمی تەکنەلۆجی ئەیوار — پلاتفۆرمەکانی شەتڕەنج، حجزکردنی سەرتاشخانە (Dallak)، هاتوچۆی کوردستان (Raiders & Students)، و مزادەی ڕاستەوخۆ (Zidobid).",
  keywords: [
    "ئەیوار",
    "زێڕەک جەمیل",
    "شەتڕەنج",
    "Chessmancer",
    "Dallak",
    "Dallak Partners",
    "دەللاک",
    "Raiders",
    "Students",
    "Zidobid",
    "کوردستان",
    "Ayewar",
  ],
  icons: {
    icon: "/ayewar-icon.png",
    apple: "/ayewar-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ckb" dir="rtl">
      <body className={`${inter.variable} antialiased`}>
        <LoadingScreen />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
