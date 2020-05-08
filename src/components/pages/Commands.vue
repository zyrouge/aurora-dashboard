<template>
  <div class="cointainer">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <p class="error" v-if="error && error.length > 0">{{ error }}</p>
    <div class="loading" v-if="status != 'loaded'">
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </div>
    <div class="commands-box" v-if="status == 'loaded'">
      <h1>Commands</h1>
      <input
        type="text"
        v-model="searchBox"
        :placeholder="'🔍 Search in ' + commands.length + ' commands...'"
      />
      <div class="commands">
        <div class="command-box" v-for="command in filteredCommands" :key="command.conf.name">
          <div class="infobox">
            <div class="info">
              <h3 style="width: 100%">
                <span class="name">{{ command.conf.name }}</span>
                <span
                  class="new"
                  v-if="Date.now() - new Date(command.conf.createdAt).getTime() < 86400000 * 3"
                >
                  <i class="fas fa-magic"></i> NEW
                </span>
                <span class="category">{{ command.conf.category }}</span>
              </h3>
              <p class="description">{{ command.conf.description }}</p>
            </div>
            <div class="sidebar">
              <i
                v-show="command.show"
                class="fas fa-chevron-up"
                style="cursor: pointer"
                @click="toggleCommandDisplay(command)"
              ></i>
              <i
                v-show="!command.show"
                class="fas fa-chevron-down"
                style="cursor: pointer"
                @click="toggleCommandDisplay(command)"
              ></i>
            </div>
          </div>
          <div v-show="command.show" class="moreinfo">
            <hr />
            <p v-if="command.conf.aliases.length > 0" class="aliases">
              <span>Aliases:</span>
              <code>{{ command.conf.aliases.join(", ") }}</code>
            </p>
            <p class="cooldown">
              <span>Cooldown:</span>
              <code>{{ command.conf.cooldown }} seconds</code>
            </p>
            <p class="usage">
              <span>Usage:</span>
              <code>a&{{ command.conf.name }} {{ command.conf.usage }}</code>
            </p>
            <p class="compatibility">
              <span>Compatibility:</span>
              <code>{{ command.conf.guildOnly ? "Guild" : "Guild & DM" }}</code>
            </p>
            <p class="botPerms" v-if="command.conf.permission.bot.length > 0">
              <span>Bot Permissions:</span>
              <code>{{ command.conf.permission.bot.join(", ") }}</code>
            </p>
            <p class="userPerms" v-if="command.conf.permission.user.length > 0">
              <span>User Permissions:</span>
              <code>{{ command.conf.permission.user.join(", ") }}</code>
            </p>
          </div>
        </div>
        <div v-if="filteredCommands.length == 0" class="noResults">
          <br />
          <img src="https://img.icons8.com/cute-clipart/512/000000/search.png" />
          <h1>No results were found.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";

export default {
  name: "commands",
  metaInfo: {
    title: "Commands"
  },
  data() {
    return {
      searchBox: "",
      commands: [],
      error: "",
      status: "Loading..."
    };
  },
  computed: {
    filteredCommands() {
      return this.commands.filter(cmd => {
        return (
          cmd.conf.name.toLowerCase().indexOf(this.searchBox.toLowerCase()) >
            -1 ||
          cmd.conf.description
            .toLowerCase()
            .indexOf(this.searchBox.toLowerCase()) > -1 ||
          cmd.conf.category
            .toLowerCase()
            .indexOf(this.searchBox.toLowerCase()) > -1 ||
          cmd.conf.aliases
            .join(" ")
            .toLowerCase()
            .indexOf(this.searchBox.toLowerCase()) > -1
        );
      });
    }
  },
  created() {
    var that = this;
    this.$http
      .get(`${config.api.base}/commands`)
      .then(res => {
        const commands = new Array();
        res.data.forEach(data => {
          data.show = false;
          console.log(data.commands);
          commands.push(data);
        });
        that.commands = commands;
        that.status = "loaded";
      })
      .catch(e => {
        console.log(e);
        that.error = e;
      });
  },
  methods: {
    toggleCommandDisplay(command) {
      command.show = !command.show;
    }
  }
};
</script>

<style scoped>
.command-box {
  text-align: left;
  background: var(--fuschia);
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 5px;
}

.command-box .infobox {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.command-box .infobox .info {
  width: 100%;
}

.command-box .infobox .sidebar {
  text-align: center;
  width: 50px;
  font-size: 30px;
}

.command-box .info p.description {
  font-size: 14px;
}

.command-box .moreinfo {
  animation: moreInfoAnime 0.5s;
}

.command-box .moreinfo span {
  font-size: 14px;
}

.command-box .moreinfo span::after {
  content: " ";
}

.commands-box input[type="text"] {
  border: 3px solid #5a2f5f;
  background: #5a2f5f;
  padding: 5px 10px;
  width: 60%;
  border-radius: 5px;
  outline: none;
  font-family: "Poppins";
  transition: 0.5s;
  color: var(--fuschia);
}

.commands-box input[type="text"]:focus {
  border: 3px solid white;
  background: white;
}

span.name:after {
  content: " ";
}

span.new {
  background: var(--jewel);
  padding: 0 5px;
  margin-top: 3spx;
  font-size: 10px;
  display: inline-block;
  vertical-align: middle;
}

span.category {
  float: right;
  font-size: 15px;
  padding-top: 2.5px;
  opacity: 0.5;
}

hr {
  margin: 10px 0;
  opacity: 0.2;
}

code {
  margin: 0px;
  padding: 5px;
  background: var(--void);
  border-radius: 5px;
  font-size: 11px;
}

.noResults img {
  width: 25%;
}

@media screen and (max-width: 750px) {
  .commands-box input[type="text"] {
    width: 100%;
  }

  .noResults img {
    width: 50%;
  }
}

::-webkit-input-placeholder {
  color: var(--fuschia);
}
::-moz-placeholder {
  color: var(--fuschia);
}
:-ms-input-placeholder {
  color: var(--fuschia);
}
:-moz-placeholder {
  color: var(--fuschia);
}

p.error {
  background-color: #ff0000;
  padding: 5px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: 600;
}
</style>
