'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const VerticalScroller = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('/api/bussinesspage/verticalscroller');
        setOrderItems(response.data);
      } catch (error) {
        console.error('Failed to fetch order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  const handleItemUpdate = (updatedItem) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleItemDelete = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div style={scrollerStyle}>
      {orderItems.map((item) => (
        <Card
          key={item.id}
          item={item}
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />
      ))}
    </div>
  );
};

const scrollerStyle = {
  display: 'flex', // Makes the children align horizontally
  overflowX: 'scroll', // Enables horizontal scrolling
  overflowY: 'hidden', // Hides vertical overflow
  height: 'auto', // Adjust height as needed
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  gap: '8px', // Adds space between cards
  whiteSpace: 'nowrap', // Prevents wrapping of cards
};

export default VerticalScroller;
