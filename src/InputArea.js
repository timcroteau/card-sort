// src/InputArea.js
import React, { useState } from 'react';
import { DeleteIcon } from './Icons';

const InputArea = ({ handleDrop, handleDragOver, cards, setCards, removeCard }) => {
  const [inputValue, setInputValue] = useState(''); // Add this line

  const handleCreateCards = () => {
    const newCards = inputValue
      .trim()
      .split('\n')
      .filter((label) => label.trim().length > 0);

    setCards((prevCards) => [...prevCards, ...newCards]);
    setInputValue(''); // Clear the input field
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value state
  };

  return (
    <div className="left-section">
      <h2>Paste labels to be sorted below</h2>
      <textarea
        value={inputValue} // Control the input value with state
        onChange={handleInputChange} // Add the onChange handler
        rows={10}
        placeholder="Enter list of text labels separated by new lines"
      />
      <button onClick={handleCreateCards}>Create cards</button>
      <div className="left"
        onDrop={(e) => handleDrop(e, 'main')}
        onDragOver={handleDragOver}
      >
        {cards.map((card) => (
          <div
            className="card"
            key={card}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', card);
            }}
          >
            {card}
            <span>
              <span 
                className="delete-icon-container" 
                style={{ cursor: 'pointer', marginLeft: '4px' }}
                onClick={() => removeCard(card, 'main')}
              >
                <DeleteIcon />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputArea;
