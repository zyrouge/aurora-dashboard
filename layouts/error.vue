<template>
  <div>
    <h1 v-if="error && error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <nuxt-link class="__home__" to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
h1 {
    margin-bottom: 10px
}

a.__home__ {
    box-sizing: border-box;
    background: linear-gradient(to left, rgba(71, 23, 246, 0.8), rgba(162, 57, 202, 0.8));
    padding: 5px 15px;
    border-radius: 5px;
    color: var(--stark);
    transition: 0.5s;
    text-decoration: none;
    width: max-content;
}

a:hover {
    background-color: rgba(71, 23, 246, 1);
}
</style>
