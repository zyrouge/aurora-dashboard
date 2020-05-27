<template>
  <div class="Callback">
    <div>
      <Loader />
      <br>
      <h1>Logging in...</h1>
      <h5>This should not take more time!</h5>
      {{ error }}
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data () {
    return {
      code: '',
      error: ''
    }
  },
  mounted () {
    this.loginer()
  },
  methods: {
    async loginer () {
      const code = this.$route.query.code
      const guildID = this.$route.query.guild_id
      let direct = '/'
      if (guildID) { direct += `servers/${guildID}` }
      try {
        await this.$store.dispatch('oauth/login', { code })
        this.$router.push(direct)
      } catch (error) {
        this.error = error
      }
    }
  }
}
</script>

<style scoped>
* {
  color: #f1f1f2;
}

h1 {
  font-size: 30px;
}
</style>
