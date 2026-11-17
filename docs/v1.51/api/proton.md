# Proton

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Proton.<method>`. 21 methods.

## Proton.Create {#create}

```lua
Proton.Create(kind, id, properties)
```

Creates a real Proton entity rendered by the game.

**Parameters** - Kind: container, panel, text, button, image, item, checkbox or progress. ID uses 1..64 letters/digits/_/-. Properties: parent, x/y, width/height, scaleX/Y, alpha, visible, rotation, color, text, font (small/large), fontScale, clickable, enabled, modal (panels/containers block world interaction while visible); image: file, frameWidth/Height, frameX/Y, flipX/Y; item: itemID/count/frameType; checkbox: checked; progress: value 0..1.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. Maximum 128 native entities and 128 MiB of native image textures per script. Parent must already exist and belong to the same script. Positions are relative to the parent; alpha/scale are per entity. Colors use native 0xBBGGRRAA packing (alpha in the low byte).

**Example**

```lua
Proton.Create('panel', 'native', {x=60,y=100,width=300,height=160})
Proton.Create('text', 'title', {parent='native',x=15,y=15,text='Hello from Proton'})
Sleep(-1)
```

## Proton.Container {#container}

```lua
Proton.Container(id, properties)
```

Creates a native container. Invisible grouping entity.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Container('example', {x=50,y=100,width=300,height=180})
Sleep(-1)
```

## Proton.Panel {#panel}

```lua
Proton.Panel(id, properties)
```

Creates a native panel. Native game border and background.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Panel('example', {x=50,y=100,width=300,height=180})
Sleep(-1)
```

## Proton.Text {#text}

```lua
Proton.Text(id, properties)
```

Creates a native text. Native game font and color codes.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Text('example', {x=70,y=120,text='Native game text',fontScale=0.7})
Sleep(-1)
```

## Proton.Button {#button}

```lua
Proton.Button(id, properties)
```

Creates a native button. Native touch handler, button feedback and click events.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Button('example', {x=70,y=120,width=180,height=45,text='Native button'})
Sleep(-1)
```

## Proton.Image {#image}

```lua
Proton.Image(id, properties)
```

Creates a native image. Relative file asset; optional sprite dimensions and frame coordinates.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Image('example', {x=70,y=120,file='interface/large/cross.rttex'})
Sleep(-1)
```

## Proton.Item {#item}

```lua
Proton.Item(id, properties)
```

Creates a native item. itemID selects an inventory-style game icon; count and frameType are optional.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Item('example', {x=70,y=120,itemID=2,scaleX=1.5,scaleY=1.5})
Sleep(-1)
```

## Proton.Checkbox {#checkbox}

```lua
Proton.Checkbox(id, properties)
```

Creates a native checkbox. checked is boolean; emits change events.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Checkbox('example', {x=70,y=120,text='Enabled',checked=true})
Sleep(-1)
```

## Proton.Progress {#progress}

```lua
Proton.Progress(id, properties)
```

Creates a native progress. value is a fraction 0..1.

**Parameters** - ID and properties table; shorthand for Proton.Create.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Progress('example', {x=70,y=120,width=240,height=24,value=0.6})
Sleep(-1)
```

## Proton.Set {#set}

```lua
Proton.Set(id, properties)
```

Updates an owned native entity.

**Parameters** - Same presentation properties as Create; parent/clickable cannot change. recursive=true applies the update to owned descendants too.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. Use scale for text/images/items (item scaleX and scaleY must match); width/height resize panels, containers, buttons and progress bars. Explicit sets do not cancel running animations; call StopAnimation first.

**Example**

```lua
Proton.Set('native', {alpha=0.5,recursive=true})
```

## Proton.Get {#get}

```lua
Proton.Get(id)
```

Reads a snapshot of an owned entity.

**Parameters** - Owned ID.

**Returns** - Property table or nil; includes entityName and component names string.

**Notes** - Updated after game-thread processing. May be nil immediately after Create. Never returns an Entity pointer or mutable Variant reference.

**Example**

```lua
local panel = Proton.Get('native')
if panel then Log(panel.x) end
```

## Proton.Remove {#remove}

```lua
Proton.Remove(id)
```

Deletes an owned entity and its children.

**Parameters** - Owned ID.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities.

**Example**

```lua
Proton.Remove('native')
```

## Proton.Clear {#clear}

```lua
Proton.Clear()
```

Deletes all native entities owned by this script.

**Parameters** - No arguments.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. Does not remove the game's GUI or another script's entities.

**Example**

```lua
Proton.Clear()
```

## Proton.Animate {#animate}

```lua
Proton.Animate(id, options)
```

Animates a property using Proton InterpolateComponent.

**Parameters** - property: position (x,y), scale (scaleX,scaleY), alpha, rotation, size (width,height), frameX or frameY; duration default 300 ms, delay default 0, both at most 60000 ms. ease: linear/smooth/easeIn/easeOut/bounce. loop: once/repeat/pingpong. Optional recursive=true.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. One animation per property per entity; a replacement starts from its current value. Items do not rotate and require uniform scale. Scale animation is for images/items/text; size animation is for panels/containers/buttons/progress only. Bounce is unavailable for scale/size/sprite frames. Sprite targets must fit the image atlas. Completion emits OnProtonAnimation(id, property) for once animations.

**Example**

```lua
Proton.Animate('native', {property='position',x=240,y=100,duration=500,ease='smooth'})
Proton.Animate('native', {property='alpha',alpha=0.4,duration=800,loop='pingpong',recursive=true})
```

## Proton.StopAnimation {#stopanimation}

```lua
Proton.StopAnimation(id [, property])
```

Stops an owned entity's animation at its current value.

**Parameters** - ID and optional position/scale/alpha/rotation/size/frameX/frameY channel; omit channel to stop all.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. Cancels delayed animations too; looping animations run until stopped or the entity is removed.

**Example**

```lua
Proton.StopAnimation('native', 'alpha')
```

## Proton.Inspect {#inspect}

```lua
Proton.Inspect(entityName)
```

Inspects an existing game or script entity by its engine name.

**Parameters** - Actual entity name; use Proton.Get(id).entityName for owned entities.

**Returns** - Snapshot of supported entity presentation properties plus components as a 1-based array; nil if missing.

**Notes** - Reads under the engine mutex. Names may not be unique; no raw pointers, arbitrary component variables or engine function invocation are exposed.

**Example**

```lua
local node = Proton.Get('native')
if node then
    local details = Proton.Inspect(node.entityName)
    if details then for _, name in ipairs(details.components) do Log(name) end end
