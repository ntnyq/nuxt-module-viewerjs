import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'
import { name, version } from '../package.json'
import type { ViewerjsOptions } from './types'

export * from './types'

export default defineNuxtModule<ViewerjsOptions>({
  meta: {
    name,
    version,
    configKey: 'viewerjs',
    compatibility: {
      nuxt: '>=3.0',
    },
  },

  defaults: {
    container: '#__nuxt',
    delay: 200,
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css ??= []
    nuxt.options.css.push('viewerjs/dist/viewer.css')

    nuxt.options.runtimeConfig.public.viewerjs = defu(
      nuxt.options.runtimeConfig.public.viewerjs,
      options,
    )

    addPlugin({
      name: 'viewerjs',
      src: resolve('runtime/plugin'),
      mode: 'client',
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    viewerjs?: ViewerjsOptions
  }

  interface NuxtOptions {
    viewerjs?: ViewerjsOptions
  }

  interface PublicRuntimeConfig {
    viewerjs?: Required<ViewerjsOptions>
  }
}
