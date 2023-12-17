import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const deleteCookie = (name) => {
    document.cookie = name + '=; Max-Age=-99999999;';
  };

  const login = async (email, password, keepSession) => {
    try {
      const response = await fetch('http://localhost:3008/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        if (keepSession) {
          localStorage.setItem('token', data.token);
          setCookie('userEmail', email, 7); 
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setToken(data.token);
        await fetchUserProfile(data.token);
        window.location.href = '/';
      } else {
        console.error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    deleteCookie('userEmail'); 
    setToken(null);
    setUser(null);
    window.location.href = '/';
    return Promise.resolve();
  };

  const fetchUserProfile = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:3008/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const profileData = await response.json();
        setUser(profileData);
        setUserRole(profileData.type);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setUser(null);
      }
    }
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, fetchUserProfile, userRole }}>
      {children}
    </UserContext.Provider>
  );
};

