import Phone from "@/components/Phone";
import SpecSheet from "@/components/SpecSheet";
import { identity, contact } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <header className="site-head">
        <span>
          <span className="head-dot" />
          <b>{identity.shortName}</b> — Développeuse mobile
        </span>
        <span>
          {identity.city} · {identity.country}
        </span>
      </header>

      <main className="stage">
        <div className="device-col">
          <Phone />
          <p className="caption">Portfolio jouable — glissez, touchez, explorez</p>
        </div>
        <SpecSheet />
      </main>

      <footer className="site-foot">
        <span>© {new Date().getFullYear()} {identity.firstName} {identity.middleName} {identity.lastName}</span>
        <span>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>{" · "}
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>{" · "}
          <a href={`mailto:${contact.email}`}>E-mail</a>
        </span>
      </footer>
    </>
  );
}
