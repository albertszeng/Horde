// function for undoing a move
function undoMove() {
	if(moveHistory.length > 1) {
		// deletes a move from move history
		moveHistory.length = moveHistory.length - 1;
		if(perspective == 0) {
			cloneArrayReverse(moveHistory[moveHistory.length - 1], pieces);
		}
		else {
			cloneArray(moveHistory[moveHistory.length - 1], pieces);
		}
		
		loadPieces(pieces);

		// go back 1 turn
		if(turn == 0) {
			turn = 1;
		}
		else {
			turn = 0;
		}
		clicked = 0;

		// resets game if previous move was a mate
		if (stalemated || black_wins || white_wins) {
			document.getElementById("board").addEventListener("click", makeMove);
			document.getElementById("white_wins").style.visibility = "hidden";
			document.getElementById("black_wins").style.visibility = "hidden";
			document.getElementById("stalemate").style.visibility = "hidden";
			stalemated = false;
			black_wins = false;
			white_wins = false;
		}

		// make sure check appears/disappears properly
		if (inCheck(pieces)) {
			document.getElementById("check").style.visibility = "visible";
		}
		else {
			document.getElementById("check").style.visibility = "hidden";
		}


	}
}