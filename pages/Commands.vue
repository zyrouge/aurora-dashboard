<template>
  <div class="container">
    <Loader v-if="!loaded" />
    <div v-else class="commands-box">
      <h1>Commands</h1>
      <input
        v-model="searchBox"
        type="text"
        :placeholder="'🔍 Search in ' + commands.length + ' commands...'"
      >
      <div class="commands">
        <div v-for="command in filteredCommands" :key="command.conf.name" class="command-box">
          <div class="infobox">
            <div class="info">
              <h3 style="width: 100%">
                <span class="name">{{ command.conf.name }}</span>
                <span
                  v-if="Date.now() - new Date(command.conf.createdAt).getTime() < 86400000 * 3"
                  class="new"
                >
                  <i class="fas fa-magic" /> NEW
                </span>
                <span class="category">{{ command.conf.category }}</span>
              </h3>
              <p class="description">
                {{ command.conf.description }}
              </p>
            </div>
            <div class="sidebar">
              <i
                v-show="command.show"
                class="fas fa-chevron-up"
                style="cursor: pointer"
                @click="toggleCommandDisplay(command)"
              />
              <i
                v-show="!command.show"
                class="fas fa-chevron-down"
                style="cursor: pointer"
                @click="toggleCommandDisplay(command)"
              />
            </div>
          </div>
          <div v-show="command.show" class="moreinfo">
            <hr>
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
            <p v-if="command.conf.permission.bot.length > 0" class="botPerms">
              <span>Bot Permissions:</span>
              <code>{{ command.conf.permission.bot.join(", ") }}</code>
            </p>
            <p v-if="command.conf.permission.user.length > 0" class="userPerms">
              <span>User Permissions:</span>
              <code>{{ command.conf.permission.user.join(", ") }}</code>
            </p>
            <hr v-if="command.commands.length">
            <div v-if="command.commands.length" class="subcommands-box">
              <p class="sub-head">
                Sub-Commands
              </p>
              <div
                v-for="(subcommand, index) in command.commands"
                :key="subcommand.name"
                class="subcommands"
              >
                <div class="subcommand">
                  <p class="name">
                    {{ subcommand.name }}
                  </p>
                  <p class="description">
                    {{ subcommand.description }}
                  </p>
                  <p v-if="subcommand.aliases.length" class="aliases">
                    <span>Aliases:</span>
                    <code>{{ subcommand.aliases.join(", ") }}</code>
                  </p>
                  <p class="usage">
                    <span>Usage:</span>
                    <code>a&{{ command.conf.name }} {{ subcommand.name }} {{ subcommand.usage }}</code>
                  </p>
                  <hr v-if="index + 1 !== command.commands.length">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filteredCommands.length == 0" class="noResults">
          <br>
          <img src="https://img.icons8.com/cute-clipart/512/000000/search.png">
          <h1>No results were found.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data () {
    return {
      searchBox: '',
      commands: [],
      error: '',
      loaded: false
    }
  },
  computed: {
    filteredCommands () {
      return this.commands.filter((cmd) => {
        return (
          cmd.conf.name.toLowerCase().includes(this.searchBox.toLowerCase()) ||
          cmd.conf.description
            .toLowerCase()
            .includes(this.searchBox.toLowerCase()) ||
          cmd.conf.category
            .toLowerCase()
            .includes(this.searchBox.toLowerCase()) ||
          cmd.conf.aliases
            .join(' ')
            .toLowerCase()
            .includes(this.searchBox.toLowerCase()) ||
          cmd.commands
            .map(sub => sub.name)
            .join(' ')
            .toLowerCase()
            .includes(this.searchBox.toLowerCase()) ||
          cmd.commands
            .map(sub => sub.aliases.join(' '))
            .join(' ')
            .toLowerCase()
            .includes(this.searchBox.toLowerCase()) ||
          cmd.commands
            .map(sub => sub.description)
            .join(' ')
            .toLowerCase()
            .includes(this.searchBox.toLowerCase())
        )
      })
    }
  },
  created () {
    this.loaded = false
    axios
      .get('/api/client/commands')
      .then((res) => {
        const commands = []
        res.data.forEach((data) => {
          data.show = false
          commands.push(data)
        })
        this.commands = commands
        this.loaded = true
      })
      .catch((e) => {
        this.error = e.toJSON()
      })
  },
  methods: {
    toggleCommandDisplay (command) {
      command.show = !command.show
    }
  }
}
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

.subcommands-box {
  background-color: rgba(255, 255, 255, 0.07);
  padding: 10px;
  border-radius: 5px;
}

.subcommands-box .sub-head {
  font-size: 16px;
  font-weight: bold;
  opacity: 0.5;
}

.subcommands .name {
  font-weight: bold;
}

.subcommand .description {
  font-size: 14px;
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
</style>
