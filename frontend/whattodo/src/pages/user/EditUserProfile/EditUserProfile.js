import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './EditUserProfile.css';
import { UserContext } from '../../../components/UserContext/UserContext';

const EditUserProfile = () => {
  const { fetchUserProfile, token } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    currentPassword: '',
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile();
        if (profileData.profile) {
          setCurrentUser(profileData.profile);
          setFormData(profileData.profile); // Aquí actualizamos formData con los datos actuales del usuario
        }
      } catch (error) {
        console.error('Error al cargar perfil de usuario:', error);
      }
    };

    loadUserProfile();
  }, [fetchUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando datos al servidor:', formData);

    try {
      const response = await fetch('http://localhost:3008/user/updateProfile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="edit-user-profile">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-header">
            <img className="profile-picture" src={`http://localhost:3008/img/avatar/${currentUser?.avatar}`} alt={`${currentUser?.nombre} ${currentUser?.apellido}`} />
            <h2>Editar Perfil</h2>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre"/>
            </div>
            <div className="form-group">
              <label>Apellido:</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono" />
            </div>
            <div className="form-group">
              <label>Dirección:</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="Dirección" />
            </div>
            <div className="form-group">
              <label>Contraseña Actual (para confirmar cambios):</label>
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} placeholder="Contraseña Actual" />
            </div>
          </div>
          <div className="form-footer">
            <button type="submit" className="submit-btn">Confirmar Cambios</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserProfile;


