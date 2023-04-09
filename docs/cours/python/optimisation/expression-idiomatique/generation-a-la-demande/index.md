# Génération à la demande

Les techniques et expressions idiomatiques présentées dans les deux sections précédentes peuvent améliorer le temps d'exécution.

On va maintenant s'intéresser à l'amélioration de la consommation de mémoire avec les *générateurs*. L'idée est assez simple : il s'agit de réaliser ce que l'on appelle une *génération fainéante* à la demande. L'exemple suivant construit une liste d'un million d'éléments :

``` python
data = [i for i in range(1000000)]
```

Outre le temps nécessaire à l'exécution de cette instruction, à savoir 89&nbsp;ms pour générer le million de valeurs, l'espace mémoire nécessaire pour les stocker est d'environ 35&nbsp;Mio.

## Générateur

Il est parfois préférable de ne garder en mémoire que les données utilisées, voire de ne générer les données d'une collection que lorsqu'elles deviennent utiles. Un générateur construit un *itérateur*, plutôt qu'une liste complète, dont les éléments ne seront générés qu'à la demande.

Voici comment réécrire l'exemple précédent avec un générateur :

``` python
data = (i for i in range(1000000))
```

L'occupation mémoire a été radicalement réduite, passant à seulement 624&nbsp;o pour stocker le générateur, pour un temps d'exécution d'à peine un centième de milliseconde pour créer le générateur.

La majeure différence entre une séquence explicite et un générateur est qu'il n'est pas possible d'utiliser l'*opérateur d'accès* avec ce dernier. Par exemple, l'instruction suivante produit une erreur d'exécution :

``` python
print(data[0])
```

```
Traceback (most recent call last):
  File "program.py", line 2, in <module>
    print(data[0])
TypeError: 'generator' object is not subscriptable
```

S'agissant d'un itérateur, les éléments d'un générateur sont soit parcourus avec la fonction prédéfinie `next`, soit à l'aide d'une boucle `for`. Voici un exemple concret où l'intérêt du générateur, et de la génération de données à la demande, est indéniable pour économiser des ressources :

``` python
def login_1(identifier, password):
    with open(PASSWORD_FILE) as file:
        for line in file:
            s = line.strip().split(':')
            if s[0] == identifier and s[1] == hash(password):
                return True
    return False
```

Cette fonction ouvre un fichier texte à l'aide de la fonction prédéfinie `open`. Cette dernière renvoie un générateur permettant d'itérer sur les lignes du fichier. Grâce à une boucle `for`, ces lignes sont inspectées l'une après l'autre, pour vérifier si l'une d'entre elles correspond à l'identifiant et au mot de passe spécifiés en paramètres.

Lorsqu'une ligne correspond, la fonction s'arrête immédiatement en renvoyant `True` et seules les lignes du fichier précédant la ligne correspondante ont été générées, le reste du fichier n'a pas été parcouru. Si le fichier est gros, des accès inutiles au disque ont ainsi pu être évités.

## Chainage de générateurs

Il est possible de construire un générateur sur base d'un autre, pour économiser un maximum de ressources et pour améliorer les temps d'exécution des programmes. En réalité, on a déjà exploité cette possibilité étant donné que la fonction `range` renvoie en fait un générateur, tout comme les fonctions `map` et `filter` vues précédemment, d'ailleurs.

Voici comment on pourrait simplifier la fonction `login_1` de la page précédente pour rendre le code plus lisible et séparer la partie qui lit le fichier de celle qui fait la comparaison des identifiants et mots de passe :

``` python
def read_credentials(path):
    with open(path) as file:
        for line in file:
            yield tuple(line.strip().split(':'))

def login_2(identifier, password):
    for s in read_credentials(PASSWORD_FILE):
        if s[0] == identifier and s[1] == hash(password):
            return True
    return False
```

L'*instruction `yield`* permet de renvoyer une valeur au moment où elle est nécessaire. Grâce à cela, la fonction `read_credentials` renvoie donc un générateur qui renverra des tuples avec un identifiant et le mot de passe associé, directement extraits du fichier à la demande.

On a donc construit un générateur, sur base de celui renvoyé par l'ouverture du fichier. Ce dernier est simplement parcouru par la fonction `login_2`, pour une comparaison fainéante des identifiants reçus en paramètre. Cette possibilité de *chainer des générateurs* permet de construire des programmes modulaires, ce qui améliore leur lisibilité et accroit la réutilisation de portions de code, en l'occurrence des fonctions.
