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
      link: /api/globals
    - theme: alt
      text: BooLua (modded)
      link: /boolua/

features:
  - title: Two builds, one site
    details: 'Native (CGT Ori) is the stock V1.50 API from the APK. BooLua is the mydll-patched build: the same native API plus the loader''s added functions and overrides. Switch with the Build menu.'
  - title: Verified against the game
    details: The authoritative list of 108 names and their namespaces comes from a live in-game _G dump (hash 19601d21), identical on PC and Android. Nothing is guessed about what exists.
  - title: Namespaced surface
    details: 'Globals plus seven namespaces - Client, Entities, Input, Proton, Render, Script and UI. Parameter types and return-table fields are reverse-engineered from the binary; structs and enums included.'
---

::: warning Unofficial & inferred
This is community documentation. Names and namespaces come from a live `_G` dump; parameter types and
return fields are **reverse-engineered** from the binary and the one-line descriptions are **inferred**.
Verify against your own build before relying on any detail.
:::
