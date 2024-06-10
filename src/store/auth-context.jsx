import React, { createContext, useState, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
};

const authContext = createContext(initialState);

export default authContext;

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("dDriveToken");
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
    }
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("dDriveToken", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("dDriveToken");
  };

  return (
    <authContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {props.children}
    </authContext.Provider>
  );
};
