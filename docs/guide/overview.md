# Overview

## How the API is organised

The surface is taken from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and
Android). It splits into:

- **[Global functions](/api/globals)** - registered directly in the script globals (e.g. `GetTile`, `GetWorld`).
- **Namespaces** - tables of methods called as `Namespace.method(...)`:
  [`Client`](/api/client), [`Entities`](/api/entities), [`Input`](/api/input), [`Proton`](/api/proton),
  [`Render`](/api/render), [`Script`](/api/script), [`UI`](/api/ui).

A name's badge/signature is attached when it was individually reverse-engineered; some namespace methods
share a handler and are listed name-only (confirmed by the dump, signature not individually recovered).

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
- Generic method names (`Get`, `Set`, `Create`, `Clear`, ...) appear in several namespaces
  ([`Entities`](/api/entities), [`Proton`](/api/proton), [`UI`](/api/ui)); they are distinct functions per
  namespace, so they are listed name-only rather than sharing one reverse-engineered signature.

## What is *not* here

- `MakeRequest` has no page in this reference, but stock V1.50 **does** ship it natively (PC and Android):
  `MakeRequest(url, method, headers, content, timeout)`; on PC it returns a response table (`status`,
  `error`, ...). It is left out of the fingerprint below only because the API test groups it with the
  BooLua bindings, since the **mydll-patched** build overrides it - see [BooLua](/boolua/overrides#makerequest).
- Lua standard-library tables (`math`, `string`, `table`, ...) are available to scripts but excluded from
  the API fingerprint; `lock`/`sleep`/`unlock` are engine-internal ([Internal environment](/internal)).
- The runtime `_G` fingerprint is **108 names** (hash `19601d21`), identical on PC and Android - this site
  documents all of them.
