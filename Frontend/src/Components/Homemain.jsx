// import { useCallback, useEffect, useState } from 'react';
// import './Homemain.css';
// import './scanner';
// import './searchpage';
// import './Search.css';
// import { Recommendation, RecentlyViewed, CategoryList } from './Recommendationcomp';
// import axios from 'axios';
// import './global.css';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from './Usercontext';

// const HomeView = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [showStickyProfile, setShowStickyProfile] = useState(false);

//   // State for recently viewed items
//   const [recentItems, setRecentItems] = useState([]);
//   const [recentLoading, setRecentLoading] = useState(true);

//   // Navigation handlers
//   const onFrameContainerClick = useCallback(() => {
//     navigate('/searchpage');
//   }, [navigate]);

//   const scanbarcode = useCallback(() => {
//     navigate('/scanner');
//   }, [navigate]);

//   const handleCategorySelect = (category) => {
//     navigate(`/food/${category}`);
//     console.log(`category: ${category}`);
//   };

//   // Function to monitor the scroll and toggle sticky UserProfile
//   useEffect(() => {
//     const handleScroll = () => {
//       const sliderElement = document.querySelector("[data-scroll-to='sliderContainer']");
//       const sliderTop = sliderElement?.getBoundingClientRect().top || 0;

//       // If the slider has scrolled up past a certain point, show the sticky UserProfile
//       setShowStickyProfile(sliderTop < 0);
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Fetch recently viewed items
//   useEffect(() => {
//     const fetchRecentlyViewedItems = async () => {
//       setRecentLoading(true);
//       try {
//         const token = localStorage.getItem('access_token');
//         console.log(`Access token recent: ${token}`);

//         const response = await axios.get('http://localhost:8000/recent/recent-viewed-items/', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         setRecentItems(response.data);
//       } catch (error) {
//         console.error('Error fetching recently viewed items:', error);
//       } finally {
//         setRecentLoading(false);
//       }
//     };

//     fetchRecentlyViewedItems();
//   }, []);

//   return (
//     <div className="home-view-1">
//       {/* Sticky User Profile Preview */}
//       {showStickyProfile && (
//         <div className="sticky-user-profile">
//           <div className="user-profile-preview-img">
//             <img className="preview-img" alt="Profile" src="Co Founder 1.png" />
//           </div>
//           <div className="hello-wrapper">
//             <div className="hello">Hello ,</div>
//             <div className="Name-preview">
//               {user?.first_name || "User"}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="hero-section">
//         {/* Your existing hero section code */}
//         <div className="user-profile-preview-home">
//           <div className="user-profile-preview-img">
//             <img className="preview-img" alt="Profile" src="Co Founder 1.png" />
//           </div>
//           <div className="hello-wrapper">
//             <div className="hello">Hello ,</div>
//             <div className="Name-preview">
//               {user?.first_name || "User"}
//             </div>
//           </div>
//         </div>
//         {/* Your hero animation and content */}
//       </div>

//       <div className="slider" data-scroll-to="sliderContainer">
//         {/* Your slider and recommendation content */}
//         <div className="frame-parent">
//           <div className="chocolate-parent" onClick={onFrameContainerClick}>
//             {/* Content */}
//           </div>
//           <div className="chocolate-parent" onClick={scanbarcode}>
//             {/* Content */}
//           </div>
//         </div>
//         <div className="discover">
//           {/* Content */}
//         </div>
//         <div className="recommendation">
//           <div className="recommendation-head">
//             <h2>{`Recommendation `}</h2>
//           </div>
//           <Recommendation />
//         </div>
//         <div>
//           <RecentlyViewed items={recentItems} loading={recentLoading} />
//         </div>
//         <div>
//           <CategoryList onCategorySelect={handleCategorySelect} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeView;



import { useCallback, useContext, useEffect, useState } from 'react';
import './Homemain.css';
import  './scanner';
import  './searchpage';
import './Search.css';
import  { Recommendation,RecentlyViewed, CategoryList} from './Recommendationcomp';
import axios from 'axios';
import './global.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Usercontext';
// import context from 'react-bootstrap/esm/AccordionContext';



