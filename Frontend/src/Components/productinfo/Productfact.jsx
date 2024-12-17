
import { useParams, useNavigate } from 'react-router-dom';
import Ingredients from './Ingrediantscompo';
import Nutrition from './Nutrition';
import styles from '../css/Productfact.module.css';
import { useEffect,useState,useCallback } from 'react';
import NutritionalQualityIndicator from './NutritionalQualityIndicator';
import RatingGauge from './Ratingcompo';
import { addToCart } from '../shop-cart/AddToCart';
import '../css/shimmer.css'

const Productfact = () => {
  const [view, setView] = useState(null); // 'nutrition' or 'ingredients'
  const [isPaused, setIsPaused] = useState(false); // Control marquee pause state
  const [productDetails, setProductDetails] = useState(null); // Store product details
  const [isFavorite, setIsFavorite] = useState(false); // Favorite product state
  const [isProductFound, setIsProductFound] = useState(true); // Track if the product is found
  const { barcode } = useParams(); // Extract barcode from the URL
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Image loaded state
  const [isLoading, setIsLoading] = useState(true); // Loading state for page


  // Fetch product details based on barcode using API
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/fetch/products/${barcode}/nutrition/`,{
          credentials: 'include',
        });
      console.log('data fetched') 
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data.product_details);    
          console.log(data)
          setView('nutrition'); 
        } else {
          console.log('Product not found');
          setIsProductFound(false) // Set view to 'notfound' if product is not found
          
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setIsProductFound(false) // Set view to 'notfound' if product is not found
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProductDetails();
  }, [barcode]); 

  // Handle navigation back
  const onBackContainerClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Functions to handle pause and resume on touch and mouse events for highlights
  const handleStart = () => {
    setIsPaused(true);
  };

  const handleEnd = () => {
    setIsPaused(false);
  };

  // Handle click for switching to 'nutrition' or 'ingredients' view
  const handleNutritionClick = () => {
    setView('nutrition');
  };

  const handleIngredientsClick = () => {
    setView('ingredients');
    console.log(productDetails.ingredients);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // functionality for add to cart
  const handleAddToCart = async () => {
    const result = await addToCart(productDetails.barcode);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={styles.androidLarge5}>
       {/* Loader */}
       {isLoading && (
        <div className={styles.loaderContainer}>
          <img src="/scanimg/loader.gif" alt="Loading..." className={styles.loader} />
        </div>
      )}

      {/* Content */}
      {!isLoading && (
      <>
      <div className={styles.back} onClick={onBackContainerClick}>
        <img className={styles.backChild} alt="" src="/scanimg/Arrow-black.svg" />
      </div>

      {/* Product not found */}
      {!isProductFound && (
        <div className={styles.notFound}>
          <img src="/scanimg/notfound1.gif" alt="Product not found" />
          <p>Product not found...</p>
        </div>
      )}

      {/* Product found */}
      {isProductFound && productDetails && (
        <>
          <div className={styles.ratingContainer}>
            <div className={styles.heading}>
              <h2>{productDetails.name }</h2>
            </div>
            <div className={styles.itemRating}>
              <div className={styles.pictureitem}>
                <img
                  alt={productDetails.name || "Product"}
                  src={productDetails.image || "<shimmer />"}   //apply shimmer here 
                  onLoad={handleImageLoad}
                  className={`${styles.productImage} ${isImageLoaded ? styles.loaded : styles.loading}`}
                />
              </div>
               <div className={styles.rating}>
               
                         <RatingGauge rating={productDetails.rating} /> 
                
                
              </div>
            </div>
            <div className={styles.favoriteSection}></div>
            <div className={styles.partition1}></div>
            <div className={styles.recomAdd}>
             <img className={styles.reliability1Icon} alt="" src="/scanimg/reliability1.png" />
             <img className={styles.vectorIcon3} alt="" src="/scanimg/add.svg" onClick={handleAddToCart}/>
            </div>
          </div>

          {/* Highlights Section */}
          <div className={styles.highlightcontainer}>
            <div className={styles.highlightFrame}>
              <h2>Highlights</h2>
            </div>
            <div
              className={`${styles.marquee}`}
              onMouseOver={handleStart}
              onMouseOut={handleEnd}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
            >
              <div className={`${styles.highlightItem} ${isPaused ? styles.paused : ''}`}>
                <div className={styles.halthyFat}>
                  <div className={styles.healthyFats}>Healthy Fats</div>
                </div>
                <div className={styles.calories}>
                  <div className={styles.healthyFats}>High Calories</div>
                </div>
                <div className={styles.protein}>
                  <div className={styles.healthyFats}>High Protein</div>
                </div>
                <div className={styles.protein}>
                  <div className={styles.healthyFats}>Low Cholesterol</div>
                </div>
              </div>
            </div>
            <div className={styles.partition}></div>
          </div>

          {/* Button Section */}
          <div className={styles.buttonParent}>
            <button className={styles.button} onClick={handleNutritionClick}>Nutrition</button>
            <button className={styles.button} onClick={handleIngredientsClick}>Ingredient</button>
          </div>

          {view === 'nutrition' && (
            <>
              <NutritionalQualityIndicator />
              <Nutrition nutritionData={productDetails.nutrition} />
            </>
          )}

          {view === 'ingredients' && (
            <>
              <h2>Ingredients</h2>
              <Ingredients ingredients={productDetails.ingredients} />
            </>
          )}
        </>
      )}
      </>
      )}
    </div>
  );
};

export default Productfact;
