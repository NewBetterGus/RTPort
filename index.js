//////////////////HELP////////////////////////
//proxy coord - shows your xyz coordinate in the chat. (NEW! - auto save coord)
//proxy tpx - Teleport to save coord. NEW!
//proxy tp x y z - teleport on xyz

//proxy cris - Teleport to Crystall room for Corsair Stringhold.
//proxy ll - Teleport to left ladder for Corsair Stringhold.
//proxy rl - Teleport to right ladder for Corsair Stringhold.
//proxy hide - Teleport to "hide zone" for Corsair Stringhold.

//proxy shift Z TIME - NEW Conf sorc Incredible (Only Warp Barrier)
//proxy kuma ## - Correct Z Position NEW! (Disabled)

module.exports = function RTPort(mod) {

let enabled = false;
let shift = -500; //you Z coord conf
let secdef = 4300 //ms for incredible

	let xyz = [];
  let svx = 0;
  let svy = 0;
  let svz = 0;
  
  let bkp = false
  let block = false
  
  let id = 0; //you client id
  let model = 0; //you class
  
  let skillid = 0; //current skill id
  let mask = []; //mask work skill id
  let mask_size = 0;

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
function IncMask (inc, size, msa) {
	  for(var i = 0; i < inc.length; i++) {
        for(var n = 0; n < size; n++) {
            if(inc.indexOf(msa[n]) != -1) {
                return n;
            }}
  }
  return -1
}

function findInArray(ary, item) {
    for (let i = 0; i < ary.length; i++) {
    if (ary[i].toString() === item.toString()) {
   return i
   }}
    return -1
}
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

function Reload() {
	enabled = false
	setTimeout(500)
	block = false
  mod.command.message('<font color="#00ffff">[RTPort]</font> You alredy on ground!')
}

mod.hook('C_START_SKILL', 7, event => {
  skillid = event.skill.toString()
  let filter = IncMask(skillid, mask_size, mask)
  
if (!block){
if (filter == -1) {
		//console.log('S_FILTER: ' + event.skill)
    return
}else{
    //console.log('S_PASS: ' + event.skill)
    bkp = xyz[2]
    enabled = true
    mod.command.message('<font color="#00ffff">[RTPort]</font> You are UNDERGROUND!')
    block = true
    setTimeout(Reload, secdef)
    return false
}
}else{
return false}
})

	mod.hook('S_LOGIN', 12, (event) => {
	id = event.gameId;
	model = event.templateId % 100
	
//# warrior = 1, lancer = 2, slayer = 3, berserker = 4,
//# sorcerer = 5, archer = 6, priest = 7, mystic = 8,
//# reaper = 9, gunner = 10, brawler = 11, ninja = 12,
//# valkyrie = 13

		if (model == 5){
		mask = ["A310110", "A310120"]
		}else{
		mask = []
		}
		mask_size = mask.length
})
	
	mod.hook('C_PLAYER_LOCATION', 1, (event) => {
		xyz[0] = event.x2
		xyz[1] = event.y2
		xyz[2] = event.z2
		xyz[4] = event.time
		xyz[5] = event.w
	if (shift === 0) return
  if (!enabled) {
   event.z1 = bkp
   event.z2 = bkp
   return true
  }else{
   event.z1 += shift
   event.z2 += shift
   return true
   }
	})
	
  mod.hook('S_ACTION_STAGE', 9, (event) => {
      if (!enabled) return
      if (shift === 0) return
      if (event.gameId.toString() !== id.toString()) return
      event.loc = xyz[0], xyz[1], xyz[2]
      return true
  })
  
  mod.hook('S_ACTION_END', 5, (event) => {
      if (!enabled) return
      if (shift === 0) return
      if (event.gameId.toString() !== id.toString()) return
      event.loc = xyz[0], xyz[1], xyz[2]
      return true
  })
	
	
	mod.hook('S_LOAD_TOPO', 1, (event) => {
		xyz[3] = event.zone})

  mod.command.add('shift', (offset1, offset2) => {
        shift = parseFloat(offset1)
        secdef = parseFloat(offset2)
        if (secdef <= 1000) secdef = 1000
        if (shift > 0) shift = -500
        mod.command.message('Shift set to ' + shift + 'and time set to ' + secdef)
    })
    
  mod.command.add('coord', () => {
		mod.command.message(`<font color="#00ffff"><font color="#ffff00">ZONE:</font>${xyz[3]} <font color="#ffff00">X:</font>${xyz[0]} <font color="#ffff00">Y:</font>${xyz[1]} <font color="#ffff00">Z:</font>${xyz[2]}</font>`)
		svx = xyz[0]
		svy = xyz[1]
		svz = xyz[2]
	})

  mod.command.add('tpx', () => {
		if (svx == 0) {
		mod.command.message(`<font color="#00ffff">Coord(X) is failed or null, please retry #coord command.</font>`);	
		}else if(svy == 0) {
		mod.command.message(`<font color="#00ffff">Coord(Y) is failed or null, please retry #coord command.</font>`);	
		}else if(svz == 0) {
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
	
	
//Test Fish
//		mod.hook('C_atata', 1, (event) => {
//		event.ok = 1
//		return true
//		})
		
//	 mod.command.add('ok', () => {
//		mod.toServer('C_atata', 1,{
//                    ok: 1})
//		})

	
	mod.command.add('tp', (argx, argy, argz) => {
   let arg1 = xyz[0]
   let arg2 =	xyz[1]
   let arg3 =	xyz[2]
   
	if (argx != 0) {
    arg1 = parseFloat(argx);
	}
	
	if (argy != 0) {
    arg2 = parseFloat(argy);
	}
	
  if (argz != 0) {
    arg3 = parseFloat(argz);
	}
	
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
	
//	let kuma = 0;
//	
//	mod.command.add('kuma', (offset) => {
//	if (116 === xyz[3]) {
//		kuma = parseFloat(offset)
//		mod.command.message('<font color="#ffff00">Position correct to '+(kuma)+'.</font>')
//		   }else{
//    mod.command.message('<font color="#00ffff">[RTPort]</font> <font color="#ffff00">Only Kuma Royale!</font>');}
//	})
//	
//	mod.hook('C_VEHICLEEX_LOCATION', 1, (event) => {
//		if (kuma === 0) return
//		event.z1 += shift
//		event.z2 += shift
//		return true
//	})
	
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
