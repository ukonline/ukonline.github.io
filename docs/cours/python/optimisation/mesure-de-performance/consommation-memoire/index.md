# Consommation mémoire

Un deuxième type d'analyse intéressant à faire est l'évaluation de la *consommation de mémoire* résultant de l'exécution d'un programme ou d'une partie du programme. Contrairement au temps d'exécution, il n'y a généralement pas d'outils disponibles sur votre système d'exploitation pour mesurer cette consommation de mémoire, du moins précisément.

## Pile

Lors de l'exécution d'un programme, il y a essentiellement deux différentes zones mémoires qui sont utilisées. La *pile* est utilisée pour stocker les paramètres et variables locales déclarées qui sont utilisées les fonctions. Au plus il y a d'appels de fonction en cours, au plus la pile sera donc mobilisée. Il faut être particulièrement prudent lorsque l'on utilise des *fonctions récursives*, pour ne pas provoquer un *dépassement de capacité* de la pile, comme avec le simple exemple suivant :

``` python
def recursive_fct():
	recursive_fct()

recursive_fct()
```

La fonction `recursive_fct` se rappelle directement elle-même et, chaque appel étant stocké sur la pile en attendant de pouvoir se terminer, cette dernière finit par être pleine, comme en témoigne l'erreur de type `RecursionError` qui est levée et reprise à la fin du résultat de l'exécution :

```
RecursionError: maximum recursion depth exceeded
```

L'espace mémoire utilisé dans la pile augmente donc lorsqu'il y a des appels de fonction et l'espace alloué est immédiatement libéré à chaque retour d'une des fonctions appelées. La difficulté avec les *appels récursifs* est que des appels s'enchainent et ne se terminent que tous ensemble, lorsqu'il n'y a plus d'appel récursif effectué.

### Limite du nombre d'appels récursifs

Pour connaitre le plus grand nombre d'appels récursifs que l'on peut faire, on peut appeler la fonction `getrecursionlimit` du module `sys`. La fonction `setrecursionlimit` du même module permet de modifier cette limite, tant que la valeur choisie reste en dessous de la valeur maximale supportée par le système. Voici l'instruction qui vous permet donc de connaitre cette limite pour votre système :

``` python
print(sys.getrecursionlimit())
```
Dans notre cas, on ne peut dépasser 1000 appels récursifs :

```
1000
```

## Tas

L'autre zone mémoire, qui s'appelle le *tas*, stocke tous les objets qui sont créés durant l'exécution du programme. On l'appelle aussi la *mémoire dynamique*, car elle se remplit et se vide tout au long de l'exécution, alors que des nouveaux objets sont créés et que ceux qui ne sont plus utilisés sont détruits. Illustrons ceci avec l'exemple suivant :

``` python
data = [i for i in range(20)]
```

Dans la pile, de l'espace mémoire est alloué pour stocker le contenu de la variable `data`, à savoir une référence vers un objet `list`. L'objet en tant que tel se trouve dans le tas, où notamment 20 zones ont été allouées, chacune stockant l'un des nombres entiers de la liste.

Le tas possède aussi une capacité maximale qui peut être dépassée si trop d'objets sont créés par le programme. On verra plus loin dans ce chapitre comment obtenir des informations en lien avec l'occupation de cette zone de mémoire, tout au long de l'exécution du programme.

### Ramasse-miettes

Contrairement à la pile, qui se vide automatiquement lorsque les appels de fonction se terminent, le mécanisme de nettoyage du tas est plus complexe. La gestion de cette mémoire est faite par un *ramasse-miettes*, un composant de la machine virtuelle Python qui va surveiller l'occupation du tas et supprimer les objets qui ne sont plus utilisés.

Identifier ces objets est une tâche ardue dans la mesure où un même objet peut être référencé par de multiples variables, locales dans plusieurs fonctions, globales ou dans d'autres objets. Le ramasse-miettes est exécuté de manière régulière et supprime du tas tous les objets qui ne sont plus référencés par aucune variable. Il est possible d'explicitement déclencher ce nettoyage en appelant la fonction `collect` du *module `gc`*.

On peut connaitre le nombre de *références* que possède un objet avec la *fonction `getrefcount`* du module `sys`. Voyons cela avec l'exemple suivant basé sur des objets de type `list` :

``` python
data = [i for i in range(20)]
print(sys.getrefcount(data))

backup = [data]
print(sys.getrefcount(data))
```

