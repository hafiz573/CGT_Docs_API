# Structs

Table shapes returned by the API, recovered from the binary (the field names and types are the ones the engine actually writes).

## Player

A player (local or remote). `pos` is a nested `{x, y}` table. Returned by [`GetLocal`](/api/globals#getlocal).

| field | type |
|-------|------|
| `pos` | table `{x, y}` |
| `posX` | `number` |
| `posY` | `number` |
| `name` | `string` |
| `isleft` | `boolean` |
| `netid` | `integer` |
| `netID` | `integer` |
| `userid` | `integer` |
| `userID` | `integer` |
| `country` | `string` |
| `invisible` | `boolean` |
| `mstate` | `boolean` |
| `smstate` | `boolean` |

## LocalState

The local player's physics / movement state. Returned by [`GetLocalState`](/api/client#getlocalstate).

| field | type |
|-------|------|
| `velocityX` | `number` |
| `velocityY` | `number` |
| `gravity` | `number` |
| `drag` | `number` |
| `acceleration` | `number` |
| `facesLeft` | `boolean` |
| `invisible` | `boolean` |
| `onGround` | `boolean` |
| `name` | `string` |

## PlayerInfo

Account-level info for the local player. Returned by [`GetPlayerInfo`](/api/globals#getplayerinfo).

| field | type |
|-------|------|
| `gems` | `integer` |
| `size` | `integer` |
| `selected` | `integer` |

## World

The current world. Returned by [`GetWorld`](/api/globals#getworld).

| field | type |
|-------|------|
| `name` | `string` |
| `width` | `integer` |
| `height` | `integer` |
| `tilecount` | `integer` |
| `objectcount` | `integer` |
| `lastoid` | `integer` |

## Tile

A single tile from `GetTile(x, y)`. Returned by [`GetTile`](/api/globals#gettile).

| field | type |
|-------|------|
| `fg` | `integer` |
| `bg` | `integer` |
| `collidable` | `boolean` |
| `x` | `integer` |
| `y` | `integer` |
| `coltype` | `integer` |
| `locktile` | `integer` |
| `flags` | `integer` |
| `extra` | `any` |

## TileShort

A compact tile entry from the `GetTiles` array. Returned by [`GetTiles`](/api/client#gettiles).

| field | type |
|-------|------|
| `x` | `integer` |
| `y` | `integer` |
| `fg` | `integer` |
| `bg` | `integer` |
| `flags` | `integer` |

## ItemInfo

Item metadata (also each element of `GetItemInfoList`). Returned by [`GetItemInfo`](/api/globals#getiteminfo).

| field | type |
|-------|------|
| `id` | `integer` |
| `name` | `string` |
| `filename` | `string` |
| `rarity` | `integer` |
| `breakhit` | `integer` |
| `growtime` | `integer` |
| `type` | `integer` |
| `coltype` | `integer` |
| `clothingtype` | `integer` |
| `visualstyle` | `integer` |
| `texturex` | `integer` |
| `texturey` | `integer` |
| `flags` | `integer` |

## InventoryItem

One inventory slot from the `GetInventory` array. Returned by [`GetInventory`](/api/globals#getinventory).

| field | type |
|-------|------|
| `id` | `integer` |
| `amount` | `integer` |
| `flags` | `integer` |

## Object

One world object from the `GetObjects` array. Returned by [`GetObjects`](/api/client#getobjects).

| field | type |
|-------|------|
| `id` | `integer` |
| `x` | `number` |
| `y` | `number` |
| `amount` | `integer` |
| `flags` | `integer` |
| `oid` | `integer` |

## Settings

Game settings. Returned by [`GetSettings`](/api/client#getsettings).

| field | type |
|-------|------|
| `musicVolume` | `number` |
| `frameCounter` | `boolean` |

## Camera

The render camera. Returned by [`GetCamera`](/api/client#getcamera).

| field | type |
|-------|------|
| `x` | `number` |
| `y` | `number` |
| `scaleX` | `number` |
| `scaleY` | `number` |
| `netid` | `integer` |

## Screen

Screen dimensions. Returned by [`GetScreen`](/api/client#getscreen).

| field | type |
|-------|------|
| `width` | `number` |
| `height` | `number` |
