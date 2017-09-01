function swapPerspective() {
	cloneArrayReverse(pieces, temp);
	cloneArray(temp, pieces);

	if(perspective == 0) {
		perspective = 1;
	}
	else {
		perspective = 0;
	}

	loadPieces(pieces);
}