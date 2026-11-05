# Overrides

Native V1.50 functions whose behaviour the **mydll** patch changes.

## GetTile - `extra` field

In the stock build [`GetTile`](/api/world-tiles#gettile) returns `extra = nil`. BooLua replaces that with a **table** carrying harvest progress when available:

```lua
local t = GetTile(x, y)
if t.extra then
  print("progress:", t.extra.progress)  -- number 0.0 .. 1.0
end
```

| field | type | notes |
|-------|------|-------|
| `extra.progress` | `number` | `0.0`-`1.0` harvest progress; `extra` is `nil` when not harvestable |

## MakeRequest

The native [`MakeRequest`](/api/network#makerequest) returns a response table. BooLua registers its own **fire-and-forget** `MakeRequest` (no return value) with two call forms - see [Added functions](/boolua/functions#makerequest). On Android the game re-registers the native one after the loader, so which one wins depends on load order; prefer the form your loader documents.

## io / os sandbox (scriptguard)

BooLua wraps the `io` and `os` libraries so scripts can only touch the executor's own scripts folder. `os.execute` and `io.popen` are **removed**; `io.open`, `io.lines`, `os.remove`, `os.rename` and friends are guarded to that sandbox. Paths outside it fail.
