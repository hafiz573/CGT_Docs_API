---
layout: home

hero:
  name: CGT V1.50
  text: Lua API Reference
  tagline: Reverse-engineered reference for the CreativeGrowtopia V1.50 scripting API — functions, structs and enums recovered directly from the binary.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: API reference
      link: /api/local-player
    - theme: alt
      text: Structs
      link: /structs

features:
  - title: Recovered from the binary
    details: Every function name, parameter type and return-table field is extracted directly from libregrowtopia.so (V1.50), not copied from another build.
  - title: Grouped by category
    details: 60+ functions across local player, players, world & tiles, items, network, render, UI, objects, input and settings.
  - title: Structs & enums
    details: The exact table shapes the engine returns (Player, Tile, World, ItemInfo, …) and the input-event type enum.
---

::: warning Unofficial & inferred
This is community documentation. The V1.50 binary contains **no documentation prose** — signatures are
reverse-engineered and the one-line descriptions are **inferred** from each name and its recovered signature.
Verify against your own build before relying on any detail.
:::
