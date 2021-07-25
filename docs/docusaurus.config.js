const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '🐍 Cottonmouth',
  tagline: 'Zero-config config for Node.js',
  url: 'https://c9h.carr.sh',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lukecarr',
  projectName: 'c9h',
  themeConfig: {
    navbar: {
      title: '🐍 Cottonmouth',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '5 Min Tutorial',
        },
        {
          type: 'doc',
          docId: 'community',
          position: 'right',
          label: 'Community',
        },
        {
          href: 'https://github.com/lukecarr/c9h',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick links',
          items: [
            {
              label: '5 Min Tutorial',
              to: '/docs/intro',
            },
            {
              label: 'Community',
              to: '/docs/community',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/c9h',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lukecarr/c9h',
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/lukecarr/c9h/edit/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
