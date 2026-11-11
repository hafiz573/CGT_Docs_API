# UI

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `UI.<method>`. 15 methods.

## UI.Create {#create}

```lua
UI.Create(kind, id, properties)
```

Creates or replaces a retained control rendered on the main thread.

**Parameters** - Kind: window, text, button, checkbox, slider, input, combo, progress, separator, sameline. ID string and property table.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script. Up to 256 controls. Windows require no parent; other controls need a window parent.

**Example**

```lua
UI.Create('window', 'tools', {title='Tools'})
UI.Create('button', 'hello', {parent='tools', text='Hello'})
Sleep(-1)
```

## UI.Window {#window}

```lua
UI.Window(id, properties)
```

Creates a window control. Shorthand for UI.Create.

**Parameters** - ID string and property table. title, x/y (optional fixed position), width/height (initial size).

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Window('another', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Text {#text}

```lua
UI.Text(id, properties)
```

Creates a text control. Shorthand for UI.Create.

**Parameters** - ID string and property table. text is wrapped and never used as a printf format.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Text('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Button {#button}

```lua
UI.Button(id, properties)
```

Creates a button control. Shorthand for UI.Create.

**Parameters** - ID string and property table. Click emits OnUI(id, 'click', 1).

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Button('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Checkbox {#checkbox}

```lua
UI.Checkbox(id, properties)
```

Creates a checkbox control. Shorthand for UI.Create.

**Parameters** - ID string and property table. value is boolean.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Checkbox('control', {parent='tools', text='Example', value=true})
Sleep(-1)
```

## UI.Slider {#slider}

```lua
UI.Slider(id, properties)
```

Creates a slider control. Shorthand for UI.Create.

**Parameters** - ID string and property table. value, min and max are numbers.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Slider('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Input {#input}

```lua
UI.Input(id, properties)
```

Creates a input control. Shorthand for UI.Create.

**Parameters** - ID string and property table. value is text, editable up to 4096 bytes.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Input('control', {parent='tools', text='Example', value='hello'})
Sleep(-1)
```

## UI.Combo {#combo}

```lua
UI.Combo(id, properties)
```

Creates a combo control. Shorthand for UI.Create.

**Parameters** - ID string and property table. items is a pipe-separated string; value is a 1-based selection index.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Combo('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Progress {#progress}

```lua
UI.Progress(id, properties)
```

Creates a progress control. Shorthand for UI.Create.

**Parameters** - ID string and property table. value is a fraction 0..1; text is the overlay.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Progress('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Separator {#separator}

```lua
UI.Separator(id, properties)
```

Creates a separator control. Shorthand for UI.Create.

**Parameters** - ID string and property table. Draws a horizontal divider.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.Separator('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.SameLine {#sameline}

```lua
UI.SameLine(id, properties)
```

Creates a sameline control. Shorthand for UI.Create.

**Parameters** - ID string and property table. Places the following control on the same line.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Window('tools', {title='Tools'})
UI.SameLine('control', {parent='tools', text='Example', value=0.5})
Sleep(-1)
```

## UI.Set {#set}

```lua
UI.Set(id, properties)
```

Patches properties on an existing control.

**Parameters** - ID and property table.

**Returns** - True if the control exists.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent (window ID), text, visible, enabled, width, height, value. IDs are scoped to this script.

**Example**

```lua
UI.Set('control', {text='Updated', enabled=false})
```

## UI.Get {#get}

```lua
UI.Get(id)
```

Returns a snapshot including the latest edited value.

**Parameters** - Control ID.

**Returns** - Property table or nil.

**Notes** - Editing the returned table does not update the control; use UI.Set.

**Example**

```lua
local control = UI.Get('control')
if control then Log(control.value) end
```

## UI.Remove {#remove}

```lua
UI.Remove(id)
```

Removes a control and its direct children.

**Parameters** - Control ID.

**Returns** - Nothing.

**Notes** - Removing a window removes all its controls.

**Example**

```lua
UI.Remove('tools')
```

## UI.Clear {#clear}

```lua
UI.Clear()
```

Removes all custom controls owned by this script.

**Parameters** - No arguments.

**Returns** - Nothing.

**Notes** - Does not remove other scripts' windows or native dialogs.

**Example**

```lua
UI.Clear()
```
