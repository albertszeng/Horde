// // function that finds the worst move 
// function minimize(depth, board) {
// 	if(depth == MAXDEPTH) {
// 		return heuristic(board);
// 	}
// 	else if (depth == 0) {
// 		var clonedBoard = new Array(8);
// 		createArray(clonedBoard);
// 	}
// 	else if (depth < 0) {
// 		console.log("ERROR: GIVEN DEPTH IS LESS THAN 0");
// 		throw "minimize failed";
// 	}

// 	var index = 0;
// 	var score = Number.POSITIVE_INFINITY;
// 	for(i in list of legal moves) {
// 		tmp = maximize(depth + 1, changed_board);
// 		if(score > tmp) {
// 			score = tmp;
// 			index = i;
// 		}
// 	}
// 	return score;
// }

// // function that finds the best possible move for a player
// function maximize(depth, board) {
// 	// if the search has reached Maxdepth, return the state of the board
// 	if(depth == MAXDEPTH) {
// 		return heuristic(board);
// 	}
// 	// if this is the first search, then clone Pieces array into a substitute
// 	else if (depth == 0) {
// 		var clonedBoard = new Array(8);
// 		createArray(clonedBoard);
// 		cloneArray(pieces, clonedBoard);
// 	}
// 	// if depth is somehow less than 0, throw an exception
// 	else if (depth < 0) {
// 		console.log("ERROR: GIVEN DEPTH IS LESS THAN 0");
// 		throw "maximize failed";
// 	}

// 	// keeps track of the best possible move
// 	var index = 0;

// 	// keeps track of the best score
// 	var score = Number.NEGATIVE_INFINITY;

// 	for(i in list of legal moves) {
// 		tmp = minimize(depth + 1, changed_board);
// 		if(score < tmp) {
// 			score = tmp;
// 			index = i;
// 		}
// 	}
// 	return score;
// }

// returns the value of a piece, with black being negative
function pieceValue(mover) {
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
		case "whking":
			return -200;
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
		case "0":
			return 0;
		default:
			console.log("ERROR: PIECE_VALUE FAILED");
			throw "pieceValue failed";
	}
}

// returns the point value of the board
function heuristic(board) {
	var score = 0;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			score = score + pieceValue(board[i][j]);
		}
	}
	return score;
}

// returns all moves possible for the given player given a board
// returned array is in the form [[row1, col1, mover1, [legalMoves1]], [row2, col2, mover2, [legalMoves2]]...]
function allMoves(player, board) {
	var moves = new Array();
	if (player == 0) {
		var patt = new RegExp("wh");
	}
	else {
		var patt = new RegExp("bl");
	}
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (patt.test(board[i][j])) {
				var possMoves = possibleMoves(board, i, j);
				for(var k = 0; k < possMoves.length; k++) {
					moves.push([i, j, board[i][j], possMoves[k]]);
				}
			}
		}
	}
	return moves;
}

// generates a random move from all possible moves
function randomMove(board) {
	var moves = allMoves(turn, board);
	var move = Math.floor(Math.random()*moves.length)

	console.log(moves[move]);
	
	return moves[move];
}

// makes the move for the AI
function AIMove() {
	// If AI is black and it's white to move, that means player didn't move so just return.
	if (AIstatus == 2 && turn == 0){
		return;
	}
	// If AI is white and it's black to move, that means player didn't move so just return.
	else if (AIstatus == 1 && turn == 1) {
		return;
	}

	// if player is choosing a piece to queen, do nothing
	if (isQueening) {
		return;
	}

	// choose a random move from the available ones
	var move = randomMove(pieces);

	// make the move
	moveInArray2(move[0], move[1], move[3][0][0], move[3][0][1]);

	// save the move to moveHistory
	saveState();

	// re-load the board
	loadPieces(pieces);

	// check whether the king is in check or not
	if (inCheck(pieces) && !checkCheckmate()) {
		document.getElementById("check").style.visibility = "visible";
		check = true;
	}
	else {
		document.getElementById("check").style.visibility = "hidden";
		check = false;
	}
}

// function that checks if a piece moved by the AI should be queened. If yes, it is queened
// always promotes to a queen. returns true if queened, otherwise false.
function AIQueening(mover, row1, col1, row2, col2) {
	// if AI is not active, automatically return false
	if (AIstatus < 1) {
		return false;
	}

	// if AI is black, check for black pawns
	if (AIstatus == 2 && turn == 1) {
		if (mover == "blpawn") {
			if (perspective == 0) {
				if (row2 == 0) {
					pieces[row1][col1] = "0";
					pieces[row2][col2] = "blqueen";
					return true;
				}
			}
			else {
				if (row2 == 7) {
					pieces[row1][col1] = "0";
					pieces[row2][col2] = "blqueen";
					return true;
				}
			}
		}
	}
	else if (AIstatus == 1 && turn == 0) {
		if (mover == "whpawn") {
			if (perspective == 0) {
				if (row2 == 7) {
					pieces[row1][col1] = "0";
					pieces[row2][col2] = "whqueen";
					return true;
				}
			}
			else {
				if (row2 == 0) {
					pieces[row1][col1] = "0";
					pieces[row2][col2] = "whqueen";
					return true;
				}
			}
		}
	}

	// if AI did not queen, return false
	return false;
}






// // function for determining the best possible
// function minimize(player_to_move, depth, board) {
// 	if (depth == MAXDEPTH) {

// 	}
// }