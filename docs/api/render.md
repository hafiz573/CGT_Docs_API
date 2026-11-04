# Render & screen

> **How this reference was built.** The V1.50 binary ships **no documentation prose** (no descriptions, examples or signatures). Every **function name, parameter type and return-table field below is reverse-engineered directly from `lib/arm64-v8a/libregrowtopia.so`** (APK `CreativeGrowtopia-V1.50-CPS`). The one-line **descriptions are inferred** from each name and its recovered signature — treat them as guidance, not guarantees.

### Line

```lua
Line()
```

Draws a line (render primitive).

<small>Signature reverse-engineered from `0x5b48c4`.</small>


### Rect

```lua
Rect()
```

Draws a rectangle (render primitive).

<small>Signature reverse-engineered from `0x5b48c4`.</small>


### Circle

```lua
Circle()
```

Draws a circle (render primitive).

<small>Signature reverse-engineered from `0x5b48c4`.</small>


### Present

```lua
Present()
```

Flushes/presents the current render frame.

<small>Signature reverse-engineered from `0x5aa384`.</small>


### ScreenToWorld

```lua
ScreenToWorld(number, number)
```

Converts screen coordinates (x, y) to world coordinates.

<small>Signature reverse-engineered from `0x5b52f0`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |


### WorldToScreen

```lua
WorldToScreen(number, number)
```

Converts world coordinates (x, y) to screen coordinates.

<small>Signature reverse-engineered from `0x5b52f0`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `number` | yes |
| 2 | `number` | yes |


### GetScreen

```lua
GetScreen() → table
```

Returns the screen size {width, height}.

<small>Signature reverse-engineered from `0x5ad374`.</small>

**Returns** `table` — see [Screen](/structs#screen)

| field | type |
|-------|------|
| `width` | `number` |
| `height` | `number` |


### GetCamera

```lua
GetCamera() → table
```

Returns the camera {x, y, scaleX, scaleY, netid}.

<small>Signature reverse-engineered from `0x5ae4ec`.</small>

**Returns** `table` — see [Camera](/structs#camera)

| field | type |
|-------|------|
| `x` | `number` |
| `y` | `number` |
| `scaleX` | `number` |
| `scaleY` | `number` |
| `netid` | `integer` |


### EmitParticle

```lua
EmitParticle(string, number, number)
```

Emits a particle effect (name, x, y).

<small>Signature reverse-engineered from `0x5aa6b8`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `number` | yes |
| 3 | `number` | yes |


### Emit

```lua
Emit(string, string) → table
```

Emits a named event.

<small>Signature reverse-engineered from `0x5ab0f0`; variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |

**Returns** `table`.


### PlaySound

```lua
PlaySound(string)
```

Plays a sound by name/path.

<small>Signature reverse-engineered from `0x5ae7e4`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


### SetFPSLimit

```lua
SetFPSLimit(integer)
```

Sets the render FPS limit.

<small>Signature reverse-engineered from `0x582e7c`.</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |

