# Module guppy

Enfin, une autre possibilité pour obtenir de l'information sur la consommation mémoire consiste à utiliser le *module `guppy`*. Ce dernier contient notamment un sous-module d'analyse du contenu du *tas*. Ce sous-module, dénommé <i>Heapy</i>, est plutôt complexe à apprendre, mais il est néanmoins possible de facilement réaliser de simples analyses.

## Analyse du tas

Pour effectuer une analyse du tas, il faut d'abord créer un contexte de session avec la *fonction `hpy`*. On peut ensuite créer une capture de tous les objets qui sont accessibles en RAM avec la méthode `heap`. Voici un simple exemple d'utilisation du module `guppy` :

``` python
from guppy import hpy

hp = hpy()
print(hp.heap())
```

En observant le résultat de l'exécution, on se rend compte que, sans avoir rien fait de particulier, il y a déjà une multitude d'objets créés en mémoire. Le résultat montre, par exemple, qu'il y a déjà 11.116 objets de type `str` en mémoire, ce qui représente 31% de la mémoire totale utilisée, soit 997.255 octets des 4.570.543 octets utilisés.

On peut voir le même type d'information pour toute une série d'autres types d'objet, chaque ligne du résultat rassemblant précisément l'information collectée pour tous les objets d'un même type :

```
Partition of a set of 35935 objects. Total size = 4570543 bytes.
 Index  Count   %     Size   % Cumulative  % Kind (class / dict of class)
     0  11116  31   997255  22    997255  22 str
     1   7081  20   491872  11   1489127  33 tuple
     2   2518   7   444728  10   1933855  42 types.CodeType
     3   4988  14   350056   8   2283911  50 bytes
     4    446   1   346896   8   2630807  58 type
     5   2327   6   316472   7   2947279  64 function
     6      2   0   262480   6   3209759  70 _io.BufferedWriter
     7    446   1   243480   5   3453239  76 dict of type
     8     97   0   164832   4   3618071  79 dict of module
     9      1   0   131240   3   3749311  82 _io.BufferedReader
<115 more rows. Type e.g. '_.more' to view.>
```

Pour mesurer la consommation de mémoire résultant de l'exécution d'une partie de programme uniquement, il faut réaliser une capture avant et après la partie de programme d'intérêt.

Néanmoins, contrairement au module `tracemalloc`, il n'est pas possible de facilement comparer deux captures avec le module `guppy`. Pour réaliser une telle analyse, ce qu'il faut donc faire, c'est réinitialiser la surveillance de la mémoire avec la méthode `setrelheap`. Ainsi, la prochaine capture réalisée contiendra uniquement les objets créés en mémoire à partir de l'appel à cette méthode jusqu'à l'appel à la méthode `heap`.

L'exemple suivant illustre comment réaliser une telle analyse, de la consommation mémoire d'une partie de programme uniquement :

``` python
hp = hpy()
hp.setrelheap()

data = [i/10 for i in range(100)]
labels = [str(i) for i in data]

print(hp.heap())
```

Comme on peut le voir sur le résultat de l'exécution, il y a exactement 100 objets de type `str`, 100 objets de type `float`, 2 objets de type `list` et enfin 1 objet de type `types.FrameType`, qui ont été créés dans le tas, suite à l'exécution des deux instructions qui ont créé les deux objets respectivement référencés par les variables `data` et `labels` :

```
Partition of a set of 203 objects. Total size = 9816 bytes.
 Index  Count   %     Size   % Cumulative  % Kind (class / dict of class)
     0    100  49     5200  53      5200  53 str
     1    100  49     2400  24      7600  77 float
     2      2   1     1808  18      9408  96 list
     3      1   0      408   4      9816 100 types.FrameType
```

Contrairement aux analyses que l'on a pu faire dans les sections précédentes, les informations que l'on obtient avec le module `guppy` sont bien plus précises et concernent uniquement la mémoire allouée dans le tas, et pas ce qui se trouve dans la pile, comme les variables locales.

## Relation d'équivalence

Par défaut, la méthode `heap` rassemble, dans son résultat, tous les objets qu'elle a capturés dans la mémoire en suivant la relation d'équivalence <i>&laquo;&nbsp;Clodo&nbsp;&raquo;</i> (<i>Class or dict owner</i>). Selon cette relation, tous les objets provenant de la même classe ou du même dictionnaire sont repris dans une même ligne du résultat.

D'autres relations d'équivalence peuvent être utilisées, notamment `bytype` qui rassemble les objets par type et `byrcs` qui les rassemble selon les types des objets ayant une référence vers eux. En repartant de la capture mémoire faite dans la section précédente, on peut en savoir plus sur les objets <i>&laquo;&nbsp;conteneurs&nbsp;&raquo;</i> avec :

```
print(h.byrcs)
```

La partition obtenue avec cette instruction montre que 200 des objets du tas sont référencés par des objets de type `list`, que deux sont référencés par le dictionnaire du module et qu'un n'est pas référencé :

```
Partition of a set of 203 objects. Total size = 9816 bytes.
 Index  Count   %     Size   % Cumulative  % Referrers by Kind (class / dict of class)
     0    200  99     7600  77      7600  77 list
     1      2   1     1808  18      9408  96 dict of module
     2      1   0      408   4      9816 100 <Nothing>
```

Le *dictionnaire de module*, accessible avec la fonction `globals`, contient toutes les variables globales déclarées dans le module. C'est la raison pour laquelle les objets référencés par les variables `data` et `labels` y sont également référencés.

On peut raffiner l'analyse précédente en identifiant, par exemple, les types des objets référencés par des objets de type `list`, avec :

``` python
print(h.byrcs[0].byclodo)
```

La partition obtenue avec cette instruction montre que, parmi les 200 objets référencés par des listes, et comme on avait déjà pu l'observer précédemment, il y a 100 objets de type `str` et 100 de type `float` :

```
Partition of a set of 200 objects. Total size = 7600 bytes.
 Index  Count   %     Size   % Cumulative  % Kind (class / dict of class)
     0    100  50     5200  68      5200  68 str
     1    100  50     2400  32      7600 100 float
```

Il y a encore beaucoup d'autres possibilités permettant des analyses très poussées avec le module `guppy`, mais elles sortent du cadre de ce livre.
