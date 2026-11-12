# BooLua (modded build)

**BooLua** is the **mydll-patched** CreativeGrowtopia V1.51 build. It exposes the **entire [native V1.51 API](/api/globals)** *plus* the extra functions on these pages, and changes the behaviour of a few native ones.

::: tip Two builds, one site
The **API** and **Hooks** pages describe the stock V1.51 game. The **BooLua** pages cover everything the loader adds or changes. Everything native also works in BooLua.
:::

## Lua additions

- **[Added functions](/boolua/functions)** - fly, anti-portal, mod-zoom, no-lock tiles, version/protocol bypass, the legacy `MakeRequest(url, body)` form, and Bothax-style background threads (`RunThread`).
- **[Overrides](/boolua/overrides)** - `GetTile.extra` + out-of-bounds `nil`, 1-based `SendVariantList` vectors, `MakeRequest`, `RunThread`, and the extra standard libraries with the `io`/`os` sandbox.
- **[Examples](/boolua/examples)** - ready-to-adapt scripts.

## In-game features

**Dev Menu > Misc** is split into two sub tabs:

- **Main** - the game's own toggles plus BooLua's: *Enable Modfly*, *Enable ModZoom*, *Enable Anti Portal*; PC adds *Enable TP Click* (Shift + right-click teleports to the tile under the cursor); Android adds *GetTile NoLock* and *Floating Window*.
- **Debug** - a packet log in the style of Bothax. Tick **VariantList**, **SendPacket** and/or **SendPacketRaw** to capture outgoing calls; **Clear**, **Pause/Resume** and **Dump to file** (`packets.txt`) act on the last 100 entries. Login passwords (`tankIDPass`) are always shown as `***`.

Other changes:

- **`/wp <world>`** in chat is sent as `/warp <WORLD>`.
- The intro gets BooLua's own **Skip** button and splash; the game's built-in "Skip Intro >>" button is removed.
- **PC**: **F2** opens/closes the Dev Menu, **F3** toggles Anti Portal (game window focused).

## Platforms

Each function's badge shows where it exists. Android ships the full set; the PC `mydll.dll` ships the core (`_SetFly`, `_FlyState`, `ChangeValue`, `MakeRequest`, `RunThread`, anti-portal) plus PC-only RE/debug helpers: `_DumpObjects`, `_ScanObjects`, `_ScanDrops`, `_ScanCandidates`, `_ScanTiles`, `_FindFloat`, `_RefineFloat`.

::: warning Unofficial & loader-specific
These come from the **mydll loader source**, not the game binary. Names and behaviour depend on your loader version.
:::
