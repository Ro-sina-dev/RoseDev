import { identity, contact, specs } from "@/data/portfolio";
import { DownloadIcon, MailIcon } from "./Icons";

export default function SpecSheet() {
  return (
    <div className="sheet">
      <p className="model">Modèle 2026 · Disponible immédiatement</p>

      <h2>
        {identity.firstName}
        <br />
        {identity.middleName}
        <br />
        {identity.lastName}
      </h2>

      <p className="role">
        Développeuse mobile <b>Flutter</b> à {identity.city}. {identity.tagline}
      </p>

      <dl className="specs">
        {specs.map((s) => (
          <div className="spec" key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="actions">
        <a className="btn btn-primary" href={identity.cvFile} download>
          <DownloadIcon className="ico-btn" />
          Télécharger le CV
        </a>
        <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
          <MailIcon className="ico-btn" />
          M&apos;écrire
        </a>
      </div>
    </div>
  );
}
