import { useCallback, useState } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, ramdomTetromino } from '../tetrominos';

export const usePlayer = () => {
	const [player, setPlayer] = useState({
		pos: { x: 0, y: 0 },
		tetromino: TETROMINOS[0].shape,
		collided: false,
	});

	const updatePlayerPos = ({ x, y, collided }) => {
		setPlayer((prev) => {
			return {
				...prev,
				pos: {
					x: prev.pos.x + x,
					y: prev.pos.y + y,
				},
				collided,
			};
		});
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
			tetromino: ramdomTetromino().shape,
			collided: false,
		});
	}, []);

	return [player, updatePlayerPos, resetPlayer];
};
