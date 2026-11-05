# Settings

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature - treat them as guidance, not guarantees.

### GetSettings

```lua
GetSettings() → table
```

Returns game settings {musicVolume, frameCounter}.

<small>Signature reverse-engineered from `0x5adfb8`.</small>

**Returns** `table` - see [Settings](/structs#settings)

| field | type |
|-------|------|
| `musicVolume` | `number` |
| `frameCounter` | `boolean` |


### SetSetting

```lua
SetSetting(string, number | boolean)
```

Sets a setting by name to a value.

<small>Signature reverse-engineered from `0x5ae104`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `number \| boolean` | yes |

