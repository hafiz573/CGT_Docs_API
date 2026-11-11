# Script

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Script.<method>`. 8 methods.

## Script.GetID {#getid}

```lua
Script.GetID()
```

Returns the current script run ID.

**Parameters** - No arguments.

**Returns** - Integer script ID.

**Notes** - IDs identify runs, not filenames.

**Example**

```lua
Log(Script.GetID())
```

## Script.GetTime {#gettime}

```lua
Script.GetTime()
```

Returns monotonic milliseconds for measuring intervals.

**Parameters** - No arguments.

**Returns** - Number of milliseconds.

**Notes** - Not a wall-clock timestamp.

**Example**

```lua
local start = Script.GetTime()
```

## Script.On {#on}

```lua
Script.On(event, name, callback)
```

Registers a named handler; alias of AddHook.

**Parameters** - Event string, handler name string, callback function.

**Returns** - Callback reference ID.

**Notes** - Name identifies a handler for Script.Off; registering the same event/name replaces it. Keep callbacks short.

**Example**

```lua
Script.On('OnUpdate', 'tick', function(dt) end)
Sleep(-1)
```

## Script.Off {#off}

```lua
Script.Off(event, name)
```

Removes this script's named handlers.

**Parameters** - Event name and handler name.

**Returns** - Number removed.

**Notes** - Queued calls to removed callbacks are skipped.

**Example**

```lua
Script.Off('OnUpdate', 'tick')
```

## Script.Emit {#emit}

```lua
Script.Emit(event, ...)
```

Queues a custom event to handlers in this script.

**Parameters** - Event string and up to eight strings, numbers or booleans.

**Returns** - Nothing.

**Notes** - Asynchronous; does not broadcast to other scripts. Booleans arrive as 1 or 0.

**Example**

```lua
Script.On('MyEvent', 'test', function(value) Log(value) end)
Script.Emit('MyEvent', 'hello')
Sleep(100)
```

## Script.After {#after}

```lua
Script.After(milliseconds, callback)
```

Schedules one callback while the script remains running.

**Parameters** - Interval 1..86400000 ms; callback receives its timer ID.

**Returns** - Timer ID.

**Notes** - Maximum 256 timers per script. Runs on OnUpdate; missed intervals are skipped. Errors cancel a repeating timer. Do not Sleep inside callbacks.

**Example**

```lua
local id = Script.After(1000, function(id) Log('timer') end)
Sleep(-1)
```

## Script.Every {#every}

```lua
Script.Every(milliseconds, callback)
```

Schedules a repeating callback while the script remains running.

**Parameters** - Interval 1..86400000 ms; callback receives its timer ID.

**Returns** - Timer ID.

**Notes** - Maximum 256 timers per script. Runs on OnUpdate; missed intervals are skipped. Errors cancel a repeating timer. Do not Sleep inside callbacks.

**Example**

```lua
local id = Script.Every(1000, function(id) Log('timer') end)
Sleep(-1)
```

## Script.CancelTimer {#canceltimer}

```lua
Script.CancelTimer(id)
```

Cancels a pending or repeating timer.

**Parameters** - Timer ID returned by After or Every.

**Returns** - True if found.

**Notes** - Timers disappear when a script stops.

**Example**

```lua
local id = Script.After(1000, function() end)
Script.CancelTimer(id)
```
