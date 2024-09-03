import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Surprise = () => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const firestore = getFirestore();
  const auth = getAuth();

  // Function to generate random quiz answers
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

    try {
      const response = await fetch('https://us-west4-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-west4/models/gemini-1.5-pro:predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          instances: [{ content: prompt }],
          parameters: {
            temperature: 0.5,
            max_output_tokens: 100,
          }
        })
      });

      const data = await response.json();
      const generatedAnswers = data.predictions[0].content;

      // Update Firestore with the generated answers
      const docRef = await addDoc(collection(firestore, 'chat'), {
        prompt: prompt,
        response: generatedAnswers,
        createTime: new Date()
      });

      console.log('Document written with ID: ', docRef.id);
      setQuizAnswers(generatedAnswers);
    } catch (error) {
      console.error('Error generating random values:', error);
    }
  };

  // Ensure the user is authenticated
  const ensureAuthenticated = async () => {
    const user = auth.currentUser;
    if (!user) {
      await signInAnonymously(auth);
    }
  };

  // Generate random values when the button is clicked
  const handleGenerateClick = async () => {
    await ensureAuthenticated();
    generateRandomValues();
  };

  return (
    <div>
      <h1>Surprise Page</h1>
      <button onClick={handleGenerateClick}>Generate Random Values</button>
      {quizAnswers && (
        <div>
          <p>Generated Answers:</p>
          <pre>{quizAnswers}</pre>
        </div>
      )}
    </div>
  );
};

export default Surprise;