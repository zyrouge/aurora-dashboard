import Vue from "vue";
import App from "./App.vue";
import router from "./core/router";
import store from "./core/store";
import Axios from "axios";
import VueDiscordMessage from "vue-discord-message";
Vue.use(VueDiscordMessage);

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
const type = localStorage.getItem("type");

if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `${type} ${token}`;
}

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
