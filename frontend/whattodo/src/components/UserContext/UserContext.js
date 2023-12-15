import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile();
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
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null); 
    return Promise.resolve();
  };

  const fetchUserProfile = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:3008/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Fetching user profile failed');
        }
        const profileData = await response.json();
        setUser(profileData); // Actualiza el estado del usuario
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setUser(null); // En caso de error, resetea el estado del usuario
      }
    }
  };

  return (
    <UserContext.Provider value={{ token, user , login, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

