import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Homemain.css';
import './shimmer.css';
import { useLocation } from 'react-router-dom';
import { fetchWithAuth } from './api'; 
import { useUser } from './UserContext'; 


// Recommendation Component
// export const Recommendation = () => {
//   const navigate = useNavigate();
//   const [recommendations, setRecommendedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecommendedProducts = async () => {
//       try {
//         // Retrieve token from local storage
//         // const token = localStorage.getItem('access_token');
//         // console.log(token);
        
//         // // Make the request with headers
//         // const response = await axios.get('http://localhost:8000/dbs/recommended/', {
//         //   headers: {
//         //   'Authorization': `Bearer ${token}`
//         //   }
//         // });
        
//         // setRecommendedProducts(response.data.recommended_products);
//         // setLoading(false);
//         const data = await fetchWithAuth('http://localhost:8000/dbs/recommended/');
//         console.log(data);
//         setRecommendedProducts(data.recommended_products);
//         setLoading(false);

//       } catch (error) {
//         console.error('Error fetching recommended products:', error);
//         setLoading(false);
//       }
//     };
  
//     fetchRecommendedProducts();
//   }, []);
  

//   const handleItemClick = (item) => {
//     navigate(`/product/${item.id}`);
    
//   };

//   if (loading || recommendations.length ===0) {
//     return (
//       <div className="recommendation-container">
//         {Array(3)
//           .fill(0)
//           .map((_, index) => (
//             // Adding a unique key for the shimmer placeholder
//             <div key={`shimmer-${index}`} className="shimmer" style={{ height: '120px', width: '50%', borderRadius: '8px' }}></div>
//           ))}
//       </div>
//     );
//   }

//   return (
//     <div className="recommendation-container">
//       {recommendations.map((item) => (
//         <div key={item.id} className="recommendation-item" onClick={() => handleItemClick(item)}>
//           <img src={item.image} alt={item.name} className="recommendation-img" />
//           <div className="recommendation-name">{item.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Recently Viewed Component
// export const RecentlyViewed = ({ items, loading }) => {
//   const navigate = useNavigate();
//   const handleItemClick = (item) => {
//     navigate(`/product/${item.barcode}`);
//   };
//   return (
//     <div className="recently-view-main">
//       <div className="recently-viewed-heading">
//         <h2>Recently Viewed</h2>
//       </div>

//       {(items.length==0 || loading) &&<div className="recently-viewed-items-list">
//         {Array(3)
//           .fill(0)
//           .map((_, index) => (
//             <div key={index} className="recently-viewed-item">
//               <div className="shimmer" style={{ height: '100px', width: '100px', borderRadius: '8px' }}></div>
//               <div className="shimmer" style={{ height: '20px', width: '80px', marginTop: '10px', borderRadius: '4px' }}></div>
//             </div>
//           ))}
//       </div> }
//       {!loading &&
//       <div className="recently-viewed-items-list">
//         {items.map((item) => (
//           <div key={item.id} className="recently-viewed-item" onClick={() => handleItemClick(item)}>
//             <div className="img--div">
//               <img src={item.image} alt={item.name} className="recently-viewed-img" />
//             </div>
//             <div className="item-name">{item.name}</div>
//           </div>
//         ))}
//       </div>
//       }
//     </div>
//   );
// };

// // Category List Component
// export const CategoryList = ({ onCategorySelect }) => {
//   const [viewAll, setViewAll] = useState(false);
//   const initialItemsToShow = 3;

//   // Get the current route
//   const location = useLocation();

//   // Check if the current route is the food page
//   const isFoodPage = location.pathname === '/food';

//   // Toggle between "View All" and "View Less"
//   const toggleView = () => {
//     setViewAll(!viewAll);
//   };

//   // Categories data
//   const [items] = useState([
//     { id: 1, name: 'Dairies & Breakfasts', image: './scanimg/dairy_cat.svg' },
//     { id: 2, name: 'Snacks & Beverages', image: './scanimg/snacks_cat.svg' },
//     { id: 3, name: 'Fruits & Vegetables', image: './scanimg/vegetables_cat.png' },
//     { id: 4, name: 'Spices & Seasonings', image: './scanimg/spices_cat.png' },
//     { id: 5, name: 'Edible Oils', image: './scanimg/oil_cat.svg' },
//     { id: 6, name: 'Rice, Pasta, and Noodles', image: './scanimg/noodles.png' },
//     { id: 7, name: 'Chocolates & Biscuits', image: './scanimg/chocolates_cat.svg' },
//   ]);

//   // Determine the categories to display
//   const itemsToDisplay = isFoodPage ? items : viewAll ? items : items.slice(0, initialItemsToShow);

