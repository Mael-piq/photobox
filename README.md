# Photobox

-- Réalisé par PIQUAND Maël --

Application web permettant de parcourir une galerie de photos via une API.

## Fonctionnalités réalisées

### Affichage d'une photo (Exercice 1)
Au chargement de la page, la photo n°105 est affichée par défaut. Pour chaque photo, on affiche :
- l'image en grand format
- le titre, la description, le type et les dimensions
- la catégorie à laquelle appartient la photo
- les commentaires associés

Ces données sont récupérées via plusieurs requêtes fetch successives à l'API, en utilisant les liens (`links`) retournés dans chaque réponse.

### Affichage d'une galerie (Exercice 2)
Un bouton "load" permet de charger et afficher une liste de photos sous forme de vignettes. Chaque vignette affiche la miniature de la photo et son titre.

### Navigation dans les galeries (Exercice 3)
Des boutons de navigation permettent de parcourir les pages de la galerie :
- **first** : aller à la première page
- **prev** : aller à la page précédente
- **next** : aller à la page suivante
- **last** : aller à la dernière page

La pagination utilise les liens de navigation (`links.next`, `links.prev`, etc.) retournés par l'API.

### Affichage d'une photo depuis la galerie (Exercice 4)
Un clic sur une vignette de la galerie déclenche une requête vers l'API pour récupérer les données complètes de la photo, qui s'affiche ensuite en grand format dans la section dédiée en bas de page, avec sa catégorie et ses commentaires.
