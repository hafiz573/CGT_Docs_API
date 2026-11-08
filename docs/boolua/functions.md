# Added functions

Functions the **mydll** loader registers into the script environment, on top of the [native API](/api/globals). Derived from the loader source, so parameter names and semantics are exact.

## _SetFly

```lua
_SetFly(enabled)
```

Enables or disables mod-fly for the local player.

<small>Availability: **PC + Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `enabled` | `boolean` | yes |

## _FlyState

```lua
_FlyState() -> integer
```

Returns the current fly state as an integer `0`/`1` (not boolean - `_FlyState() == 1` works on both platforms).

<small>Availability: **PC + Android**.</small>

**Returns** `integer` - `1` if fly is on, else `0`.

## ChangeValue

```lua
ChangeValue(name, value)
```

PC-compatibility alias: `name` is ignored, the last argument toggles mod-fly on/off (same as `_SetFly`).

<small>Availability: **PC + Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `name` | `string` | yes |
| `value` | `boolean` | yes |

## _SetAntiPortal

```lua
_SetAntiPortal(enabled)
```

Enables or disables anti-portal.

<small>Availability: **PC + Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `enabled` | `boolean` | yes |

## _AntiPortalState

```lua
_AntiPortalState() -> integer
```

Returns the anti-portal state as integer `0`/`1`.

<small>Availability: **PC + Android**.</small>

**Returns** `integer` - `1` if anti-portal is on, else `0`.

## _SetModZoom

```lua
_SetModZoom(enabled)
```

Enables or disables the zoom clamp override (lets the camera zoom past the normal limits).

<small>Availability: **Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `enabled` | `boolean` | yes |

## _ModZoomState

```lua
_ModZoomState() -> boolean
```

Returns whether mod-zoom is enabled.

<small>Availability: **Android**.</small>

**Returns** `boolean` - whether mod-zoom is on.

## _SetGetTileNoLock

```lua
_SetGetTileNoLock(enabled)
```

Toggles no-lock mode for `GetTile` (reads tiles without taking the world mutex - faster, slightly less safe).

<small>Availability: **Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `enabled` | `boolean` | yes |

## _GetTileNoLockState

```lua
_GetTileNoLockState() -> boolean
```

Returns whether `GetTile` no-lock mode is enabled.

<small>Availability: **Android**.</small>

**Returns** `boolean` - whether no-lock is on.

## _SetGameVersion

```lua
_SetGameVersion(version)
```

Overrides the `game_version|` value sent in the login packet (e.g. `4.64`). Persisted to config across restarts.

<small>Availability: **Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `version` | `number` | yes |

## _SetProtocol

```lua
_SetProtocol(protocol)
```

Overrides the `protocol|` value sent in the login packet (e.g. `209`). Persisted to config.

<small>Availability: **Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `protocol` | `integer` | yes |

## _GetGameVersion

```lua
_GetGameVersion() -> number
```

Returns the currently active (possibly overridden) game version.

<small>Availability: **Android**.</small>

**Returns** `number` - active game version.

## _GetProtocol

```lua
_GetProtocol() -> integer
```

Returns the currently active (possibly overridden) protocol number.

<small>Availability: **Android**.</small>

**Returns** `integer` - active protocol.

## _ResetVersion

```lua
_ResetVersion()
```

Restores the client's original version/protocol defaults (`-4.54` / `71`).

<small>Availability: **Android**.</small>

## MakeRequest

```lua
MakeRequest(url, ...)
```

Fire-and-forget HTTP request added by the loader (the stock V1.50 sandbox does **not** expose `MakeRequest`). Two call forms.

<small>Availability: **PC + Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `url` | `string` | yes |
| `...` | `see below` | no |

**Call forms** (an HTTP verb in arg 2, or a table in arg 3, selects the game-native form):

```lua
-- game-native form
MakeRequest(url, method, headers, content, timeout)
-- legacy (Bothax / mydll) form
MakeRequest(url, body [, method [, contentType]])
```

