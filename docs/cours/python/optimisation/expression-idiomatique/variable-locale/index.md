# Variable locale

Enfin, un dernier élément d'attention, lorsque l'on code en Python et que l'on souhaite écrire un code <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i>, concerne la différence entre les *variables locales et globales*. Il faut savoir qu'il est toujours plus rapide d'accéder à une variable locale qu'à une globale, en particulier au sein d'une fonction ou au sein d'une boucle. Voici, par exemple, deux fonctions qui permettent de calculer la somme des nombres contenus dans une séquence, à l'aide d'une boucle `while` :

``` python
i = 0

def sumelem_1(data):
    global i
    result = 0
    i = 0
    while i < len(data):
        result += data[i]
        i += 1
    return result

def sumelem_2(data):
    result = 0
    i = 0
    while i < len(data):
        result += data[i]
        i += 1
    return result
```

La première fonction utilise la variable globale `i`, initialisée à la première ligne, pour parcourir `data` et la seconde fonction utilise une variable locale `i`. La seconde fonction est plus rapide que la première. En effet, on passe de 46&nbsp;ms à 38&nbsp;ms pour faire la somme des éléments d'une liste de cent-mille éléments, soit une diminution de temps de 17%.

## Opérateur d'accès

Ne pas utiliser inutilement l'*opérateur d'accès*, que ce soit pour les listes ou les dictionnaires, permet également d'améliorer les performances. Il est préférable de stocker la valeur d'un élément accédé plusieurs fois dans une variable locale. Voici deux fonctions qui permettent de calculer la valeur d'un polynôme du second degré pour plusieurs valeurs de $x$ :

``` python
def polyval_1(coeff, data):
    result = []
    for i in range(len(data)):
        result.append(coeff[2]*data[i]**2 + coeff[1]*data[i] + coeff[0])
    return result

def polyval_2(coeff, data):
    result = []
    c, b, a = coeff
    for i in range(len(data)):
        x = data[i]
        result.append(a*x**2 + b*x + c)
    return result
```

Quatre variables locales ont été ajoutées dans la seconde fonction. Les variables `a`, `b` et `c` stockent les coefficients du polynôme provenant de `coeff`. Ce derniers ne changent pas, mais ils sont accédés à chaque tour de boucle. La variable `x` stocke, quant à elle, le point courant, pour éviter les deux accès faits dans la première fonction.

La seconde fonction est plus rapide que la première. En effet, on passe de 137&nbsp;ms à 108&nbsp;ms pour calculer la valeur du polynôme $x^2 + x + 1$ pour cent-mille $x$, soit une diminution de temps de 21%. Bien sûr, on peut encore faire mieux en parcourant directement les éléments de `data` sans passer par les indices et en construisant le résultat avec une liste en compréhension, descendant à 91&nbsp;ms avec le code suivant :

``` python
def polyval_3(coeff, data):
    return [coeff[2]*x**2 + coeff[1]*x + coeff[0] for x in data]
```

## Appel de fonction

Pour finir, voyons une dernière technique permettant de diminuer le temps d'exécution d'un programme à l'aide de variables locales. On peut améliorer les performances en veillant à ne pas utiliser inutilement l'*opérateur d'appel* de fonction ou de méthode.

Pour éviter de tels appels inutiles, il faut se rappeler que, en Python, les fonctions et les méthodes sont des objets. Il est dès lors possible de stocker une fonction ou une méthode dans une variable, pour ensuite l'utiliser directement. C'est précisément ce qu'il faut faire pour améliorer le temps d'exécution lorsque vous appelez plusieurs fois la même fonction ou méthode, notamment dans des boucles.

Voici deux fonctions qui permettent de passer en majuscule la première lettre de tous les mots d'une phrase :

``` python
def wordcapital_1(s):
    result = []
    for w in s.split(' '):
        result.append(w.capitalize())
    return ' '.join(result)

def wordcapital_2(s):
    result = []
    append = result.append
    capitalize = str.capitalize
    for w in s.split(' '):
        append(capitalize(w))
    return ' '.join(result)
```

Dans cet exemple, les méthodes `append` des listes et `capitalize` des chaines de caractères sont placées dans des variables locales. La seconde fonction est un peu plus rapide que la première. En effet, on passe de 103&nbsp;ms à 99&nbsp;ms pour traiter des phrases de dix-mille mots, soit une diminution de temps de 4%.

Cette pratique est moins commune et moins répandue, mais peut parfois s'avérer utile lorsque de très nombreux accès à une même fonction ou une même méthode sont faits.
