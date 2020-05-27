<template>
  <div class="child-container">
    <div class="content-box">
      <Loader v-if="!loaded" />
      <div v-else class="box">
        <div class="pagetopic">
          <div class="left">
            <img class="pageicon" src="https://img.icons8.com/color/96/000000/event-log.png">
            <h2>Logging</h2>
          </div>
          <input type="checkbox" name="topic-toggle" class="topic-toggle">
        </div>
        <br>
        <div class="content">
          <div class="channel-box">
            <p class="channel-head">
              Channel
            </p>
            <div class="channel-dropdown">
              <multiselect
                v-model="guildData.database.serverLogs"
                tag-placeholder="Add this Role"
                placeholder="None. Click to select a Channel"
                label="name"
                track-by="id"
                :options="
                  guildData.other.channelsValues.filter((x) => x.type == 0)
                "
                :taggable="true"
                :searchable="false"
                :loading="false"
              />
            </div>
          </div>
        </div>
      </div>
      <Save v-if="showSave" @save="saveChanges" @discard="discardChanges" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import { diff } from 'deep-diff'
import Save from '~/components/Save'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader,
    Save,
    Multiselect
  },
  props: {
    guild: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      guildData: {
        main: {},
        database: {
          serverLogs: null
        },
        other: {
          channelsValues: []
        }
      },
      guildDB: {},
      beforeGuildData: {},
      loaded: false,
      showSave: false,
      defaultImage: 'https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/grey%20aurora.png'
    }
  },
  watch: {
    guildDB: {
      handler () {
        const diffs = diff(this.guildDB, this.beforeGuildDB)
        if (diffs) { this.showSave = true } else { this.showSave = false }
      },
      deep: true
    },
    'guildData.database.serverLogs' (newValue) {
      const newID = newValue ? newValue.id : null
      this.guildDB.serverLogs = newID
    }
  },
  mounted () {
    this.getDatabase()
  },
  methods: {
    async getDatabase () {
      try {
        const { data } = await axios
          .get(`/api/client/guilds/${this.$route.params.guildID}/data`, {
            headers: {
              authorization: `${this.$cookies.get('type')} ${this.$cookies.get('token')}`
            }
          }).catch((e) => {
            this.error = e
          })
        this.guildDB = { ...data }
        this.beforeGuildDB = { ...data }
        this.getGuildData()
      } catch (e) {
      }
    },
    async getGuildData () {
      try {
        const { data } = await axios
          .get(`/api/client/guilds/${this.$route.params.guildID}/info`, {
            headers: {
              authorization: `${this.$cookies.get('type')} ${this.$cookies.get('token')}`
            }
          }).catch((e) => {
            this.error = e
          })
          /* Main */
        this.guildData.main = { ...data }
        /* Channels */
        this.guildData.other.channelsValues = Object.values(
          this.guildData.main.channels
        )
        /* Server Logs */
        if (this.guildDB.serverLogs) {
          const channel = this.guildData.other.channelsValues.find(
            x => x.id === this.guildDB.serverLogs
          )
          if (channel) {
            this.guildData.database.serverLogs = channel
          }
        }
        /* Cache */
        this.beforeGuildData = { ...this.guildData }
        /* Loaded */
        this.loaded = true
      } catch (e) {
      }
    },
    saveChanges () {
      axios
        .patch(
          `/api/client/guilds/${this.$route.params.guildID}/data`,
          {
            serverLogs: this.guildDB.serverLogs
          },
          {
            headers: {
              authorization: `${this.$cookies.get('type')} ${this.$cookies.get('token')}`
            }
          }
        )
        .then(() => {
          this.getDatabase()
        })
        .catch((e) => {
          this.error = e
        })
    },
    discardChanges () {
      this.resetValues()
      this.loaded = false
      this.getDatabase()
    },
    resetValues () {
      this.guildData = {
        main: {},
        database: {
          serverLogs: null
        },
        other: {
          channelsValues: []
        }
      }
      this.guildDB = {}
      this.beforeGuildData = {}
    }
  }
}
</script>

<style scoped>
/* Channel */
.channel-box {
  background-color: rgba(255, 255, 255, 0.03);
  padding: 20px;
  text-align: left;
}

.channel-box p.channel-head {
  font-weight: bold;
  font-size: 16px;
}

/* Topic */
.pagetopic {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.pagetopic .left {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pagetopic .left h2 {
  text-decoration: underline;
}

.pagetopic .left .pageicon {
  height: 50px;
  margin-right: 20px;
}

input[type="checkbox"].topic-toggle {
  position: relative;
  width: 65px;
  height: 34px;
  background: rgba(255, 255, 255, 0.05);
  appearance: none;
  outline: none;
  border-radius: 17.5px;
  transition: 0.5s ease-in-out;
}

input[type="checkbox"].topic-toggle::before {
  content: "";
  margin: 3px 0;
  height: 28px;
  width: 28px;
  position: absolute;
  border-radius: 50%;
  top: 0px;
  left: 3px;
  background: linear-gradient(45deg, var(--fuschia), var(--jewel));
  opacity: 0.3;
  transition: 0.5s ease-in-out;
}

input[type="checkbox"].topic-toggle:checked::before {
  left: calc(100% - 28px - 3px);
  opacity: 1;
}

input[type="checkbox"].topic-toggle::after {
  content: "";
  margin: 10px 0;
  height: 14px;
  width: 14px;
  position: absolute;
  border-radius: 50%;
  top: 0px;
  left: 10px;
  background: white;
  opacity: 0.5;
  transition: 0.5s ease-in-out;
}

input[type="checkbox"].topic-toggle:checked::after {
  left: calc(100% - 24px);
  opacity: 1;
}
</style>

<style>
/* Multiselect CSS */
.multiselect__tags {
  border: 2px solid var(--fuschia);
}

.multiselect__tags .multiselect__tag {
  background: var(--fuschia);
}

.multiselect__content-wrapper {
  border: 2px solid var(--fuschia);
  border-top: transparent;
}

.multiselect__tag-icon {
  background: rgba(169, 98, 197, 0.5);
  border-radius: 0;
  transition: 0.3s;
}

.multiselect__tag-icon:hover {
  background: rgb(169, 98, 197);
}

.multiselect__tag-icon:after {
  content: "×";
  color: white;
  font-size: 14px;
}

.multiselect__option:hover,
.multiselect__option:active,
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background: var(--fuschia);
}

.multiselect__option--selected:hover {
  background: #ff6a6a;
}
</style>
