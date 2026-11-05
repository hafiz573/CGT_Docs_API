# BooLua (modded build)

**BooLua** is the **mydll-patched** CreativeGrowtopia V1.50 build. It exposes the **entire [native V1.50 API](/api/globals)** *plus* the extra functions on this page, and changes the behaviour of a few native ones (see [Overrides](/boolua/overrides)).

::: tip Two builds, one site
Use the **Native (Ori)** section for the stock V1.50 API dumped from `_G`. Use **BooLua** here for everything the loader adds or changes. Everything in Native also works in BooLua.
:::

## What BooLua adds

- **[Added functions](/boolua/functions)** - fly, anti-portal, mod-zoom, no-lock tiles, version/protocol bypass, and an HTTP `MakeRequest`.

- **[Overrides](/boolua/overrides)** - native behaviour the patch changes (`GetTile.extra`, `MakeRequest`), plus the `io`/`os` sandbox.

- **[Examples](/boolua/examples)** - ready-to-adapt scripts (fly, anti-portal, version bypass, fast tile scan, webhook).

## Platforms

Each function's badge shows where it exists. Android ships the full set; the PC `mydll.dll` ships the core (`_SetFly`, `_FlyState`, `ChangeValue`, `MakeRequest`, anti-portal) plus PC-only RE/debug helpers: `_DumpObjects`, `_ScanObjects`, `_ScanDrops`, `_ScanCandidates`, `_ScanTiles`, `_FindFloat`, `_RefineFloat`.

::: warning Unofficial & loader-specific
These come from the **mydll loader source**, not the game binary. Names and behaviour depend on your loader version.
:::
