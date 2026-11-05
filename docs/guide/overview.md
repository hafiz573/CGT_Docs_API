# Overview

## How to read a function entry

Each function shows a Lua-style signature, an inferred description, the address it was recovered from,
a parameter table and (when it returns a table) its field list:

```lua
GetTile(integer, integer) → table
```

- **Parameters** are listed by **position** and **type**. Argument *names* are not stored in the binary,
  so positions are shown as `#1`, `#2`, … with the recovered type. `type?` (or *Required: no*) marks an
  optional argument recovered from `luaL_opt*`.
- A type shown as `integer | string` means the function accepts **either** at that position (an overload
  recovered from the binary).
- **Variadic** means the function reads a variable number of arguments (`lua_gettop`); only the arguments
  it validates up front are listed.
- **Returns `table`** links to the matching [struct](/structs) when the field shape is a named one.

## Conventions

- **Types** map to Lua: `integer` and `number` are both Lua numbers; `string`, `boolean`, `table`, `nil`
  as usual; `any` is an unconstrained value.
- **Coordinates**: world/tile functions take integer tile coordinates; render/screen functions take
  `number` pixel coordinates. Conversions depend on the engine tile size.
- Functions grouped under [Object & component methods](/api/methods) (`Get`, `Set`, `Create`, …) are
  generic - they are registered as methods on engine objects/handles rather than standalone globals.

## What is *not* here

- `MakeRequest` is documented as the **native** V1.50 implementation. On **mydll-patched** builds it is
  replaced by a custom implementation - see your loader's notes.
- Lua standard-library tables (`base`, `io`, `string`, `table`) and engine-internal env entries are listed
  under [Internal environment](/internal), not as game API.
- The exact runtime `_G` fingerprint for V1.50 is **108 names** (hash `19601d21`), identical on PC and
  Android. The functions here are the `pushcclosure`-registered subset of that surface.
