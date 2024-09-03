import React from 'react';
import { db } from '../FirebaseConfig'; // Import the Firestore instance

const Question = ({ question, options, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      <div className="options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`button ${selectedOptions.includes(option) ? 'selected' : ''}`}
            onClick={() => toggleOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="selected-options">
        Selected: {selectedOptions.join(', ')}
      </div>
    </div>
  );
};

const Quiz = () => {
  const [answers, setAnswers] = React.useState({
    city: '',
    timeframe: [],
    activities: [],
    budget: '',
    companions: '',
    transportation: '',
    interests: [],
    weather: '',
    requirements: [],
    visitedBefore: ''
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
          
          {/* Questions with options */}
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

          <div className="submit-button" onClick={submitQuiz}>
            SUBMIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;