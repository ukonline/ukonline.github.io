# Module timeit

Mesurer le temps d'exécution de parties de programme est nécessaire pour *profiler un code*. Pour facilement réaliser ces mesures, on peut utiliser le *module `timeit`*, directement disponible dans la librairie standard de Python. Les fonctions proposées dans ce dernier sont faites pour être les plus faciles et les moins intrusives possibles à utiliser, en comparaison avec la méthode <i>&laquo;&nbsp;manuelle&nbsp;&raquo;</i> présentée à la section précédente.

## Utilisation en ligne de commande

Avec le module `timeit`, il est possible de mesurer le *temps d'exécution d'instructions* Python directement en ligne de commande. Voici, par exemple, comment mesurer le temps d'exécution d'une boucle qui calcule la somme des 1000 premiers nombres entiers :

```
> python3 -m timeit 'sum = 0' 'for i in range(1001): sum += i'
5000 loops, best of 5: 93.5 usec per loop
```

L'option `-m` indique qu'il faut lancer le module `timeit` en mode script et les paramètres suivants contiennent les instructions à exécuter. Dans cet exemple, on déclare une variable `sum` initialisée à 0, puis on exécute la boucle de calcul de la somme désirée.

Le résultat de la commande indique que le temps qui a été mesuré est celui pris par 5000 exécutions et que, sur 5 répétitions de la mesure de temps, le meilleur obtenu est de 93.5&nbsp;µs, par boucle.

On peut également mesurer le temps d'exécution d'instructions qui font référence à du code provenant de scripts Python. Voici, par exemple, comment mesurer l'exécution de l'appel `fib(25)` :

```
> python3 -m timeit -s 'from prog import fib' 'fib(25)'
10 loops, best of 5: 36.7 msec per loop
```

L'option `-s` permet d'indiquer une instruction qui ne sera exécutée qu'une seule fois, avant de lancer le code dont il faut mesurer le temps d'exécution. Dans notre cas, on importe la fonction `fib` depuis le fichier `prog.py`. Le résultat obtenu indique un temps d'exécution de 36.7&nbsp;ms pour l'appel `fib(25)`, ce qui est similaire aux résultats obtenus précédemment, avec la méthode <i>&laquo;&nbsp;manuelle&nbsp;&raquo;</i>.

Par défaut, le module `timeit` choisit lui-même le nombre de fois qu'il faut répéter les instructions pour chaque mesure de temps et il répète les mesures de temps 5 fois. On peut modifier les valeurs de ces deux paramètres, détaillés plus loin, avec les options `-n` et `-r` :

```
> python3 -m timeit -n 100 -r 3 -s 'from prog import fib' 'fib(25)'
100 loops, best of 3: 38.5 msec per loop
```

## Utilisation en Python

On peut obtenir le même résultat sans passer par la ligne de commande, mais en écrivant un script Python. Pour cela, il suffit d'appeler la *fonction `timeit`* en lui fournissant le code qu'elle doit appeler et mesurer, typiquement sous la forme d'une *fonction lambda*.

Voici comment on peut mesurer le temps d'exécution de l'appel `fib(25)`, en supposant que la fonction `fib` soit définie plus haut dans le script et en ayant préalablement importé le module `timeit` :

``` python
N = 100

result = timeit.timeit(lambda: fib(25), number=N)

time = result / N * 1000
print(f'{result:.2f} s')
print(f'{time:.1f} ms')
```

Le nombre d'exécutions à faire se définit avec le paramètre `number` qui correspond à l'option `-n` de la version en ligne de commande, et dont la valeur par défaut est d'un million. La valeur renvoyée par la fonction `timeit` contient le temps d'exécution total pour toutes les exécutions demandées, en secondes. Pour obtenir le temps moyen, il suffit de diviser la valeur obtenue par le nombre d'exécutions. Le résultat obtenu est de nouveau similaire à ceux obtenus précédemment :

```
3.98 s
39.8 ms
```

On peut aussi utiliser la fonction `timeit` avec un code à n'exécuter qu'une seule fois avant de lancer les mesures, comme ce que permet l'option `-s` de la version en ligne de commande. Concernant les instructions dont il faut mesurer le temps d'exécution, on peut aussi les fournir comme une chaine de caractères plutôt qu'avec une fonction lambda.

Voici comment on pourrait réécrire l'exemple précédent en important directement la définition de la fonction `fib` depuis le fichier `prog.py` plutôt que de mettre le code de mesure dans le même fichier :

``` python
N = 100
setup = 'from prog import fib'
stmt = 'fib(25)'

result = timeit.timeit(stmt, setup, number=N)

time = result / N * 1000
print(f'{time:.1f} ms')
```

## Jeu de tests aléatoire

Dans les exemples précédents, on testait à chaque fois un appel précis d'une fonction. Néanmoins, lorsque l'on souhaite évaluer le temps d'exécution d'une fonction, de manière générale, il faudrait théoriquement l'exécuter avec toutes les valeurs possibles pour ses paramètres et faire une moyenne des temps d'exécution obtenus.

Évidemment, comme il y potentiellement une infinité de valeurs possibles, c'est pratiquement impossible de toutes les tester. Pour avoir une bonne idée du temps d'exécution moyen d'une fonction, une solution consiste à l'exécuter avec des *valeurs aléatoires* pour les différents paramètres et à ensuite calculer une moyenne des temps d'exécution obtenus.

Pour illustrer cela, voici un exemple qui mesure le temps d'exécution de la fonction `pairs_2` (dont la définition se trouve à [la section&nbsp;2.6.3](../../technique-d-optimisation/flux-d-execution/#iterateur)), en l'appelant avec deux listes de mille valeurs aléatoires comprises entre 0 et 100 (exclu) :

``` python
N = 100

setup = '''import random
from __main__ import pairs_2

a = random.choices(range(100), k=1000)
b = random.choices(range(100), k=1000)'''
stmt = 'pairs_2(a, b)'
```

Le code contenu dans la variable `setup` est exécuté une seule fois avant les 100 exécutions de l'appel `pairs_2(a, b)`. On voit également que, pour pouvoir appeler la fonction `pairs_2`, il faut l'importer depuis `__main__` si elle se trouve dans le même fichier, ce qui n'était pas nécessaire lorsque l'on définissait le code à exécuter avec une fonction lambda.

Enfin, il faut lancer plusieurs fois la fonction `timeit` pour que la partie `setup` soit exécutée plusieurs fois et que plusieurs *jeux de tests aléatoires* soient utilisés pour la mesure du temps d'exécution. Concrètement, on peut simplement utiliser la *fonction `repeat`*, au lieu de la fonction `timeit`, qui est dans le même module. On spécifie ensuite le nombre de fois qu'il faut répéter l'expérience grâce au paramètre `repeat` :

``` python
result = timeit.repeat(stmt, setup, number=N, repeat=3)

print(result)
time = min(result) / N * 1000
print(f'{time:.1f} ms')
```

Le résultat renvoyé par la fonction `repeat` est une liste qui contient les temps moyens de chacune des expériences, à savoir trois dans notre exemple. Habituellement, on prend la plus petite valeur de cette liste comme résultat du profilage du temps d'exécution, comme cela a été fait dans l'exemple ci-dessus dont l'exécution affiche :

```
[13.789451262, 13.616268809, 13.455259594000005]
134.6 ms
```

Le paramètre `repeat` correspond en fait à l'option `-r` de la version en ligne de commande et est optionnel, sa valeur par défaut étant de 5.
