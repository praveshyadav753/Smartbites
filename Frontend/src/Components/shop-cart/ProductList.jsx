// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProductList = ({ currentList, fetchCart }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/fetch-items/api/products/${currentList}/`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         setProducts(response.data.products || []); // Ensure a fallback to an empty array
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, [currentList]);

//   return (
//     <div>
//       <h3>Product List for {currentList}</h3>
//       {products.length > 0 ? (
//         products.map((product) => (
//           <div key={product.id}>
//             <p>{product.name}</p>
//             <button onClick={() => fetchCart()}>Add to Cart</button>
//           </div>
//         ))
//       ) : (
//         <p>No products available.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;