const HomeView = () => {

	const { user, updateBasicDetails,updateAuthenticationStatus } = useUser();

	const [first_name, setfName] = useState(user?.name || '');
	const navigate= useNavigate();
  	const onFrameContainerClick = useCallback(() => {
    		navigate('/searchpage');
  	}, [navigate]);

	
	const scanbarcode = useCallback(() => {
        navigate('/scanner'); 
    }, [navigate]);
  	
  	
  	const onVectorIconClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='sliderContainer']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"}) }
  	}, []);

	
  const [recentItems, setRecentItems] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentError, setRecentError] = useState(null);

  useEffect(() => {
	const fetchRecentlyViewedItems = async () => {
	  setRecentLoading(true);
	  try {
		
		const response = await axios.get('http://localhost:8000/recent/recent-viewed-items/', {
         withCredentials: true, 
    });
  
		// Set the fetched data to state
		setRecentItems(response.data);
		console.log("calling baby");
		updateAuthenticationStatus(true);
		console.log(response);
		console.log(response.ok)
	  } catch (error) {
		console.error('Error fetching recently viewed items:', error);
	  } finally {
		setRecentLoading(false);
	  }
	};
	
	fetchRecentlyViewedItems();
  }, []);


	 
	  const handleCategorySelect = (category) => {
		navigate('/food/${category}');
		console.log(`category: ${category}`);}
		
		
	  
  	
      
  	return (
    		<div className="home-view-1">
      			{/* <div className="hero-section">
        				<img className="hero-background-icon" alt="" src="hero-background.svg" />
        				<img className="gemini-generated-image-jnqbllj-icon" alt="" src="./scanimg/recommendations/base.png" />
        				<img className="chocolate-icon" alt="" src="./scanimg/Chocolate.png" />
        				<img className="popsicle-icon" alt="" src="./scanimg/Popsicle.png" />
        				<img className="designer-2-removebg-preview-icon" alt="" src="Designer__2_-removebg-preview 1.png" />
        				<div className="scan-product">
          					<p className="blank-line">
            						<span className="scan">Scan</span>
            						<span className="span">{ }</span>
            						<span>Product</span>
          					</p>
        				</div>
        				<div className="user-profile-preview-home">
          					<div className="user-profile-preview-img">
            						<img className="preview-img" alt="Profile" src="Co Founder 1.png" />
          					</div>
          					<div className="hello-wrapper">
            						<div className="hello">Hello ,</div>
          					
          					<div className="Name-preview">
            				    {user?.first_name||"User"}
          					</div>
							</div>
        				</div>
        				<div className="hero-animation">
							<div className="item1">
          					   <img className="lays-front-2" alt="" src="lays front 2.png" />
							</div>
							<div className="item2">
          					   <img className="item" alt="" src="item1.png" />
							</div>
							<div className="item3">
          					   <img className="designer-removebg-preview-2-icon" alt="" src="Designer-removebg-preview 2.png" />
							</div>    				
						</div>
      			</div> */}
            <div className="user_profile">
            <div className="user-profile-preview-home">
              
          					<div className="user-profile-preview-img">
            						<img className="preview-img" alt="Profile" src="./scanimg/profile-place.png" />
          					</div>
          					<div className="hello-wrapper">
            						<div className="hello">Hello ,</div>
          					
          					<div className="Name-preview">
            				    {user?.first_name||"User"}
          					</div>
							   </div>
        			</div>
              </div> 
      			<div className="slider" data-scroll-to="sliderContainer">
					
							<div className="frame-parent">
							<div className="chocolate-parent" onClick={onFrameContainerClick}>
								<img className="chocolate-icon" alt="" src="./scanimg/Chocolate.png" />
								<img className="fooditem1-1-icon" alt="" src="./scanimg/fooditem1.png" />
								<img className="search-1-icon" alt="" src="./scanimg/search1.png" />
								<div className="search">Search</div>
								<div className="to-discover">To Discover</div>
							</div>
							<div className="chocolate-parent" onClick={scanbarcode}>
								<div className="search">Scan</div>
								<div className="barcode">Barcode</div>
								<img className="barcode-illustration-1-icon" alt="" src="./scanimg/barcodeillustration.png" />
							</div>
							</div>
                        <div className="discover">
                    
          					<img className="discover-item" alt="" src="./scanimg/sliderimg.svg" />
          					 
        				</div>
        				<div className="recommendation">
          					<div className="recommendation-head">
              						<h2>{Recommendation }</h2>
          					</div>
          				    <Recommendation />
        				</div>
						<div>
						{ <RecentlyViewed items={recentItems} loading={recentLoading} />}
                        </div>

						<div>
						    < CategoryList   onCategorySelect={handleCategorySelect}/>
						</div>
        				
        				
      			</div>
      			
    		</div>);
};


export default HomeView;