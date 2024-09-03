import React, { useState } from 'react';
import { db } from ''; // Import the Firestore instance

const Quiz = () => {
  const [answers, setAnswers] = useState({
    city: '',
    timeframe: '',
    activities: [],
    budget: '',
    companions: '',
    transportation: '',
    interests: [],
    weather: '',
    requirements: []
  });

  const handleAnswerSelection = (question, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: answer
    }));
  };

  const submitQuiz = async () => {
    try {
      // Add quiz answers to Firestore collection 'quizResponses'
      const docRef = await db.collection('quizResponses').add(answers);
      console.log('Quiz submitted successfully!', docRef.id);
      // Optionally, you can navigate to a new page or show a success message
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle error gracefully, e.g., show an error message
    }
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="content">
          <div className="header">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&"
              className="logo"
              alt="Logo"
            />
            <div className="title">Itinerator</div>
          </div>
          <div className="subtitle">Quiz</div>
          <div className="question">What city are you in?</div>
          <div className="options">
            <div className="button">SAN FRANCISCO</div>
            <div className="button">LOS ANGELES</div>
          </div>
          <div className="question">What is your timeframe?</div>
          <div className="options">
            <div className="button">ALL DAY</div>
            <div className="button">MORNING</div>
            <div className="button">AFTERNOON</div>
            <div className="button">EVENING</div>
          </div>
          <div className="question">What type of activities do you prefer?</div>
          <div className="options">
            <div className="button">OUTDOOR ADVENTURES</div>
            <div className="button">CULTURAL EXPERIENCES</div>
            <div className="button">FOOD AND DRINK</div>
            <div className="button">SHOPPING</div>
            <div className="button">RELAXATION</div>
            <div className="button">ENTERTAINMENT</div>
          </div>
          {/* Other questions and options */}
          <div className="submit-button" onClick={submitQuiz}>SUBMIT</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;