# Concaténation de chaines de caractères

Le premier élément d'attention pour un code <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> concerne les *chaines de caractères*. En Python, elles sont représentées par le type `str` qui définit des chaines de caractères *immuables*, c'est-à-dire dont la valeur ne peut être modifiée une fois la chaine de caractères créée. Il n'est, par exemple, pas possible d'écrire ceci :

``` python
s = 'Hello World?'
s[11] = '!'
```

Le message d'erreur qui se produit indique clairement que les objets de type `str` ne supportent pas l'affectation de leurs éléments :

```
Traceback (most recent call last):
  File "program.py", line 2, in <module>
    s[11] = '!'
TypeError: 'str' object does not support item assignment
```

Mais que se passe-t-il lorsque l'on utilise l'*opérateur de concaténation* des chaines de caractères ? Cet opérateur construit en fait une nouvelle chaine de caractères qui est le résultat de la concaténation de ses deux opérandes. Par exemple, au terme de l'exécution du programme suivant, trois objets `str` distincts sont créés en mémoire :

``` python
s = 'Hello'
s += 'World'
```

La première instruction crée la chaine de caractères `'Hello'`. La seconde instruction commence par créer `'World'`, et puis crée une nouvelle chaine de caractères contenant le résultat de la concaténation, à savoir `'HelloWorld'`. À la fin, la variable `s` fera référence à ce résultat et le *ramasse-miettes* finira par supprimer les deux autres chaines de caractères de la mémoire, tôt ou tard.

Voyons un autre exemple de programme avec des concaténations :

``` python
a = 'Hello'
b = 'World'
s = a + ' ' + b + '!'
```

Pour ce nouvel exemple, un total de cinq chaines de caractères sont créées en mémoire. En effet, chaque application de l'opérateur de concaténation créant un nouvel objet, la troisième instruction en crée trois nouveaux, en plus des deux créées par les deux premières instructions.

Deux techniques peuvent être utilisées pour améliorer le temps d'exécution de programmes nécessitant de nombreuses concaténations.

## Méthode join

Lorsqu'il s'agit de concaténer un grand nombre de chaines de caractères, il est plus efficace d'utiliser la *méthode `join`* des objets `str` plutôt que d'utiliser l'opérateur de concaténation. Voici deux fonctions qui permettent de concaténer $n$ fois la chaine de caractères `'Nom'` :

``` python
def concat_1(n):
    result = ''
    for i in range(n):
        result += 'Nom'
    return result

def concat_2(n):
    result = []
    for i in range(n):
        result.append('Nom')
    return ''.join(result)
```

La seconde fonction est bien plus rapide que la première. En effet, on passe de 172&nbsp;ms à 114&nbsp;ms pour concaténer un million de fois la chaine de caractères `'Nom'`, soit une diminution de temps de 34%. On peut encore améliorer ce gain de temps en utilisant les listes en compréhension, décrites à [la section&nbsp;1.2](../definition-de-liste/) plus loin dans ce chapitre.

## Méthode format

Lorsqu'il s'agit de concaténer des chaines de caractères avec des valeurs et variables d'autres types, il est plus efficace d'utiliser la *méthode `format`* des objets `str` ou les *f-strings*, plutôt que d'utiliser l'opérateur de concaténation. Voici trois fonctions qui permettent de calculer les $n$ premières lignes de la table de multiplication par 10 :

``` python
def format_1(n):
    result = ''
    for i in range(n):
        result += str(i) + ' x 10 = ' + str(i*10) + '\n'
    return result

def format_2(n):
    result = ''
    for i in range(n):
        result += '{} x 10 = {}\n'.format(i, i*10)
    return result

def format_3(n):
    result = ''
    for i in range(n):
        result += f'{i} x 10 = {i*10}\n'
    return result
```

La deuxième fonction est plus rapide que la première. En effet, on passe de 102&nbsp;ms à 75&nbsp;ms pour concaténer les cent-mille premières lignes de la table de multiplication par 10, soit une diminution de temps de 26%.

Avec la troisième fonction, les performances sont encore meilleures, menant à un temps d'exécution de 57&nbsp;ms, soit une diminution de temps de 44% par rapport à la première fonction. On peut faire encore mieux avec les listes en compréhension, décrites à [la section suivante](../definition-de-liste/).
