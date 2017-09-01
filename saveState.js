function saveState() {
	var length = moveHistory.length;
	moveHistory[length] = new Array(8);
	createArray(moveHistory[length]);

	// always record history with black on top
	if(perspective == 1) {
		cloneArray(pieces, moveHistory[length]);
	}
	else {
		cloneArrayReverse(pieces, moveHistory[length]);
	}
}