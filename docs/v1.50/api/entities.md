# Entities

*Access to the entity collection.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Entities.<method>`. 3 methods.

## Entities.Get {#get}

```lua
Entities.Get(...)
```

Returns an entity by id / handle.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Entities.List {#list}

```lua
Entities.List() -> table
```

Returns the list of entities.

**Returns** `table`.


## Entities.Set {#set}

```lua
Entities.Set(...)
```

Sets a field on an entity.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>

