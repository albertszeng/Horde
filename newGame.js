// function that triggers when New Game button is pressed
function newGame() {
	var confirmed = window.confirm("Would you like to start a new game? This cannot be undone.");
	if(confirmed) {
	
		// reset moveHistory, boardStates, check, stalemated, checkmated, Pieces array
		moveHistory.length = 1;
		check = false;
		stalemated = false;
		black_wins = false;
		white_wins = false;
		
		if(perspective == 1) {
			cloneArray(moveHistory[0], pieces);	
		}
		else {
			cloneArrayReverse(moveHistory[0], pieces);
		}
		loadPieces(pieces);

		// reset clicked, turn, and all messages below the board
		clicked = 0;
		turn = 0;
		document.getElementById("white_wins").style.visibility = "hidden";
		document.getElementById("black_wins").style.visibility = "hidden";
		document.getElementById("stalemate").style.visibility = "hidden";
		document.getElementById("check").style.visibility = "hidden";

		// reset board clicking event listener
		document.getElementById("board").removeEventListener("click", makeMove);
		document.getElementById("board").addEventListener("click", makeMove);
	}
}