Fire-and-forget: it does **not** return a response table. Headers (arg 3 table) are not parsed; Content-Type defaults to `application/json`.

## RunThread

```lua
RunThread(fn [, ...])
```

Runs `fn` as a **background coroutine**, Bothax-style: the callback runs alongside the main script, and `Sleep(ms)` works **inside** it without blocking the rest of your script. Extra arguments are forwarded to `fn`.

<small>Availability: **PC + Android**.</small>

**Parameters**

| name | type | required |
|------|------|----------|
| `fn` | `function` | yes |
| `...` | `any` | no (forwarded to `fn`, up to 15) |

```lua
RunThread(function(label)
  for i = 1, 5 do
    MakeRequest(WEBHOOK, '{"content":"'..label..' '..i..'"}')
    Sleep(1000)                 -- yields this background thread only
  end
end, "tick")

-- the main script keeps running; its own Sleep is what drives the background thread
for i = 1, 20 do Sleep(500) end
```

**How it works.** The callback runs as a Lua coroutine of your script's own state, driven cooperatively from the loader's `Sleep` hook. It is **not** an OS thread — nothing runs in true parallel, so there are no data races with the game.

**Good to know (current limits):**

- The background thread only advances while your **main script calls `Sleep`**. Give the main script a loop with `Sleep` in it (a tight loop with no `Sleep` starves the background thread).
- When the **host script ends, its background threads stop** — keep the host alive (e.g. a `while`/`for` loop) for as long as the background work should run.
- Call `RunThread` from the **top level** of your script, not from inside another `RunThread` callback (nested threads are not driven yet).
- At most **15 extra arguments** are forwarded.
- Falls back to a no-op if the loader can't resolve the required Lua internals for your client build (it never crashes the game).

See also: [Background loop example](/boolua/examples#background-loop-runthread).

## PC-only RE / debug helpers

Registered by the **PC `mydll.dll`** only. These are reverse-engineering / debugging tools (they write CSV / log files); not part of normal scripting. <small>Availability: **PC**.</small>

### _DumpObjects

```lua
_DumpObjects()
```

Logs the object-manager struct layout (sizes/offsets) to the mydll log. RE diagnostic.

### _ScanObjects

```lua
_ScanObjects([item_id])
```

Scans all world objects to a CSV; optional `item_id` filters to matching entries.

| name | type | required |
|------|------|----------|
| `item_id` | `integer` | no |

Returns `integer` (rows written).

### _ScanDrops

```lua
_ScanDrops([item_id])
```

Scans dropped items to a CSV; optional `item_id` filter (checks both id fields).

| name | type | required |
|------|------|----------|
| `item_id` | `integer` | no |

Returns `integer` (rows written).

### _ScanCandidates

```lua
_ScanCandidates(offset [, max_dump])
```

RE helper: dumps the first N (`max_dump`, default 5) Object entries at a candidate vector offset.

| name | type | required |
|------|------|----------|
| `offset` | `integer` | yes |
| `max_dump` | `integer` | no |

### _ScanTiles

```lua
_ScanTiles(fg_id [, mode])
```

Bulk tile scan via direct memory to a CSV. `mode`: `fg` / `bg` / `both` (default `both`).

| name | type | required |
|------|------|----------|
| `fg_id` | `integer` | yes |
| `mode` | `string` | no |

Returns `integer` (matches).

### _FindFloat

```lua
_FindFloat(value [, tolerance])
```

Scans process memory for float values near `value` (default tolerance `0.001`); writes candidates to a CSV.

| name | type | required |
|------|------|----------|
| `value` | `number` | yes |
| `tolerance` | `number` | no |

Returns `integer` (candidates found).

### _RefineFloat

```lua
_RefineFloat(newval [, tol])
```

Re-checks the previous `_FindFloat` candidates against `newval` (default tol `0.01`) to narrow them down.

| name | type | required |
|------|------|----------|
| `newval` | `number` | yes |
| `tol` | `number` | no |

Returns `integer` (remaining).
