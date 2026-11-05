# Object & component methods

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature - treat them as guidance, not guarantees.

### Create

```lua
Create(string, string)
```

Object/component method: creates an entry.

<small>Signature reverse-engineered from `0x5a696c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


### Get

```lua
Get(string) → table
```

Object/component method: reads an entry (returns a table).

<small>Signature reverse-engineered from `0x5a73fc`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

**Returns** `table`.


### Set

```lua
Set(string)
```

Object/component method: writes an entry.

<small>Signature reverse-engineered from `0x5a70a8`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### Remove

```lua
Remove(string)
```

Object/component method: removes an entry.

<small>Signature reverse-engineered from `0x5a77e4`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### Clear

```lua
Clear()
```

Object/component method: clears all entries.

<small>Signature reverse-engineered from `0x5a79b8`.</small>


### List

```lua
List() → table
```

Object/component method: lists entries (returns a table).

<small>Signature reverse-engineered from `0x5aeac0`.</small>

**Returns** `table`.


### Off

```lua
Off(string, string)
```

Object/component method: unregisters/detaches.

<small>Signature reverse-engineered from `0x5aae74`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |

