import { createResolver } from "@nuxt/kit";

const {resolve} = createResolver(import.meta.url);
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  hooks: {
    'prepare:types': (config) => {
      config.tsConfig.compilerOptions.paths ||= {};
      config.tsConfig.compilerOptions.paths['#soa'] = [resolve('./playground/.nuxt/soa')];
    },
  }
});