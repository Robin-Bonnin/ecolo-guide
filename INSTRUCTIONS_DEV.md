# Guide Écolo Thaïlande — Instructions de déploiement

## Stack
- HTML/JS statique (pas de framework)
- Vercel (hébergement + serverless functions)
- Neon (PostgreSQL)

## Structure du projet
```
api/
  admin-login.js
  entries.js
  events.js
  suggestions.js
  who.js
guide.html        ← le site complet (HTML standalone ~1MB)
package.json      ← juste @neondatabase/serverless
vercel.json       ← routing
.gitignore
```

## Variables d'environnement Vercel
```
DATABASE_URL=postgresql://neondb_owner:npg_yZNB5SLoTK0U@ep-lucky-art-ao44juv7.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
ADMIN_PASSWORD=ecobkk2026
```

## Base de données Neon
Tables déjà créées sur le projet Neon existant.
Compte Neon : à récupérer auprès de Charlotte.

## Déploiement
1. Créer un repo GitHub avec les fichiers ci-dessus
2. Connecter sur vercel.com
3. Ajouter les 2 variables d'environnement
4. Deploy — pas de build step, site statique direct

## Backoffice
URL : https://[votre-url].vercel.app
Cliquer sur "Admin" en haut à droite
Mot de passe : ecobkk2026

## Notes
- Les 330+ entrées écolo sont embarquées dans guide.html (statique)
- Les nouvelles entrées ajoutées via backoffice → Neon (table entries)
- Les suggestions du formulaire public → Neon (table suggestions)
- Les événements et textes "Qui sommes-nous" → Neon (tables events, who_content)
- Le backoffice fait des appels fetch() vers /api/* pour lire/écrire en base
