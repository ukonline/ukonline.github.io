# Temps d'exécution

La première chose qu'il est intéressant de pouvoir analyser par rapport à un programme, c'est d'évaluer son *temps d'exécution*. Ce qu'il faut donc mesurer, c'est le temps qui s'est écoulé entre le moment où le programme est lancé et le moment où son exécution est terminée.

## Outil du système d'exploitation

Une première possibilité pour mesurer le temps d'exécution d'un programme consiste à utiliser des *outils de votre système d'exploitation* en lançant le programme en ligne de commande. Sous Linux et macOS, on peut utiliser la *commande `time`* avec le programme à analyser :

```
> time python3 fib.py
python3 fib.py  0,08s user 0,01s system 91% cpu 0,098 total
```

Le résultat obtenu avec cet exemple montre que le programme `fib.py` a pris 0.08&nbsp;s de *temps utilisateur* pour s'exécuter. Cela signifie qu'entre le moment où le programme a été lancé dans le terminal et le moment où il s'est terminé, 0.08&nbsp;s se sont écoulées. On peut également voir que le programme n'a pris que 0.01&nbsp;s de *temps système*. Comme détaillé plus loin, à [la section&nbsp;3.3](../type-de-temps/), on verra qu'il existe différents types de temps.

Sous Windows, on peut utiliser la commande `Measure-Command` de l'interpréteur de commande de l'outil *Windows Powershell* :

```
> Measure-Command { python fib.py }

Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 0
Milliseconds      : 71
Ticks             : 712543
TotalDays         : 8,24702546296296E-07
TotalHours        : 1,97928611111111E-05
TotalMinutes      : 0,00118757166666667
TotalSeconds      : 0,0712543
TotalMilliseconds : 71,2543
```

Avec cette commande sous Windows, seul le temps utilisateur est renseigné dans le résultat, et dans plusieurs unités différentes. On a un temps d'exécution de 0.07&nbsp;s, valeur similaire à celle obtenue précédemment.

Cette façon de procéder est évidemment limitée à la mesure du temps d'exécution d'un programme complet. De plus, elle prend aussi en compte le temps de démarrage de la machine virtuelle Python.

## Chronomètre manuel avec Python

Une autre possibilité pour mesurer le temps d'exécution consiste à le faire directement depuis le programme, en Python. Cette façon de faire est même nécessaire si l'on veut ne mesurer que le temps d'exécution d'une partie de programme. La façon la plus simple consiste à utiliser la *fonction `time`* du *module `time`*. Cette dernière renvoie le nombre de secondes écoulées depuis le 1<sup>er</sup> janvier 1970 et, en capturant cette valeur avant et après l'exécution d'une partie de programme, on va pouvoir connaitre le temps qu'elle a pris pour s'exécuter.

Mesurons, par exemple, le temps que prend l'exécution de `fib(25)` grâce au code suivant, où `start` et `end` figent des instants dans le temps :

``` python
start = time.time()

fib(25)

end = time.time()
elapsed = end - start

print(f'Temps d\'exécution : {elapsed:.2} s')
```

Un problème avec cette méthode est que l'on ne mesure le temps d'exécution d'une partie de programme qu'une seule fois. Si on relance plusieurs fois le programme, la valeur mesurée va fort probablement varier, notamment selon l'occupation de l'ordinateur, par d'autres activités. Voici le résultat d'une exécution de ce programme :

```
Temps d'exécution : 0.04 s
```

Ce problème de précision se présente évidemment également avec les mesures faites avec les outils du système d'exploitation. Pour y pallier, il faut répéter la mesure plusieurs fois et calculer une moyenne sur plusieurs exécutions. Ceci est évidemment plus facile à faire lorsque les mesures de temps sont directement réalisées en Python.

Voici une version modifiée du code de mesure qui va répéter la mesure du temps d'exécution 100 fois et stocker tous les temps mesurés dans une liste. On utilise ensuite le *module `statistics`* pour calculer la moyenne et l'écart-type des temps d'exécution mesurés :

``` python
measures = []
for i in range(100):
    start = time.time()
    
    fib(25)
    
    end = time.time()
    measures.append(end - start)

mean = statistics.mean(measures)
stdev = statistics.stdev(measures)

print('Temps d\'exécution :')
print(f' - Moyenne : {mean:.2f} s')
print(f' - Écart-type : {stdev:.3f} s')
```

L'exécution de ce programme donne la moyenne et l'écart-type des temps d'exécution sur 100 exécutions de l'appel `fib(25)` :

```
Temps d'exécution :
 - Moyenne : 0.04 s
 - Écart-type : 0.002 s
```

Le deuxième problème de cette méthode est qu'il faut modifier le code à mesurer, de manière plutôt intrusive, pour pouvoir effectuer les mesures des temps d'exécution. Ce problème ne se présentait pas en utilisant les outils du système d'exploitation.
