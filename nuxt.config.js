export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Festivals Near Me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Find festivals near you. Search by postcode. Find the closest festivals, where you are.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/rvx8gvh.css' },
      { rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css' },
    ], 
    script: [
      { src: 'https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js' },
      { src: 'https://code.iconify.design/1/1.0.6/iconify.min.js' },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/index.js'
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:3000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.VERCEL_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.VERCEL_URL
    }
  },

  ssr: true,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
