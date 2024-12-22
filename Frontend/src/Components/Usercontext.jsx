import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use `useNavigate` inside the component

    // Function to fetch user data from API
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/profile/`, {
                credentials: 'include', // Ensures cookies are sent with the request
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setAuthenticated(true);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle token refresh
    const handleTokenRefresh = async () => {
        try {
            const refreshResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
                {},
                {
                    withCredentials: true, // Ensure cookies are sent
                }
            );

            if (refreshResponse.status === 200) {
                // Refresh successful
                setAuthenticated(true);
                fetchUserData(); // Fetch user data after token refresh
            } else {
                // If refresh fails, navigate to login
                navigate('/login');
                setAuthenticated(false);
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            navigate('/login');
            setAuthenticated(false);
        }
    };

    const checkAuthenticationStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status/`, {
                withCredentials: true, // Ensure cookies are sent
            });

            if (response.status === 200) {
                setAuthenticated(true);
                fetchUserData(); // Fetch user data only if authenticated
            } else {
                // If not authenticated, attempt token refresh
                await handleTokenRefresh();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // If unauthorized, try refreshing the token
                await handleTokenRefresh();
            } else {
                console.error('Error during authentication status check:', error);
                navigate('/login');
                setAuthenticated(false);
            }
        }
    };

    // Update authentication status in context
    const updateAuthenticationStatus = (status) => {
        setAuthenticated(status);
        if (status) {
            fetchUserData(); // Fetch user data if logged in
        } else {
            setUser(null); // Clear user data when logged out
            Cookies.remove('access_token'); // Remove token from cookies on logout
        }
    };

    // Fetch user data when the component mounts or when authenticated status changes
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            await checkAuthenticationStatus(); // Check if the user is authenticated
            setLoading(false);
        };
        checkAuth();
    }, [navigate]); // Add navigate to the dependency array to avoid warnings

    // Update user basic details
    const updateBasicDetails = (updatedDetails) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedDetails.profile,
        }));
    };

    // Provide context value to all components
    const value = {
        user,
        authenticated,
        loading,
        updateBasicDetails,
        updateAuthenticationStatus,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


// import React, { createContext, useState, useEffect, useContext } from 'react';
// import Cookies from 'js-cookie';  // Import the js-cookie library
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // Create the UserContext
// const UserContext = createContext();
// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [authenticated, setAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();  // Use `useNavigate` inside the component

//     // Function to fetch user data from API
//     const fetchUserData = async () => {
//         console.log("fetching user data");
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/profile/`, {
//                 credentials: 'include', // Ensures cookies are sent with the request
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data);
//                 setAuthenticated(true);
//             } else {
//                 throw new Error('Failed to fetch user data');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setAuthenticated(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const checkAuthenticationStatus = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status/`, {
//                 withCredentials: true,  // Ensure cookies are sent
//             });

//             if (response.status === 200) {
//                 setAuthenticated(true);
//                 fetchUserData();  // Fetch user data only if authenticated
//             } else {
//                 setAuthenticated(false);
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error('Error during authentication status check:', error);
//             navigate('/login');
//             setAuthenticated(false);
//         }
//     };

//     // Update authentication status in context
//     const updateAuthenticationStatus = (status) => {
//         setAuthenticated(status);
//         if (status) {
//             fetchUserData();  // Fetch user data if logged in
//         } else {
//             setUser(null); // Clear user data when logged out
//             Cookies.remove('access_token'); // Remove token from cookies on logout
//         }
//     };

//     // Handle user login check and redirect if not authenticated
    
   

//     // Fetch user data when the component mounts or when authenticated status changes
//     useEffect(() => {
//         const checkAuth = async () => {
//             setLoading(true);
//             await checkAuthenticationStatus();  // Check if the user is authenticated
//             setLoading(false);
//         };
//         checkAuth();
//     }, [navigate]);  // Re-run only when `navigate` changes
//  // Add navigate to the dependency array to avoid warnings

//     // Update user basic details
//     const updateBasicDetails = (updatedDetails) => {
//         setUser((prevUser) => ({
//             ...prevUser,
//             ...updatedDetails.profile,
//         }));
//     };

//     // Provide context value to all components
//     const value = {
//         user,
//         authenticated,
//         loading,
//         updateBasicDetails,
//         updateAuthenticationStatus,
//     };

//     return (
//         <UserContext.Provider value={value}>
//             {children}
//         </UserContext.Provider>
//     );
// };
