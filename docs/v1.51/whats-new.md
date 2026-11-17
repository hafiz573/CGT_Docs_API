# What's new in V1.51

Changes to the Lua API since **V1.50**, from diffing the API reference embedded in both binaries. The V1.50 docs stay available under [V1.50](/v1.50/).

## Added (2)

- `RunThread(functionOrSource [, name])` - Start another Lua task on its own worker thread without stalling the current script or gameplay.
- `FlyPath(tileX, tileY [, speed=160])` - Fly along a clear route through open space, without walking or jump animations.

## Changed (3)

### CheckPath

**description**

- V1.50: Ask A* whether an open path exists from the local player's tile.
- V1.51: Check whether the avatar can walk and jump to a standing position near the target.

**notes**

- V1.50: Does not move the avatar. Requires avatar/map and in-bounds coordinates.
- V1.51: Does not move the avatar. Requires avatar/map and in-bounds coordinates. Avoids hazardous tiles.

### FindPath

**description**

- V1.50: Queue the client's OnFindPath movement operation.
- V1.51: Walk and jump toward a reachable standing position near the target.

**params**

- V1.50: tileX,tileY: integer tile target. milliseconds: nonnegative integer step delay, default 5.
- V1.51: tileX,tileY: integer tile target. milliseconds: accepted for compatibility but currently unused.

**notes**

- V1.50: Unlike WalkTo, uses tiles. Requires a loaded world. CheckPath can be used first.
- V1.51: Replans if movement stalls. Requires a loaded world. CheckPath can be used first.

**example**

```lua
-- V1.50
if CheckPath(10, 20) then FindPath(10, 20, 20) end
-- V1.51
if CheckPath(10, 20) then FindPath(10, 20) end
```

### EditToggle

**category**

- V1.50: Scripts and hooks
- V1.51: Client

**signature**

- V1.50: EditToggle(cheatName, enabled)
- V1.51: EditToggle(toggleName, enabled)

**description**

- V1.50: Reserved developer-toggle binding.
- V1.51: Set an allowed Developer Menu > Misc checkbox.

**params**

- V1.50: At least two arguments; intended string name and boolean enabled.
- V1.51: toggleName: exact, case-sensitive label: Tile Prediction, Ghost Fly, Enable Frame Counter, VSync (native Windows only), or Indexed sprite rendering. enabled: boolean true or false; exactly two arguments.

**returns**

- V1.50: No values.
- V1.51: Boolean: true if the change was queued; false for unknown, unavailable or forbidden toggles. Invalid argument types raise a Lua error.

**notes**

- V1.50: Currently a stub: no action and no type validation beyond argument count.
- V1.51: Applied on the next game update, even if the script has finished or the menu is closed. Thread safe; repeated writes before an update use the latest value per checkbox. Changes are session-wide and are not automatically restored when the script stops. Disable Credential Protection is deliberately unsupported for either value; no security confirmation can be bypassed.

**example**

```lua
-- V1.50
EditToggle("example", true) -- currently does nothing
-- V1.51
assert(EditToggle('Ghost Fly', true))
assert(EditToggle('Tile Prediction', false))
-- EditToggle('Ghost Fly', false) -- turn it off
-- EditToggle('Disable Credential Protection', true) returns false
```

## Removed (0)

- None
