# Overrides

Native V1.50 behaviour the **mydll** patch changes.

## GetTile - `extra` field

In the stock build [`GetTile`](/v1.50/api/globals#gettile) returns `extra = nil`. BooLua replaces that with a **table** carrying harvest progress when available:

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

Stock V1.50 registers a **native** `MakeRequest(url, method, headers, content, timeout)` in the script environment (PC and Android); on PC it returns a response table (`status`, `error`, ...). It is not in the 108-name `_G` fingerprint because the API test lists it with the BooLua bindings. BooLua changes it so the legacy Bothax/mydll form works too:

- **PC**: the game's registration is redirected to a dispatcher. An HTTP verb in arg 2, or a table in arg 3, runs the game's own native function (returns the response); anything else runs BooLua's fire-and-forget version (no return value).
- **Android**: the native registration is skipped and BooLua's binding handles both forms, fire-and-forget (no return value).

See [Added functions](/v1.50/boolua/functions#makerequest).

## io / os sandbox (scriptguard)

BooLua wraps `io` and `os` so scripts can only touch the executor's own scripts folder. `os.execute` and `io.popen` are **removed**; `io.open`, `io.lines`, `os.remove`, `os.rename` and friends are guarded to that sandbox. Paths outside it fail.
