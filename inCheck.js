// checks if the black king is in check
function inCheck(pieces) {
	
	function searchKing() {
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (pieces[i][j] == "blking") {
					return [i, j];
				}
			}
		}
	}
	var king_square = searchKing();

	var king_row = king_square[0];
	var king_col = king_square[1];	

	// check which spaces are under threat
	function attackedByPawn(king_row, king_col) {
		if(perspective == 0) {
			if(pieces[king_row - 1][king_col - 1] == "whpawn") {
				return true;
			}
			if(pieces[king_row - 1][king_col + 1] == "whpawn") {
				return true;
			}
		}
		else {
			if(pieces[king_row + 1][king_col - 1] == "whpawn") {
				return true;
			}
			if(pieces[king_row + 1][king_col + 1] == "whpawn") {
				return true;
			}
		}
		return false;
	}

	// checks if the king is being attacked by the rook
	// or queen (vertically or horizontally)
	function attackedByRookOrQ(king_row, king_col) {	
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");

		var counter_col = king_row;
		var counter_row = king_row;
		while (counter_row < 7) {
			counter_row++;
			var square = pieces[counter_row][counter_col];

			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whrook" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}
		
		var counter_row = king_row;
		while (counter_row > 0) {
			counter_row--;
			var square = pieces[counter_row][counter_col];

			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whrook" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}

		var counter_row = king_row;
		var counter_col = king_col;
		while (counter_col < 7) {
			counter_col++;
			var square = pieces[counter_row][counter_col];

			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whrook" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}

		var counter_col = king_col;
		while (counter_col > 0) {
			counter_col--;
			var square = pieces[counter_row][counter_col];

			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whrook" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}

		return false;
	}

	// checks if black king is attacked by bishop or
	// queen diagonally
	function attackedByBishopOrQ(king_row, king_col) {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");

		var counter_col = king_col;
		var counter_row = king_row;
		while (counter_col > 0 && counter_row > 0) {
			counter_col--;
			counter_row--;

			var square = pieces[counter_row][counter_col];
			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whbishop" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}
		
		var counter_col = king_col;
		var counter_row = king_row;
		while (counter_col > 0 && counter_row < 7) {
			counter_col--;
			counter_row++;

			var square = pieces[counter_row][counter_col];
			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whbishop" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}
		
		var counter_col = king_col;
		var counter_row = king_row;
		while (counter_col < 7 && counter_row > 0) {
			counter_col++;
			counter_row--;

			var square = pieces[counter_row][counter_col];
			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whbishop" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}
		
		var counter_col = king_col;
		var counter_row = king_row;
		while (counter_col < 7 && counter_row < 7) {
			counter_col++;
			counter_row++;

			var square = pieces[counter_row][counter_col];
			if (pattBl.test(square)) {
				break;
			}
			else if (square == "whbishop" 
				|| square == "whqueen") {
				return true;
			}
			else if (pattWh.test(square)) {
				break;
			}
		}

		return false;
	}

	// checks if the black king is attacked by the knight
	function attackedByKnight(king_row, king_col) {
		var onBoard = new Array();

		if(king_row - 2 >= 0 && king_col - 1 >= 0) {
			onBoard.push([king_row - 2, king_col - 1]);
		}
		if(king_row - 1 >=0 && king_col - 2 >= 0) {
			onBoard.push([king_row - 1, king_col - 2]);
		}
		if(king_row + 1 <= 7 && king_col - 2 >= 0) {
			onBoard.push([king_row + 1, king_col - 2]);
		}
		if(king_row + 2 <= 7 && king_col - 1 >= 0) {
			onBoard.push([king_row + 2, king_col - 1]);
		}
		if(king_row - 1 >= 0 && king_col + 2 <= 7) {
			onBoard.push([king_row - 1, king_col + 2]);
		}
		if(king_row - 2 >= 0 && king_col + 1 <= 7) {
			onBoard.push([king_row - 2, king_col + 1]);
		}
		if(king_row + 1 <= 7 && king_col + 2 <= 7) {
			onBoard.push([king_row + 1, king_col + 2]);
		}
		if(king_row + 2 <= 7 && king_col + 1 <= 7) {
			onBoard.push([king_row + 2, king_col + 1]);
		}

		for(var kk = 0; kk < onBoard.length; kk++) {
			if (pieces[onBoard[kk][0]][onBoard[kk][1]] == "whknight") {
				return true;
			}
		}
		return false;
	}

	// checks if the black king is attacked by a white pawn
	if (attackedByPawn(king_row, king_col) || attackedByRookOrQ(king_row, king_col)
		|| attackedByBishopOrQ(king_row, king_col) || attackedByKnight(king_row, king_col)) {
		return true;
	}
	else {
		return false;
	}
}