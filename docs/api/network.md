# Network & variants

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature - treat them as guidance, not guarantees.

### SendPacket

```lua
SendPacket(integer, string)
```

Sends a game message packet (type, text).

<small>Signature reverse-engineered from `0x58212c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |
| 2 | `string` | yes |


### SendPacketRaw

```lua
SendPacketRaw(boolean | integer)
```

Sends a raw packet by type with a binary/struct payload.

<small>Signature reverse-engineered from `0x585f0c`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `boolean \| integer` | yes |


### SendVariant

```lua
SendVariant(...)
```

Sends a VariantList to the server (net variant call).

<small>Signature reverse-engineered from `0x5836d0`; variadic (reads a variable number of arguments).</small>


### SendVariantList

```lua
SendVariantList(...)
```

Sends a VariantList to the server (alias of SendVariant in this build).

<small>Signature reverse-engineered from `0x5836d0`; variadic (reads a variable number of arguments).</small>


### MakeRequest

```lua
MakeRequest(string, any, integer?) → table
```

Performs an HTTP request; returns a response table (status, content, error). Note: overridden by mydll on patched builds.

<small>Signature reverse-engineered from `0x58432c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 3 | `any` | yes |
| 5 | `integer` | no |

**Returns** `table` - see [HttpResponse](/structs#httpresponse)

| field | type |
|-------|------|
| `status` | `integer` |
| `error` | `boolean` |
| `method` | `string` |
| `content` | `string` |
| `errorMessage` | `string` |

