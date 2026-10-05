import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import { identity } from "@/data/portfolio";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#F6F1E9",
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
