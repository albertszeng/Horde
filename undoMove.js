// function for undoing a move
function undoMove() {
	// checks if at least one move has been made
	if (moveHistory.length > 1) {
		// if AI is off, only go back 1 move
		if (AIstatus == 0) {
			moveHistory.length = moveHistory.length - 1;
		}
		// if AI is on and player has made at least 1 move, undo 1 player mover and 1 AI move
		else if ((AIstatus == 1 && moveHistory.length > 2) || AIstatus == 2) {
			// if player just checkmated or stalemated the AI, undo only 1 move
			if (AIstatus == 1 && (black_wins || (turn == 0 && stalemated))) {
				moveHistory.length = moveHistory.length - 1;
				
				// if you only go back 1 turn, flip turn counter
				if(turn == 0) {
					turn = 1;
				}
				else {
					turn = 0;
				}
			}
			else if (AIstatus == 2 && (white_wins || (turn == 1 && stalemated))) {
				moveHistory.length = moveHistory.length - 1;

				// if you only go back 1 turn, flip turn counter
				if(turn == 0) {
					turn = 1;
				}
				else {
					turn = 0;
				}
			}

			// in all other cases that the AI is on, go back 2 moves
			else {
				moveHistory.length = moveHistory.length - 2;	
			}
		}
		else {
			throw "AIstatus is invalid";
		}

		// update Pieces array
		if(perspective == 0) {
			cloneArrayReverse(moveHistory[moveHistory.length - 1], pieces);
		}
		else {
			cloneArray(moveHistory[moveHistory.length - 1], pieces);
		}
	
		// re-load board
		loadPieces(pieces);

		// reset clicked
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
	console.log(moveHistory);
	
}