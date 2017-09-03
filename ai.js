// makes the move for the AI
function AIMove() {
	var d1 = new Date();
	console.log(d1.getTime());

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
	// var move = randomMove(pieces);

	// choose the best move that the AI can find
	var move = [];
	if (turn == 0) {
		var moveWithScore = maximize(0, pieces, "white");
		move = moveWithScore[1];
		console.log("score after black plays");
		console.log(moveWithScore[0]);
	}
	else {
		var moveWithScore = maximize(0, pieces, "black");
		move = moveWithScore[1];
		console.log("score after black plays");
		console.log(moveWithScore[0]);
	}



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

	// check for stalemate
	if (checkStalemate()) {
		document.getElementById("board").removeEventListener("click", makeMove);
		document.getElementById("stalemate").style.visibility = "visible";
		stalemated = true;
	}
	// check for checkmate
	else if (checkCheckmate()) {
		console.log("checkmated!");
		document.getElementById("board").removeEventListener("click", makeMove);
		if (turn == 0) {
			document.getElementById("black_wins").style.visibility = "visible";
			black_wins = true;
		}
		else {
			document.getElementById("white_wins").style.visibility = "visible";
			white_wins = true;
		}
	}

	var d2 = new Date();
	console.log(d2.getTime());
}

// function that finds the best possible move for a player
function maximize(depth, board, player) {
	// if the search has reached Maxdepth, return the state of the board
	if(depth == MAXDEPTH) {
		return [heuristic(board), []];
	}

	// if depth is somehow less than 0, throw an exception
	else if (depth < 0) {
		console.log("ERROR: GIVEN DEPTH IS LESS THAN 0");
		throw "maximize failed";
	}

	// keeps track of the best possible move
	var bestMove = [];

	// variable to keep track of the best score
	var score = 0;
	if (player == "white") {
		score = Number.NEGATIVE_INFINITY;
	}
	else {
		score = Number.POSITIVE_INFINITY;
	}

	// keeps track of how many times the same score has popped up
	var equalScoreCntr = 1;

	// find all legal moves for the current player
	var currTurn = 0;
	if (player == "black") {
		currTurn = 1;
	}

	var moves = allMoves(currTurn, pieces);

	// goes down each branch of possible moves to find the best one
	for (var h = 0; h < moves.length; h++) {
		// create a new board for each possible move
		var currBoard = new Array(8);
		createArray(currBoard);
		if (perspective == 0) {
			cloneArrayReverse(board, currBoard);
		}
		else {
			cloneArray(board, currBoard);
		}

		// make a possible move on the test board
		testMove(currBoard, moves[h][0], moves[h][1], moves[h][3][0][0], moves[h][3][0][1]);

		// switch players to run maximize for the opponent
		var otherPlayer = "";
		if (player == "white") {
			otherPlayer = "black";
		} 
		else {
			otherPlayer = "white";
		}

		// figure out the best move for the opponent
		tmp = maximize(depth + 1, currBoard, otherPlayer);

		// if the best move for the opponent leads to a better score than what is currently possible
		// then save your current move as the new best move
		if (player == "white") {
			if (score < tmp[0]) {
				score = tmp[0];
				bestMove = moves[h];
				equalScoreCntr = 1;
			}
			// // if two moves, have the same score, choose which move is kept based on algorithm
			// // algorithm ensures all equal moves have the same likelihood of being finally selected
			// else if (score == tmp[0]) {
			// 	if (generateFromOdds(equalScoreCntr, 1) == 1) {
			// 		score = tmp[0];
			// 		bestMove = moves[h];
			// 		equalScoreCntr++;
			// 	}
			// }
		}
		else {
			if (score > tmp[0]) {
				score = tmp[0];
				bestMove = moves[h];
				equalScoreCntr = 1;
			}
			// else if (score == tmp[0]) {
			// 	if (generateFromOdds(equalScoreCntr, 1) == 1) {
			// 		score = tmp[0];
			// 		bestMove = moves[h];
			// 		equalScoreCntr++;
			// 	}
			// }
		}
	}	
	// once you've tried all the moves, return the best move you've got along with its score
	return [score, bestMove];
}


// function to test Maximize()
function testMaximize() {
	// moveBank is in the form [[number, [move]], [number, [move]]...]
	var moveBank = [];
	
	// variable to keep track of whether a move was incremented or added to MoveBank
	var moveIncremented = false;

	// run maximize 50 times
	for (var i = 0; i < 50; i++) {
		var a = maximize(0, pieces, "white");

		// pull maximized movefrom "a"
		var row1 = a[1][0];
		var col1 = a[1][1];
		var row2 = a[1][3][0][0];
		var col2 = a[1][3][0][1];

		// check if the maximized move is in the moveBank. if yes, increment it
		for (var i = 0; i < moveBank.length; i++) {
			if (moveBank[i][1][0] == row1 
				&& moveBank[i][1][1] == col1
				&& moveBank[i][1][2] == row2
				&& moveBank[i][1][3] == col2) {
				moveBank[i][0]++;
				moveIncremented = true;
			}
		}
		
		// if a move wasn't incremented, add it to the moveBank
		if (moveIncremented) {
			moveIncremented = false;
		}
		else {
			moveBank.push([1, [row1, col1, row2, col2]]);
		}
	}

	console.log(moveBank);
}



// function that moves a piece for the Maximize function without any other side effects
function testMove(board, row1, col1, row2, col2) {
	board[row2][col2] = board[row1][col1];
	board[row1][col1] = "0"; 

	// queens pawn if necessary
	if (board[row2][col2] == "whpawn") {
		if (perspective == 0) {
			if (row2 == 7) {
				board[row2][col2] = "whqueen";
			}
		}
		else {
			if (row2 == 0) {
				board[row2][col2] = "whqueen";
			}
		}
	}
	if (board[row2][col2] == "blpawn") {
		if (perspective == 0) {
			if (row2 == 0) {
				board[row2][col2] = "blqueen";
			}
		}
		else {
			if (row2 == 7) {
				board[row2][col2] = "blqueen";
			}
		}
	}
}


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
			return 200;
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
	return score + 203;
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
// return is in the form [row1, col1, mover, [[row2, col2], color]]
function randomMove(board) {
	var moves = allMoves(turn, board);
	var move = Math.floor(Math.random() * moves.length);

	console.log("randomMove chosen:");
	console.log(moves[move]);
	
	return moves[move];
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

// returns either 0 or 1 based on odds given. used for choose moves in Maximize()
function generateFromOdds(oddsForZero, oddsForOne) {
	var number = Math.floor(Math.random() * (oddsForZero + oddsForOne));
	if (number < oddsForZero) {
		return 0;
	}
	else {
		return 1;
	}
}




// // function for determining the best possible
// function minimize(player_to_move, depth, board) {
// 	if (depth == MAXDEPTH) {

// 	}
// }