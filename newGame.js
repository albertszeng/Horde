function newGame() {
	var confirmed = window.confirm("Would you like to start a new game? This cannot be undone.");
	if(confirmed) {
	
		// reset moveHistory, boardStates, check
		moveHistory.length = 1;
		check = false;
		

		if(perspective == 1) {
			cloneArray(moveHistory[0], pieces);	
		}
		else {
			cloneArrayReverse(moveHistory[0], pieces);
		}
		loadPieces(pieces);
		clicked = 0;
		turn = 0;
		stalemated = false;
		black_wins = false;
		white_wins = false;

		document.getElementById("board").removeEventListener("click", makeMove);
		document.getElementById("board").addEventListener("click", makeMove);
	}
}