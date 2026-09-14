export default defineAppConfig({
  viewerjs: {
    filter: image => image.alt.startsWith('Emoji_'),
    title: image => image.alt,
  },
})
