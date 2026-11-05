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
-- fire-and-forget; no response table is returned
local payload = '{"content":"hello from BooLua"}'
MakeRequest("https://discord.com/api/webhooks/XXX/YYY", payload)   -- legacy form
-- or the game-native form (verb in arg 2):
MakeRequest("https://discord.com/api/webhooks/XXX/YYY", "POST", {}, payload)
```

> Never hard-code a real webhook URL in a shared script.
