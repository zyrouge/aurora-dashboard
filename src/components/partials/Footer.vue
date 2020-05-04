<template>
  <div class="footer-container">
    <div class="footer">
      <div class="footer-content">
        <div class="botinfo">
          <h1>Aurora</h1>
          <h3>Take your server to a<br />Whole-New Level!</h3>
          <p>Made by <strong>ZYROUGE</strong></p>
        </div>
        <div class="links">
          <p class="links">Links</p>
          <router-link to="/servers">Dashboard</router-link>
          <router-link to="/features">Features</router-link>
          <router-link to="/commands">Commands</router-link>
        </div>
        <div class="support">
          <p class="links">Support</p>
          <a :href="support" target="_blank">Discord</a>
          <router-link to="/contributors">Contributors</router-link>
          <router-link to="/credits">Credits</router-link>
        </div>
        <div class="lastcolumn">
          <a :href="invite" target="_blank">Add to Discord</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";

export default {
  name: "Footer",
  data() {
    return {
      support: config.discord.support,
      invite: config.discord.invite,
    };
  },
};
</script>

<style scoped>
.footer-container {
  padding-top: 100px;
}

.footer {
  height: 300px;
  background-image: url("https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/cfooter.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 100px 100px 0 100px;
}

.footer-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  /*border: 3px solid black;*/
  padding-top: 20px;
}

.footer-content div {
  width: 25%;
}

.footer-content div:not(.botinfo) {
  padding-top: 20px;
}

.botinfo {
  pointer-events: none;
}

.botinfo h1 {
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.botinfo h3 {
  font-weight: normal;
  color: var(--stark);
}

.botinfo p {
  padding-top: 15px;
  color: rgba(223, 223, 223, 0.5);
}

p.links {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}

a,
router-link {
  color: rgba(255, 255, 255, 0.8);
  transition: 0.5s;
  cursor: pointer;
  text-decoration: none;
  display: block;
}

a:hover,
router-link:hover {
  color: rgb(255, 255, 255);
}

.lastcolumn {
  padding-top: 45px !important;
}

.lastcolumn a {
  color: rgba(255, 255, 255, 0.8);
  transition: 0.3s;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  font-size: 20px;
  background: var(--jewel);
  width: 80%;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 10px;
}

.lastcolumn a:hover {
  transform: translateY(-5%);
  box-shadow: 0 0 5px var(--jewel);
}
</style>
