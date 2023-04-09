# Profil de temps d'exécution

Avec les techniques vues au [chapitre précédent](../profilage/), tant pour la mesure du temps d'exécution que pour celle de la consommation mémoire, il faut ajouter du code dans le programme à analyser. Lorsque l'on s'intéresse à l'exécution d'un programme et à l'identification des parties les plus consommatrices, il faut procéder à un *profilage du code*.

Intéressons-nous d'abord aux différentes principales manières permettant de dresser le profil du temps d'exécution d'un programme afin d'identifier des opportunités ou des nécessités d'optimisation.

## Module line_profiler

Le *module `line_profiler`* permet de réaliser le profilage d'un programme Python en mesurant le temps d'exécution de chacune des lignes de code du programme. Il permet de réaliser un profilage déterministe et est implémenté en C via Cython afin de diminuer au maximum la surcharge inhérente à ce type de profilage.

Analysons un programme qui permet de calculer le nombre de nombres premiers inférieurs à un nombre <i>n</i> donné. Ce dernier est intégralement repris au listing&nbsp;4.1 et se compose de deux fonctions. La principale est `nb_prime` et elle parcourt simplement tous les entiers compris entre 1 et <i>n</i> pour tester s'ils sont premiers, ou non, grâce à la deuxième fonction du programme, à savoir `is_prime`. Dans le programme, toutes les fonctions qui doivent être profilées sont simplement marquées à l'aide du décorateur `@profile`. Ce sont les seules qui seront analysées, lorsque l'on utilise le module `line_profiler` en ligne de commande.

<figure>

``` python
# Programme de calcul du nombre de nombres premiers
# Auteur : Sébastien Combéfis
# Version : 6 aout 2021

# Teste si un nombre entier est premier.
def is_prime(n):
    nb_divisors = 0
    for i in range(1, n+1):
        if n % i == 0:
            nb_divisors += 1
    return nb_divisors == 2

# Renvoie le nombre de nombres premiers inférieurs à n.
@profile
def nb_prime(n):
    nb = 0
    for i in range(1, n+1):
        if is_prime(i):
            nb += 1
    return nb

print(nb_prime(10000))
```

  <figcaption>Listing 4.1&nbsp;–&nbsp;Le fichier <code>prime-numbers.py</code> contient un programme de calcul du nombre de nombres premiers.</figcaption>
</figure>

### En ligne de commande

Pour profiler un programme en ligne de commande, il faut passer par deux étapes. La première consiste à réaliser le profilage en tant que tel, grâce à la commande `kernprof`, qui vient avec le module `line_profiler` :

```
> kernprof -l prime-numbers.py
1229
Wrote profile results to prime-numbers.py.lprof
```

L'exécution de cette commande effectue donc le profilage et stocke les résultats de ce dernier dans un fichier binaire portant le même nom que le programme exécuté avec l'extension `.lprof` en suffixe. Pour visualiser le résultat du profilage, il suffit d'exécuter la commande suivante :

```
> python3 -m line_profiler prime-numbers.py.lprof
Timer unit: 1e-06 s

Total time: 24.1357 s
File: prime-numbers.py
Function: nb_prime at line 14

Line #  Hits       Time PerHit % Time Line Contents
===================================================
    14                                @profile
    15                                def nb_prime(n):
    16     1       10.0   10.0    0.0     nb = 0
    17 10001     6123.0    0.6    0.0     for i in range(1, n+1):
    18 10000 24128646.0 2412.9  100.0         if is_prime(i):
    19  1229      897.0    0.7    0.0             nb += 1
    20     1        0.0    0.0    0.0     return nb
```

On constate que la majorité du temps total d'exécution de la fonction profilée, qui est de 24,1357&nbsp;s, est consacrée à l'exécution de la 18<sup>e</sup> ligne de code. Elle a été exécutée 10000 fois, tout comme la boucle dans laquelle elle se trouve, exécutée 10001 fois. Une optimisation doit donc s'intéresser à cette ligne de code, et à la 17<sup>e</sup>, le temps passé dans les autres étant comparativement marginal. La conclusion de l'audit est qu'il faut identifier s'il est possible d'avoir une boucle avec moins d'itérations et un meilleur temps d'exécution pour la fonction `is_prime`.

