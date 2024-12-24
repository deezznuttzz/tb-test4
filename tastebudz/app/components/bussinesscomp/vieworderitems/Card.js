'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Card = ({ item, onItemUpdate, onItemDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('/api/orderitems/update', updatedItem);
      onItemUpdate(response.data); // Update item in the parent component
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/api/orderitems/delete', { data: { id: item.id } });
      onItemDelete(item.id); // Remove item in the parent component
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div style={cardStyle}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedItem.name}
            onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
          />
          <textarea
            value={updatedItem.details}
            onChange={(e) => setUpdatedItem({ ...updatedItem, details: e.target.value })}
          />
          <input
            type="number"
            value={updatedItem.price}
            onChange={(e) => setUpdatedItem({ ...updatedItem, price: parseInt(e.target.value, 10) })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{item.name}</h3>
          <p>{item.details}</p>
          {item.imagepath && <img src={item.imagepath} alt={item.name} style={imageStyle} />}
          <p>Price: ${item.price}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '16px',
  margin: '8px 0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '300px',
  height: '300px',
  marginTop: '8px',
};

export default Card;
