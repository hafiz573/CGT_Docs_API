# Examples

Short, **illustrative** snippets built from the recovered signatures. They show *how the API is shaped*,
not verified game behaviour - adapt them to your build.

## Enumerate players

```lua
for _, p in ipairs(GetPlayers()) do
  LogToConsole(p.netid .. ": " .. p.name .. (p.isleft and " (left)" or ""))
end
```

## Read a region of tiles

```lua
local tiles = GetTiles(0, 0, 10, 10)   -- optional bounding box (x1, y1, x2, y2)
for _, t in ipairs(tiles) do
  if t.fg ~= 0 then
    LogToConsole(("tile %d,%d fg=%d"):format(t.x, t.y, t.fg))
  end
end
```

## Item lookup

```lua
local dirt = GetItemInfo(2)          -- by id
local blk  = GetItemInfo("Dirt")     -- or by name (overloaded #1 arg)
LogToConsole(dirt.name .. " rarity=" .. dirt.rarity .. " type=" .. dirt.type)
```

## HTTP request (native V1.50)

```lua
local res = MakeRequest("https://example.com/api", body, 1)
if not res.error then
  LogToConsole("status " .. res.status .. ": " .. res.content)
else
  LogToConsole("request failed: " .. tostring(res.errorMessage))
end
```

::: tip
On mydll-patched builds `MakeRequest` is replaced by the loader's own implementation; the response
table shape may differ.
:::

## A render hook

```lua
AddHook("render", "myoverlay")

local T = GetTypes()   -- input-event constants

function OnRender()
  local cam = GetCamera()
  local s   = GetScreen()
  Begin()
  Text("cam " .. math.floor(cam.x) .. "," .. math.floor(cam.y))
  Line()   -- draw primitives take positional args (see Render & screen)
  Present()
end
```

> `GetTypes()` returns the input-event [enum](/enums#gettypes) (`PointerDown`, `Key`, …).
> Hook/callback wiring (`AddHook`, `Emit`, `Off`) is engine-specific; confirm the callback contract
> in your executor.
