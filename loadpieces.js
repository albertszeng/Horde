// the canvas for the html baord (background image)
var canvas = document.getElementById("board");

// the context for the canvas. used to draw images on the board
var ctx = canvas.getContext("2d");

// function that clears the canvas and then re-draws all the pieces based on Pieces array
function loadPieces(pieces) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		
				img.src = "pics/" + pieces[i][j] + ".png";
				img.onload = stored(ctx, img, j, i);
			}
		}
	}
}


