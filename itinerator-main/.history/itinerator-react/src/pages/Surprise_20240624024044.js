import React, { useState } from 'react';

const Surprise = () => {
	const [randomValue, setRandomValue] = useState('');

	const generateRandomValue = () => {
		const random = Math.random();
		setRandomValue(random);
	};

	return (
		<div>
			<h1>Surprise Page</h1>
			<button onClick={generateRandomValue}>Generate Random Value</button>
			{randomValue && <p>Random Value: {randomValue}</p>}
		</div>
	);
};

export default Surprise;