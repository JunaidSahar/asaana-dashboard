// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 'nuxt-icon', "nuxt-tiptap-editor"
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  tiptap: {
    lowlight: {
      theme: "github-dark", //default theme
    },
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  }
})
