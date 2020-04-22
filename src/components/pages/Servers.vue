<template>
  <div class="cointainer">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <h1 class="status" v-if="status != 'loaded'">{{ status }}</h1>
    <div class="guilds">
      <ul>
        <li v-for="(guild, index) in guilds" :key="index">
          <div class="guild" v-on:click="gotoGuild(guild.id)">
            <img v-bind:src="guild.iconURL" v-bind:alt="guild.name" />
            <h3>{{ guild.name }}</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      guilds: [],
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
        res.data
          .filter(guild => (guild.permissions & 2146958591) === 2146958591)
          .forEach(guild => {
            if (guild.icon !== null)
              guild.iconURL = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1280`;
            else guild.iconURL = `${that.defaultImage}`;
            that.updateGuilds(guild);
          });
        that.loaded();
      })
      .catch(e => {
        that.error = e;
      });
  },
  methods: {
    updateGuilds(guild) {
      this.guilds.push(guild);
    },
    loaded() {
      this.status = "loaded";
    },
    gotoGuild(id) {
      this.$router.push(`/servers/${id}`);
    }
  }
};
</script>

<style scoped>
.container .guilds ul li {
  display: inline-block;
  list-style: none;
  padding-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  vertical-align: middle;
}

.container .guilds li .guild {
  box-sizing: border-box;
  padding: 15px;
  border: 2px solid var(--stark);
  border-radius: 4px;
  width: 250px;
  transition: 0.5s;
}

.container .guilds li .guild:hover {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 2px 3px 2px #4818f5;
}

.container .guilds li .guild img {
  width: 50%;
  border-radius: 5px;
  margin-bottom: 5px;
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
