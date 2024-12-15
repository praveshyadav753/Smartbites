// import { useNavigate } from "react-router-dom";
// const Searchdata = () => {
// const [searchValue, setSearchValue] = useState('');
//     const [results, setResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Debounce API calls
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (searchValue.trim()) {
//                 fetchResults();
//             } else {
//                 setResults([]); // Clear results if search is empty
//             }
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [searchValue]);

//     // Fetch results from the API
//     const fetchResults = async () => {
//         const token = localStorage.getItem('access_token');
//         // console.log(token);
//         setIsLoading(true);
//         setError('');
//         try {
//             const response = await fetch(
//                 `http://localhost:8000/dbs/search/?q=${encodeURIComponent(searchValue)}`, {
//                     credentials: 'include',
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || 'Failed to fetch results');
//                 }
//                 const data = await response.json();
//                 setResults(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchValue(e.target.value);
//     };
   

//   const handleBackClick = () => {
//     navigate(-1); // Go back to the previous route
// };

// }