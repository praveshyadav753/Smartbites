import { useCallback, useEffect, useRef } from 'react';
import './css/search.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ searchValue, handleSearchChange }) => {
    const navigate = useNavigate();

    const onPhbarcodeDuotoneClick = useCallback(() => {
        navigate('/scanner');
    }, [navigate]);

    const inputRef = useRef(null); // Reference to the input element
    const location = useLocation(); // Get the current location

    // Check if the current route is the search page
    const isSearchPage = location.pathname === '/search';

    // Auto focus on the input field when the component mounts on search page
    useEffect(() => {
        if (isSearchPage && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchPage]);

    return (
        <div className="search-scan-parent">
            <div className="search-scan">
                <img className="search-analytics-1" alt="" src="./scanimg/Searchicon.png" />
                <div className="search-to-discover">
                    <input
                        ref={inputRef} // Attach the ref here
                        className='search-type'
                        type="search"
                        placeholder='Search to discover'
                        autoComplete='on'
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                {searchValue === '' && (
                    <img
                        className="phbarcode-duotone-icon"
                        alt="Barcode"
                        src="./scanimg/search-barcodepng.svg"
                        onClick={onPhbarcodeDuotoneClick}
                    />
                )}
            </div>
        </div>
    );
};

export default Search;

//------------------------------------------------------------------------------

// import { useCallback, useState, useEffect, useRef } from 'react';
// import './search.css';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Search = () => {
//     const [searchValue, setSearchValue] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const onPhbarcodeDuotoneClick = useCallback(() => {
//         navigate('/scanner');
//     }, [navigate]);

//     const handleSearchChange = (e) => {
//         setSearchValue(e.target.value);
//     };

//     const inputRef = useRef(null);
//     const location = useLocation();
//     const isSearchPage = location.pathname === '/search';

//     useEffect(() => {
//         if (isSearchPage && inputRef.current) {
//             inputRef.current.focus();
//         }
//     }, [isSearchPage]);

//     const handleSearchSubmit = async (e) => {
//         e.preventDefault();
//         if (searchValue.trim() === '') {
//             setError('Search value cannot be empty.');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/dbs/search/?q=${encodeURIComponent(searchValue)}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch products.');
//             }
//             const data = await response.json();

//             // Navigate to the ProductFacts page with search results
//             navigate('/searchpage', { state: { query: searchValue, results: data } });
//         } catch (err) {
//             console.error('Error fetching products:', err);
//             setError('Failed to fetch products. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="search-scan-parent">
//             <form onSubmit={handleSearchSubmit}>
//                 <div className="search-scan">
//                     <img className="search-analytics-1" alt="" src="./scanimg/Searchicon.png" />
//                     <div className="search-to-discover">
//                         <input
//                             ref={inputRef}
//                             className="search-type"
//                             type="search"
//                             placeholder="Search to discover"
//                             autoComplete="on"
//                             value={searchValue}
//                             onChange={handleSearchChange}
//                         />
//                     </div>
//                     {searchValue === '' && (
//                         <img
//                             className="phbarcode-duotone-icon"
//                             alt="Barcode"
//                             src="./scanimg/search-barcodepng.svg"
//                             onClick={onPhbarcodeDuotoneClick}
//                         />
//                     )}
//                 </div>
//                 <button type="submit" className="search-button" disabled={loading}>
//                     {loading ? 'Searching...' : 'Search'}
//                 </button>
//             </form>
//             {error && <p className="error-message">{error}</p>}
//         </div>
//     );
// };

// export default Search;

    //--------------__________________________------------------------------====================------------------------------------------------------
 