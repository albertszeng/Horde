// function used to turn on white AI. if it is AI's turn, it moves
function ActivateWhiteAI() {
	AIstatus = 1;
	if (turn == 0) {
		AIMove();
	}
}

function ActivateBlackAI() {
	AIstatus = 2;
	if (turn == 1) {
		AIMove();
	}
}

function TurnOffAI() {
	AIstatus = 0;
}