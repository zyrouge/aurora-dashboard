import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import Home from "@/components/pages/Home";
import NotFound from "@/components/pages/NotFound";
import Me from "@/components/pages/Me";
import Callback from "@/components/pages/Callback";
import Login from "@/components/pages/Login";
import Servers from "@/components/pages/Servers";
import Guild from "@/components/pages/Guild";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "me",
      path: "/me",
      component: Me,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      name: "callback",
      path: "/callback",
      component: Callback,
    },
    {
      name: "servers",
      path: "/servers",
      component: Servers,
    },
    {
      name: "guild",
      path: "/servers/:id",
      component: Guild,
    },
    {
      name: "notfound",
      path: "*",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
