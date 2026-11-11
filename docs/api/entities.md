# Entities

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Entities.<method>`. 3 methods.

## Entities.List {#list}

```lua
Entities.List(rootName='')
```

Lists named GUI entities below a root.

**Parameters** - Optional root entity name; empty means engine GUI root.

**Returns** - 1-based array of at most 2048 entity names.

**Notes** - Snapshots only; duplicate names may exist. No entity pointers are exposed.

**Example**

```lua
local names = Entities.List()
```

## Entities.Get {#get}

```lua
Entities.Get(name)
```

Reads allowlisted presentation properties of an existing GUI entity.

**Parameters** - Entity name.

**Returns** - Snapshot of pos2d/scale2d={x,y}, alpha, visible, rotation, color when present; nil if missing.

**Notes** - Uses the first matching name. No arbitrary component fields or function pointers.

**Example**

```lua
local inventory = Entities.Get('Inventory')
```

## Entities.Set {#set}

```lua
Entities.Set(name, property, value [, y])
```

Queues an edit to an existing presentation property.

**Parameters** - pos2d or scale2d take x,y; alpha 0..1; visible boolean; rotation degrees; color packed engine RGBA integer.

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Only existing supported typed properties are edited. Scale 0.01..10. Scripts must restore edits themselves.

**Example**

```lua
Entities.Set('Inventory', 'alpha', 0.8)
```
