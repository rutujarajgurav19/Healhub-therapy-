import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userTimestamp');
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userTimestamp', Date.now().toString());
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userTimestamp');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    // Save to localStorage for persistent login with timestamp
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userTimestamp', Date.now().toString());
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
