<template>
  <div class="cointainer">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <div class="loading" v-if="status != 'loaded'">
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </div>
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
import JQuery from "jquery";
const $ = JQuery;

export default {
  name: "me",
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      user: {},
      error: "",
      status: "Loading...",
    };
  },
  created() {
    var that = this;
    this.$http
      .get(`https://discordapp.com/api/users/@me`)
      .then((res) => {
        let avatar = `https://cdn.discordapp.com/embed/avatars/${Math.floor(
          Math.random() * 4
        )}.png`;
        if (res.data.avatar) {
          avatar = `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}.gif?size=1280`;
          $.get(avatar)
            .done(() => {})
            .fail(
              () =>
                (avatar = `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}.png?size=1280`)
            );
        }
        res.data.avatarURL = avatar;
        that.status = "loaded";
        that.user = res.data;
      })
      .catch((e) => {
        that.error = e;
      });
  },
  methods: {},
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
