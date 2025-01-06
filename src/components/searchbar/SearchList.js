import React from 'react';

export const SearchList = ({ item }) => {
  return (
    <div style={{ zIndex: 1500 }}>
      <p>{item.label}</p>
    </div>
  );
};