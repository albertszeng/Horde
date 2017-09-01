var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

function loadPieces(pieces) {
	ctx.clearRect(0, 0, 480, 480);
	ctx.globalAlpha = 1;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if (pieces[i][j] != "0") {
				var img = new Image();
				var stored = function(ctx, img, j, i) {
					return function() {
						ctx.drawImage(img, buffer + j * tileSize, buffer + i * tileSize);
					}
				}
				img.onload = stored(ctx, img, j, i);
				img.src = "pics/" + pieces[i][j] + ".png";
			}
		}
	}
}


