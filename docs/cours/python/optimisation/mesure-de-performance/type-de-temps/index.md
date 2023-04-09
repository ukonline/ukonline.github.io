# Type de temps

Comme soulevé en début de chapitre, il existe différents *types de temps* d'exécution. Lorsqu'un programme est en cours d'exécution, il consomme du temps sur le processeur. Néanmoins, comme plusieurs activités peuvent se dérouler en même temps sur un ordinateur, le processeur est partagé entre ces différentes activités, qui reçoivent chacune des intervalles de temps processeur et sont en attente le reste du temps.

On peut donc déjà faire la différence entre le *temps processeur*, temps durant lequel le programme est effectivement en cours d'exécution sur le processeur et le *temps utilisateur*, temps qui s'écoule entre l'instant où le programme est lancé et celui où son exécution se termine.

Un autre type de temps qui existe est le *temps de réponse*. Il correspond au temps qu'il faut attendre avant que le programme ne fournisse un premier <i>&laquo;&nbsp;signe de vie&nbsp;&raquo;</i> après avoir été lancé. Ce dernier est plus complexe à mesurer et est souvent utilisé pour les applications interactives avec interface graphique, mesurant combien de temps l'utilisateur doit attendre avant de pouvoir commencer à interagir avec le programme.

## Temps processeur

Il est possible, sous certaines conditions, d'avoir accès à une horloge qui est en lien avec le temps processeur utilisé par le programme en cours d'exécution. Pour cela, il faut utiliser la *fonction `clock_gettime`* du module `time`, en lui précisant l'horloge à utiliser.

Par exemple, et sur les systèmes Unix uniquement, l'horloge représentée par la constante `time.CLOCK_PROCESS_CPUTIME_ID` fournit un temps processeur de haute résolution, en lien avec le programme en cours d'exécution. L'exemple suivant montre comment utiliser cette horloge pour mesurer le temps processeur d'une exécution :

``` python
start = time.time()
time.sleep(1.5)
elapsed = time.time() - start
print(f'{elapsed:.1f} s')

start = time.clock_gettime(time.CLOCK_PROCESS_CPUTIME_ID)
time.sleep(1.5)
elapsed = time.clock_gettime(time.CLOCK_PROCESS_CPUTIME_ID) - start
print(f'{elapsed} s')
```

On s'intéresse donc au temps d'exécution de `time.sleep(1.5)`, instruction qui met le programme en pause pendant 1.5&nbsp;s. Le temps utilisateur, mesuré avec la fonction `time` devrait donc être proche de 1.5&nbsp;s, tandis que le temps processeur devrait être proche de 0, le programme n'ayant été qu'en attente. Le résultat de l'exécution confirme cela :

```
1.5 s
9.30000000000028e-05 s
```

En fonction de votre système d'exploitation et de votre machine, d'autres horloges peuvent être disponibles. Aussi, il faut savoir que, pour avoir le temps processeur, on aurait pu directement utiliser la *fonction `process_time`*. L'exemple précédent aurait pu s'écrire comme suit :

``` python
start = time.process_time()
time.sleep(1.5)
elapsed = time.process_time() - start
print(f'{elapsed} s')
```

Le résultat de l'exécution donne bel et bien un temps proche de 0 :

```
8.099999999999774e-05 s
```

## Compteur de performance

Parfois, lorsqu'il s'agit de mesurer des *temps très courts*, la fonction `time` n'est pas suffisamment précise. Une première solution consiste à utiliser une horloge plus précise, comme celle représentée par la constante `time.CLOCK_HIGHRES` et disponible sous Solaris. On peut également utiliser la *fonction `perf_counter`* qui renvoie la valeur d'un *compteur de performance*, à savoir le temps mesuré par l'horloge avec la plus haute précision possible qui est disponible.

Cette fonction permet de mesurer un temps utilisateur avec une grande précision, pour autant que votre système d'exploitation et votre ordinateur disposent des outils permettant une telle mesure. Elle est donc potentiellement utile pour mesurer des temps très courts. Mesurons, par exemple, le temps mis pour affecter une valeur à la variable `start`, à savoir l'instant de départ du chronomètre :

``` python
start = time.time()
elapsed = time.time() - start
print(f'{elapsed * 1000} ms')

start = time.perf_counter()
elapsed = time.perf_counter() - start
print(f'{elapsed * 1000} ms')
```

Sur la machine utilisée, le résultat de l'exécution montre une plus grande précision dans le deuxième cas :

```
0.0019073486328125 ms
0.0006050000000007438 ms
```

## Paramétrer le compteur de timeit

Par défaut, la fonction `timeit` utilise la fonction `perf_counter` pour les mesures de temps qu'elle réalise. Elle permet donc de mesurer le temps utilisateur écoulé, avec la plus grande précision possible.

Comme on l'a vu plus haut, il est également possible de ne compter que le temps effectivement utilisé par le processeur, grâce à la fonction `process_time`. Lorsque l'on travaille avec `timeit` en ligne de commande, il suffit d'utiliser l'option `-p` pour mesurer le temps processeur :

```
> python3 -m timeit -n 100 -p -s 'from prog import fib' 'fib(25)'
100 loops, best of 5: 38.5 msec per loop
```

Lorsque l'on travaille avec le module `timeit` en code Python, on peut modifier le compteur utilisé avec le paramètre optionnel `timer`. L'exemple suivant effectue trois mesures de temps différentes. La première mesure utilise le compteur de performance, la deuxième le temps processeur et la troisième utilise la fonction `time` vue à [la section&nbsp;3.1.2](../temps-d-execution/#chronometre-manuel-avec-python) :

``` python
N = 100
fct = lambda: fib(25)

print(timeit.timeit(fct, number=N))
print(timeit.timeit(fct, number=N, timer=time.process_time))
print(timeit.timeit(fct, number=N, timer=time.time))
```

Selon que votre ordinateur est plus moderne ou plus ancien, selon que son processeur soit occupé à exécuter autre chose que le programme à mesurer ou non, les valeurs renvoyées par ces trois méthodes seront plus ou moins proches. Dans notre cas, elles sont plutôt proches :

```
3.750158489
3.726765
3.7059531211853027
```
