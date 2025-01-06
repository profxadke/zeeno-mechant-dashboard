import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem("token");
    const expirationTime = sessionStorage.getItem("token_expiration");

    if (storedToken && expirationTime) {
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("token_expiration");
        return null;
      }
      return storedToken;
    }

    return null; 
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      const expirationTime = Date.now() + 900000;
      sessionStorage.setItem("token_expiration", expirationTime); 
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("token_expiration");
    }
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
