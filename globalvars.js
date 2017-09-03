// define array for the pieces
var pieces = new Array(8);
function createArray(array) {
	for(var i = 0; i < 8; i++) {
		array[i] = new Array(8);
	}
}
createArray(pieces);

// define the size of the buffer around each piece on the board
var buffer = 5;

// define the size of each tile on the board
var tileSize = 60;

// define the number of rows
var rowSize = 8;

// define the number of columns
var columnSize = 8;

// counter to determine whether a piece has been selected or not after a click
var clicked = 0;

// variables for initial piece's row and column
var initialRow = 0;
var initialCol = 0;

// variable for final tile's row and column
var finalRow = 0;
var finalCol = 0;

// variable to keep track of perspective. 0 is white at the top.
var perspective = 1;

// variable to keep track of whose turn it is. 0 is white to play.
var turn = 0;

// creation of the bigass array that stores all the states of the game
// the first empty board state is also initialized
var moveHistory = new Array();
moveHistory[0] = new Array(8);
createArray(moveHistory[0]);

// temporary array that can hold one board state
var temp = new Array(8);
createArray(temp);

// board-state cloning functions
function cloneArray(original, clone) {
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			clone[i][j] = original[i][j];
		}
	}
}
// clones the array so that the board is reversed
function cloneArrayReverse(original, clone) {
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			clone[i][j] = original[7 - i][7 - j];
		}
	}
}

// define variable that keeps track of whether it's check
var check = false;

// define function that checks if two 8x8 arrays are identical
function compArrays(array1, array2) {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (array1[i][j] != array2[i][j]) {
				return false;
			}
		}
	}
	return true;
}

// function that keeps track of whether player is currently choosing a piece to queen to
var isQueening = false;

// variable that determines if stalemate just occurred
var stalemated = false;

// variable that determines if black just checkmated white
var black_wins = false;

// variable that determines if white just checkmated black
var white_wins = false;

// Max number of turns that the AI will calculate till
var MAXDEPTH = 4;

// 0 if AI is off, 1 if AI is white, 2 if AI is black
var AIstatus = 2;

// how many milliseconds the AI should wait before moving
var AIWAITTIME = 50;





