import React, { createContext, useState, useEffect } from 'react';



export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [googleToken, setGoogleToken] = useState(localStorage.getItem('googleToken'));
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUserProfile();
      fetchReservas();
    }
  }, [token]);

  const fetchReservas = async () => {
    try {
      const response = await fetch('http://localhost:3008/reserva/reservas', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('No se pudieron cargar las reservas');
      const reservasEventos = await response.json();
      console.log(reservasEventos)
      setEvents(reservasEventos);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  const addEvent = (newEvent) => {
    console.log(newEvent)
    setEvents((currentEvents) => [...currentEvents, newEvent]);

  };

  const handleGoogleAuth = async (code) => {
    try {
        const response = await fetch(`http://localhost:3008/auth/google/callback?code=${code}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });

        const data = await response.json();

        // Redireccionar al home
        window.location.href = '/'; // Asume que '/' es tu ruta de inicio (home)
        
    } catch (error) {
        console.error('Error en la autenticación de Google:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};





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

      console.log(data)

      if (data.token) {
        if (keepSession) {
          localStorage.setItem('token', data.token);
          setCookie('userEmail', email, 7);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setToken(data.token);
        await fetchUserProfile(data.token);
        return Promise.resolve();
      } else {
        // Verificar si es un error de middleware o un array de errores de validación
        if (data.errors && Array.isArray(data.errors)) {
          // Errores de express-validator
          const formattedErrors = data.errors.reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {});
          return { errors: formattedErrors };
        } else if (data.error) {
          // Error directo del middleware
          return { errors: { general: data.error } };
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { errors: { general: 'Error al conectar con el servidor.' } };
    }
  };



  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    deleteCookie('userEmail');
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
        const profileData = await response.json();
        setUser(profileData);
        setUserRole(profileData.profile.type);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setUser(null);
      }
    }
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout, fetchUserProfile, userRole, events, addEvent, fetchReservas, handleGoogleAuth, googleToken }}>
      {children}
    </UserContext.Provider>
  );
};

