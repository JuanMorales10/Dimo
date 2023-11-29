import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    setUser(userData); 
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3008/user/logOut', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('user'); 
      setUser(null); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    history.push('/'); 
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3008/user/profile', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Fetching user profile failed');
      const profileData = await response.json();
      setUser(profileData);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

