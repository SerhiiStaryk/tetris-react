import { useEffect, useCallback, useState, useMemo } from 'react';

export const useGameStatus = (rowsCleared) => {
	console.log('rowsCleared', rowsCleared);
	const [score, setScore] = useState(0);
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);

	const linePoints = useMemo(() => [40, 100, 300, 1200], []);

	const calcScore = useCallback(() => {
		//we have score
		if (rowsCleared > 0) {
			//this is how original Tetris score is calculated
			setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
			setRows((prev) => prev + rowsCleared);
		}
	}, [level, linePoints, rowsCleared]);

	useEffect(() => {
		calcScore();
	}, [calcScore, rowsCleared, score, linePoints]);

	return [score, setScore, rows, setRows, level, setLevel];
};
