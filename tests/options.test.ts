import { describe, expect, expectTypeOf, it } from 'vitest'
import { assertSerializableOptions } from '../src/options'
import type { ViewerjsModuleOptions, ViewerjsOptions } from '../src/types'

describe('serializable module options', () => {
  it('accepts serializable Viewer.js options', () => {
    const options: ViewerjsModuleOptions = {
      container: '#gallery',
      delay: 0,
      button: false,
      filter: null,
      inheritedAttributes: ['crossOrigin'],
      title: 0,
      toolbar: { zoomIn: { show: true, size: 'large' } },
      url: 'data-original',
      slideOnWheel: 'ctrl',
    }

    expect(() => assertSerializableOptions(options)).not.toThrow()
  })

  it.each([
    [{ filter: () => false }, 'viewerjs.filter'],
    [{ title: [1, () => 'Title'] }, 'viewerjs.title.1'],
    [
      { toolbar: { custom: { click: () => {} } } },
      'viewerjs.toolbar.custom.click',
    ],
  ])('rejects callbacks with their configuration path', (options, path) => {
    expect(() => assertSerializableOptions(options)).toThrow(
      `${path} cannot contain a function in runtime config. Move it to viewerjs in app.config.ts.`,
    )
  })

  it('keeps callback types in application options only', () => {
    expectTypeOf<ViewerjsModuleOptions>().toExtend<ViewerjsOptions>()
    expectTypeOf<ViewerjsModuleOptions['filter']>().toEqualTypeOf<
      null | undefined
    >()
    expectTypeOf<ViewerjsModuleOptions['url']>().toEqualTypeOf<
      string | undefined
    >()
    expectTypeOf<NonNullable<ViewerjsOptions['filter']>>().toBeFunction()
  })
})