La première instruction crée une nouvelle liste et stocke une référence vers celle-ci dans la variable `data`, ce qui donne donc une référence vers l'objet. Comme une référence temporaire est créée à l'intérieur de la fonction `getrefcount`, le résultat renvoyé sera donc 1 ou 2, en fonction du timing de mise à jour du nombre de références.

On stocke ensuite une référence vers l'objet dans une nouvelle liste, elle-même référencée par la variable `backup`, ce qui fait que la première liste a maintenant deux références vers elle. De nouveau, pour la même raison qu'expliquée plus haut, le résultat renvoyé par la fonction `getrefcount` sera donc 2 ou 3. Voici le résultat obtenu dans notre cas, où on voit bien une différence d'une référence entre les deux affichages :

```
2
3
```

## Espace mémoire occupé

Voyons maintenant comment obtenir plus d'information en lien avec la consommation mémoire due aux objets qui sont créés dans le tas.

### Bloc alloué

Une première solution consiste à utiliser la *fonction `getallocatedblocks`* du module `sys`. Cette dernière renvoie le nombre de blocs mémoire qui a été alloué pour le programme, peu importe les tailles de ces blocs, dans le tas. Voyons comment l'utiliser avec l'exemple suivant :

``` python
gc.collect()
before = sys.getallocatedblocks()

data = [i for i in range(20)]

diff = sys.getallocatedblocks() - before
print(f'{diff} blocs supplémentaires alloués')
```

On commence par explicitement supprimer les objets non référencés du tas, puis on examine combien de blocs sont actuellement alloués. On crée ensuite de nouveau une liste de 20 éléments, ce qui va provoquer des allocations mémoire pour en stocker le contenu. On redemande ensuite le nombre de blocs alloués pour afficher la différence :

```
5 blocs supplémentaires alloués
```

Ce résultat pourrait paraitre surprenant dans la mesure où 20 nouveaux objets de type `int` devraient avoir été créés, à savoir les éléments de la liste. Néanmoins, la plupart des valeurs comprises entre 0 et 20 (exclue) ont certainement déjà été créées par le code d'initialisation de la machine virtuelle Python et n'ont donc pas été recréées. Si vous faites le test avec un autre intervalle de nombres entiers, ou en créant une liste de chaines de caractères, vous obtiendrez d'autres résultats.

### Taille d'un objet

Une autre possibilité pour connaitre la mémoire allouée, plus précise que la précédente, mais également plus complexe à mettre en œuvre, consiste à utiliser la *fonction `getsizeof`* du module `sys`. Cette fonction permet d'obtenir le *nombre d'octets occupé par un objet*, mais en ne prenant en compte que la consommation directement attribuable à ce dernier, et pas celle des objets dont il stockerait une référence. Partons d'un programme qui crée deux tuples, le premier contenant 20 nombres entiers et le second contenant 20 chaines de caractères :

``` python
data = (i for i in range(20))
print(sys.getsizeof(data))

content = (str(i) for i in range(20))
print(sys.getsizeof(content))
```

Il ne faut pas être un expert en Python pour se douter que ces deux objets occupent chacun un espace mémoire différent, contrairement au résultat obtenu qui indique 112&nbsp;octets pour les deux objets :

```
112
112
```

La raison est simplement que les 112&nbsp;octets indiqués correspondent à l'espace occupé par un objet de type `tuple`, sans prendre en compte son contenu. Pour avoir une idée plus précise de l'espace mémoire total occupé, il faut aussi comptabiliser la mémoire occupée par les éléments contenus dans le tuple. L'exemple suivant réalise ce calcul :

``` python
def tuple_size(t):
    size = sys.getsizeof(t)
    for e in t:
        size += sys.getsizeof(e)
    return size

data = (i for i in range(20))
print(tuple_size(data))

content = (str(i) for i in range(20))
print(tuple_size(content))
```

Cette fois-ci, le résultat montre bien que le tuple de chaines de caractères occupe plus de place en mémoire que celui de nombres entiers :

```
668
1122
```

Évidemment, si c'est très simple de calculer l'espace mémoire total occupé par un simple tuple, comme dans les exemples que l'on vient de voir, cela peut s'avérer bien plus complexe dans d'autres cas. En effet, si le tuple contient des objets plus complexes, il faudra aussi calculer l'espace précis que ces derniers occupent. En toute généralité, on ne pourra donc pas se baser sur la fonction `getsizeof` pour connaitre l'espace mémoire total occupé par un objet, peu importe son type.
