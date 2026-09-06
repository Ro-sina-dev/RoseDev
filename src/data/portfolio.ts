/**
 * Tout le contenu du portfolio est ici.
 * Pour mettre à jour le site, modifie ce fichier — rien d'autre.
 */

export const identity = {
  firstName: "Koffi",
  middleName: "Amoin",
  lastName: "Rosine",
  shortName: "Rosine Koffi",
  role: "Développeuse mobile Flutter",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  tagline: "Je conçois des applications que l'on garde sur son écran d'accueil.",
  homeIntro:
    "Développeuse mobile Flutter. Ce portfolio est une application — touchez une icône pour l'explorer.",
  availability: {
    title: "Disponible pour un poste",
    detail: "Abidjan · CDI ou freelance",
  },
  cvFile: "/CV_Rosine_Koffi_Developpeuse_Mobile.pdf",
  photo: "/rosine-koffi.jpg",
  /** Badge affiché en haut de la première section. */
  badge: "Disponible · Software Engineer",
};

/** Accroche de la première section. */
export const hero = {
  title: "Développeuse Mobile & Formatrice",
  pitch:
    "J'aide les entreprises à transformer leurs idées en applications mobiles robustes grâce à des architectures modernes et à l'intelligence artificielle. Mon objectif : créer des produits performants, évolutifs et centrés sur l'utilisateur pour accélérer leur croissance.",
  /** Ces expressions sont mises en couleur dans l'accroche. */
  highlight: ["applications mobiles robustes", "intelligence artificielle"],
};

/**
 * Photo d'une section illustrée. Laisse `src` vide tant que tu n'as pas
 * l'image : un cadre avec la légende s'affiche à la place.
 */
export type Photo = { src?: string; label: string };

/** Section « Communautés ». */
export const communities = {
  title: "GOS Creative & Vision Tech",
  text: "Je fais grandir des communautés tech à Abidjan. Chez GOS Creative, je suis responsable de l'extension de la communauté dans les autres villes du pays. Chez Vision Tech, je suis responsable événementiel : organisation, logistique et animation des rencontres.",
  highlight: ["GOS Creative", "Vision Tech"],
  photos: [
    { label: "GOS Creative", src: "" },
    { label: "Vision Tech", src: "" },
    { label: "Rencontres", src: "" },
  ] as Photo[],
};

/** Section « Création visuelle ». */
export const creative = {
  title: "Graphiste, vidéaste, photographe",
  text: "En dehors du code, je conçois des visuels, je filme et je photographie. Affiches, identités, montages et captations d'événements : je livre des supports prêts à publier.",
  highlight: ["Affiches, identités", "captations d'événements"],
  photos: [
    { label: "Graphisme", src: "" },
    { label: "Vidéo", src: "" },
    { label: "Photo", src: "" },
  ] as Photo[],
};

/** Texte de la section « À propos ». Modifie-le librement. */
export const about = {
  title: "À propos de moi",
  text: "Je m'appelle Rosine, je vis à Abidjan et je construis des applications mobiles en Flutter. J'ai commencé par le web, puis j'ai trouvé ce qui me plaît vraiment : des interfaces qui répondent au doigt sans hésiter, et du code qu'une autre développeuse peut reprendre sans notice. En dehors du code, j'ai piloté des produits comme Product Manager — j'ai appris à comprendre pourquoi une fonctionnalité est demandée avant de l'écrire.",
};

export const contact = {
  email: "rose88koffi@gmail.com",
  phone: "+225 07 88 06 44 51",
  phoneHref: "tel:+2250788064451",
  github: "https://github.com/Ro-sina-dev",
  githubLabel: "github.com/Ro-sina-dev",
  linkedin: "https://www.linkedin.com/in/rosine-koffi-a9ba55234",
  linkedinLabel: "Rosine Koffi",
};

/** Fiche technique affichée à côté du téléphone. */
export const specs: { label: string; value: string }[] = [

];

