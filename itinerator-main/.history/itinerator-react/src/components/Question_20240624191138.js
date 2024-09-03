import React, { useState } from 'react';
import '../css/quiz.css';

const Question = ({ question, options, onSelect, useTextInput = false }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [textInput, setTextInput] = useState('');

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleTextInputChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
    onSelect(value);
  };

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      {useTextInput ? (
        <input
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          className="text-input"
        />
      ) : (
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`button ${selectedOptions.includes(option) ? 'selected' : ''}`}
              onClick={() => {
                toggleOption(option);
                onSelect(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;