<template>
  <nav>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <div class="mobnav">
      <router-link class="logo" to="/" style="padding: 0 10px;">
        <img src="https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/logo.png" height="40px" />
      </router-link>
      <span class="burger">
        <i class="fa fa-bars" @click="updateNav"></i>
      </span>
    </div>
    <div class="left" id="left">
      <router-link to="/features">
        <i class="far fa-check-circle"></i> Features
      </router-link>
      <router-link to="/commands">
        <i class="fas fa-list"></i> Commands
      </router-link>
      <div class="dropdown">
        <button class="dropbtn">
          <i class="fa fa-caret-down"></i> Help
        </button>
        <div class="dropdown-box help">
          <div class="dropdown-content">
            <a v-bind:href="supportServer" target="_blank">
              <i class="fab fa-discord"></i> Discord
            </a>
            <router-link to="/status">
              <i class="fas fa-layer-group"></i> Status
            </router-link>
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          <i class="fa fa-caret-down"></i> Tools
        </button>
        <div class="dropdown-box tools">
          <div class="dropdown-content">
            <router-link to="/credits">
              <i class="fas fa-angle-double-right"></i> Credits
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="right" id="right">
      <a v-bind:href="inviteLink" target="_blank">
        <i class="fas fa-plus"></i> Invite
      </a>
      <router-link to="/servers">
        <i class="far fa-clipboard"></i> Servers
      </router-link>
      <a href="/login" v-if="!isLoggedIn">
        <i class="fas fa-sign-out-alt"></i> Login
      </a>
      <router-link to="/me" v-if="isLoggedIn">
        <i class="far fa-user-circle"></i> Me
      </router-link>
      <a href="javascript:void(0)" style="cursor: pointer;" v-if="isLoggedIn" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    </div>
  </nav>
</template>

<script>
import config from "../../config";
import JQuery from "jquery";
const $ = JQuery;

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
      supportServer: config.discord.support,
      inviteLink: config.discord.invite
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    updateNav() {
      $(".left").toggle("fast");
      $(".right").toggle("fast");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 750px) {
  .mobnav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: linear-gradient(
      to left,
      rgba(162, 57, 202, 0.2),
      rgba(71, 23, 246, 0.2)
    );
  }

  .mobnav .burger {
    margin-left: auto;
  }

  img {
    border-radius: 5px;
  }

  span.burger {
    cursor: pointer;
    padding-right: 15px;
  }

  .left router-link,
  .left a,
  .right router-link,
  .right a {
    display: block;
    background: linear-gradient(
      to left,
      rgba(162, 57, 202, 0.2),
      rgba(71, 23, 246, 0.2)
    );
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: 0.5s;
    padding: 5px;
  }

  .left router-link:hover,
  .left a:hover,
  .right router-link:hover,
  .right a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .left a.router-link-active,
  .left a.router-link-exact-active,
  .right a.router-link-active,
  .right a.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .left,
  .right {
    display: none;
  }

  .dropdown button {
    display: none;
  }
}

@media screen and (min-width: 750px) {
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: linear-gradient(
      to left,
      rgba(115, 79, 129, 0.2),
      rgba(71, 23, 246, 0.2)
    );
    overflow: hidden;
  }

  .burger {
    display: none;
  }

  img {
    margin: 0;
    border-radius: 50%;
    margin-top: 6px;
    transition: 0.5s;
  }

  img:hover,
  img:focus {
    border-radius: 13px;
  }

  .left,
  .right {
    display: block;
  }

  .left {
    float: left;
  }

  .right {
    margin-left: auto;
    float: right;
  }

  .left router-link,
  .left a,
  .right router-link,
  .right a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: 0.5s;
    padding: 5px 10px;
  }

  .left router-link:hover,
  .left a:hover,
  .right router-link:hover,
  .right a:hover,
  .left router-link:focus,
  .left a:focus,
  .right router-link:focus,
  .right a:focus {
    color: rgb(255, 255, 255);
  }

  .left a.router-link-active,
  .left a.router-link-exact-active,
  .right a.router-link-active,
  .right a.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 5px;
  }

  .dropdown {
    display: inline;
  }

  .dropdown button {
    background: transparent;
    border: transparent;
    font-family: "Poppins";
    color: rgba(255, 255, 255, 0.8);
    transition: 0.5s;
    font-size: 16px;
    outline: none;
    padding: 5px 10px;
  }

  .dropdown button:hover,
  .dropdown button:focus {
    color: white;
  }

  .dropdown-box {
    position: absolute;
    background: transparent;
    padding-top: 10px;
  }

  .dropdown-content {
    background: rgb(110, 54, 133);
  }

  .dropdown-content a,
  .dropdown-content router-link {
    display: block;
  }

  .dropdown .dropdown-content {
    border-radius: 5px;
    padding: 5px 10px;
    overflow: hidden;
    display: none;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-box.help {
    transform: translateX(255px);
  }

  .dropdown-box.tools {
    transform: translateX(330px);
  }

  .dropdown-box:hover .dropdown-content,
  .dropdown-box:hover .dropdown-content {
    display: block;
  }

  .dropdown-content:hover,
  .dropdown-content:focus {
    display: block;
  }
}
</style>
