# Render

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Render.<method>`. 8 methods.

## Render.Begin {#begin}

```lua
Render.Begin()
```

Starts building a replacement overlay without changing the displayed drawings.

**Parameters** - No arguments.

**Returns** - Nothing.

**Notes** - Pair with Render.Present to publish a complete frame atomically. A new Begin discards any unpublished shapes.

**Example**

```lua
Render.Begin()
Render.Text({x=10,y=10,text='New frame'})
Render.Present()
```

## Render.Present {#present}

```lua
Render.Present()
```

Atomically publishes drawings collected since Render.Begin.

**Parameters** - No arguments.

**Returns** - True if an overlay was being built; false otherwise.

**Notes** - Keeps the previous overlay visible until publication, avoiding partial redraws between Lua calls.

**Example**

```lua
Render.Begin()
Render.Rect({x=0,y=0,x2=50,y2=50})
Render.Present()
```

## Render.Clear {#clear}

```lua
Render.Clear()
```

Clears this script's retained overlay drawings.

**Parameters** - No arguments.

**Returns** - Nothing.

**Notes** - Drawings persist until cleared or the script stops. Call once at the start of an overlay refresh.

**Example**

```lua
Render.Clear()
```

## Render.Line {#line}

```lua
Render.Line(properties)
```

Appends a line to this script's overlay.

**Parameters** - x/y and x2/y2 endpoints; thickness. Optional r/g/b/a channels 0..255 and world=true.

**Returns** - Nothing.

**Notes** - Up to 4096 drawings; overlays draw above the game and below custom windows. world converts endpoints from world pixels; circle radius and line thickness remain screen pixels. No worker-thread graphics calls.

**Example**

```lua
Render.Line({x=10,y=10,x2=100,y2=80})
Sleep(-1)
```

## Render.Rect {#rect}

```lua
Render.Rect(properties)
```

Appends a rect to this script's overlay.

**Parameters** - x/y and x2/y2 corners; filled and thickness. Optional r/g/b/a channels 0..255 and world=true.

**Returns** - Nothing.

**Notes** - Up to 4096 drawings; overlays draw above the game and below custom windows. world converts endpoints from world pixels; circle radius and line thickness remain screen pixels. No worker-thread graphics calls.

**Example**

```lua
Render.Rect({x=20,y=20,x2=150,y2=90,filled=true})
Sleep(-1)
```

## Render.Circle {#circle}

```lua
Render.Circle(properties)
```

Appends a circle to this script's overlay.

**Parameters** - x/y center, radius (screen pixels), filled and thickness. Optional r/g/b/a channels 0..255 and world=true.

**Returns** - Nothing.

**Notes** - Up to 4096 drawings; overlays draw above the game and below custom windows. world converts endpoints from world pixels; circle radius and line thickness remain screen pixels. No worker-thread graphics calls.

**Example**

```lua
Render.Circle({x=100,y=100,radius=25})
Sleep(-1)
```

## Render.Text {#text}

```lua
Render.Text(properties)
```

Appends a text to this script's overlay.

**Parameters** - x/y origin and text string. Optional r/g/b/a channels 0..255 and world=true.

**Returns** - Nothing.

**Notes** - Up to 4096 drawings; overlays draw above the game and below custom windows. world converts endpoints from world pixels; circle radius and line thickness remain screen pixels. No worker-thread graphics calls.

**Example**

```lua
Render.Text({x=20,y=20,text='Hello'})
Sleep(-1)
```

## Render.Image {#image}

```lua
Render.Image(properties)
```

Appends a image to this script's overlay.

**Parameters** - file relative asset path; x/y and x2/y2 corners. Optional r/g/b/a channels 0..255 and world=true.

**Returns** - Nothing.

**Notes** - Up to 4096 drawings; overlays draw above the game and below custom windows. world converts endpoints from world pixels; circle radius and line thickness remain screen pixels. No worker-thread graphics calls.

**Example**

```lua
Render.Image({x=10,y=10,x2=74,y2=74,file='interface/large/cross.rttex'})
Sleep(-1)
```
