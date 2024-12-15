import React, { useState, useEffect } from "react";
import axios from "axios";
import ShoppingLists from "./Listoption";
import CartItem from "./cart";
import "./shopinglist.css";
import styles from "../css/ShopList.module.css";

const ShopList = () => {
  const [currentList, setCurrentList] = useState("Default List"); // Selected shopping list
  const [cart, setCart] = useState([]); // Cart items
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch cart data from the server
  const fetchCart = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/fetch-items/api/cart/`, { withCredentials: true })
      .then((response) => {
        setCart(response.data.items || []); // Ensure cart is an array
        console.log("Fetched Cart Items:", response.data.items);
      })
      .catch((error) => console.error("Error fetching cart data:", error))
      .finally(() => setIsLoading(false));
  };

  // Fetch cart on component mount or when the current list changes
  useEffect(() => {
    fetchCart();
  }, [currentList]);

  // Update item quantity
  const updateCartItemQuantity = (cart_item_id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity below 1

    axios
      .put(
        `http://localhost:8000/fetch-items/api/cart/${cart_item_id}/`,
        { quantity: newQuantity },
        { withCredentials: true }
      )
      .then(() => {
        // Update cart state locally to avoid unnecessary re-fetch
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === cart_item_id ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((error) => console.error("Error updating item quantity:", error));
  };

  // Remove item from cart
  const removeFromCart = (cart_item_id) => {
    axios
      .delete(`http://localhost:8000/fetch-items/api/cart/${cart_item_id}/`, { withCredentials: true })
      .then(() => {
        // Update cart state by filtering out the removed item
        setCart((prevCart) => prevCart.filter((item) => item.id !== cart_item_id));
      })
      .catch((error) => console.error("Error removing cart item:", error));
  };

  // Handle list change
  const handleListChange = (listName) => {
    setCurrentList(listName);
  };

  return (
    <>
      {/* Shopping List Selection */}
      <div class="mylist">
        <img class="backChild" alt="" src="/scanimg/Arrow-black.svg"></img>
        <div>
          <h3>My List</h3>
        </div>
      </div>
    <div className="cart-page">  
      <ShoppingLists onListChange={handleListChange} currentList={currentList} />

      {/* Loading State */}
      {isLoading ? (
        <p>Loading cart...</p>
      ) : cart.length > 0 ? (
        // Render Cart Items
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={(newQuantity) => updateCartItemQuantity(item.id, newQuantity)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))
      ) : (
        <p>No items in this cart.</p>
      )}
    </div>
    </>  
  );
};

export default ShopList;
