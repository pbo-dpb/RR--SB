
# Simulateur Budgétaire (v2)

Le Simulateur budgétaire du DPB est un outil en ligne qui permet d’estimer les répercussions potentielles sur les revenus budgétaires fédéraux qu’aurait l’ajustement de divers taux d’imposition, crédits d’impôt et tranches d’imposition.

## Développement

1. Clonez ce dépôt
2. Exécutez `npm install`
3. Servez avec [Vite](https://vitejs.dev/) : `npm run dev`.

## Utilisation en production

1. Exécutez `npm run build`.
2. Cherchez le nom du fichier `isEntry` dans `dist/manifest.json` (le nom du fichier change pour des raisons de suppression du cache).
3. Créez un lien vers le script dans la page HTML.
4. Insérez le composant `<pbotool-rrsb></pbotool-rrsb>`.

## Contact

- [Bureau du directeur parlementaire du budget ](https://www.pbo-dpb.ca) 
- +1-613-992-8026
- [dpb-pbo@parl.gc.ca](mailto:dpb-pbo@parl.gc.ca)