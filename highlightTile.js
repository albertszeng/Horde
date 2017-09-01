var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

function highlightTile(row, col, color) {
	
	var x = col * tileSize;
	var y = row * tileSize;

	ctx.globalAlpha = 0.5;
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, x, y);
		// ctx.globalAlpha = 1;
	}
	img.src = "pics/highlight" + color + ".png";
}