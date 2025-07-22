/**
 * @file nuxt config
 */

export default defineNuxtConfig({
  compatibilityDate: '2025-07-20',
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
  nitro: {
    preset: 'static',
  },
})
