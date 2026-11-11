# Script

*Script lifecycle: events, timers and identity.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Script.<method>`. 8 methods.

## Script.After {#after}

```lua
Script.After(...)
```

Runs a callback once after a delay in milliseconds; returns a timer id.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Script.CancelTimer {#canceltimer}

```lua
Script.CancelTimer(...)
```

Cancels a timer created by After / Every.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Script.Emit {#emit}

```lua
Script.Emit(string, string)
```

Emits a named event to listeners.

<small>Variadic (reads a variable number of arguments).</small>

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


## Script.Every {#every}

```lua
Script.Every(...)
```

Runs a callback repeatedly every interval in milliseconds; returns a timer id.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Script.GetID {#getid}

```lua
Script.GetID() -> integer
```

Returns the current script's id.

**Returns** `integer`.


## Script.GetTime {#gettime}

```lua
Script.GetTime() -> number
```

Returns the current time.

**Returns** `number`.


## Script.Off {#off}

```lua
Script.Off(string, string)
```

Removes an event listener registered with On.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


## Script.On {#on}

```lua
Script.On(...)
```

Registers an event listener (event name, callback).

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>

