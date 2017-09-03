function checkStalemate() {
	// check if any legal moves
	var pattWh = new RegExp("wh");
	var pattBl = new RegExp("bl");
	var avail_moves = false;
	var i = 0;
	var j = 0;

	// turn == 0 means white to move, since black just moved and turn set to 0
	if (turn == 0) {
		for (i = 0; i < 8; i++) {
			for (j = 0; j < 8; j++) {
				var mover = pieces[i][j];
				if (pattWh.test(mover)) {
					if (possibleMoves(pieces, i, j).length != 0) {
						avail_moves = true;
						break;
					}
				}
			}
			if (avail_moves) {
				break;
			}
		}
	}
	else {
		for (i = 0; i < 8; i++) {
			for (j = 0; j < 8; j++) {
				var mover = pieces[i][j];
				if (pattBl.test(mover)) {
					if (possibleMoves(pieces, i, j).length != 0) {
						avail_moves = true;
						break;
					}
				}
			}
			if (avail_moves) {
				break;
			}
		}
	}
	if (!avail_moves && !inCheck(pieces)) {
		return true;
	}

	// check for 3-fold repitition
	var counterX = 1;
	for (var i = 0; i < moveHistory.length - 1; i++) {
		if (compArrays(pieces, moveHistory[i])) {
			counterX++;
		}
	}
	if (counterX == 3) {
		return true;
	}
	
	return false;
	
}