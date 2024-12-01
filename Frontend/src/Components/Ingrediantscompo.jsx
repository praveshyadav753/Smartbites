import React from 'react';

const Ingredients = ({ ingredients }) => {
  // Check if the ingredients are provided
  if (!ingredients || ingredients.length === 0) {
    return <p>No ingredients available.</p>;
  }

  return (
    <div>
      <p>{ingredients.join(', ')}</p>
    </div>
  );
};

export default Ingredients;
