const env = require('dotenv')
env.config()

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Aurora Discord Bot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.jsdelivr.net/gh/zyrouge/aurora-cdn/logo.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#a239ca' },
  /*
  ** Global CSS
  */
  css: [
    'vue-multiselect/dist/vue-multiselect.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/line-chart.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: (process.env.NODE_ENV === 'production' ? process.env.PROD_BASE : process.env.BASE_URL),
    credentials: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    port: process.env.PORT || 8000
  }
}
