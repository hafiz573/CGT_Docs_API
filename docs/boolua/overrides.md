# Overrides

Native V1.51 behaviour the **mydll** patch changes. Scripts written for Bothax / BooLua V1.50 keep working unchanged.

## GetTile - `extra` field

In the stock build [`GetTile`](/api/globals#gettile) returns no `extra` key. BooLua adds a **table** carrying harvest progress when available:

```lua
local t = GetTile(x, y)
if t.extra then
  print("progress:", t.extra.progress)  -- number 0.0 .. 1.0
end
```

| field | type | notes |
|-------|------|-------|
| `extra.progress` | `number` | `0.0`-`1.0` harvest progress; `extra` is `nil` when not harvestable |

## GetTile - out of bounds

Stock `GetTile` raises a Lua error for coordinates outside the world. BooLua returns **`nil`** instead, so scan loops can test `if t then` without `pcall`.

## SendVariantList - 1-based vectors

Stock [`SendVariantList`](/api/globals#sendvariantlist) only accepts vectors as `{[0]=x, [1]=y}` or `{x=x, y=y}`; a 1-based `{x, y}` fails with *Unsupported VariantList value*. BooLua also accepts the Bothax format `{x, y}` / `{x, y, z}`.

## MakeRequest

Stock V1.51 registers a [native `MakeRequest`](/api/globals#makerequest) that returns a response table. BooLua changes it so the legacy Bothax/mydll form works too:

- **PC**: the game's registration is redirected to a dispatcher. A URL alone, an HTTP verb in arg 2, or a table in arg 3 runs the game's own function (returns the response); anything else runs BooLua's fire-and-forget version (no return value).
- **Android**: the native registration is skipped and BooLua's binding handles both forms, fire-and-forget (**no return value** - `r.status` from the native examples does not work there).

See [Added functions](/boolua/functions#makerequest).

## RunThread

V1.50 BooLua shipped its own cooperative `RunThread(fn, ...)`. V1.51 has a [native `RunThread`](/api/globals#runthread) (real worker thread, own sandboxed state, listed in the Scripts tab), and BooLua uses that one on both platforms. Differences for old scripts:

- extra arguments after `fn` are **not** forwarded - capture them as upvalues;
- the task gets **copies** of captured `nil`/boolean/number/string values; tables and functions cannot be captured;
- the task survives the caller returning (stop it separately, or with Stop All).

## Standard library and sandbox

Stock V1.51 exposes only base + `math`/`string`/`table` and `os.time` (see [Lua standard library](/lua)). BooLua opens the rest: `io`, `os`, `coroutine`, `utf8`, plus `load`, `loadfile`, `dofile`, `getmetatable`/`setmetatable`, `rawget`/`rawset`/`rawequal`/`rawlen`, `collectgarbage` and `warn`.

They are sandboxed (scriptguard): `os.execute` and `io.popen` are **removed**, `package` and `debug` are not opened, and `io.open`, `io.input`, `io.output`, `io.lines`, `os.remove`, `os.rename`, `loadfile` and `dofile` only reach the executor's own scripts folder. Paths outside it fail.
