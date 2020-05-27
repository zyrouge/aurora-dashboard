<template>
  <div class="container">
    <Loader v-if="!loaded" />
    <div v-else class="container">
      <h1>Status</h1>
      <div class="infobox">
        <div class="info">
          <h2>Counters</h2>
          <p>
            Total Guilds:
            <b>{{ stats.servers }}</b>
          </p>
          <p>
            Total Users:
            <b>{{ stats.users }}</b>
          </p>
          <p>
            Total Shards:
            <b>{{ stats.shards.length }}</b>
          </p>
          <p>
            Memory Usage:
            <b>{{ stats.memory }}MB</b>
          </p>
          <p>
            Uptime:
            <b>{{ parseDuration(stats.uptime) }}</b>
          </p>
        </div>
        <br>
        <div class="compounds">
          <div class="compound-box">
            <div class="stat">
              <p class="stat-head">
                Client
                <span :class="['state', botState]" />
              </p>
            </div>
            <div class="dashboard-chart">
              <line-chart
                v-if="botLoaded"
                :data="botData"
                :styles="chartStyles"
              />
            </div>
          </div>
          <div class="compound-box">
            <div class="stat">
              <p class="stat-head">
                Dashboard
                <span :class="['state', dashboardState]" />
              </p>
            </div>
            <div class="dashboard-chart">
              <line-chart
                v-if="dashboardLoaded"
                :data="dashboardData"
                :styles="chartStyles"
              />
            </div>
          </div>
          <div class="compound-box">
            <div class="stat">
              <p class="stat-head">
                Discord API
                <span :class="['state', discordState]" />
              </p>
            </div>
          </div>
        </div>
        <br>
        <div class="shards">
          <h2>Shards</h2>
          <div v-for="shard in stats.shards" :key="shard.id" class="shard">
            {{ shard.id }}
            <span :class="['tooltip', shard.status]">
              <p v-if="shard.ping">
                <b>Ping:</b>
                {{ shard.ping }}ms
              </p>
              <p>
                <b>Status:</b>
                {{
                  shard.status.charAt(0).toUpperCase() +
                    shard.status.substring(1).toLowerCase()
                }}
              </p>
            </span>
          </div>
        </div>
        <br>
        <div class="messages">
          <h2>Incidents</h2>
          <div class="incidents">
            <div v-if="!incidents.length" class="loading">
              <div />
              <div />
              <div />
            </div>
            <div v-for="incident in incidents" :key="incident.content" class="incident">
              <div class="author">
                <img :src="incident.avatarURL" :alt="incident.author.username">
                <p class="username">
                  {{ incident.author.username }}
                </p>
                <p class="time">
                  {{ incident.timestamp }}
                </p>
              </div>
              <!-- eslint-disable -->
              <p class="text" v-html="incident.message" />
              <!-- eslint-enable -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '~/components/Loader'

const marked = require('marked')
const sanitizeHtml = require('sanitize-html')
const moment = require('moment')
require('moment-duration-format')

