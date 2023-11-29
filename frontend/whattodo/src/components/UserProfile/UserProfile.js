import React, { useState, useEffect } from 'react';
import './UserProfile.css'; 
import Card from '../Card/Card'; 
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';


const UserProfile = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.id) {
      const fetchService = async () => {
        try {
          const itemsResponse = await fetch(`http://localhost:3008/service/userServices/${user.id}`);
          if (!itemsResponse.ok) {
            throw new Error('No se pudieron obtener los servicios');
          }
          const itemsData = await itemsResponse.json();

          console.log(itemsData)
          
          setServices(itemsData.services);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchService();
    }
  }, [user]);

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
          <div className="user-stats">
            <span className="reviews">{user.reviews} reviews</span>
            <span className="sold-items">{user.soldItems} sold items</span>
          </div>
          <div className='buttons-profile'>
          <button className="edit-profile-btn">Edit Profile</button>
          <Link to="/create-service" >
          <button className="edit-profile-btn">Crear Servicio</button>
        </Link>
          </div>
        </div>
      </div>
      <div className="user-bio">{user.bio}</div>
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

