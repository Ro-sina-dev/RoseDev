"use client";

import { useEffect } from "react";

/**
 * Animations pilotées par le défilement et le pointeur. Le composant n'affiche
 * rien : il écrit des classes et des variables CSS, le rendu reste au CSS.
 * Sans JavaScript ou avec « réduire les animations », tout le contenu reste
 * visible tel quel.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Barre de progression et léger parallaxe du portrait. */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", max > 0 ? String(window.scrollY / max) : "0");
        if (!reduced) {
          root.style.setProperty("--sy", String(Math.min(window.scrollY, window.innerHeight)));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const cleanups = [
      () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      },
    ];

    if (!reduced) {
      /* Apparition au défilement. Ce qui est déjà à l'écran reste affiché :
         on ne masque que ce qui se trouve plus bas. */
      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      for (const el of targets) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      }
      root.dataset.motion = "on";

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      targets.forEach((el) => observer.observe(el));

      /* Halo qui suit la souris sur les cartes. */
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const card = (e.target as Element).closest<HTMLElement>("[data-spot]");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });

      cleanups.push(() => {
        observer.disconnect();
        document.removeEventListener("pointermove", onMove);
        delete root.dataset.motion;
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
