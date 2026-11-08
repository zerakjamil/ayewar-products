import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
  colorScheme: "dark",
};

const title = "Ayewar — Apps & Games";
const description = "Explore Chessmancer, Dallak, Raiders, Passengers, Zidobid, Ledger, and Soragh. Made by Ayewar.";
const deploymentHost = process.env.VERCEL_ENV === "preview"
  ? process.env.VERCEL_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (deploymentHost ? `https://${deploymentHost}` : process.env.NODE_ENV === "production"
    ? "https://products.ayewar.com"
    : `http://localhost:${process.env.PORT || 3000}`);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ayewar",
  openGraph: {
    type: "website",
    siteName: "Ayewar",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  keywords: [
    "ئەیوار",
    "زێڕەک جەمیل",
    "شەتڕەنج",
    "Chessmancer",
    "Dallak",
    "Dallak Partners",
    "دەللاک",
    "Raiders",
    "Passengers",
    "Zidobid",
    "کوردستان",
    "Ayewar",
  ],
  icons: {
    icon: [{ url: "/icon.png?v=ayewar", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ckb" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
