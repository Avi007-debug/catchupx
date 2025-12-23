import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loginState = localStorage.getItem('catchupx_logged_in');
    setIsLoggedIn(loginState === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('catchupx_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('catchupx_logged_in');
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    login,
    logout
  };
};