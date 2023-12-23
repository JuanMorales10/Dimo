import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { UserContext } from '../UserContext/UserContext';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const { handleGoogleAuth } = useContext(UserContext);
  const [authProcessed, setAuthProcessed] = useState(false); // Nueva variable de estado

  useEffect(() => {
    if (!authProcessed) {
      const processAuth = async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');

          if (code) {
            const response = await handleGoogleAuth(code);
            console.log(response);
            setAuthProcessed(true); 
              navigate('/dashboard/calendar'); 
          }
        } catch (error) {
          console.error('Error en la autenticación de Google:', error);
          navigate('/error'); // Manejo de error
        }
      };

      processAuth();
    }
  }, [navigate, handleGoogleAuth, authProcessed]);

  return <LoadingScreen />;
};

export default GoogleAuthCallback;
