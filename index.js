//////////////////HELP////////////////////////
//proxy coord - shows your xyz coordinate in the chat. (NEW! - auto save coord)
//proxy tpx - Teleport to save coord. NEW!
//proxy tp x y z - teleport on xyz

//proxy cris - Teleport to Crystall room for Corsair Stringhold.
//proxy ll - Teleport to left ladder for Corsair Stringhold.
//proxy rl - Teleport to right ladder for Corsair Stringhold.
//proxy hide - Teleport to "hide zone" for Corsair Stringhold.

//proxy kuma ## - Correct Z Position NEW!

module.exports = function RTPort(mod) {
	let xyz = [];
  let svx = 0;
  let svy = 0;
  let svz = 0;
  
	mod.hook('S_LOGIN', 1, (event) => {id = event.cid})
	mod.hook('C_PLAYER_LOCATION', 1, (event) => {
		xyz[0] = event.x2
		xyz[1] = event.y2
		xyz[2] = event.z2
		xyz[4] = event.time
		xyz[5] = event.w
	})
	mod.hook('S_LOAD_TOPO', 1, (event) => {
		xyz[3] = event.zone})

  mod.command.add('coord', () => {
		mod.command.message(`<font color="#00ffff"><font color="#ffff00">ZONE:</font>${xyz[3]} <font color="#ffff00">X:</font>${xyz[0]} <font color="#ffff00">Y:</font>${xyz[1]} <font color="#ffff00">Z:</font>${xyz[2]}</font>`)
		svx = xyz[0]
		svy = xyz[1]
		svz = xyz[2]
	})

  mod.command.add('tpx', () => {
		if (svx == 0) {
		mod.command.message(`<font color="#00ffff">Coord(X) is failed or null, please retry #coord command.</font>`);	
		}elseif(svy == 0) {
		mod.command.message(`<font color="#00ffff">Coord(Y) is failed or null, please retry #coord command.</font>`);	
		}elseif(svz == 0) {
		mod.command.message(`<font color="#00ffff">Coord(Z) is failed or null, please retry #coord command.</font>`);	
		}else{
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: svx,
                    y: svy,
                    z: svz,
                    w: xyz[5]})
		mod.command.message(`<font color="#00ffff">Teleported to <font color="#ffff00">X:</font>${svx} <font color="#ffff00">Y:</font>${svy} <font color="#ffff00">Z:</font>${svz}</font>`);
	}
	})
	
	mod.command.add('tp', (argx, argy, argz) => {
		arg1 = parseFloat(argx);
		arg2 = parseFloat(argy);
		arg3 = parseFloat(argz);
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: arg1,
                    y: arg2,
                    z: arg3,
                    w: xyz[5]})
		mod.command.message(`<font color="#00ffff">Teleported to <font color="#ffff00">X:</font>${arg1} <font color="#ffff00">Y:</font>${arg2} <font color="#ffff00">Z:</font>${arg3}</font>`);
	})
	
	
	// ###################### //
	// ## KR- KUMAS Royale ## //
	// ###################### //
	
	let kuma = 0;
	
	mod.command.add('kuma', (offset) => {
	//if (116 === xyz[3]) {
		kuma = parseFloat(offset)
		mod.command.message('<font color="#ffff00">Position correct to '+(kuma)+'.</font>')
		   //}else{
    //mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Kuma Royale!</font>');}
	})
	
	mod.hook('C_VEHICLEEX_LOCATION', 1, (event) => {
		if (kuma === 0) return
		event.z1 += shift
		event.z2 += shift
		return true
	})
	
	// ###################### //
	// ### CS- STRONGHOLD ### //
	// ###################### //
	
		mod.command.add('cris', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 14200,
                    y: 120900,
                    z: 2112,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the crystall room!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Corsair!</font>');}
	})
	
		mod.command.add('ll', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 14230,
                    y: 119520,
                    z: 2683,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the left ladder!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Corsair!</font>');}
	})
	
		mod.command.add('rl', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 11695,
                    y: 121520,
                    z: 2683,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are teleported to the right ladder!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Corsair!</font>');}
	})

		mod.command.add('hide', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 25685,
                    y: 112781,
                    z: 3003,
                    w: xyz[5]})
    mod.command.message('<font color="#ffff00">You are hidden!</font>');
    }
   else{
    mod.command.message('<font color="#ffff00">Only Corsair!</font>');}
	})
}
