# Getting started

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

## Getting started

*Lua 5.4 / Developer Menu > Executor*

Open or create a .lua script in Executor and press Run/Execute. Saved scripts live in the application cache scripts/ directory. Each run has its own state and worker thread.

Positions use world pixels; one tile is 32 pixels. GetTile, CheckPath, FindPath and FlyPath instead take tile coordinates.

Getters return snapshots. Editing a returned table does not change the game.

Requires a build without DEV_MENU_DISABLED. No require, io, load, dofile, debug or public coroutine library is exposed. Examples on this page are copied, never executed automatically.

```lua
local me = GetLocal()
if me.netid ~= -1 then
    LogToConsole("Hello, " .. me.name)
    local tile = GetTile(math.floor(me.pos.x / 32), math.floor(me.pos.y / 32))
    Log("Foreground: " .. tile.fg)
end
```

## Persistent scripts

*AddHook(...) then Sleep(-1)*

A script ends when its main chunk returns. Keep hook scripts alive using Sleep(-1), which continues servicing callbacks. Stop them through the script manager.

Callbacks should be short. Do not sleep inside drawing or packet callbacks; the main thread is waiting for their result.

A true boolean from a packet/variant callback suppresses the engine operation. False or nil allows it.

Dispatch has a shared approximately 20 ms wait budget. Expired queued callbacks are skipped. Running callbacks have an instruction-time budget. Use UI.Window for persistent controls and Render calls for custom overlays. Never hold lock() across Sleep.

```lua
AddHook("OnVariant", "console", function(v)
    if v[0] == "OnConsoleMessage" then Log(v[1]) end
    return false
end)
Sleep(-1)
```

## Table conventions

*Lists, variants and packets*

Inventory/item lists start at 1. Variant lists and their vector components start at 0. Player positions have named x and y fields.

Variant: [0]=event name, [1] onward=arguments. Variant vector: [0]=x, [1]=y, optionally [2]=z.

Packet fields: type, dropped, netid, snetid, state, value, x, y, xspeed, yspeed, px, py, padding1, padding2, padding4, extrasize.

In packet hooks dropped currently means packetFlags, and state is always 0. Extended bytes are not exposed. Editing a callback table does not rewrite the packet.

```lua
AddHook("OnVariant", "inspect", function(v)
    Log("Event: " .. tostring(v[0]))
    return false
end)
Sleep(-1)
```

## Unregistered helpers

*GetObjectList / yield / coroutine*

These C++ helpers/reserved names are not exposed in the current Lua environment.

GetObjectList: available through Client.GetObjects, not as a global. Coroutine sleep/yield and LuaManager scheduling are not public script APIs.

Calling these names fails because they are nil.

Use GetWorld/GetTile for world data, and Sleep with AddHook for persistent scripts. Use Client.GetObjects for object snapshots and MakeRequest for HTTP requests.

```lua
Log("Public world API: " .. GetWorld().name)
-- GetObjectList() is not available in the current binding.
```
