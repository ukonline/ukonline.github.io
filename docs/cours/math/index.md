<script setup>
import CourseCard from '../../.vitepress/components/CourseCard.vue'

const courses = [{
  authors: ['Sébastien Combéfis'],
  chapters: 3,
  cover: './stats-base/cover.jpg',
  description: 'Ce cours propose une introduction aux statistiques en introduisant les concepts de base et le vocabulaire associés. En particulier, il définit les notions d\'individu, de population et d\'échantillon et présente ce que sont les variables et leurs caractéristiques. Il présente également la notion de classe et comment elles sont établies et utilisées dans le cadre d\'une simple analyse basée sur les fréquences d\'observation.',
  link: 'stats-base/',
  title: 'Statistiques : Concepts de base et vocabulaire'
}]
</script>

# Mathématiques

XXX

## Liste des cours

<template v-for="course in courses">
  <course-card :course="course" />
</template>
