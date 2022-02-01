# Projet Angular Assignments

Suite à des problèmes de temps et d'organisation, nous n'avons pas pus produire un travail qui nous aurait véritablement satisfait, toutefois nous avons essayer de répondre au mieux aux consignes.
 
## Les features implémentés

Notre application a été pensée comme une plateforme pour les enseignants renseignant les devoirs de leurs élèves.

### Connexion

On doit se logger avec login / password (par défaut on utilise Lorens / Lorens)

### Inscription

On peut s'enregistrer via un petit formulaire dans la base de donnée.

### La page d'accueil

La page d'accueil affiche par défaut 25 rendus, répartis en deux colonnes. La gauche correspond aux devoirs non rendus, la droite aux devoir rendus. On peut drag and drop d'une colonne à l'autre selon certaines conditions.

On peut drop de la gauche vers la droite (non rendu vers rendu) si une note a été saisie.

On peut drop de la droite vers la gauche (rendu vers non rendu) si aucune note n'a été saisie.

Un système de pagination a été mis en place. Au départ nous avions du scolling infini, mais il avait tendance à faire bugger le drag and drop, donc nous nous sommes tournés vers la pagination.

Chaque rendu affiche le nom de la matière, avec l'icone de la matière et une photo du "prof" (0 offense on adore juste les chiens et on avait aucune idée de photo), ainsi que le nom de l'élève concerné et si le rendu est en attente de soumission ou non.

Chaque rendu comporte également un bouton Visualiser permettant de voir le détail :

### Le détail d'un rendu

Le détail d'un rendu permet de visualiser le nom de la matière, la date de rendu, le professeur responsable, le commentaire, la note et s'il a été rendu ou non.
Une checkbox symbolise ce dernier champs, et peut être cochée / décochée directement afin de modifier le rendu.

Pour les autres champs, un bouton Edit permet d'accéder à la page permettant de les modifier.


### Edition de rendu

Cette page permet de modifier le commentaire, la note ou encore la matière à laquelle est rattachée ce rendu.



## Problèmes rencontrés

Au cours du développement la page edit a causer d'énormes problèmes. A son chargement, angular semble cracher, puis redémarrer instantanément. Les valeurs get sont conservées grâce à l'url, mais les services eux redémarrent aussi, et on perd l'information que l'on était connecté, donc l'appli nous renvoi à la page de login. Nous ne comprenons pas d'où vient le problème...

