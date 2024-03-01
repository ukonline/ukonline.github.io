# Caractéristique

Cette section présente quatre éléments qui peuvent être utilisés pour *caractériser* les variables, à savoir le caractère qualitatif ou quantitatif et discret ou continu, et les notions de paramètre et de dimension.

## Caractère qualitatif et quantitatif

Si l'on s'intéresse aux valeurs qui sont possibles pour une variable donnée, on va pouvoir caractériser cette dernière comme étant qualitative ou quantitative. Cette caractérisation aura de l'importance par rapport aux types d'analyses statistiques qu'il sera possible de faire ou non, en utilisant la variable.

### Variable qualitative

Une variable est dite *qualitative* si elle exprime une qualité que l'on ne peut pas représenter par une valeur numérique exploitable mathématiquement. Par exemple, on ne pourra pas additionner les valeurs obtenues à partir d'une variable qualitative.

::: info Définition
Une variable est dite qualitative si elle ne peut pas s'exprimer sous forme d'une valeur numérique exploitable mathématiquement.
:::

On distingue généralement deux types de variables qualitatives, en fonction des caractéristiques de leurs valeurs possibles. Une variable qualitative est dite *nominale* si ses valeurs possibles ne peuvent pas être hiérarchisées. Cela signifie que l'on ne peut pas établir d'ordre entre les valeurs de ces variables. Au contraire, si cela est possible, la variable qualitative est dite *ordinale*.

::: info Définition
Une variable qualitative est dite ordinale s'il est possible d'établir un ordre entre ses valeurs possibles. Dans le cas contraire, la variable qualitative est dite nominale.
:::

::: info Exemple
Si l'on revient à l'étude statistique sur la taille des Belges, on pourrait mesurer la taille sur une échelle à trois valeurs, plutôt que d'avoir la taille précise en centimètres, avec la définition suivante :
$$X = \textit{« la taille, indiqu\'ee par l'une des trois valeurs suivantes : petite, normale ou grande »}.$$

Cette variable $X'$ est un exemple de variable qualitative ordinale car on peut établir l'ordre suivant entre les valeurs possibles :
$$petite < normale < grande.$$

Une autre variable d'intérêt pour cette étude est le sexe biologique, dont les valeurs possibles sont <i>«&nbsp;homme&nbsp;»</i> et <i>«&nbsp;femme&nbsp;»</i>. Comme on ne peut pas ordonner ces valeurs entre elles, aucune des deux ne pouvant être considérée comme la première et l'autre comme la seconde, on a un exemple de variable qualitative nominale.
:::

Notez que l'on entend parfois *variable catégorique* ou catégorielle pour désigner les variables qualitatives. Notez également que l'on rencontre parfois la notion de *variable qualitative binaire*, ou dichotomique, pour désigner des variables qualitatives nominales qui ne possèdent que deux valeurs possibles. Le sexe biologique est un exemple d'une telle variable.

### Variable quantitative

Une variable *quantitative*, quant à elle, s'exprime par des nombres qui peuvent être exploités mathématiquement. Elles permettent des analyses plus poussées que les variables qualitatives. Comme on va le voir ci-après, on peut distinguer deux types de variables quantitatives.

## Caractère discret et continu

Si l'on s'intéresse à l'ensemble des valeurs qui sont possibles pour une variable quantitative donnée, on va pouvoir caractériser cette dernière comme étant discrète ou continue. Cette caractérisation aura de l'importance par rapport aux types d'analyses statistiques qu'il sera possible de faire ou non, en utilisant la variable.

### Variable discrète

Une variable est dite *discrète* si l'ensemble de toutes les valeurs possibles qu'elle pourrait prendre est un ensemble fini. Une autre manière de dire la même chose est que l'on doit être capable d'écrire la liste exhaustive de toutes les valeurs possibles pour une variable, même si cette liste est très longue, pour qu'elle puisse être considérée comme une discrète.

::: info Définition
Une variable quantitative est dite discrète si l'ensemble de ses valeurs possibles forme un ensemble fini.
:::

