<template>
  <nav>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/logo.png" alt="Logo" />
        </router-link>
      </div>
      <div class="navbar-box">
        <ul class="navbar-links__left">
          <li>
            <router-link to="/features">
              <i class="far fa-check-circle"></i> Features
            </router-link>
          </li>
          <li>
            <router-link to="/commands">
              <i class="fas fa-list"></i> Commands
            </router-link>
          </li>
          <li class="dropdown">
            <a href="javascript:void(0)">
              <i class="fa fa-caret-down"></i> Support
            </a>
            <ul>
              <li>
                <a v-bind:href="supportServer" target="_blank">
                  <i class="fab fa-discord"></i> Discord
                </a>
              </li>
              <li>
                <router-link to="/status">
                  <i class="fas fa-layer-group"></i> Status
                </router-link>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="javascript:void(0)">
              <i class="fa fa-caret-down"></i> Others
            </a>
            <ul>
              <li>
                <router-link to="/contributors">
                  <i class="fas fa-heart"></i> Contributors
                </router-link>
              </li>
              <li>
                <router-link to="/credits">
                  <i class="fas fa-angle-double-right"></i> Credits
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-links__right">
          <li>
            <a v-bind:href="inviteLink" target="_blank">
              <i class="fas fa-plus"></i> Invite
            </a>
          </li>
          <li>
            <router-link to="/servers">
              <i class="far fa-clipboard"></i> Servers
            </router-link>
          </li>
          <li v-if="!isLoggedIn">
            <a href="/login">
              <i class="fas fa-sign-out-alt"></i> Login
            </a>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/me">
              <i class="far fa-user-circle"></i> Me
            </router-link>
          </li>
          <li v-if="isLoggedIn">
            <a href="javascript:void(0)" style="cursor: pointer;" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </div>
      <div class="burger" @click="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
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
      inviteLink: config.discord.invite,
      width: null
    };
  },
  watch: {
    width(newHeight, oldHeight) {
      if (!newHeight || !oldHeight || newHeight == oldHeight) return;
      if (newHeight > 750) {
        $(".navbar-box:not(.logo)").css({
          transform: `translateY(0%)`,
          opacity: 1
        });
      } else {
        $(".navbar-box:not(.logo)").css({
          transform: `translateY(-120%)`,
          opacity: 0
        });
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    burger() {
      if ($(".navbar-box:not(.logo)").css("opacity") == 0) {
        $(".navbar-box:not(.logo)").css({
          transform: `translateY(0%)`,
          opacity: 1
        });
        $(".burger div:nth-child(1)").css({
          transform: "rotate(-45deg) translate(-4px, 6px)"
        });

        $(".burger div:nth-child(2)").css({
          opacity: "0"
        });

        $(".burger div:nth-child(3)").css({
          transform: "rotate(45deg) translate(-4px, -6px)"
        });
      } else {
        $(".navbar-box:not(.logo)").css({
          transform: `translateY(-120%)`,
          opacity: 0
        });

        $(".burger div:nth-child(1)").css({
          transform: "none"
        });

        $(".burger div:nth-child(2)").css({
          opacity: "1"
        });

        $(".burger div:nth-child(3)").css({
          transform: "none"
        });
      }
    },
    onResize(event) {
      this.width = event.currentTarget.innerWidth;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  background: linear-gradient(
    to left,
    rgba(115, 79, 129, 0.2),
    rgba(71, 23, 246, 0.2)
  );
  height: 8vh;
  padding: 0 10px;
}

.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.logo img {
  margin-top: 5px;
  height: 40px;
  border-radius: 50%;
  transition: 0.25s;
}

.logo img:hover,
.logo img:focus {
  border-radius: 15px;
}

.navbar-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.navbar-box ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 5px;
}

.navbar-box ul:nth-child(2) {
  justify-content: flex-end;
}

.navbar-box li {
  font-size: 15px;
  margin: 0 7px;
  list-style: none;
  width: max-content;
}

.navbar-box li a,
.navbar-box li router-link {
  position: relative;
  color: var(--stark);
  text-decoration: none;
  transition: 0.25s;
}

.navbar-box li a:hover,
.navbar-box li router-link:hover,
.navbar-box li a:focus,
.navbar-box li router-link:focus,
.navbar-box li .router-link-active {
  color: white;
}

.navbar-box li a::after,
.navbar-box li router-link::after,
.navbar-box li .router-link-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 100%;
  background-color: var(--stark);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.25s ease-in;
}

.navbar-box li a:hover::after,
.navbar-box li a:focus::after,
.navbar-box li router-link:hover::after,
.navbar-box li router-link:focus::after,
.navbar-box li .router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.dropdown {
  cursor: pointer;
  position: relative;
}

.dropdown ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  visibility: hidden;
  width: max-content;
  opacity: 0;
  transform: translateY(0px);
  transition: 0.25s;
  padding: 5px 10px;
  background: var(--jewel);
  border-radius: 4px;
}

.dropdown ul li {
  padding: 3px;
  width: 100%;
  display: block;
  text-align: center;
}

.dropdown:hover ul {
  visibility: visible;
  opacity: 1;
  transform: translateY(5px);
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  box-sizing: border-box;
  width: 20px;
  height: 3px;
  margin: 4px;
  background-color: var(--stark);
  border-radius: 2px;
  transition: 0.25s ease-in-out;
}

@media screen and (max-width: 750px) {
  .burger {
    display: block;
  }

  .navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .navbar-box:not(.logo),
  .navbar-box:not(.burger) {
    visibility: visible;
    z-index: 1;
    background: linear-gradient(
      to left,
      rgba(115, 79, 129, 0.4),
      rgba(71, 23, 246, 0.4)
    );
    background-color: black;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 96%;
    top: calc(8vh + 2%);
    left: 0;
    right: 0;
    margin: 0 2%;
    align-items: center;
    justify-content: center;
    height: fit-content;
    padding: 10px;
    border-radius: 5px;
    transform: translateY(-120%);
    transition: 0.5s ease-in-out;
    opacity: 0;
  }

  .navbar-box ul {
    display: flex;
    flex-direction: column;
  }

  .navbar-box ul li {
    padding: 2px;
  }

  .navbar-box ul .dropdown > a {
    display: none;
  }

  .dropdown ul {
    visibility: inherit;
    opacity: inherit;
    position: relative;
    background: transparent;
    padding: 0;
  }

  .dropdown:hover ul {
    transform: none;
  }
}
</style>

