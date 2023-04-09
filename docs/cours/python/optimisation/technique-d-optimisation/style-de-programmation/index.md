# Style de programmation

Une première façon d'optimiser un code consiste à adopter un bon *style de programmation*. Il est dès lors important de directement prendre de bonnes habitudes lorsque vous apprenez un nouveau langage.

On peut distinguer deux principales catégories de *règles de style*. Les règles générales ne dépendent pas d'un langage de programmation et les spécifiques sont liées à un langage ou à un paradigme de programmation bien identifié. On a déjà pu aborder la deuxième catégorie de règles de style, dans le cas de Python, dans [le premier chapitre](../../expression-idiomatique/). Cette section présente quelques règles générales permettant d'optimiser un code et qui sont applicables à n'importe quel langage de programmation.

## Opération couteuse

Lorsque l'on écrit des programmes, il faut se rappeler que toutes les opérations, aussi élémentaires soient-elles, n'ont pas le même cout en termes de *temps d'exécution*. Par exemple, une multiplication prend plus de temps qu'une addition et une division ou un modulo prend encore plus de temps. Aussi, les opérations sur des nombres à virgule flottante sont plus lentes à être exécutées que celles sur des nombres entiers. En particulier, les opérations trigonométriques, la racine carrée ou l'exponentiation nécessitent beaucoup de temps de calcul.

Concernant *la mémoire*, tout traitement où il n'est pas possible de connaitre la taille des structures de données à l'avance risque de consommer plus de mémoire que ce qui est vraiment nécessaire.

### Multiplication

Les *multiplications* prennent donc plus de temps que les additions, de l'ordre de quatre fois plus. Lorsqu'il est possible de les éviter, en écrivant le code autrement, il faut le faire si on veut accélérer l'exécution. Voici une fonction qui permet de générer les $n$ premiers multiples de 10 :

``` python
def gen10multiple_1(n):
    result = []
    for i in range(n):
        result.append(i * 10)
    return result
```

Dans cette fonction, la variable `i` démarre à 0 pour finir à $n$ (exclu) et, à chaque tour de boucle, on calcule et affiche la valeur de `i * 10`.

Il est possible d'éviter cette multiplication en la remplaçant par une addition. En Python, on va simplement faire une boucle qui démarre de 0 et qui va jusqu'à $10n$ (exclu), par pas de 10, c'est-à-dire en additionnant la valeur 10 à celle de `i` à chaque itération :

``` python
def gen10multiple_2(n):
    result = []
    for i in range(0, 10*n, 10):
        result.append(i)
    return result
```

La seconde fonction, qui ne fait plus qu'une seule multiplication, est plus rapide que la première. En effet, on passe de 194&nbsp;ms à 143&nbsp;ms avec un $n$ fixé à un million, soit une diminution de temps de 26%.

### Nombre à virgule flottante

De manière générale, les calculs effectués sur des nombres entiers (`int`) sont plus rapides à exécuter que des calculs effectués sur des nombres à virgule flottante (`float`). Lorsqu'il est possible d'éviter les *calculs en nombres à virgule flottante*, en écrivant son programme autrement, il faut donc le faire si l'on veut diminuer le temps d'exécution.

Par exemple, si vous écrivez un programme qui doit manipuler des prix, vous pouvez décider de stocker tous les prix en centimes et ainsi vous limiter à des nombres entiers. En plus d'éviter des erreurs d'arrondis liées au calcul en nombres à virgule flottante, l'exécution de vos programmes sera légèrement plus rapide. Cependant, cette accélération dépend du langage de programmation et elle sera significative, par exemple, pour des programmes écrits en C ou en Java. En Python, les choses sont un peu différentes comme on va le voir avec la fonction suivante qui permet de calculer la somme des éléments d'une liste de prix :

``` python
def sumprices(prices):
    result = 0
    for p in prices:
        result += p
    return result
```

En exécutant cette fonction avec un million de prix en nombres à virgule flottante, on obtient un temps d'exécution de 39&nbsp;ms. En appelant la même fonction avec les mêmes prix, mais qui ont été préalablement multipliés par 100 pour en faire des nombres entiers, on se retrouve avec un temps d'exécution de 72&nbsp;ms, soit 46% de temps en plus.

La raison est que Python travaille en *précision arbitraire* pour représenter les nombres entiers. Il s'agit donc d'objets complexes pour lesquels les opérations peuvent s'avérer couteuses en temps d'exécution, contrairement à des langages comme le C ou le Java où les `int` sont représentés avec un espace mémoire de taille fixe (typiquement 32 ou 64 bits) et les opérations directement effectuées par le processeur.

## Répétition de code

