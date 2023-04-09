# Fonction prédéfinie

Python étant un langage en partie interprété, un programme écrit avec ce langage est, par nature, plus lent que le même programme écrit avec un langage complètement compilé comme le C, par exemple.

Par contre, comme on a pu le constater dans [le premier chapitre](../../expression-idiomatique/), les *fonctions prédéfinies* de Python permettent d'accélérer significativement le temps d'exécution des programmes les utilisant. La raison est simplement que les appels à ces fonctions sont, pour la plupart, simplement des relais vers une librairie en C compilée en code natif. Cela résulte donc forcément en un temps exécution beaucoup plus rapide, le code de la librairie étant compilé pour la machine.

Voici deux fonctions qui permettent de calculer la somme de tous les nombres entiers d'une liste :

``` python
def sumint_1(data):
    result = 0
    for d in data:
        result += d
    return result

def sumint_2(data):
    return sum(data)
```

La seconde fonction est beaucoup plus rapide que la première. En effet, on passe de 74&nbsp;ms à 26&nbsp;ms pour calculer la somme d'un million de nombres entiers, soit une diminution de temps de 65%.

C'est donc important de connaitre les fonctions prédéfinies de Python, mais également celles disponibles dans la librairie standard ou d'autres librairies. Tout code pouvant ne pas être interprété, mais directement exécuté nativement sur la machine, sera toujours plus rapide à exécuter.

## Liste de booléens

La *fonction prédéfinie `all`* permet de tester si toutes les valeurs d'une liste valent `True`, et la *fonction prédéfinie `any`* si une liste contient au moins une valeur à `True`. C'est plus rapide d'utiliser ces fonctions que d'itérer <i>&laquo;&nbsp;manuellement&nbsp;&raquo;</i> les listes pour vérifier leur contenu. Voici comment on pourrait implémenter la fonction `all` <i>&laquo;&nbsp;à la main&nbsp;&raquo;</i> :

``` python
def all(data):
    for d in data:
        if not d:
            return False
    return True
```

Cette fonction `all` écrite en Python est beaucoup plus lente que la fonction prédéfinie `all`. En effet, elle ne prend que 5&nbsp;ms pour traiter une liste d'un million de valeurs, au lieu de 13&nbsp;ms pour la version <i>&laquo;&nbsp;manuelle&nbsp;&raquo;</i>, soit une diminution de 62%.

## Liste de nombres

Comme on l'a vu précédemment, la *fonction prédéfinie `sum`* calcule la somme des valeurs d'une liste de nombres. On peut également trouver la plus grande valeur d'une telle liste avec la *fonction prédéfinie `max`* et la plus petite valeur avec la *fonction prédéfinie `min`*. Voici, par exemple, comment on pourrait implémenter la fonction `min` <i>&laquo;&nbsp;à la main&nbsp;&raquo;</i> :

``` python
def min(data):
    result = data[0]
    for d in data:
        if d < result:
            result = d
    return result
```

Cette fonction `min` écrite en Python est plus lente que la fonction prédéfinie `min`. En effet, elle ne prend que 39&nbsp;ms pour traiter une liste d'un million d'éléments, au lieu de 55&nbsp;ms pour la version <i>&laquo;&nbsp;manuelle&nbsp;&raquo;</i>, soit une diminution de 29%. La même observation se fait évidemment avec la fonction prédéfinie `max`.
