//////////////////HELP////////////////////////
//proxy coord - shows your xyz coordinate in the chat.
//proxy tp x y z - teleport on xyz

//proxy cris - Teleport to Crystall room for Corsair Stringhold.
//proxy ll - Teleport to left ladder for Corsair Stringhold.
//proxy rl - Teleport to right ladder for Corsair Stringhold.
//proxy hide - Teleport to "hide zone" for Corsair Stringhold.

module.exports = function RTPort(mod) {
	let xyz = [];
  
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
		mod.command.message(`ZONE: ${xyz[3]} X: ${xyz[0]} Y: ${xyz[1]} Z: ${xyz[2]}`)
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
		mod.command.message(`Teleported to ${arg1} ${arg2} ${arg3}`);
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
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">You are teleported to the crystall room!</font>');
    }
   else{
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
	
		mod.command.add('ll', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 14230,
                    y: 119520,
                    z: 2683,
                    w: xyz[5]})
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">You are teleported to the left ladder!</font>');
    }
   else{
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
	
		mod.command.add('rl', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 11695,
                    y: 121520,
                    z: 2683,
                    w: xyz[5]})
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">You are teleported to the right ladder!</font>');
    }
   else{
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Corsair!</font>');}
	})

		mod.command.add('hide', () => {
		if (116 === xyz[3]) {
		mod.toClient('S_INSTANT_MOVE', 1,{
                    id: id,
                    x: 25685,
                    y: 112781,
                    z: 3003,
                    w: xyz[5]})
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">You are hidden!</font>');
    }
   else{
    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Corsair!</font>');}
	})
}
