'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreScroller from './StoreScroller';

const Menu = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('/api/userpage/veiwmenu');
        setOrderItems(response.data);
      } catch (error) {
        console.error('Failed to fetch order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  // Group items by businessId
  const groupItemsByBusinessId = (items) => {
    if (!items || items.length === 0) return {}; // Return an empty object if no items
    return items.reduce((acc, item) => {
      if (!acc[item.bussinessid]) {
        acc[item.bussinessid] = [];
      }
      acc[item.bussinessid].push(item);
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByBusinessId(orderItems);

  return <StoreScroller groupedItems={groupedItems || {}} />;
};

export default Menu;
