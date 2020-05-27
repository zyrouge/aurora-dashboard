<template>
  <div class="child-container">
    <div class="topics">
      <div class="topic" @click="takeOver('welcome')">
        <img src="https://img.icons8.com/color/96/000000/confetti.png">
        <div class="info">
          <p class="head">
            Farewell
          </p>
          <p>Modify you Welcomer and Leaver.</p>
        </div>
      </div>
      <div class="topic" @click="takeOver('moderation')">
        <img src="https://img.icons8.com/color/96/000000/thor-hammer.png">
        <div class="info">
          <p class="head">
            Moderation
          </p>
          <p>Configure Moderation Actions.</p>
        </div>
      </div>
      <div class="topic" @click="takeOver('leveling')">
        <img src="https://img.icons8.com/bubbles/100/000000/medal.png">
        <div class="info">
          <p class="head">
            Leveling
          </p>
          <p>Configure Leveling System.</p>
        </div>
      </div>
      <div class="topic" @click="takeOver('economy')">
        <img src="https://img.icons8.com/plasticine/100/000000/sales-performance.png">
        <div class="info">
          <p class="head">
            Economy
          </p>
          <p>Configure Economy related stuffs.</p>
        </div>
      </div>
      <div class="topic" @click="takeOver('logging')">
        <img src="https://img.icons8.com/color/96/000000/event-log.png">
        <div class="info">
          <p class="head">
            Logging
          </p>
          <p>Logs all the Activities in your Guild.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    takeOver (url) {
      this.$router.push(`${this.$route.path}/${url}`)
    }
  }
}
</script>

<style scoped>
.child-container .guild img.guildIcon {
  width: 20%;
  border: 3px solid var(--stark);
  border-radius: 50%;
  margin-bottom: 20px;
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
  .topic {
    width: 100%;
  }
}
</style>
