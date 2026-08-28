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
  { label: "Système", value: "Flutter · Dart" },
  { label: "Architecture", value: "MVVM · Clean Architecture" },
  { label: "État", value: "Provider" },
  { label: "Réseau", value: "API REST · Google Maps" },
  { label: "Web", value: "Laravel · PHP · MySQL" },
  { label: "Méthode", value: "Agile · Git · revues de code" },
  { label: "Expérience", value: "2 ans, applications en production" },
];

export const profile = {
  blocks: [
    {
      eyebrow: "En deux phrases",
      text: "Je construis des applications mobiles en Flutter depuis deux ans, de la maquette à la mise en production. J'aime les interfaces qui répondent au doigt sans hésiter et le code qu'une autre développeuse peut reprendre sans notice.",
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
        name: "Hygie",
        meta: "CapCoding-Studio · 2025–2026",
        description:
          "Application mobile développée en équipe. J'ai construit des fonctionnalités et leurs interfaces en suivant une Clean Architecture, avec gestion du code sous GitLab et revues de code à chaque Pull Request.",
        stack: ["Flutter", "Clean Architecture", "MVVM", "GitLab"],
      },
      {
        name: "Flot.",
        meta: "Prestation · 2025",
        description:
          "Application de signalement de radars sur carte, développée seule de bout en bout. Géolocalisation en temps réel via l'API Google Maps, consommation d'API REST et tests unitaires sur la logique métier.",
        stack: ["Flutter", "Google Maps API", "MVVM", "Tests unitaires"],
      },
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
  {
    title: "Web",
    items: [
      {
        name: "Dughu & Deeltoo",
        meta: "DUGHU · 2024–2025",
        description:
          "Deux sites développés en Laravel, front-end et back-end. Intégration responsive et travail rapproché avec les équipes design et backend.",
        stack: ["Laravel", "PHP", "MySQL", "JavaScript"],
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
