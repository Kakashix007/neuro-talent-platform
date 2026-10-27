# 🧠 NEURO TALENT — Plateforme d'Optimisation Neuro-Cognitive & Comportementale

> **Plateforme numérique développée par NEUROMAROC**  
> Déployée dans le cadre du programme pilote d'accompagnement cognitif et comportemental pour les **66 collaborateurs et cadres du Ministère de l’Industrie et du Commerce (Royaume du Maroc)**.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Platform-0d9488?style=for-the-badge&logo=vercel)](https://kakashix007.github.io/neuro-talent-platform/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Compliance](https://img.shields.io/badge/CNDP-Loi%2009--08-success?style=for-the-badge)](https://www.cndp.ma/)

---

## 🌐 Liens d'accès direct

* 🚀 **Démo interactive en ligne (GitHub Pages) :**  
  👉 **[https://kakashix007.github.io/neuro-talent-platform/](https://kakashix007.github.io/neuro-talent-platform/)**
* 📁 **Dépôt GitHub officiel :**  
  👉 **[https://github.com/Kakashix007/neuro-talent-platform](https://github.com/Kakashix007/neuro-talent-platform)**

---

## 🏛️ Présentation du Projet

**NEURO TALENT** est une solution SaaS souveraine conçue pour renforcer la clarté mentale, la régulation émotionnelle sous stress, l'agilité décisionnelle et l'intelligence collective des cadres et hauts fonctionnaires de l'administration publique.

### 🎯 Objectifs de la Phase Pilote :
1. **Évaluation psychométrique initiale (T0)** et finale (T1) des 66 agents pilotes.
2. **Parcours individualisé** basé sur un algorithme d'orientation déterministe.
3. **Pédagogie neuro-scientifique vulgarisée** adossée à des revues académiques à comité de lecture (*Peer-Reviewed*).
4. **Tableau de bord institutionnel et conformité stricte CNDP (Loi n° 09-08)** garantissant l'anonymisation des métriques.

---

## 🧩 Architecture des 4 Piliers & 12 Modules

| Pilier Cognitif | Modules | Protocoles Opérationnels | Références Scientifiques |
| :--- | :--- | :--- | :--- |
| **I. Attention & Clarté Mentale** | M1 à M3 | Bloc Hermétique 45/10, Méthode R.A.I.D., Décharge D.E.C.O.D.E. | *Dr. Sophie Leroy (Univ. Washington), Pr. Earl Miller (MIT), Pr. John Sweller* |
| **II. Régulation Émotionnelle & Stress** | M4 à M6 | Protocole S.T.O.P., Cohérence Cardiaque 0,1 Hz, Chrono-Régulation D.S.B. | *Pr. James Gross (Stanford), Pr. Antonio Damasio, Dr. Stephen Porges* |
| **III. Prise de Décision & Agilité** | M7 à M9 | Pre-Mortem Gary Klein, Bascule Mentale ACC, Matrice M.A.P.S. | *Pr. Daniel Kahneman (Prix Nobel), Cass Sunstein (Harvard), Philip Tetlock* |
| **IV. Co-Régulation & Leadership** | M10 à M12 | Écoute Résonante, Débriefing Sans Blâme (DSB), Négociation Harvard | *Pr. Giacomo Rizzolatti, Pr. Amy Edmondson (Harvard), William Ury* |

---

## ✨ Fonctionnalités Majeures

* **📊 Évaluation Psychométrique T0/T1 :** 12 items contextualisés au quotidien administratif avec calcul mathématique normalisé ($S_p$ et $S_{Global}$) et moteur d'orientation prioritaire.
* **🎓 Modale de Formation Enrichie :** Accordéon par leçon avec fondement neurobiologique, cas pratique concret au Ministère (MIC) et protocole immédiat.
* **🎧 Studio Multimédia :** Exercices guidés de cohérence cardiaque (0,1 Hz / 6 respirations par minute) et décharge cognitive d'urgence (*Flash Reset* 3 min) avec scripts verbatim.
* **📈 Espace Administration & Reporting :** Suivi de cohorte en temps réel avec attestation de conformité CNDP Loi 09-08 (`NM-MIC-PILOT-T1`).
* **🌍 Trilinguisme Intégral :** Français, Arabe (avec disposition et typographie RTL native) et Anglais.
* **📱 100% Responsive :** Optimisé pour smartphone, tablette et poste de travail bureautique.

---

## 🛠️ Stack Technique

* **Framework :** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Bibliothèque UI :** React 19, [Lucide React Icons](https://lucide.dev/)
* **Langage :** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styles :** CSS Design System moderne avec variables sémantiques, Dark/Light mode adaptatif
* **Déploiement :** GitHub Pages (SSG via `output: 'export'`)

---

## 🚀 Installation et Lancement Local

### Prérequis
* Node.js 18.18+ ou 20+
* npm, pnpm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/Kakashix007/neuro-talent-platform.git
cd neuro-talent-platform
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 4. Build de production
```bash
npm run build
npm start
```

---

## 📦 Déploiement sur GitHub Pages

Pour recompiler et mettre à jour le site statique hébergé sur GitHub Pages :

```bash
GITHUB_PAGES=true npm run build
touch out/.nojekyll
git -C out init
git -C out checkout -B gh-pages
git -C out add -A
git -C out commit -m "Deploy update to gh-pages"
git -C out remote add origin https://github.com/Kakashix007/neuro-talent-platform.git
git -C out push -f origin gh-pages
rm -rf out
```

---

## 📜 Conformité Réglementaire et Données Personnelles

La plateforme **NEURO TALENT** est strictement conforme à la **Loi marocaine n° 09-08** relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel (CNDP) :
* Métriques de pilotage 100 % agrégées et anonymisées pour la hiérarchie.
* Cadre de développement des compétences professionnelles strictement non-médical.
* Hébergement souverain des données au Maroc.

---

## 👨‍💻 Auteur & Gestion de Projet

* **Chef de Projet IT :** Mouhcine TARYAOUI
* **Organisation :** NEUROMAROC
* **Partenaire :** Ministère de l’Industrie et du Commerce du Royaume du Maroc

---
*© 2026 NEUROMAROC. Tous droits réservés.*
