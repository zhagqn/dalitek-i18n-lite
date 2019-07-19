module.exports = {
  plugins: [
    require('./plugin.js')
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'DalitekI18nLite',
      description: 'DalitekI18nLite for Vue.js'
    }
  },
  themeConfig: {
    repo: '/dalitek-i18n-lite',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [{
          text: 'Release Notes',
          link: 'https://github.com//dalitek-i18n-lite/releases'
        }],
        sidebar: [
          '/installation.md',
          '/started.md',
        ]
      }
    }
  }
}
