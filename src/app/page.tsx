import Image from "next/image";
import Nav from "@/components/Nav";
import Motion from "@/components/Motion";
import Reel from "@/components/Reel";
import {
  ArrowDown,
  ArrowUpRight,
  CallIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/Icons";
import {
  identity,
  hero,
  about,
  profile,
  contact,
  communities,
  creative,
  realisations,
  faq,
  projectGroups,
  skillGroups,
  qualities,
  experience,
  education,
  type Photo,
  type TimelineItem,
} from "@/data/portfolio";

/** Décale l'apparition d'un élément par rapport à ses voisins. */
const delay = (i: number, step = 90) => ({ "--d": `${i * step}ms` }) as React.CSSProperties;

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

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <header className="head">
      <p className="eyebrow" data-reveal>
        <span>{index}</span>
        {label}
      </p>
      <h2 className="head-title" data-reveal style={delay(1)}>
        {title}
      </h2>
    </header>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="tl">
      {items.map((item, i) => (
        <li
          className={item.current ? "tl-item is-current" : "tl-item"}
          key={item.title + item.when}
          data-reveal
          style={delay(i, 70)}
        >
          <p className="tl-when">{item.when}</p>
          <div>
            <h4>{item.title}</h4>
            <p className="tl-who">{item.who}</p>
            {item.about && <p className="tl-about">{item.about}</p>}
            {item.points && (
              <ul className="tl-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="gallery">
      {photos.map((photo, i) => (
        <figure className="tile" key={photo.label} data-reveal style={delay(i)}>
          {photo.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={photo.src} alt={photo.label} loading="lazy" />
          ) : (
            <span className="tile-empty" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <figcaption>{photo.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Home() {
  const titleWords = hero.title.split(" ");
  const marquee = skillGroups.flatMap((g) => g.items);
  const projects = projectGroups.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));
  /* Le premier bloc du profil reprend le texte « À propos » : on ne l'affiche pas deux fois. */
  const methods = profile.blocks.slice(1);

  return (
    <>
      <Motion />
      <Nav />

      <main id="top">
        {/* ── Accueil ─────────────────────────────────────────── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="badge enter" style={delay(0)}>
                <i className="badge-dot" aria-hidden="true" />
                {identity.badge}
              </p>

              <h1 className="hero-title">
                <span className="hero-name enter" style={delay(1)}>
                  {identity.shortName}
                </span>
                {titleWords.map((word, i) => (
                  <span className="word" key={word + i}>
                    <span
                      className={i === titleWords.length - 1 ? "word-in is-accent" : "word-in"}
                      style={delay(i, 120)}
                    >
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </h1>

              <p className="hero-fields enter" style={delay(3)}>
                {hero.fields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </p>

              <p className="hero-pitch enter" style={delay(4)}>
                {colorise(hero.pitch, hero.highlight)}
              </p>

              <div className="actions enter" style={delay(5)}>
                <a className="btn" href="#projets">
                  Voir mes projets
                  <ArrowDown className="ico" />
                </a>
                <a className="btn btn-ghost" href={identity.cvFile} download>
                  <DownloadIcon className="ico" />
                  Télécharger le CV
                </a>
              </div>
            </div>

            <figure className="portrait">
              <div className="portrait-frame">
                <Image
                  src={identity.photo}
                  alt={`${identity.shortName}, ${identity.role.toLowerCase()}`}
                  width={960}
                  height={1280}
                  sizes="(max-width: 900px) 70vw, 420px"
                  preload
                />
              </div>
              <figcaption className="enter" style={delay(6)}>
                <span>{identity.city}</span>
                {identity.country}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Bandeau défilant ────────────────────────────────── */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy}>
                {marquee.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ── À propos ────────────────────────────────────────── */}
        <section className="section" id="a-propos">
          <div className="wrap split">
            <SectionHead index="01" label="À propos" title={identity.tagline} />

            <div className="split-body">
              <p className="lead" data-reveal>
                {about.text}
              </p>

              <div className="methods">
                {methods.map((block, i) => (
                  <div className="method" key={block.eyebrow} data-reveal style={delay(i)}>
                    <h3>{block.eyebrow}</h3>
                    <p>{block.text}</p>
                  </div>
                ))}
              </div>

              <ul className="tags" data-reveal>
                {profile.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Compétences ─────────────────────────────────────── */}
        <section className="section section-tint" id="competences">
          <div className="wrap">
            <SectionHead
              index="02"
              label="Compétences"
              title="De la maquette au code, sur mobile et sur le web"
            />

            <div className="skills">
              {[...skillGroups, { title: "Qualités", items: qualities, hot: undefined }].map((group, i) => (
                <article className="skill" key={group.title} data-reveal data-spot style={delay(i)}>
                  <p className="skill-index">{String(i + 1).padStart(2, "0")}</p>
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
          </div>
        </section>

        {/* ── Projets ─────────────────────────────────────────── */}
        <section className="section" id="projets">
          <div className="wrap">
            <SectionHead
              index="03"
              label="Projets"
              title="Du premier écran à la mise en production"
            />

            <div className="projects">
              {projects.map((project, i) => {
                const Tag = project.href ? "a" : "article";
                return (
                  <Tag
                    className={["project", project.kind === "web" ? "is-wide" : ""].join(" ").trim()}
                    key={project.name}
                    data-reveal
                    data-spot
                    style={delay(i % 2, 120)}
                    {...(project.href
                      ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <div className={project.kind === "mobile" ? "project-cover is-screen" : "project-cover"}>
                      {project.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={project.image} alt="" loading="lazy" />
                      ) : (
                        <span className="project-mono" aria-hidden="true">
                          {project.name}
                        </span>
                      )}
                      <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="project-body">
                      <p className="project-meta">
                        {project.group} · {project.meta}
                      </p>
                      <h3>
                        {project.name}
                        {project.href && <ArrowUpRight className="ico" />}
                      </h3>
                      <p className="project-text">{project.description}</p>
                      <ul className="chips">
                        {project.stack.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Parcours ────────────────────────────────────────── */}
        <section className="section section-tint" id="parcours">
          <div className="wrap">
            <SectionHead
              index="04"
              label="Parcours"
              title="Du web au mobile, puis en freelance"
            />

            <div className="journey">
              <div>
                <h3 className="journey-title" data-reveal>
                  Expérience
                </h3>
                <Timeline items={experience} />
              </div>
              <div>
                <h3 className="journey-title" data-reveal>
                  Formation
                </h3>
                <Timeline items={education} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Au-delà du code ─────────────────────────────────── */}
        <section className="section" id="au-dela">
          <div className="wrap">
            <SectionHead index="05" label="Au-delà du code" title="Communautés et création visuelle" />

            <div className="beyond">
              <article className="beyond-item">
                <h3 data-reveal>{communities.title}</h3>
                <p data-reveal style={delay(1)}>
                  {colorise(communities.text, communities.highlight)}
                </p>
                <Gallery photos={communities.photos} />
              </article>
              <article className="beyond-item">
                <h3 data-reveal>{creative.title}</h3>
                <p data-reveal style={delay(1)}>
                  {colorise(creative.text, creative.highlight)}
                </p>
                <p className="beyond-hint" data-reveal style={delay(2)}>
                  Mes réalisations défilent ci-dessous
                  <ArrowDown className="ico" />
                </p>
              </article>
            </div>
          </div>

          <Reel works={realisations} />
        </section>

        {/* ── Questions fréquentes ────────────────────────────── */}
        <section className="section section-tint" id="faq">
          <div className="wrap split">
            <header className="head">
              <p className="eyebrow" data-reveal>
                <span>06</span>
                FAQ
              </p>
              <h2 className="head-title" data-reveal style={delay(1)}>
                Questions fréquentes.
              </h2>
              <p className="head-sub" data-reveal style={delay(2)}>
                Une question qui n&apos;est pas ici ?{" "}
                <a href={`mailto:${contact.email}`}>Écrivez-moi directement.</a>
              </p>
            </header>

            {/* `name` commun : ouvrir une question referme la précédente. */}
            <div className="faq">
              {faq.map((item, i) => (
                <details
                  className="faq-item"
                  name="faq"
                  key={item.question}
                  open={i === 0}
                  data-reveal
                  style={delay(i, 60)}
                >
                  <summary>
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q">{item.question}</span>
                    <i className="faq-plus" aria-hidden="true" />
                  </summary>
                  <p className="faq-a">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section className="contact" id="contact">
          <div className="wrap">
            <p className="eyebrow" data-reveal>
              <span>07</span>
              Contact
            </p>
            <h2 className="contact-title" data-reveal style={delay(1)}>
              Dites-moi ce que vous <em>construisez</em>.
            </h2>

            <a className="contact-mail" href={`mailto:${contact.email}`} data-reveal style={delay(2)}>
              <span>{contact.email}</span>
              <ArrowUpRight className="ico" />
            </a>

            <div className="contact-grid" data-reveal style={delay(3)}>
              <div>
                <p className="contact-label">{identity.availability.title}</p>
                <p>{identity.availability.detail}</p>
              </div>

              <ul className="contact-links">
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <MailIcon className="ico" />
                    E-mail
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref}>
                    <CallIcon className="ico" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="ico" />
                    {contact.githubLabel}
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="ico" />
                    LinkedIn
                  </a>
                </li>
              </ul>

              <a className="btn btn-light" href={identity.cvFile} download>
                <DownloadIcon className="ico" />
                Télécharger le CV
              </a>
            </div>
          </div>

          <footer className="footer wrap">
            <p>
              © {new Date().getFullYear()} {identity.shortName} · {identity.city}, {identity.country}
            </p>
            <a href="#top">Retour en haut ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
