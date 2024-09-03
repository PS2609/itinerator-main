import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import 

const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

function preprocessInput(data) {
  return {
    city: data.city || 'a random city',
    activities: data.activities || 'a variety of activities',
    timeframe: data.timeframe || 'any timeframe',
    budget: data.budget || 'a random budget',
    companions: data.companions || 'any companions',
    interests: data.interests || 'varied interests',
    requirements: data.requirements || 'no specific requirements',
    transportation: data.transportation || 'any mode of transportation',
    visitedBefore: data.visitedBefore || 'unknown',
    weather: data.weather || 'any weather',
    startingAddress: data.startingAddress || '',
    destinationAddress: data.destinationAddress || '',
    packingList: data.packingList || 'No'
  };
}

let isSubmitting = false; // Global variable to ensure submitQuiz is only called once

export async function submitQuiz(db, answers, navigate) {
  if (isSubmitting) return; // Check if submitQuiz has already been called
  isSubmitting = true; // Set the flag to true to prevent further submissions

  try {
    const processedAnswers = preprocessInput(answers);
    const quizResponsesRef = collection(db, 'quizResponses');
    const docRef = await addDoc(quizResponsesRef, processedAnswers);
    console.log('Quiz submitted successfully!', docRef.id);
    navigate(`/results/${docRef.id}`);
  } catch (error) {
    console.error('Error submitting quiz:', error);
  } finally {
    isSubmitting = false; // Reset the flag after submission
  }
}

const Quiz = () => {
  const [answers, setAnswers] = useState({
    city: '',
    timeframe: '',
    activities: '',
    budget: '',
    companions: '',
    transportation: '',
    interests: '',
    weather: '',
    requirements: '',
    visitedBefore: '',
    startingAddress: '',
    destinationAddress: '',
    packingList: 'No'
  });
  const [db, setDb] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    setDb(firestore);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleAnswerSelection = (question, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: Array.isArray(answer) ? answer.join(', ') : String(answer)
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return; // Check if the submission has already happened
    setIsSubmitted(true); // Set the submission state to true

    await submitQuiz(db, answers, navigate);
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="content">
          <div className="header">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&"
              className="logo"
              alt="Logo"
            />
            <Link to="/" className="title-link">
              Itinerator
            </Link>
          </div>
          <div className="subtitle">Quiz</div>
          
          {db && (
            <>
              <Question
                question="What city are you in?"
                useTextInput={true}
                onSelect={(answer) => handleAnswerSelection('city', answer)}
              />
              <Question
                question="What is your timeframe?"
                useTextInput={true}
                onSelect={(answer) => handleAnswerSelection('timeframe', answer)}
              />
              <Question
                question="What type of activities do you prefer?"
                options={[
                  'OUTDOOR ADVENTURES',
                  'CULTURAL EXPERIENCES',
                  'FOOD AND DRINK',
                  'SHOPPING',
                  'RELAXATION',
                  'ENTERTAINMENT'
                ]}
                onSelect={(answer) =>
                  handleAnswerSelection('activities', [
                    ...answers.activities.split(', '),
                    answer
                  ])
                }
              />
              <Question
                question="What's your budget?"
                useTextInput={true}
                options={['BUDGET-FRIENDLY', 'MODERATE', 'LUXURY']}
                onSelect={(answer) => handleAnswerSelection('budget', answer)}
              />
              <Question
                question="Who are you planning to go with?"
                options={[
                  'ALONE',
                  'WITH A FRIEND',
                  'WITH A PARTNER',
                  'WITH FRIENDS',
                  'WITH FAMILY',
                  'WITH KIDS'
                ]}
                onSelect={(answer) => handleAnswerSelection('companions', answer)}
              />
              <Question
                question="What modes of transportation do you have access to?"
                options={[
                  'WALKING',
                  'PUBLIC TRANSPORT',
                  'BICYCLE',
                  'CAR',
                  'RIDE-SHARING'
                ]}
                onSelect={(answer) =>
                  handleAnswerSelection('transportation', answer)
                }
              />
              <Question
                question="What are your main interests?"
                options={[
                  'HISTORY',
                  'ART',
                  'NATURE',
                  'FOOD',
                  'SHOPPING',
                  'SPORTS',
                  'NIGHTLIFE'
                ]}
                onSelect={(answer) =>
                  handleAnswerSelection('interests', [
                    ...answers.interests.split(', '),
                    answer
                  ])
                }
              />
              <Question
                question="What is the current weather like in your city?"
                options={['SUNNY', 'CLOUDY', 'RAINY', 'SNOWY']}
                onSelect={(answer) => handleAnswerSelection('weather', answer)}
              />
              <Question
                question="Do you have any special requirements?"
                useTextInput={true}
                options={[
                  'ACCESSIBILITY NEEDS',
                  'DIETARY RESTRICTIONS',
                  'PET-FRIENDLY'
                ]}
                onSelect={(answer) =>
                  handleAnswerSelection('requirements', [
                    ...answers.requirements.split(', '),
                    answer
                  ])
                }
              />
              <button className="submit-button" onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>
              {showAdvanced && (
                <div className="advanced-options">
                  <Question
                    question="Starting location (address):"
                    useTextInput={true}
                    onSelect={(answer) => handleAnswerSelection('startingAddress', answer)}
                  />
                  <Question
                    question="Destination address:"
                    useTextInput={true}
                    onSelect={(answer) => handleAnswerSelection('destinationAddress', answer)}
                  />
                  <Question
                    question="Would you like an optional packing list?"
                    options={['Yes', 'No']}
                    onSelect={(answer) => handleAnswerSelection('packingList', answer)}
                  />
                </div>
              )}
            </>
          )}

          <div className="submit-button" onClick={handleSubmit}>
            SUBMIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;