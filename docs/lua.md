# Lua standard library

> Text taken verbatim from the API reference embedded in the game binary (`libregrowtopia.so`, CreativeGrowtopia **V1.51**).

The Lua 5.4 standard functions available to scripts.

## Lua base

### os.time {#os-time}

```lua
os.time()
```

Read current Unix time in whole seconds.

**Parameters** - No arguments are used by this custom binding.

**Returns** - Integer seconds since the Unix epoch.

**Notes** - Only exposed os function. Date tables are not handled. Wall-clock time, not a millisecond animation timer.

**Example**

```lua
local t = os.time()
Sleep(1000)
Log("Seconds elapsed: " .. (os.time() - t))
```

### assert {#assert}

```lua
assert(value [, message])
```

Return the arguments if value is truthy; otherwise raise an error.

**Parameters** - value: any value. message: optional error text.

**Returns** - Supplied arguments on success.

**Example**

```lua
local ok = assert(CheckPath(10, 20), "No path")
Log(tostring(ok))
```

### error {#error}

```lua
error(message [, level=1])
```

Raise a Lua error.

**Parameters** - message: error value, normally text. level: optional location stack level.

**Returns** - Does not return normally.

**Example**

```lua
local ok, msg = pcall(function() error("Example error") end)
Log(tostring(msg))
```

### pairs {#pairs}

```lua
pairs(table)
```

Iterate all key/value pairs in unspecified order.

**Parameters** - table: Lua table.

**Returns** - Iterator triple for a generic for loop.

**Example**

```lua
for key, value in pairs(GetWorld()) do
    Log(tostring(key) .. "=" .. tostring(value))
end
```

### ipairs {#ipairs}

```lua
ipairs(table)
```

Iterate consecutive indices starting at 1, stopping at the first nil.

**Parameters** - table: sequence-style table.

**Returns** - Iterator triple.

**Notes** - Variant lists start at 0, so ipairs skips their event name. Use explicit indices or pairs for variants.

**Example**

```lua
for i, item in ipairs(GetInventory()) do Log(i .. ": " .. item.id) end
```

### next {#next}

```lua
next(table [, key])
```

Read the next key/value pair, or first pair if key is omitted.

**Parameters** - table: Lua table. key: existing key or nil.

**Returns** - Next key and value, or nil at the end.

**Notes** - Order is unspecified.

**Example**

```lua
local key, value = next({a=1, b=2})
Log(tostring(key) .. "=" .. tostring(value))
```

### tostring {#tostring}

```lua
tostring(value)
```

Convert a Lua value to display text.

**Parameters** - value: any value.

**Returns** - String.

**Example**

```lua
Log("Has path: " .. tostring(CheckPath(10, 20)))
```

### tonumber {#tonumber}

```lua
tonumber(value [, base])
```

Convert a number or numeric string to a number.

**Parameters** - value: number/string. base: optional integer 2..36 for integer strings.

**Returns** - Number or nil if conversion fails.

**Example**

```lua
Log(tostring(tonumber("ff", 16))) -- 255
```

### type {#type}

```lua
type(value)
```

Read a Lua type name.

**Parameters** - value: any value.

**Returns** - String: nil, boolean, number, string, table, function, etc.

**Example**

```lua
Log(type(GetLocal())) -- table
```

### pcall {#pcall}

```lua
pcall(function, ...)
```

Call a function while capturing Lua errors.

**Parameters** - function: callable; remaining arguments are passed through.

**Returns** - true plus results, or false plus the error.

**Example**

```lua
local ok, result = pcall(GetWorld)
if ok then Log(result.name) else Log(tostring(result)) end
```

### xpcall {#xpcall}

```lua
xpcall(function, errorHandler, ...)
```

Call with a custom error handler.

**Parameters** - function, errorHandler: functions. Remaining arguments are passed to function.

**Returns** - true plus results, or false plus the handled error.

