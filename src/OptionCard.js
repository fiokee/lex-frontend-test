import React from 'react';
import './OptionCard.css';

function OptionCard({ title, description, icon }) {
  return (
    <div className="option-card">
      <img src={icon} alt={title} className="option-icon" />
      <div className="option-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default OptionCard;
