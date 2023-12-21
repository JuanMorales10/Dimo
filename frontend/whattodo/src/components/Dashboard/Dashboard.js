import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidenav from '../SideNav/SideNav';
import ServiceList from '../ServiceList/ServiceList';
import Calendar from '../Calendar/Calendar';
import Favorites from '../Favorites/Favorites';
import UserProfile from '../UserProfile/UserProfileDashboard';
import MiniNavbar from '../MiniNavBar/MiniNavBar';
import NotFoundPage from '../../pages/user/NotFound/NotFoundPage';
import ReservasView from '../ReservasViews/ReservasViews';

function Dashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="dashboard">
            {isMobile && <MiniNavbar setMobileOpen={setMobileOpen} />}
            <Sidenav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <main style={{ marginLeft: isMobile ? 0 : '240px', backgroundColor:'#f0f0f0' }}>
                {/* Configuración de las rutas dentro del dashboard */}
                <Routes>
                    <Route index element={<ServiceList />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="reservas" element={<ReservasView />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;



