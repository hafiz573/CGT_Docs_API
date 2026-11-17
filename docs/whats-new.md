# What's new in V1.52

Changes to the Lua API since **V1.51**, from diffing the API reference embedded in both binaries. The V1.51 docs stay available under [V1.51](/v1.51/).

## Added (10)

- `Render.Submit(shapes [, layer='overlay' [, sampleTimeMS [, viewGeneration]]])` - Atomically replace this script's drawings with one validated batch and one publication lock.
- `Client.GetView()` - Read the latest camera/world viewport snapshot without acquiring the game lock.
- `Client.GetCollisionMap()` - Read a compact tile collision snapshot for custom Lua simulation.
- `Client.SetRain(settings={})` - Configure script-owned native rain, simulated and batched every rendered world frame.
- `Client.Lightning(settings={})` - Trigger native branching lightning with an optional flash and delayed thunder.
- `Client.StopRain()` - Remove this script's native rain, splashes, lightning and pending thunder.
- `UI.BeginTabBar(id, properties={})` - Declares a retained tab bar and opens its declaration scope.
- `UI.EndTabBar()` - Closes a retained tab-bar declaration scope.
- `UI.BeginTabItem(id, properties={})` - Declares a retained tab and opens its content scope.
- `UI.EndTabItem()` - Closes a retained tab-content declaration scope.

## Changed (6)

### GetTile

**returns**

- V1.51: Table: fg, bg, collidable, x, y, coltype, locktile, flags. extra is nil, so that key is absent.
- V1.52: Table: fg, bg, collidable, x, y, coltype, locktile, flags, extra. extra is nil without native tile-extra data; otherwise it is a copied TileExtra table.

**notes**

- V1.51: Raises an error outside a world or out of bounds. Tile extra data is not exposed. Editing the result does not edit the map.
- V1.52: Raises an error outside a world or out of bounds. extra common fields: type (native enum), flags (native type-specific byte), name, text, id (strings), data (raw type-specific integer). Trees/providers: growth, growtime, remaining (seconds), ready, harvestable. Readiness means maturity, not permission to harvest; providers require growth > growtime as in the client. Trees also have seedid, itemid (fruit ID), fruitcount. Locks/VIP doors: owner, access (1-based user IDs), flags (lock flags byte). Vending: itemid, price (positive=WL/item, negative=items/WL). Display blocks/mannequins/art/storage/freezers: itemid; battle cages: itemid; item suckers with loaded extended data: itemid, count, sucking. Other type-specific fields can be absent. Editing a snapshot never edits the map; read it again for fresh growth/state. Client.GetTiles remains the lightweight bulk API without extras.

**example**

```lua
-- V1.51
local p = GetLocal().pos
local tile = GetTile(math.floor(p.x / 32), math.floor(p.y / 32))
Log("FG=" .. tile.fg .. " BG=" .. tile.bg)
-- V1.52
local tile = GetTile(10, 20)
local extra = tile.extra
if extra and extra.type == 4 then
  Log(string.format("Fruit ID %d, count %d, ready=%s, seconds left=%d", extra.itemid, extra.fruitcount, tostring(extra.ready), extra.remaining))
end
```

### UI.Create

**params**

- V1.51: Kind: window, text, button, checkbox, slider, input, combo, progress, separator, sameline. ID string and property table.
- V1.52: Kind: window, text, button, checkbox, slider, input, combo, progress, separator, sameline, tabbar, tabitem. ID string and property table.

**notes**

- V1.51: Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script. Up to 256 controls. Windows require no parent; other controls need a window parent.
- V1.52: Properties are strings, finite numbers or booleans. Common: parent, text, visible, enabled, width, height, value. IDs are scoped to this script. Up to 256 controls. Tabs require a tab-bar parent; tab bars require a window/tab-item parent. Ordinary controls use a window/tab-item parent, inferred inside BeginTabItem scopes. UI is declared once and rendered each frame; Lua workers never call ImGui directly.

### UI.Remove

**description**

- V1.51: Removes a control and its direct children.
- V1.52: Removes a control and all its descendants.

**notes**

- V1.51: Removing a window removes all its controls.
- V1.52: Removing a window/tab bar also removes its nested tabs and their child controls.

### UI.Clear

**notes**

- V1.51: Does not remove other scripts' windows or native dialogs.
- V1.52: Also resets this script's tab declaration scopes. Does not remove other scripts' windows or native dialogs.

### Client.PlaySound

**description**

- V1.51: Plays a local game sound.
- V1.52: Plays a local game sound using the normal cache/bundled asset resolver.

**notes**

- V1.51: Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Missing assets follow the engine's normal error handling.
- V1.52: Queued for the game thread; true means accepted, not completed. Keep the script alive until its command is processed. OnClientCommand('sound', originalPath, success) reports whether the backend started playback (1 or 0). Honors the game's sound setting; missing assets, muted audio or a failed backend can report 0. Does not download missing sounds or loop playback.

**example**

```lua
-- V1.51
Client.PlaySound('audio/dialog_open.wav')
-- V1.52
Client.PlaySound('audio/dialog_open.wav')
Sleep(-1)
```

### OnUI

**params**

- V1.51: Control ID, event (click/change/close), edited value (string or number; boolean is 0/1).
- V1.52: Control ID, event (click/change/close/select), edited value (string or number; boolean is 0/1). Tab activation uses select with value=1.

## Removed (0)

- None
