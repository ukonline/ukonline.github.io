<script setup>
import CourseCard from '../../.vitepress/components/CourseCard.vue'

import python_snake from './apprendre-python/cover.jpg'
import compact_antenna from './optimisation/cover.jpg'

const courses = [{
  authors: ['Sébastien Combéfis', 'Quentin Lurkin'],
  chapters: 13,
  cover: python_snake,
  description: 'Ce cours propose une introduction à la programmation avec le langage Python. Il présente les bases du langage, à savoir les types de données, les variables, les fonctions et procédures, les séquences, la programmation orientée objet, la programmation évènementielle et la création d\'interfaces graphiques et, enfin, la gestion des erreurs. Il introduit également au concept d\'algorithme et de leurs implémentations.',
  link: 'apprendre-python/',
  title: 'Apprendre Python et s\'initier à la programmation'
}, {
  authors: ['Sébastien Combéfis'],
  chapters: 4,
  cover: compact_antenna,
  description: 'Ce cours présente des astuces permettant d\'écrire du code Python efficace, tant par rapport au temps d\'exécution que par rapport à la consommation mémoire. Il permet de découvrir comment écrire un code « pythonique » et exploiter au mieux les constructions du langage. Il explique également comment mesurer les performances d\'un programme et comment réaliser un simple audit de ses performances.',
  link: 'optimisation/',
  title: 'Python efficace : Pratiques et astuces d\'optimisation de code'
}]
</script>

# Python

_Python_ est un langage de programmation multi-paradigmes favorisant principalement la programmation impérative structurée, fonctionnelle et orientée-objet. Ce langage a été créé par _Guido van Rossum_ en 1990 et est, depuis ses débuts, distribué en open source. Son développement est aujourd'hui assuré par la _Python Software Foundation_ (PSF), une association sans but lucratif fondée en 2001.

Python est un langage interprété fonctionnant sur la plupart des plateformes informatiques. Il est très apprécié des pédagogues, qui considèrent que ce langage permet une initiation aisée aux concepts de base de la programmation. Le langage Python en est aujourd'hui à sa version _3.11.3_ (sortie le 5 avril 2023).

## Liste des cours

<template v-for="course in courses">
  <course-card :course="course" />
</template>
