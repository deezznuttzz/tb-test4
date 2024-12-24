'use client';

import React from 'react';
import axios from 'axios';

const Card = ({ item }) => {
  

  return (
    <div style={cardStyle}>
      <h3>{item.name}</h3>
      <p>{item.details}</p>
      {item.imagepath && <img src={item.imagepath} alt={item.name} style={imageStyle} />}
      <p>Price: ${item.price}</p>
      
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '16px',
  margin: '8px 0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '300px',
  height: '300px',
};

const imageStyle = {
  width: '200px',
  height: '200px',
  marginTop: '8px',
};

export default Card;
