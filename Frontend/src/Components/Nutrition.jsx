import React from 'react';
import styles from './Productfact.module.css';  
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

  return (
    <>
      {Object.entries(nutritionData).map(([key, value], index) => {
        const percentage = nutritionData[`${key}_percentage`] || '-';
        const formattedLabel = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase());

        return (
          <NutritionItem 
            key={index} 
            label={formattedLabel} 
            value={value} 
            percentage={percentage}
          />
        );
      })}
    </>
  );
};

Nutrition.propTypes = {
  nutritionData: PropTypes.object.isRequired,
};

export default Nutrition;
