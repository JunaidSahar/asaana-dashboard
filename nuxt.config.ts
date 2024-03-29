// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 'nuxt-icon'
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  }
})
