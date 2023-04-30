import React, { createContext, useState, useEffect } from "react";
import { read_cookie, bake_cookie } from "sfcookies";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [API_URL, setAPI_URL] = useState("http://localhost:5000");
  
  useEffect(() => {
    setIsLoggedIn(read_cookie("isLoggedIn") || false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn, 
        setIsLoggedIn, 
        errorMessage, 
        setErrorMessage,
        loading,
        setLoading,
        userData,
        setUserData,
        API_URL,
        setAPI_URL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
