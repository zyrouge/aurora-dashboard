<template>
  <div class="cointainer">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <Loader v-if="status !== 'loaded'" />
    <div class="me" v-if="status == 'loaded'">
      <div class="avatar">
        <img v-bind:src="user.avatarURL" v-bind:alt="user.username" />
      </div>
      <h2>
        {{ user.username }}
        <span class="discrim">#{{ user.discriminator }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import Loader from "../partials/Loader";

export default {
  name: "me",
  metaInfo: {
    title: "Profile"
  },
  components: {
    Loader
  },
  data() {
    return {
      user: {},
      error: "",
      status: "Loading..."
    };
  },
  created() {
    var that = this;
    this.$http
      .get(`https://discordapp.com/api/users/@me`)
      .then(res => {
        res.data.avatarURL = res.data.avatar
          ? `https://cdn.discordapp.com/avatars/${res.data.id}/${
              res.data.avatar
            }.${res.data.avatar.includes("a_") ? "gif" : "png"}?size=1280`
          : `https://cdn.discordapp.com/embed/avatars/${res.data.discriminator %
              4}.png`;
        that.status = "loaded";
        that.user = res.data;
      })
      .catch(e => {
        that.error = e.response;
      });
  },
  methods: {}
};
</script>

<style scoped>
.container .me .avatar img {
  width: 20%;
  border: 3px solid var(--stark);
  border-radius: 50%;
  margin-bottom: 20px;
}

.container .me h2 span {
  color: var(--fuschia);
}

@media screen and (max-width: 750px) {
  .container .me .avatar img {
    width: 40%;
  }
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
