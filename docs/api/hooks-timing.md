# Hooks & timing

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### AddHook

```lua
AddHook(string, string)
```

Registers a named hook/callback.

<small>Signature reverse-engineered from `0x5822a4`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


### sleep

```lua
sleep(integer)
```

Suspends the script for the given milliseconds.

<small>Signature reverse-engineered from `0x5813dc`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |


### GetTime

```lua
GetTime()
```

Returns the current time.

<small>Signature reverse-engineered from `0x5aae28`.</small>

