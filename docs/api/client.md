# Client

*Client-side world, player and view queries.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Client.<method>`. 15 methods.

## Client.EmitParticle {#emitparticle}

```lua
Client.EmitParticle(string, number, number)
```

Emits a particle effect (name, x, y).

<small>Signature reverse-engineered from `0x5aa6b8`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `number` | yes |
| 3 | `number` | yes |


## Client.GetCamera {#getcamera}

```lua
Client.GetCamera() -> table
```

Returns the camera {x, y, scaleX, scaleY, netid}.

<small>Signature reverse-engineered from `0x5ae4ec`.</small>

**Returns** `table` - see [Camera](/structs#camera)

| field | type |
|-------|------|
| `x` | `number` |
| `y` | `number` |
| `scaleX` | `number` |
| `scaleY` | `number` |
| `netid` | `integer` |


## Client.GetLocalState {#getlocalstate}

```lua
Client.GetLocalState() -> table
```

Returns the local player's physics/movement state (velocity, gravity, drag, facing, on-ground).

<small>Signature reverse-engineered from `0x5ad920`.</small>

**Returns** `table` - see [LocalState](/structs#localstate)

| field | type |
|-------|------|
| `velocityX` | `number` |
| `velocityY` | `number` |
| `gravity` | `number` |
| `drag` | `number` |
| `acceleration` | `number` |
| `facesLeft` | `boolean` |
| `invisible` | `boolean` |
| `onGround` | `boolean` |
| `name` | `string` |


## Client.GetObjects {#getobjects}

```lua
Client.GetObjects() -> table
```

Returns dropped / world objects as an array ({id, x, y, amount, flags, oid}).

<small>Signature reverse-engineered from `0x584f70`.</small>

**Returns** `table` - see [Object](/structs#object)

| field | type |
|-------|------|
| `id` | `integer` |
| `x` | `number` |
| `y` | `number` |
| `amount` | `integer` |
| `flags` | `integer` |
| `oid` | `integer` |


## Client.GetPlayers {#getplayers}

```lua
Client.GetPlayers(...) -> table
```

Returns an array of all players currently in the world.

<small>Signature reverse-engineered from `0x5ad418`; variadic.</small>

**Returns** `table`.


## Client.GetScreen {#getscreen}

```lua
Client.GetScreen() -> table
```

Returns the screen size {width, height}.

<small>Signature reverse-engineered from `0x5ad374`.</small>

**Returns** `table` - see [Screen](/structs#screen)

| field | type |
|-------|------|
| `width` | `number` |
| `height` | `number` |


## Client.GetSettings {#getsettings}

```lua
Client.GetSettings() -> table
```

Returns game settings {musicVolume, frameCounter}.

<small>Signature reverse-engineered from `0x5adfb8`.</small>

**Returns** `table` - see [Settings](/structs#settings)

| field | type |
|-------|------|
| `musicVolume` | `number` |
| `frameCounter` | `boolean` |


## Client.GetTiles {#gettiles}

```lua
Client.GetTiles(integer?, integer?, integer?, integer?) -> table
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

**Returns** `table` - see [TileShort](/structs#tileshort)

| field | type |
|-------|------|
| `x` | `integer` |
| `y` | `integer` |
| `fg` | `integer` |
| `bg` | `integer` |
| `flags` | `integer` |


## Client.PlaySound {#playsound}

```lua
Client.PlaySound(string)
```

Plays a sound by name/path.

<small>Signature reverse-engineered from `0x5ae7e4`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## Client.ScreenToWorld {#screentoworld}

```lua
Client.ScreenToWorld(number, number)
```

Converts screen coordinates (x, y) to world coordinates.

<small>Signature reverse-engineered from `0x5b52f0`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |


## Client.SetLocalState {#setlocalstate}

```lua
Client.SetLocalState()
```

Writes fields back onto the local player's physics/movement state.

<small>Signature reverse-engineered from `0x5adae8`.</small>


## Client.SetSetting {#setsetting}

```lua
Client.SetSetting(string, number | boolean)
```

Sets a setting by name to a value.

<small>Signature reverse-engineered from `0x5ae104`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `number \| boolean` | yes |


## Client.ShowDialog {#showdialog}

```lua
Client.ShowDialog(string)
```

Shows a game dialog from a dialog string.

<small>Signature reverse-engineered from `0x5ae978`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## Client.TrackPlayer {#trackplayer}

```lua
Client.TrackPlayer(integer)
```

Starts/stops tracking a player by netid.

<small>Signature reverse-engineered from `0x5ae61c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


## Client.WorldToScreen {#worldtoscreen}

```lua
Client.WorldToScreen(number, number)
```

Converts world coordinates (x, y) to screen coordinates.

<small>Signature reverse-engineered from `0x5b52f0`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |

