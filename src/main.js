import Vue from "vue";
import App from "./App.vue";
import router from "./core/router";
import store from "./core/store";
import VueDiscordMessage from "vue-discord-message";
Vue.use(VueDiscordMessage);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
