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
