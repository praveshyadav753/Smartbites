import React from 'react';
import styles from '../css/Productfact.module.css';  
import PropTypes from 'prop-types';


const NutritionItem = ({ label, value, percentage }) => (
  <div className={styles.nutritiontable}>
    <div className={styles.energy}>
      <div className={styles.totalFatWrapper}>
        <span className={styles.kcal}>{label}</span>
      </div>
      <div className={styles.kcalWrapper}>
        <span className={styles.kcal}>{value}</span>
      </div>
      <div className={styles.wrapper}>
        <span className={styles.kcal}>{percentage || '-'}</span>
      </div>
      <div className={styles.energyChild} />
    </div>
    <div className={styles.partition1}></div>
  </div>
);

NutritionItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentage: PropTypes.string,
};

const Nutrition = ({ nutritionData }) => {
  if (!nutritionData) {
    return <div>No nutrition data available.</div>;
  }

  // Filter out the first entry (ID or unwanted information)
  const filteredNutritionData = Object.entries(nutritionData)
    .filter(([key]) => key !== 'id') // Exclude 'id' key or modify to your specific condition
    .map(([key, value]) => {
      const percentage = nutritionData[`${key}_percentage`] || '-';
      const formattedLabel = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      return { label: formattedLabel, value, percentage };
    });

  return (
    <>
      {filteredNutritionData.map((item, index) => (
        <NutritionItem 
          key={index} 
          label={item.label} 
          value={item.value} 
          percentage={item.percentage}
        />
      ))}
    </>
  );
};

Nutrition.propTypes = {
  nutritionData: PropTypes.object.isRequired,
};

export default Nutrition;
