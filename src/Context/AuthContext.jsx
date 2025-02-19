import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []); // Only run on mount

  const login = (user) => {
    setIsLoggedIn(true);
    // Save user data to localStorage for the session
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove user data from localStorage when logged out
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that 'children' is passed as a prop
};
