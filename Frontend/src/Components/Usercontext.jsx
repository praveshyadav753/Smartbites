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
/**   token get from cookies-----------------------------------------------------------------------
 * Function to retrieve a cookie value by its name
 * @param {string} name - Name of the cookie to retrieve
 * @returns {string | null} - Value of the cookie or null if not found
 */
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie matches the desired name
            if (cookie.startsWith(`${name}=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
//   __________________________________ logout _______________________________________________//   
const handleLogout = async () => {
    console.log('Try LOGOUT');   
    
    try {
        const csrfToken = Cookies.get('csrftoken');
        console.log(csrfToken);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`Logout failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);  
        setAuthenticated(false);
    } catch (error) {
        console.error('Error during logout:', error);
    }
};


    // Function to handle token refresh
    const handleTokenRefresh = async () => {
        
        try {
            const refreshResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
                {},
                { withCredentials: true }
            );
    
            if (refreshResponse.status === 200 && refreshResponse.data.access) {
                setAuthenticated(true);
                fetchUserData();
            } else {
                console.error('Invalid refresh token response:', refreshResponse.data);
                setAuthenticated(false);
                // handleLogout();
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            setAuthenticated(false);
            // handleLogout();
        }
    };
    

    const checkAuthenticationStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status/`, {
                withCredentials: true,
            });
        
            if (response.status === 200) {
                setAuthenticated(true);
                fetchUserData();
            } else if (response.status === 401||response.status === 403) {
                await handleTokenRefresh();
            } else {
                console.error('Unexpected status:', response.status);
                navigate('/login');
                setAuthenticated(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 401 ||error.response.status === 403) {
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
        handleLogout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

