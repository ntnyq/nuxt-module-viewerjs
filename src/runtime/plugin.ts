import defu from 'defu'
import Viewer from 'viewerjs'
import { defineNuxtPlugin, useAppConfig, useRuntimeConfig } from '#app'
import type { ViewerjsOptions } from '../types'

export default defineNuxtPlugin({
  name: 'viewerjs',
  setup(nuxtApp) {
    const appConfig = useAppConfig()
    const runtimeConfig = useRuntimeConfig()
    const viewerOptions = runtimeConfig.public.viewerjs

    if (!viewerOptions) {
      return
    }

    const runtimeOptions: ViewerjsOptions = viewerOptions
    let viewer: Viewer | undefined
    let refreshTimeout: ReturnType<typeof setTimeout> | undefined

    function resolveOptions() {
      const applicationOptions: ViewerjsOptions = appConfig.viewerjs ?? {}

      return defu(applicationOptions, runtimeOptions, {
        container: '#__nuxt',
        delay: 200,
      })
    }

    function refresh() {
      refreshTimeout = undefined
      viewer?.destroy()
      viewer = undefined

      const { container, delay: _delay, ...restOptions } = resolveOptions()
      const containerEl = document.querySelector<HTMLElement>(container)

      if (!containerEl) {
        return
      }

      viewer = new Viewer(containerEl, restOptions)
    }

    function cancelRefresh() {
      clearTimeout(refreshTimeout)
      refreshTimeout = undefined
    }

    function scheduleRefresh() {
      cancelRefresh()
      refreshTimeout = setTimeout(refresh, resolveOptions().delay)
    }

    nuxtApp.hook('app:mounted', scheduleRefresh)
    nuxtApp.hook('page:start', cancelRefresh)
    nuxtApp.hook('page:finish', scheduleRefresh)
    nuxtApp.hook('page:transition:finish', scheduleRefresh)
  },
})
