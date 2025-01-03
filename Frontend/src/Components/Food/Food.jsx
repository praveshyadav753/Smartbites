  import React, { useState, useEffect } from 'react';
  import Search from '../Searchcomponent';
  import axios from 'axios';
  import '../css/shimmer.css'; 
  import '../css/food.css';
  import { useParams, useNavigate, useLocation } from 'react-router-dom';
  import { CategoryList } from '../Recommendationcomp';
  import { useUser } from '../Usercontext.jsx'

  function Food() {
    const [searchValue, setSearchValue] = useState('');
    

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State for error messages
    const { category } = useParams(); // Get the category from the URL
    const [section, setSection] = useState("Food category"); // Set the category
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const { user, updateAuthenticationStatus } = useUser();

    useEffect(() => {
      
      if (!category) {
        setSelectedCategory(null); 
        setSection("food category");
        navigate('/food');
        return;
      }

      // Update selected category from URL
      if (category && category !== selectedCategory) {
        setSelectedCategory(category); // Sync selectedCategory with the URL
        setSection(category);
        console.log(section);
        setLoading(true);
        setError(null); // Reset error state on new fetch

        const encodedCategory = encodeURIComponent(category); // Encode category properly
        console.log("Encoded category:", encodedCategory);
        axios.get(`${import.meta.env.VITE_API_URL}/dbs/category/${encodedCategory}/`, {
          withCredentials: true
        })
          .then((response) => {
            if (response.data.products) {
              setItems(response.data.products);
              console.log(response.data.products);
              updateAuthenticationStatus(true);
            } else {
              setItems([]);
              updateAuthenticationStatus(true);
              setError('No products found for this category.');
            }
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
            updateAuthenticationStatus(false);
            setError('There was an issue fetching the items. Please try again later.');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [category]); // Run whenever category changes in URL

    const handleCategorySelect = (category) => {
      // When a category is selected, navigate to the food page with the selected category
      console.log('selections:', category);
      navigate(`/food/${category}`);
    };

    const handleBackToCategories = () => {
      // Use the current path to determine where to go back
      if (category) {
        // If there's a category in the URL, go back to the main /foods page
        navigate('/food');
        setSelectedCategory(null);
      } 
      else {
        // If already on /foods page, go back to the previous page in history
        navigate(-1);
      }
    };

    const handleItemClick = (item) => {
      navigate(`/product/${item.barcode}`);
    };
    useEffect(() => {
            const timer = setTimeout(() => {
                if (searchValue.trim()) {
                    fetchResults();
                } else {
                    setItems([]); // Clear results if search is empty
                }
            }, 500);
    
            return () => clearTimeout(timer);
        }, [searchValue]);

    const fetchResults = async () => {
      const token = localStorage.getItem('access_token');
      // console.log(token);
      setLoading(true);
      setError('');
      try {
          const response = await fetch(
              `${import.meta.env.VITE_API_URL}/dbs/search/?q=${encodeURIComponent(searchValue)}`, {
                  credentials: 'include',
              });
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.detail || 'Failed to fetch results');
              }
              const data = await response.json();
              setItems(data);
              console.log(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

  // Handle search input change
  const handleSearchChange = (e) => {
      setSearchValue(e.target.value);
  };

    return (
      <div className='foodpage'>
        {/* ________________________________________Back Button______________________________________________________ */}
        <div className='back-food' onClick={handleBackToCategories}>
          <img className='backChild' alt="" src="/scanimg/Arrow-black.svg" />
          <div>
          <h3>{section}</h3>
          </div>
        </div>
      <div className='content-food'>
        {/* _______________________________________Search Component__________________________________________________*/}
        <div className="search-container">
        <Search
                  searchValue={searchValue}
                  handleSearchChange={handleSearchChange}
              />
        </div>

        {/*--------------------------------------- Categories View ----------------------------------------------*/}
        {!selectedCategory && !searchValue ? (
          <CategoryList onCategorySelect={handleCategorySelect} />
        ) : (
          // Category Items View
          <div className="category-items-main">
            {loading ? (
              <div className="items-container">
                {Array(15)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="shimmer item-card" style={{height: '110px', width: '100px', borderRadius: '8px'}}></div>
                  ))}
              </div>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <div className="items-container">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.id} className="item-card" onClick={() => handleItemClick(item)}>
                      <div className="product-img">
                          <img src={item.image} alt={item.name} className="item-image" />
                      </div>
                      <div className="item-name">{item.name}</div>
                    </div>
                  ))
                ) : (
                  <p>No items found for this category.</p>
                )}
              </div>
            )}
          </div>
        )}
        {/* -----------------------------------search data view-------------------------------- */}
        
      </div>
      </div>
    );
  }

  export default Food;
