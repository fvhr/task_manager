import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (fio: string, username: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{
    fio: string;
    username: string;
    password: string;
  } | null>(null);

  const register = (fio: string, username: string, password: string) => {
    setRegisteredUser({ fio, username, password });
  };

  const login = (username: string, password: string) => {
    if (
      registeredUser &&
      registeredUser.username === username &&
      registeredUser.password === password
    ) {
      setIsAuthenticated(true)
    } else {
     console.log('Ошибка авторизации');
		 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
