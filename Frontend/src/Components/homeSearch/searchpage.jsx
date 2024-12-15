import React, { useState, useEffect } from 'react';
import Search from '../Searchcomponent';
import '../css/searchPage.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Debounce API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.trim()) {
                fetchResults();
            } else {
                setResults([]); // Clear results if search is empty
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Fetch results from the API
    const fetchResults = async () => {
        const token = localStorage.getItem('access_token');
        // console.log(token);
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(
                `http://localhost:8000/dbs/search/?q=${encodeURIComponent(searchValue)}`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Failed to fetch results');
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const navigate = useNavigate();
  const handleItemClick = (barcode) => {
    navigate(`/product/${barcode}`);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous route
};

    return (
        <div className="search-page">
            <div className="top-nav">
                        <img className="back" alt="Back" src="/scanimg/Arrow-black.svg" onClick={handleBackClick}/>
            </div> 
            {/* Search Component */}
            <Search
                searchValue={searchValue}
                handleSearchChange={handleSearchChange}
            />

            {/* Loading State */}
            {isLoading && <div className="loader">Loading...</div>}

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Search Results */}
            {!isLoading && !error && results.length > 0 && (
                <div className="results-grid">
                    {results.map((item, index) => (
                        <div key={index} className="result-block" onClick={() => handleItemClick(item.barcode)}>
                            <h3>{item.name}</h3>
                            
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {!isLoading && !error && searchValue && results.length === 0 && (
                <div className="no-results">No results found</div>
            )}
        </div>
    );
};

export default SearchPage;



//_________________________________________________________________________________________________
// import { useState } from 'react';
// import Search from './Searchcomponent'; // Import the reusable Search component
// import './searchPage.css';

// const SearchPage = () => {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSearchSubmit = async (searchValue) => {
//         if (searchValue.trim() === '') {
//             setError('Search value cannot be empty.');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`http://localhost:8000/dbs/search/?q=${encodeURIComponent(searchValue)}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch products.');
//             }
//             const data = await response.json();
//             setResults(data); // Store the results in state
//             console.log(data); // Debugging log for fetched data
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             setError('Failed to fetch products. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="search-page">
//             <h1>Search Products</h1>
//             <Search onSearchSubmit={handleSearchSubmit} /> {/* Passing search handler */}

//             {/* Display loading indicator or error message */}
//             {loading && <p>Searching...</p>}
//             {error && <p className="error-message">{error}</p>}

//             {/* Display search results */}
//             {results.length > 0 && (
//                 <div className="search-results">
//                     <h2>Search Results</h2>
//                     <ul>
//                         {results.map((product) => (
//                             <li key={product.id}>
//                                 <strong>{product.name}</strong> (Barcode: {product.barcode})
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* If no results are found */}
//             {!loading && results.length === 0 && (
//                 <p>No products found. Try a different search.</p>
//             )}
//         </div>
//     );
// };

// export default SearchPage;


