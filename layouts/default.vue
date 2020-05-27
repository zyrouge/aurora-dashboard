<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    >
    <NavBar />
    <main>
      <center>
        <div class="container">
          <transition name="fade" mode="out-in">
            <nuxt />
          </transition>
        </div>
      </center>
    </main>
    <Footer />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    NavBar,
    Footer
  }
}
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

:focus {
  outline: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--void);
  color: var(--stark);
  font-family: "Poppins", sans-serif;
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
</style>
