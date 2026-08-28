"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  identity,
  contact,
  profile,
  projectGroups,
  skillGroups,
  experience,
  education,
  type TimelineItem,
} from "@/data/portfolio";
import {
  UserIcon,
  PhoneAppIcon,
  CodeIcon,
  ClockIcon,
  MailIcon,
  FileIcon,
  DownloadIcon,
  ChevronLeft,
  CallIcon,
  GithubIcon,
  LinkedinIcon,
  SignalIcon,
} from "./Icons";

type ScreenId = "home" | "profil" | "projets" | "stack" | "parcours" | "contact";

const APPS: { id: ScreenId; name: string; tint: string; Icon: (p: { className?: string }) => React.JSX.Element }[] = [
  { id: "profil", name: "Profil", tint: "tint-a", Icon: UserIcon },
  { id: "projets", name: "Projets", tint: "tint-b", Icon: PhoneAppIcon },
  { id: "stack", name: "Stack", tint: "tint-c", Icon: CodeIcon },
  { id: "parcours", name: "Parcours", tint: "tint-d", Icon: ClockIcon },
  { id: "contact", name: "Contact", tint: "tint-e", Icon: MailIcon },
];

const TITLES: Record<Exclude<ScreenId, "home">, string> = {
  profil: "Profil",
  projets: "Projets",
  stack: "Stack",
  parcours: "Parcours",
  contact: "Contact",
};

function StatusBar() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status">
      <span suppressHydrationWarning>{time}</span>
      <span className="status-icons">
        <SignalIcon />
        <span className="batt" />
      </span>
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="tl">
      {items.map((it) => (
        <div key={it.title + it.when} className={it.current ? "tl-item now" : "tl-item"}>
          <p className="when">{it.when}</p>
          <h3>{it.title}</h3>
          <p className="who">{it.who}</p>
        </div>
      ))}
    </div>
  );
}