### En Python

Il est également possible d'utiliser le module `line_profiler` directement en code. Pour cela, il faut d'abord importer le module et ensuite définir le décorateur `@profile` en créant un objet `LineProfiler`. On démarre donc le script par les deux instructions suivantes :

```
import line_profiler
profile = line_profiler.LineProfiler()
```

Pour avoir les résultats du profilage de manière visuelle, il faut explicitement demander à ce qu'ils soient affichés en terminant le script avec l'instruction suivante :

```
profile.print_stats()
```

Le résultat ainsi obtenu est exactement le même que celui obtenu en travaillant directement avec la ligne de commande, si ce n'est pour les numéros de ligne qui ont forcément changé étant donné les nouvelles instructions ajoutées dans le code source du programme.

L'avantage de travailler directement en Python est qu'il est alors possible de réaliser des analyses plus détaillées des résultats du profilage en utilisant les attributs et méthodes de l'objet de type `LineProfiler`.

## Module profile

Le *module `profile`* de la librairie standard de Python permet de réaliser le *profil de performance* d'un programme, en mesurant notamment le temps d'exécution moyen passé dans les différentes fonctions exécutées et le nombre de fois qu'elles ont été appelées, pour une exécution du programme analysé.

Plus précisément, ce module permet de réaliser un *profilage déterministe*, c'est-à-dire qu'il monitore précisément tous les appels de fonction, leurs retours et les éventuelles exceptions levées, pour mesurer les temps écoulés entre ces différents évènements.

Analysons un programme qui permet de trier une liste de nombres à l'aide de l'algorithme de *tri à bulles* (<i>Bubble sort</i>), pour pouvoir identifier le temps passé dans chacune des fonctions du programme. Ce dernier est intégralement repris au listing&nbsp;4.2. Le programme se compose de trois fonctions, la principale étant `bubble_sort` qui réalise le tri à l'aide des deux fonctions auxiliaires `is_sorted` et `swap`.

<figure>

``` python
# Programme de démonstration du tri à bulles
# Auteur : Sébastien Combéfis
# Version : 26 décembre 2020

import random

# Teste si une liste est triée de manière croissante.
def is_sorted(data):
    for i in range(len(data) - 1):
        if data[i] > data[i + 1]:
            return False
    return True

# Échange deux valeurs dans une liste.
def swap(data, i, j):
    data[i], data[j] = data[j], data[i]

# Trie une liste.
def bubble_sort(data):
    while not is_sorted(data):
        for i in range(len(data) - 1):
            if data[i] > data[i + 1]:
                swap(data, i, i + 1)

data = [i for i in range(100)]
random.shuffle(data)
bubble_sort(data)
```

  <figcaption>Listing 4.2&nbsp;–&nbsp;Le fichier <code>bubble.py</code> contient un programme de démonstration du tri d'une liste de nombres avec l'algorithm de tri à bulles.</figcaption>
</figure>

### En ligne de commande

On peut obtenir le profil d'exécution directement en ligne de commande, sans rien devoir modifier au code profilé, comme le montre l'exemple suivant qui réalise le profil de l'exécution du fichier `bubble.py`, et où seules les lignes correspondant aux trois fonctions qui nous intéressent sont reprises dans le résultat ici affiché :

```
> python3 -m profile bubble.py
      4383 function calls (4356 primitive calls) in 0.031 seconds

Ordered by: standard name

ncalls tottime percall cumtime percall filename:lineno(function)
[...]
   1   0.009   0.009   0.017   0.017 bubble.py:19(bubble_sort)
  89   0.001   0.000   0.001   0.000 bubble.py:8(is_sorted)
2438   0.007   0.000   0.007   0.000 bubble.py:15(swap)
```

Sur cette exécution, on voit ainsi que la fonction `bubble_sort` a été appelée une seule fois, que la fonction `is_sorted` a été appelée 89 fois et que 2438 appels à la fonction `swap` ont été effectués.

On a également une indication du temps total d'exécution de tout le programme, qui est de 0,031&nbsp;s, du temps total et cumulé passé dans chaque fonction et des temps moyen par appel de fonction.

