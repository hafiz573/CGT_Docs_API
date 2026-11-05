# Logging & debug

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature - treat them as guidance, not guarantees.

### Log

```lua
Log(string)
```

Logs a message to the executor log.

<small>Signature reverse-engineered from `0x581420`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### LogMsg

```lua
LogMsg(string)
```

Logs a message (string).

<small>Signature reverse-engineered from `0x581760`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### LogToConsole

```lua
LogToConsole(string)
```

Writes a message to the game console.

<small>Signature reverse-engineered from `0x5817b0`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### Inspect

```lua
Inspect(string) → table
```

Returns a debug dump of an object/value as a table.

<small>Signature reverse-engineered from `0x5a8300`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

**Returns** `table`

| field | type |
|-------|------|
| `components` | `string` |

