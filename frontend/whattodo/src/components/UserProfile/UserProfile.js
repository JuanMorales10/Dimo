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

  
  useEffect(() => {

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
          <img className="profile-picture" src={`http://localhost:3008/img/avatar/${user.profile.avatar}`} alt={`${user.profile.nombre} ${user.profile.apellido}`} />
          <div className="user-details">
          <h1>{`${user.profile.nombre} ${user.profile.apellido ? user.profile.apellido : ''}`}</h1>
            <p className="user-location">{user.profile.ciudad}</p>
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
      </div>
    </>
  );
};

export default UserProfile;

