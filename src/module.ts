import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'
import { name, version } from '../package.json'
import { assertSerializableOptions } from './options'
import type { ViewerjsModuleOptions, ViewerjsOptions } from './types'

export * from './types'

export default defineNuxtModule<ViewerjsModuleOptions>({
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

    const runtimeOptions = defu(
      nuxt.options.runtimeConfig.public.viewerjs,
      options,
    )

    assertSerializableOptions(runtimeOptions)
    nuxt.options.runtimeConfig.public.viewerjs = runtimeOptions

    addPlugin({
      name: 'viewerjs',
      src: resolve('runtime/plugin'),
      mode: 'client',
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    viewerjs?: ViewerjsModuleOptions
  }

  interface NuxtOptions {
    viewerjs?: ViewerjsModuleOptions
  }

  interface PublicRuntimeConfig {
    viewerjs?: ViewerjsModuleOptions
  }

  interface AppConfigInput {
    viewerjs?: ViewerjsOptions
  }

  interface AppConfig {
    viewerjs?: ViewerjsOptions
  }
}
