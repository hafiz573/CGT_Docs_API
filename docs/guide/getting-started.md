# Getting started

This site documents the **Lua scripting surface** of **CreativeGrowtopia V1.50** — the global
functions your executor scripts can call. It is built for the `libregrowtopia.so` shipped in
`CreativeGrowtopia-V1.50-CPS`.

## How this reference was produced

The V1.50 binary registers each Lua function with `lua_pushcclosure(fn)` + `lua_setfield(env, "name")`.
Enumerating those registrations gives the **exact set of names** the game exposes. For each function we
then disassemble the body to recover:

- **parameters** — from `luaL_check*` / `luaL_opt*` (and, for thunks, the argument reads in the prologue);
- **return-table fields** — from each `lua_setfield` / `lua_settable` paired with the value pushed before it;
- **enum constants** — from the integer literals pushed into a constants table.

Because the binary carries no prose, the **descriptions here are inferred** from the name and the recovered
signature. They are guidance, not guarantees.

## A first script

```lua
-- Who am I, and where?
local me = GetLocal()
LogToConsole("I am " .. me.name .. " at " .. me.posX .. "," .. me.posY)

-- Read the tile I'm standing on
local t = GetTile(math.floor(me.posX / 32), math.floor(me.posY / 32))
LogToConsole("fg=" .. t.fg .. " bg=" .. t.bg .. " collidable=" .. tostring(t.collidable))
```

> Tile/pixel conversions (the `/ 32` above) depend on the engine's tile size; adjust for your build.

## Where to go next

- [Overview](/guide/overview) — how the API is organised and conventions used on this site.
- [API reference](/api/local-player) — every function, grouped by category.
- [Structs](/structs) — the table shapes returned by the API.
- [Examples](/examples) — short, illustrative snippets.
