import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme,
    useMediaQuery, Box, Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/img/logowhat.png';
import './SideNav.css'


function Sidenav({ mobileOpen, setMobileOpen }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const drawerWidth = 240; // Define el ancho del drawer

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        // Lógica para manejar el cierre de sesión
        navigate('/login');
    }


    const drawerContent = (
        <div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
                        color: 'white',
                        margin: '10px',
                        padding: '10px',
                        zIndex: '100'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                    }}
                >
                    <img src={Logo} alt="Logo" style={{ maxHeight: '40px' }} />
                </Box>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista de Servicios" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/profile">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/calendar">
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Calendario" />
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/favorites">
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favoritos" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'transparent'
                },
                display: { xs: isMobile ? (mobileOpen ? 'block' : 'none') : 'block' }
            }}
        >
            {drawerContent}
        </Drawer>
    );
}

export default Sidenav;