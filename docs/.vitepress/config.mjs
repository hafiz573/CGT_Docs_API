import { defineConfig } from 'vitepress'
import sidebarData from './sidebar.json' with { type: 'json' }

// GitHub Pages project sites are served under /<repo>/. The deploy workflow sets
// DOCS_BASE=/<repo>/ ; locally it defaults to '/'.
const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'CGT V1.50 Lua API',
  description:
    'Reverse-engineered reference for the CreativeGrowtopia V1.50 Lua scripting API.',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/local-player' },
      { text: 'Structs', link: '/structs' },
      { text: 'Enums', link: '/enums' },
      { text: 'Examples', link: '/examples' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      { text: 'API reference', collapsed: false, items: sidebarData.api },
      {
        text: 'Types',
        items: [
          { text: 'Structs', link: '/structs' },
          { text: 'Enums', link: '/enums' },
          { text: 'Internal environment', link: '/internal' },
        ],
      },
    ],
    outline: { level: [2, 3] },
    search: { provider: 'local' },
    socialLinks: [],
    footer: {
      message:
        'Signatures reverse-engineered from libregrowtopia.so (V1.50). Descriptions inferred.',
      copyright: 'Unofficial community documentation.',
    },
  },
})
