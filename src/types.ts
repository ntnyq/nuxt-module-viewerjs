import type Viewer from 'viewerjs'

export interface ViewerjsOptions extends Viewer.Options {
  /**
   * container of images
   *
   * @default `#__nuxt`
   */
  container?: string

  /**
   * Delay in milliseconds
   *
   * @default 200
   */
  delay?: number
}

type Serializable<T> = T extends boolean | number | string | null | undefined
  ? T
  : T extends (...args: never[]) => unknown
    ? never
    : T extends object
      ? { [Key in keyof T]: Serializable<T[Key]> }
      : never

/**
 * Serializable defaults for nuxt.config.ts and public runtime config
 * Define callback options in app.config.ts using ViewerjsOptions
 */
export type ViewerjsModuleOptions = Serializable<ViewerjsOptions>
