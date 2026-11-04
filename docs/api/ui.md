# UI & dialog

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### Begin

```lua
Begin()
```

Begins a UI/render frame block.

<small>Signature reverse-engineered from `0x5aa180`.</small>


### Text

```lua
Text()
```

Draws a text UI/render primitive.

<small>Signature reverse-engineered from `0x5b48c4`.</small>


### Image

```lua
Image()
```

Draws an image UI/render primitive.

<small>Signature reverse-engineered from `0x5b48c4`.</small>


### ShowDialog

```lua
ShowDialog(string)
```

Shows a game dialog from a dialog string.

<small>Signature reverse-engineered from `0x5ae978`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

