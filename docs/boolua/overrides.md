# Overrides

Native V1.50 behaviour the **mydll** patch changes.

## GetTile - `extra` field

In the stock build [`GetTile`](/api/globals#gettile) returns `extra = nil`. BooLua replaces that with a **table** carrying harvest progress when available:

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

The stock V1.50 sandbox does not expose `MakeRequest` at all (it is absent from the `_G` dump). BooLua adds a **fire-and-forget** `MakeRequest` with two call forms - see [Added functions](/boolua/functions#makerequest).

## io / os sandbox (scriptguard)

BooLua wraps `io` and `os` so scripts can only touch the executor's own scripts folder. `os.execute` and `io.popen` are **removed**; `io.open`, `io.lines`, `os.remove`, `os.rename` and friends are guarded to that sandbox. Paths outside it fail.
