# UI

*Immediate-mode (ImGui-style) widgets.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `UI.<method>`. 15 methods.

## UI.Button {#button}

```lua
UI.Button(...)
```

Immediate-mode button; returns true on the frame it is clicked.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Checkbox {#checkbox}

```lua
UI.Checkbox(...)
```

Immediate-mode checkbox bound to a boolean.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Clear {#clear}

```lua
UI.Clear(...)
```

Clears the UI state / widgets.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Combo {#combo}

```lua
UI.Combo(...)
```

Immediate-mode dropdown (combo box).

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Create {#create}

```lua
UI.Create(...)
```

Creates a UI element / handle.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Get {#get}

```lua
UI.Get(...)
```

Reads a UI element value.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Input {#input}

```lua
UI.Input(...)
```

Immediate-mode text input field.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Progress {#progress}

```lua
UI.Progress(...)
```

Immediate-mode progress bar.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Remove {#remove}

```lua
UI.Remove(...)
```

Removes a UI element.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.SameLine {#sameline}

```lua
UI.SameLine(...)
```

Keeps the next widget on the same line as the previous one.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Separator {#separator}

```lua
UI.Separator(...)
```

Draws a horizontal separator line.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Set {#set}

```lua
UI.Set(...)
```

Sets a UI element value.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Slider {#slider}

```lua
UI.Slider(...)
```

Immediate-mode slider for a numeric value.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Text {#text}

```lua
UI.Text(...)
```

Draws a UI text label.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## UI.Window {#window}

```lua
UI.Window(...)
```

Begins an immediate-mode window / panel.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>

