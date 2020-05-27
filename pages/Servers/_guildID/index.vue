<template>
  <div class="container">
    <div class="back">
      <nuxt-link class="link" to="/servers">
        <i class="fas fa-arrow-left" /> Back to Servers
      </nuxt-link>
      <div class="guilds-box">
        <p>
          <span v-if="!guild || !guilds.length">Loading...</span>
          <img v-if="guild.iconURL" :src="guild.iconURL">
          <span v-if="guild.name">{{ guild.name }}</span>
          <i class="fas fa-caret-down" />
        </p>
        <ul v-if="guilds.length" class="guilds">
          <li v-for="_guild in (guilds.filter(x => x.name !== guild.name))" :key="_guild.name">
            <a @click="changeServer(_guild.id)">
              <img :src="_guild.iconURL">
              {{ _guild.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <Loader v-if="!loaded" />
    <div v-if="guilds.length && loaded" class="guild">
      <img class="guildIcon" :src="guild.iconURL" :alt="guild.name">
      <br>
      <h1>{{ guild.name }}</h1>
      <hr>
      <br>
    </div>
    <nuxt-child v-if="guilds.length && loaded" :guild="guild" />
  </div>
</template>

<script>
import axios from 'axios'
import config from '../../../config'
import Loader from '~/components/Loader'

export default {
  middleware: 'auth',
  components: {
    Loader
  },
  data () {
    return {
      guild: {},
      guilds: [],
      error: '',
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
        .filter(g => (g.permissions & 2146958591) === 2146958591)
        .forEach((g) => {
          g.iconURL = g.icon
            ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${
                  g.icon.includes('a_') ? 'gif' : 'png'
                }?size=1280`
            : this.defaultImage
          this.guilds.push(g)
        })
      const guild = data.find(
        g =>
          g.id === this.$route.params.guildID &&
            (g.permissions & 2146958591) === 2146958591
      )
      if (!guild) { return this.exitPage() }
      if (guild && !this.botGuilds.map(x => x.id).includes(guild.id)) {
        return location.replace(`${config.discord.invite}&guild_id=${guild.id}`)
      }
      guild.iconURL = guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.includes('a_') ? 'gif' : 'png'}?size=1280`
        : `${this.defaultImage}`
      this.guild = guild
      this.loaded = true
    },
    takeOver (url) {
      this.$router.push(`${this.$route.path}/${url}`)
    },
    changeServer (guildID) {
      this.$router.push(`/servers/${guildID}`)
    },
    exitPage () {
      this.$router.push('/servers')
    }
  }
}
</script>

<style scoped>
.container .guild img.guildIcon {
  background: url('https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png') no-repeat scroll 0 0;
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
  background: url('https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png') no-repeat scroll 0 0;
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

.back {
  display: flex;
  flex-direction: row;
  text-align: left;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
}

.back .guilds-box {
  position: relative;
  cursor: pointer;
  min-width: 30%;
}

.back .guilds-box p {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.back ul {
  visibility: hidden;
  position: absolute;
  height: 0px;
  overflow-y: scroll;
  transition: 0.25s ease-out;
  opacity: 0;
  background-color: #7744b9;
  padding: 5px;
  left: 0;
  right: 0;
}

.back a.link,
.back router-link.link {
  color: white;
  text-decoration: none;
  transition: 0.5s;
  opacity: 0.7;
}

.back a.link:hover,
.back router-link.link:hover {
  opacity: 1;
  letter-spacing: 0.5px;
}

.back .guilds-box:hover ul,
.back .guilds-box:active ul {
  visibility: visible;
  height: 200px;
  opacity: 1;
}

.back .guilds-box i {
  transition: 0.25s;
}

.back .guilds-box:hover i,
.back .guilds-box:active i {
  transform: rotate(180deg);
}

.back ul li {
  text-align: center;
  transition: 0.3s;
  border-radius: 3px;
  padding: 5px 0;
}

.back img {
  background: url('https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png') no-repeat scroll 0 0;
  border-radius: 50%;
  height: 20px;
  margin-right: 7px;
}

.back ul li:hover {
  background-color: rgba(255, 255, 255, 0.09);
}

.back ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 750px) {
  .back {
    flex-direction: column;
    padding-bottom: 20px;
  }

  .back .guilds-box {
    width: 90%;
  }

  .back .link {
    padding-bottom: 10px;
  }
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