Les variables quantitatives discrètes sont généralement plus simples à analyser et traiter, mais certaines analyses plus poussées ne sont pas possibles avec ce type de variable.

::: info Exemple
Imaginons que l'on mène une enquête de satisfaction auprès de 100 clients d'un supermarché et qu'ils et elles doivent fournir leur niveau de satisfaction par un nombre entier entre 1 et 10. La variable :
$$S = \textit{« le niveau de satisfaction, indiqu\'e par un nombre entier sur une \'echelle de 1 \`a 10, o\`u 10 est la satisfaction la plus grande »}.$$

est donc une variable quantitative discrète, puisque l'ensemble des valeurs possibles pour cette variable est fini. Toutes les observations $s_i$ que l'on pourra faire font partie de l'ensemble suivant :
$$s_i \in \{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \}.$$
:::

### Variable continue

Une variable est dite *continue* si l'ensemble de toutes les valeurs possibles qu'elle pourrait prendre n'est pas un ensemble fini. Une autre manière de dire la même chose est qu'il n'est pas possible de dresser la liste exhaustive de toutes les valeurs possibles pour la variable, car cette liste possède une infinité d'éléments.

::: info Définition
Une variable quantitative est dite continue si l'ensemble de ses valeurs possibles forme un ensemble infini.
:::

Les variables quantitatives continues sont généralement plus complexes à analyser et traiter, mais des analyses plus poussées se basant sur l'*analyse de fonctions*, sous-branche des mathématiques, sont possibles.

::: info Exemple
Imaginons que l'on mène une étude pour contrôler le poids des pots de yaourt produits par une usine, en réalisant une pesée de 10 pots pour chaque lot de 1000 pots produits. La variable :
$$P = \textit{« le poids, en grammes »},$$

est donc une variable quantitative continue, puisque l'ensemble des valeurs possibles que pourrait théoriquement prendre cette variable est infini. Les valeurs de la variable seront des nombres réels positifs, si l'on considère des mesures infiniment précises, avec un nombre illimité de chiffres après la virgule. Toutes les observations $p_i$ que l'on pourra faire font partie de l'ensemble suivant :
$$p_i \in \mathbb{R}^+.$$
:::

### Détermination du caractère discret ou continu

La variable $P$ pourrait également être considérée comme une variable discrète, selon le type de mesure qui sera réalisé et le contexte de l'étude.

En effet, si l'on considère qu'étant donné la taille des pots de yaourt, ils ne pourront de toute façon pas contenir plus de 100 grammes de yaourt et que les mesures réalisées se font au gramme près, sans chiffres après la virgule, alors on pourrait dire que la variable est discrète.

Dans ce dernier cas, c'est-à-dire si on apporte ces précisions à la définition de la variable $P$, on a en effet que toutes les observations $p_i$ que l'on pourra faire font partie de l'ensemble suivant :
$$p_i \in \{ 0, 1, 2, \cdots, 100 \},$$

qui est bel et bien un ensemble fini dont on peut établir la liste exhaustive des 101 valeurs différentes possibles.

Le caractère discret ou continu d'une variable peut donc dépendre de sa définition. Pour cette raison, c'est important de définir précisément une variable, sans quoi on risque de ne pas savoir établir son caractère discret ou continu et programmer des analyses impossibles à réaliser.

## Paramètre

Étant donné un échantillon, on va d'abord réaliser des observations pour les variables d'intérêt et pour chaque individu de ce dernier.

Pour rappel, la valeur d'une variable est propre à chaque individu. Les observations récoltées donnent donc une première information sur l'objet de l'étude, mais elles sont liées à chaque individu de l'échantillon et ne sont pas globales à ce dernier.

Parfois, on est effectivement intéressé par l'obtention d'informations directement liées l'échantillon, pour une variable donnée. Une telle information est appelée *paramètre* de la variable. Un paramètre est une caractéristique d'une variable qui se calcule sur la base des observations faites sur l'échantillon, pour cette variable. Il possède une unique valeur pour un échantillon donné, qui est donc globale à ce dernier.

::: info Définition
Un paramètre d'une variable est une information globale à un échantillon donné et qui le caractérise par rapport à toutes les observations faites pour ce dernier.
:::

La valeur d'un paramètre est fixe pour un échantillon donné, mais sa valeur pourrait varier pour différents choix d'échantillons. L'utilisation de paramètres est, de ce fait, notamment utilisée pour comparer différents échantillons d'une même population.

Voyons tout de suite deux exemples de paramètres, sachant qu'il y a d'autres paramètres qui existent et qui seront abordés dans les livres correspondant aux autres modules du cours décrit en introduction du livre. On pourrait vouloir connaitre la plus petite ou la plus grande observation au sein d'un échantillon.

Le *minimum* d'une variable, pour un échantillon donné, est un paramètre qui correspond à la plus petite valeur mesurée parmi les individus de l'échantillon. Le minimum correspond ainsi à la ou les plus petites observations faites dans l'échantillon. Mathématiquement, on note le minimum d'une variable $X$ par $x_{min}$.

Le *maximum* d'une variable est également un paramètre, noté $x_{max}$ pour une variable $X$. Le maximum correspond à la ou les plus grandes observations faites dans l'échantillon.

::: info Exemple
Imaginons que l'on s'intéresse à la hauteur des arbres de la forêt de Soignes, définie par la variable quantitative discrète suivante :
$$P = \textit{« la hauteur, mesur\'ee en m\`etres, avec un seul chiffre apr\`es la virgule »},$$

et supposons que l'analyse de cette variable pour les seize arbres de notre échantillon produit les observations suivantes :

<div class="center">
    <table>
        <tr>
            <td>175,9</td>
            <td>289,1</td>
            <td>365,0</td>
            <td>217,9</td>
            <td>483,1</td>
            <td>381,6</td>
            <td>217,3</td>
            <td>318,4</td>
        </tr>
        <tr>
            <td>335,7</td>
            <td>489,6</td>
            <td>561,4</td>
            <td>299,3</td>
            <td>314,9</td>
            <td>521,6</td>
            <td>452,6</td>
            <td>318,1</td>
        </tr>
    </table>
</div>

Si on s'intéresse à la plus petite observation, on va calculer le minimum de la variable $H$ et obtenir :
$$h_{min} = 175,\!9\;m.$$

Si on cherche à savoir quel est le plus grand arbre de notre échantillon, on va calculer le maximum de la variable $H$ et obtenir :
$$h_{max} = 561,\!4\;m.$$
:::

## Dimension

Enfin, terminons ce chapitre avec une dernière caractéristique des variables. Comme on l'a vu précédemment, on peut s'intéresser à plusieurs variables dans le cadre d'une même étude sur un même échantillon.

Par exemple, on avait précédemment considéré les deux variables $X$ et $Y$ dans l'exemple d'étude sur la taille des Belges. Ces variables, quand on les considère indépendamment, sont dites à une *dimension* car elles ne concernent chacune qu'un seul caractères des individus de la population.

::: info Définition
La dimension d'une variable correspond au nombre de caractères des individus qui sont pris en compte et mesurés par la variable.
:::

Il est également possible de s'intéresser à plusieurs caractères des individus, en les considérant en même temps. Ceci est primordial si l'on souhaite faire un lien entre plusieurs caractères.

Une telle variable aura *plusieurs dimensions*, autant que le nombre de caractères qui sont pris en compte. Mathématiquement, on définit une telle variable comme une liste d'autres variables, notées entre parenthèses et séparées par des virgules

::: info Exemple
Imaginons que l'on souhaite s'intéresser à la fois à la taille et au poids des Belges, afin d'étudier s'il y a un lien entre ces deux aspects. Pour cela, on va définir une nouvelle variable $Z$, qui combine les variables $X$ et $Y$ précédemment définies :
$$Z = (X, Y) = \textit{« la taille et le poids, respectivement mesur\'es en centim\`etres et en kilogrammes »},$$

Cette variable $Z$ est une variable à deux caractères, puisqu'elle permet de mesurer deux aspects des individus en même temps.
:::

Dans ce cours, on se limite aux variables à une seule dimension, plus simples à analyser que celles à plusieurs dimensions.
