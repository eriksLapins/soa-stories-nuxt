import { existsSync } from 'node:fs';
import {resolve} from 'pathe';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    existsSync(resolve(__dirname, '../dist/module.mjs')) ? 'soa-stories-nuxt' : '../src/module',
    '@nuxtjs/tailwindcss'
  ],
  stories: {
    enabled: true,
  }
})
