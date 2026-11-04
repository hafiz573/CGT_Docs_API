# Local player

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### GetLocal

```lua
GetLocal() → table
```

Returns the local player as a table (position, name, netid, flags).

<small>Signature reverse-engineered from `0x581d8c`.</small>

**Returns** `table` — see [Player](/structs#player)

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


### GetLocalState

```lua
GetLocalState() → table
```

Returns the local player's physics/movement state (velocity, gravity, drag, facing, on-ground).

<small>Signature reverse-engineered from `0x5ad920`.</small>

**Returns** `table` — see [LocalState](/structs#localstate)

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


### SetLocalState

```lua
SetLocalState()
```

Writes fields back onto the local player's physics/movement state.

<small>Signature reverse-engineered from `0x5adae8`.</small>


### SetLocalPos

```lua
SetLocalPos(integer, integer)
```

Teleports the local player to a tile position (x, y).

<small>Signature reverse-engineered from `0x582ee8`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `integer` | yes |


### KillMe

```lua
KillMe()
```

Kills the local player (respawn).

<small>Signature reverse-engineered from `0x5812f0`.</small>

