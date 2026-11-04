# Items & inventory

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### GetInventory

```lua
GetInventory() → table
```

Returns the local inventory as an array of {id, amount, flags}.

<small>Signature reverse-engineered from `0x585380`.</small>

**Returns** `table` — see [InventoryItem](/structs#inventoryitem)

| field | type |
|-------|------|
| `id` | `integer` |
| `amount` | `integer` |
| `flags` | `integer` |


### GetItemInfo

```lua
GetItemInfo(integer | string) → table
```

Returns item metadata by id or name (rarity, type, texture, flags).

<small>Signature reverse-engineered from `0x5855c8`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer \| string` | yes |

**Returns** `table` — see [ItemInfo](/structs#iteminfo)

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


### GetItemInfoList

```lua
GetItemInfoList(...) → table
```

Returns metadata for a list/range of items.

<small>Signature reverse-engineered from `0x585af0`; variadic (reads a variable number of arguments).</small>

**Returns** `table` — see [ItemInfo](/structs#iteminfo)

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


### GetTypes

```lua
GetTypes() → table
```

Returns the input-event type constants (enum).

<small>Signature reverse-engineered from `0x5aa5cc`.</small>

**Returns** `table`

| field | type |
|-------|------|
| `PointerDown` | `integer` |
| `PointerUp` | `integer` |
| `PointerDrag` | `integer` |
| `PointerMove` | `integer` |
| `Character` | `integer` |
| `Key` | `integer` |