export const profile = {
  blocks: [
    {
      eyebrow: "En deux phrases",
      text: "Je construis des applications mobiles en Flutter depuis trois ans, de la maquette à la mise en production. J'aime les interfaces qui répondent au doigt sans hésiter et le code qu'une autre développeuse peut reprendre sans notice.",
    },
    {
      eyebrow: "Ma façon de travailler",
      text: "Je structure mes applications en MVVM et Clean Architecture, je gère l'état avec Provider et je consomme des API REST. Je travaille sous Git et GitLab, avec branches, Pull Requests et revues de code, en équipe agile.",
    },
    {
      eyebrow: "En plus du code",
      text: "J'ai piloté des produits comme Product Manager : roadmap, priorisation, coordination d'équipes à distance. Concrètement, je comprends pourquoi une fonctionnalité est demandée avant de la développer.",
    },
  ],
  tags: ["Ouverte aux opportunités", "Abidjan", "CDI · Freelance"],
};

export type Project = {
  name: string;
  meta: string;
  description: string;
  stack: string[];
  /** Optionnel : mets une image dans /public et indique son chemin, ex. "/projets/flot.png" */
  image?: string;
  /** Optionnel : lien vers le dépôt ou la démo */
  href?: string;
};

export const projectGroups: { title: string; items: Project[] }[] = [
  {
    title: "Applications mobiles",
    items: [
      {
        name: "Gestion d'événements",
        meta: "Projet personnel",
        description:
          "Application de création et de suivi d'événements. Terrain d'essai pour une navigation fluide et une interface pensée pour le pouce plutôt que pour la souris.",
        stack: ["Flutter", "UI/UX", "Provider"],
      },
      {
        name: "Météo",
        meta: "Projet personnel",
        description:
          "Prévisions par géolocalisation avec visualisation des données climatiques sur plusieurs jours, alimentées par une API open source en temps réel.",
        stack: ["Flutter", "API REST", "Dart"],
      },
    ],
  },
];

export const skillGroups: { title: string; items: string[]; hot?: string[] }[] = [
  {
    title: "Mobile",
    items: [
      "Flutter",
      "Dart",
      "React Native",
      "MVVM",
      "Clean Architecture",
      "Provider",
      "API REST",
      "Google Maps API",
      "Tests unitaires",
    ],
    hot: ["Flutter", "Dart"],
  },
  { title: "Web", items: ["Laravel", "PHP", "JavaScript", "HTML", "CSS"] },
  { title: "Données", items: ["MySQL", "PostgreSQL"] },
  {
    title: "Outils & méthodes",
    items: ["Git", "GitHub", "GitLab", "Jira", "Agile / Scrum", "Revues de code", "Figma", "Adobe XD"],
  },
];

export type TimelineItem = { when: string; title: string; who: string; current?: boolean };

export const experience: TimelineItem[] = [
  { when: "OCT. 2025 — MARS 2026", title: "Développeuse d'applications mobiles", who: "CapCoding-Studio", current: true },
  { when: "SEPT. 2025", title: "Product Manager", who: "Stediihome" },
  { when: "JUIN — OCT. 2025", title: "Développeuse mobile, prestataire", who: "Flot." },
  { when: "JUIL. 2025", title: "Product Manager", who: "Alpha Sécurité · télétravail" },
  { when: "JUIL. 2024 — JUIL. 2025", title: "Développeuse web", who: "DUGHU" },
  { when: "JUIL. 2023 — JUIL. 2024", title: "Développeuse web et mobile, stage", who: "Simplon Côte d'Ivoire" },
];

export const education: TimelineItem[] = [
  { when: "2022 — 2024", title: "Licence 3, bases de données", who: "Université Virtuelle de Côte d'Ivoire" },
  { when: "2023 — 2024", title: "Certificat développement web et mobile", who: "Simplon Côte d'Ivoire" },
  { when: "2021", title: "Baccalauréat série D", who: "Lycée Antoine Gauze, Daloa" },
];

/** Liste à plat des projets, dans l'ordre d'affichage du diaporama. */
export const allProjects: Project[] = projectGroups.flatMap((g) => g.items);
