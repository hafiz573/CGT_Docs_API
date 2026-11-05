# Proton

*The Proton UI / component system (panels, widgets and attachable components).*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Proton.<method>`. 21 methods.

## Proton.AddComponent {#addcomponent}

```lua
Proton.AddComponent(string, string, integer)
```

Adds a component to a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |
| 3 | `integer` | yes |


## Proton.Animate {#animate}

```lua
Proton.Animate(string)
```

Plays an animation on a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## Proton.Button {#button}

```lua
Proton.Button(...)
```

Creates a Proton button widget.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Checkbox {#checkbox}

```lua
Proton.Checkbox(...)
```

Creates a Proton checkbox widget.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Clear {#clear}

```lua
Proton.Clear(...)
```

Clears Proton objects / children.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Container {#container}

```lua
Proton.Container(...)
```

Creates a Proton container (layout box) that holds child widgets.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Create {#create}

```lua
Proton.Create(...)
```

Creates a Proton object / widget.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.DefineComponent {#definecomponent}

```lua
Proton.DefineComponent(...)
```

Registers a reusable Proton component definition.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Get {#get}

```lua
Proton.Get(...)
```

Reads a Proton object or property.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.GetComponent {#getcomponent}

```lua
Proton.GetComponent(...)
```

Returns a component attached to a Proton object.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Image {#image}

```lua
Proton.Image(...)
```

Creates a Proton image widget.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Inspect {#inspect}

```lua
Proton.Inspect(string) -> table
```

Returns a debug dump of a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |

**Returns** `table`

| field | type |
|-------|------|
| `components` | `string` |


## Proton.Item {#item}

```lua
Proton.Item(...)
```

Creates a Proton item widget (inventory-style).

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Panel {#panel}

```lua
Proton.Panel(...)
```

Creates a Proton panel (a window / surface).

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Progress {#progress}

```lua
Proton.Progress(...)
```

Creates a Proton progress bar.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.Remove {#remove}

```lua
Proton.Remove(...)
```

Removes a Proton object.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.RemoveComponent {#removecomponent}

```lua
Proton.RemoveComponent(string, string, integer)
```

Removes a component from a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |
| 3 | `integer` | yes |


## Proton.Set {#set}

```lua
Proton.Set(...)
```

Sets a Proton object property.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Proton.SetComponent {#setcomponent}

```lua
Proton.SetComponent(string, string)
```

Sets a component value on a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |
| 2 | `string` | yes |


## Proton.StopAnimation {#stopanimation}

```lua
Proton.StopAnimation(string)
```

Stops an animation on a Proton object.

**Parameters**

| # | Type | Required |
|---|------|----------|
| 1 | `string` | yes |


## Proton.Text {#text}

```lua
Proton.Text(...)
```

Creates a Proton text widget.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>