### En Python

Il est également possible de directement utiliser le module `profile` en code. Pour cela, il suffit de l'importer et puis d'appeler la fonction `run` en lui passant en paramètre le code à exécuter. Par exemple, les trois dernières lignes du programme précédent peuvent être remplacées par :

``` python
data = [i for i in range(100)]
random.shuffle(data)
profile.run('bubble_sort(data)')
```

Le résultat de l'exécution, qui est similaire à celui obtenu avec l'utilisation en ligne de commande, est repris ci-dessous :

```
      2883 function calls in 0.019 seconds

Ordered by: standard name

ncalls tottime percall cumtime percall filename:lineno(function)
[...]
  2594 0.007   0.000   0.007   0.000 bubble.py:15(swap)
     1 0.010   0.010   0.018   0.018 bubble.py:19(bubble_sort)
    95 0.001   0.000   0.001   0.000 bubble.py:8(is_sorted)
```

La première différence est le nombre total d'appels de fonction, simplement due au fait que l'on ne profile plus tout le programme, mais juste l'appel à `bubble_sort(data)`. La deuxième différence, à savoir les nombres d'appels enregistrés, est simplement due au fait que la liste `data` à trier est construite aléatoirement.

Ce type d'analyse permet d'identifier d'éventuels *goulots d'étranglement* dans l'exécution d'un programme, au niveau de ses fonctions. On peut ainsi identifier celles qui sont très souvent appelées et dont le temps passé à chaque appel est grand. Ce sont celles qu'il faudra investiguer et analyser plus en détail dans le cadre de l'optimisation d'un programme, avec d'autres techniques plus poussées.

### Appel récursif

Le module `profile` peut également être utilisé pour analyser des programmes qui utilisent des *fonctions récursives*, notamment pour vérifier le nombre d'appels effectués. Reprenons, par exemple, la fonction qui permet de calculer le <i>n</i><sup>e</sup> nombre de Fibonacci :

``` python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

profile.run('fib(10)')
```

Le résultat de l'analyse de l'appel `fib(10)` est repris ci-dessous :

```
      181 function calls (5 primitive calls) in 0.002 seconds

Ordered by: standard name

ncalls tottime percall cumtime percall filename:lineno(function)
[...]
 177/1 0.001   0.000   0.001   0.001 prog.py:3(fib)
```

Sur ce résultat, on voit tout d'abord qu'il y a eu un total de $181$ appels de fonction. Concernant la fonction récursive `fib`, on voit qu'elle a été appelée 171/1 fois. S'il y a deux nombres, c'est précisément parce qu'il s'agit d'un appel récursif, le premier indiquant le nombre total d'appels et le second indiquant le nombre d'appels primitifs.

### Limitation

Il y a des limitations à l'utilisation du module `profile`. Comme il ajoute du code pour la mesure du temps d'exécution, lorsqu'il y a plusieurs appels dans une même fonction, celle-ci contiendra beaucoup de code ajouté. La mesure de son temps d'exécution sera dès lors surévaluée, à cause de la surcharge liée à l'exécution du code de monitoring.

Pour limiter ce défaut, on peut utiliser le *module `cProfile`*, à la place de `profile`, un module de plus bas niveau qui rajoute moins de code et qui fonctionne exactement de la même manière que `profile`.

Aussi, il faut savoir que le temps mesuré, tant par le module `profile` que par le module `cProfile`, est celui passé *sur le processeur* par le programme. Il n'inclut donc pas les temps d'attente qui peuvent être une cause de lenteur d'un programme. De plus, les mesures réalisées sont souvent faites en développement et ne prennent pas en compte l'environnement réel d'exécution où sera déployé le programme.

Comme mentionné plus haut, on va pouvoir identifier des possibles goulots d'étranglement à l'aide de ces modules, en identifiant des fonctions dont le temps d'exécution est élevé. Néanmoins, les temps moyens calculés le sont sur des appels précis et ne représentent donc pas du tout le temps moyen d'exécution d'une fonction, peu importe les valeurs de ses paramètres. Il est parfois plus utile de connaitre les appels de fonction lents, avec les valeurs correspondantes des paramètres.

