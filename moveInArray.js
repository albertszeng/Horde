function moveInArray(row1, col1, row2, col2) {
	var mover = pieces[row1][col1];
	
	// define rules of movement for black pawns
	if(mover == "blpawn") {
		if(perspective == 0) {
			if(col1 == col2) {
				if(pieces[row2][col2] == "0") {
					if(row1 - row2 == 1) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
					else if(row1 - row2 == 2 && row1 == 6) {
						if(pieces[row2 + 1][col2] == "0") {
							checkQueen(row2, col2);
							move_piece(mover, row1, col1, row2, col2);
						}
					}
				}
			}
			else if(col1 - col2 == 1 || col1 - col2 == -1) {
				if(row1 - row2 == 1) {
					var patt = new RegExp("wh");
					if(patt.test(pieces[row2][col2])) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else {
			if(col1 == col2) {
				if(pieces[row2][col2] == "0") {
					if(row2 - row1 == 1) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
					else if(row2-row1 == 2 && row1 == 1) {
						if(pieces[row2 - 1][col2] == "0") {
							checkQueen(row2, col2);
							move_piece(mover, row1, col1, row2, col2);
						}
					}
				}
			}
			else if(col1 - col2 == 1 || col1 - col2 == -1) {
				if(row2 - row1 == 1) {
					var patt = new RegExp("wh");
					if(patt.test(pieces[row2][col2])) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}


	// define rules of movement for black king
	if(mover == "blking") {
		if(row1 - row2 == -1 || row1 - row2 == 0 || row1 - row2 == 1) {
			if(col1 - col2 == -1 || col1 - col2 == 0 || col1 - col2 == 1) {
				var patt = new RegExp("bl");
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
	}

	// define rules of movement for black rooks
	if(mover == "blrook") {
		var blocked = 0;
		if(col1 == col2) {
			if(row2 > row1) {
				for(var i = 1; i < row2 - row1; i++) {
					if(pieces[row1 + i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(row2 < row1) {
				for(var i = 1; i < row1 - row2; i++) {
					if(pieces[row1 - i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(row1 == row2) {
			if(col2 > col1) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1][col1 + i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col2 < col1) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1][col1 - i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}

	// define rules of movement for black bishops
	if(mover == "blbishop") {
		var blocked = 0;
		if(col1 - col2 == row1 - row2) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 - i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 + i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}

		}
		else if(col1 - col2 == row2 - row1) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 + i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 - i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}


	// define rules of movement for the black queen
	if(mover == "blqueen") {
		var blocked = 0;
		if(col1 == col2) {
			if(row2 > row1) {
				
				for(var i = 1; i < row2 - row1; i++) {
					if(pieces[row1 + i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(row2 < row1) {
				for(var i = 1; i < row1 - row2; i++) {
					if(pieces[row1 - i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(row1 == row2) {
			if(col2 > col1) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1][col1 + i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col2 < col1) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1][col1 - i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("bl");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(col1 - col2 == row1 - row2) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 - i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 + i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}

		}
		else if(col1 - col2 == row2 - row1) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 + i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 - i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("bl")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}

	// define rules of movement for black knights
	if(mover == "blknight") {
		var patt = new RegExp("bl");
		if(col1 - col2 == -2) {
			if(row1 - row2 == -1 || row1 - row2 == 1) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == -1) {
			if(row1 - row2 == -2 || row1 - row2 == 2) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == 1) {
			if(row1 - row2 == -2 || row1 - row2 == 2) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == 2) {
			if(row1 - row2 == -1 || row1 - row2 == 1) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
	}

	// define rules of movement for white pawns
	if(mover == "whpawn") {
		if(perspective == 0) {
			if(col1 == col2) {
				if(pieces[row2][col2] == "0") {
					if(row2 - row1 == 1) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
					else if(row2-row1 == 2 && row1 < 2) {
						if(pieces[row2 - 1][col2] == "0") {
							checkQueen(row2, col2);
							move_piece(mover, row1, col1, row2, col2);
						}
					}
				}
			}
			else if(col1 - col2 == 1 || col1 - col2 == -1) {
				if(row2 - row1 == 1) {
					var patt = new RegExp("bl");
					if(patt.test(pieces[row2][col2])) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else {
			if(col1 == col2) {
				if(pieces[row2][col2] == "0") {
					if(row1 - row2 == 1) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
					else if(row1 - row2 == 2 && row1 > 5) {
						if(pieces[row2 + 1][col2] == "0") {
							checkQueen(row2, col2);
							move_piece(mover, row1, col1, row2, col2);
						}
					}
				}
			}
			else if(col1 - col2 == 1 || col1 - col2 == -1) {
				if(row1 - row2 == 1) {
					var patt = new RegExp("bl");
					if(patt.test(pieces[row2][col2])) {
						checkQueen(row2, col2);
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}


	// define rules of movement for white rooks
	if(mover == "whrook") {
		var blocked = 0;
		if(col1 == col2) {
			if(row2 > row1) {
				for(var i = 1; i < row2 - row1; i++) {
					if(pieces[row1 + i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(row2 < row1) {
				for(var i = 1; i < row1 - row2; i++) {
					if(pieces[row1 - i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(row1 == row2) {
			if(col2 > col1) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1][col1 + i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col2 < col1) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1][col1 - i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}

	// define rules of movement for white bishops
	if(mover == "whbishop") {
		var blocked = 0;
		if(col1 - col2 == row1 - row2) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 - i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 + i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}

		}
		else if(col1 - col2 == row2 - row1) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 + i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 - i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}


	// define rules of movement for the white queen
	if(mover == "whqueen") {
		var blocked = 0;
		if(col1 == col2) {
			if(row2 > row1) {
				
				for(var i = 1; i < row2 - row1; i++) {
					if(pieces[row1 + i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(row2 < row1) {
				for(var i = 1; i < row1 - row2; i++) {
					if(pieces[row1 - i][col1] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(row1 == row2) {
			if(col2 > col1) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1][col1 + i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col2 < col1) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1][col1 - i] != "0") {
						blocked++;
					}
				}

				if(blocked == 0) {
					var patt = new RegExp("wh");
					if (!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
		else if(col1 - col2 == row1 - row2) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 - i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 + i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}

		}
		else if(col1 - col2 == row2 - row1) {
			if(col1 - col2 > 0) {
				for(var i = 1; i < col1 - col2; i++) {
					if(pieces[row1 + i][col1 - i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
			else if(col1 - col2 < 0) {
				for(var i = 1; i < col2 - col1; i++) {
					if(pieces[row1 - i][col1 + i] != "0") {
						blocked++;
					}
				}
				if(blocked == 0) {
					var patt = new RegExp("wh")
					if(!patt.test(pieces[row2][col2])) {
						move_piece(mover, row1, col1, row2, col2);
					}
				}
			}
		}
	}

	// define rules of movement for white knights
	if(mover == "whknight") {
		var patt = new RegExp("wh");
		if(col1 - col2 == -2) {
			if(row1 - row2 == -1 || row1 - row2 == 1) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == -1) {
			if(row1 - row2 == -2 || row1 - row2 == 2) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == 1) {
			if(row1 - row2 == -2 || row1 - row2 == 2) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
		else if(col1 - col2 == 2) {
			if(row1 - row2 == -1 || row1 - row2 == 1) {
				if(!patt.test(pieces[row2][col2])) {
					move_piece(mover, row1, col1, row2, col2);
				}
			}
		}
	}


}	

function move_piece(mover, row1, col1, row2, col2) {
	pieces[row1][col1] = "0";
	pieces[row2][col2] = mover;
	if(turn == 0) {
		turn = 1;
	}
	else {
		turn = 0;
	}
}

function checkQueen(row2, col2) {
	if(perspective == 0) {
		if(turn == 0) {
			if(row2 == 7) {
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

var whQueenQueening = function() {queening("whqueen")};
var whKnightQueening = function() {queening("whknight")};
var whBishopQueening = function() {queening("whbishop")};
var whRookQueening = function() {queening("whrook")};
var blQueenQueening = function() {queening("blqueen")}
var blKnightQueening = function() {queening("blknight")};
var blBishopQueening = function() {queening("blbishop")};
var blRookQueening = function() {queening("blrook")};


function queening(selection) {
	if(turn == 1) {
		if(perspective == 0) {
			for(var i = 0; i < 8; i++) {
				if(pieces[7][i] == "whpawn") {
					pieces[7][i] = selection;
				}
			}
		}
		else {
			for(var i = 0; i < 8; i++) {
				if(pieces[0][i] == "whpawn") {
					pieces[0][i] = selection;
				}
			}
		}
		document.getElementById("whqueeningIcons").style.visibility = "hidden";
		document.getElementById("iconwhQueen").removeEventListener("click", whQueenQueening);
		document.getElementById("iconwhKnight").removeEventListener("click", whKnightQueening);
		document.getElementById("iconwhBishop").removeEventListener("click", whBishopQueening);
		document.getElementById("iconwhRook").removeEventListener("click", whRookQueening);
	}
	else {
		if(perspective == 0) {
			for(var i = 0; i < 8; i++) {
				if(pieces[0][i] == "blpawn") {
					pieces[0][i] = selection;
				}
			}
		}
		else {
			for(var i = 0; i < 8; i++) {
				if(pieces[7][i] == "blpawn") {
					pieces[7][i] = selection;
				}
			}
		}
		document.getElementById("blqueeningIcons").style.visibility = "hidden";	
		document.getElementById("iconblQueen").removeEventListener("click", blQueenQueening);
		document.getElementById("iconblKnight").removeEventListener("click", blKnightQueening);
		document.getElementById("iconblBishop").removeEventListener("click", blBishopQueening);
		document.getElementById("iconblRook").removeEventListener("click", blRookQueening);
	}

	document.getElementById("board").addEventListener("click", makeMove);
	loadPieces(pieces);
}





// function cry_piece(pieces, row, column) {
// 	rand_int
// }