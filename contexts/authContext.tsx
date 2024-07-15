import React, { useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MyAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const MyAuthProvider: React.FC<MyAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
