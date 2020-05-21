<template>
  <div class="container">
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <Loader v-if="status !== 'loaded'" />
    <div class="box" v-if="status == 'loaded'">
      <div class="pagetopic">
        <div class="left">
          <img class="pageicon" src="https://img.icons8.com/color/96/000000/event-log.png" />
          <h2>Logging</h2>
        </div>
        <input type="checkbox" name="topic-toggle" class="topic-toggle" />
      </div>
      <br />
      <div class="content">
        <transition name="save-popup">
          <Save v-if="showSave" v-on:save="saveChanges" v-on:discard="discardChanges" />
        </transition>
        <div class="channel-box">
          <p class="channel-head">Channel</p>
          <div class="channel-dropdown" v-if="status == 'loaded'">
            <multiselect
              v-if="status == 'loaded'"
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
            ></multiselect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import config from "../../../config";
import Loader from "../../partials/Loader";
import Save from "../../partials/Save";
import Multiselect from "vue-multiselect";
import { diff } from "deep-diff";

export default {
  name: "Logging",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    Loader,
    Multiselect,
    Save
  },
  data() {
    return {
      guild: {},
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
      error: "",
      status: "Loading...",
      showSave: false
    };
  },
  mounted() {
    this.getGuild();
  },
  methods: {
    getGuild() {
      var that = this;
      this.$http
        .get(`https://discordapp.com/api/users/@me/guilds`)
        .then(res => {
          const guild = res.data.find(
            g =>
              g.id === that.$route.params.id &&
              (g.permissions & 2146958591) === 2146958591
          );
          guild.iconURL = guild.icon
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${
                guild.icon.includes("a_") ? "gif" : "png"
              }?size=1280`
            : `${that.defaultImage}`;
          that.guild = guild;
          that.getDatabase();
        })
        .catch(e => {
          that.error = e;
        });
    },
    getGuildData() {
      var that = this;
      this.$http
        .get(`${config.api.base}/guilds/${that.$route.params.id}/info`, {
          headers: {
            password: config.api.password
          }
        })
        .then(res => {
          /* Main */
          that.guildData.main = { ...res.data };

          /* Channels */
          that.guildData.other.channelsValues = Object.values(
            that.guildData.main.channels
          );

          /* Server Logs */
          if (that.guildDB.serverLogs) {
            const channel = that.guildData.other.channelsValues.find(
              x => x.id == that.guildDB.serverLogs
            );
            if (channel) {
              that.guildData.database.serverLogs = channel;
            }
          }

          /* Cache */
          that.beforeGuildData = { ...that.guildData };

          /* Loaded */
          that.status = "loaded";
          return true;
        })
        .catch(e => {
          that.error = e;
        });
    },
    getDatabase() {
      var that = this;
      this.$http
        .get(`${config.api.base}/guilds/${that.$route.params.id}/data`, {
          headers: {
            password: config.api.password
          }
        })
        .then(res => {
          that.guildDB = { ...res.data };
          that.beforeGuildDB = { ...res.data };
          that.getGuildData();
        })
        .catch(e => {
          that.error = e;
        });
    },
    saveChanges() {
      var that = this;
      this.$http
        .patch(
          `${config.api.base}/guilds/${that.$route.params.id}/data`,
          {
            serverLogs: that.guildDB.serverLogs
          },
          {
            headers: {
              password: config.api.password
            }
          }
        )
        .then(() => {
          that.getDatabase();
        })
        .catch(e => {
          that.error = e;
        });
    },
    discardChanges() {
      // this.guildData = Object.assign({}, this.beforeGuildData);
      this.getGuild();
    }
  },
  watch: {
    guildDB: {
      handler: function() {
        const diffs = diff(this.guildDB, this.beforeGuildDB);
        if (diffs) this.showSave = true;
        else this.showSave = false;
      },
      deep: true
    },
    "guildData.database.serverLogs": function(newValue) {
      const newID = newValue ? newValue.id : null;
      this.guildDB.serverLogs = newID;
    }
  }
};
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

.save-popup-enter-active,
.save-popup-leave-active {
  transition: opacity 0.5s;
}

.save-popup-enter,
.save-popup-leave-to {
  opacity: 0;
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
