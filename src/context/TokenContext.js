import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem("access_token");
    console.log("Initial token from sessionStorage:", storedToken);
    return storedToken || null;
  });

  const navigate = useNavigate(); 

  const isTokenExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; 
    const currentTime = Date.now();

    return currentTime > expirationTime;
  };

  // Update token and store in sessionStorage
  const updateToken = (newToken) => {
    console.log("Updating token:", newToken);
    setToken(newToken);
    if (newToken) {
      sessionStorage.setItem("access_token", newToken);
      console.log("Token stored in sessionStorage:", sessionStorage.getItem("access_token"));
    } else {
      logoutUser();
    }
  };

  // Clear token on logout
  const logoutUser = () => {
    console.log("Logging out, clearing sessionStorage.");
    setToken(null);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    navigate("/login"); 
  };

  // Effect to check token expiry on component mount and token change
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log("Token expired, logging out...");
      logoutUser();
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, updateToken, logoutUser, isTokenExpired }}>
      {children}
    </TokenContext.Provider>
  );
};