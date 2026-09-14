/**
 * Reject callbacks before Nuxt silently removes them from runtime config
 */
export function assertSerializableOptions(
  options: unknown,
  path = 'viewerjs',
): void {
  if (typeof options === 'function') {
    throw new TypeError(
      `${path} cannot contain a function in runtime config. Move it to viewerjs in app.config.ts.`,
    )
  }

  if (options && typeof options === 'object') {
    for (const [key, option] of Object.entries(options)) {
      assertSerializableOptions(option, `${path}.${key}`)
    }
  }
}
