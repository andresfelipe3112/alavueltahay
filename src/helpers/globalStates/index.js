import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const SecurityContext = createContext();

const SecurityProvider = ({ children }) => {
  const [_jwt, _setJwt] = useState(null);

  return (
    <SecurityContext.Provider
      value={{
        _jwt,
        _setJwt,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

const EntrepreneurContext = createContext();

const EntrepreneurProvider = ({ children }) => {
  const [entrepreneur, setEntrepreneur] = useState(null);

  return (
    <EntrepreneurContext.Provider
      value={{
        entrepreneur,
        setEntrepreneur,
      }}
    >
      {children}
    </EntrepreneurContext.Provider>
  );
};

export default {
  UserContext,
  UserProvider,
  SecurityContext,
  SecurityProvider,
  EntrepreneurContext,
  EntrepreneurProvider,
};
