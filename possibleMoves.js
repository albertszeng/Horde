// Checks if possible moves are legal 
// ie. prevent check if in check and pinned pieces can't move
function checkIfPreventsCheck(row1, col1, possibleMoves) {
	for(var i = 0; i < possibleMoves.length; i++) {
		// current piece that is moving
		var mover = pieces[row1][col1];
		
		// location that mover will move to
		var row2 = possibleMoves[i][0][0];
		var col2 = possibleMoves[i][0][1];
		
		// piece/blank space that mover will be moved to
		var saved_piece = pieces[row2][col2];

		// try to move the piece
		pieces[row1][col1] = "0";
		pieces[row2][col2] = mover;

		// if now there is check, move is illegal. remove it from array
		if(inCheck(pieces)) {
			possibleMoves.splice(i, 1);	
			i--;		
		}

		// undo the move in the array
		pieces[row1][col1] = mover;
		pieces[row2][col2] = saved_piece;
	}
}

// returns an array of all possible moves of an object
function possibleMoves(row, col) {
	var mover = pieces[row][col];
	var legalMoves = new Array();
	
	if(mover == "whpawn") {
		var patt = new RegExp("bl");
		if(perspective == 0) {
			if(pieces[row + 1][col] == "0") {
				legalMoves.push([[row + 1, col], "Green"]);

				if(row < 2) {
					if(pieces[row + 2][col] == "0") {
						legalMoves.push([[row + 2, col], "Green"]);
					}
				}
			}
			if(col < 7) {
				if(patt.test(pieces[row + 1][col + 1])) {
					legalMoves.push([[row + 1, col + 1], "Red"]);
				}	
			}
			if(col > 0) {
				if(patt.test(pieces[row + 1][col - 1])) {
					legalMoves.push([[row + 1, col - 1], "Red"]);
				}
			}

		}
		else {
			if(pieces[row - 1][col] == "0") {
				legalMoves.push([[row - 1, col], "Green"]);

				if(row > 5) {
					if(pieces[row - 2][col] == "0") {
						legalMoves.push([[row - 2, col], "Green"]);
					}
				}
			}
			if(col < 7) {
				if(patt.test(pieces[row - 1][col + 1])) {
					legalMoves.push([[row - 1, col + 1], "Red"]);
				}	
			}
			if(col > 0) {
				if(patt.test(pieces[row - 1][col - 1])) {
					legalMoves.push([[row - 1, col - 1], "Red"]);
				}
			}
		}
		return legalMoves;
	}

	if(mover == "blpawn") {
		var patt = new RegExp("wh");
		if(perspective == 0) {
			if(pieces[row - 1][col] == "0") {
				legalMoves.push([[row - 1, col], "Green"]);

				if(row == 6) {
					if(pieces[row - 2][col] == "0") {
						legalMoves.push([[row - 2, col], "Green"]);
					}
				}
			}
			if(col < 7) {
				if(patt.test(pieces[row - 1][col + 1])) {
					legalMoves.push([[row - 1, col + 1], "Red"]);
				}	
			}
			if(col > 0) {
				if(patt.test(pieces[row - 1][col - 1])) {
					legalMoves.push([[row - 1, col - 1], "Red"]);
				}
			}
		}
		else {
			if(pieces[row + 1][col] == "0") {
				legalMoves.push([[row + 1, col], "Green"]);

				if(row == 1) {
					if(pieces[row + 2][col] == "0") {
						legalMoves.push([[row + 2, col], "Green"]);
					}
				}
			}
			if(col < 7) {
				if(patt.test(pieces[row + 1][col + 1])) {
					legalMoves.push([[row + 1, col + 1], "Red"]);
				}	
			}
			if(col > 0) {
				if(patt.test(pieces[row + 1][col - 1])) {
					legalMoves.push([[row + 1, col - 1], "Red"]);
				}
			}
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}

	if(mover == "blrook") {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");
		
		var counterRow = row;
		while(counterRow < 7) {
			counterRow++;
			if(pattBl.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		counterRow = row;
		while(counterRow > 0) {
			counterRow--;
			if(pattBl.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		var counterCol = col;
		while(counterCol < 7) {
			counterCol++;
			if(pattBl.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}
		counterCol = col;
		while(counterCol > 0) {
			counterCol--;
			if(pattBl.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}

	if(mover == "blbishop") {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");

		var counterRow = row;
		var counterCol = col;
		while(counterRow > 0 && counterCol > 0) {
			counterRow--;
			counterCol--;

			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol < 7) {
			counterRow++;
			counterCol++;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol < 7) {
			counterRow--;
			counterCol++;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol > 0) {
			counterRow++;
			counterCol--;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}

	if(mover == "blqueen") {

		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");
		
		var counterRow = row;
		while(counterRow < 7) {
			counterRow++;
			if(pattBl.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		counterRow = row;
		while(counterRow > 0) {
			counterRow--;
			if(pattBl.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		var counterCol = col;
		while(counterCol < 7) {
			counterCol++;
			if(pattBl.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}
		counterCol = col;
		while(counterCol > 0) {
			counterCol--;
			if(pattBl.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}


		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol > 0) {
			counterRow--;
			counterCol--;

			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol < 7) {
			counterRow++;
			counterCol++;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol < 7) {
			counterRow--;
			counterCol++;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol > 0) {
			counterRow++;
			counterCol--;
			
			if(pattBl.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattWh.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}

	if(mover == "blknight") {
		var onBoard = new Array();

		if(row - 2 >= 0 && col - 1 >= 0) {
			onBoard.push([row - 2, col - 1]);
		}
		if(row - 1 >=0 && col - 2 >= 0) {
			onBoard.push([row - 1, col - 2]);
		}
		if(row + 1 <= 7 && col - 2 >= 0) {
			onBoard.push([row + 1, col - 2]);
		}
		if(row + 2 <= 7 && col - 1 >= 0) {
			onBoard.push([row + 2, col - 1]);
		}
		if(row - 1 >= 0 && col + 2 <= 7) {
			onBoard.push([row - 1, col + 2]);
		}
		if(row - 2 >= 0 && col + 1 <= 7) {
			onBoard.push([row - 2, col + 1]);
		}
		if(row + 1 <= 7 && col + 2 <= 7) {
			onBoard.push([row + 1, col + 2]);
		}
		if(row + 2 <= 7 && col + 1 <= 7) {
			onBoard.push([row + 2, col + 1]);
		}

		var pattWh = new RegExp("wh");

		for(var k = 0; k < onBoard.length; k++) {
			if(pieces[onBoard[k][0]][onBoard[k][1]] == "0") {
				legalMoves.push([[onBoard[k][0], onBoard[k][1]], "Green"]);
			}
			else if(pattWh.test(pieces[onBoard[k][0]][onBoard[k][1]])) {
				legalMoves.push([[onBoard[k][0], onBoard[k][1]], "Red"]);
			}
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}


	if(mover == "blking") {
		var possibleMoves = new Array();
		var pattBl = new RegExp("bl");

		// check which spaces are on the board and not taken by black pieces
		// assume all acceptable moves are not captures
		if(row - 1 >= 0) {
			if(!pattBl.test(pieces[row - 1][col])) {
				possibleMoves.push([[row - 1, col], "Green"]);
			}
		}
		if(row + 1 <= 7) {
			if(!pattBl.test(pieces[row + 1][col])) {
				possibleMoves.push([[row + 1, col], "Green"]);
			}
		}
		if(col + 1 <= 7) {
			if(!pattBl.test(pieces[row][col + 1])) {
				possibleMoves.push([[row, col + 1], "Green"]);
			}
		}
		if(col - 1 >= 0) {
			if(!pattBl.test(pieces[row][col - 1])) {
				possibleMoves.push([[row, col - 1], "Green"]);
			}
		}
		if(row - 1 >= 0 && col - 1 >= 0) {
			if(!pattBl.test(pieces[row - 1][col - 1])) {
				possibleMoves.push([[row - 1, col - 1], "Green"]);
			}
		}
		if(row - 1 >=0 && col + 1 <= 7) {
			if(!pattBl.test(pieces[row - 1][col + 1])) {
				possibleMoves.push([[row - 1, col + 1], "Green"]);
			}
		}
		if(row + 1 <= 7 && col - 1 >= 0) {
			if(!pattBl.test(pieces[row + 1][col - 1])) {
				possibleMoves.push([[row + 1, col - 1], "Green"]);
			}
		}
		if(row + 1 <= 7 && col + 1 <= 7) {
			if(!pattBl.test(pieces[row + 1][col + 1])) {
				possibleMoves.push([[row + 1, col + 1], "Green"]);
			}
		}

		// check which spaces are under threat
		function attackedByPawn(possibleMoves) {
			
			for(var k = 0; k < possibleMoves.length; k++) {
				var remove = false;

				var curr_row = possibleMoves[k][0][0];
				var curr_col = possibleMoves[k][0][1];

				if(perspective == 0) {
					if(pieces[curr_row - 1][curr_col - 1] == "whpawn") {
						remove = true;
					}
					if(pieces[curr_row - 1][curr_col + 1] == "whpawn") {
						remove = true;
					}
				}
				else {
					if(pieces[curr_row + 1][curr_col - 1] == "whpawn") {
						remove = true;
					}
					if(pieces[curr_row + 1][curr_col + 1] == "whpawn") {
						remove = true;
					}
				}
				
				if (remove) {
					possibleMoves.splice(k, 1);
					k--;
				}
			}
		}

		function attackedByRookOrQ(possibleMoves) {	
			for(var k = 0; k < possibleMoves.length; k++) {
				var remove = false;

				var curr_row = possibleMoves[k][0][0];
				var curr_col = possibleMoves[k][0][1];

				var pattBl = new RegExp("bl");
				var pattWh = new RegExp("wh");

				var counter_col = curr_col;
				var counter_row = curr_row;
				while (counter_row < 7) {
					counter_row++;
					var square = pieces[counter_row][counter_col];

					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whrook" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}
				
				var counter_row = curr_row;
				while (counter_row > 0) {
					counter_row--;
					var square = pieces[counter_row][counter_col];

					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whrook" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}

				var counter_row = curr_row;
				var counter_col = curr_col;
				while (counter_col < 7) {
					counter_col++;
					var square = pieces[counter_row][counter_col];

					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whrook" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}

				var counter_col = curr_col;
				while (counter_col > 0) {
					counter_col--;
					var square = pieces[counter_row][counter_col];

					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whrook" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}


				if (remove) {
					possibleMoves.splice(k, 1);
					k--;
				}
			}			
		}

		function attackedByBishopOrQ(possibleMoves) {
			for(var k = 0; k < possibleMoves.length; k++) {
				var remove = false;

				var curr_row = possibleMoves[k][0][0];
				var curr_col = possibleMoves[k][0][1];

				var pattBl = new RegExp("bl");
				var pattWh = new RegExp("wh");

				var counter_col = curr_col;
				var counter_row = curr_row;
				while (counter_col > 0 && counter_row > 0) {
					counter_col--;
					counter_row--;

					var square = pieces[counter_row][counter_col];
					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whbishop" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}
				
				var counter_col = curr_col;
				var counter_row = curr_row;
				while (counter_col > 0 && counter_row < 7) {
					counter_col--;
					counter_row++;

					var square = pieces[counter_row][counter_col];
					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whbishop" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}
				
				var counter_col = curr_col;
				var counter_row = curr_row;
				while (counter_col < 7 && counter_row > 0) {
					counter_col++;
					counter_row--;

					var square = pieces[counter_row][counter_col];
					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whbishop" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}
				
				var counter_col = curr_col;
				var counter_row = curr_row;
				while (counter_col < 7 && counter_row < 7) {
					counter_col++;
					counter_row++;

					var square = pieces[counter_row][counter_col];
					if (pattBl.test(square)) {
						if (square != "blking") {
							break;
						}
					}
					else if (square == "whbishop" 
						|| square == "whqueen") {
						remove = true;
						break;
					}
					else if (pattWh.test(square)) {
						break;
					}
				}


				if (remove) {
					possibleMoves.splice(k, 1);
					k--;
				}
			}	
		}

		function attackedByKnight (possibleMoves) {
			for(var k = 0; k < possibleMoves.length; k++) {
				var remove = false;

				var curr_row = possibleMoves[k][0][0];
				var curr_col = possibleMoves[k][0][1];

				
				var onBoard = new Array();

				if(curr_row - 2 >= 0 && curr_col - 1 >= 0) {
					onBoard.push([curr_row - 2, curr_col - 1]);
				}
				if(curr_row - 1 >=0 && curr_col - 2 >= 0) {
					onBoard.push([curr_row - 1, curr_col - 2]);
				}
				if(curr_row + 1 <= 7 && curr_col - 2 >= 0) {
					onBoard.push([curr_row + 1, curr_col - 2]);
				}
				if(curr_row + 2 <= 7 && curr_col - 1 >= 0) {
					onBoard.push([curr_row + 2, curr_col - 1]);
				}
				if(curr_row - 1 >= 0 && curr_col + 2 <= 7) {
					onBoard.push([curr_row - 1, curr_col + 2]);
				}
				if(curr_row - 2 >= 0 && curr_col + 1 <= 7) {
					onBoard.push([curr_row - 2, curr_col + 1]);
				}
				if(curr_row + 1 <= 7 && curr_col + 2 <= 7) {
					onBoard.push([curr_row + 1, curr_col + 2]);
				}
				if(curr_row + 2 <= 7 && curr_col + 1 <= 7) {
					onBoard.push([curr_row + 2, curr_col + 1]);
				}

				for(var kk = 0; kk < onBoard.length; kk++) {
					if (pieces[onBoard[kk][0]][onBoard[kk][1]] == "whknight") {
						remove = true;
						break;
					}
				}

				if (remove) {
					possibleMoves.splice(k, 1);
					k--;
				}
			}
		}

		attackedByPawn(possibleMoves);
		attackedByRookOrQ(possibleMoves);
		attackedByBishopOrQ(possibleMoves);
		attackedByKnight(possibleMoves);

		// check if any possible moves are captures
		var pattWh = new RegExp("wh");
		for(var k = 0; k < possibleMoves.length; k++) {
			if(pattWh.test(pieces[possibleMoves[k][0][0]][possibleMoves[k][0][1]])) {
				possibleMoves[k][1] = "Red";
			}
		}

		for(var k = 0; k < possibleMoves.length; k++) {
			legalMoves.push(possibleMoves[k]);
		}
		checkIfPreventsCheck(row, col, legalMoves);
		return legalMoves;
	}

	if(mover == "whrook") {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");
		
		var counterRow = row;
		while(counterRow < 7) {
			counterRow++;
			if(pattWh.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		counterRow = row;
		while(counterRow > 0) {
			counterRow--;
			if(pattWh.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		var counterCol = col;
		while(counterCol < 7) {
			counterCol++;
			if(pattWh.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}
		counterCol = col;
		while(counterCol > 0) {
			counterCol--;
			if(pattWh.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}

		return legalMoves;
	}

	if(mover == "whbishop") {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");

		var counterRow = row;
		var counterCol = col;
		while(counterRow > 0 && counterCol > 0) {
			counterRow--;
			counterCol--;

			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol < 7) {
			counterRow++;
			counterCol++;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol < 7) {
			counterRow--;
			counterCol++;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol > 0) {
			counterRow++;
			counterCol--;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		return legalMoves;
	}

	if(mover == "whqueen") {
		var pattBl = new RegExp("bl");
		var pattWh = new RegExp("wh");
		
		var counterRow = row;
		while(counterRow < 7) {
			counterRow++;
			if(pattWh.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		counterRow = row;
		while(counterRow > 0) {
			counterRow--;
			if(pattWh.test(pieces[counterRow][col])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][col])) {
				legalMoves.push([[counterRow, col], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, col], "Green"]);
			}
		}
		var counterCol = col;
		while(counterCol < 7) {
			counterCol++;
			if(pattWh.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}
		counterCol = col;
		while(counterCol > 0) {
			counterCol--;
			if(pattWh.test(pieces[row][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[row][counterCol])) {
				legalMoves.push([[row, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[row, counterCol], "Green"]);
			}
		}


		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol > 0) {
			counterRow--;
			counterCol--;

			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol < 7) {
			counterRow++;
			counterCol++;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow > 0 && counterCol < 7) {
			counterRow--;
			counterCol++;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		counterRow = row;
		counterCol = col;
		while(counterRow < 7 && counterCol > 0) {
			counterRow++;
			counterCol--;
			
			if(pattWh.test(pieces[counterRow][counterCol])) {
				break;
			}
			else if(pattBl.test(pieces[counterRow][counterCol])) {
				legalMoves.push([[counterRow, counterCol], "Red"]);
				break;
			}
			else {
				legalMoves.push([[counterRow, counterCol], "Green"]);
			}
		}

		return legalMoves;
	}

	if(mover == "whknight") {
		var onBoard = new Array();

		if(row - 2 >= 0 && col - 1 >= 0) {
			onBoard.push([row - 2, col - 1]);
		}
		if(row - 1 >=0 && col - 2 >= 0) {
			onBoard.push([row - 1, col - 2]);
		}
		if(row + 1 <= 7 && col - 2 >= 0) {
			onBoard.push([row + 1, col - 2]);
		}
		if(row + 2 <= 7 && col - 1 >= 0) {
			onBoard.push([row + 2, col - 1]);
		}
		if(row - 1 >= 0 && col + 2 <= 7) {
			onBoard.push([row - 1, col + 2]);
		}
		if(row - 2 >= 0 && col + 1 <= 7) {
			onBoard.push([row - 2, col + 1]);
		}
		if(row + 1 <= 7 && col + 2 <= 7) {
			onBoard.push([row + 1, col + 2]);
		}
		if(row + 2 <= 7 && col + 1 <= 7) {
			onBoard.push([row + 2, col + 1]);
		}

		var pattBl = new RegExp("bl");

		for(var k = 0; k < onBoard.length; k++) {
			if(pieces[onBoard[k][0]][onBoard[k][1]] == "0") {
				legalMoves.push([[onBoard[k][0], onBoard[k][1]], "Green"]);
			}
			else if(pattBl.test(pieces[onBoard[k][0]][onBoard[k][1]])) {
				legalMoves.push([[onBoard[k][0], onBoard[k][1]], "Red"]);
			}
		}

		return legalMoves;
	}
}