# Global functions

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

The 26 functions registered directly in the script global table (not under a namespace).

## AddHook {#addhook}

```lua
AddHook(string, string)
```

Registers a named hook / callback.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


## CheckPath {#checkpath}

```lua
CheckPath(integer, integer) -> boolean
```

Returns whether a path to (x, y) is walkable.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |

**Returns** `boolean`.


## EditToggle {#edittoggle}

```lua
EditToggle(...)
```

Punches / places on a tile (wrench/edit action).

<small>Variadic (reads a variable number of arguments).</small>


## FindPath {#findpath}

```lua
FindPath(integer, integer, integer)
```

Computes a path to (x, y); returns the route.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |
| 3 | `integer` | yes |


## GetInventory {#getinventory}

```lua
GetInventory() -> table
```

Returns the local inventory as an array of {id, amount, flags}.

**Returns** `table` - see [InventoryItem](/structs#inventoryitem)

| field | type |
|-------|------|
| `id` | `integer` |
| `amount` | `integer` |
| `flags` | `integer` |


## GetItemInfo {#getiteminfo}

```lua
GetItemInfo(integer | string) -> table
```

Returns item metadata by id or name (rarity, type, texture, flags).

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer \| string` | yes |

**Returns** `table` - see [ItemInfo](/structs#iteminfo)

| field | type |
|-------|------|
| `id` | `integer` |
| `name` | `string` |
| `filename` | `string` |
| `rarity` | `integer` |
| `breakhit` | `integer` |
| `growtime` | `integer` |
| `type` | `integer` |
| `coltype` | `integer` |
| `clothingtype` | `integer` |
| `visualstyle` | `integer` |
| `texturex` | `integer` |
| `texturey` | `integer` |
| `flags` | `integer` |


## GetItemInfoList {#getiteminfolist}

```lua
GetItemInfoList(...) -> table
```

Returns metadata for a list/range of items.

<small>Variadic (reads a variable number of arguments).</small>

**Returns** `table` - see [ItemInfo](/structs#iteminfo)

| field | type |
|-------|------|
| `id` | `integer` |
| `name` | `string` |
| `filename` | `string` |
| `rarity` | `integer` |
| `breakhit` | `integer` |
| `growtime` | `integer` |
| `type` | `integer` |
| `coltype` | `integer` |
| `clothingtype` | `integer` |
| `visualstyle` | `integer` |
| `texturex` | `integer` |
| `texturey` | `integer` |
| `flags` | `integer` |


## GetLocal {#getlocal}

```lua
GetLocal() -> table
```

Returns the local player as a table (position, name, netid, flags).

**Returns** `table` - see [Player](/structs#player)

| field | type |
|-------|------|
| `pos` | table `{x, y}` |
| `posX` | `number` |
| `posY` | `number` |
| `name` | `string` |
| `isleft` | `boolean` |
| `netid` | `integer` |
| `netID` | `integer` |
| `userid` | `integer` |
| `userID` | `integer` |
| `country` | `string` |
| `invisible` | `boolean` |
| `mstate` | `boolean` |
| `smstate` | `boolean` |


## GetPlayer {#getplayer}

```lua
GetPlayer(integer) -> table
```

Returns a player by netid as a table, or nil if not present.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |

**Returns** `table` - see [Player](/structs#player)

| field | type |
|-------|------|
| `pos` | table `{x, y}` |
| `name` | `string` |
| `isleft` | `boolean` |
| `netid` | `integer` |
| `userid` | `integer` |
| `country` | `string` |
| `invisible` | `boolean` |
| `mstate` | `boolean` |
| `smstate` | `boolean` |


## GetPlayerInfo {#getplayerinfo}

```lua
GetPlayerInfo() -> table
```

Returns account-level info for the local player (gems, inventory size, selected item).

**Returns** `table` - see [PlayerInfo](/structs#playerinfo)

| field | type |
|-------|------|
| `gems` | `integer` |
| `size` | `integer` |
| `selected` | `integer` |


## GetTile {#gettile}

```lua
GetTile(integer, integer) -> table
```

Returns the tile at (x, y) as a table (foreground, background, collision, flags).

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |

**Returns** `table` - see [Tile](/structs#tile)

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


## GetWorld {#getworld}

```lua
GetWorld() -> table
```

Returns the current world as a table (name, size, tile/object counts).

**Returns** `table` - see [World](/structs#world)

| field | type |
|-------|------|
| `name` | `string` |
| `width` | `integer` |
| `height` | `integer` |
| `tilecount` | `integer` |
| `objectcount` | `integer` |
| `lastoid` | `integer` |


## HashString {#hashstring}

```lua
HashString(string) -> integer
```

Returns a hash of the given string.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

**Returns** `integer`.


## KillMe {#killme}

```lua
KillMe()
```

Kills the local player (respawn).


## Log {#log}

```lua
Log(string)
```

Logs a message to the executor log.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## LogMsg {#logmsg}

```lua
LogMsg(string)
```

Logs a message (string).

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## LogToConsole {#logtoconsole}

```lua
LogToConsole(string)
```

Writes a message to the game console.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## SendPacket {#sendpacket}

```lua
SendPacket(integer, string)
```

Sends a game message packet (type, text).

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `string` | yes |


## SendPacketRaw {#sendpacketraw}

```lua
SendPacketRaw(boolean | integer)
```

Sends a raw packet by type with a binary/struct payload.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `boolean \| integer` | yes |


## SendVariant {#sendvariant}

```lua
SendVariant(...)
```

Sends a VariantList to the server (net variant call).

<small>Variadic (reads a variable number of arguments).</small>


## SendVariantList {#sendvariantlist}

```lua
SendVariantList(...)
```

Sends a VariantList to the server (alias of SendVariant in this build).

<small>Variadic (reads a variable number of arguments).</small>


## SetFPSLimit {#setfpslimit}

```lua
SetFPSLimit(integer)
```

Sets the render FPS limit.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


## SetItemSelected {#setitemselected}

```lua
SetItemSelected(integer)
```

Selects the inventory item by id for placing.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


## SetLocalPos {#setlocalpos}

```lua
SetLocalPos(integer, integer)
```

Teleports the local player to a tile position (x, y).

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |


## Sleep {#sleep}

```lua
Sleep(integer)
```

Suspends the script for the given milliseconds.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


## WalkTo {#walkto}

```lua
WalkTo(number, number, integer)
```

Walks the local player toward (x, y).

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |
| 3 | `integer` | yes |

