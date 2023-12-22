import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
  const { handleGoogleAuth } = useContext(UserContext);

    useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                handleGoogleAuth(code)
                  .then(() => {
                    navigate('/dashboard/profile');
                  })
                  .catch(error => {
                    console.error('Error en la autenticación de Google:', error);
                    navigate('/error');
                  });
              }

    }, [navigate, handleGoogleAuth]);

    return <LoadingScreen />;
};

export default GoogleAuthCallback;

