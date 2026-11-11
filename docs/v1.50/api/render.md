# Render

*Immediate-mode drawing primitives for the current frame.*

> **How this reference was built.** The authoritative list of names and their namespaces comes from a **live in-game `_G` dump** (108 names, hash `19601d21`, identical on PC and Android). Parameter types and return-table fields are **reverse-engineered from `libregrowtopia.so`** (V1.50); one-line **descriptions are inferred**. Treat descriptions as guidance, not guarantees.

Accessed as `Render.<method>`. 8 methods.

## Render.Begin {#begin}

```lua
Render.Begin()
```

Begins a render block for the current frame.


## Render.Circle {#circle}

```lua
Render.Circle()
```

Draws a circle.


## Render.Clear {#clear}

```lua
Render.Clear(...)
```

Clears the current frame's draw list.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Render.Image {#image}

```lua
Render.Image(...)
```

Draws an image / texture.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>


## Render.Line {#line}

```lua
Render.Line()
```

Draws a line.


## Render.Present {#present}

```lua
Render.Present()
```

Flushes / presents the current render frame.


## Render.Rect {#rect}

```lua
Render.Rect()
```

Draws a rectangle.


## Render.Text {#text}

```lua
Render.Text(...)
```

Draws text at a position.

<small>Name confirmed from the runtime `_G` dump; individual signature not reverse-engineered (shared/ambiguous handler).</small>

