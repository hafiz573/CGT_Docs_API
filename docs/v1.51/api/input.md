# Input

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

Accessed as `Input.<method>`. 2 methods.

## Input.GetTypes {#gettypes}

```lua
Input.GetTypes()
```

Returns named engine message type constants for OnInput.

**Parameters** - No arguments.

**Returns** - Table: PointerDown, PointerUp, PointerDrag, PointerMove, Character, Key.

**Notes** - Key messages carry the key in x and down/up as y=1/0. Pointer coordinates are logical screen pixels.

**Example**

```lua
local types = Input.GetTypes()
Script.On('OnInput', 'keys', function(kind, key, down)
    if kind == types.Key and down == 1 then Log(key) end
end)
Sleep(-1)
```

## Input.IsKeyDown {#iskeydown}

```lua
Input.IsKeyDown(code)
```

Checks a physical key without synthesizing game input.

**Parameters** - Windows virtual-key code 0..255.

**Returns** - Boolean.

**Notes** - Windows only; returns false outside the game foreground process, during login, native text entry or developer-menu keyboard capture, and on other platforms. Private-input protection remains active even if packet credential protection is disabled. Ordinary gameplay keys remain available. Prefer OnInput for portable game input handlers.

**Example**

```lua
local shift = Input.IsKeyDown(16)
```
