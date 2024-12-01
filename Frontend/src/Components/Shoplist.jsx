import { useState } from 'react';
import styles from './ShopList.module.css'; 

const ShopList = () => {
  const [cartItems, setCartItems] = useState([]); 

  return (
    <div className={styles.shopListContainer}>
      {/* Conditional rendering */}
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="./scanimg/recommendations/emptylist.gif" 
            alt="Empty Cart"
            className={styles.emptyCartImage}
          />
          <div className={styles.emptyMessage}>Your cart is empty!</div>
        </div>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              {/* Display the cart item details */}
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopList;
