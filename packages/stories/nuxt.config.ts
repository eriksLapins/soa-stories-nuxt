// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
      head: {
          title: '{{capital name}} | SortofaShowcase',
          link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
      }
  },
  components: {
    dirs: [
      {
        path: "~/base-components",
        global: true,
      }
    ],
  },
  css: [
    "~/assets/css/app.css",
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  compatibilityDate: '2024-10-27',
})
