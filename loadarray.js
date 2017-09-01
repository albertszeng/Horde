function loadArray() {
	// fill pieces array with 0s
	for(row = 0; row < 8; row++) {
		for (column = 0; column < 8; column++) {
			pieces[row][column] = "0";
		}
	}

	// Set 40 white pawns in the first five rows of the array
	for(row = 7; row > 2; row--) {
		for(column = 0; column < 8; column++) {
			pieces[row][column] = "whpawn";
		}
	}

	// remove 4 white pawns from a, d, e, and h files
	pieces[3][0] = "0";
	pieces[3][3] = "0";
	pieces[3][4] = "0";
	pieces[3][7] = "0";

	// populate black pawns
	for(column= 0; column < 8; column++) {
		pieces[1][column] = "blpawn";
	}

	// populate black's other pieces
	pieces[0][0] = "blrook";
	pieces[0][1] = "blknight";
	pieces[0][2] = "blbishop";
	pieces[0][3] = "blqueen";
	pieces[0][4] = "blking";
	pieces[0][5] = "blbishop";
	pieces[0][6] = "blknight";
	pieces[0][7] = "blrook";

	// populate first moveHistory cell
	cloneArray(pieces, moveHistory[0]);
}







