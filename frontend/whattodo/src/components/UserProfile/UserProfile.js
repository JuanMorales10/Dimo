import React, { useState, useEffect, useContext } from 'react';
import './UserProfile.css';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext'; // Asegúrate de tener la ruta correcta

const UserProfile = () => {
  const { token ,user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const usuario = user.profile
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        if (user && user.profile) {
          const response = await fetch(`http://localhost:3008/service/userServices/${user.profile.id}`, {
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
    
    loadServices();
  }, [user?.profile?.id, token]);
  
  if (!user || !user.profile) {
    return <div>Loading...</div>; 
  }
  
  console.log(user)
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="user-profile">
        <div className="user-info">
          <img className="profile-picture" src={`http://localhost:3008/img/avatar/${usuario.avatar}`} alt={`${usuario.nombre} ${usuario.apellido}`} />
          <div className="user-details">
          <h1>{`${usuario.nombre} ${usuario.apellido ? usuario.apellido : ''}`}</h1>
            <p className="user-location">{usuario.ciudad}</p>
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

