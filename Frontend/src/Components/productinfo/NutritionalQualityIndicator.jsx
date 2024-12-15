import React from 'react';
import styles from '../css/Productfact.module.css'; // Adjust the path if necessary

const NutritionalQualityIndicator = () => (
  <>
    <div className={styles.indicator}>
      
        <div className={styles.nutritionalQualityIndicator}><h2>Nutritional Quality Indicator</h2></div>
        <div className={styles.goodParent}>
          <div className={styles.good}>
            <div className={styles.goodChild} />
            <div className={styles.good1}>Good</div>
          </div>
          <div className={styles.moderate}>
            <div className={styles.moderateChild} />
            <div className={styles.moderate1}>Moderate</div>
          </div>
          <div className={styles.good}>
            <div className={styles.poorChild} />
            <div className={styles.good1}>Poor</div>
          </div>
        </div>
      
    </div>
    <div className={styles.partition2}></div>
  </>
);

export default NutritionalQualityIndicator;
