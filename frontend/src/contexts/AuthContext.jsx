import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem('token');
  const [token, setToken] = useState(savedToken);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
