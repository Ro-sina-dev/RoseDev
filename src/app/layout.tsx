import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { identity } from "@/data/portfolio";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${identity.firstName} ${identity.middleName} ${identity.lastName} — ${identity.role}`;
const description = `Portfolio de ${identity.shortName}, ${identity.role.toLowerCase()} basée à ${identity.city}. Applications Flutter, architecture MVVM et Clean Architecture, intégration d'API REST.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, locale: "fr_CI", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0F1216",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
