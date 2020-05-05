<template>
  <div class="cointainer">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <div class="loading" v-if="status != 'loaded'">
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </div>
    <div class="guild" v-if="status == 'loaded'">
      <img class="guildIcon" v-bind:src="guild.iconURL" v-bind:alt="guild.name" />
      <br />
      <h1>{{ guild.name }}</h1>
      <hr />
      <br />
      <div class="topics">
        <div class="topic" @click="takeOver('welcome')">
          <img src="https://img.icons8.com/color/96/000000/confetti.png" />
          <div class="info">
            <p class="head">Farewell</p>
            <p>Modify you Welcomer and Leaver.</p>
          </div>
        </div>
        <div class="topic" @click="takeOver('moderation')">
          <img src="https://img.icons8.com/color/96/000000/thor-hammer.png" />
          <div class="info">
            <p class="head">Moderation</p>
            <p>Configure Moderation Actions.</p>
          </div>
        </div>
        <div class="topic" @click="takeOver('leveling')">
          <img src="https://img.icons8.com/bubbles/100/000000/medal.png" />
          <div class="info">
            <p class="head">Leveling</p>
            <p>Configure Leveling System.</p>
          </div>
        </div>
        <div class="topic" @click="takeOver('economy')">
          <img src="https://img.icons8.com/plasticine/100/000000/sales-performance.png" />
          <div class="info">
            <p class="head">Economy</p>
            <p>Configure Economy related stuffs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guild",
  metaInfo: {
    title: "Dashboard"
  },
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
    },
    takeOver(url) {
      this.$router.push(`${this.$route.path}/${url}`);
    }
  }
};
</script>

<style scoped>
.container .guild img.guildIcon {
  width: 20%;
  border: 3px solid var(--stark);
  border-radius: 50%;
  margin-bottom: 20px;
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}

hr {
  margin: 10px 0;
}

.topics {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.topic {
  margin: 10px;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  background: linear-gradient(
    to left,
    rgba(162, 57, 202, 0.3),
    rgba(71, 23, 246, 0.3)
  );
  box-shadow: 3px 3px 2px rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: 0.5s;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 40%;
}

.topic img {
  height: 96px;
  margin-left: 5%;
  margin-right: auto;
  align-self: flex-start;
}

.topic:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.topic .info {
  width: 100%;
  margin-right: 5%;
}

.topic .info p {
  width: 100%;
  margin-right: 5%;
  color: rgba(255, 255, 255, 0.6);
}

.topic .info p.head {
  color: white;
  font-size: 20px;
  font-weight: 800;
}

@media screen and (max-width: 750px) {
  .container .guild img.guildIcon {
    width: 40%;
  }

  .topic {
    width: 100%;
  }
}
</style>
