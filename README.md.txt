# Site vitrine — Antoine Mercier, Paid Media Manager freelance

Site vitrine statique one-page, sans dépendance, prêt à déployer.

## Structure

- `index.html` — structure et contenu (FR)
- `styles.css` — styles (thème épuré & premium, sombre + accents or)
- `script.js` — interactions (menu mobile, header au scroll, animations, validation formulaire)

## Sections

1. Hero (titre, statistiques clés, CTA)
2. Plateformes maîtrisées
3. Services (6 prestations)
4. Méthode (processus en 4 temps) + badges d'expertise
5. Cas clients (3 études de cas avec résultats chiffrés)
6. Témoignages (3)
7. À propos + encart « pourquoi un freelance »
8. Contact (coordonnées + formulaire de demande de devis)
9. Footer

## Personnalisation rapide

- **Nom / marque** : remplacer `Antoine Mercier` et le monogramme `AM` dans `index.html`.
- **Coordonnées** : `mercierantoine7@gmail.com`, `+33 6 58 02 24 75`, lien LinkedIn dans la section Contact et le footer.
- **Statistiques & résultats** : chiffres du hero et des cas clients sont des exemples à remplacer par vos données réelles.
- **Témoignages** : noms et rôles anonymisés à personnaliser.
- **Formulaire** : soumission côté client (affichage de confirmation). Pour recevoir réellement les demandes, connectez un service (Formspree, Tally, Netlify Forms, ou votre propre endpoint) en modifiant la gestion du `submit` dans `script.js`.

## Déploiement

Aucune build. Héberger les trois fichiers tels quels.

### GitHub Pages
Pousser sur un dépôt, puis activer Pages (Settings → Pages → branche `main` / dossier racine).

### Netlify
Glisser-déposer le dossier sur app.netlify.com, ou connecter le dépôt.

### Vercel
`vercel deploy` depuis le dossier, ou importer le dépôt.

### Test local
Ouvrir `index.html` dans un navigateur, ou servir le dossier :
```bash
python3 -m http.server 8000