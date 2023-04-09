# Définition de liste

Le deuxième point d'attention pour un code <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> concerne la *définition de listes*. La façon la plus simple de définir une liste consiste à partir d'une liste vide et d'y ajouter les éléments désirés à l'aide de la *méthode `append`*. Les éléments sont, par exemple, ajoutés les uns après les autres grâce à une boucle, comme dans le code suivant qui remplit la liste `data` avec les $n$ premières puissances de deux :

``` python
data = []
for i in range(n):
    data.append(2 ** i)
```

Deux techniques peuvent être utilisées pour améliorer le temps d'exécution de programmes créant des listes. Outre les performances, ces techniques améliorent également la lisibilité des programmes.

## Fonctions map et filter

Lorsqu'il s'agit de construire une liste à partir d'une autre, en appliquant une opération sur chaque élément de cette dernière, on peut utiliser la *fonction prédéfinie `map`*. Celle-ci prend comme premier paramètre une fonction décrivant l'opération à appliquer à chaque élément de la liste passée en second paramètre. Lorsque la fonction à appliquer est simple, il est préférable de la définir à l'aide d'une *fonction lambda*, pour que le code soit le plus <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> possible. Voici deux fonctions qui créent une liste avec les $n$ premières puissances de deux :

``` python
def map_1(n):
    result = []
    for i in range(n):
        result.append(2 ** i)
    return result

def map_2(n):
    data = map(lambda i: 2**i, range(n))
    return list(data)
```

La seconde fonction est plus <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> que la première et il faut privilégier ce style, même si au niveau des performances, elle n'est qu'un peu plus rapide que la première. En effet, on passe de 97&nbsp;ms à 94&nbsp;ms pour créer une liste avec les dix-mille premières puissances de 2, soit une diminution de temps d'à peine 3%.

On peut aussi vouloir construire une liste à partir d'une autre en ne gardant que certains éléments, ce que l'on peut faire avec la *fonction prédéfinie `filter`*. Celle-ci prend comme premier paramètre une fonction booléenne décrivant la condition que doivent satisfaire les éléments qu'il faut garder dans la liste passée en second paramètre. De nouveau, si la fonction est simple, mieux vaut utiliser une fonction lambda. Voici deux fonctions qui créent une liste avec les entiers compris entre 0 et $n$ qui sont divisibles soit par deux, soit par trois :

``` python
def filter_1(n):
    result = []
    for i in range(n):
        if i % 2 == 0 or i % 3 == 0:
            result.append(i)
    return result

def filter_2(n):
    data = filter(lambda i: i % 2 == 0 or i % 3 == 0, range(n))
    return list(data)
```

Au niveau du style, mieux vaut utiliser la seconde fonction, même si les performances au niveau du temps d'exécution ne sont pas forcément meilleures. Pour cet exemple, la seconde fonction est même plus lente que la première. En effet, on passe de 193&nbsp;ms à 228&nbsp;ms pour créer une liste avec les entiers compris entre 0 et un million qui sont divisibles par deux ou par trois, soit une augmentation de temps de 25%.

En réalité, les fonctions `map` et `filter` n'améliorent pas forcément le temps d'exécution. On préfère néanmoins les utiliser pour deux autres raisons. Tout d'abord, la lisibilité est améliorée en évitant d'avoir des codes avec des niveaux d'indentation trop élevés en raison de l'imbrication d'une instruction `if` dans une boucle `for`.

Ensuite, comme décrit dans [la section&nbsp;1.3](../generation-a-la-demande/) plus loin dans le chapitre, ces deux fonctions améliorent l'occupation mémoire. En effet, ce qui est couteux au niveau du temps d'exécution, c'est l'instruction `list(data)` faite avant le `return` pour obtenir un objet de type `list`.

## Liste en compréhension

La manière plus <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> de créer une liste consiste à utiliser une *définition en compréhension*, inspirée de la définition mathématique des séquences. On préfère cette notation, plus lisible et concise que la fonction `map`, car il ne faut pas définir et passer une fonction en paramètre. Voici comment l'exemple précédent, qui calcule les dix-mille premières puissances de deux, se réécrit :

``` python
def map_3(n):
    return [2**i for i in range(n)]
```

Au niveau du temps d'exécution, cette nouvelle manière de définir la fonction prend plus ou moins le même temps que les deux versions précédentes. Son avantage est d'offrir un gain en lisibilité de code.

On peut également remplacer la fonction `filter` par une définition en compréhension en ajoutant une clause `if`. Voici comment l'exemple précédent, qui crée une liste avec les entiers compris entre 0 et un million qui sont divisibles par deux ou par trois, se réécrit :

``` python
def filter_3(n):
    return [i for i in range(n) if i % 2 == 0 or i % 3 == 0]
```

Concernant le temps d'exécution, cette nouvelle manière de définir la liste est plus efficace. On passe en effet à 156&nbsp;ms, c'est-à-dire une diminution de 19% par rapport à la première version.

La définition de listes en compréhension est, en fait, plus qu'un simple sucre syntaxique. Outre produire un code plus <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i>, plus concis, lisible et explicite, elle permet d'améliorer le temps d'exécution, par rapport à l'utilisation de `append` dans une boucle.

## Concaténation de chaines de caractères

Comme mentionné dans [la section précédente](../concatenation-de-chaines-de-caracteres/), la définition de liste en compréhension peut être utilisée pour améliorer les deux fonctions utilisant de la concaténation de chaines de caractères. Voici deux nouvelles versions des fonctions présentées précédemment :

``` python
def concat_3(n):
    return ''.join(['Nom' for i in range(n)])

def format_3(n):
    return ''.join(['{} x 10 = {}\n'.format(i, i*10) for i in range(n)])
```

Les temps d'exécution sont respectivement passés à 58&nbsp;ms et 51&nbsp;ms, soit des améliorations de 66% et de 52%, par rapport aux versions les plus lentes utilisant l'opérateur de concaténation.
