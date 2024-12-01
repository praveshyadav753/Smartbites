// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if user is authenticated
  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('access_token');
    setIsAuthenticated(!!accessToken); // If token exists, user is authenticated
  };

  // Logout function to clear tokens and update state
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status when the component mounts
  }, []);

  // Auth context value that can be accessed by any component
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
