---
prev:
  text: Table des matières
---

# Expression idiomatique

Les utilisateurs d'un langage de programmation, tout comme ceux d'une langue naturelle d'ailleurs, finissent par développer des *expressions idiomatiques* dans ce langage, c'est-à-dire des expressions particulières qui n'ont pas nécessairement d'équivalent littéral dans d'autres langages.

Dans le cas d'un langage de programmation, ces expressions idiomatiques ne sont pas vérifiées par le compilateur, et tout programmeur est libre de les utiliser ou non dans ses codes. Python étant assez différent des autres langages populaires à l'époque de son introduction, la communauté a commencé à utiliser l'adjectif *&laquo;&nbsp;pythonique&nbsp;&raquo;* pour qualifier un code qui est bien conçu et est en accord avec ces fameuses expressions idiomatiques établies de fait par la communauté.

Tout a commencé avec la célèbre [PEP 20 – The Zen of Python](https://www.python.org/dev/peps/pep-0020), de Tim Peters. Cette proposition reprend quelques règles, énoncées sous la forme d'un poème, pour exprimer les valeurs du langage. À tout moment, vous pouvez obtenir ces règles, reprises à la figure&nbsp;1.1, en exécutant l'instruction `import this` dans un interpréteur Python. Pour résumer les points essentiels, on retiendra que les programmeurs Python aiment être explicites, qu'ils préfèrent choisir le simple plutôt que le complexe et qu'ils feront tout pour maximiser la lisibilité de leurs codes.

<figure>

```
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```
  <figcaption>Figure 1.1&nbsp;–&nbsp;La PEP 20, écrite par Tim Peters, exprime sous forme d'un poème les valeurs du langage Python. On peut l'obtenir avec l'instruction <code>import this</code>.</figcaption>
</figure>

Justement, concernant la *lisibilité* d'un code Python, on peut se référer à la [PEP 8 – Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008). Elle définit une série de règles de style formant un socle commun à tout projet Python. Il s'agit d'un guide permettant à tout programmeur d'écrire des codes qui respectent le style Python, que l'on est évidemment libre de suivre ou non. Les règles reprises dans ce document sont souvent automatiquement vérifiées par les environnements de développement intégrés ou peuvent l'être manuellement avec des outils, notamment [*Pylint*](https://www.pylint.org). On y retrouve, par exemple, une règle qui indique que les *indentations* dans un programme Python se font avec quatre espaces par niveau d'indentation.

Écrire un code <i>&laquo;&nbsp;pythonique&nbsp;&raquo;</i> est donc généralement souhaitable, dans le but d'améliorer la lisibilité de vos programmes. Cela permettra notamment de faciliter leur maintenance et également le partage avec la communauté et le développement collaboratif. Maitriser les constructions offertes par le langage Python, et les utiliser, accélérera également votre vitesse de développement.

En plus de tout cela, utiliser les expressions idiomatiques de Python peut également améliorer les performances de vos programmes. Ce bénéfice peut se présenter tant au niveau du temps d'exécution que de l'espace mémoire utilisé, comme on va le découvrir tout au long de ce chapitre.
