<template>
  <div class="container">
    <Loader v-if="!loaded" />
    <div v-else class="guilds">
      <h1 style="pointer-events: none">
        Servers
      </h1><br>
      <ul>
        <li v-for="(guild, index) in guilds" :key="index">
          <div class="guild" @click="gotoGuild(guild.id)">
            <img :src="guild.iconURL" :alt="guild.name">
            <h3>{{ guild.name }}</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../../config'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data () {
    return {
      botGuilds: [],
      guilds: [],
      defaultImage:
        'https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png',
      loaded: false
    }
  },
  mounted () {
    this.getBotGuilds()
  },
  methods: {
    async getBotGuilds () {
      const { data } = await axios
        .get('/api/client/guilds', {
          headers: {
            authorization: `${this.$cookies.get('type')} ${this.$cookies.get('token')}`
          }
        })
        .catch(() => {})
      this.botGuilds = data
      this.getUserGuilds()
    },
    async getUserGuilds () {
      const { data } = await axios
        .get('https://discordapp.com/api/users/@me/guilds', {
          headers: {
            authorization: `${this.$cookies.get('type')} ${this.$cookies.get('token')}`
          }
        })
        .catch((e) => {
          this.$store.dispatch('oauth/logout').then(() => {
            this.$router.push('/')
          })
        })

      data
        .filter(guild => (guild.permissions & 2146958591) === 2146958591)
        .forEach((guild) => {
          guild.iconURL = guild.icon
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${
                  guild.icon.includes('a_') ? 'gif' : 'png'
                }?size=1280`
            : this.defaultImage
          guild.added = !!this.botGuilds.includes(guild.id)
          this.guilds.push(guild)
        })
      this.loaded = true
    },
    gotoGuild (id) {
      if (this.botGuilds.map(x => x.id).includes(id)) {
        this.$router.push(`/servers/${id}`)
      } else {
        window.location = `${config.discord.invite}&guild_id=${id}`
      }
    }
  }
}
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
  cursor: pointer;
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
  background: url('https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png') no-repeat scroll 0 0;
  width: 50%;
  border-radius: 50%;
  margin-bottom: 5px;
  transition: 0.5s;
}

.container .guilds li .guild:hover img {
  border-radius: 20px;
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
