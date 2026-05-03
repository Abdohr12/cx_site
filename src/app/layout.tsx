import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codex | حلول رقمية متكاملة للشركات المغربية",
  description:
    "Codex - وكالة برمجة مغربية متخصصة في تطوير الحلول الرقمية للشركات الصغيرة والمتوسطة. تطوير مواقع، تطبيقات، أنظمة إدارة المتدربين، والمزيد.",
  keywords: [
    "Codex",
    "وكالة برمجة مغربية",
    "تطوير مواقع",
    "تطبيقات موبايل",
    "أنظمة إدارة المتدربين",
    "حلول رقمية",
    "المغرب",
  ],
  authors: [{ name: "Codex Team" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Codex | حلول رقمية متكاملة للشركات المغربية",
    description:
      "نظّم شركتك بذكاء مع Codex - حلول رقمية مصممة خصيصاً للشركات المغربية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
