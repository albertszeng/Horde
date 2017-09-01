function minimize(depth, board) {
	if(depth == MAXDEPTH) {
		return heuristic(board);
	}
	var index = 0, score = Number.POSITIVE_INFINITY;
	for(i in list of legal moves) {
		tmp=maximize(depth+1, changed_board);
		if(score>tmp) {
			score=tmp;
			indx=i;
		}
	}
	return score;
}

function maximize(depth, board) {
	if(depth==MAXDEPTH) {
		return heuristic(board);
	}
	var indx=0, score=-0x3f3f3f3f;
	for(i in list of legal moves) {
		tmp=minimize(depth+1, changed_board);
		if(score<tmp) {
			score = tmp;
			indx=i;
		}
	}
	return score;
}



// function for determining the best possibel 
function minimize(player_to_move, depth, board) {
	if (depth == MAXDEPTH) {

	}
}