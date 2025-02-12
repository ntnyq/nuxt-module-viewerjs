export default defineNuxtConfig({
  compatibilityDate: '2025-01-12',
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@unocss/nuxt', '@nuxt-dev/viewerjs'],
  ssr: false,
  viewerjs: {},
  app: {
    head: {
      title: '@nuxt-dev/viewerjs',
    },
  },
  experimental: {
    appManifest: false,
  },
})
