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

Delay time in millseconds.

- **type**: `number`
- **required**: `false`
- **default**: `200`

Check [Viewer.js - Options](https://github.com/fengyuanchen/viewerjs#options) for more options.

## Credits

- [vuepress/ecosystem - plugin-viewerjs](https://github.com/vuepress/ecosystem/tree/main/plugins/features/plugin-viewerjs)

## License

[MIT](./LICENSE) License © 2025-PRESENT [ntnyq](https://github.com/ntnyq)
