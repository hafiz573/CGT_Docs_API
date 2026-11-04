# World & tiles

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### GetWorld

```lua
GetWorld() → table
```

Returns the current world as a table (name, size, tile/object counts).

<small>Signature reverse-engineered from `0x5851ac`.</small>

**Returns** `table` — see [World](/structs#world)

| field | type |
|-------|------|
| `name` | `string` |
| `width` | `integer` |
| `height` | `integer` |
| `tilecount` | `integer` |
| `objectcount` | `integer` |
| `lastoid` | `integer` |


### GetTile

```lua
GetTile(integer, integer) → table
```

Returns the tile at (x, y) as a table (foreground, background, collision, flags).

<small>Signature reverse-engineered from `0x584134`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |

**Returns** `table` — see [Tile](/structs#tile)

| field | type |
|-------|------|
| `fg` | `integer` |
| `bg` | `integer` |
| `collidable` | `boolean` |
| `x` | `integer` |
| `y` | `integer` |
| `coltype` | `integer` |
| `locktile` | `integer` |
| `flags` | `integer` |
| `extra` | `any` |


### GetTiles

```lua
GetTiles(integer?, integer?, integer?, integer?) → table
```

Returns an array of tiles, optionally within a bounding box (x1, y1, x2, y2).

<small>Signature reverse-engineered from `0x5ad664`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | no |
| 2 | `integer` | no |
| 3 | `integer` | no |
| 4 | `integer` | no |

**Returns** `table` — see [TileShort](/structs#tileshort)

| field | type |
|-------|------|
| `x` | `integer` |
| `y` | `integer` |
| `fg` | `integer` |
| `bg` | `integer` |
| `flags` | `integer` |


### EditToggle

```lua
EditToggle(...)
```

Punches/places on a tile (wrench/edit action).

<small>Signature reverse-engineered from `0x582f9c`; variadic (reads a variable number of arguments).</small>


### SetItemSelected

```lua
SetItemSelected(integer)
```

Selects the inventory item by id for placing.

<small>Signature reverse-engineered from `0x58365c`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


### CheckPath

```lua
CheckPath(integer, integer)
```

Returns whether a path to (x, y) is walkable.

<small>Signature reverse-engineered from `0x5831f0`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |


### FindPath

```lua
FindPath(integer, integer, integer)
```

Computes a path to (x, y); returns the route.

<small>Signature reverse-engineered from `0x583394`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |
| 3 | `integer` | yes |


### WalkTo

```lua
WalkTo(number, number, integer)
```

Walks the local player toward (x, y).

<small>Signature reverse-engineered from `0x582fe0`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |
| 3 | `integer` | yes |