**Example**

```lua
local ok, msg = xpcall(function() error("Oops") end, function(e)
    return "Handled: " .. tostring(e)
end)
Log(tostring(msg))
```

### select {#select}

```lua
select(index, ...)
```

Select a suffix of argument values, or count them with '#'.

**Parameters** - index: integer (negative counts from the end) or '#'.

**Returns** - Selected values, or argument count.

**Example**

```lua
Log(tostring(select("#", "a", "b", "c"))) -- 3
```

### _VERSION {#_version}

```lua
_VERSION
```

Read the runtime version. A constant, not a call.

**Parameters** - No call syntax.

**Returns** - String, normally Lua 5.4.

**Example**

```lua
Log(_VERSION)
```

## Math

### math.abs {#math-abs}

```lua
math.abs(x)
```

Absolute value.

**Parameters** - x: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.abs(-5))) -- 5
```

### math.acos {#math-acos}

```lua
math.acos(x)
```

Inverse cosine in radians.

**Parameters** - x: number in [-1,1].

**Returns** - Number.

**Example**

```lua
Log(tostring(math.acos(0)))
```

### math.asin {#math-asin}

```lua
math.asin(x)
```

Inverse sine in radians.

**Parameters** - x: number in [-1,1].

**Returns** - Number.

**Example**

```lua
Log(tostring(math.asin(1)))
```

### math.atan {#math-atan}

```lua
math.atan(y [, x=1])
```

Inverse tangent accounting for the quadrant.

**Parameters** - y,x: numbers.

**Returns** - Angle in radians.

**Example**

```lua
Log(tostring(math.atan(1, -1)))
```

### math.ceil {#math-ceil}

```lua
math.ceil(x)
```

Round upward to an integer when representable.

**Parameters** - x: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.ceil(2.1))) -- 3
```

### math.cos {#math-cos}

```lua
math.cos(x)
```

Cosine of an angle.

**Parameters** - x: radians.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.cos(0))) -- 1
```

### math.deg {#math-deg}

```lua
math.deg(radians)
```

Convert radians to degrees.

**Parameters** - radians: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.deg(math.pi))) -- 180
```

### math.exp {#math-exp}

```lua
math.exp(x)
```

Compute e to the power x.

**Parameters** - x: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.exp(1)))
```

### math.floor {#math-floor}

```lua
math.floor(x)
```

Round downward to an integer when representable.

**Parameters** - x: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.floor(GetLocal().pos.x / 32)))
```

### math.fmod {#math-fmod}

```lua
math.fmod(x, y)
```

Remainder using a quotient rounded toward zero.

**Parameters** - x,y: numbers; y must be nonzero.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.fmod(7, 3))) -- 1
```

### math.log {#math-log}

```lua
math.log(x [, base])
```

Natural logarithm, or logarithm in another base.

**Parameters** - x: positive number. base: optional positive number other than 1.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.log(100, 10))) -- 2
```

### math.max {#math-max}

```lua
math.max(x, ...)
```

Choose the largest argument.

**Parameters** - One or more comparable values, normally numbers.

**Returns** - Largest value.

**Example**

```lua
Log(tostring(math.max(1, 8, 3))) -- 8
```

### math.min {#math-min}

```lua
math.min(x, ...)
```

Choose the smallest argument.

**Parameters** - One or more comparable values, normally numbers.

**Returns** - Smallest value.

**Example**

```lua
Log(tostring(math.min(1, 8, 3))) -- 1
```

### math.modf {#math-modf}

```lua
math.modf(x)
```

Split integral and fractional parts.

**Parameters** - x: number.

**Returns** - Integral part, fractional part.

**Example**

```lua
local whole, fraction = math.modf(3.25)
Log(whole .. " + " .. fraction)
```

### math.rad {#math-rad}

```lua
math.rad(degrees)
```

Convert degrees to radians.

