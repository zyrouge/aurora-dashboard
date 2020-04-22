<template>
  <div class="cointainer">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <h1 class="status" v-if="status != 'loaded'">{{ status }}</h1>
    <div class="guild" v-if="status == 'loaded'">
      <img v-bind:src="guild.iconURL" v-bind:alt="guild.name" />
      <br />
      <h1>{{ guild.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      guild: {},
      error: "",
      defaultImage:
        "https://cdn.discordapp.com/avatars/521007613475946496/55e9fd5ec6ac9224f38d4a4cba2b355b.png?size=512",
      status: "Loading..."
    };
  },
  created() {
    var that = this;
    this.$http
      .get(`https://discordapp.com/api/users/@me/guilds`)
      .then(res => {
        const guild = res.data.find(
          guild =>
            guild.id === that.$route.params.id &&
            (guild.permissions & 2146958591) === 2146958591
        );
        if (guild.icon !== null)
          guild.iconURL = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1280`;
        else guild.iconURL = `${that.defaultImage}`;
        that.updateGuild(guild);
      })
      .catch(e => {
        that.error = e;
      });
  },
  methods: {
    updateGuild(guild) {
      this.guild = guild;
      this.status = "loaded";
    }
  }
};
</script>

<style scoped>
.container .guild img {
  width: 20%;
  border: 3px solid var(--stark);
  border-radius: 50%;
  margin-bottom: 20px;
}

@media screen and (max-width: 750px) {
  .container .guild img {
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
