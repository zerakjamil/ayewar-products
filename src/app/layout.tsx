import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ئەیوار | بەرهەمەکانمان",
  description:
    "بەرهەمەکانی ئەیوار بۆ فێربوونی شەتڕەنج، هات و چۆ لە کوردستان.",
  keywords: [
    "ئەیوار",
    "شەتڕەنج",
    "ChessIFY",
    "Raiders",
    "Students",
    "Zidobid",
    "کوردستان",
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
