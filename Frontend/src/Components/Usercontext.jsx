

// //============================================================================================
// import React, { createContext, useState, useEffect, useContext } from 'react';

// // Create the UserContext
// const UserContext = createContext();

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // State for user data
//     const [authenticated, setAuthenticated] = useState(false); // State for authentication status
//     const [loading, setLoading] = useState(true); // State to handle loading

//     // Function to fetch user data from API (on initial load or when user logs in)
//     const fetchUserData = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/profile/`, {
//                 credentials: 'include', // This ensures cookies are sent with the request
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 setUser(data); // Set user data from API response
//                 setAuthenticated(true); // Set authenticated to true
//             } else {
//                 console.error('Failed to fetch user data');
//                 setAuthenticated(false); // Set authenticated to false if API fails
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setAuthenticated(false); // Handle errors and set authenticated to false
//         } finally {
//             setLoading(false); // Stop loading after fetching
//         }
//     };

//     // Update authentication status in context
//     const updateAuthenticationStatus = (status) => {
//         setAuthenticated(status);
//         if (status) {
//             fetchUserData();
//             console.log("fatching data by apy call") ; // Fetch user data after login
//         } else {
//             setUser(null);  // Clear user data if logged out
//         }
//     };

//     // Fetch user data when the component mounts or when authenticated status changes
//     useEffect(() => {
//         // If the user is already authenticated, fetch user data
//         if (authenticated) {
//             fetchUserData();
//         } else {
//             setLoading(false); // Stop loading if not authenticated
//         }
//     }, [authenticated]); // Dependency on 'authenticated' to trigger fetch after login/logout

//     // Function to update user basic details
//     const updateBasicDetails = (updatedDetails) => {
//         console.log("Update basic details");
//         console.log(updatedDetails);
//         setUser(prevUser => ({
//             ...prevUser,
//             ...updatedDetails.profile, // Update user data with new details
//         }));
//     };

//     // Provide user data, authentication status, and update functions to all components
//     const value = {
//         user,
//         authenticated,
//         loading,
//         updateBasicDetails,
//         updateAuthenticationStatus, // Expose the function to update authentication status
//     };

//     return (
//         <UserContext.Provider value={value}>
//             {children} {/* This will allow other components to access the context */}
//         </UserContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';  // Import the js-cookie library
import { useNavigate } from 'react-router-dom';

// Create the UserContext
const UserContext = createContext();
// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Use `useNavigate` inside the component

    // Function to fetch user data from API
    const fetchUserData = async () => {
        console.log("fetching user data");
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

    // Update authentication status in context
    const updateAuthenticationStatus = (status) => {
        setAuthenticated(status);
        if (status) {
            fetchUserData();  // Fetch user data if logged in
        } else {
            setUser(null); // Clear user data when logged out
            Cookies.remove('access_token'); // Remove token from cookies on logout
        }
    };

    // Handle user login check and redirect if not authenticated
    const logincheck = () => {
        if (!authenticated) {
            navigate('/login');
        }
    };

    // Handle user logout
    const handleLogout = () => {
        Cookies.remove('access_token'); // Remove token from cookies
        updateAuthenticationStatus(false); // Mark as logged out
    };

    // Fetch user data when the component mounts or when authenticated status changes
    useEffect(() => {
        console.log('checking on mount');
        logincheck();  // Check if the user is authenticated on mount
        if (authenticated) {
            fetchUserData();  // Fetch user data only if authenticated
        }
    }, [authenticated, navigate]);  // Add navigate to the dependency array to avoid warnings

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
        handleLogout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
