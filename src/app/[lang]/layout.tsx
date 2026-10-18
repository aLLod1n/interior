import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Sans, Instrument_Serif, Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import "../globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Instrument has no Georgian glyphs — these pick up Georgian characters.
const sansKa = Noto_Sans_Georgian({
  variable: "--font-sans-georgian",
  subsets: ["georgian"],
  weight: ["400", "500"],
});

const serifKa = Noto_Serif_Georgian({
  variable: "--font-serif-georgian",
  subsets: ["georgian"],
  weight: ["300", "400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f3f2",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: {
      default: `${site.fullName} — ${site.tagline[lang]}`,
      template: `%s · ${site.fullName}`,
    },
    description: site.description[lang],
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${sansKa.variable} ${serifKa.variable} antialiased`}
    >
      {/* Bottom padding on phones keeps the footer clear of the fixed call bar. */}
      <body className="flex min-h-screen flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] sm:pb-0">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <MobileCallBar dict={dict} />
      </body>
    </html>
  );
}
