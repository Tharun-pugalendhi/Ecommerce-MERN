// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: false, role: '', username: '' });

  const loginUser = (role, username) => {
    setUser({ loggedIn: true, role, username });
  };

  const logoutUser = () => {
    setUser({ loggedIn: false, role: '', username: '' });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
