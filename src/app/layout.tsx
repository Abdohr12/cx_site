import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/LanguageContext";

const SITE_URL = "https://my-project-pink-six-75.vercel.app";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // ===== Basic Meta =====
  title: "Codex | حلول رقمية متكاملة للشركات المغربية",
  description:
    "Codex - وكالة برمجة مغربية متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية للشركات الصغيرة والمتوسطة. تطوير ويب، موبايل، تصميم UI/UX، SEO.",
  keywords: [
    "Codex",
    "وكالة برمجة مغربية",
    "تطوير مواقع المغرب",
    "تصميم مواقع ويب",
    "تطبيقات موبايل",
    "شركة برمجة الدار البيضاء",
    "Casablanca web agency",
    "SEO المغرب",
    "حلول رقمية",
    "Moroccan web development",
  ],

  // ===== Canonical URL =====
  alternates: {
    canonical: SITE_URL,
  },

  // ===== Robots =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== Open Graph (Facebook, LinkedIn, etc.) =====
  openGraph: {
    type: "website",
    locale: "ar_MA",
    alternateLocale: "fr_MA",
    url: SITE_URL,
    siteName: "Codex",
    title: "Codex | حلول رقمية متكاملة للشركات المغربية",
    description:
      "وكالة برمجة مغربية متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية. من الفكرة إلى الإطلاق.",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Codex - وكالة برمجة مغربية",
      },
    ],
  },

  // ===== Twitter Card =====
  twitter: {
    card: "summary_large_image",
    title: "Codex | حلول رقمية متكاملة للشركات المغربية",
    description:
      "وكالة برمجة مغربية متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية.",
    images: [`${SITE_URL}/logo.png`],
  },

  // ===== Icons =====
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },

  // ===== Other =====
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Codex", url: SITE_URL }],
  creator: "Codex",
  publisher: "Codex",
  category: "technology",
};

// ===== Schema.org Structured Data (JSON-LD) =====
const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codex",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "وكالة برمجة مغربية متخصصة في تطوير الحلول الرقمية للشركات.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bd Mohammed V, Quartier Maarif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212600000000",
    contactType: "customer service",
    availableLanguage: ["Arabic", "French", "English"],
  },
  sameAs: [
    "https://instagram.com/codex_ma",
  ],
};

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Codex",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: "+212600000000",
  email: "contactcodex.ma@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bd Mohammed V, Quartier Maarif",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    postalCode: "20100",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.5731,
    longitude: -7.5898,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Morocco",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaLocalBusiness),
          }}
        />
      </head>
      <body className={`${cairo.variable} antialiased`}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
