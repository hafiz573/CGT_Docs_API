# Input

*Keyboard / pointer input and the input-event type enum.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Input.<method>`. 2 methods.

## Input.GetTypes {#gettypes}

```lua
Input.GetTypes() -> table
```

Returns the input-event type constants (enum).

**Returns** `table`

| field | type |
|-------|------|
| `PointerDown` | `integer` |
| `PointerUp` | `integer` |
| `PointerDrag` | `integer` |
| `PointerMove` | `integer` |
| `Character` | `integer` |
| `Key` | `integer` |


## Input.IsKeyDown {#iskeydown}

```lua
Input.IsKeyDown(integer) -> boolean
```

Returns whether the given key code is currently held.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `integer` | yes |

**Returns** `boolean`.

