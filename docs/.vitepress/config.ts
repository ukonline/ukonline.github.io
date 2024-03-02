import { defineConfig } from 'vitepress'

import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  title: 'UKOnline',
  description: 'Ce site propose des cours relatifs à des domaines comme l\'informatique, les mathématiques, etc. Ils sont accompagnés de ressources tel que des exercices et projets.',
  lang: 'fr-BE',
  head: [
    [ 'link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } ],
  ],
  themeConfig: {
    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante',
    },
    footer: {
      copyright: 'CC BY-NC-ND 4.0, UKOnline 2000–2023.',
      message: 'Propulsé par AEI Consulting.',
    },
    nav: [
      { text: 'Accueil', link: '/' },
      {
        text: 'Cours',
        items: [
          { text: 'Accueil', link: '/cours/' },
          {
            text: 'Programmation',
            items: [
              { text: 'Python', link: '/cours/python/' },
            ]
          },
          {
            text: 'Sciences',
            items: [
              { text: 'Mathématiques', link: '/cours/math/' },
            ]
          },
        ]
      },
    ],
    outlineTitle: 'Sur cette page',
    sidebar: {
      '/cours/math/stats-base/': [
        {
          text: 'Statistiques : Concepts de base et vocabulaire',
          link: '/cours/math/stats-base/',
          items: [
            {
              text: 'Chapitre 1 : Statistique',
              link: '/cours/math/stats-base/statistique/',
              collapsed: true,
              items: [
                {
                  text: 'Définition',
                  link: '/cours/math/stats-base/statistique/definition/',
                },
                {
                  text: 'Population et échantillon',
                  link: '/cours/math/stats-base/statistique/population-et-echantillon/',
                },
                {
                  text: 'Échantillonnage',
                  link: '/cours/math/stats-base/statistique/echantillonnage/',
                },
              ]
            },
            {
              text: 'Chapitre 2 : Variable',
              link: '/cours/math/stats-base/variable/',
              collapsed: true,
              items: [
                {
                  text: 'Définition',
                  link: '/cours/math/stats-base/variable/definition/',
                },
                {
                  text: 'Observation',
                  link: '/cours/math/stats-base/variable/observation/',
                },
                {
                  text: 'Caractéristique',
                  link: '/cours/math/stats-base/variable/caracteristique/',
                },
              ]
            },
            {
              text: 'Chapitre 3 : Classe',
              link: '/cours/math/stats-base/classe/',
              collapsed: true,
              items: [
                {
                  text: 'Définition',
                  link: '/cours/math/stats-base/classe/definition/',
                },
                {
                  text: 'Définition des classes',
                  link: '/cours/math/stats-base/classe/definition-des-classes/',
                },
                {
                  text: 'Fréquence des observations',
                  link: '/cours/math/stats-base/classe/frequence-des-observations/',
                },
              ]
            },
          ]
        },
      ],
      '/cours/python/optimisation/': [
        {
          text: 'Python efficace : Pratiques et astuces d\'optimisation de code',
          link: '/cours/python/optimisation/',
          items: [
            {
              text: 'Chapitre 1 : Expression idiomatique',
              link: '/cours/python/optimisation/expression-idiomatique/',
              collapsed: true,
              items: [
                {
                  text: 'Concaténation de chaines de caractères',
                  link: '/cours/python/optimisation/expression-idiomatique/concatenation-de-chaines-de-caracteres/',
                },
                {
                  text: 'Définition de liste',
                  link: '/cours/python/optimisation/expression-idiomatique/definition-de-liste/',
                },
                {
                  text: 'Génération à la demande',
                  link: '/cours/python/optimisation/expression-idiomatique/generation-a-la-demande/',
                },
                {
                  text: 'Parcours de collection',
                  link: '/cours/python/optimisation/expression-idiomatique/parcours-de-collection/',
                },
                {
                  text: 'Gestion d\'erreur',
                  link: '/cours/python/optimisation/expression-idiomatique/gestion-d-erreur/',
                },
                {
                  text: 'Variable locale',
                  link: '/cours/python/optimisation/expression-idiomatique/variable-locale/',
                },
              ]
            },
            {
              text: 'Chapitre 2 : Technique d\'optimisation',
              link: '/cours/python/optimisation/technique-d-optimisation/',
              collapsed: true,
              items: [
                {
                  text: 'Exécution de code Python',
                  link: '/cours/python/optimisation/technique-d-optimisation/execution-de-code-python/',
                },
                {
                  text: 'Optimisation de code',
                  link: '/cours/python/optimisation/technique-d-optimisation/optimisation-de-code/',
                },
                {
                  text: 'Style de programmation',
                  link: '/cours/python/optimisation/technique-d-optimisation/style-de-programmation/',
                },
                {
                  text: 'Fonction prédéfinie',
                  link: '/cours/python/optimisation/technique-d-optimisation/fonction-predefinie/',
                },
                {
                  text: 'Structure de données',
                  link: '/cours/python/optimisation/technique-d-optimisation/structure-de-donnees/',
                },
                {
                  text: 'Flux d\'exécution',
                  link: '/cours/python/optimisation/technique-d-optimisation/flux-d-execution/',
                },
              ]
            },
            {
              text: 'Chapitre 3 : Mesure de performance',
              link: '/cours/python/optimisation/mesure-de-performance/',
              collapsed: true,
              items: [
                {
                  text: 'Temps d\'exécution',
                  link: '/cours/python/optimisation/mesure-de-performance/temps-d-execution/',
                },
                {
                  text: 'Module timeit',
                  link: '/cours/python/optimisation/mesure-de-performance/module-timeit/',
                },
                {
                  text: 'Type de temps',
                  link: '/cours/python/optimisation/mesure-de-performance/type-de-temps/',
                },
                {
                  text: 'Consommation mémoire',
                  link: '/cours/python/optimisation/mesure-de-performance/consommation-memoire/',
                },
                {
                  text: 'Module tracemalloc',
                  link: '/cours/python/optimisation/mesure-de-performance/module-tracemalloc/',
                },
                {
                  text: 'Module guppy',
                  link: '/cours/python/optimisation/mesure-de-performance/module-guppy/',
                }
              ]
            },
            {
              text: 'Chapitre 4 : Audit de code',
              link: '/cours/python/optimisation/audit-de-code/',
              collapsed: true,
              items: [
                {
                  text: 'Profilage',
                  link: '/cours/python/optimisation/audit-de-code/profilage/',
                },
                {
                  text: 'Profil de temps d\'exécution',
                  link: '/cours/python/optimisation/audit-de-code/profil-de-temps-d-execution/',
                },
                {
                  text: 'Appel de fonction',
                  link: '/cours/python/optimisation/audit-de-code/appel-de-fonction/',
                },
                {
                  text: 'Profil de consommation mémoire',
                  link: '/cours/python/optimisation/audit-de-code/profil-de-consommation-memoire/',
                },
                {
                  text: 'Opportunité d\'optimisation',
                  link: '/cours/python/optimisation/audit-de-code/opportunite-d-optimisation/',
                },
              ]
            },
          ]
        },
      ]
    },
    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/ukonline.be' },
    ]
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  }
})
