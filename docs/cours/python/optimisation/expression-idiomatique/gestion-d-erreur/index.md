# Gestion d'erreur

La *gestion des erreurs* est une activité importante quand on rédige un programme que l'on souhaite le plus robuste possible. De manière générale, il existe deux approches pour gérer les erreurs dans un programme.

La première approche, appelée *LBYL* (<i>Look Before You Leap</i>), consiste à explicitement vérifier que toutes les préconditions sont bien satisfaites avant d'exécuter un code. C'est, par exemple, l'approche utilisée en C ou en Go.

L'autre approche, appelée *EAFP* (<i>Easier to Ask for Forgiveness than Permission</i>), et préconisée en Python, consiste à supposer que les hypothèses sont satisfaites et à gérer les éventuelles erreurs avec le *mécanisme d'exception*, à savoir `try-except` en Python.

## Accès à un dictionnaire

Accéder au contenu d'un dictionnaire se fait essentiellement à partir des clés des paires clé-valeur contenues dans le dictionnaire. Voici deux fonctions qui permettent de compter les fréquences d'apparition des lettres présentes dans un mot :

``` python
def frequencies_1(word):
    freq = {}
    for c in word:
        if c not in freq:
            freq[c] = 0
        freq[c] += 1
    return freq

def frequencies_2(word):
    freq = {}
    for c in word:
        try:
            freq[c] += 1
        except KeyError:
            freq[c] = 1
    return freq
```
La première fonction vérifie systématiquement si la lettre est présente ou non comme clé dans le dictionnaire et, si ce n'est pas le cas, rajoute cette clé en lui associant la valeur 0. On est clairement dans une approche LBYL et ce type de code n'est pas du tout <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i>.

La seconde fonction, qui suit l'approche EAFP, est beaucoup plus courante en Python. Elle accède systématiquement à la clé dans le dictionnaire pour incrémenter la valeur associée et, si une exception de type `KeyError` se produit, rajoute la clé manquante dans le dictionnaire en lui associant la valeur 1.

Au niveau des performances, le fait d'utiliser un `try-except` n'est pas pénalisant, les deux fonctions prenant 106&nbsp;ms pour s'exécuter avec une chaine de caractères aléatoire de cent-mille lettres minuscules. L'approche EAFP sera parfois plus rapide, en fonction de la complexité de la condition du `if` utilisée dans l'approche LBYL.

## Expression régulière

Voyons un autre exemple où l'utilisation d'un `try-except` est bien plus rapide que le test équivalent à l'aide d'un `if`, car la condition de ce dernier est complexe et prend beaucoup de temps à évaluer.

Voici deux fonctions qui permettent de calculer la somme des nombres entiers se trouvant dans une liste de chaine de caractères :

``` python
def sumtextint_1(data):
    result = []
    for d in data:
        if re.match('^[1-9][0-9]*$', d):
            result.append(int(d))
    return sum(result)

def sumtextint_2(data):
    result = []
    for d in data:
        try:
            result.append(int(d))
        except ValueError:
            pass
    return sum(result)
```

La première fonction vérifie, à l'aide d'une expression régulière, que l'on a bien un nombre entier qui pourra donc être converti sans erreur en un nombre de type `int`. La seconde fonction fait l'hypothèse que l'on a bien des nombres entiers en convertissant directement les éléments de la liste reçue en paramètre. Si ce n'est pas le cas, la fonction traite la situation exceptionnelle en utilisant le mécanisme d'exception avec un `try-except`, en capturant une exception de type `ValueError`.

La seconde fonction est beaucoup plus rapide que la première. En effet, on passe de 250&nbsp;ms à 67&nbsp;ms pour calculer la somme des éléments d'une liste de cent-mille nombres représentés par des chaines de caractères, soit une diminution de temps de 73%.
