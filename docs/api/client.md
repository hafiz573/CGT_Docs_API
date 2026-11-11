# Client

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Client.<method>`. 15 methods.

## Client.EmitParticle {#emitparticle}

```lua
Client.EmitParticle(name, x, y)
```

Emits a local presentation particle through the engine.

**Parameters** - Name: smoke, fire, heart, bubble, spark, sparkle, music or snow. Coordinates in world pixels.

**Returns** - True if queued.

**Notes** - Bounded queue; requires a world renderer. No damage, projectiles or network packets are generated.

**Example**

```lua
local p = GetLocal().pos
Client.EmitParticle('heart', p.x, p.y)
```

## Client.GetScreen {#getscreen}

```lua
Client.GetScreen()
```

Reads current logical screen dimensions.

**Parameters** - No arguments.

**Returns** - Table with width, height in pixels.

**Notes** - Uses the same coordinate space as Render drawings.

**Example**

```lua
local screen = Client.GetScreen()
```

## Client.WorldToScreen {#worldtoscreen}

```lua
Client.WorldToScreen(x, y)
```

Converts world pixels to screen pixels using the current camera.

**Parameters** - Finite x, y coordinates.

**Returns** - Two numbers x, y; nil when there is no world renderer.

**Notes** - One world tile is 32 pixels.

**Example**

```lua
local x, y = Client.WorldToScreen(32, 32)
```

## Client.ScreenToWorld {#screentoworld}

```lua
Client.ScreenToWorld(x, y)
```

Converts screen pixels to world pixels using the current camera.

**Parameters** - Finite x, y coordinates.

**Returns** - Two numbers x, y; nil when there is no world renderer.

**Notes** - One world tile is 32 pixels.

**Example**

```lua
local x, y = Client.ScreenToWorld(32, 32)
```

## Client.GetPlayers {#getplayers}

```lua
Client.GetPlayers()
```

Snapshots players currently in the world.

**Parameters** - No arguments.

**Returns** - 1-based array of GetPlayer tables.

**Notes** - Disconnected/removed players may disappear while taking snapshots.

**Example**

```lua
for _, player in ipairs(Client.GetPlayers()) do Log(player.name) end
```

## Client.GetObjects {#getobjects}

```lua
Client.GetObjects()
```

Snapshots dropped objects in the world.

**Parameters** - No arguments.

**Returns** - 1-based array: id, pos={x,y}, amount, flags, oid.

**Notes** - id is the item definition ID; oid is the world object's unique ID. Requires a loaded world.

**Example**

```lua
for _, object in ipairs(Client.GetObjects()) do Log(object.oid) end
```

## Client.GetTiles {#gettiles}

```lua
Client.GetTiles(x=0, y=0, width=100, height=60)
```

Returns a rectangular tile snapshot.

**Parameters** - Nonnegative tile coordinates and dimensions; at most 16384 cells.

**Returns** - 1-based array of {x,y,fg,bg,flags}.

**Notes** - Clips to world boundaries; empty table outside a loaded world. Read-only; does not mutate collision or tile extras.

**Example**

```lua
local tiles = Client.GetTiles(0, 0, 10, 10)
```

## Client.GetLocalState {#getlocalstate}

```lua
Client.GetLocalState()
```

Reads local player presentation and movement settings.

**Parameters** - No arguments.

**Returns** - Table: name, facesLeft, invisible, onGround, velocityX/Y, gravity, drag, acceleration; or nil.

**Notes** - Snapshot only; values are local client state.

**Example**

```lua
local state = Client.GetLocalState()
```

## Client.SetLocalState {#setlocalstate}

```lua
Client.SetLocalState(properties)
```

Updates allowlisted local player fields.

**Parameters** - name (up to 128 bytes), facesLeft/invisible booleans; velocityX/Y, gravity, drag, acceleration numbers within +/-10000; drag/acceleration nonnegative.

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Does not expose IDs, privileges, health, collision pointers, or network ownership.

**Example**

```lua
Client.SetLocalState({facesLeft=true})
```

## Client.GetSettings {#getsettings}

```lua
Client.GetSettings()
```

Reads supported client settings.

**Parameters** - No arguments.

**Returns** - {musicVolume, frameCounter}.

**Notes** - Music volume is 0..1; frameCounter is boolean.

**Example**

```lua
local settings = Client.GetSettings()
```

## Client.SetSetting {#setsetting}

```lua
Client.SetSetting(name, value)
```

Changes an allowlisted client setting.

**Parameters** - musicVolume (0..1) or frameCounter (boolean).

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop.

**Example**

```lua
Client.SetSetting('frameCounter', true)
```

## Client.GetCamera {#getcamera}

```lua
Client.GetCamera()
```

Reads the world camera.

**Parameters** - No arguments.

**Returns** - {x,y,scaleX,scaleY,netid}, or nil.

**Notes** - Position in world pixels; netid identifies the tracked avatar.

**Example**

```lua
local camera = Client.GetCamera()
```

## Client.TrackPlayer {#trackplayer}

```lua
Client.TrackPlayer(netid)
```

Changes which avatar the camera follows.

**Parameters** - Player network ID.

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Use GetLocal().netid to follow yourself again.

**Example**

```lua
Client.TrackPlayer(GetLocal().netid)
```

## Client.PlaySound {#playsound}

```lua
Client.PlaySound(file)
```

Plays a local game sound.

**Parameters** - Relative audio/ asset path; traversal and absolute paths rejected.

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Missing assets follow the engine's normal error handling.

**Example**

```lua
Client.PlaySound('audio/dialog_open.wav')
```

## Client.ShowDialog {#showdialog}

```lua
Client.ShowDialog(script)
```

Opens a local native Growtopia dialog.

**Parameters** - Dialog script string up to 64 KiB.

**Returns** - True if queued.

**Notes** - Queued for the game thread; true means accepted, not completed. OnClientCommand(kind, target, success) reports completion (success is 1 or 0). Changes are local, may be overwritten by the server, and are not automatically restored on stop. Refuses to replace an existing dialog. Submission emits OnDialogResult(text); nothing is sent to the server. Only one native dialog can be active.

**Example**

```lua
Client.ShowDialog('add_label|big|Hello|left|\nend_dialog|lua_demo||OK|')
Sleep(-1)
```
