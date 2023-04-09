<template>
  <a :href="course.link" class="card">
    <img :src="course.cover" class="cover" />

    <div class="description">
      <h2>{{ course.title }}</h2>
      <p>{{ course.description }}</p>
      <span class="authors">
        Par <i>{{ authors }}</i>.
      </span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  computed: {
    authors() {
      const authors = this.course.authors

      if (authors.length === 1) {
        return authors[0]
      }

      return `${authors.slice(0, -1).join(', ')} et ${authors.at(-1)}`
    }
  }
};
</script>

<style scoped>
h2 {
  border: none;
  font-size: 16px;
  line-height: 20px;
  margin: 7px 0;
  padding: 0;
}

.card {
  align-items: stretch;
  border-radius: 4px;
  box-shadow: 1px 1px 8px 0px rgba(0,0,0,.2);
  color: inherit;
  display: flex;
  font-weight: inherit;
  margin-bottom: 25px;
  transition: box-shadow .4s cubic-bezier(.25,.8,.25,1);
}
.card:hover {
  box-shadow: 1px 1px 6px 3px rgba(0,0,0,.2);
  text-decoration: none!important;
}

.cover {
  border-radius: 4px 0 0 4px;
  display: inline-block;
  object-fit: cover;
  width: 25%;
}

.description {
  padding: 10px 20px;
}

.description p {
  font-size: 13px;
  line-height: 20px;
  margin: 0;
}
.description .authors {
  font-size: 13px;
}
</style>
