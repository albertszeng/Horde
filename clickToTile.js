function clickToTile(x, y) {
	var row = Math.floor(y / tileSize);
	var col = Math.floor(x / tileSize);
	return [row, col];
}