**Parameters** - degrees: number.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.rad(180)))
```

### math.random {#math-random}

```lua
math.random([lower [, upper]])
```

Generate a pseudorandom number.

**Parameters** - No arguments: float [0,1). One positive argument: integer 1..upper. Two arguments: inclusive integer bounds. A single 0: full-range random integer.

**Returns** - Number or integer.

**Notes** - Generator state belongs to this Lua state.

**Example**

```lua
Log(tostring(math.random(1, 6)))
```

### math.randomseed {#math-randomseed}

```lua
math.randomseed([x [, y]])
```

Seed this script state's random generator.

**Parameters** - x,y: optional integers; no arguments choose a seed automatically.

**Returns** - The two seed components used.

**Example**

```lua
math.randomseed(1234)
Log(tostring(math.random()))
```

### math.sin {#math-sin}

```lua
math.sin(x)
```

Sine of an angle.

**Parameters** - x: radians.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.sin(math.pi / 2))) -- 1
```

### math.sqrt {#math-sqrt}

```lua
math.sqrt(x)
```

Square root.

**Parameters** - x: nonnegative number for a real result.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.sqrt(81))) -- 9
```

### math.tan {#math-tan}

```lua
math.tan(x)
```

Tangent of an angle.

**Parameters** - x: radians.

**Returns** - Number.

**Example**

```lua
Log(tostring(math.tan(math.pi / 4)))
```

### math.tointeger {#math-tointeger}

```lua
math.tointeger(value)
```

Convert to an exact Lua integer if possible.

**Parameters** - value: number or convertible numeric string.

**Returns** - Integer or nil.

**Example**

```lua
Log(tostring(math.tointeger(3.0))) -- 3
```

### math.type {#math-type}

```lua
math.type(value)
```

Distinguish Lua integer and floating-point numbers.

**Parameters** - value: any value.

**Returns** - 'integer', 'float', or nil for non-numbers.

**Example**

```lua
Log(tostring(math.type(3))) -- integer
```

### math.ult {#math-ult}

```lua
math.ult(a, b)
```

Compare integers as unsigned values.

**Parameters** - a,b: integers.

**Returns** - Boolean.

**Example**

```lua
Log(tostring(math.ult(0, -1))) -- true
```

### math constants {#math-constants}

```lua
math.pi / math.huge / math.maxinteger / math.mininteger
```

Read pi, positive infinity, and integer limits. These are constants.

**Parameters** - No call syntax.

**Returns** - Numbers or integers.

**Notes** - Deprecated compatibility functions such as math.pow and math.atan2 are not enabled by the default bundled configuration; use x^y and math.atan(y,x).

**Example**

```lua
Log(tostring(math.pi))
Log(tostring(math.maxinteger))
```

## Strings

### string.byte {#string-byte}

```lua
string.byte(s [, first=1 [, last=first]])
```

Read numeric byte values.

**Parameters** - s: string. first,last: inclusive byte indices; negative indices count from the end.

**Returns** - One integer per selected byte.

**Notes** - Indices start at 1; bytes are not Unicode characters.

**Example**

```lua
Log(tostring(string.byte("ABC", 2))) -- 66
```

### string.char {#string-char}

```lua
string.char(...)
```

Build a string from bytes.

**Parameters** - Zero or more integers 0..255.

**Returns** - String.

**Example**

```lua
Log(string.char(65, 66, 67)) -- ABC
```

### string.dump {#string-dump}

```lua
string.dump(function [, strip=false])
```

Serialize a Lua function to bytecode.

**Parameters** - function: Lua function, not a C/engine function. strip: omit debug information.

**Returns** - Binary string.

**Notes** - The sandbox has no load function to execute the resulting bytecode.

**Example**

```lua
local bytes = string.dump(function() return 1 end, true)
Log("Bytecode bytes: " .. #bytes)
```

### string.find {#string-find}

```lua
string.find(s, pattern [, start=1 [, plain=false]])
```

Find a pattern or plain substring.

**Parameters** - s,pattern: strings. start: byte index. plain=true disables patterns.

**Returns** - Start/end byte indices plus captures, or nil.

**Notes** - Lua patterns are not regexes: %d digits, %a letters, %s whitespace, () captures, ^/$ anchors, . any byte.

**Example**

```lua
local a, b = string.find("hello world", "world", 1, true)
Log(tostring(a) .. ":" .. tostring(b))
```

### string.format {#string-format}

```lua
string.format(format, ...)
```

Build formatted text.

**Parameters** - format: directives such as %s, %d, %.2f; %% for a literal percent. Values follow.

**Returns** - String.

**Example**

```lua
Log(string.format("Item %d x%d", 2, 10))
```

### string.gmatch {#string-gmatch}

```lua
string.gmatch(s, pattern [, start=1])
```

Iterate successive pattern matches.

**Parameters** - s,pattern: strings. start: optional byte index.

**Returns** - Iterator returning captures or whole matches.

**Notes** - Patterns use Lua syntax, not regex. See string.find.

**Example**

```lua
for word in string.gmatch("one two", "%a+") do Log(word) end
```

### string.gsub {#string-gsub}

```lua
string.gsub(s, pattern, replacement [, limit])
```

Replace pattern matches.

**Parameters** - replacement: string, lookup table or callback. limit: optional maximum replacements.

**Returns** - New string, replacement count.

**Notes** - Patterns use Lua syntax. Replacement strings can refer to captures using %1, etc.

**Example**

```lua
local text, count = string.gsub("a-b-c", "-", " ")
Log(text .. " (" .. count .. ")")
```

### string.len {#string-len}

```lua
string.len(s)
```

Count bytes, not Unicode characters.

**Parameters** - s: string.

**Returns** - Integer byte length; equivalent to #s.

**Example**

```lua
Log(tostring(string.len("hello"))) -- 5
```

### string.lower {#string-lower}

```lua
string.lower(s)
```

Convert letters to lowercase using the C locale.

**Parameters** - s: string.

**Returns** - String.

**Example**

```lua
Log(string.lower("DIRT")) -- dirt
```

### string.match {#string-match}

```lua
string.match(s, pattern [, start=1])
```

Read the first pattern match or captures.

**Parameters** - s,pattern: strings. start: optional byte index.

**Returns** - Captures or whole match; nil if absent.

**Notes** - Patterns use Lua syntax, not regex. See string.find.

**Example**

```lua
Log(tostring(string.match("item=42", "item=(%d+)")))
```

### string.pack {#string-pack}

```lua
string.pack(format, ...)
```

Encode binary data with a packing format.

**Parameters** - format: e.g. &lt; little endian, I2 two-byte unsigned integer, f float, cN fixed bytes. Values follow.

**Returns** - Binary string.

**Notes** - Other useful options: > big endian, iN signed integer, d double, z zero-terminated bytes, sN length-prefixed bytes, x padding. These do not define the game's packet layout for you.

**Example**

```lua
local bytes = string.pack("<I2I2", 2, 10)
Log("Packed bytes: " .. #bytes)
```

### string.packsize {#string-packsize}

```lua
string.packsize(format)
```

Calculate a fixed packing format's byte size.

**Parameters** - format: fixed-size format; no variable-length z or s options.

**Returns** - Integer size.

**Notes** - See string.pack for options.

**Example**

```lua
Log(tostring(string.packsize("<I2I2"))) -- 4
```

### string.rep {#string-rep}

```lua
string.rep(s, count [, separator=""])
```

Repeat a string.

**Parameters** - s: string. count: integer. separator: optional string between copies.

**Returns** - String.

**Example**

```lua
Log(string.rep("hi", 3, " "))
```

### string.reverse {#string-reverse}

```lua
string.reverse(s)
```

Reverse a string byte by byte.

**Parameters** - s: string.

**Returns** - String.

**Notes** - Not Unicode-aware.

**Example**

```lua
Log(string.reverse("abc")) -- cba
```

### string.sub {#string-sub}

```lua
string.sub(s, first [, last=-1])
```

Extract an inclusive byte range.

**Parameters** - first,last: indices; negative indices count from the end.

**Returns** - String.

**Notes** - Indices start at 1.

**Example**

```lua
Log(string.sub("hello", 2, 4)) -- ell
```

### string.unpack {#string-unpack}

```lua
string.unpack(format, data [, position=1])
```

Decode binary values.

**Parameters** - format: Lua packing format. data: binary string. position: starting byte index.

**Returns** - Decoded values followed by the next unread byte index.

**Notes** - See string.pack for options.

**Example**

```lua
local value, nextByte = string.unpack("<I2", string.pack("<I2", 123))
Log(value .. " next=" .. nextByte)
```

### string.upper {#string-upper}

```lua
string.upper(s)
```

Convert letters to uppercase using the C locale.

**Parameters** - s: string.

**Returns** - String.

**Example**

```lua
Log(string.upper("dirt")) -- DIRT
```

## Tables

### table.concat {#table-concat}

```lua
table.concat(list [, separator="" [, first=1 [, last=#list]]])
```

Join a range of string/number entries.

**Parameters** - list: sequence. separator: optional text; first/last: inclusive integer indices.

**Returns** - String.

**Notes** - Specify explicit bounds for zero-based protocol tables.

**Example**

```lua
Log(table.concat({"one", "two"}, ", "))
```

### table.insert {#table-insert}

```lua
table.insert(list, [position,] value)
```

Insert a sequence entry, shifting later entries up.

**Parameters** - position: optional index, default #list+1. value: any value.

**Returns** - No values.

**Notes** - Ordinary sequences are 1-based.

**Example**

```lua
local list = {"a"}
table.insert(list, "b")
Log(table.concat(list, ","))
```

### table.move {#table-move}

```lua
table.move(source, first, last, target [, destination=source])
```

Copy an integer-indexed range, allowing overlap.

**Parameters** - source/destination: tables. first/last: source range. target: first destination index.

**Returns** - Destination table.

**Example**

```lua
local list = {1, 2, 3}
local copy = table.move(list, 1, #list, 1, {})
Log(tostring(copy[2]))
```

### table.pack {#table-pack}

```lua
table.pack(...)
```

Store arguments and their exact count, including nils.

**Parameters** - Any values.

**Returns** - Table with integer entries and n=argument count.

**Notes** - Use n instead of # when nils may occur.

**Example**

```lua
local packed = table.pack("a", nil, "c")
Log(tostring(packed.n)) -- 3
```

### table.remove {#table-remove}

```lua
table.remove(list [, position=#list])
```

Remove one sequence entry, shifting later entries down.

**Parameters** - position: optional integer, default last entry.

**Returns** - Removed value.

**Notes** - Ordinary sequences are 1-based.

**Example**

```lua
local list = {"a", "b"}
Log(table.remove(list)) -- b
```

### table.sort {#table-sort}

```lua
table.sort(list [, less])
```

Sort a sequence in place.

**Parameters** - less: optional function(a,b) returning true if a belongs before b.

**Returns** - No values.

**Notes** - Comparator must define a consistent strict ordering.

**Example**

```lua
local list = {3, 1, 2}
table.sort(list)
Log(table.concat(list, ","))
```

### table.unpack {#table-unpack}

```lua
table.unpack(list [, first=1 [, last=#list]])
```

Return table entries as separate values.

**Parameters** - first/last: inclusive integer range.

**Returns** - One result per selected entry.

**Notes** - Use an explicit first=0 and last for variant lists.

**Example**

```lua
local a, b = table.unpack({10, 20})
Log(a .. "," .. b)
```
