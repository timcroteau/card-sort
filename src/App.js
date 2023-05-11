// src/App.js
import React, { useState } from 'react';
import './App.css';
import InputArea from './InputArea';
import GroupArea from './GroupArea';
import { CloseIcon } from './Icons';

function App() {
    const [cards, setCards] = useState([]);
    const [groupCards, setGroupCards] = useState({});

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData('text/plain', card);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, groupName) => {
        e.preventDefault();
        const droppedCard = e.dataTransfer.getData('text/plain');

        if (groupName === 'main') {
            if (cards.includes(droppedCard)) {
                return;
            }
            setCards([...cards, droppedCard]);

            // Remove the card from its original group
            const updatedGroupCards = { ...groupCards };
            for (const key in updatedGroupCards) {
                updatedGroupCards[key] = updatedGroupCards[key].filter(
                    (card) => card !== droppedCard
                );
            }
            setGroupCards(updatedGroupCards);
        } else {
            if (groupCards[groupName] && groupCards[groupName].includes(droppedCard)) {
                return;
            }

            // Remove the card from its original group
            const updatedGroupCards = { ...groupCards };
            for (const key in updatedGroupCards) {
                if (updatedGroupCards[key].includes(droppedCard)) {
                    updatedGroupCards[key] = updatedGroupCards[key].filter(
                        (card) => card !== droppedCard
                    );
                }
            }
            setCards(cards.filter((c) => c !== droppedCard));
            setGroupCards({
                ...updatedGroupCards,
                [groupName]: [...(groupCards[groupName] || []), droppedCard],
            });
        }
    };

    const removeCard = (card, groupName) => {
      if (groupName === 'main') {
        setCards(cards.filter((c) => c !== card));
      } else {
        const updatedGroupCards = { ...groupCards };
        updatedGroupCards[groupName] = updatedGroupCards[groupName].filter(
          (c) => c !== card
        );
        setGroupCards(updatedGroupCards);
      }
    };

    const sendCardToHoldingArea = (card, groupName) => {
      if (groupName !== 'main') {
        setCards([...cards, card]);

        const updatedGroupCards = { ...groupCards };
        updatedGroupCards[groupName] = updatedGroupCards[groupName].filter(
          (c) => c !== card
        );
        setGroupCards(updatedGroupCards);
      }
    };

    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Welcome to the Card Sorting App</h1>
        <p>
          This tool can be used to perform quick card sorting exercises. The goal of a card sorting exercise is to explore how different people would choose to group and sort items in a site map.
          This app allows you to create cards and sort them into custom groups.
          Use the input areas below to create cards and groups, and then drag and
          drop the cards to organize them.
        </p>
        <p>
          You can also remove a card or send it back to the holding area by
          clicking on the respective buttons on each card.
        </p>
        <div className="columns" style={{ display: 'flex' }}>
          <InputArea
            handleDrop={(e) => handleDrop(e, 'main')}
            handleDragOver={handleDragOver}
            cards={cards}
            setCards={setCards}
            removeCard={removeCard}
          />
          <GroupArea
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            cards={cards}
            setCards={setCards}
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            removeCard={removeCard}
            sendCardToHoldingArea={sendCardToHoldingArea}
          />
        </div>
    </div>
    );
}

export default App;