# Examples

Short, **illustrative** snippets. They show *how the API is shaped* (note the namespaces: `Client.*`,
`Render.*`, `Input.*`, ...), not verified game behaviour - adapt them to your build.

## Enumerate players

```lua
for _, p in ipairs(Client.GetPlayers()) do
  LogToConsole(p.netid .. ": " .. p.name .. (p.isleft and " (left)" or ""))
end
```

## Read a region of tiles

```lua
local tiles = Client.GetTiles(0, 0, 10, 10)   -- optional bounding box (x1, y1, x2, y2)
for _, t in ipairs(tiles) do
  if t.fg ~= 0 then
    LogToConsole(("tile %d,%d fg=%d"):format(t.x, t.y, t.fg))
  end
end
```

## Item lookup

```lua
local dirt = GetItemInfo(2)          -- global; by id
local blk  = GetItemInfo("Dirt")     -- or by name (overloaded #1 arg)
LogToConsole(dirt.name .. " rarity=" .. dirt.rarity .. " type=" .. dirt.type)
```

## A render overlay

```lua
Script.On("render", function()        -- Script.* events
  local cam = Client.GetCamera()
  Render.Begin()
  Render.Text("cam " .. math.floor(cam.x) .. "," .. math.floor(cam.y))
  Render.Line()                        -- draw primitives take positional args
  Render.Present()
end)
```

> `Input.GetTypes()` returns the input-event [enum](/enums#gettypes) (`PointerDown`, `Key`, ...).
> Event / timer wiring (`Script.On`, `Script.After`, `Script.Every`, `Script.Off`) is engine-specific;
> confirm the callback contract in your executor.

## HTTP request

Stock V1.50 has a native `MakeRequest` (the game-native form). The
[mydll-patched build](/boolua/functions#makerequest) also accepts the legacy form:

```lua
local r = MakeRequest("https://example.com/api", "POST", {}, body)  -- game-native form (PC: r.status)
MakeRequest("https://example.com/api", body)                        -- legacy form, fire-and-forget
```
