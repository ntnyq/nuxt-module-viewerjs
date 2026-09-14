import Viewer from 'viewerjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ViewerjsModuleOptions, ViewerjsOptions } from '../src/types'

const nuxt = vi.hoisted(() => {
  const appConfig: { viewerjs?: ViewerjsOptions } = {}
  const runtimeConfig: { public: { viewerjs?: ViewerjsModuleOptions } } = {
    public: {},
  }
  const setup =
    vi.fn<
      (app: { hook: (name: string, callback: () => void) => void }) => void
    >()

  return { appConfig, runtimeConfig, setup }
})

vi.mock('#app', () => ({
  defineNuxtPlugin(plugin: { setup: typeof nuxt.setup }) {
    nuxt.setup.mockImplementation(plugin.setup)
    return plugin.setup
  },
  useAppConfig: () => nuxt.appConfig,
  useRuntimeConfig: () => nuxt.runtimeConfig,
}))

await import('../src/runtime/plugin')

const hooks = new Map<string, () => void>()

function callHook(name: string) {
  hooks.get(name)?.()
}

function getViewer(container = document.querySelector('#__nuxt')) {
  if (!container) {
    throw new Error('Missing gallery container')
  }

  const viewer: unknown = Reflect.get(container, 'viewer')

  if (!(viewer instanceof Viewer)) {
    throw new TypeError('Missing Viewer.js instance')
  }

  return viewer
}

function mount() {
  nuxt.setup({ hook: (name, callback) => hooks.set(name, callback) })
  callHook('app:mounted')
}

beforeEach(() => {
  vi.useFakeTimers()
  hooks.clear()
  nuxt.appConfig.viewerjs = undefined
  nuxt.runtimeConfig.public.viewerjs = { container: '#__nuxt', delay: 200 }
  document.body.innerHTML =
    '<div id="__nuxt"><img src="old.png" alt="old"></div>'
})

afterEach(() => {
  const container = document.querySelector('#__nuxt')
  const viewer: unknown = container && Reflect.get(container, 'viewer')

  if (viewer instanceof Viewer) {
    viewer.destroy()
  }

  vi.clearAllTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('Viewer.js lifecycle', () => {
  it('initializes after mounting and the configured delay', () => {
    mount()
    vi.advanceTimersByTime(199)
    expect(() => getViewer()).toThrow('Missing Viewer.js instance')

    vi.advanceTimersByTime(1)
    expect(Reflect.get(getViewer(), 'images')).toEqual([
      document.querySelector('img'),
    ])
  })

  it('preserves callbacks and merges application options over runtime defaults', () => {
    const excludedAlt = 'hidden'
    const filter: Viewer.Filter = image => image.alt !== excludedAlt
    const title: Viewer.TitleRenderer = image => `Photo: ${image.alt}`
    const click = vi.fn()

    nuxt.appConfig.viewerjs = {
      delay: 0,
      filter,
      title: [1, title],
      toolbar: { zoomIn: { click } },
    }
    nuxt.runtimeConfig.public.viewerjs = {
      container: '#__nuxt',
      delay: 200,
      toolbar: { zoomOut: false },
    }
    document
      .querySelector('#__nuxt')
      ?.insertAdjacentHTML('beforeend', '<img src="hidden.png" alt="hidden">')

    mount()
    vi.advanceTimersByTime(0)

    expect(Reflect.get(getViewer(), 'images')).toEqual([
      document.querySelector('img'),
    ])
    expect(Reflect.get(getViewer(), 'options')).toMatchObject({
      filter,
      title: [1, title],
      toolbar: { zoomIn: { click }, zoomOut: false },
    })
  })

  it('waits for a slow page to finish before collecting its images', () => {
    mount()
    vi.advanceTimersByTime(200)
    const previousViewer = getViewer()

    callHook('page:start')
    vi.advanceTimersByTime(1_000)
    expect(getViewer()).toBe(previousViewer)

    document.body.innerHTML = '<div id="__nuxt"><img src="new.png"></div>'
    callHook('page:finish')
    vi.advanceTimersByTime(200)

    expect(getViewer()).not.toBe(previousViewer)
    expect(Reflect.get(getViewer(), 'images')).toEqual([
      document.querySelector('img'),
    ])
  })

  it('refreshes again when a long page transition completes', () => {
    mount()
    vi.advanceTimersByTime(200)
    callHook('page:finish')
    vi.advanceTimersByTime(500)

    document.body.innerHTML =
      '<div id="__nuxt"><img src="transition.png"></div>'
    callHook('page:transition:finish')
    vi.advanceTimersByTime(200)

    expect(Reflect.get(getViewer(), 'images')).toEqual([
      document.querySelector('img'),
    ])
  })

  it('coalesces completion hooks into one refresh', () => {
    mount()
    vi.advanceTimersByTime(200)
    const destroy = vi.spyOn(getViewer(), 'destroy')

    callHook('page:finish')
    vi.advanceTimersByTime(100)
    callHook('page:transition:finish')
    vi.advanceTimersByTime(100)
    expect(destroy).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(destroy).toHaveBeenCalledOnce()
  })

  it('cancels a pending refresh when another page starts loading', () => {
    mount()
    vi.advanceTimersByTime(100)
    callHook('page:start')
    vi.advanceTimersByTime(1_000)
    expect(() => getViewer()).toThrow('Missing Viewer.js instance')

    callHook('page:finish')
    vi.advanceTimersByTime(200)
    expect(getViewer()).toBeInstanceOf(Viewer)
  })

  it('destroys an old viewer once when its container disappears', () => {
    mount()
    vi.advanceTimersByTime(200)
    const destroy = vi.spyOn(getViewer(), 'destroy')
    document.body.innerHTML = ''

    callHook('page:finish')
    vi.advanceTimersByTime(200)
    callHook('page:finish')
    vi.advanceTimersByTime(200)

    expect(destroy).toHaveBeenCalledOnce()
  })

  it('does not initialize without module runtime configuration', () => {
    nuxt.runtimeConfig.public.viewerjs = undefined
    mount()
    vi.advanceTimersByTime(200)
    expect(hooks.size).toBe(0)
  })
})