//   return (
//     <div className="recently-view-main1">
//       <div className="explore">
//         <h2 className="explore-by-categcategories">Explore by Categories</h2>
//         {/* Hide the "View All" button if on the food page */}
//         {!isFoodPage && (
//           <div className="viewall" onClick={toggleView}>
//             {viewAll ? 'View Less' : 'View All'}
//           </div>
//         )}
        
//       </div>
//       <div className="cat-item-main-wrapper">
//         {itemsToDisplay.map((item, index) => (
//           <div
//             key={index}
//             className="cat-item-main"
//             onClick={() => onCategorySelect(item.name)}
//           >
//             <div className="item-img-cat">
//               <img className="image-icon1" alt={item.name} src={item.image} />
//             </div>
//             <div className="cat-item-name">
//               {/* <div className="diary-breakfasts-container"> */}
//                 <p>{item.name}</p>
//               {/* </div> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Recommendation Component
export const Recommendation = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, updateAuthenticationStatus } = useUser();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:8000/dbs/recommended/');
        // console.log(data);
        setRecommendedProducts(data.recommended_products);
        setLoading(false);
        if(data.ok)
        {
          updateAuthenticationStatus(true);
        }
      } catch (error) {
        updateAuthenticationStatus(false);
        console.error('Error fetching recommended products:', error);
        setLoading(false);
      }
    };
  
    fetchRecommendedProducts();
  }, []);
  

  const handleItemClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  if (loading || recommendations.length === 0) {
    return (
      <div className="recommendation-container">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            // Adding a unique key for the shimmer placeholder
            <div key={`shimmer-${index}`} className="shimmer" style={{ height: '120px', width: '50%', borderRadius: '8px' }}></div>
          ))}
      </div>
    );
  }

  return (
    <div className="recommendation-container">
      {recommendations.map((item) => (
        <div key={item.id} className="recommendation-item" onClick={() => handleItemClick(item)}>
          <img src={item.image} alt={item.name} className="recommendation-img" />
          <div className="recommendation-name">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

// Recently Viewed Component
export const RecentlyViewed = ({ items, loading }) => {
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    navigate(`/product/${item.barcode}`);
  };
  return (
    <div className="recently-view-main">
      <div className="recently-viewed-heading">
        <h2>Recently Viewed</h2>
      </div>

      {(items.length === 0 || loading) && (
        <div className="recently-viewed-items-list">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              // Adding a unique key for the shimmer placeholder
              <div key={`shimmer-recent-${index}`} className="recently-viewed-item">
                <div className="shimmer" style={{ height: '100px', width: '100px', borderRadius: '8px' }}></div>
                <div className="shimmer" style={{ height: '20px', width: '80px', marginTop: '10px', borderRadius: '4px' }}></div>
              </div>
            ))}
        </div>
      )}
      {!loading && (
        <div className="recently-viewed-items-list">
          {items.map((item) => (
            <div key={item.id} className="recently-viewed-item" onClick={() => handleItemClick(item)}>
              <div className="img--div">
                <img src={item.image} alt={item.name} className="recently-viewed-img" />
              </div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Category List Component
export const CategoryList = ({ onCategorySelect }) => {
  const [viewAll, setViewAll] = useState(false);
  const initialItemsToShow = 3;

  const location = useLocation();
  const isFoodPage = location.pathname === '/food';

  const toggleView = () => {
    setViewAll(!viewAll);
  };

  const [items] = useState([
    { id: 1, name: 'Dairies & Breakfasts', image: './scanimg/dairy_cat.svg' },
    { id: 2, name: 'Snacks & Beverages', image: './scanimg/snacks_cat.svg' },
    { id: 3, name: 'Fruits & Vegetables', image: './scanimg/vegetables_cat.png' },
    { id: 4, name: 'Spices & Seasonings', image: './scanimg/spices_cat.png' },
    { id: 5, name: 'Edible Oils', image: './scanimg/oil_cat.svg' },
    { id: 6, name: 'Rice, Pasta, and Noodles', image: './scanimg/noodles.png' },
    { id: 7, name: 'Chocolates & Biscuits', image: './scanimg/chocolates_cat.svg' },
  ]);

  const itemsToDisplay = isFoodPage ? items : viewAll ? items : items.slice(0, initialItemsToShow);

  return (
    <div className="recently-view-main1">
      <div className="explore">
        <h2 className="explore-by-categcategories">Explore by Categories</h2>
        {!isFoodPage && (
          <div className="viewall" onClick={toggleView}>
            {viewAll ? 'View Less' : 'View All'}
          </div>
        )}
      </div>
      <div className="cat-item-main-wrapper">
        {itemsToDisplay.map((item) => (
          <div
            key={item.id}
            className="cat-item-main"
            onClick={() => onCategorySelect(item.name)}
          >
            <div className="item-img-cat">
              <img className="image-icon1" alt={item.name} src={item.image} />
            </div>
            <div className="cat-item-name">
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  