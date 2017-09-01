// function to see if there is checkmate
function checkCheckmate() {
	// check if black wins (no white pieces remain). 
	if (turn == 0) {
		var pattWh = new RegExp("wh");
		for(var i = 0; i < 8; i++) {
			for(var j = 0; j < 8; j++) {
				var mover = pieces[i][j];
				if (pattWh.test(mover)) {
					return false;
				}
			}
		}
		return true;
	}
	else {
		// check if white has checkmated black
		var pattBl = new RegExp("bl");
		if (!inCheck(pieces)) {
			return false;
		}
		else {
			for(var i = 0; i < 8; i++) {
				for(var j = 0; j < 8; j++) {
					if(pattBl.test(pieces[i][j])) {
						if (possibleMoves(i, j).length > 0) {
							return false;
						}
					}
				}
			}
			return true;
		}
	}		
}