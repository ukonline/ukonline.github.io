# Échantillonnage

Comme on l'a déjà mentionné plusieurs fois, lorsque l'on souhaite réaliser une étude statistique sur une population donnée, il n'est généralement pas possible de collecter des données sur tous les individus de la population. La seule solution possible à cette difficulté consiste à *échantillonner* la population, c'est-à-dire procéder à une sélection d'individus qui forment un échantillon.

## Sélection de l'échantillon

Pour réaliser un *échantillonnage* d'une population, il va donc falloir sélectionner les individus de la population que l'on va pouvoir interroger dans le cadre de l'étude statistique menée. Tous les individus ainsi sélectionnés vont former l'échantillon qui sera utilisé pour l'étude. Pour une même population, il y a plusieurs sélections possibles.

::: info Définition
L'échantillonnage d'une population consiste à sélectionner des individus dans cette dernière dont l'ensemble forme un échantillon.
:::

Un échantillonnage ne peut pas se faire n'importe comment si l'on souhaite obtenir des résultats les plus proches possibles de la réalité, c'est-à-dire ceux que l'on aurait obtenu si l'on avait pu analyser toute la population. Un bon échantillon doit être le plus *représentatif* possible de la population d'intérêt. Les individus sélectionnés doivent refléter au mieux la situation de la population qu'ils représentent.

### Représentativité

Une première condition pour avoir un bon échantillon est que les individus sélectionnés pour en faire partie doivent être des bons *représentants* des individus de la population. Intuitivement, on doit donc retrouver la même diversité dans l'échantillon que dans la population.

Revenons un moment à l'étude sur la taille des Belges. Si l'échantillon sélectionné ne comportait que des bébés, il ne serait pas du tout représentatif de la population, car les données collectées ne comporteraient que des petites tailles. Pour cette étude, et pour bien faire, on pourrait simplement sélectionner au hasard des individus pour l'échantillon.

Parfois, la sélection sur base du hasard fournit un échantillon de mauvaise qualité. Prenons comme exemple les sondages sur les intentions de vote pour les élections régionales. Si l'on veut avoir une bonne image des intentions de vote en Wallonie, il est important de s'assurer d'avoir des individus de toutes les provinces, dans l'échantillon, et suivant la même répartition que celle du nombre d'habitant(e)s.

### Taille

Pour obtenir un bon échantillon, il faut que sa taille $n$ soit suffisante par rapport à la taille de la population. Un échantillon trop petit fournira une image infidèle de la population et un trop gros rendra l'analyse trop complexe et couteuse à mener. Il y a plusieurs manières d'identifier la taille d'un bon échantillon étant donné la marge d'erreur tolérable, et on va se limiter à une toute simple dans le cadre de ce cours.

::: info Définition
La *formule de Slovin* détermine la taille $n$ d'un bon échantillon par :
$$n = \frac{N}{1 + N \cdot e^2}, \tag{1.1}$$
où $N$ est la taille de la population et $e$ la marge d'erreur tolérée.
:::

La formule de Slovin donne généralement d'assez bons résultats pour des échantillonnages aléatoires simples. Elle ne peut pas être utilisée s'il y a des sous-groupes dans la population et qu'il faut s'assurer que ces sous-groupes soient chacun bien représenté, comme pour l'exemple mentionné plus haut avec le sondage pour les élections régionales.

::: info Exemple
Revenons sur l'exemple d'étude sur la taille des Belges. Pour rappel, la taille de la population est de $N$ = 11.584.008 et supposons que l'on souhaite un niveau de confiance de 98%, c'est-à-dire une marge d'erreur tolérée de $e = 100 - 0,\!98 = 0,\!02$. La formule de Slovin nous conseille de prendre un échantillon de taille :
$$n = \frac{11584008}{1 + 11584008 \cdot 0,\!02^2} = 2.499,\!460\;5... \approx 2.500.$$
:::

## Inférence statistique

Grâce à un échantillonnage de la population, on va pouvoir réaliser des analyses statistiques et obtenir des résultats sur un échantillon. Si ce dernier est un bon échantillon, on va pouvoir tenter de décrire la partie à partir du tout. Ce principe est l'idée derrière la notion d'*inférence statistique* qui dit que tout résultat obtenu sur l'échantillon peut être extrapolé pour être également valable sur la population. À ce type de conclusions est évidemment associé un niveau de confiance.
