<template>
  <h4 class="Callback">
    <div>
      <div class="loading" v-if="status != 'loaded'">
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
      <h1>Logging in...</h1>
      <h5>This should not take more time!</h5>
    </div>
  </h4>
</template>

<script>
export default {
  metaInfo: {
    title: "Callback",
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    login: function() {
      let code = this.$route.query.code;
      let guildID = this.$route.query.guild_id;
      let direct = "/";
      if (guildID) direct += `servers/${guildID}`;
      this.$store
        .dispatch("login", { code })
        .then(() => this.$router.push(direct))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.login();
  },
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
