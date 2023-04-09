# Module tracemalloc

Pour plus facilement obtenir de l'information plus précise quant à la consommation mémoire, on peut utiliser le *module `tracemalloc`*, intégré dans la librairie standard de Python depuis la version 3.4.

L'idée de ce module consiste à réaliser des *captures* de l'état de la mémoire à différents points dans le programme, pour pouvoir les comparer. La première chose à faire consiste à démarrer la surveillance de la mémoire avec la fonction `start`. On supprime également de la mémoire tous les objets non utilisés avec la fonction `collect` du module `gc`, pour que l'analyse comparative réalisée soit la plus précise possible :

``` python
tracemalloc.start()
gc.collect()
```

Ensuite, on fait une capture de l'état de la mémoire avant et après la portion de programme d'intérêt, à l'aide de la fonction `take_snapshot`, en veillant à stocker les captures dans des variables :

``` python
before = tracemalloc.take_snapshot()

data = [i/10 for i in range(100)]
labels = [str(i) for i in data]

after = tracemalloc.take_snapshot()
```

Enfin, pour connaitre la consommation de mémoire engendrée par la création des deux listes, l'une avec des `float` et l'autre avec des `str`, il faut comparer les deux captures à l'aide de la méthode `compare_to` :

``` python
top_stats = after.compare_to(before, 'lineno')
for stat in top_stats[:2]:
    print(stat)
```

Comme on le voit sur le résultat de l'exécution, l'option `lineno` permet de trier les informations présentées en fonction des numéros de ligne dans le code source du programme exécuté. Aussi, dans l'exemple, on n'affiche que les deux dernières lignes des statistiques, ce qui permet d'éviter d'afficher toutes les modifications de mémoire qui sont dues au module `tracemalloc` en lui-même :

```
prog.py:9: size=6584 B (+6584 B), count=104 (+104), average=63 B
prog.py:8: size=3736 B (+3736 B), count=103 (+103), average=36 B
```

On voit que la ligne 8 du programme a créé 103 nouveaux objets en mémoire, pour un total de 3736&nbsp;octets (il s'agit de la variable `data` et de son contenu). On voit également que la ligne 9 a créé 104 nouveaux objets en mémoire, pour un total de 6584&nbsp;octets.

Cette quantité est plus grande car, comme on a déjà pu l'observer dans des exemples précédents, les objets `str` occupent plus de place en mémoire que les objets `float`. En effet, il faut un caractère par chiffre et chaque caractère occupe une place en mémoire comparable à celle occupée pour un simple nombre de type `float`.
