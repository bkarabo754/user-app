import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
const AuthContext = createContext();

// Provider component to manage authentication state and actions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if the user is authenticated
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Check localStorage or sessionStorage for authentication status on component mount
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true); // Set authenticated state if user is found in localStorage
    } else {
      setIsAuthenticated(false); // Set unauthenticated state if user is not found
    }
  }, []);

  const login = (user) => {
    // Function to handle user login
    localStorage.setItem("user", JSON.stringify(user)); // Store user information in localStorage
    setIsAuthenticated(true); // Update state to authenticated
    navigate("/add-user"); // Navigate to the add-user page
  };

  const logout = () => {
    // Function to handle user logout
    localStorage.removeItem("user"); // Remove user information from localStorage
    setIsAuthenticated(false); // Update state to unauthenticated
    navigate("/login"); // Navigate to the login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