Enfin, un dernier défaut des modules `profile` et `cProfile` est que le résultat qu'ils produisent est très fourni et pas facile à traiter, même avec les possibilités offertes par le module `pstats`, par exemple.

## Module pyinstrument

Une autre possibilité d'analyse consiste à réaliser un *profilage statistique* d'un programme. Pour rappel, contrairement au profilage déterministe qui compte précisément les appels de fonction et le temps processeur passé dans ces derniers, un profilage statistique fournit une estimation des temps passés dans les différentes fonctions d'un programme.

### En ligne de commande

Le *module `pyinstrument`* mesure le temps horloge d'exécution, contrairement aux modules `profile` et `cProfile` qui mesurent le temps processeur, pour prendre en compte les ralentissements causés par les opérations disque, requêtes réseau, etc. Voici le résultat d'exécution, simplifié pour la présentation dans ce livre, sur le programme `bubble.py` :

```
> python3 -m pyinstrument bubble.py

  _     ._   __/__   _ _  _  _ _/_ Recorded: 21:16 Samples:  254
 /_//_/// /_\ / //_// / //_'/ //   Duration: 0.258 CPU time: 0.25
/   _/                      v3.3.0

Program: bubble.py

0.257 <module>  bubble.py:1
└─ 0.256 bubble_sort  bubble.py:19
   ├─ 0.191 [self]  
   ├─ 0.060 swap  bubble.py:15
   └─ 0.005 is_sorted  bubble.py:8
```

Comme on peut le voir, le résultat représente l'arbre d'exécution avec l'enchainement des fonctions appelées. Pour chacune d'entre elles, on voit qui l'a appelée, qui elle appelle et une estimation de son temps d'exécution. On voit, par exemple, que sur les 0,256&nbsp;s passée dans la fonction `bubble_sort`, 0,191&nbsp;s l'est dans la fonction elle-même, 0,060&nbsp;s l'est dans la fonction `swap` et, enfin, 0,005&nbsp;s l'est dans `is_sorted`.

Le fonctionnement du module est assez simple et ne nécessite pas beaucoup d'ajout de code. Toutes les millisecondes durant l'exécution, le module examine dans quelle fonction se trouve le programme et le mémorise. Finalement, il pourrait ainsi avoir une estimation du pourcentage de temps passé dans chaque fonction. Dans le résultat présenté plus haut, on voit d'ailleurs qu'il y a eu 254 échantillons faits.

Les avantages de cette méthode de profilage statistique sont donc une mesure équitable du temps d'exécution de chaque fonction, sans distorsion des résultats et un résultat qui n'affiche que les fonctions pertinentes, avec une présentation beaucoup plus claire à lire. Enfin, le fait de voir l'arbre d'exécution permet également de retrouver plus facilement le contexte dans lequel les lenteurs relevées ont été mesurées, la même fonction pouvant apparaitre plusieurs fois dans l'arbre, avec des vitesses moyennes d'exécution différentes.

### En Python

Outre l'utilisation en ligne de commande, le module `pyinstrument` peut également être directement utilisé depuis un programme Python, comme le montre l'exemple suivant, où un `sleep` a été ajouté pour artificiellement ralentir l'exécution, sans quoi aucune information n'aurait été capturée :

``` python
import time
from pyinstrument import Profiler

def fib(n):
    time.sleep(0.01)
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

profiler = Profiler()
profiler.start()

fib(4)

profiler.stop()
print(profiler.output_text(unicode=True, color=True))
```

Comme on peut le voir sur le résultat de l'exécution, on a clairement une fonction récursive. Contrairement aux modules `profile` et `cProfile`, on peut voir une estimation des temps d'exécution des appels individuels, qui sont ici quasi les mêmes à chaque fois, à savoir environ 0,1&nbsp;s :

