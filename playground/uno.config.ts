/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      extraProperties: {
        color: 'inherit',
        // Avoid crushing of icons in crowded situations
        'min-width': '1.2em',
      },
    }),
  ],

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
    },
  ],
})
