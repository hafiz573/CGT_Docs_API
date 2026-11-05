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
      {
        // Build switcher: the two views of the API.
        text: 'Build',
        items: [
          { text: 'Native (CGT Ori)', link: '/api/local-player' },
          { text: 'BooLua (modded)', link: '/boolua/' },
        ],
      },
      { text: 'Native API', link: '/api/local-player' },
      { text: 'BooLua', link: '/boolua/' },
      { text: 'Structs', link: '/structs' },
      { text: 'Examples', link: '/examples' },
    ],
    sidebar: {
      // BooLua (modded) view
      '/boolua/': [
        {
          text: 'BooLua (modded build)',
          items: [
            { text: 'Overview', link: '/boolua/' },
            { text: 'Added functions', link: '/boolua/functions' },
            { text: 'Overrides', link: '/boolua/overrides' },
          ],
        },
        {
          text: 'Native API (CGT Ori)',
          collapsed: true,
          items: sidebarData.api,
        },
      ],
      // Native (CGT Ori) view - default for everything else
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Overview', link: '/guide/overview' },
            { text: 'Examples', link: '/examples' },
          ],
        },
        { text: 'Native API (CGT Ori)', collapsed: false, items: sidebarData.api },
        {
          text: 'Types',
          items: [
            { text: 'Structs', link: '/structs' },
            { text: 'Enums', link: '/enums' },
            { text: 'Internal environment', link: '/internal' },
          ],
        },
        {
          text: 'BooLua (modded)',
          items: [
            { text: 'Overview', link: '/boolua/' },
            { text: 'Added functions', link: '/boolua/functions' },
            { text: 'Overrides', link: '/boolua/overrides' },
          ],
        },
      ],
    },
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
