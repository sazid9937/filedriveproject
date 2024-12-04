/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (userId) => {
    localStorage.setItem("id", userId);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("id");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
