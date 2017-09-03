// function that is run to move a piece in the Pieces array
function moveInArray2(row1, col1, row2, col2) {
	var mover = pieces[row1][col1];
	var available_moves = possibleMoves(pieces, row1, col1);
	var available = false;
	for (var k = 0; k < available_moves.length; k++) {
		if (available_moves[k][0][0] == row2 && 
			available_moves[k][0][1] == col2) {
			available = true;
			break;
		}
	}

	if (available) {
		if (mover == "blpawn" || mover == "whpawn") {
			// if AI is moving and queened, queen for the AI and skip moving the piece
			if (AIQueening(mover, row1, col1, row2, col2)) {
				if(turn == 0) {
					turn = 1;
				}
				else {
					turn = 0;
				}
				return;
			}
			checkQueen(row2, col2);
		}
		move_piece(mover, row1, col1, row2, col2);
	}
	console.log(pieces);
}	

// function that actually moves a piece in the array
function move_piece(mover, row1, col1, row2, col2) {
	var save = pieces[row2][col2];
	pieces[row1][col1] = "0";
	pieces[row2][col2] = mover;

	if (turn == 0 || !check || !inCheck(pieces)) {
		if(turn == 0) {
			turn = 1;
		}
		else {
			turn = 0;
		}
	}
	else {
		console.log("this is reached!");
		pieces[row1][col1] = mover;
		pieces[row2][col2] = save;
	}
}

// checks if a pawn is supposed to be queened
function checkQueen(row2, col2) {
	if(perspective == 0) {
		if(turn == 0) {
			if(row2 == 7) {
				isQueening = true;
				document.getElementById("whqueeningIcons").style.visibility = "visible";
				document.getElementById("board").removeEventListener("click", makeMove);
				document.getElementById("iconwhQueen").addEventListener("click", whQueenQueening);
				document.getElementById("iconwhKnight").addEventListener("click", whKnightQueening);
				document.getElementById("iconwhBishop").addEventListener("click", whBishopQueening);
				document.getElementById("iconwhRook").addEventListener("click", whRookQueening);
			}
		}
		else {
			if(row2 == 0) {
				isQueening = true;
				document.getElementById("blqueeningIcons").style.visibility = "visible";
				document.getElementById("board").removeEventListener("click", makeMove);
				document.getElementById("iconblQueen").addEventListener("click", blQueenQueening);
				document.getElementById("iconblKnight").addEventListener("click", blKnightQueening);
				document.getElementById("iconblBishop").addEventListener("click", blBishopQueening);
				document.getElementById("iconblRook").addEventListener("click", blRookQueening);
			}
		}
	}
	else {
		if(turn == 0) {
			if(row2 == 0) {
				isQueening = true;
				document.getElementById("whqueeningIcons").style.visibility = "visible";
				document.getElementById("board").removeEventListener("click", makeMove);
				document.getElementById("iconwhQueen").addEventListener("click", whQueenQueening);
				document.getElementById("iconwhKnight").addEventListener("click", whKnightQueening);
				document.getElementById("iconwhBishop").addEventListener("click", whBishopQueening);
				document.getElementById("iconwhRook").addEventListener("click", whRookQueening);
			}
		}
		else {
			if(row2 == 7) {
				isQueening = true;
				document.getElementById("blqueeningIcons").style.visibility = "visible";
				document.getElementById("board").removeEventListener("click", makeMove);
				document.getElementById("iconblQueen").addEventListener("click", blQueenQueening);
				document.getElementById("iconblKnight").addEventListener("click", blKnightQueening);
				document.getElementById("iconblBishop").addEventListener("click", blBishopQueening);
				document.getElementById("iconblRook").addEventListener("click", blRookQueening);
				
			}
		}
	}
}

// functions used for event listeners to queen pawns
var whQueenQueening = function() {queening("whqueen")};
var whKnightQueening = function() {queening("whknight")};
var whBishopQueening = function() {queening("whbishop")};
var whRookQueening = function() {queening("whrook")};
var blQueenQueening = function() {queening("blqueen")}
var blKnightQueening = function() {queening("blknight")};
var blBishopQueening = function() {queening("blbishop")};
var blRookQueening = function() {queening("blrook")};

// function that changes a queening pawn to the right piece based on player selection
function queening(selection) {
	if(turn == 1) {
		if(perspective == 0) {
			for(var i = 0; i < 8; i++) {
				if(pieces[7][i] == "whpawn") {
					pieces[7][i] = selection;
					moveHistory[moveHistory.length - 1][7][i] = selection;
				}
			}
		}
		else {
			for(var i = 0; i < 8; i++) {
				if(pieces[0][i] == "whpawn") {
					pieces[0][i] = selection;
					moveHistory[moveHistory.length - 1][0][i] = selection;
				}
			}
		}
		document.getElementById("whqueeningIcons").style.visibility = "hidden";
		document.getElementById("iconwhQueen").removeEventListener("click", whQueenQueening);
		document.getElementById("iconwhKnight").removeEventListener("click", whKnightQueening);
		document.getElementById("iconwhBishop").removeEventListener("click", whBishopQueening);
		document.getElementById("iconwhRook").removeEventListener("click", whRookQueening);

		if (inCheck(pieces)) {
			document.getElementById("check").style.visibility = "visible";
			check = true;
		}

	}
	else {
		if(perspective == 0) {
			for(var i = 0; i < 8; i++) {
				if(pieces[0][i] == "blpawn") {
					pieces[0][i] = selection;
					moveHistory[moveHistory.length - 1][0][i] = selection;
				}
			}
		}
		else {
			for(var i = 0; i < 8; i++) {
				if(pieces[7][i] == "blpawn") {
					pieces[7][i] = selection;
					moveHistory[moveHistory.length - 1][7][i] = selection;
				}
			}
		}
		document.getElementById("blqueeningIcons").style.visibility = "hidden";	
		document.getElementById("iconblQueen").removeEventListener("click", blQueenQueening);
		document.getElementById("iconblKnight").removeEventListener("click", blKnightQueening);
		document.getElementById("iconblBishop").removeEventListener("click", blBishopQueening);
		document.getElementById("iconblRook").removeEventListener("click", blRookQueening);
	}

	// make the board clickable again
	document.getElementById("board").addEventListener("click", makeMove);
	loadPieces(pieces);

	// change isQueening to demonstrate queening action is done
	isQueening = false;

	// if AI is on, the AI should now make a move
	if (AIstatus > 0) {
		setTimeout(function () {AIMove();}, AIwaitTime);
	}
}


