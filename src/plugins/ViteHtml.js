module.exports = (options) => {
  return {
    transformIndexHtml:{
      enforce:'pre',
      transform: (html, ctx) => {
        return html.replace(/<%= title =>/g, options.inject.data.title)
      }
    }
  }
}