```
  _     ._   __/__   _ _  _  _ _/_ Recorded: 11:56 Samples:  9
 /_//_/// /_\ / //_// / //_'/ //   Duration: 0.104 CPU time: 0.01
/   _/                      v3.3.0

Program: prog.py

0.104 <module>  prog.py:1
└─ 0.104 fib  prog.py:4
   ├─ 0.091 fib  prog.py:4
   │  ├─ 0.066 fib  prog.py:4
   │  │  ├─ 0.043 sleep  <built-in>:0
   │  │  │     [2 frames hidden]  <built-in>
   │  │  └─ 0.023 fib  prog.py:4
   │  │     └─ 0.023 sleep  <built-in>:0
   │  │           [2 frames hidden]  <built-in>
   │  └─ 0.025 sleep  <built-in>:0
   │        [2 frames hidden]  <built-in>
   └─ 0.013 sleep  <built-in>:0
         [2 frames hidden]  <built-in>
```

## Module eliot

Dans le même esprit qu'avec `pyinstrument`, il est intéressant de pouvoir visualiser l'arbre d'exécution d'un programme afin de savoir ce qui a conduit à une fonction lente à s'exécuter. Aussi, comme expliqué dans les limitations des modules `profile` et `cProfile`, avoir un seul temps moyen d'exécution pour une même fonction est réducteur. Le module `pyinstrument` que l'on vient de voir permet de prendre en compte le contexte d'appel des fonctions, qui peut influencer le temps d'exécution d'une même fonction. Un autre élément d'influence des temps d'exécution est la valeur des paramètres d'appel.

Le *module `eliot`* va plus loin en permettant de constituer un log qui reprend à la fois l'arbre d'exécution et les valeurs des paramètres utilisées pour les appels de fonction. Il combine les avantages d'un log, qui permet de retracer les appels qui ont été exécutés, avec ceux d'un monitoring du temps d'exécution, qui permet d'identifier des éventuels goulots d'étranglement dans un programme.

Une utilisation simple du module `eliot` consiste à ajouter le décorateur `@log_call` aux fonctions à monitorer, d'indiquer où le fichier de logs doit être sauvegardé et enfin d'exécuter le programme. Reprenons notre exemple de tri à bulles, mais sur une petite liste de deux éléments :

``` python
from eliot import log_call, to_file

@log_call
def is_sorted(data):
    # [...]

@log_call
def swap(data, i, j):
    # [...]

@log_call
def bubble_sort(data):
    # [...]

to_file(open('bubble.log', 'w'))

data = [3, 1]
bubble_sort(data)
```

Après exécution du programme, un fichier `bubble.log` contenant les logs a été créé. Il peut être visualisé avec l'outil `eliot-tree` pour obtenir le résultat suivant, simplifié pour la présentation dans ce livre :

```
> eliot-tree bubble.log
57369673-eb62-4312-a646-c8adfd35e406
└─ bubble_sort/1 ⇒ started 2020-12-27 10:27:37Z ⧖ 0.001s
   ├─ data: 
   │  ├─ 0: 3
   │  └─ 1: 1
   ├─ is_sorted/2/1 ⇒ started 2020-12-27 10:27:37Z ⧖ 0.000s
   │  ├─ data: 
   │  │  ├─ 0: 3
   │  │  └─ 1: 1
   │  └─ is_sorted/2/2 ⇒ succeeded 2020-12-27 10:27:37Z
   │     └─ result: False
   ├─ swap/3/1 ⇒ started 2020-12-27 10:27:37Z ⧖ 0.000s
   │  ├─ data: 
   │  │  ├─ 0: 3
   │  │  └─ 1: 1
   │  ├─ i: 0
   │  ├─ j: 1
   │  └─ swap/3/2 ⇒ succeeded 2020-12-27 10:27:37Z
   │     └─ result: None
   ├─ is_sorted/4/1 ⇒ started 2020-12-27 10:27:37Z ⧖ 0.000s
   │  ├─ data: 
   │  │  ├─ 0: 1
   │  │  └─ 1: 3
   │  └─ is_sorted/4/2 ⇒ succeeded 2020-12-27 10:27:37Z
   │     └─ result: True
   └─ bubble_sort/5 ⇒ succeeded 2020-12-27 10:27:37Z
      └─ result: None
```

La principale limitation des outils basés sur des logs est que ces derniers peuvent très vite occuper beaucoup de place en mémoire, sur le disque, et également devenir complexes à lire et analyser. Aussi, la surcharge causée par l'exécution du code ajouté pour l'écriture des logs ralentit l'exécution du programme.
