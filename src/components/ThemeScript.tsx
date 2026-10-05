"use client";

/* Choisit le thème avant le premier affichage, pour éviter un flash : le choix
   enregistré s'il existe, sinon le réglage clair/sombre du système. */
const script = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

/**
 * Le script ne s'exécute qu'à l'analyse du HTML envoyé par le serveur. Côté
 * client, React le reçoit en `text/plain` : il n'est pas rejoué et React ne
 * signale pas de balise script.
 */
export default function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