export default {
  components: {
    Loader
  },
  data () {
    return {
      stats: null,
      loaded: false,
      incidents: [],
      dashboardData: null,
      botData: null,
      dashboardState: 'down',
      botState: 'down',
      discordState: 'up',
      botLoaded: false,
      dashboardLoaded: false,
      chartStyles: {
        height: '200px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  mounted () {
    this.getStatus()
    this.getDashboard()
    this.getBot()
    this.getIncidents()
  },
  methods: {
    getStatus () {
      const that = this
      axios
        .get('/api/client/utils/botstats')
        .then((res) => {
          const resp = res.data
          that.stats = resp
          this.loaded = true
        })
        .catch((e) => {
          that.error = e
        })
    },
    parseDuration (millis) {
      let sec = Math.floor(millis / 1000)
      const hrs = Math.floor(sec / 3600)
      sec -= hrs * 3600
      let min = Math.floor(sec / 60)
      sec -= min * 60
      sec = '' + sec
      sec = ('00' + sec).substring(sec.length)
      if (hrs > 0) {
        min = '' + min
        min = ('00' + min).substring(min.length)
        return `${hrs}h:${min}m:${sec}s`
      } else {
        return `${min}m:${sec}s`
      }
    },
    getDashboard () {
      this.dashboardLoaded = false
      axios.get('/api/client/utils/dashboardchart').then((res) => {
        const monitor = res.data.monitors[0]
        this.setState('dashboard', monitor.status)
        const data = []
        const labels = []
        const monitors = monitor.response_times
          .sort((a, b) => b.datetime - a.datetime)
          .filter((m, index) => index < 20)
          .reverse()
        for (let i = 0; i < monitors.length; i++) {
          const current = monitors[i]
          const x = moment.unix(current.datetime).format('HH:mm')
          const y = parseInt(current.value)
          labels.push(`${x}`)
          data.push(y)
        }
        this.dashboardData = {
          labels,
          datasets: [
            {
              label: 'Ping (in ms)',
              data,
              backgroundColor: 'rgba(162, 57, 202, 0.2)',
              borderColor: 'rgba(162, 57, 202, 1)',
              borderWidth: 1
            }
          ]
        }
        this.dashboardLoaded = true
      })
    },
    getBot () {
      this.botLoaded = false
      axios.get('/api/client/utils/botchart').then((res) => {
        const monitor = res.data.monitors[0]
        this.setState('bot', monitor.status)
        const data = []
        const labels = []
        const monitors = monitor.response_times
          .sort((a, b) => b.datetime - a.datetime)
          .filter((m, index) => index < 20)
          .reverse()
        for (let i = 0; i < monitors.length; i++) {
          const current = monitors[i]
          const x = moment.unix(current.datetime).format('HH:mm')
          const y = parseInt(current.value)
          labels.push(`${x}`)
          data.push(y)
        }
        this.botData = {
          labels,
          datasets: [
            {
              label: 'Ping (in ms)',
              data,
              backgroundColor: 'rgba(162, 57, 202, 0.2)',
              borderColor: 'rgba(162, 57, 202, 1)',
              borderWidth: 1
            }
          ]
        }
        this.botLoaded = true
      })
    },
    setState (what, num) {
      if (what === 'dashboard') {
        if (num === 2) { this.dashboardState = 'up' }
        if (num === 8) { this.dashboardState = 'disrupted' }
      }
      if (what === 'bot') {
        if (num === 2) { this.botState = 'up' }
        if (num === 8) { this.botState = 'disrupted' }
      }
    },
    getIncidents () {
      axios.get('/api/client/utils/incidents').then((res) => {
        res.data.forEach((msg) => {
          msg.message = this.sanitize(marked(`${msg.content}`))
          msg.timestamp = moment(msg.unparsedTimestamp).format('DD/MM HH:mm')
          msg.avatarURL = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=512`
        })
        this.incidents = res.data
      })
    },
    sanitize (content) {
      return sanitizeHtml(content, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'p', 'code'],
        allowedAttributes: {
          a: ['href']
        }
      })
    }
  }
}
</script>

<style scoped>
:root {
  --green: #3bed56;
  --red: #ff0000;
  --yellow: #ff8800;
  --info: #0385ff;
}

.info {
  text-align: left;
}

.shard {
  position: relative;
  display: inline-block;
  cursor: pointer;
  background: var(--fuschia);
  padding: 8px 15px;
}

.shard .tooltip {
  visibility: hidden;
  width: 120px;
  background-color: #401950;
  color: rgb(173, 173, 173);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  font-size: 16px;
}

.shard .tooltip.ready {
  color: #3bed56;
}

.shard .tooltip.connecting,
.shard .tooltip.handshaking {
  color: #ff8800;
}

.shard .tooltip.disconnected {
  color: #ff0000;
}

.shard:hover .tooltip {
  visibility: visible;
}

.compounds .compound-box {
  margin: 10px 0;
  border: 2px solid rgba(162, 57, 202, 0.5);
  border-radius: 5px;
  padding: 10px 20px;
}

.stat .stat-head {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  width: 100%;
}

.stat .stat-head span.state {
  font-weight: normal;
  float: right;
}

.stat .stat-head span.state.up::after {
  content: "Operational";
  color: #3bed56;
}

.stat .stat-head span.state.down::after {
  content: "Down";
  color: #ff0000;
}

.incident {
  background-color: rgba(255, 255, 255, 0.02);
  padding: 15px 20px;
  margin: 10px 0;
  border-radius: 5px;
}

.incident img {
  height: 30px;
  border-radius: 50%;
}

.incident .author {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  vertical-align: middle;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.incident .author .username {
  font-size: 18px;
  padding-left: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.incident .author .time {
  font-size: 12px;
  padding-left: 10px;
  color: rgba(255, 255, 255, 0.2);
}

.incident .text {
  padding-top: 10px;
  text-align: left;
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
