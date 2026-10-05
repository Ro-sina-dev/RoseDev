"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/portfolio";

/**
 * Bandeau défilant des réalisations. Un clic sur une image l'ouvre en grand ;
 * on passe de l'une à l'autre avec les flèches et on ferme avec Échap, la
 * croix ou un clic en dehors de l'image.
 */
export default function Reel({ works }: { works: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (by: number) =>
    setIndex((i) => (i === null ? i : (i + by + works.length) % works.length));

  const current = index !== null ? works[index] : null;

  return (
    <>
      <div className={open ? "reel is-paused" : "reel"} data-reveal>
        <div className="reel-track">
          {/* La seconde copie ne sert qu'à boucler le défilement. */}
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {works.map((work, i) => (
                <li key={work.label}>
                  <figure>
                    <button
                      type="button"
                      className="reel-item"
                      onClick={() => setIndex(i)}
                      aria-label={`Agrandir : ${work.label}`}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={work.src} alt="" />
                    </button>
                    <figcaption>{work.label}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="viewer"
        aria-label={current?.label}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <>
            <figure className="viewer-figure" key={current.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.label} />
              <figcaption>
                {current.label}
                <span>
                  {String((index ?? 0) + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              className="viewer-btn viewer-prev"
              onClick={() => step(-1)}
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              type="button"
              className="viewer-btn viewer-next"
              onClick={() => step(1)}
              aria-label="Image suivante"
            >
              →
            </button>
            <button
              type="button"
              className="viewer-btn viewer-close"
              onClick={() => setIndex(null)}
              aria-label="Fermer"
              autoFocus
            >
              ✕
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
