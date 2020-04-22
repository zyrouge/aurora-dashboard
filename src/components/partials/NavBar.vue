<template>
  <div class="navbar">
    <img v-bind:src="botIcon" />
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/servers">Servers</router-link>
      </li>
      <li>
        <a href="https://status.auroradiscordbot.ga/">Status</a>
      </li>
      <li>
        <router-link to="/me">Me</router-link>
      </li>
      <li>
        <span v-if="isLoggedIn">
          <a @click="logout">Logout</a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      botIcon: `https://cdn.discordapp.com/avatars/521007613475946496/55e9fd5ec6ac9224f38d4a4cba2b355b.png?size=512`
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.navbar {
  padding: 5px 20px;
  display: inline-block;
  width: 100%;
  background: linear-gradient(145deg, var(--jewel), var(--fuschia));
  transition: 0.5s;
}

img {
  height: 40px;
  border-radius: 50%;
  transition: 0.5s;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

img:hover {
  border: 2px solid var(--stark);
  box-shadow: 2px 2px 1px var(--fuschia);
  border-radius: 13px;
}

ul {
  padding-top: 12px;
  list-style-type: none;
  float: right;
}

li {
  display: inline-block;
  padding: 0 4px;
}

a {
  box-sizing: border-box;
  padding: 5px 10px;
  text-decoration: none;
  color: var(--stark);
  border-radius: 4px;
  transition: 0.5s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

a:hover {
  text-decoration: none;
  color: var(--fuschia);
  background: var(--stark);
  border-radius: 4px;
  box-shadow: 2px 2px 1px var(--jewel);
}
</style>
