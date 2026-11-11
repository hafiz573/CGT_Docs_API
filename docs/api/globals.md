# Global functions

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

The 33 functions registered directly in the script global table, grouped as in the game's own reference.

## Logging

### Log {#log}

```lua
Log(message)
```

Append a timestamped message with this script's ID and filename to the developer-menu Logs tab.

**Parameters** - message: string.

**Returns** - No values.

**Notes** - Numbers are accepted through Lua's string conversion.

**Example**

```lua
Log("Script started")
```

### LogMsg {#logmsg}

```lua
LogMsg(message)
```

Write a [LUA] message through engine logging.

**Parameters** - message: string.

**Returns** - No values.

**Notes** - A separate destination from the developer-menu Log buffer.

**Example**

```lua
LogMsg("Engine log entry")
```

### LogToConsole {#logtoconsole}

```lua
LogToConsole(message)
```

Print into the in-game console with a Lua prefix.

**Parameters** - message: string; game color codes are supported.

**Returns** - No values.

**Example**

```lua
LogToConsole("`2Hello from Lua!``")
```

### print {#print}

```lua
print(message)
```

Write a [Lua] line to process stdout.

**Parameters** - message: string. Use tostring for other types.

**Returns** - No values.

**Notes** - Custom print: only the first argument is printed. Use Log for a visible developer-menu message.

**Example**

```lua
print("Value: " .. tostring(42))
```

## Scripts and hooks

### Sleep {#sleep}

```lua
Sleep(milliseconds)
```

Sleep this worker while continuing to process its hooks.

**Parameters** - milliseconds: integer. 0 services hooks without a timed wait; -1 waits until stopped; below -1 returns immediately.

**Returns** - No values; cancellation raises the internal Killed error.

**Notes** - Alias: sleep. Do not sleep while holding an explicit lock, or inside a callback the main thread is waiting on.

**Example**

```lua
Log("Before")
Sleep(1000)
Log("One second later")
```

### sleep {#sleep-2}

```lua
sleep(milliseconds)
```

Lowercase alias of Sleep.

**Parameters** - Same millisecond rules as Sleep, including -1 for persistent scripts.

**Returns** - No values.

**Notes** - See Sleep for callback and locking constraints.

**Example**

```lua
sleep(250)
Log("A quarter second later")
```

### RunThread {#runthread}

```lua
RunThread(functionOrSource [, name])
```

Start another Lua task on its own worker thread without stalling the current script or gameplay.

**Parameters** - functionOrSource: a Lua function, or Lua source text up to 1 MiB. name: optional display name, at most 80 bytes.

**Returns** - True if queued; false if the queue is full or the script is stopping. Invalid captured values return false and an error message.

**Notes** - The task starts on the next game update in a separate sandboxed Lua state and appears as its own script in the Scripts tab. A function receives copies of captured nil, boolean, number and string values; tables, functions and userdata cannot be captured. Globals resolve to the new sandbox. Source text has no access to the caller's locals. The task can use Sleep and MakeRequest and survives the caller returning; stop it separately or use Stop All. No shared Lua state or direct game-thread access. Browser builds permit four active scripts; tasks started through RunThread permit twelve active scripts on native builds. Unavailable inside hooks/callbacks.

**Example**

```lua
local url = "https://growtopiagame.com/detail"
local queued = RunThread(function()
    local response = MakeRequest(url)
    Log("Background request status: " .. response.status)
end, "Online count")
Log("Task queued: " .. tostring(queued))
```

### KillMe {#killme}

```lua
KillMe()
```

Request cancellation of this script.

**Parameters** - No arguments.

**Returns** - No values.

**Notes** - Cancellation is checked by the instruction hook and sleeping code. It is not an immediate exit at this exact call; return afterward.

**Example**

```lua
Log("Stopping")
KillMe()
return
```

### lock {#lock}

```lua
lock()
```

Acquire the engine base mutex for an atomic group of operations.

**Parameters** - No arguments. Nested calls must be balanced.

**Returns** - No values.

**Notes** - Game APIs already lock internally. Use explicit locking only when several calls must see the same state. Never sleep or wait while holding the lock.

**Example**

```lua
lock()
local me = GetLocal()
local info = GetPlayerInfo()
unlock()
Log(me.name .. " has " .. info.gems .. " gems")
```

### unlock {#unlock}

```lua
unlock()
```

Release one explicit base-mutex lock.

**Parameters** - Requires one matching earlier lock().

**Returns** - No values.

**Notes** - Do not unlock without ownership. Normal script return or a script-ending error also releases tracked outstanding locks.

**Example**

```lua
lock()
local me = GetLocal()
unlock()
Log(me.name)
```

### AddHook {#addhook}

```lua
AddHook(eventName, filter, callback)
```

Register a callback for an engine event. Multiple scripts/callbacks can subscribe.

**Parameters** - eventName: documented case-sensitive hook name. filter: required handler name string. callback: function receiving the event arguments.

**Returns** - Callback reference ID.

**Notes** - filter names the handler; inspect event arguments inside the callback. Script.Off(event, filter) removes it; registering the same event/name replaces it. Keep the script alive with Sleep(-1). Only a true boolean suppresses packet/variant processing.

**Example**

```lua
AddHook("OnVariant", "dialogs", function(v)
    if v[0] == "OnDialogRequest" then Log(v[1]) end
    return false
end)
Sleep(-1)
```

## Players and inventory

### GetLocal {#getlocal}

```lua
GetLocal()
```

Read the local avatar snapshot.

**Parameters** - No arguments.

**Returns** - Table: pos={x,y}, posX, posY, name, isleft, netid/netID, userid/userID, country, invisible, mstate, smstate. Positions are world pixels.

**Notes** - With game logic but no avatar: IDs -1, zero position, empty name and false flags. Missing game logic raises an error. mstate is the super-mod flag; smstate is the mod flag in this binding.

**Example**

```lua
local me = GetLocal()
if me.netid ~= -1 then
    Log(string.format("%s: %.1f, %.1f", me.name, me.pos.x, me.pos.y))
