import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyB9cb7zySwiYnXgqWnQKgb8L84Q4Y-eYZY",
  authDomain: "itinerator-bf719.firebaseapp.com",
  projectId: "itinerator-bf719",
  storageBucket: "itinerator-bf719.appspot.com",
  messagingSenderId: "1086600294636",
  appId: "1:1086600294636:web:75ff5886022f30a853f5c9",
  measurementId: "G-M9TB6E76QY"
};

function preprocessInput() {
  return {
    city: 'a random city',
    activities: 'a variety of activities',
    timeframe: 'any timeframe',
    budget: 'a random budget',
    companions: 'any companions',
    interests: 'varied interests',
    requirements: 'no specific requirements',
    transportation: 'any mode of transportation',
    visitedBefore: 'unknown',
    weather: 'any weather',
  };
}

const Surprise = () => {
  const navigate = useNavigate();
  const db = getFirestore(initializeApp(firebaseConfig));

  useEffect(() => {
    const submitQuiz = async () => {
      try {
        const answers = preprocessInput();
        const quizResponsesRef = collection(db, 'quizResponses');
        const docRef = await addDoc(quizResponsesRef, answers);
        console.log('Quiz submitted successfully!', docRef.id);
        navigate(`/results/${docRef.id}`);
      } catch (error) {
        console.error('Error submitting quiz:', error);
      }
    };

    submitQuiz();
  }, [db, navigate]);

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
          <div className="subtitle">Surprise Quiz Submission</div>
          <p>Your quiz is being submitted...</p>
        </div>
      </div>
    </div>
  );
};

export default Surprise;