export default function Phone() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const backRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goHome = useCallback(() => setScreen("home"), []);

  useEffect(() => {
    if (screen !== "home") backRef.current?.focus({ preventScroll: true });
  }, [screen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome]);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (dx > 70 && Math.abs(dy) < 55) goHome();
    touch.current = null;
  };

  const AppHeader = ({ title }: { title: string }) => (
    <div className="app-head">
      <button ref={backRef} className="back" onClick={goHome}>
        <ChevronLeft className="ico-sm" />
        Accueil
      </button>
      <span className="app-title">{title}</span>
    </div>
  );

  return (
    <div className="device">
      <div className="screen">
        <div className="notch" />
        <StatusBar />

        <div className="views" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {/* ---------- ACCUEIL ---------- */}
          {screen === "home" && (
            <section className="view">
              <div className="home">
                <div className="hello">
                  <span>Bonjour, je suis</span>
                  <h1>{identity.shortName}</h1>
                  <p>{identity.homeIntro}</p>
                </div>

                <div className="grid">
                  {APPS.map(({ id, name, tint, Icon }) => (
                    <button key={id} className="app" onClick={() => setScreen(id)}>
                      <span className={`app-ico ${tint}`}>
                        <Icon className="ico" />
                      </span>
                      <span className="app-name">{name}</span>
                    </button>
                  ))}
                  <a className="app" href={identity.cvFile} download>
                    <span className="app-ico tint-f">
                      <FileIcon className="ico" />
                    </span>
                    <span className="app-name">CV</span>
                  </a>
                </div>

                <div className="widget">
                  <span className="pip" />
                  <span>
                    <b>{identity.availability.title}</b>
                    <span>{identity.availability.detail}</span>
                  </span>
                </div>
                <p className="hint fade">Touchez pour ouvrir</p>
              </div>
            </section>
          )}

          {/* ---------- PROFIL ---------- */}
          {screen === "profil" && (
            <section className="view is-entering">
              <AppHeader title={TITLES.profil} />
              <div className="scroll">
                {profile.blocks.map((b) => (
                  <div key={b.eyebrow}>
                    <p className="eyebrow">{b.eyebrow}</p>
                    <p>{b.text}</p>
                  </div>
                ))}
                <div className="chips">
                  {profile.tags.map((t, i) => (
                    <span key={t} className={i === 0 ? "chip hot" : "chip"}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ---------- PROJETS ---------- */}
          {screen === "projets" && (
            <section className="view is-entering">
              <AppHeader title={TITLES.projets} />
              <div className="scroll">
                {projectGroups.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow">{group.title}</p>
                    {group.items.map((p) => (
                      <article className="card" key={p.name}>
                        {p.image && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img className="shot" src={p.image} alt={`Capture de ${p.name}`} />
                        )}
                        <h3>{p.name}</h3>
                        <p className="meta">{p.meta}</p>
                        <p>{p.description}</p>
                        <div className="chips">
                          {p.stack.map((s) => (
                            <span className="chip" key={s}>
                              {s}
                            </span>
                          ))}
                        </div>
                        {p.href && (
                          <a className="card-link" href={p.href} target="_blank" rel="noopener noreferrer">
                            Voir le projet →
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- STACK ---------- */}
          {screen === "stack" && (
            <section className="view is-entering">
              <AppHeader title={TITLES.stack} />
              <div className="scroll">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <p className="eyebrow">{g.title}</p>
                    <div className="chips">
                      {g.items.map((s) => (
                        <span key={s} className={g.hot?.includes(s) ? "chip hot" : "chip"}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- PARCOURS ---------- */}
          {screen === "parcours" && (
            <section className="view is-entering">
              <AppHeader title={TITLES.parcours} />
              <div className="scroll">
                <p className="eyebrow">Expérience</p>
                <Timeline items={experience} />
                <p className="eyebrow">Formation</p>
                <Timeline items={education} />
              </div>
            </section>
          )}

          {/* ---------- CONTACT ---------- */}
          {screen === "contact" && (
            <section className="view is-entering">
              <AppHeader title={TITLES.contact} />
              <div className="scroll">
                <p className="eyebrow">Écrivez-moi</p>
                <p style={{ marginBottom: 16 }}>
                  Je réponds sous 24 heures. Dites-moi ce que vous construisez.
                </p>

                <a className="row" href={`mailto:${contact.email}`}>
                  <span className="row-ico tint-e">
                    <MailIcon className="ico-row" />
                  </span>
                  <span className="row-txt">
                    <b>E-mail</b>
                    <span>{contact.email}</span>
                  </span>
                </a>

                <a className="row" href={contact.phoneHref}>
                  <span className="row-ico tint-b">
                    <CallIcon className="ico-row" />
                  </span>
                  <span className="row-txt">
                    <b>Téléphone &amp; WhatsApp</b>
                    <span>{contact.phone}</span>
                  </span>
                </a>

                <a className="row" href={contact.github} target="_blank" rel="noopener noreferrer">
                  <span className="row-ico tint-f">
                    <GithubIcon className="ico-row" />
                  </span>
                  <span className="row-txt">
                    <b>GitHub</b>
                    <span>{contact.githubLabel}</span>
                  </span>
                </a>

                <a className="row" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="row-ico tint-c">
                    <LinkedinIcon className="ico-row" />
                  </span>
                  <span className="row-txt">
                    <b>LinkedIn</b>
                    <span>{contact.linkedinLabel}</span>
                  </span>
                </a>

                <a className="row" href={identity.cvFile} download>
                  <span className="row-ico tint-a">
                    <DownloadIcon className="ico-row" />
                  </span>
                  <span className="row-txt">
                    <b>Télécharger mon CV</b>
                    <span>PDF · 1 page</span>
                  </span>
                </a>
              </div>
            </section>
          )}
        </div>

        <div className="indicator">
          <button onClick={goHome} aria-label="Retour à l'accueil" />
        </div>
      </div>
    </div>
  );
}
