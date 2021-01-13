import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  // Target (https://go.nuxtjs.dev/config-target)

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - املاک آنلاین',
    title: 'هومی',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/brand.png'
      },

    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // "~static/css/style",
    "@/assets/css/style",


  ],

  loading: {
    color: '#673AB7'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{
      src: '~plugins/leaflet.js',
      ssr: false
    },
    {
      src: '~plugins/datepicker.js',
      ssr: false
    },
    {
      src: '~plugins/moment.js'
    },
    {
      src: '~/plugins/axios'
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-socket-io'

  ],



  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3000/',

    // proxy: true,

  },
  proxy: {
    // "/homie/": "https://miladkhajavi.ir/"

  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {

      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // io: {
  //   sockets: [{
  //     name: 'connection',
  //     url: 'http://192.168.43.36:3000',
  //     default: true,

  //   }]
  // },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0',
    // host: '127.0.0.1',
  },

  pwa: {
    manifest: {
      name: 'هومی',
      lang: 'fa',
      short_name: "هومی",
      display: "standalone",
      start_url: "/",
      dir: 'rtl',
      background_color: "#2D3047",
      theme_color: "#2D3047",
      icons: [{
        src: "/brand.png",
        type: "image/png",
        sizes: "1014x810"
      }, ]
    },
    workbox: {
      autoRegister: true,
      offline: false,
      skipWaiting: true,
      clientsClaim: true,

    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {}
    // chainWebpack(config, ctx) {
    //   config.performance
    //   .maxEntrypointSize(2000000)
    //   .maxAssetSize(2000000)
    // if (ctx && ctx.isClient) {
    //   config.optimization.splitChunks.maxSize = 300000
    // }
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)$/i,
    //   loader: 'file-loader',
    //   options: {
    //     limit: 2000000,
    //     name: '[path][name].[hash:7].[ext]'
    //   }
    // })
    // }

  }

}
