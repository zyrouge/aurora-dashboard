<template>
  <h4 class="Login">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <div>
      <h1>Login</h1>
      <br />
      <a v-bind:href="url">Discord</a>
    </div>
  </h4>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      url:
        "https://discordapp.com/api/oauth2/authorize?client_id=701036929298333726&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify%20guilds",
      error: ""
    };
  }
};
</script>

<style scoped>
.Login div a {
  color: var(--stark);
  background-color: #7289da;
  padding: 10px 40px;
  font-size: 20px;
  border-radius: 4px;
  transition: 0.5s;
}

.Login div a:hover {
  background-color: rgb(87, 114, 209);
}

.Login {
  color: #f1f1f2;
}

.Login h1 {
  font-size: 50px;
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
