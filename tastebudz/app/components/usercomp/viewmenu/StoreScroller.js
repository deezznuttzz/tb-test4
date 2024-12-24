import React from 'react';
import Card from './Card';

const StoreScroller = ({ groupedItems }) => {
  if (!groupedItems || Object.keys(groupedItems).length === 0) {
    return <p>No items available</p>;
  }

  return (
    <div>
      {Object.entries(groupedItems).map(([businessId, items]) => (
        <div key={businessId}>
          <h3>Business {businessId}</h3>
          <div style={scrollerStyle}>
            {items.map((item) => (
              <div style={cardWrapperStyle} key={item.id}>
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const scrollerStyle = {
  display: 'flex',
  overflowX: 'auto', // Enable horizontal scrolling
  gap: '16px', // Add spacing between cards
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%', // Ensure the container spans the width of its parent
};

const cardWrapperStyle = {
  flex: '0 0 auto', // Prevent cards from shrinking or growing
  width: '300px', // Set a fixed width for each card
};

const sectionStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const headerStyle = {
  marginBottom: '8px',
  fontSize: '18px',
  fontWeight: 'bold',
};

export default StoreScroller;
