import Viewer from 'viewerjs'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'viewerjs',
  setup(nuxtApp) {
    const router = useRouter()
    const runtimeConfig = useRuntimeConfig()
    const viewerOptions = runtimeConfig.public.viewerjs

    if (!import.meta.client || !viewerOptions) return

    const { container, delay, ...restOptions } = viewerOptions

    let viewer: Viewer | undefined

    function refresh() {
      if (viewer) {
        viewer?.destroy()
      }

      if (!viewerOptions) return

      const containerEl = document.querySelector<HTMLElement>(container)

      if (!containerEl) return

      viewer = new Viewer(containerEl, restOptions)
    }

    nuxtApp.hook('app:mounted', async () => {
      await waitFor(delay)
      refresh()
    })

    router.afterEach(async () => {
      await waitFor(delay)
      refresh()
    })
  },
})

function waitFor(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
