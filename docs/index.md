---
layout: home

hero:
  name: CGT V1.50
  text: Lua API Reference
  tagline: Reverse-engineered reference for the CreativeGrowtopia V1.50 scripting API - functions, structs and enums recovered directly from the binary.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: API reference
      link: /api/local-player
    - theme: alt
      text: BooLua (modded)
      link: /boolua/

features:
  - title: Two builds, one site
    details: 'Native (CGT Ori) is the stock V1.50 API from the APK. BooLua is the mydll-patched build: the same native API plus the loader''s added functions and overrides. Switch with the Build menu.'
  - title: Recovered from the binary
    details: Every native function name, parameter type and return-table field is extracted directly from libregrowtopia.so (V1.50), not copied from another build.
  - title: Grouped by category
    details: 60+ native functions across local player, players, world and tiles, items, network, render, UI, objects, input and settings, plus structs and enums.
---

::: warning Unofficial & inferred
This is community documentation. The V1.50 binary contains **no documentation prose** - signatures are
reverse-engineered and the one-line descriptions are **inferred** from each name and its recovered signature.
Verify against your own build before relying on any detail.
:::
