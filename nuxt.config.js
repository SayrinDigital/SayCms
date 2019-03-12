const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Say CMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather+Sans:300,400|Merriweather:300,400' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['uikit/dist/css/uikit.css', '@/assets/style.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      { src: '~/plugins/uikit.js', ssr: false }, { src: '~/plugins/vue2-filters.js', ssr: false }
    ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'https://api.privadosvip.cl'
    // See https://github.com/nuxt-community/axios-module#options
  },

  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
          register: { url: '/auth/local/register', method: 'post'},
          user: { url: '/users/me', method: 'get', propertyName: null},
          logout: null
        },
         tokenRequired: true,
         tokenType: 'bearer',
      }
    },
    redirect: {
      logout: '/login'
    }
  },

  router: {
  middleware: ['auth']
},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ['vuejs-datepicker'],
    extend(config, ctx) {

    }
  }
}
