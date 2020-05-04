<template>
  <h4 class="Login">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <div>
      <h1>Login</h1>
      <br />
      <a v-bind:href="url"><i class="fab fa-discord"></i> Discord</a>
    </div>
  </h4>
</template>

<script>
import { discord } from "../../config";

export default {
  name: "login",
  data() {
    return {
      url: `${discord.oauth}`,
      error: "",
    };
  },
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
  text-decoration: none;
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
