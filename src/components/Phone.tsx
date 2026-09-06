"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  identity,
  contact,
  profile,
  skillGroups,
  experience,
  education,
  allProjects,
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
  ChevronRight,
  CallIcon,
  GithubIcon,
  LinkedinIcon,
  SignalIcon,
} from "./Icons";

export type ScreenId = "home" | "profil" | "projets" | "stack" | "parcours" | "contact";

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

type PhoneProps = {
  /** Écran imposé de l'extérieur par le défilement de la page. */
  forcedScreen?: ScreenId;
};

export default function Phone({ forcedScreen }: PhoneProps) {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [projectIndex, setProjectIndex] = useState(0);
  const backRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  const goHome = useCallback(() => setScreen("home"), []);

  /* Inclinaison 3D suivant le pointeur — souris uniquement, et jamais si
     l'utilisateur a demandé moins d'animations. Le rendu reste au CSS :
     on ne fait qu'écrire trois variables, jamais de style de position. */
  useEffect(() => {
    const wrap = wrapRef.current;
    const device = deviceRef.current;
    if (!wrap || !device) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = wrap.getBoundingClientRect();
        const dx = (clientX - r.left) / r.width - 0.5;
        const dy = (clientY - r.top) / r.height - 0.5;
        device.style.setProperty("--ry", `${(dx * 13).toFixed(2)}deg`);
        device.style.setProperty("--rx", `${(dy * -9).toFixed(2)}deg`);
        device.style.setProperty("--gx", (dx * -30).toFixed(1));
      });
    };

    const onEnter = () => device.classList.add("is-tilting");
    const onLeave = () => {
      device.classList.remove("is-tilting");
      device.style.setProperty("--ry", "0deg");
      device.style.setProperty("--rx", "0deg");
      device.style.setProperty("--gx", "0");
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (screen !== "home") backRef.current?.focus({ preventScroll: true });
  }, [screen]);

  /* Le défilement impose l'écran ; un appui manuel reste possible et sera
     simplement repris à la section suivante. */
  useEffect(() => {
    if (forcedScreen) setScreen(forcedScreen);
  }, [forcedScreen]);

  const lastProject = allProjects.length - 1;
  const nextProject = useCallback(
    () => setProjectIndex((i) => Math.min(i + 1, lastProject)),
    [lastProject]
  );
  const prevProject = useCallback(() => setProjectIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
      if (screen !== "projets") return;
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome, screen, nextProject, prevProject]);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dy) > 55) return;

    /* Dans le diaporama, le glissement horizontal change de projet ; revenir
       en arrière sur le premier ramène à l'accueil, comme partout ailleurs. */
    if (screen === "projets") {
      if (dx < -60) nextProject();
      else if (dx > 60) {
        if (projectIndex > 0) prevProject();
        else goHome();
      }
      return;
    }
    if (dx > 70) goHome();
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
    <div className="device-wrap" ref={wrapRef}>
      <div className="device" ref={deviceRef}>
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

            {/* ---------- PROJETS (diaporama) ---------- */}
            {screen === "projets" && (
              <section className="view is-entering">
                <AppHeader title={TITLES.projets} />

                <div className="slide-wrap">
                  {/* Galerie : l'image occupe tout l'écran, le nom du projet
                      se pose dessus en bas. Rien d'autre. */}
                  <figure className="slide" key={allProjects[projectIndex].name}>
                    {allProjects[projectIndex].image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className="slide-shot"
                        src={allProjects[projectIndex].image}
                        alt={`Capture de ${allProjects[projectIndex].name}`}
                      />
                    ) : (
                      <span className="slide-empty">Capture à venir</span>
                    )}
                    <figcaption className="slide-cap">
                      <h3 className="slide-name">{allProjects[projectIndex].name}</h3>
                      <p className="slide-stack">
                        {allProjects[projectIndex].stack.join(" · ")}
                      </p>
                    </figcaption>
                  </figure>
                </div>

                <div className="slide-nav">
                  <button
                    onClick={prevProject}
                    disabled={projectIndex === 0}
                    aria-label="Projet précédent"
                  >
                    <ChevronLeft className="ico-sm" />
                  </button>
                  <span className="slide-dots">
                    {allProjects.map((pr, i) => (
                      <button
                        key={pr.name}
                        className={i === projectIndex ? "on" : undefined}
                        onClick={() => setProjectIndex(i)}
                        aria-label={`Projet ${i + 1} : ${pr.name}`}
                        aria-current={i === projectIndex}
                      />
                    ))}
                  </span>
                  <button
                    onClick={nextProject}
                    disabled={projectIndex === lastProject}
                    aria-label="Projet suivant"
                  >
                    <ChevronRight className="ico-sm" />
                  </button>
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
    </div>
  );
}
