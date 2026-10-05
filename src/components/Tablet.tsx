"use client";

import { useRef, useState } from "react";

type Group = { title: string; items: string[]; hot?: string[] };

/**
 * Compétences présentées dans une tablette : une page par groupe, que l'on
 * fait défiler à l'horizontale (glisser, onglets, flèches ou clavier).
 */
export default function Tablet({ groups }: { groups: Group[] }) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");

  const goTo = (index: number) => {
    const pages = pagesRef.current;
    if (!pages) return;
    const target = Math.max(0, Math.min(groups.length - 1, index));
    pages.scrollTo({ left: target * pages.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="tablet" data-reveal>
      <span className="tablet-cam" aria-hidden="true" />

      <div className="tablet-screen">
        <div className="tablet-bar">
          <div className="tablet-tabs" role="tablist" aria-label="Groupes de compétences">
            {groups.map((group, i) => (
              <button
                key={group.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={active === i ? "tablet-tab is-active" : "tablet-tab"}
                onClick={() => goTo(i)}
              >
                <span>{pad(i + 1)}</span>
                <b>{group.title}</b>
              </button>
            ))}
          </div>

          <div className="tablet-nav">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Groupe précédent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === groups.length - 1}
              aria-label="Groupe suivant"
            >
              →
            </button>
          </div>
        </div>

        {/* Le défilement horizontal reste natif : Lenis ne gère que le vertical. */}
        <div
          className="tablet-pages"
          ref={pagesRef}
          tabIndex={0}
          data-lenis-prevent-horizontal
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {groups.map((group, i) => (
            <article className="tablet-page" key={group.title} aria-label={group.title}>
              <p className="tablet-index">
                {pad(i + 1)} / {pad(groups.length)}
              </p>
              <h3>{group.title}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item} className={group.hot?.includes(item) ? "is-hot" : undefined}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="tablet-foot" aria-hidden="true">
          <span className="tablet-dots">
            {groups.map((group, i) => (
              <i key={group.title} className={active === i ? "is-active" : undefined} />
            ))}
          </span>
          Fais défiler →
        </p>
      </div>
    </div>
  );
}
