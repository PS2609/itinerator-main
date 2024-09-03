import React from 'react';

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
            onClick={() => {
              toggleOption(option);
              onSelect(option);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;