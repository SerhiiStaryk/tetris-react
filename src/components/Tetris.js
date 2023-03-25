import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	// console.log('re-render');

	const movePlayer = (direction) => {
		if (!checkCollision(player, stage, { x: direction, y: 0 })) {
			updatePlayerPos({ x: direction, y: 0 });
		}
	};

	const startGame = () => {
		//reset everything
		setStage(createStage());
		resetPlayer();
		setGameOver(false);
	};

	const drop = () => {
		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });
		} else {
			//Game over
			if (player.pos.y < 1) {
				console.log('game over');
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};

	const dropPlayer = () => {
		drop();
	};

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			}

			if (keyCode === 39) {
				movePlayer(1);
			}

			if (keyCode === 40) {
				dropPlayer();
			}

			if (keyCode === 38) {
				playerRotate(stage, 1);
			}
		}
	};

	return (
		<StyledTetrisWrapper
			role='button'
			tabIndex='0'
			onKeyDown={(e) => {
				move(e);
			}}
		>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text='Game Over' />
					) : (
						<div>
							<Display text='Score' />
							<Display text='Rows' />
							<Display text='Level' />
						</div>
					)}

					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