Évidemment, ce qu'il faut éviter au maximum dans un programme, ce sont les *répétitions* d'un même code plusieurs fois, lorsque ce n'est pas nécessaire. Comme on l'a vu au [chapitre précédent](../../expression-idiomatique/), une des techniques possibles consiste à stocker dans une *variable locale* le résultat d'une opération, pour ne pas la répéter plusieurs fois inutilement.

Par exemple, dans le cas d'une boucle, il faut essayer de sortir les calculs de valeurs constantes, c'est-à-dire qui ne changent pas entre les itérations. Voici une fonction qui permet de calculer le périmètre de plusieurs cercles dont on connait le rayon :

``` python
def circle_perimeter_1(data):
    result = []
    for r in data:
        result.append(2 * math.pi * r)
    return result
```

Dans ce simple exemple, on se rend compte que l'expression `2 * math.pi` est répété à chaque itération de la boucle, alors que sa valeur reste la même. Ce que l'on peut faire, c'est réaliser ce calcul une seule fois en dehors de la boucle et stocker le résultat dans une variable locale :

``` python
def circle_perimeter_2(data):
    result = []
    dp = 2 * math.pi
    for r in data:
        result.append(dp * r)
    return result
```

La seconde fonction est bien plus rapide que la première. En effet, on passe de 294&nbsp;ms à 179&nbsp;ms pour calculer les périmètres d'un million de cercles, soit une diminution de temps de 39%.

## Test inutile

Une dernière catégorie de règles de style générales qu'il est possible d'adopter concerne les *tests inutiles*. Des tests, typiquement effectués dans les instructions conditionnelles (`if-else`) et répétitives (`while`), sont représentés par des *expressions booléennes*. Dans plusieurs cas, certains styles peuvent améliorer les performances.

### Comparaison avec littéral booléen

Dans une expression booléenne, il ne faut jamais comparer une variable directement au littéral `True` ou `False`. En effet, si vous faites une telle comparaison, c'est que la variable est booléenne et vaut déjà `True` ou `False`. Par exemple, les conditions des deux instructions suivantes sont à éviter, car elles comportent de la redondance :

``` python
if cond == True:
    print('Vrai !')

if cond == False:
    print('Faux !')
```

Les deux instructions peuvent être simplifiées comme suit, en utilisant directement la variable booléenne comme condition, ou en l'utilisant combinée avec l'opérateur NON logique, à savoir `not` en Python :

``` python
if cond:
    print('Vrai !')

if not cond:
    print('Faux !')
```

Cela peut avoir un effet non-négligeable sur les performances d'exécution de portions de code d'un programme. Voici deux fonctions qui permettent de compter le nombre d'éléments valant `True` dans une liste de booléens :

``` python
def count_bool_1(data):
    result = 0
    for d in data:
        if d == True:
            result += 1
    return result

def count_bool_2(data):
    result = 0
    for d in data:
        if d:
            result += 1
    return result
```

La seconde fonction est plus rapide que la première. En effet, on passe de 64&nbsp;ms à 46&nbsp;ms pour compter le nombre de valeurs divisibles par 2 ou par 3, entre 0 et un million, soit une diminution de temps de 28%.

Avec Python, une autre simplification consiste à remplacer les comparaisons avec la valeur spéciale `None`. Au lieu d'utiliser l'opérateur `==`, il faut utiliser `is` et donc écrire `var is None` au lieu de `var == None`.

### Instruction else inutile

Un autre élément parfois simplifiable dans le cas des instructions `if-else` est le fait que l'on peut parfois se passer de la clause `else`. En effet, lorsque le but d'une instruction `if-else` est d'affecter une valeur différente à une variable, selon qu'une condition soit satisfaite ou non, on se retrouve souvent avec un code comme :

``` python
if cond:
    var = 'Valeur 1'
else:
    var = 'Valeur 2'
```

Dans ce cas précis, on peut simplifier le code en initialisant la variable avec la valeur mise dans le `else` et en supprimant donc cette dernière clause. Pour l'exemple précédent, le code devient donc :

``` python
var = 'Valeur 2'
if cond:
    var = 'Valeur 1'
```

Si l'opération faite par défaut, c'est-à-dire celle extraite et placée avant l'instruction `if`, n'est pas trop lourde, alors écrire le code de cette manière peut contribuer à accélérer la vitesse d'exécution du code.

On peut également retirer le `else` dans une fonction lorsque le contenu de ce dernier est un `return`, puisqu'en plus de renvoyer une valeur, l'instruction `return` quitte immédiatement la fonction. Voici deux fonctions qui permettent de calculer la valeur absolue d'un nombre :

``` python
def abs_1(val):
    if val < 0:
        return -val
    else:
        return val

def abs_2(val):
    if val < 0:
        return -val
    return val
```

Pour cet exemple, la seconde fonction est un peu plus rapide que la première. En effet, on passe de 187&nbsp;ms à 184&nbsp;ms pour calculer la valeur absolue d'un million de nombres, soit une diminution de temps de 2%.
