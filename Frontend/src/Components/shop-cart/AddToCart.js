// src/services/cartService.js
import axios from "axios";

export const addToCart = async (barcode) => {
  console.log("Request received to add product to cart:", barcode);
  try {
    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}/fetch-items/api/cart/",
      { product_id: barcode },
      {
        withCredentials: true,  // Ensures cookies (like session cookie or JWT) are sent with the request
      }
    );
    return { success: true, message: "Product added to cart!", data: response.data };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false, message: "Failed to add product to cart. Please try again." };
  }
};

