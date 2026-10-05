"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Animations pilotées par le défilement et le pointeur. Le composant n'affiche
 * rien : Lenis adoucit le défilement, GSAP fait apparaître et disparaître les
 * blocs marqués `data-reveal`. Sans JavaScript ou avec « réduire les
 * animations », tout le contenu reste visible tel quel.
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
      gsap.registerPlugin(ScrollTrigger);

      /* Défilement adouci, cadencé par l'horloge de GSAP. Les liens du menu
         s'arrêtent sous la barre de navigation grâce au scroll-padding du CSS. */
      const lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      /* Entrée quand le bloc arrive à l'écran, sortie quand il le quitte :
         vers le haut s'il passe au-dessus, vers le bas sinon. Le décalage passe
         par la variable --ry (lue par `translate` dans le CSS) pour ne pas
         toucher au `transform` des survols. */
      const show = (els: Element[]) =>
        gsap.to(els, {
          opacity: 1,
          "--ry": 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
        });
      const hide = (els: Element[], offset: number) =>
        gsap.to(els, { opacity: 0, "--ry": offset, duration: 0.5, ease: "power2.in", overwrite: true });

      const ctx = gsap.context(() => {
        gsap.set("[data-reveal]", { opacity: 0, "--ry": 40 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 92%",
          end: "bottom 4%",
          onEnter: show,
          onEnterBack: show,
          onLeave: (els) => hide(els, -40),
          onLeaveBack: (els) => hide(els, 40),
        });
      });

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
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
        document.removeEventListener("pointermove", onMove);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
