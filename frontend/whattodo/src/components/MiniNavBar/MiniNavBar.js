import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function MiniNavbar({ setMobileOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1, 
        width: isMobile ? '100%' : `calc(100% - 260px)`, // Ajusta según el ancho de tu Sidenav
        boxShadow: 'rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
        backdropFilter: 'saturate(200%) blur(1.875rem)',
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));',
        borderRadius: '12px',
        margin:'10px',
        ml: isMobile ? 0 : '240px', // Ajusta este valor para alinearlo con el ancho de tu Sidenav
        color: 'black',
        width: '95vw',
        zIndex: '1'
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2, color:'black !important'}}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MiniNavbar;

