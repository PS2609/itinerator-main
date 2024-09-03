import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Question from '../components/Question';

const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

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
    visitedBefore: ''
  });

  // Firebase initialization
	const [db, setDb] = useState(null);
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
      [question]: answer
    }));
  };

const submitQuiz = async () => {
  try {
    if (!db) {
      console.error('Firestore is not initialized yet');
      return;
    }

    const quizResponsesRef = collection(db, 'quizResponses'); // Access Firestore collection
    const docRef = await addDoc(quizResponsesRef, answers); // Add quiz answers to Firestore

    console.log('Quiz submitted successfully!', docRef.id);
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
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
            <div className="title">Itinerator</div>
          </div>
          <div className="subtitle">Quiz</div>
          
          {/* Questions with options */}
          {/* Ensure db is initialized before rendering questions */}
          {db && (
            <>
              <Question
                question="What city are you in?"
                options={['SAN FRANCISCO', 'LOS ANGELES']}
                onSelect={(answer) => handleAnswerSelection('city', answer)}
              />
              
              <Question
                question="What is your timeframe?"
                options={['ALL DAY', 'MORNING', 'AFTERNOON', 'EVENING']}
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
                    ...answers.activities,
                    answer
                  ])
                }
              />
    
              <Question
                question="What's your budget for the day?"
                options={['BUDGET-FRIENDLY', 'MODERATE', 'LUXURY']}
                onSelect={(answer) => handleAnswerSelection('budget', answer)}
              />
              
              <Question
                question="Who are you planning to go with?"
                options={[
                  'ALONE',
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
                  handleAnswerSelection('interests', [...answers.interests, answer])
                }
              />
    
              <Question
                question="What is the current weather like in your city?"
                options={['SUNNY', 'CLOUDY', 'RAINY', 'SNOWY']}
                onSelect={(answer) => handleAnswerSelection('weather', answer)}
              />
              
              <Question
                question="Do you have any special requirements?"
                options={[
                  'ACCESSIBILITY NEEDS',
                  'DIETARY RESTRICTIONS',
                  'PET-FRIENDLY'
                ]}
                onSelect={(answer) =>
                  handleAnswerSelection('requirements', [
                    ...answers.requirements,
                    answer
                  ])
                }
              />
    
              <Question
                question="Have you been to this city before?"
                options={['YES', 'NO']}
                onSelect={(answer) =>
                  handleAnswerSelection('visitedBefore', answer)
                }
              />
            </>
          )}

          <div className="submit-button" onClick={submitQuiz}>
            SUBMIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;