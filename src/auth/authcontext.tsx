import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData:any) => void;
  logout: () => void;
  getCurrentUser: () => any;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  // Sync localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);


  const login = (userData:any) => {
    console.log(userData)
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  };
  
  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
  };

  const getCurrentUser = () => {
    return "ok"
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};