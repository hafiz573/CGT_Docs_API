# BooLua examples

Practical snippets for the **mydll-patched** build, using the [added functions](/boolua/functions) and [overrides](/boolua/overrides). They combine the native API with BooLua extras.

::: warning
These use loader-specific functions; behaviour depends on your mydll version. State functions return integer `0`/`1`, so compare with `== 1`.
:::

## Toggle fly

```lua
-- flip fly, then confirm via the state function
local on = _FlyState() == 1
_SetFly(not on)
LogToConsole("fly is now " .. (_FlyState() == 1 and "ON" or "OFF"))

-- PC-compatible alias (name ignored, last arg = on/off):
ChangeValue("[C] Modfly", true)
```

## Anti-portal + mod-zoom

```lua
_SetAntiPortal(true)
if _AntiPortalState() == 1 then LogToConsole("anti-portal on") end

_SetModZoom(true)        -- Android: lets the camera zoom past the normal limit
LogToConsole("mod-zoom: " .. tostring(_ModZoomState()))
```

## Version / protocol bypass

```lua
-- spoof the login version/protocol, then reconnect for it to take effect
_SetGameVersion(4.64)
_SetProtocol(209)
LogToConsole(("now sending v%s proto %d"):format(_GetGameVersion(), _GetProtocol()))

-- later, restore the real client defaults:
_ResetVersion()
```

## Fast tile scan (no-lock)

```lua
-- Android: read tiles without taking the world mutex (faster for bulk scans)
_SetGetTileNoLock(true)
for y = 0, 59 do
  for x = 0, 99 do
    local t = GetTile(x, y)
    if t and t.fg ~= 0 then --[[ ... ]] end
  end
end
_SetGetTileNoLock(false)   -- turn it back off when done
```

## Harvest-ready check (GetTile.extra.progress)

```lua
-- BooLua adds extra.progress (0.0 .. 1.0) to GetTile; nil when not harvestable
local t = GetTile(x, y)
if t and t.extra and t.extra.progress and t.extra.progress >= 1.0 then
  LogToConsole(("tile %d,%d is ready to harvest"):format(x, y))
end
```

## Send to a Discord webhook

```lua
-- legacy form: fire-and-forget, no response table
local payload = '{"content":"hello from BooLua"}'
MakeRequest("https://discord.com/api/webhooks/XXX/YYY", payload)   -- legacy form
-- game-native form (verb in arg 2): returns the response on PC, nothing on Android
MakeRequest("https://discord.com/api/webhooks/XXX/YYY", "POST", {["Content-Type"] = "application/json"}, payload)
```

> Never hard-code a real webhook URL in a shared script.

## Background loop (RunThread)

```lua
-- run a task in the background; Sleep works inside it without freezing the script
local WEBHOOK = "https://discord.com/api/webhooks/XXX/YYY"

RunThread(function()
  for i = 1, 5 do
    MakeRequest(WEBHOOK, ('{"content":"bg tick %d"}'):format(i))
    Sleep(1000)                 -- yields only this background thread
  end
end)

-- the main script keeps going; its Sleep is what ticks the background thread
for i = 1, 20 do
  -- ... main logic ...
  Sleep(500)
end
```

::: tip
The background thread advances while the **main script calls `Sleep`**, and stops when the host script ends — so keep a `Sleep`-driven loop alive for as long as the background work should run. Call `RunThread` from the top level, not from inside another `RunThread` callback. See the [`RunThread` reference](/boolua/functions#runthread) for the full contract.
:::

## Run an encrypted script (load)

Stock CGT has no `load`, so a script cannot decrypt and run itself. BooLua [opens `load`](/boolua/overrides#standard-library-and-sandbox), which accepts source text and Lua 5.4 bytecode.

```lua
-- XOR + hex wrapper: decrypt the payload, then run it with load
local KEY = "mykey"
local function xor(s)
  local o = {}
  for i = 1, #s do o[i] = string.char(s:byte(i) ~ KEY:byte((i - 1) % #KEY + 1)) end
  return table.concat(o)
end

-- encrypt once and copy the printed hex into ENC:
-- LogToConsole((xor([[LogToConsole("hello")]]):gsub(".", function(c) return ("%02x"):format(c:byte()) end)))

local ENC = "..."
local src = xor((ENC:gsub("..", function(h) return string.char(tonumber(h, 16)) end)))
local fn, err = load(src, "=encrypted", "t")
assert(fn, err)
fn()
```

- Obfuscated scripts written for Lua 5.1 that call `loadstring` work after `loadstring = load` at the top. Ones that need `getfenv`/`setfenv` do not run (Lua 5.4 has neither).
- Bytecode: build it inside CGT with `string.dump(fn, true)` and run it with `load(bytes)`. `luac` output from another Lua build may be rejected.
- Files encrypted in a format that only one executor can decrypt (for example Bothax) do not run in CGT.

::: danger
You cannot read an encrypted script before it runs, and it can call `MakeRequest` with your account data. Only run encrypted scripts from people you trust. The encryption only hides the code: anyone who runs the script can replace `load` with their own version and print the decrypted source.
:::
