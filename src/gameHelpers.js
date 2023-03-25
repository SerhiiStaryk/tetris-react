export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
	Array.from(Array(STAGE_HEIGHT), () =>
		new Array(STAGE_WIDTH).fill([0, 'clear'])
	);

export const checkCollision = (palyer, stage, { x: moveX, y: moveY }) => {
	for (let y = 0; y < palyer.tetromino.length; y += 1) {
		for (let x = 0; x < palyer.tetromino[0].length; x++) {
			//1. check thet we're on an actual Tetromino cell
			if (palyer.tetromino[y][x] !== 0) {
				if (
					//2. Check that our move is inside the game areas height (y)
					// We shouldn't go through the bootom of the play area
					!stage[y + palyer.pos.y + moveY] ||
					//3. Check that our move is inside the game areas width (x)
					!stage[y + palyer.pos.y + moveY][x + palyer.pos.x + moveX] ||
					//4. Check that the cell we're moving to isn't set to clear
					stage[y + palyer.pos.y + moveY][x + palyer.pos.x + moveX][1] !==
						'clear'
				) {
					return true;
				}
			}
		}
	}
};
