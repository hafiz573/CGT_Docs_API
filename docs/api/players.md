# Players

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature - treat them as guidance, not guarantees.

### GetPlayer

```lua
GetPlayer(integer) → table
```

Returns a player by netid as a table, or nil if not present.

<small>Signature reverse-engineered from `0x581938`; variadic (reads a variable number of arguments).</small>

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


### GetPlayers

```lua
GetPlayers(...) → table
```

Returns an array of all players currently in the world.

<small>Signature reverse-engineered from `0x5ad418`; variadic (reads a variable number of arguments).</small>

**Returns** `table`.


### GetPlayerInfo

```lua
GetPlayerInfo() → table
```

Returns account-level info for the local player (gems, inventory size, selected item).

<small>Signature reverse-engineered from `0x581b94`.</small>

**Returns** `table` - see [PlayerInfo](/structs#playerinfo)

| field | type |
|-------|------|
| `gems` | `integer` |
| `size` | `integer` |
| `selected` | `integer` |


### TrackPlayer

```lua
TrackPlayer(integer)
```

Starts/stops tracking a player by netid.

<small>Signature reverse-engineered from `0x5ae61c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |

