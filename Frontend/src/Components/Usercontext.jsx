// import React, { createContext, useState, useEffect, useContext } from 'react';

// // Create the UserContext
// const UserContext = createContext();

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // State for user data
//     const [loading, setLoading] = useState(true); // State to handle loading

//     // Function to fetch user data from API (on initial load)
//     const fetchUserData = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/profile/', {
//                 credentials: 'include', // This ensures cookies are sent with the request
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 setUser(data); // Set user data from API response
//             } else {
//                 console.error('Failed to fetch user data');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         } finally {
//             setLoading(false); // Stop loading after fetching
//         }
//     };

//     // Fetch user data when the component mounts
//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     // Function to update user basic details
//     const updateBasicDetails = (updatedDetails) => {
//         console.log("Update basic details");
//         console.log(updatedDetails);
//         setUser(prevUser => ({
//             ...prevUser,
//             ...updatedDetails.profile, // Update user data with new details
//         }));
//     };

//     // Provide user data and update functions to all components
//     const value = {
//         user,
//         loading,
//         updateBasicDetails,
//     };

//     return (
//         <UserContext.Provider value={value}>
//             {children} {/* This will allow other components to access the context */}
//         </UserContext.Provider>
//     );
// };

// // Default export UserContext if needed elsewhere
// export default UserContext;


// UserContext.js

// 





//============================================================================================
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State for user data
    const [authenticated, setAuthenticated] = useState(false); // State for authentication status
    const [loading, setLoading] = useState(true); // State to handle loading

    // Function to fetch user data from API (on initial load or when user logs in)
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/profile/`, {
                credentials: 'include', // This ensures cookies are sent with the request
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUser(data); // Set user data from API response
                setAuthenticated(true); // Set authenticated to true
            } else {
                console.error('Failed to fetch user data');
                setAuthenticated(false); // Set authenticated to false if API fails
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setAuthenticated(false); // Handle errors and set authenticated to false
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    // Update authentication status in context
    const updateAuthenticationStatus = (status) => {
        setAuthenticated(status);
        if (status) {
            fetchUserData();
            console.log("fatching data by apy call") ; // Fetch user data after login
        } else {
            setUser(null);  // Clear user data if logged out
        }
    };

    // Fetch user data when the component mounts or when authenticated status changes
    useEffect(() => {
        // If the user is already authenticated, fetch user data
        if (authenticated) {
            fetchUserData();
        } else {
            setLoading(false); // Stop loading if not authenticated
        }
    }, [authenticated]); // Dependency on 'authenticated' to trigger fetch after login/logout

    // Function to update user basic details
    const updateBasicDetails = (updatedDetails) => {
        console.log("Update basic details");
        console.log(updatedDetails);
        setUser(prevUser => ({
            ...prevUser,
            ...updatedDetails.profile, // Update user data with new details
        }));
    };

    // Provide user data, authentication status, and update functions to all components
    const value = {
        user,
        authenticated,
        loading,
        updateBasicDetails,
        updateAuthenticationStatus, // Expose the function to update authentication status
    };

    return (
        <UserContext.Provider value={value}>
            {children} {/* This will allow other components to access the context */}
        </UserContext.Provider>
    );
};
