import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem("access_token"));

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() > payload.exp * 1000;
    } catch (error) {
      return true; 
    }
  };

  const logoutUser = () => {
    setToken(null);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      logoutUser();
    }

    const interval = setInterval(() => {
      if (isTokenExpired(sessionStorage.getItem("access_token"))) {
        logoutUser();
      }
    }, 30000); 

    return () => clearInterval(interval);
  }, [token]);

  const updateToken = (newToken) => {
    if (newToken) {
      sessionStorage.setItem("access_token", newToken);
      setToken(newToken);
    } else {
      logoutUser();
    }
  };

  return (
    <TokenContext.Provider value={{ token, updateToken, logoutUser }}>
      {children}
    </TokenContext.Provider>
  );
};
