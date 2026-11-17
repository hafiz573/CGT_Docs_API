# UI

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.52**).

Accessed as `UI.<method>`. 19 methods.

## UI.Create {#create}

```lua
UI.Create(kind, id, properties)
```

Creates or replaces a retained control rendered on the main thread.

**Parameters** - Kind: window, text, button, checkbox, slider, input, combo, progress, separator, sameline, tabbar, tabitem. ID string and property table.

**Returns** - Control ID.

**Notes** - Properties are strings, finite numbers or booleans. Common: parent, text, visible, enabled, width, height, value. IDs are scoped to this script. Up to 256 controls. Tabs require a tab-bar parent; tab bars require a window/tab-item parent. Ordinary controls use a window/tab-item parent, inferred inside BeginTabItem scopes. UI is declared once and rendered each frame; Lua workers never call ImGui directly.

**Example**

```lua
UI.Create('window', 'tools', {title='Tools'})
UI.Create('button', 'hello', {parent='tools', text='Hello'})
Sleep(-1)
```

## UI.BeginTabBar {#begintabbar}

```lua
UI.BeginTabBar(id, properties={})
```

Declares a retained tab bar and opens its declaration scope.

**Parameters** - ID string. parent is a window or tab-item ID; inferred inside an outer tab item.

**Returns** - True when declared successfully, not a live visibility result.

**Notes** - Pair with EndTabBar. Declare all tab contents once; do not rebuild them every frame. Maximum 15 nested declaration scopes, isolated per Lua coroutine. Controls remain until removed or the script stops.

**Example**

```lua
UI.Window('tools', {title='Tools'})
if UI.BeginTabBar('tabs', {parent='tools'}) then
  if UI.BeginTabItem('main', {text='Main'}) then
    UI.Text('hello', {text='Hello'})
    UI.EndTabItem()
  end
  UI.EndTabBar()
end
Sleep(-1)
```

## UI.EndTabBar {#endtabbar}

```lua
UI.EndTabBar()
```

Closes a retained tab-bar declaration scope.

**Parameters** - No arguments.

**Returns** - Nothing.

**Notes** - Requires a matching BeginTabBar on this coroutine. Mismatched or extra ends raise an error. This is not a worker-thread ImGui call.

**Example**

```lua
UI.Window('tools', {})
UI.BeginTabBar('tabs', {parent='tools'})
UI.EndTabBar()
Sleep(-1)
```

## UI.BeginTabItem {#begintabitem}

```lua
UI.BeginTabItem(id, properties={})
```

Declares a retained tab and opens its content scope.

**Parameters** - ID string. Optional text label, visible, enabled, selected boolean; parent is inferred from BeginTabBar.

**Returns** - True when declared successfully, including currently inactive tabs.

**Notes** - Pair with EndTabItem and declare every tab's content. UI.Get(id).value reports the last rendered selection as a boolean. Activating a tab emits OnUI(id, 'select', 1). UI.Set(id, {selected=true}) requests selection through the next visible tab-bar layout. Inactive tabs' child widgets are not drawn.

**Example**

```lua
UI.Window('tools', {})
UI.BeginTabBar('tabs', {parent='tools'})
UI.BeginTabItem('main', {text='Main'})
UI.Button('run', {text='Run'})
UI.EndTabItem()
UI.BeginTabItem('other', {text='Other'})
UI.Text('info', {text='Other content'})
UI.EndTabItem()
UI.EndTabBar()
Sleep(-1)
```

## UI.EndTabItem {#endtabitem}

```lua
UI.EndTabItem()
```

Closes a retained tab-content declaration scope.

**Parameters** - No arguments.

**Returns** - Nothing.

**Notes** - Requires a matching BeginTabItem on this coroutine. Subsequent declarations return to the enclosing tab-bar scope.

**Example**

```lua
UI.Window('tools', {})
UI.BeginTabBar('tabs', {parent='tools'})
UI.BeginTabItem('main')
UI.EndTabItem()
UI.EndTabBar()
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

Removes a control and all its descendants.

**Parameters** - Control ID.

**Returns** - Nothing.

**Notes** - Removing a window/tab bar also removes its nested tabs and their child controls.

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

**Notes** - Also resets this script's tab declaration scopes. Does not remove other scripts' windows or native dialogs.

**Example**

```lua
UI.Clear()
```
