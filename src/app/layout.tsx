import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import ThemeScript from "@/components/ThemeScript";
import { identity } from "@/data/portfolio";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
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
const description = `Portfolio de ${identity.shortName}, ${identity.role.toLowerCase()} basée à ${identity.city}. UI/UX design, développement mobile et développement web.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, locale: "fr_CI", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1415" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
