const { description } = require('../../package')

module.exports = {
  title: '🐍 Cottonmouth',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: 'lukecarr/c9h',
    docsDir: 'docs',
    navbar: [
      {
        text: '5 Min Tutorial',
        link: '/docs/tutorial.md',
      },
      {
        text: 'Guide',
        link: '/docs/guide/installation.md',
      },
      {
        text: 'Community',
        link: '/docs/community.md',
      },
      {
        text: 'Changelog',
        link: '/docs/changelog.md',
      },
      {
        text: 'NPM',
        link: 'https://npmjs.com/package/c9h',
      },
    ],
    sidebar: [
      '/docs/tutorial.md',
      {
        text: 'Guide',
        children: [
          '/docs/guide/installation.md',
          '/docs/guide/basic-usage.md',
          '/docs/guide/options.md',
          '/docs/guide/env.md',
          '/docs/guide/load-priority.md',
        ],
      },
      '/docs/community.md',
      '/docs/changelog.md',
    ],
  },

  plugins: [
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-1KN79DNFR5',
      },
    ]
  ],
}
