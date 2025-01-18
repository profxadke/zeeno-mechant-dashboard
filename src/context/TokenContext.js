import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem("access_token");
    console.log("Initial token from sessionStorage:", storedToken);
    return storedToken || null;
  });

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
    sessionStorage.removeItem("username"); // Remove additional user-related session data if applicable
  };

  return (
    <TokenContext.Provider value={{ token, updateToken, logoutUser }}>
      {children}
    </TokenContext.Provider>
  );
};
