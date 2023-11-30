import React, { useState, useEffect, useContext } from 'react';
import './UserProfile.css';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext'; // Asegúrate de tener la ruta correcta

const UserProfile = () => {
  const { fetchUserProfile, token } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile();
        if (profileData) {
          setUser(profileData.profile);
          // Ahora carga los servicios
          const response = await fetch(`http://localhost:3008/service/userServices/${profileData.profile.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
         
          if (!response.ok) {
            throw new Error('No se pudieron obtener los servicios');
          }
          const servicesData = await response.json();

        
          setServices(servicesData.services);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    loadUserProfile();
  }, [fetchUserProfile, token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="user-profile">
        <div className="user-info">
          <img className="profile-picture" src={`http://localhost:3008/img/avatar/${user.avatar}`} alt={`${user.nombre} ${user.apellido}`} />
          <div className="user-details">
            <h1>{`${user.nombre} ${user.apellido}`}</h1>
            <p className="user-location">{user.ciudad}</p>
            <div className='buttons-profile'>
              <Link to='/user/editUser'>
                <button className="edit-profile-btn">Edit Profile</button>
              </Link>
              <Link to="/create-service">
                <button className="edit-profile-btn">Crear Servicio</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="listed-items">
          <h2>Listed recently</h2>
          <div className="items-container">
            {services.map((service) => (
              <Card key={service.id} {...service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

