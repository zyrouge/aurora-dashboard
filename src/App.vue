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
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/partials/NavBar";
import Footer from "./components/partials/Footer";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
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
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");

:root {
  --notsoblack: #23272a;
  --notsogrey: #2c2f33;
  --grey: #99aab5;
  --notsowhite: #f1f1f2;
  --void: #161124;
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
  font-family: "Poppins";
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

@media screen and (max-width: 750px) {
  main {
    background: none;
  }

  .container {
    padding: 20px 0 0 0;
  }
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

.loading {
  display: block;
}

.loading span {
  font-size: 50px;
  color: var(--fuschia);
  animation: Loader 2s infinite;
}

.loading span.status {
  color: white;
  font-size: 30px;
  animation: none;
}

.loading span:nth-child(1) {
  animation-delay: 0s;
}

.loading span:nth-child(2) {
  animation-delay: 0.66s;
}

.loading span:nth-child(3) {
  animation-delay: 1.32s;
}

@keyframes Loader {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

/* Save Prompt */
#save {
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: calc(100vw - 40px);
  background: rgb(56, 45, 88);
  padding: 5px 15px;
  border-radius: 5px;
  text-align: left;
  animation: savePromptAnime 0.5s;
}

#save p.text {
  padding-top: 3px;
}

#save .btns {
  margin-left: auto;
}

#save button {
  margin-left: 5px;
  cursor: pointer;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
}

#save button.submitBtn {
  background-color: rgb(0, 192, 0);
}

#save button.discardBtn {
  background-color: rgb(192, 0, 0);
}

#save button.submitBtn:hover {
  background-color: rgb(0, 255, 0);
}

#save button.discardBtn:hover {
  background-color: rgb(255, 0, 0);
}

@keyframes savePromptAnime {
  0% {
    transform: translateY(1000px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
