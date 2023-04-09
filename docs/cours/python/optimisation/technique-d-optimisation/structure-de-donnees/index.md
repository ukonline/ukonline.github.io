# Structure de données

Un autre élément qui peut impacter les performances d'un programme de manière significative, ce sont les *structures de données* utilisées. Il est très important de choisir, voire de développer, la bonne structure de données pour chaque problème à résoudre. Il est également important de connaitre les possibilités offertes par le langage de programmation.

Python implémente plusieurs structures de données nativement, dont les chaines de caractères, les listes, les tuples, les ensembles et les dictionnaires. Des opérations spécifiques sont associées à chacune de ces structures. D'autres structures sont également disponibles dans le module `collections` de la librairie standard.

## Structure native

Supposons, par exemple, que l'on souhaite trouver les éléments qui sont communs à deux listes de nombres. L'approche la plus directe consiste à parcourir une des listes et de vérifier, pour chacun de ses éléments, s'il se trouve également dans l'autre liste. On pourrait, par exemple, écrire la fonction suivante :

``` python
def overlap_1(a, b):
    result = []
    for i in a:
        if i in b:
            result.append(i)
    return result
```

Une autre manière de procéder consiste à utiliser le type `set`, qui représente des *ensembles*, et l'opérateur `&` qui permet de calculer l'*intersection* de deux ensembles, car c'est exactement ce que l'on cherche. On peut alors plutôt écrire la fonction suivante :

``` python
def overlap_2(a, b):
    return list(set(a) & set(b))
```

Cette seconde fonction est un peu plus rapide que la première. En effet, on passe de 27&nbsp;ms à 18&nbsp;ms pour calculer l'intersection de deux listes de cent-mille éléments, soit une diminution de temps de 33%. En effet, l'opérateur `&` est optimisé pour le calcul de l'intersection d'ensembles.

Voyons un autre exemple qui permet de comparer les *listes* aux *tuples*. Il s'agit dans les deux cas de séquences, les tuples n'étant pas modifiables une fois créés tandis que les listes peuvent l'être. L'organisation en mémoire étant beaucoup plus facile pour les tuples, ces derniers sont généralement plus rapides à créer et à parcourir.

L'exemple suivant montre une fonction qui recherche le nombre d'éléments communs dans deux séquences, en les stockant dans un ensemble dont on renvoie la taille à la fin, pour ne pas compter les doublons :

``` python
def common(a, b):
    result = set()
    for i in a:
        if i in b:
            result.add(i)
    return len(result)
```

On va pouvoir appeler cette fonction avec deux séquences qui seront préalablement construites sous forme de listes ou de tuples :

``` python
def common_1(a, b):
    return common(list(a), list(b))

def common_2(a, b):
    return common(tuple(a), tuple(b))
```

La deuxième fonction avec les tuples est plus rapide que la première avec les listes. En effet, on passe de 835&nbsp;ms à 782&nbsp;ms pour calculer le nombre d'éléments communs de deux séquences de dix-mille éléments, soit une diminution de temps de 6%.

## Module collections

Le *module `collections`* contient des structures de données spécialisées à utiliser comme alternatives aux structures de données natives. Par exemple, on peut utiliser des objets `deque` qui représentent des files à deux bouts, c'est-à-dire des séquences avec la possibilité d'ajouter et de retirer des éléments devant et derrière. Utiliser cette structure de données sera beaucoup plus rapide que d'utiliser une `list` et les méthodes `insert` et `append`.

Voici deux fonctions qui permettent d'ajouter les éléments d'une liste de données devant ou derrière selon qu'ils sont négatifs ou positifs :

``` python
def split_numbers_1(data):
    result = []
    for d in data:
        if d < 0:
            result.insert(0, d)
        else:
            result.append(d)
    return result

def split_numbers_2(data):
    result = deque()
    for d in data:
        if d < 0:
            result.appendleft(d)
        else:
            result.append(d)
    return list(result)
```

La seconde fonction est beaucoup plus rapide que la première. En effet, on passe de 742&nbsp;ms à 15&nbsp;ms pour traiter une liste de cent-mille éléments, soit une diminution de temps de 98%.
