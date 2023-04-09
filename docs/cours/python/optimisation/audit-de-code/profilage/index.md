# Profilage

Pour optimiser un programme et le rendre plus rapide, ou moins gourmand au niveau de sa consommation mémoire, il faut d'abord *profiler* son exécution. Ce profilage a pour objectif d'identifier quels sont les portions du programme qui sont particulièrement lentes ou consommatrices de mémoire. Ce sont, en effet, ces goulots d'étranglement qu'il faut traiter et optimiser, en premier lieu.

## Méthode de profilage

Il y a essentiellement deux *méthodes de profilage* d'un programme qu'il est possible d'utiliser. Ces deux méthodes sont généralement utilisées de manière complémentaire, pour d'abord rapidement réaliser une première analyse globale, ensuite suivie d'une analyse locale plus poussée.

Lors d'un *profilage déterministe*, toutes les occurrences d'un ou plusieurs types d'évènements qui se produisent lors de l'exécution d'un programme sont capturés. Ces évènements peuvent être des appels de fonction, l'exécution d'instructions `return`, etc. L'avantage des méthodes déterministes est leur grande précision quant aux mesures réalisées. La contrepartie est la lourdeur du monitoring et le ralentissement du temps d'exécution global du programme profilé. Ces méthodes ne sont pas envisageables en production, mais uniquement recommandées lors du développement et des tests. Une autre possibilité est de limiter leur utilisation à quelques petites fonctions, mais pas à un programme complet.

Lors d'un *profilage statistique*, l'exécution du programme est interrompue à intervalles réguliers afin que des échantillons de l'état de l'exécution puissent être capturés. Tous les échantillons qui ont été capturés sont ensuite analysés pour en déduire des indicateurs. L'avantage des méthodes statistiques est qu'elles n'occasionnent que peu de surcharge au programme analysé. La contrepartie est la moins grande précision, par rapport aux méthodes déterministes.

## Ressource

Jusqu'à présent, on a déjà présenté deux *métriques* qu'il est possible d'utiliser lorsque l'on réalise un profilage de code. Les métriques sont généralement associées à une ressource que l'on souhaite utiliser d'une manière la plus économe possible.

Lorsque l'on s'intéresse au processeur, on va généralement utiliser le *temps processeur* comme métrique d'intérêt. Si la ressource concernée est la mémoire vive, alors la métrique souvent utilisée est la *consommation mémoire* du code. D'autres ressources de l'ordinateur peuvent aussi être la cause de mauvaises performances observées lors de l'exécution d'un programme. Il est ainsi également possible de s'intéresser *aux lectures et aux écritures de données* sur le disque ou sur l'interface réseau.

## Granularité

Tant pour les méthodes de profilage déterministes que statistiques, les mesures peuvent être réalisées à différents niveaux. Si on prend comme exemple le temps d'exécution, il est possible de le mesurer pour chaque ligne de code ou pour chaque fonction, par exemple. Le profilage d'un programme permettrait alors d'identifier les lignes de code ou les fonctions qui sont vraiment lentes. On peut également plutôt mesurer le nombre de fois qu'une ligne de code ou qu'une fonction est exécutée. Ceci permettrait à un audit de révéler les lignes de code ou fonctions qui sont très souvent exécutées, des potentielles opportunités d'optimisation.

Outre les lignes de code et les fonctions, il est aussi possible de s'intéresser à des mesures à d'autres niveaux. On pourrait, par exemple, profiler les performances d'une classe, d'un module ou d'un programme dans son entièreté. Au plus la granularité utilisée sera fine, au plus il sera possible d'extraire de l'information intéressante suite au profilage. Néanmoins, une analyse avec un niveau fin de granularité aura comme inconvénient l'ajout de beaucoup de bruit, surtout en cas de profilage déterministe.

Le *choix de la granularité* doit aussi être fait en lien avec le type de programme analysé. En effet, dans le cas d'un serveur web, par exemple, il sera difficile de s'intéresser à la mesure du temps d'exécution du programme, par exemple. L'exécution d'un serveur web ne se termine en effet pas. On va dès lors plutôt se tourner vers un profilage des fonctions ou lignes de code, par exemple.

## Résultat

Une fois la méthode profilage, la ou les ressources d'intérêt et la granularité choisies, le code peut être profilé. Les résultats du profilage peuvent être présentés de différentes manières, selon ce que l'on souhaite retirer de l'analyse. Une possibilité consiste à *dessiner des courbes* qui vont permettre de voir des tendances qu'il s'agira éventuellement d'améliorer en changeant le code, si elles sont trop mauvaises par rapport aux ressources d'intérêt. Il est également possible d'*extraire des données* avec comme objectif d'identifier des portions de code à optimiser. On peut, par exemple, obtenir un tableau avec les fréquences d'appels de toutes les fonctions du programme, celles qui sont appelées le plus souvent devant certainement être analysées plus en profondeur afin d'identifier si elles doivent être optimisées ou non.
