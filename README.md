# Projet Angular Assignments

Suite à des problèmes de temps et d'organisation, aussi nous détaillerons ce qui a été fait puis ce qu'on aurait aimé faire.
 
## Les features implémentés

Notre application a été pensée comme une plateforme pour les enseignants renseignant les devoirs de leurs élèves.

### Connexion

On doit se logger

### Inscription

### La page d'accueil

La page d'accueil affiche par défaut 25 rendus, répartis en deux colonnes. La gauche correspond aux devoirs non rendus, la droite aux devoir rendus. On peut drag and drop d'une colonne à l'autre selon certaines conditions.

On peut drop de la gauche vers la droite (non rendu vers rendu) si une note a été saisie.

On peut drop de la droite vers la gauche (rendu vers non rendu) si aucune note n'a été saisie.

Chaque rendu affiche le nom de la matière, avec l'icone de la matière et une photo du "prof" (0 offense on adore juste les chiens et on avait aucune idée de photo), ainsi que le nom de l'élève concerné et si le rendu est en attente de soumission ou non.

Chaque rendu comporte également un bouton Visualiser permettant de voir le détail :

### Le détail d'un rendu

Le détail d'un rendu permet de visualiser le nom de la matière, la date de rendu, le professeur responsable, le commentaire, la note et s'il a été rendu ou non.
Une checkbox symbolise ce dernier champs, et peut être cochée / décochée directement afin de modifier le rendu.

Pour les autres champs, un bouton Edit permet d'accéder à la page permettant de les modifier.


### Edition de rendu

Cett page permet de modifier le commentaire, la note ou encore la matière à laquelle est rattachée ce rendu.

