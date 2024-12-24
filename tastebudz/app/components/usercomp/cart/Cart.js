'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User not logged in.');
          return;
        }

        const response = await axios.get(`/api/userpage/cart/get?userId=${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  if (!cartItems.length) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={cartItemStyle}>
          <p><strong>{item.name}</strong></p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          {item.extras && <p>Extras: {item.extras}</p>}
        </div>
      ))}
    </div>
  );
};

const cartItemStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  margin: '8px 0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

export default Cart;
