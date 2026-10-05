/**
 * Tout le contenu du portfolio est ici.
 * Pour mettre à jour le site, modifie ce fichier — rien d'autre.
 */

export const identity = {
  firstName: "Koffi",
  middleName: "Amoin",
  lastName: "Rosine",
  shortName: "Rosine Koffi",
  role: "Designer Développeuse",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  tagline: "Je vous aide à développer votre idée.",
  homeIntro:
    "Designer Développeuse. Ce portfolio est une application — touchez une icône pour l'explorer.",
  availability: {
    title: "Disponible pour un poste",
    detail: "Abidjan · CDI ou freelance",
  },
  cvFile: "/CV%20Rosine.Koffi.developer.pdf",
  photo: "/rosine-koffi.jpg",
  /** Badge affiché en haut de la première section. */
  badge: "Disponible pour vous",
};

/** Accroche de la première section. */
export const hero = {
  title: "Designer Développeuse",
  /** Ligne de spécialités affichée sous le titre. */
  fields: ["UI/UX Design", "Développement Mobile", "Développement Web", "Agents IA"],
  pitch:
    "Je conçois, développe et livre des produits web et mobiles robustes, du cahier des charges jusqu'à la mise en production.",
  /** Ces expressions sont mises en couleur dans l'accroche. */
  highlight: ["produits web et mobiles robustes"],
};

/**
 * Photo d'une section illustrée. Laisse `src` vide tant que tu n'as pas
 * l'image : une vignette numérotée avec la légende s'affiche à la place.
 */
export type Photo = { src?: string; label: string };

/** Section « Communautés ». */
export const communities = {
  title: "GOS Creative & Vision Tech",
  text:
    "Je fais partie de communautés tech à Abidjan, dont GOS Creative et Vision Tech. J'ai aussi un compte TikTok où je partage mon expérience.",
  highlight: ["GOS Creative", "Vision Tech", "TikTok"],
  photos: [
    { label: "GOS Creative", src: "/gocreatve.jpeg" },
    { label: "Rencontres", src: "/gocreatve1.jpeg" },
    { label: "Événements", src: "/gocreatvee.jpeg" },
  ] as Photo[],
};

/** Section « Création visuelle ». */
export const creative = {
  title: "Graphiste, vidéaste, photographe",
  text: "En dehors du code, je conçois des visuels, je filme et je photographie. Affiches, identités, montages et captations d'événements : je livre des supports prêts à publier.",
  highlight: ["Affiches, identités", "captations d'événements"],
};

/**
 * Réalisations visuelles : elles défilent en bandeau sous la section.
 * Pour en ajouter une, mets l'image dans /public et ajoute une ligne ici.
 */
export const realisations: Photo[] = [
  { label: "Affiche · Grain de Café", src: "/caf%C3%A9et%20the.png" },
  { label: "Identité visuelle · Ovoafrica", src: "/identite.jpeg" },
  { label: "Étiquette · Néova", src: "/shampoing.png" },
  { label: "Captation d'événement", src: "/montage.jpeg" },
  { label: "Étiquette · Chaléa", src: "/calea.png" },
  { label: "Étiquette · Racina", src: "/racina.png" },
  { label: "Reels", src: "/reelmaker.jpeg" },
  { label: "Étiquette · Vitalya", src: "/Vitalya.png" },
];

/** Texte de la section « À propos ». Modifie-le librement. */
export const about = {
  title: "À propos de moi",
  text:
    "Je m'appelle Rosine, je vis à Abidjan et je construis des applications web et mobiles. J'aime les interfaces fluides et le code facile à reprendre. Mon passage par le Product Management m'a appris à comprendre un besoin avant de le développer.",
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
  /** Optionnel : mets une image dans /public et indique son chemin, ex. "/meteo.jpeg" */
  image?: string;
  /** "mobile" pour une capture d'écran de téléphone (verticale), "web" pour une capture de site. */
  kind?: "mobile" | "web";
  /** Optionnel : lien vers le dépôt ou la démo */
  href?: string;
};

export const projectGroups: { title: string; items: Project[] }[] = [
  {
    title: "Produit web",
    items: [
      {
        name: "Alpha Sécurité",
        meta: "Product Manager",
        description:
          "Application de sécurité privée : réserver un agent certifié, rejoindre une communauté de vigilance citoyenne et lancer une alerte locale. J'y ai piloté le produit en télétravail comme Product Manager : roadmap, priorisation et coordination de l'équipe.",
        stack: ["Product Management", "Roadmap", "Flutter", "Vue.js"],
        image: "/alpha.png",
        kind: "web",
      },
      {
        name: "Stediihome",
        meta: "Product Manager",
        description:
          "Plateforme qui met en relation des employeurs et du personnel domestique au profil vérifié. J'y ai tenu le rôle de Product Manager : roadmap, priorisation et coordination de l'équipe à distance.",
        stack: ["Product Management", "Roadmap", "UI/UX", "Flutter", "Vue.js"],
        image: "/product.png",
        kind: "web",
      },
    ],
  },
  {
    title: "Applications mobiles",
    items: [
      {
        name: "Gestion d'événements",
        meta: "Projet personnel",
        description:
          "Application de création et de suivi d'événements. Terrain d'essai pour une navigation fluide et une interface pensée pour le pouce plutôt que pour la souris.",
        stack: ["Flutter", "UI/UX", "Provider"],
        image: "/event.jpeg",
        kind: "mobile",
      },
      {
        name: "Météo",
        meta: "Projet personnel",
        description:
          "Prévisions par géolocalisation avec visualisation des données climatiques sur plusieurs jours, alimentées par une API open source en temps réel.",
        stack: ["Flutter", "API REST", "Dart"],
        image: "/meteo.jpeg",
        kind: "mobile",
      },
    ],
  },
];

