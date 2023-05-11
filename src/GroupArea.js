// src/GroupArea.js
import React, { useState } from 'react';
import { DeleteIcon, DeleteGroupIcon, BackIcon } from './Icons';


const Group = ({ name, onDrop, onDragOver, groupCards, handleDragStart, removeCard, sendCardToHoldingArea, onDeleteGroup }) => {
  return (
    <div
      className="group"
      onDrop={(e) => onDrop(e, name)}
      onDragOver={onDragOver}
    >
      <h3>{name}</h3>
      <div className="delete-group-btn" onClick={() => onDeleteGroup(name)}>
        <DeleteGroupIcon />
      </div>
      {groupCards[name] &&
        groupCards[name].map((card) => (
          <div
            className="card"
            key={card}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
          >
            {card}
            <span>
              <span 
                className="delete-icon-container"
                style={{ cursor: 'pointer', marginLeft: '4px' }}
                onClick={() => removeCard(card, name)}
              >
                <DeleteIcon />
              </span>
              {name !== 'main' && (
                <span
                  className="back-icon-container"
                  style={{ cursor: 'pointer', marginLeft: '4px' }}
                  onClick={() => sendCardToHoldingArea(card, name)}
                >
                  <BackIcon />
                </span>
              )}
              
            </span>
          </div>
      ))}
    </div>
  );
};

const GroupArea = ({
  handleDrop,
  handleDragOver,
  cards,
  setCards,
  groupCards,
  setGroupCards,
  removeCard,
  sendCardToHoldingArea
}) => {
  const [groups, setGroups] = useState([]);
  const [newGroupNames, setNewGroupNames] = useState('');

  const handleCreateGroups = () => {
    const newGroups = newGroupNames
      .trim()
      .split('\n')
      .filter((name) => name.trim().length > 0);
    setGroups([...groups, ...newGroups]);
    setNewGroupNames('');
  };

  const handleGroupNamesChange = (e) => {
    setNewGroupNames(e.target.value);
  };
  const deleteGroup = (groupToDelete) => {
    // Move all cards in the deleted group back to the holding area
    const cardsToMove = groupCards[groupToDelete] || [];
    setCards([...cards, ...cardsToMove]);

    // Remove the group from the list of groups
    setGroups(groups.filter((group) => group !== groupToDelete));

    // Remove the group from the groupCards object
    const newGroupCards = { ...groupCards };
    delete newGroupCards[groupToDelete];
    setGroupCards(newGroupCards);
  };

  return (
    <div className="right-section">
      <h2>Create groups to sort into below</h2>
      <textarea
        value={newGroupNames}
        onChange={handleGroupNamesChange}
        rows={3}
        placeholder="Enter group names separated by new lines"
      />
      <button onClick={handleCreateGroups}>Create groups</button>
      <div className="right">
        {groups.map((group) => (
          <Group
            key={group}
            name={group}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            groupCards={groupCards}
            handleDragStart={(e, card) => {
              e.dataTransfer.setData('text/plain', card);
            }}
            removeCard={removeCard}
            sendCardToHoldingArea={sendCardToHoldingArea}
            onDeleteGroup={deleteGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupArea;