end
```

### GetPlayer {#getplayer}

```lua
GetPlayer(netID)
```

Look up an avatar by network ID.

**Parameters** - netID: integer, not persistent user ID.

**Returns** - Table: pos={x,y}, name, isleft, netid, userid, country, invisible, mstate, smstate. Nil if not found.

**Notes** - No posX/posY/netID/userID aliases here. mstate=super-mod; smstate=mod. Missing game logic raises an error.

**Example**

```lua
local player = GetPlayer(GetLocal().netid)
if player then Log(player.name) end
```

### GetPlayerInfo {#getplayerinfo}

```lua
GetPlayerInfo()
```

Read local currency and backpack metadata.

**Parameters** - No arguments.

**Returns** - Table: gems; backpack={priority={itemID1,itemID2,itemID3,itemID4}, size, selected}. priority is 1-based.

**Notes** - Only the first four quick slots are included. With no game logic returns zero/default values and selected=-1.

**Example**

```lua
local info = GetPlayerInfo()
Log("Gems: " .. info.gems)
Log("Selected: " .. info.backpack.selected)
```

### GetInventory {#getinventory}

```lua
GetInventory()
```

Read inventory entries as a snapshot.

**Parameters** - No arguments.

**Returns** - 1-based list of {id=itemID, amount=count, flags=inventoryFlags} tables.

**Notes** - Requires game logic. Resolve names with GetItemInfo(id).

**Example**

```lua
for _, item in ipairs(GetInventory()) do
    Log(GetItemInfo(item.id).name .. " x" .. item.amount)
