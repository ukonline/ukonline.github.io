# Définition de classes pour une variable continue

Pour ce troisième exercice, vous devez *définir des classes* pour une variable continue et caractériser les classes ainsi définies, le tout à partir d'une description textuelle d'un phénomène que l'on souhaite vouloir étudier et des données qui ont été collectées.

Pour réussir l'exercice, vous devez répondre précisément, correctement et de manière convaincante à toutes les questions de l'exercice. Vous veillerez à donner le détail de votre raisonnement, que ce soit par écrit ou lors d'un entretien oral, selon les instructions de l'enseignant(e).

## Cas 1

On est intéressé par le nombre d'heures de récupération que les employé(e)s d'une entreprise prestent mensuellement. Pour cela, on a collecté ce nombre d'heures auprès de 20 employé(e)s de l'entreprise qui en compte en tout 250.

Voici les données qui ont été collectées (en minutes) :

<div class="center">
  <table>
    <tr>
      <td>65</td>
      <td>42</td>
      <td>30</td>
      <td>110</td>
      <td>109</td>
      <td>78</td>
      <td>43</td>
      <td>83</td>
      <td>92</td>
      <td>103</td>
    </tr>
    <tr>
      <td>112</td>
      <td>64</td>
      <td>12</td>
      <td>36</td>
      <td>73</td>
      <td>94</td>
      <td>78</td>
      <td>81</td>
      <td>117</td>
      <td>59</td>
    </tr>
  </table>
</div>

1. Quelle est l'étendue de l'échantillon ?
1. Combien de classes faut-il définir (selon la règle de Sturges) ?
1. Quelle est la longueur des intervalles représentant les classes ?
1. Définissez les classes (en détaillant les intervalles correspondant) et listez les observations faisant partie de chaque classe.
1. Établissez le tableau qui reprend les fréquences des observations pour chaque classe, ainsi que les proportions associées.

::: details Solution
Le plus grand échantillon est $117$ et le plus petit est $12$, ce qui donne une **étendue** de $E = 117 - 12 = 105$. L'échantillon comporte $n = 20$ individus et devrait être divisé en $k = 1 + \log_2 20 \approx 1 + \frac{10}{3} \log_{10} 20 \approx 5,\!3368... \approx$ **5 classes**. Par conséquent, chaque intervalle de la découpe en classes fera $\ell = 105 / 5 = 21$ de **longueur**. Le premier **intervalle** va donc s'étendre de $12$ jusque $12 + 21 = 33$. Le suivant démarre à $33$ pour aller jusque $33 + 21 = 54$, et ainsi de suite. On peut ensuite aisément classer chaque **observation** dans le bon intervalle. À partir du classement, le décompte des **fréquences** et le calcul des **proportions** associées est immédiat. En résumé :
1. $E = 117 - 12 = 105$
1. $k = 1 + \log_2 20 \approx 1 + \frac{10}{3} \log_{10} 20 \approx 5,\!3368... \approx 5$
1. $\ell = 105 / 5 = 21$
1. Les cinq intervalles et la répartition des observations sont :

<div class="center">
  <table>
    <tr>
      <td>

$j_1 = [ 12; 33 [$
</td>
      <td>30, 12</td>
    </tr>
    <tr>
      <td>

$j_2 = [ 33; 54 [$
</td>
      <td>42, 43, 36</td>
    </tr>
    <tr>
      <td>

$j_3 = [ 54; 75 [$
</td>
      <td>65, 64, 73, 59</td>
    </tr>
    <tr>
      <td>

$j_4 = [ 75; 96 [$
</td>
      <td>78, 83, 92, 94, 78, 81</td>
    </tr>
    <tr>
      <td>

$j_5 = [ 96; 117 ]$
</td>
      <td>110, 109, 103, 112, 117</td>
    </tr>
  </table>
</div>

5. Le tableau des fréquences des observations par classe et les proportions associées sont :

<div class="center">

| Classe    | Fréquence ($f$) | Proportion ($p$) |
|:----------|:----------------|:-----------------|
| $j_1$     | 2               | 10%              |
| $j_2$     | 3               | 15%              |
| $j_3$     | 4               | 20%              |
| $j_4$     | 6               | 30%              |
| $j_5$     | 5               | 25%              |
| **Total** | 20              | 100,00%          |

</div>
:::

## Cas 2

On est intéressé par le nombre d'élèves de primaire dans les classes des écoles en Fédération Wallonie-Bruxelles. Pour cela, on a compté le nombre d'élèves dans 30 classes d'écoles différentes.

Voici les données qui ont été collectés :

<div class="center">
  <table>
    <tr>
      <td>27</td>
      <td>14</td>
      <td>34</td>
      <td>32</td>
      <td>29</td>
      <td>25</td>
      <td>36</td>
      <td>37</td>
      <td>21</td>
      <td>26</td>
    </tr>
    <tr>
      <td>31</td>
      <td>38</td>
      <td>27</td>
      <td>25</td>
      <td>29</td>
      <td>18</td>
      <td>21</td>
      <td>26</td>
      <td>25</td>
      <td>31</td>
    </tr>
    <tr>
      <td>35</td>
      <td>32</td>
      <td>33</td>
      <td>26</td>
      <td>29</td>
      <td>22</td>
      <td>32</td>
      <td>27</td>
      <td>25</td>
      <td>30</td>
    </tr>
  </table>
</div>

1. Quelle est l'étendue de l'échantillon ?
1. Combien de classes faut-il définir (selon la règle de Sturges) ?
1. Quelle est la longueur des intervalles représentant les classes ?
1. Définissez les classes (en détaillant les intervalles correspondant) et listez les observations faisant partie de chaque classe.
1. Établissez le tableau qui reprend les fréquences des observations pour chaque classe, ainsi que les proportions associées.

::: details Solution
1. $E = 38 - 14 = 24$
1. $k = 1 + \log_2 30 \approx 1 + \frac{10}{3} \log_{10} 30 \approx 5,\!9237... \approx 6$
1. $\ell = 24 / 6 = 4$
1. Les cinq intervalles et la répartition des observations sont :

<div class="center">
  <table>
    <tr>
      <td>

$j_1 = [ 14; 18 [$
</td>
      <td>14</td>
    </tr>
    <tr>
      <td>

$j_2 = [ 18; 22 [$
</td>
      <td>21, 18, 21</td>
    </tr>
    <tr>
      <td>

$j_3 = [ 22; 26 [$
</td>
      <td>25, 25, 25, 22, 25</td>
    </tr>
    <tr>
      <td>

$j_4 = [ 26; 30 [$
</td>
      <td>27, 29, 26, 27, 29, 26, 26, 29, 27</td>
    </tr>
    <tr>
      <td>

$j_5 = [ 30; 34 [$
</td>
      <td>32, 31, 31, 32, 33, 32, 30</td>
    </tr>
    <tr>
      <td>

$j_6 = [ 34; 38 ]$
</td>
      <td>34, 36, 37, 38, 35</td>
    </tr>
  </table>
</div>

5. Le tableau des fréquences des observations par classe et les proportions associées sont :

<div class="center">

| Classe    | Fréquence ($f$) | Proportion ($p$) |
|:----------|:----------------|:-----------------|
| $j_1$     | 1               | 3,33%            |
| $j_2$     | 3               | 10,00%           |
| $j_3$     | 5               | 16,67%           |
| $j_4$     | 9               | 30,00%           |
| $j_5$     | 7               | 23,33%           |
| $j_6$     | 5               | 16,67%           |
| **Total** | 30              | 100,00%          |

</div>
:::
