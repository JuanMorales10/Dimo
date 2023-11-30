import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3008/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        // Manejar errores o falta de token
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    return Promise.resolve();
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3008/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Fetching user profile failed');
      }
      const profileData = await response.json();

      return profileData; 
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      return null; // Retorna null en caso de error
    }
  };
  

  return (
    <UserContext.Provider value={{ token, login, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

