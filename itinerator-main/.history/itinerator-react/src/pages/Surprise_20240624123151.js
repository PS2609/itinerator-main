import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuiz } from './Quiz'; // Import the submitQuiz function from the Quiz component
import { Link } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

const Surprise = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(initializeApp(firebaseConfig));

  useEffect(() => {
    if (!submitted) {
      setSubmitted(true);
      const defaultAnswers = {
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
      };

      const submit = async () => {
        await submitQuiz(db, defaultAnswers, navigate);
        setSubmitted(true); // Set the submission state to true
      };

      submit();
    }
  }, [submitted, db, navigate]);

  return null; // No need to render anything
};

export default Surprise;