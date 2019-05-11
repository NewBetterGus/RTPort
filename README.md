# RTPort - Tera Online Proxy Module
Last fix by PinguinRei 11.05.19

## Setup:
- Copy/paste all .def files from the [protocol folder](https://github.com/PinguinRei/RTPort/tree/master/defs) to `<path to proxy>\node_modules\tera-data\protocol\`.
- Copy/paste the [opcodes](https://github.com/PinguinRei/RTPort/tree/master/opcodes) from the map folder into the corresponding .map file within `<path to proxy>\node_modules\tera-data\map\`.

## Commands
**Need to be used in _Proxy Channel_ (/proxy) or (/8)**
```
//proxy coord - shows your xyz coordinate in the chat and save it.
//proxy tpx - load coord
//proxy tp x y z - teleport on xyz (0 = skip)

//proxy cris - Teleport to Crystall room for Corsair Stronghold.
//proxy ll - Teleport to left ladder for Corsair Stronghold.
//proxy rl - Teleport to right ladder for Corsair Stronghold.
//proxy hide - Teleport to "hide zone" for Corsair Stronghold.

PS: For Kuma Mod (Mini Install Instruction)
1. SET "C_VEHICLEEX_LOCATION = 30721" to you protocol (NA 341698)
2. uncomment 208 to 227 lines in index.js
3. disable autoupdate.
4. use "/8 kuma -200" and use skill.
:MOM UNDERGROUND:
