import React, { useState } from 'react';

const Surprise = () => {
	const [quizAnswers, setQuizAnswers] = useState({});

	const generateRandomValues = async () => {
		const prompt = `
Generate random answers for the following quiz questions:

1. What city are you in?
   Example answers: "New York", "San Francisco", "Tokyo"

2. What is your timeframe?
   Example answers: "This weekend", "Next month", "Over the summer"

3. What type of activities do you prefer?
   Example answers: "OUTDOOR ADVENTURES", "CULTURAL EXPERIENCES", "FOOD AND DRINK", "SHOPPING", "RELAXATION", "ENTERTAINMENT"

4. What's your budget?
   Example answers: "BUDGET-FRIENDLY", "MODERATE", "LUXURY"

5. Who are you planning to go with?
   Example answers: "ALONE", "WITH A FRIEND", "WITH A PARTNER", "WITH FRIENDS", "WITH FAMILY", "WITH KIDS"

6. What modes of transportation do you have access to?
   Example answers: "WALKING", "PUBLIC TRANSPORT", "BICYCLE", "CAR", "RIDE-SHARING"

7. What are your main interests?
   Example answers: "HISTORY", "ART", "NATURE", "FOOD", "SHOPPING", "SPORTS", "NIGHTLIFE"

8. What is the current weather like in your city?
   Example answers: "SUNNY", "CLOUDY", "RAINY", "SNOWY"

9. Do you have any special requirements?
   Example answers: "ACCESSIBILITY NEEDS", "DIETARY RESTRICTIONS", "PET-FRIENDLY"

10. Have you been to this city before?
    Example answers: "YES", "NO"

Please provide random values for each question as if you were filling out the quiz.
`;

		// Replace with your actual call to the Gemini API
		const response = await fetch('https://api.gemini.chatbot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});

		const data = await response.json();

		// Assuming the response data contains the answers in a structured format
		setQuizAnswers(data);
	};

	return (
		<div>
			<h1>Surprise Page</h1>
			<button onClick={generateRandomValues}>Generate Random Values</button>
			{quizAnswers && (
				<div>
					<p>City: {quizAnswers.city}</p>
					<p>Timeframe: {quizAnswers.timeframe}</p>
					<p>Activities: {quizAnswers.activities}</p>
					<p>Budget: {quizAnswers.budget}</p>
					<p>Companions: {quizAnswers.companions}</p>
					<p>Transportation: {quizAnswers.transportation}</p>
					<p>Interests: {quizAnswers.interests}</p>
					<p>Weather: {quizAnswers.weather}</p>
					<p>Requirements: {quizAnswers.requirements}</p>
					<p>Visited Before: {quizAnswers.visitedBefore}</p>
				</div>
			)}
		</div>
	);
};

export default Surprise;