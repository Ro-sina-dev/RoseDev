# Portfolio — Koffi Amoin Rosine

Portfolio de développeuse mobile construit avec **Next.js 15** (App Router) et **TypeScript**.
Le site est une application mobile : le téléphone au centre est réellement navigable.

# Qui est Koffi Amoin Rosine

Développeuse mobile Flutter à Abidjan, deux ans d'applications menées jusqu'en production. MVVM et Clean Architecture, Provider, API REST, Laravel côté serveur. Ancienne Product Manager, je développe en sachant à quoi sert la fonctionnalité. Disponible en CDI ou en freelance.
## Démarrer

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Modifier le contenu

Tout le contenu est dans **`src/data/portfolio.ts`** : profil, projets, compétences,
parcours, coordonnées. C'est le seul fichier à toucher pour mettre le site à jour.

## Ajouter une capture d'écran à un projet

1. Place l'image dans `public/projets/` (ex. `public/projets/flot.png`)
2. Dans `src/data/portfolio.ts`, ajoute la ligne `image: "/projets/flot.png"` au projet
3. Tu peux aussi ajouter `href: "https://github.com/..."` pour un lien vers le dépôt

## Remplacer le CV

Remplace `public/CV_Rosine_Koffi_Developpeuse_Mobile.pdf` en gardant le même nom,
ou change `identity.cvFile` dans `src/data/portfolio.ts`.

## Mettre en ligne (Vercel, gratuit)

```bash
git init
git add .
git commit -m "Portfolio"
```

Pousse le dépôt sur GitHub, puis va sur vercel.com → **Add New Project** → importe le dépôt.
Vercel détecte Next.js tout seul, aucune configuration à faire.
Chaque `git push` redéploie le site automatiquement.

## Structure

```
src/
  app/
    layout.tsx      polices (next/font), métadonnées SEO
    page.tsx        mise en page : téléphone + fiche technique
    globals.css     tous les styles
  components/
    Phone.tsx       le téléphone et ses écrans (composant client)
    SpecSheet.tsx   la fiche technique (composant serveur)
    Icons.tsx       icônes SVG
  data/
    portfolio.ts    ← tout le contenu du site
public/
  CV_Rosine_Koffi_Developpeuse_Mobile.pdf
```

## Détails d'accessibilité

- Navigation au clavier, focus visible, `Échap` revient à l'accueil
- Glissement vers la droite = retour, sur mobile
- `prefers-reduced-motion` respecté
