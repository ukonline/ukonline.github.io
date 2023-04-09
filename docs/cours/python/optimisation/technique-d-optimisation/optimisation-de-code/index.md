# Optimisation de code

Une fois l'interpréteur Python choisi, on peut s'attaquer à l'*optimisation du code*, à proprement parler. Il faut néanmoins faire attention lorsque l'on s'attelle à une telle activité. Il faut, en effet, n'optimiser qu'un code qui nécessite de l'optimisation, au risque d'empirer la situation. Comme l'a dit Donald Knuth&nbsp;: <i>“Premature optimization is the root of all evil.”</i> Il ne faut dès lors pas commencer par optimiser son code tant que celui-ci ne fait pas ce qu'il doit faire, et ce, correctement.

Une fois que l'on s'est assuré que le code fonctionne, avec des *tests unitaires*, par exemple, on peut l'analyser pour évaluer s'il est nécessaire d'améliorer ses performances. On pourrait, par exemple, se rendre compte qu'il est trop lent ou qu'il consomme trop de mémoire. À ce moment, on peut alors envisager d'entamer une optimisation de code.

Cette démarche d'optimisation se résume en quatre étapes :
1. Écrire un code correct, qui fait ce qu'il doit faire.
2. Tester le code, pour s'assurer qu'il soit correct.
3. Profiler le code, pour évaluer s'il est assez performant.
4. Optimiser le code.

Une fois l'étape&nbsp;4 terminée, il est important de recommencer à l'étape&nbsp;2, pour s'assurer que les optimisations n'ont pas cassé le programme, le rendant incorrect. Pour résumer, comme l'a dit Kent Beck&nbsp;: <i>“First make it work. Then make it right. Then make it fast.”</i>
