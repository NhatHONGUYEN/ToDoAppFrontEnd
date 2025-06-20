# ToDoApp Frontend

## Description

Interface utilisateur de l'application ToDoApp développée avec Angular. Cette application permet aux utilisateurs de gérer facilement leurs tâches quotidiennes avec une interface intuitive et réactive.

## Fonctionnalités

- **Gestion des tâches** : création, modification, suppression et visualisation
- **Filtrage** : affichage des tâches par statut (toutes, en cours, terminées)
- **Interface responsive** : s'adapte à tous les appareils (desktop, tablette, mobile)
- **Authentification sécurisée** : intégration avec Keycloak
- **Dates en français** : affichage des dates dans le format français

## Technologies utilisées

- **Angular 19** : Framework frontend
- **Angular Material** : Bibliothèque de composants UI offrant une interface moderne et intuitive avec des éléments comme MatDialog, MatDatepicker, MatButtons, etc.
- **RxJS** : Programmation réactive
- **Keycloak Angular** : Intégration avec le service d'authentification
- **SCSS** : Styles avancés

## Prérequis

- Node.js 18+
- npm ou yarn
- Backend ToDoApp en cours d'exécution
- Serveur Keycloak configuré

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Ou pour un environnement de développement local
npm run start:local
```

Une fois le serveur démarré, ouvrez votre navigateur à l'adresse `http://localhost:4200/`.

## Build pour la production

```bash
# Générer les fichiers de production
npm run build
```

Les fichiers compilés seront disponibles dans le dossier `dist/`.

## Structure du projet

```
src/
├── app/
│   ├── components/       # Composants réutilisables
│   ├── services/         # Services pour la gestion des données
│   ├── models/           # Interfaces et types
│   ├── shared/           # Éléments partagés (pipes, directives)
│   └── app.component.ts  # Composant racine
├── assets/               # Ressources statiques
└── environments/         # Configuration par environnement
```

## Intégration avec le backend

L'application communique avec le backend via des requêtes HTTP RESTful. Les URLs des API sont configurées dans les fichiers d'environnement.

## Intégration avec Keycloak

L'authentification est gérée par Keycloak. La configuration se trouve dans `src/app/keycloak-init.ts`.

## Commandes Angular CLI

Quelques commandes utiles pour le développement:

```bash
# Démarrer le serveur de développement
ng serve

# Générer un nouveau composant
ng generate component nom-du-composant

# Compiler le projet
ng build
```

## Tests

Aucun test unitaire ou end-to-end n'a été implémenté dans cette version du projet.

## Interface utilisateur avec Angular Material

L'application utilise intensivement Angular Material pour offrir une expérience utilisateur cohérente et moderne:

- **MatDialog** : Pour les fenêtres modales de détail et confirmation
- **MatDatepicker** : Pour la sélection de dates avec support français
- **MatButtons** : Pour des boutons stylisés et réactifs
- **MatCard** : Pour l'affichage des tâches
- **MatFormField** : Pour les formulaires d'ajout et modification
- **MatSnackBar** : Pour les notifications à l'utilisateur
