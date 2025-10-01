Etape N1 : la structure des données au format JSON 

Déterminez les « propriétés » qui caractérisent une tâche, en plus du titre (ou libellé) de la tâche, indépendamment de sa priorité pour l'instant. Quelles autres propriétés pouvez vous imaginer?

Construire la structure des données au format JSON, d’un côté, les données de la variable « Priorité », puis, d'un autre côté, les données d’une tâche. Un « identifiant » sera défini pour la variable « Priorité », ainsi que pour une tâche. La priorité pour une tâche sera alors reconnue via la valeur de l’identifiant, et non la priorité correspondante.

Par analogie avec une base de données MySQL, et des tables pour les priorités et les tâches, l'identifiant de la variable, donc la table, Priorité est une clé primaire (Primary Key). L'identifiant défini pour une tâche est également une clé primaire. En revanche, l'identifiant qui caractérise la priorité d'une tâche, que l'on retrouve dans une tâche est alors une clé étrangère (Foreign Key).

Générer un jeu de données, à savoir plusieurs tâches, sous forme d’une Array Javascript (tableau d’éléments), dont chaque élément est une tâche au format JSON.

Pour cette étape, données JSON, suivez scrupuleusement les sous-étapes 1A à 1D, qu'il faudra publier indépendamment pour faciliter la correction.

 

Etape N2 : Le formulaire de saisie d’une tâche

Le formulaire HTML contiendra un champ de formulaire pour chaque propriété d'une tâche.

Dans un premier temps, créez un formulaire dit 'statique', à savoir que tout le code des champs de formulaire est écrit "à la main".

Par ex., la variable « Priorité » sera représentée par une liste déroulante (ou des boutons radio), et écrite "à la même", à savoir l'élément <select>, les éléments <option> avec la valeur de l'attribut value, et le texte de l'option, sans avoir recours aux données JSON et à Javascript.

Ce formulaire sera adapté pour un support Mobile.

Dans un deuxième temps, le formulaire sera écrit dynamiquement en Javascript, à l'aide des données JSON des variables, par ex. la liste <select> des Priorités. Il en sera de même pour les autres variables.

Un bouton (élément HTML <button>) permettra d’enregistrer les données au format JSON dans le local storage (voir étape 3).

Vous soignerez également le design du formulaire.

 

Etape N3 : Enregistrement des données du formulaire

Le bouton 'Enregistrer' exécute une fonction JS avec les actions suivantes:

Lecture des valeurs saisies dans les champs de formulaire, notamment, le libellé de la tâche, et autres propriétés, ainsi que la priorité affectée à la tâche (via l'identifiant), de même pour les autres variables.

    lecture du localStorage, à savoir des tâches précédemment enregistrées (aucune, au démarrage de l'application), sous forme d'une Array JS, tableau (ou Array) des tâches. Pour rappel, le localStorage étant une chaîne de texte, utilisez la méthode parse() pour reconstituer l'array.
    gestion de l'identifiant (clé primaire) d'une nouvelle tâche. Il suffit pour cela de rajouter +1 au nombre actuel des tâches déjà enregistrées, la propriété length de l'array des tâches (0 au démarrage de l'application, l'identifiant de la première tâche prendra alors la valeur 1)
    ajout de la nouvelle tâche, données au format JSON, comme nouvel élément de l'array des tâches
    écriture du localStorage. Pour rappel, une chaîne de texte doit être écrite, à l'aide de la méthode stringify().

Consultez le localStorage pour vous assurer du bon déroulement de l'application avec enregistrement de nouvelles tâches.

 

Etape N4 : Gestion des tâches, affichage de la liste des tâches enregistrée, et archivage de celles-ci, une fois la tâche réalisée

Si l’observation du local storage est très simple via l’outil « Inspecter » du navigateur, elle n’est pas forcément pratique. Mais c’est ce que nous ferons dans un premier temps.

Pour cela, on se propose d'afficher sous forme de tableau, l'ensemble des tâches, à voir comment les classer... On pourra envisager d'autres types de tris (par priorité, etc...).

On souhaite également gérer les tâches, notamment pour notifier qu'elles sont accomplies, ou annulées.

Par exemple, on pourra éditer une tâche, suite à une erreur de saisie, ou pour modifier la priorité (de peu importante à importante, par ex.).

Mais surtout, on doit pouvoir notifier qu'une tâche est terminée, réalisée, il faudra donc l'archiver (ou même l'annuler). Devrez vous créer une nouvelle propriété JSON pour une tâche?

Cette gestion peut paraitre complexe, notamment si on recherche une application ergonomique.

Un design est attendu également, tant pour le formulaire que pour le 'dashboard' de la gestion de la To Do List.
