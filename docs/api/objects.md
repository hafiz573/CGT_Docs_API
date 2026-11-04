# Objects & components

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### GetObjects

```lua
GetObjects() → table
```

Returns dropped/world objects as an array ({id, x, y, amount, flags, oid}).

<small>Signature reverse-engineered from `0x584f70`.</small>

**Returns** `table` — see [Object](/structs#object)

| field | type |
|-------|------|
| `id` | `integer` |
| `x` | `number` |
| `y` | `number` |
| `amount` | `integer` |
| `flags` | `integer` |
| `oid` | `integer` |


### GetID

```lua
GetID()
```

Returns an id (object/handle).

<small>Signature reverse-engineered from `0x5a693c`.</small>


### AddComponent

```lua
AddComponent(string, string, integer)
```

Adds a component to an object (object, component, type).

<small>Signature reverse-engineered from `0x5a9608`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |
| 3 | `integer` | yes |


### RemoveComponent

```lua
RemoveComponent(string, string, integer)
```

Removes a component from an object.

<small>Signature reverse-engineered from `0x5a9bc4`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |
| 3 | `integer` | yes |


### SetComponent

```lua
SetComponent(string, string)
```

Sets a component's value on an object.

<small>Signature reverse-engineered from `0x5a8514`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


### Animate

```lua
Animate(string)
```

Starts an animation on an object/target.

<small>Signature reverse-engineered from `0x5a7a68`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### StopAnimation

```lua
StopAnimation(string)
```

Stops an animation on an object/target.

<small>Signature reverse-engineered from `0x5a7cd4`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

