import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserToken, getUserSession, removeSession, setStorageObject } from '../utils/localStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getUserToken());

  useEffect(() => {
    const storedToken = getUserToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

    const login = (data) => {
      setStorageObject(JSON.stringify(data));
      setToken(data.token);
  };

  const logout = () => {
    removeSession();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