end
```

### SetItemSelected {#setitemselected}

```lua
SetItemSelected(itemID)
```

Select an inventory item through the client's active-item setter.

**Parameters** - itemID: integer item definition ID.

**Returns** - No values.

**Notes** - Does nothing if game logic is absent. Normal client selection rules apply.

**Example**

```lua
SetItemSelected(18) -- Fist
```

## World and items

### GetWorld {#getworld}

```lua
GetWorld()
```

Read current world metadata.

**Parameters** - No arguments.

**Returns** - Table: name, width, height, tilecount, objectcount, lastoid. Dimensions are in tiles; lastoid=nextObjectID-1.

**Notes** - Requires a loaded world. Does not return lists of tiles, players or objects.

**Example**

```lua
local w = GetWorld()
Log(string.format("%s: %d x %d", w.name, w.width, w.height))
```

### GetTile {#gettile}

```lua
GetTile(tileX, tileY)
```

Read one tile snapshot.

**Parameters** - tileX,tileY: zero-based integer tile coordinates.

**Returns** - Table: fg, bg, collidable, x, y, coltype, locktile, flags. extra is nil, so that key is absent.

**Notes** - Raises an error outside a world or out of bounds. Tile extra data is not exposed. Editing the result does not edit the map.

**Example**

```lua
local p = GetLocal().pos
local tile = GetTile(math.floor(p.x / 32), math.floor(p.y / 32))
Log("FG=" .. tile.fg .. " BG=" .. tile.bg)
```

### GetItemInfo {#getiteminfo}

```lua
GetItemInfo(itemIDOrName)
```

Look up one definition by integer ID or name.

**Parameters** - itemIDOrName: integer or string.

**Returns** - Table: id, name, filename, rarity, breakhit, growtime, type, coltype, clothingtype, visualstyle, texturex, texturey, flags.

**Notes** - Unknown items return a Blank table with id=0, not nil. Requires loaded definitions. Enum/bitmask values are raw client values.

**Example**

```lua
local item = GetItemInfo(2)
Log(item.name .. ": " .. item.breakhit .. " break hits")
Log("Dirt ID: " .. GetItemInfo("Dirt").id)
```

### GetItemInfoList {#getiteminfolist}

```lua
GetItemInfoList()
```

Read all positive-ID definitions.

**Parameters** - No arguments.

**Returns** - 1-based list with the same item-info fields as GetItemInfo, including breakhit.

**Notes** - Requires definitions and may allocate a large table. The engine lock is released before returning. Prefer GetItemInfo when only a few definitions are needed.

**Example**

```lua
local items = GetItemInfoList()
Log("Definitions: " .. #items)
-- Let this short script finish to release its locks.
```

### HashString {#hashstring}

```lua
HashString(text)
```

Compute the engine's 32-bit string hash.

**Parameters** - text: string; embedded zero bytes are included.

**Returns** - Unsigned 32-bit hash as a Lua integer.

**Notes** - Resource/protocol hash, not a cryptographic hash.

**Example**

```lua
Log("Hash: " .. HashString("OnConsoleMessage"))
```

## Movement

### SetLocalPos {#setlocalpos}

```lua
SetLocalPos(x, y)
```

Assign the local avatar position immediately.

**Parameters** - x,y: integer world-pixel coordinates.

**Returns** - No values.

**Notes** - No pathfinding or collision checking. Normal network updates may report the position. Missing avatar does nothing; missing game logic raises an error.

**Example**

```lua
local p = GetLocal().pos
SetLocalPos(math.floor(p.x + 32), math.floor(p.y))
```

### WalkTo {#walkto}

```lua
WalkTo(x, y [, milliseconds=250])
```

Move by directly changing each coordinate in steps of up to 100 world pixels.

**Parameters** - x,y: numeric world-pixel target. milliseconds: nonnegative integer delay between steps, default 250.

**Returns** - No values; finishes on arrival or after at most 999 iterations.

**Notes** - NOT collision-aware walking; can move diagonally through tiles. Blocks this script between steps while servicing hooks. Requires avatar and map.

**Example**

```lua
local p = GetLocal().pos
WalkTo(p.x + 64, p.y, 50)
```

### CheckPath {#checkpath}

```lua
CheckPath(tileX, tileY)
```

Check whether the avatar can walk and jump to a standing position near the target.

**Parameters** - tileX,tileY: integer tile target.

**Returns** - Boolean path availability.

**Notes** - Does not move the avatar. Requires avatar/map and in-bounds coordinates. Avoids hazardous tiles.

**Example**

```lua
if CheckPath(10, 20) then Log("A path exists") end
```

### FindPath {#findpath}

```lua
FindPath(tileX, tileY [, milliseconds=5])
```

Walk and jump toward a reachable standing position near the target.

**Parameters** - tileX,tileY: integer tile target. milliseconds: accepted for compatibility but currently unused.

**Returns** - No values; queues work, does not return a path or wait for arrival.

**Notes** - Replans if movement stalls. Requires a loaded world. CheckPath can be used first.

**Example**

```lua
if CheckPath(10, 20) then FindPath(10, 20) end
```

### FlyPath {#flypath}

```lua
FlyPath(tileX, tileY [, speed=160])
```

Fly along a clear route through open space, without walking or jump animations.

**Parameters** - tileX,tileY: integer tile target. speed: optional world pixels per second, from 16 to 9999.

**Returns** - No values; queues movement through the normal avatar packet sender.

**Notes** - Uses a full-avatar collision and hazard check. The existing movement sender limits packets to one every 200 ms. Stops if no clear route is found or the server corrects position. High speeds can exceed server movement limits.

**Example**

```lua
FlyPath(68, 51, 120)
```

## Network and variants

### MakeRequest {#makerequest}

```lua
MakeRequest(url [, method='GET' [, headers={} [, content='' [, timeout_milliseconds=10000]]]])
```

Perform an isolated HTTP/HTTPS request and return its response.

**Parameters** - url: absolute ASCII HTTP(S) URL; percent-encode other characters. method: GET, HEAD, POST, PUT, PATCH, DELETE or OPTIONS (case-insensitive). headers: string-to-string table. content: binary-safe string, up to 1 MiB; GET/HEAD require an empty body. timeout: integer 1..60000 ms.

**Returns** - HTTPResponse table: status (HTTP code, or 0 without a response), error (transport failure or HTTP failure), method, content (binary-safe string), errorMessage.

**Notes** - Waits only on the Lua worker and releases explicitly held game locks. Unavailable inside hooks/callbacks. Four concurrent requests maximum; response limit 4 MiB. No automatic redirects, cookies, game login tokens or operating-system authentication. Explicit Authorization headers are allowed; transport-controlled headers are rejected. HTML5 requires server CORS permission and obeys browser mixed-content rules; browser redirects return an error. HTTPS verifies certificates. Credential protection defaults to on for every script, even without MakeRequest. Developer Menu > Misc > Disable Credential Protection exposes sensitive OnSendPacket, OnReceivePacket and OnVariant payloads only after confirmation, for this session. Uncheck it to restore filtering, including queued sensitive hooks. Data already read by a script cannot be revoked. Private native input/dialog results and HTTP transport isolation remain protected; script-visible data can be uploaded. Stopping a script cancels its wait. HTTP 4xx/5xx responses retain their body. Do not use with untrusted scripts.

**Example**

```lua
local r = MakeRequest('https://growtopiagame.com/detail', 'GET')
if r.error then
    Log('HTTP error: ' .. r.status .. ' ' .. r.errorMessage)
else
    local online = r.content:match('"online_user":"(%d+)"')
    Log('Current users online: ' .. (online or 'unknown'))
end
```

### SendPacket {#sendpacket}

```lua
SendPacket(messageType, text)
```

Send a text packet over the engine network connection.

**Parameters** - messageType: integer eNetMessageType, commonly 2=GenericText or 3=GameMessage. text: protocol string.

**Returns** - No values.

**Notes** - Requires a connected peer for delivery. Script-originated sends do not recursively invoke OnSendPacket. Unlike SendVariantList, this is a network call.

**Example**

```lua
SendPacket(2, "action|input\n|text|Hello from Lua")
```

### SendPacketRaw {#sendpacketraw}

```lua
SendPacketRaw(sendToClient, packet)
```

Build and send a binary GameUpdatePacket.

**Parameters** - sendToClient: required boolean. packet: table with type, dropped, netid, snetid, state, value, x, y, xspeed, yspeed, px, py, padding1, padding2, padding4, extrasize. Missing fields become 0.

**Returns** - No values.

**Notes** - sendToClient must be false. flags overrides dropped when provided; state is not a flags alias. Extra bytes are unsupported, extrasize must be zero, and the extended-data flag is cleared. Non-finite coordinates are rejected.

**Example**

```lua
local me = GetLocal()
SendPacketRaw(false, {type=0, netid=me.netid, x=me.pos.x, y=me.pos.y, extrasize=0})
```

### SendVariantList {#sendvariantlist}

```lua
SendVariantList(variants [, netID=-1 [, delayMS=0]])
```

Dispatch a local function/variant event. Does not send it to the server.

**Parameters** - variants: numeric indices 0.. or keys v0..v11, numeric indices take precedence. Values: integers, numbers, strings or vector tables. Vector2: {[0]=x,[1]=y} or {x=x,y=y}; Vector3 adds [2]=z or z=z. [0]=function name. netID=-1 targets game logic; otherwise targets an avatar component. delayMS>=0 schedules; -1 invokes game logic immediately.

**Returns** - No values.

**Notes** - Vector components must be finite numbers. Booleans are not accepted. Missing game logic errors; unknown avatar targets do nothing. Do not use other negative delays.

**Example**

```lua
SendVariantList({
    [0] = "OnTalkBubble", [1] = GetLocal().netid,
    [2] = "This bubble is local", [3] = 0, [4] = 1
}, -1, 0)
```

### SendVariant {#sendvariant}

```lua
SendVariant(variants [, netID=-1 [, delayMS=0]])
```

Alias of SendVariantList, dispatching locally.

**Parameters** - Same table, target and delay rules as SendVariantList.

**Returns** - No values.

**Notes** - The name does not imply network transmission.

**Example**

```lua
SendVariant({[0]="OnTextOverlay", [1]="Local overlay"})
```

## Client

### SetFPSLimit {#setfpslimit}

```lua
SetFPSLimit(fps)
```

Set the client's FPS limit through the native engine limiter.

**Parameters** - fps: integer 0..1000; 0 removes the FPS limit.

**Returns** - No values.

**Notes** - Thread safe. Applied through the platform message queue. Does not save the Options setting or restore the previous limit when the script stops; platform/vsync limits still apply.

**Example**

```lua
SetFPSLimit(144) -- cap at 144 FPS
-- SetFPSLimit(0) -- unlimited
```

### EditToggle {#edittoggle}

```lua
EditToggle(toggleName, enabled)
```

Set an allowed Developer Menu > Misc checkbox.

**Parameters** - toggleName: exact, case-sensitive label: Tile Prediction, Ghost Fly, Enable Frame Counter, VSync (native Windows only), or Indexed sprite rendering. enabled: boolean true or false; exactly two arguments.

**Returns** - Boolean: true if the change was queued; false for unknown, unavailable or forbidden toggles. Invalid argument types raise a Lua error.

**Notes** - Applied on the next game update, even if the script has finished or the menu is closed. Thread safe; repeated writes before an update use the latest value per checkbox. Changes are session-wide and are not automatically restored when the script stops. Disable Credential Protection is deliberately unsupported for either value; no security confirmation can be bypassed.

**Example**

```lua
assert(EditToggle('Ghost Fly', true))
assert(EditToggle('Tile Prediction', false))
-- EditToggle('Ghost Fly', false) -- turn it off
-- EditToggle('Disable Credential Protection', true) returns false
```
