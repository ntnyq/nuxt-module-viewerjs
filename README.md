# @nuxt-dev/viewerjs

[Viewer.js](https://github.com/fengyuanchen/viewerjs) integrated for Nuxt.

[![CI](https://github.com/ntnyq/nuxt-module-viewerjs/workflows/CI/badge.svg)](https://github.com/ntnyq/nuxt-module-viewerjs/actions)
[![NPM VERSION](https://img.shields.io/npm/v/@nuxt-dev/viewerjs/latest.svg)](https://www.npmjs.com/package/@nuxt-dev/viewerjs/v/latest)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/@nuxt-dev/viewerjs)](https://www.npmjs.com/package/@nuxt-dev/viewerjs)
[![LICENSE](https://img.shields.io/github/license/ntnyq/nuxt-module-viewerjs.svg)](https://github.com/ntnyq/nuxt-module-viewerjs/blob/main/LICENSE)

## Install

```shell
npm i viewerjs @nuxt-dev/viewerjs -D
```

```shell
yarn add viewerjs @nuxt-dev/viewerjs -D
```

```shell
pnpm add viewerjs @nuxt-dev/viewerjs -D
```

## Usage

Add to your `nuxt.config.ts`:

```ts
export default {
  modules: [
    // other modules
    '@nuxt-dev/viewerjs',
  ],

  viewerjs: {
    // custom options
    container: '#__nuxt',
  },
}
```

## Options

### container

Container of all images.

- **type**: `string`
- **required**: `false`
- **default**: `#__nuxt`

### delay

Delay in milliseconds after mounting, page rendering, or a page transition finishes.

- **type**: `number`
- **required**: `false`
- **default**: `200`

Check [Viewer.js - Options](https://github.com/fengyuanchen/viewerjs#options) for more options.

### Callback options

Options in `nuxt.config.ts` and `runtimeConfig.public.viewerjs` must be
serializable. Functions such as `filter`, `title`, `url`, event handlers, and
toolbar callbacks belong in `app/app.config.ts` (or `app.config.ts` in Nuxt 3):

```ts
export default defineAppConfig({
  viewerjs: {
    filter: image => image.classList.contains('zoomable'),
    title: image => image.alt,
    url: image => image.dataset.original || image.src,
  },
})
```

Application options override the defaults from runtime config and are read on
each refresh. Callbacks in module or runtime configuration cause a build error
with instructions to move them to app config.

`ViewerjsOptions` describes application options, including callbacks.
`ViewerjsModuleOptions` describes serializable module defaults.

## Credits

- [Viewer.js](https://github.com/fengyuanchen/viewerjs)

## License

[MIT](./LICENSE) License © 2025-PRESENT [ntnyq](https://github.com/ntnyq)