end
```

## Proton.SetComponent {#setcomponent}

```lua
Proton.SetComponent(id, component, properties)
```

Edits allowlisted component properties on owned native entities.

**Parameters** - TextRender: text/font/fontScale/color; RectRender: color/borderColor/width/height; OverlayRender: frameX/Y, flipX/Y; Button2D: enabled; ItemRender: itemID/count/frameType.

**Returns** - True if queued.

**Notes** - Queued for the game thread. True means accepted; OnProtonResult(id, operation, success, error) reports completion. IDs are local to the script; stopping it removes its native entities. Missing/unsupported components fail. Existing game entities are inspectable; component writes require script ownership.

**Example**

```lua
Proton.SetComponent('title', 'TextRender', {text='Updated native text',fontScale=0.8})
```

## Proton.DefineComponent {#definecomponent}

```lua
Proton.DefineComponent(name, definition)
```

Defines a reusable Lua component type for native Proton entities.

**Parameters** - Name: 1..64 letters/digits/_/-. Definition: optional onAdd(self), onUpdate(self, dtMS), onEvent(self,event,value), onRemove(self,reason), interval (default 16 ms; 1..60000).

**Returns** - True.

**Notes** - Definitions are local to the script; at most 64. Callbacks run on its worker with the existing instruction-time budget. Errors disable and detach the instance. Update dt is monotonic elapsed time capped at 250 ms. Native attachment and edits run on the game thread.

**Example**

```lua
Proton.DefineComponent('Pulse', {onAdd=function(self) self:Animate({property='alpha',alpha=0.4,duration=600,loop='pingpong'}) end})
Proton.Panel('card',{x=30,y=100,width=200,height=100})
Proton.AddComponent('card','Pulse')
Sleep(-1)
```

## Proton.AddComponent {#addcomponent}

```lua
Proton.AddComponent(id, name [, state])
```

Attaches a previously defined custom component to an owned native entity.

**Parameters** - Owned entity ID, defined component name, optional state table (shallow copied per instance).

**Returns** - Instance table if queued, false if the command queue is full.

**Notes** - At most 64 instances per script and 8 per entity; one instance of each name per entity. self.state holds custom data; self.enabled pauses update/input callbacks. self.attached becomes true on native acknowledgement. Methods: Get(), Set(properties), Animate(options), Remove(). Retain resources by owned IDs. onRemove runs for detach/entity deletion and attachment failure while the script is alive; shutdown cleanup does not execute Lua callbacks. Callbacks and lifecycle notifications use bounded event queues.

**Example**

```lua
local component=Proton.AddComponent('card','Pulse',{speed=2})
if component then component.state.speed=3 end
```

## Proton.GetComponent {#getcomponent}

```lua
Proton.GetComponent(id, name)
```

Gets the current script's custom component instance.

**Parameters** - Owned entity ID and custom component name.

**Returns** - Instance table, or nil if absent. Pending attachment/removal remains visible until acknowledged.

**Notes** - This is worker-local Lua state, never an engine pointer. Actual native names appear as LuaComponent|name in Proton.Inspect. Built-in engine components remain accessible through Inspect/SetComponent.

**Example**

```lua
local component=Proton.GetComponent('card','Pulse')
if component then component.enabled=false end
```

## Proton.RemoveComponent {#removecomponent}

```lua
Proton.RemoveComponent(id, name)
```

Detaches a custom component without deleting its entity or built-in components.

**Parameters** - Owned entity ID and custom component name.

**Returns** - True if queued, false if missing, already stopping or the command queue is full.

**Notes** - Only custom instances owned by this script can be detached. Generation checks prevent late commands/events from removing a replacement instance. Removing a component does not undo its edits or animations; onRemove can restore them. Entity deletion and script stop automatically remove native attachments.

**Example**

```lua
Proton.RemoveComponent('card','Pulse')
```
