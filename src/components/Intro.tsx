"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { identity } from "@/data/portfolio";

const LINE_1 = "Coucou toi !";
const LINE_2 = "Bienvenue dans mon petit coin.";
/** Passage de la seconde ligne mis en couleur. */
const ACCENT = "petit coin";
const TOTAL = LINE_1.length + LINE_2.length;

/**
 * Écran d'accueil façon jeu vidéo, affiché à chaque chargement avant le
 * portfolio. C'est ThemeScript qui pose `data-intro` sur <html> avant le
 * premier affichage : sans lui (ou sans JavaScript) l'écran reste masqué.
 */
export default function Intro() {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ready = count >= TOTAL;

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "on") return;
    setActive(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(TOTAL);
      return;
    }
    /* Le texte s'écrit lettre par lettre, la barre de chargement suit. */
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => setCount((c) => Math.min(c + 1, TOTAL)), 45);
    }, 500);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, []);

  const start = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    /* Retirer l'attribut relance les animations de l'accueil sous le rideau. */
    delete document.documentElement.dataset.intro;
    window.setTimeout(() => setActive(false), 1000);
  }, [leaving]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, start]);

  useEffect(() => {
    if (ready) buttonRef.current?.focus();
  }, [ready]);

  const typed2 = LINE_2.slice(0, Math.max(0, count - LINE_1.length));
  const accentAt = LINE_2.indexOf(ACCENT);
  const percent = Math.round((count / TOTAL) * 100);

  return (
    <div
      className={active && leaving ? "intro is-leaving" : "intro"}
      role="dialog"
      data-lenis-prevent
      aria-modal="true"
      aria-label={`${LINE_1} ${LINE_2}`}
      inert={!active || leaving}
    >
      <p className="intro-tag">
        <i aria-hidden="true" />
        Portfolio · Niveau 01
      </p>

      <div className="intro-body" aria-hidden="true">
        <p className="intro-title">
          {LINE_1.slice(0, count)}
          {count < LINE_1.length && <span className="intro-caret" />}
        </p>
        <p className="intro-text">
          {typed2.slice(0, accentAt)}
          <em>{typed2.slice(accentAt, accentAt + ACCENT.length)}</em>
          {typed2.slice(accentAt + ACCENT.length)}
          {count >= LINE_1.length && <span className="intro-caret" />}
        </p>
      </div>

      <div className="intro-load" aria-hidden="true">
        <span className="intro-bar">
          <i style={{ width: `${percent}%` }} />
        </span>
        <span>{ready ? "Prêt" : "Chargement"}</span>
        <span>{String(percent).padStart(3, "0")}%</span>
      </div>

      <button
        ref={buttonRef}
        type="button"
        className={ready ? "intro-start is-ready" : "intro-start"}
        onClick={start}
      >
        <span aria-hidden="true">▶</span>
        Commencer
      </button>
      <p className={ready ? "intro-hint is-ready" : "intro-hint"} aria-hidden="true">
        Appuie sur Entrée ↵
      </p>

      <p className="intro-foot" aria-hidden="true">
        <span>Joueur 1 · Toi</span>
        <span>{identity.shortName}</span>
      </p>
    </div>
  );
}