export const skillGroups: { title: string; items: string[]; hot?: string[] }[] = [
  {
    title: "Frontend & Mobile",
    items: [
      "HTML5 / CSS3",
      "React",
      "Flutter / Dart",
      "JavaScript / TypeScript",
      "Next.js",
      "Responsive design",
    ],
    hot: ["Flutter / Dart", "React"],
  },
  {
    title: "Backend & Bases de données",
    items: ["Laravel", "Java / Spring Boot (base)", "SQL", "PostgreSQL", "MySQL", "API REST"],
  },
  {
    title: "Outils & Design",
    items: [
      "Jira",
      "GitLab",
      "GitHub",
      "Linear",
      "Slack",
      "Figma",
      "Canva",
      "Photoshop",
      "CapCut",
      "IA & Productivité",
    ],
    hot: ["Figma"],
  },
];

/** Qualités personnelles, affichées à côté des compétences. */
export const qualities: string[] = [
  "Créativité",
  "Capacité d'adaptation",
  "Excellentes compétences relationnelles",
  "Esprit d'équipe",
  "Autonome",
];

export type TimelineItem = {
  when: string;
  title: string;
  who: string;
  current?: boolean;
  /** Optionnel : une phrase sur l'entreprise ou le produit. */
  about?: string;
  /** Optionnel : ce que tu y as fait, une ligne par point. */
  points?: string[];
};

export const experience: TimelineItem[] = [
  {
    when: "MARS 2026 — AUJOURD'HUI",
    title: "Développeuse freelance",
    who: "Indépendante",
    current: true,
    points: [
      "Conception et développement de sites et d'applications web et mobile.",
      "Conception d'interfaces et intégration de maquettes UI/UX.",
    ],
  },
  {
    when: "OCT. 2025 — MARS 2026",
    title: "Développeuse d'application mobile",
    who: "CapCoding-Studio · à distance",
    about:
      "Hygie CapCoding est une solution simple et efficace qui digitalise et centralise tous les relevés d'hygiène importants en cuisine.",
    points: [
      "Conception et intégration d'interfaces mobiles.",
      "Développement de fonctionnalités avec Flutter et Dart.",
      "Mise en place de Clean Architecture et MVVM.",
      "Collaboration avec les équipes Design et Backend.",
      "Participation au suivi Agile du projet.",
    ],
  },
  {
    when: "JUIN — OCT. 2025",
    title: "Développeuse mobile prestataire",
    who: "Flot.",
    about:
      "Flot permet aux chauffeurs VTC d'Abidjan de devenir propriétaires de leur véhicule électrique, grâce à un financement accessible.",
    points: [
      "Développement de l'application mobile Flot avec Flutter.",
      "Mise en place de l'architecture MVVM.",
      "Intégration des API REST et collaboration avec l'équipe Backend.",
      "Implémentation de la géolocalisation avec Radar et Google Maps.",
      "Développement de tests unitaires pour améliorer la fiabilité de l'application.",
    ],
  },
  {
    when: "JUIL. 2024 — JUIL. 2025",
    title: "Développeuse web",
    who: "DUGHU",
    about:
      "Dughu Develop est une entreprise innovante spécialisée dans le développement de plateformes numériques à fort impact.",
    points: [
      "Création des sites Dughu et Deeltoo : backend et frontend avec Laravel.",
      "Collaboration avec les équipes backend et design pour intégrer les fonctionnalités et optimiser l'expérience utilisateur.",
      "Travail en équipe, intégration responsive et gestion de projet agile.",
    ],
  },
];

export const education: TimelineItem[] = [
  { when: "2022 — 2024", title: "Licence en bases de données", who: "Université Virtuelle de Côte d'Ivoire" },
  { when: "2023 — 2024", title: "Certificat en développement web et mobile", who: "Simplon Côte d'Ivoire" },
];

/** Section « Questions fréquentes ». Une ligne par question. */
export const faq: { question: string; answer: string }[] = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer:
      "Des sites vitrines et institutionnels, des applications web et mobiles sur-mesure, des interfaces UI/UX de la maquette à l'intégration, et des agents IA. Je réalise aussi des supports visuels : identités, affiches et étiquettes.",
  },
  {
    question: "Avez-vous déjà travaillé sur des produits en production ?",
    answer:
      "Oui. J'ai développé l'application mobile Flot pour les chauffeurs VTC d'Abidjan, travaillé sur Hygie chez CapCoding-Studio, et créé les sites Dughu et Deeltoo.",
  },
  {
    question: "Développez-vous des agents IA ?",
    answer:
      "Oui. Je conçois des agents IA et des automatisations adaptés à un besoin précis, intégrés à votre site ou à votre application.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Flutter et Dart pour le mobile, React, Next.js et TypeScript pour le web, Laravel côté serveur, avec PostgreSQL ou MySQL pour les données. Je conçois les maquettes sur Figma.",
  },
  {
    question: "Travaillez-vous avec des clients hors de Côte d'Ivoire ?",
    answer:
      "Oui. Je suis basée à Abidjan et je travaille à distance sur des projets locaux comme internationaux.",
  },
  {
    question: "Comment démarrer un projet avec vous ?",
    answer:
      "Écrivez-moi par e-mail en décrivant votre idée. Nous en discutons, je vous propose un cadrage (périmètre, délais, budget), puis je démarre la conception.",
  },
];

/** Liste à plat des projets, dans l'ordre d'affichage du diaporama. */
export const allProjects: Project[] = projectGroups.flatMap((g) => g.items);
