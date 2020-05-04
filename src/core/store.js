import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "querystring";

const config = require("../config");
const CLIENT_ID = config.discord.id;
const CLIENT_SECRET = config.discord.secret;
const REDIRECT = config.discord.redirect;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    refresh: localStorage.getItem("refresh") || "",
    type: localStorage.getItem("type") || "",
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, refresh, type) {
      state.status = "success";
      state.token = token;
      state.refresh = refresh;
      state.type = type;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.refresh = "";
      state.type = "";
    },
  },
  actions: {
    login({ commit }, { code }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");

        axios
          .post(
            `https://discordapp.com/api/oauth2/token`,
            qs.stringify({
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              grant_type: "authorization_code",
              redirect_uri: REDIRECT,
              scope: "identify guilds",
              code,
            }),
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((resp) => {
            const token = resp.data.access_token;
            const refresh = resp.data.refresh_token;
            const type = resp.data.token_type;
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("type", type);
            axios.defaults.headers.common["Authorization"] = `${type} ${token}`;
            commit("auth_success", token, refresh, type);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            console.log(err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
