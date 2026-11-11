import { defineConfig } from 'vitepress'
import sidebar151 from './sidebar-v1.51.json' with { type: 'json' }
import sidebar150 from './sidebar-v1.50.json' with { type: 'json' }

// GitHub Pages project sites are served under /<repo>/. The deploy workflow sets
// DOCS_BASE=/<repo>/ ; locally it defaults to '/'.
const base = process.env.DOCS_BASE || '/'

// Each game version is a VitePress locale: its own pages, nav, sidebar and its own
// local-search index, so search only covers the version being read.
// Latest version lives at the root; older ones under /v<version>/.
const versions = [
  { text: 'V1.51 (latest)', link: '/' },
  { text: 'V1.50', link: '/v1.50/' },
]
const versionMenu = (current) => ({ text: current, items: versions })

const v150 = {
  nav: [
    { text: 'Guide', link: '/v1.50/guide/getting-started' },
    {
      // Build switcher: the two views of the V1.50 API.
      text: 'Build',
      items: [
        { text: 'Native (CGT Ori)', link: '/v1.50/api/globals' },
        { text: 'BooLua (modded)', link: '/v1.50/boolua/' },
      ],
    },
    { text: 'Native API', link: '/v1.50/api/globals' },
    { text: 'BooLua', link: '/v1.50/boolua/' },
    { text: 'Structs', link: '/v1.50/structs' },
    { text: 'Examples', link: '/v1.50/examples' },
    versionMenu('V1.50'),
  ],
  sidebar: {
    '/v1.50/': [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/v1.50/guide/getting-started' },
          { text: 'Overview', link: '/v1.50/guide/overview' },
          { text: 'Examples', link: '/v1.50/examples' },
        ],
      },
      { text: 'Native API (CGT Ori)', collapsed: false, items: sidebar150.api },
      {
        text: 'Types',
        items: [
          { text: 'Structs', link: '/v1.50/structs' },
          { text: 'Enums', link: '/v1.50/enums' },
          { text: 'Internal environment', link: '/v1.50/internal' },
        ],
      },
      {
        text: 'BooLua (modded)',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/v1.50/boolua/' },
          { text: 'Added functions', link: '/v1.50/boolua/functions' },
          { text: 'Overrides', link: '/v1.50/boolua/overrides' },
          { text: 'Examples', link: '/v1.50/boolua/examples' },
        ],
      },
    ],
  },
  footer: {
    message:
      'Signatures reverse-engineered from libregrowtopia.so (V1.50). Descriptions inferred.',
    copyright: 'Unofficial community documentation.',
  },
}

const v151 = {
  nav: [
    { text: 'Guide', link: '/guide/getting-started' },
    { text: 'API', link: '/api/globals' },
    { text: 'Hooks', link: '/api/hooks' },
    { text: "What's new", link: '/whats-new' },
    versionMenu('V1.51'),
  ],
  sidebar: { '/': sidebar151 },
  footer: {
    message: 'Text from the API reference embedded in libregrowtopia.so (V1.51).',
    copyright: 'Unofficial community documentation.',
  },
}

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'CGT Lua API',
  description: 'Reference for the CreativeGrowtopia Lua scripting API.',
  lastUpdated: true,
  cleanUrls: true,
  // The version menu replaces VitePress's language switcher, which locales would show.
  head: [['style', {}, '.VPNavBarTranslations,.VPNavScreenTranslations{display:none}']],
  locales: {
    root: { label: 'V1.51', lang: 'en-US', title: 'CGT V1.51 Lua API', themeConfig: v151 },
    'v1.50': { label: 'V1.50', lang: 'en-US', link: '/v1.50/', title: 'CGT V1.50 Lua API', themeConfig: v150 },
  },
  themeConfig: {
    outline: { level: [2, 3] },
    search: { provider: 'local' },
    socialLinks: [],
  },
})
