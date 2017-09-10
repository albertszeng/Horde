function makeMove(e) {
	if(clicked == 0) {
		var rect = board.getBoundingClientRect();
		
		var x1 = (e.clientX-rect.left)/(rect.right-rect.left)*canvas.width;
		var y1 = (e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height;

		[initialRow, initialCol] = clickToTile(x1, y1);

		if(turn == 0) {
			var patt = new RegExp("wh");
		}
		else {
			var patt = new RegExp("bl");
		}
		if(patt.test(pieces[initialRow][initialCol])) {
			clicked = 1;
			highlightTile(initialRow, initialCol, "");
			var legalMoves = possibleMoves(pieces, initialRow, initialCol);

			for(var k = 0; k < legalMoves.length; k++) {
				highlightTile(legalMoves[k][0][0], legalMoves[k][0][1], legalMoves[k][1]);
			}
		}
	}
	else {
		clicked = 0;

		var rect = board.getBoundingClientRect();
		
		var x2 = (e.clientX-rect.left)/(rect.right-rect.left)*canvas.width;
		var y2 = (e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height;

		[finalRow, finalCol] = clickToTile(x2, y2);

		// setting tempTurn so that later, we can check if move was successful
		var tempTurn = 0;
		if (turn == 0) {
			var tempTurn = 0;
		}
		else {
			var tempTurn = 1;
		}

		// move piece (fails if not a legal move). Turn counter is changed
		moveInArray2(initialRow, initialCol, finalRow, finalCol);

		// if the turn didn't fail, ie. turn variable was changed, save state to history
		if (turn != tempTurn) {
			saveState();
			
			if (turn == 0) {
				//console.log("score after black plays");	
				//console.log(maximize(0, pieces, "white")[0]);
			}
			else {
				//console.log("score after white plays");
				//console.log(maximize(0, pieces, "white")[0]);
			}
			
		}
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
		// wait 50 milliseconds for the board to load, then AI moves
		// 50 ms delay is necessary because otherwise, old board isn't cleared
		else if (AIstatus > 0) {
			setTimeout(function () {AIMove();}, AIWAITTIME);
		}
	}
}