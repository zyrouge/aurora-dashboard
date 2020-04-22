<template>
  <div id="app">
    <nav>
      <NavBar />
    </nav>
    <main>
      <center>
        <div class="container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </center>
    </main>
  </div>
</template>

<script>
import NavBar from "./components/partials/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

:root {
  --notsoblack: #23272a;
  --notsogrey: #2c2f33;
  --grey: #99aab5;
  --notsopink: #d952ab;
  --pink: #ff66cc;
  --notsowhite: #f1f1f2;
  --void: #0e0b16;
  --fuschia: #a239ca;
  --jewel: #4717f6;
  --stark: #e7dfdd;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--void);
  color: var(--stark);
  font-family: "Montserrat";
}

main {
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 3px;
  background: linear-gradient(to right, var(--fuschia), var(--jewel));
  border-radius: 10px;
  transition: 0.5s;
}

.container {
  background: var(--void);
  border-radius: 10px;
  padding: 40px;
  transition: 0.5s;
}

.fade-enter-active {
  animation: fade-animation 0.5s;
}

.fade-leave-active {
  animation: fade-animation 0.5s reverse;
}

@keyframes fade-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
