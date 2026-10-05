"use client";

import { useEffect, useState } from "react";
import { identity } from "@/data/portfolio";
import { DownloadIcon, MoonIcon, SunIcon } from "./Icons";

const NAV_LINKS = [
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  /* Inconnu au rendu serveur : le thème est lu sur <html> une fois monté. */
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite */
    }
    setTheme(next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lien actif : la section qui traverse le milieu de l'écran. */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={["nav", scrolled ? "is-scrolled" : "", open ? "is-open" : ""].join(" ")}>
      <span className="nav-progress" aria-hidden="true" />

      <div className="nav-inner">
        <a className="nav-brand" href="#top" onClick={() => setOpen(false)}>
          {identity.shortName}
          <i aria-hidden="true">.</i>
        </a>

        <nav className="nav-links" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "is-active" : undefined}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav-theme"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {theme === "dark" ? <SunIcon className="ico" /> : <MoonIcon className="ico" />}
        </button>

        <a className="btn btn-small nav-cv" href={identity.cvFile} download>
          <DownloadIcon className="ico" />
          CV
        </a>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="menu" id="menu" inert={!open}>
        <nav aria-label="Menu">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn" href={identity.cvFile} download onClick={() => setOpen(false)}>
          <DownloadIcon className="ico" />
          Télécharger le CV
        </a>
      </div>
    </header>
  );
}
