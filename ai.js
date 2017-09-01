function minimize(depth, board) {
	if(depth == MAXDEPTH) {
		return heuristic(board);
	}
	var index = 0, score = Number.POSITIVE_INFINITY;
	for(i in list of legal moves) {
		tmp = maximize(depth + 1, changed_board);
		if(score > tmp) {
			score = tmp;
			indx = i;
		}
	}
	return score;
}

function maximize(depth, board) {
	if(depth == MAXDEPTH) {
		return heuristic(board);
	}
	var indx = 0, score = -0x3f3f3f3f;
	for(i in list of legal moves) {
		tmp = minimize(depth + 1, changed_board);
		if(score < tmp) {
			score = tmp;
			indx = i;
		}
	}
	return score;
}

// returns the value of a piece, with black being negative
function piece_value(mover) {
	switch (mover) {
		case "blking":
			return -200;
		case "blqueen":
			return -9;
		case "blbishop":
			return -3;
		case "blknight":
			return -3;
		case "blrook":
			return -5;
		case "blpawn":
			return -1;
		case "whqueen":
			return 9;
		case "whbishop":
			return 3;
		case "whknight":
			return 3;
		case "whrook":
			return 5;
		case "whpawn":
			return 1;
		default case:
			console.log("ERROR: PIECE_VALUE FAILED");
			return 0x3f3f3f3f;
	}
}



// returns the point value of the board
function heuristic(board) {
	var score = 0;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			score = score + piece_value(pieces[i][j]);
		}
	}
	return score;
}



// function for determining the best possibel 
function minimize(player_to_move, depth, board) {
	if (depth == MAXDEPTH) {

	}
}