# Hook events

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Event names for [`AddHook`](/api/globals#addhook) and `Script.On`. The signature is the callback's.

## OnDraw {#ondraw}

```lua
callback(deltaMS)
```

Called from the draw path before the game GUI.

**Parameters** - deltaMS: integer engine delta tick in milliseconds.

**Returns** - Return value ignored.

**Notes** - Use this exact event name in AddHook, keep the script alive with Sleep(-1), and return promptly. Use UI controls for windows and Render calls for custom overlays.

**Example**

```lua
UI.Window("frame", {title="Frame"})
UI.Text("delta", {parent="frame", text="Waiting for a frame"})
AddHook("OnDraw", "frame", function(dt)
    UI.Set("delta", {text="Delta: " .. dt .. " ms"})
end)
Sleep(-1)
```

## OnVariant {#onvariant}

```lua
callback(variants)
```

Called before dispatching a received function/variant event.

**Parameters** - variants: zero-based table. [0]=function/event name, [1] onward=arguments.

**Returns** - Return true to suppress dispatch; false/nil to continue.

**Notes** - filter is not applied by the host. Inspect v[0] yourself. Editing v does not rewrite the original event. Keep the script alive with Sleep(-1).

**Example**

```lua
AddHook("OnVariant", "console", function(v)
    if v[0] == "OnConsoleMessage" then Log(v[1]) end
    return false
end)
Sleep(-1)
```

## ProcessTankUpdatePacket {#processtankupdatepacket}

```lua
callback(packet)
```

Called before handling an incoming game-update packet.

**Parameters** - packet: snapshot of the packet fields listed in Table conventions.

**Returns** - Return true to suppress processing; false/nil to continue.

**Notes** - No extended bytes are exposed. Editing the table does not change the original packet. Keep the script alive with Sleep(-1).

**Example**

```lua
AddHook("ProcessTankUpdatePacket", "incoming", function(p)
    Log("Incoming type: " .. p.type)
    return false
end)
Sleep(-1)
```

## OnSendPacket {#onsendpacket}

```lua
callback(messageType, text)
```

Called before the client sends a text packet.

**Parameters** - messageType: integer network message type. text: packet string.

**Returns** - Return true to cancel sending; false/nil to continue.

**Notes** - Script-originated sends bypass recursive hook dispatch. Keep the script alive with Sleep(-1).

**Example**

```lua
AddHook("OnSendPacket", "text", function(kind, text)
    Log("Outgoing text type: " .. kind)
    return false
end)
Sleep(-1)
```

## OnSendPacketRaw {#onsendpacketraw}

```lua
callback(packet)
```

Called before sending a game-update packet while a peer exists.

**Parameters** - packet: snapshot of the packet fields listed in Table conventions.

**Returns** - Return true to cancel sending; false/nil to continue.

**Notes** - Script-originated sends bypass recursive hook dispatch. Mutating the table does not rewrite the packet. Keep the script alive with Sleep(-1).

**Example**

```lua
AddHook("OnSendPacketRaw", "raw", function(p)
    Log("Outgoing game type: " .. p.type)
    return false
end)
Sleep(-1)
```

## OnProtonEvent {#onprotonevent}

```lua
callback(id, event, value)
```

Reports native Proton control input.

**Parameters** - Owned ID, click/change/enter/leave, and numeric value (checkbox 0/1).

**Returns** - Return value ignored.

**Notes** - Queued to the owning worker; native input handlers never execute Lua synchronously.

**Example**

```lua
Script.On('OnProtonEvent','native',function(id,event,value) Log(id .. ': ' .. event) end)
Sleep(-1)
```

## OnProtonResult {#onprotonresult}

```lua
callback(id, operation, success, error)
```

Reports completion of native Proton commands.

**Parameters** - Owned ID, create/set/component/animate/stop/remove/clear operation, success as 1/0 and error text.

**Returns** - Return value ignored.

**Notes** - Accepted queue entries can fail if assets, parents or item definitions are unavailable.

**Example**

```lua
Script.On('OnProtonResult','result',function(id,op,ok,err) if ok==0 then Log(err) end end)
Sleep(-1)
```

## OnProtonAnimation {#onprotonanimation}

```lua
callback(id, property)
```

Reports completion of a native once animation.

**Parameters** - Owned ID and property channel.

**Returns** - Return value ignored.

**Notes** - Repeat/pingpong loops do not complete until stopped; cancelled or deleted animations do not emit completion.

**Example**

```lua
Script.On('OnProtonAnimation','finished',function(id,property) Log(id .. ': ' .. property) end)
Sleep(-1)
```

## OnReceivePacket {#onreceivepacket}

```lua
callback(type, text)
```

Inspects incoming text/game-message packets before engine handling.

**Parameters** - Numeric net message type and bounded text payload.

**Returns** - Return true to suppress the packet; false/nil permits normal processing.

**Notes** - Game-update binary packets use ProcessTankUpdatePacket. Callback tables are snapshots, not writable packet memory.

**Example**

```lua
Script.On('OnReceivePacket', 'receive', function(kind, text) Log(text); return false end)
Sleep(-1)
```

## OnUpdate {#onupdate}

```lua
callback(deltaMS)
```

Runs after engine entity updates, also while the developer menu is closed.

**Parameters** - Frame delta in milliseconds.

**Returns** - Return value ignored.

**Notes** - Asynchronous, bounded queue. Use Script.After/Every for scheduled work; never Sleep in a callback.

**Example**

```lua
Script.On('OnUpdate', 'update', function(dt) end)
Sleep(-1)
```

## OnWorldChanged {#onworldchanged}

```lua
callback(current, previous)
```

Reports changes to the loaded world's name.

**Parameters** - Current and previous world names; empty string means no world.

**Returns** - Return value ignored.

**Notes** - Asynchronous, observed on update; reconnecting to the same name without an intervening empty state may not emit a change.

**Example**

```lua
Script.On('OnWorldChanged', 'world', function(name, old) Log(name) end)
Sleep(-1)
```

## OnInput {#oninput}

```lua
callback(type, x, y, finger)
```

Observes GUI input messages passed to the engine.

**Parameters** - Numeric engine message type, message parameters x/y, finger or key parameter.

**Returns** - Return value ignored.

**Notes** - Asynchronous gameplay input observation after dispatch. Login, native text entry, developer-menu keyboard capture and background input are withheld, including the final submit key. Does not suppress input. Scripts can observe ordinary gameplay keys and receive text entered into their own UI; never enter credentials in a script-created form.

**Example**

```lua
Script.On('OnInput', 'input', function(kind, x, y, finger) end)
Sleep(-1)
```

## OnUI {#onui}

```lua
callback(id, event, value)
```

Reports changes to this script's retained controls.

**Parameters** - Control ID, event (click/change/close), edited value (string or number; boolean is 0/1).

**Returns** - Return value ignored.

**Notes** - UI.Get also reads current values. Main thread renders widgets; Lua handlers run on their owning worker.

**Example**

```lua
Script.On('OnUI', 'ui', function(id, event, value) Log(id .. ': ' .. event) end)
Sleep(-1)
```

## OnDialogResult {#ondialogresult}

```lua
callback(text)
```

Receives a submitted Client.ShowDialog result.

**Parameters** - Native action|dialog_return text, including buttonClicked and inputs.

**Returns** - Return value ignored.

**Notes** - Local dialogs do not send results to the server. Cancel/quick exit does not submit.

**Example**

```lua
Script.On('OnDialogResult', 'dialog', function(text) Log(text) end)
Sleep(-1)
```

## OnClientCommand {#onclientcommand}

```lua
callback(kind, target, success)
```

Reports completion of queued client edits.

**Parameters** - Command kind, target name (empty for dialogs), success as 1/0.

**Returns** - Return value ignored.

**Notes** - Accepted queue entries may fail if a world, avatar or entity disappears before execution.

**Example**

```lua
Script.On('OnClientCommand', 'result', function(kind, target, ok) Log(kind .. ': ' .. ok) end)
Sleep(-1)
```
