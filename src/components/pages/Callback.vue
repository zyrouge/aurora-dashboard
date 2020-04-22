<template>
  <h4 class="Callback">
    <div>
      <h1>Logging in...</h1>
      <h5>This should not take more time!</h5>
    </div>
  </h4>
</template>

<script>
export default {
  data() {
    return {
      code: ""
    };
  },
  methods: {
    login: function() {
      let code = this.$route.query.code;
      this.$store
        .dispatch("login", { code })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.login();
  }
};
</script>

<style scoped>
.Callback {
  color: #f1f1f2;
}

.Callback h1 {
  font-size: 50px;
}
</style>
