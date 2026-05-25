import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  // For now, we'll simulate a simple auth state
  // You can expand this later when you add real login (Google, email, etc.)
  useEffect(() => {
    // Simulate checking if user is logged in
    const checkAuth = () => {
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // You can add more logout logic later
    console.log("User logged out");
  };

  const navigateToLogin = () => {
    // Redirect to login page when you create one
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      logout,
      navigateToLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
