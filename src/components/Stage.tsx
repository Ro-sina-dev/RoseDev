"use client";

import { useEffect, useRef, useState } from "react";
import Phone, { type ScreenId } from "./Phone";
import { DownloadIcon, MailIcon } from "./Icons";
import {
  identity,
  contact,
  profile,
  about,
  hero,
  communities,
  creative,
  type Photo,
  allProjects,
  skillGroups,
  experience,
} from "@/data/portfolio";

type Floater = { label: string; sub: string };

/** Découpe le texte pour colorer les expressions clés, sans balise dans les données. */
function colorise(text: string, words?: string[]) {
  if (!words || words.length === 0) return text;
  const motif = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  return text.split(new RegExp(`(${motif})`, "gi")).map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <mark className="hl" key={i}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type Section = {
  screen: ScreenId;
  eyebrow: string;
  title: string;
  /** Couleur de fond de la section et halo qui l'éclaire. */
  bg: string;
  glow: string;
  floaters: Floater[];
  cta?: boolean;
  /** Portrait affiché à côté du texte, pour la section « À propos ». */
  photo?: string;
  text?: string;
  /** Remplace l'intitulé de section par un badge mis en avant. */
  badge?: string;
  /** Expressions du texte à mettre en couleur. */
  highlight?: string[];
  /** Remplace les pastilles par des photos façon polaroïd. */
  photos?: Photo[];
};

/* Chaque section prend son contenu dans les données du portfolio : modifier
   portfolio.ts suffit à mettre le défilement à jour. */
const SECTIONS: Section[] = [
  {
    screen: "home",
    eyebrow: "Portfolio",
    badge: identity.badge,
    title: hero.title,
    text: hero.pitch,
    highlight: hero.highlight,
    bg: "#F2551E",
    glow: "#FFC08F",
    cta: true,
    floaters: [
      { label: identity.city, sub: identity.country },
      { label: "3 ans", sub: "en production" },
      { label: "Flutter", sub: "Dart · MVVM" },
    ],
  },
  {
    screen: "profil",
    eyebrow: "Profil",
    title: identity.tagline,
    bg: "#7A3FD0",
    glow: "#D6B4FF",
    floaters: [
      { label: "Flutter", sub: "3 ans" },
      { label: "MVVM", sub: "Clean Archi" },
      { label: "Provider", sub: "état" },
    ],
  },
  {
    screen: "projets",
    eyebrow: "Projets",
    title: "Mes projets, du premier écran à la mise en production",
    bg: "#0E7C6B",
    glow: "#7FEBD6",
    floaters: allProjects
      .slice(0, 3)
      .map((p) => ({ label: p.name, sub: p.stack[0] })),
  },
  {
    screen: "stack",
    eyebrow: "Stack",
    title: "Flutter, Clean Architecture et des API qui répondent",
    bg: "#2749B8",
    glow: "#A8C3FF",
    floaters: (skillGroups[0].hot ?? [])
      .concat("Provider", "API REST")
      .slice(0, 3)
      .map((s) => ({ label: s, sub: "mobile" })),
  },
  {
    screen: "parcours",
    eyebrow: "Parcours",
    title: "Du stage au poste de développeuse mobile, en trois ans",
    bg: "#B4620A",
    glow: "#FFD79B",
    /* Postes mis en avant : le rôle parle plus que la date sur une pastille. */
    floaters: ["CapCoding-Studio", "Stediihome", "Alpha Sécurité"]
      .map((nom) => experience.find((e) => e.who.startsWith(nom)))
      .filter((e): e is (typeof experience)[number] => Boolean(e))
      .map((e) => ({
        label: e.who.split("·")[0].trim(),
        sub: e.title.replace("Développeuse d'applications mobiles", "Dév. mobile"),
      })),
  },
  {
    screen: "home",
    eyebrow: "Communautés",
    title: communities.title,
    text: communities.text,
    highlight: communities.highlight,
    photos: communities.photos,
    bg: "#A81E5B",
    glow: "#FFAFD0",
    floaters: [],
  },
  {
    screen: "home",
    eyebrow: "Création",
    title: creative.title,
    text: creative.text,
    highlight: creative.highlight,
    photos: creative.photos,
    bg: "#15803D",
    glow: "#93E9B0",
    floaters: [],
  },
  {
    screen: "profil",
    eyebrow: "À propos",
    title: about.title,
    text: about.text,
    photo: identity.photo,
    bg: "#15110D",
    glow: "#6B6055",
    cta: true,
    floaters: [
      { label: identity.city, sub: identity.country },
      { label: "Disponible", sub: "CDI · freelance" },
    ],
  },
  {
    screen: "contact",
    eyebrow: "Contact",
    title: "Dites-moi ce que vous construisez",
    bg: "#0E5F86",
    glow: "#8FD6F5",
    floaters: [
      { label: "E-mail", sub: "réponse < 24 h" },
      { label: "WhatsApp", sub: "Abidjan" },
      { label: "GitHub", sub: "Ro-sina-dev" },
    ],
  },
];

export default function Stage() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-sec]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-sec")));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const section = SECTIONS[active];

  return (
    <section className="reel">
      <div className="reel-pin">
        <div
          className="reel-bg"
          style={
            {
              "--bg": section.bg,
              "--glow": section.glow,
            } as React.CSSProperties
          }
        />

        <div className="reel-grid">
          <div className="reel-phone">
            <Phone forcedScreen={section.screen} />

            {/* Photos façon polaroïd, ou pastilles selon la section. La clé
                relance l'animation d'entrée à chaque changement. */}
            {section.photos ? (
              <div className="polas" key={section.eyebrow}>
                {section.photos.map((photo, i) => (
                  <figure className={`pola fl-${i + 1}`} key={photo.label}>
                    {photo.src ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={photo.src} alt={photo.label} />
                    ) : (
                      <span className="pola-empty">Photo à venir</span>
                    )}
                    <figcaption>{photo.label}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="floaters" key={section.eyebrow} aria-hidden="true">
                {section.floaters.map((f, i) => (
                  <span className={`floater fl-${i + 1}`} key={f.label + i}>
                    <b>{f.label}</b>
                    <i>{f.sub}</i>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className={[
              "reel-copy",
              section.text ? "has-text" : "",
              section.photo ? "has-photo" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={section.title}
          >
            {section.photo && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                className="reel-photo"
                src={section.photo}
                alt={`${identity.shortName}, ${identity.role.toLowerCase()}`}
              />
            )}
            {section.badge ? (
              <p className="reel-badge">
                <i className="reel-badge-dot" aria-hidden="true" />
                {section.badge}
              </p>
            ) : (
              <p className="reel-eyebrow">{section.eyebrow}</p>
            )}
            <h2 className="reel-title">{section.title}</h2>
            {section.text && (
              <p className="reel-text">{colorise(section.text, section.highlight)}</p>
            )}

            {section.cta && (
              <div className="reel-cta">
                <a className="pill" href={identity.cvFile} download>
                  <DownloadIcon className="ico-btn" />
                  Télécharger le CV
                </a>
                <a className="pill pill-ghost" href={`mailto:${contact.email}`}>
                  <MailIcon className="ico-btn" />
                  M&apos;écrire
                </a>
              </div>
            )}

            <p className="reel-progress">
              {String(active + 1).padStart(2, "0")}
              <i>/{String(SECTIONS.length).padStart(2, "0")}</i>
            </p>
          </div>
        </div>
      </div>

      {/* Repères invisibles : ils donnent au défilement sa longueur et
          désignent la section active. */}
      <div className="reel-steps" ref={stepsRef} aria-hidden="true">
        {SECTIONS.map((s, i) => (
          <div className="reel-step" data-sec={i} key={s.eyebrow} />
        ))}
      </div>
    </section>
  );
}
