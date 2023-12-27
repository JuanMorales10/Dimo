import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceCard from '../ServiceCard/ServiceCard';
import { UserContext } from '../UserContext/UserContext';
import Card from '../Card/Card';

function Favorites() {
  const { token, user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3008/service/service/favorite`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('No se pudieron obtener los favoritos');
        }

        const favoritesData = await response.json();
        console.log(favoritesData)
        setFavorites(favoritesData);
      } catch (error) {
        setError(error.message);
      }
    };

    loadFavorites();
  }, [user?.profile?.id, token]);

  return (
    <Box sx={{
      padding: '10px 20px',
      marginTop: {
        xs: '70px',
        sm: 0
      },
      height: '100vh'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', height: '60px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25));', backgroundColor: '#fff', justifyContent: "space-between" }}>
        <Typography variant="h4" component="h2" sx={{
          fontWeight: 400,
          fontSize: '1.725rem',
          lineHeight: 1.235,
          letterSpacing: '0.00735em',
          color: 'white'
        }}>
          Mis Favoritos :
        </Typography>
        {error && <p>Error: {error}</p>}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '10px',
          justifyContent: 'center'
        }}
      >
        {favorites.map((favorite) => (
          <Card
            key={favorite.id}
            id={favorite.id}
            nombre={favorite.nombre}
            descripcion={favorite.descripcion}
            precio={favorite.precio}
            rating={favorite.rating}
            imageUrl={favorite.images[0]} // Asumiendo que images es un array de URLs
          />
        ))}
      </Box>
    </Box>
  );
}

export default Favorites;

