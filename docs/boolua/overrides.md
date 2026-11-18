# Overrides

Native V1.52 behaviour the **mydll** patch changes. Scripts written for Bothax / BooLua V1.50 keep working unchanged.

## GetTile - `extra` field

Since V1.52 the stock [`GetTile`](/api/globals#gettile) fills `extra` itself: a copy of the tile's native extra data (`type`, `growth`, `growtime`, `remaining`, `ready`, `harvestable`, ...; `nil` for tiles without extra data). BooLua keeps that table and **adds one field**, `progress`, to every `extra` table, so it is never `nil` while `extra` exists:

```lua
local t = GetTile(x, y)
if t.extra then
  print("progress:", t.extra.progress)  -- number 0.0 .. 1.0, never nil
end
```

| field | type | notes |
|-------|------|-------|
| `extra.progress` | `number` | `0.0`-`1.0` harvest progress for trees/providers, `0` for every other tile with extra data; every other native field is unchanged |

## GetTile - out of bounds

Stock `GetTile` raises a Lua error for coordinates outside the world. BooLua returns **`nil`** instead, so scan loops can test `if t then` without `pcall`.

## GetTile / GetLocal - no engine lock (PC)

Stock `GetTile` and [`GetLocal`](/api/globals#getlocal) wait for the game's engine lock on every call, about one frame (5-15 ms) when the game is busy. On PC BooLua skips that wait: `GetTile` through the [`_SetGetTileNoLock`](/boolua/functions#setgettilenolock) toggle (default ON), `GetLocal` always (no toggle). Faster, slightly less safe: a read that races a world change (avatar or map being freed) can return garbage or crash the game.

## SendVariantList - 1-based vectors

Stock [`SendVariantList`](/api/globals#sendvariantlist) only accepts vectors as `{[0]=x, [1]=y}` or `{x=x, y=y}`; a 1-based `{x, y}` fails with *Unsupported VariantList value*. BooLua also accepts the Bothax format `{x, y}` / `{x, y, z}`.

## MakeRequest

Stock V1.52 registers a [native `MakeRequest`](/api/globals#makerequest) that returns a response table. BooLua changes it so the legacy Bothax/mydll form works too:

- **PC**: the game's registration is redirected to a dispatcher. A URL alone, an HTTP verb in arg 2, or a table in arg 3 runs the game's own function (returns the response); anything else runs BooLua's fire-and-forget version (no return value).
- **Android**: the native registration is skipped and BooLua's binding handles both forms, fire-and-forget (**no return value** - `r.status` from the native examples does not work there).

See [Added functions](/boolua/functions#makerequest).

## RunThread

V1.52 has a [native `RunThread`](/api/globals#runthread): a real worker thread with its **own** sandboxed state, so it cannot see the caller's globals, cannot capture tables or functions, and ignores extra arguments. BooLua **replaces it** with the [Bothax-style `RunThread(fn, ...)`](/boolua/functions#runthread) on both platforms: the callback is a coroutine of your own script, shares its globals and tables, and receives the extra arguments.

What you give up: the native task's name argument, its own entry in the Scripts tab, and running after the host script ends (BooLua threads stop with their script).

## Standard library and sandbox

Stock V1.52 exposes only base + `math`/`string`/`table` and `os.time` (see [Lua standard library](/lua)). BooLua opens the rest: `io`, `os`, `coroutine`, `utf8`, plus `load`, `loadfile`, `dofile`, `getmetatable`/`setmetatable`, `rawget`/`rawset`/`rawequal`/`rawlen`, `collectgarbage` and `warn`.

They are sandboxed (scriptguard): `os.execute` and `io.popen` are **removed**, `package` and `debug` are not opened, and `io.open`, `io.input`, `io.output`, `io.lines`, `os.remove`, `os.rename`, `loadfile` and `dofile` only reach the executor's own scripts folder. Paths outside it fail.
