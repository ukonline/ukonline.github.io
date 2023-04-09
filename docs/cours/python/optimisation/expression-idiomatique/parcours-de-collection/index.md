# Parcours de collection

Il existe plusieurs manières de *parcourir une collection* d'éléments, que ce soit une chaine de caractères, une liste, un tuple, un ensemble ou un dictionnaire. Le plus facile consiste à itérer sur les éléments de la collection à l'aide d'une boucle `for...in`. Il s'agit de la manière de faire la plus <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> et efficace, dans la plupart des cas.

Néanmoins, dans le cas de séquences, on a parfois besoin d'accéder aux éléments de la séquence en même temps que leur indice. L'exemple suivant calcule le carré de tous les éléments d'une liste reçue en paramètre, à l'aide d'une boucle `while` et d'une variable `i` qui parcourt les indices de la séquence, et renvoie une chaine de caractères comme résultat :

``` python
def square_1(x):
    s = ''
    i = 0
    while i < len(x):
        s += f'{i}: {x[i]**2}\n'
        i += 1
    return s[:-1]
```

On peut faire un peu mieux en utilisant une boucle `for`, ce qui permet d'éviter de gérer la variable `i` explicitement :

``` python
def square_2(x):
    s = ''
    for i in range(len(x)):
        s += '{}: {}\n'.format(i, x[i]**2)
    return s[:-1]
```

La seconde fonction est plus rapide que la première. En effet, on passe de 141&nbsp;ms à 119&nbsp;ms pour traiter une liste de cent-mille éléments, soit une diminution de temps de 16%. Dans les deux cas, la boucle permet de générer une séquence d'indices `i` permettant d'obtenir les valeurs des éléments de la liste avec l'expression `x[i]`.

## Fonction enumerate

Lorsque l'on souhaite parcourir les éléments d'une séquence tout en ayant accès à leur indice dans la séquence, on peut utiliser la *fonction prédéfinie `enumerate`*. Elle renvoie un itérateur de tuples avec l'indice comme premier élément et la valeur associée comme second élément.

On peut ainsi écrire une troisième version de la fonction de calcul des carrés des éléments d'une liste, en utilisant la fonction `enumerate` :

``` python
def square_3(x):
    s = ''
    for i, e in enumerate(x):
        s += f'{i}: {e**2}\n'
    return s[:-1]
```

Cette troisième fonction est encore plus rapide et réalise le même traitement que précédemment en seulement 109&nbsp;ms, à savoir une diminution de 23% par rapport à la première fonction.

On pourrait même aller encore plus loin, avec une quatrième version, en définissant la liste en compréhension et en utilisant la méthode `join` pour éviter les concaténations :

``` python
def square_4(x):
    return '\n'.join([f'{i}: {e**2}' for i, e in enumerate(x)])
```

Cette dernière version ne prend plus que 95&nbsp;ms d'exécution, soit une diminution de 33% par rapport à la première version.

## Fonction zip

Lorsque l'on souhaite parcourir deux séquences de même longueur, en parallèle, on est vite tenté d'utiliser une boucle `while` ou `for` pour obtenir l'indice de parcours de manière explicite. La *fonction prédéfinie `zip`* renvoie un itérateur de tuples à plusieurs éléments, chacun provenant d'une séquence différente, mais positionné au même indice.

On peut donc utiliser la fonction `zip` pour parcourir plusieurs séquences en parallèle. Voici deux fonctions qui permettent de calculer la somme de deux séquences de nombres :

``` python
def vectorsum_1(x, y):
    return [x[i] + y[i] for i in range(len(x))]

def vectorsum_2(x, y):
    return [a + b for a, b in zip(x, y)]
```

La seconde fonction est beaucoup plus rapide que la première. En effet, on passe de 44&nbsp;ms à 17&nbsp;ms pour calculer la somme de deux listes de cent-mille éléments, soit une diminution de temps de 61%.
