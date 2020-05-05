<template>
  <div class="Hero">
    <div id="parallax">
      <h1>Aurora</h1>
      <h3>Take your server to a Whole-New Level!</h3>
      <a :href="inviteLink">
        <i class="fas fa-plus"></i> Add to your Server!
      </a>
    </div>
    <div class="mobile">
      <img src="https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/logo.png" />
      <h1>Aurora</h1>
      <h3>Take your server to a Whole-New Level!</h3>
      <br />
      <a :href="inviteLink">
        <i class="fas fa-plus"></i> Add to your Server!
      </a>
    </div>
  </div>
</template>

<script>
import config from "../../config";

export default {
  name: "Hero",
  metaInfo: {
    title: "Home"
  },
  data() {
    return {
      inviteLink: config.discord.invite
    };
  },
  components: {},
  mounted() {
    this.start();
  },
  methods: {
    start() {
      document.addEventListener("mousemove", parallax);
      const elem = document.querySelector("#parallax");
      function parallax(e) {
        let _w = window.innerWidth / 3;
        let _h = window.innerHeight / 3;
        let _mouseX = e.clientX / 2;
        let _mouseY = e.clientY / 2;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 -
          (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 -
          (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 -
          (_mouseY - _h) * 0.06}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        elem.style.backgroundPosition = x;
      }
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
}

.mobile {
  display: none;
}

#parallax {
  position: relative;
  width: 100%;
  height: 60vh;
  background-color: rgb(138, 11, 189);
  background-image: url("https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/parallax/one.png"),
    url("https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/parallax/two.png"),
    url("https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/parallax/three.png");
  background-repeat: no-repeat;
  background-position: center;
  background-position: 50% 50%;
  border-radius: 5px;
  background-size: auto;
}

#parallax h1,
#parallax h3,
#parallax a {
  position: absolute;
  transform: translate(-50%, -50%);
  color: rgb(231, 231, 231);
}

#parallax h1,
#parallax h3 {
  pointer-events: none;
}

#parallax h1 {
  top: 40%;
  left: 50%;
  font-size: 70px;
  text-shadow: 0 0 10px rgba(231, 231, 231, 0.5);
}

#parallax h3 {
  top: 55%;
  left: 50%;
  color: rgb(226, 226, 226);
  text-shadow: 0 0 10px rgba(231, 231, 231, 0.5);
}

#parallax a {
  box-sizing: border-box;
  top: 68%;
  left: 50%;
  font-size: 16px;
  text-decoration: none;
  background: transparent;
  padding: 5px 15px;
  border-radius: 5px;
  border: 2px solid white;
  transition: 0.5s;
}

#parallax a:hover {
  background: var(--jewel);
  border: 2px solid var(--jewel);
  box-shadow: 0 0 15px var(--jewel);
  top: 67%;
}

.mobile {
  text-shadow: 0 0 15px var(--jewel);
  padding: 10px;
  width: 100%;
  background: transparent;
}

.mobile img {
  width: 200px;
  box-shadow: 0 0 10px var(--jewel);
  border-radius: 50%;
  transform: translateY(-10px);
  animation: floatAnime 5s infinite;
}

.mobile a {
  background: linear-gradient(90deg, var(--fuschia), var(--jewel));
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.5s;
}

.mobile a:hover {
  box-shadow: 0 0 10px var(--jewel);
}

@media screen and (max-width: 750px) {
  #parallax {
    display: none;
  }

  .mobile {
    display: block;
  }
}

@keyframes floatAnime {
  0% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
