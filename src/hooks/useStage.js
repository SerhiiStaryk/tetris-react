import { useCallback, useEffect, useRef, useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());


	const updateStage = useCallback(
		
		(prevStage) => {
			//first flash the stage
			const newStage = prevStage.map((row) =>
				row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
			);

			//then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
						];
					}
				});
			});
			return newStage;
		},
		[player]
	);

	useEffect(() => {
		console.log('render');
		setStage((prev) => updateStage(prev));
	}, [updateStage]);

	return [stage, setStage];
};
