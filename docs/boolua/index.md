# BooLua (modded build)

**BooLua** is the **mydll-patched** CreativeGrowtopia V1.50 build. It exposes the **entire [native V1.50 API](/api/local-player)** *plus* the extra functions on this page, and changes the behaviour of a few native ones (see [Overrides](/boolua/overrides)).

::: tip Two builds, one site
Use the **Native (Ori)** section for the stock V1.50 API that ships in the APK. Use **BooLua** here for everything the loader adds or changes. Everything in Native also works in BooLua.
:::

## What BooLua adds

- **[Added functions](/boolua/functions)** - fly, anti-portal, mod-zoom, no-lock tiles, version/protocol bypass, and an HTTP `MakeRequest`.

- **[Overrides](/boolua/overrides)** - native functions whose behaviour the patch changes (`GetTile.extra`, `MakeRequest`), plus the `io`/`os` sandbox.

## Platforms

The table below and each function's badge show where a binding exists. Android ships the full set; the PC `mydll.dll` ships the core (`_SetFly`, `_FlyState`, `ChangeValue`, `MakeRequest`, anti-portal) and adds PC-only RE/debug helpers: `_DumpObjects`, `_ScanObjects`, `_ScanDrops`, `_ScanCandidates`, `_ScanTiles`, `_FindFloat`, `_RefineFloat`.

::: warning Unofficial & loader-specific
These functions come from the **mydll loader source**, not the game binary. Names and behaviour depend on your loader version.
:::
