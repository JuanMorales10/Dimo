import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './EditUserProfile.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../components/UserContext/UserContext';
import logo from '../../../assets/img/logowhat.png';

const EditUserProfile = () => {
  const history = useHistory();
  const { fetchUserProfile, token } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState(null);
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
    avatar: '',
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile();
        if (profileData.profile) {
          setCurrentUser(profileData.profile);
          setFormData(profileData.profile);
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

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.keys(formData).forEach(key => {
      // Asegúrate de no incluir el avatar en este paso, ya que se manejará por separado
      if (key !== 'avatar') {
        updatedData.append(key, formData[key]);
      }
    });
  
    // Añadir el archivo de imagen, si existe
    if (avatarFile) {
      updatedData.append('avatar', avatarFile);
    }
  
    console.log(updatedData); 
    console.log(formData)
  
    try {
      const response = await fetch('http://localhost:3008/user/updateProfile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: updatedData, 
      });
      const data = await response.json();

      console.log(data)
        history.push('/user/editUser'); 
      // Manejar la respuesta del servidor aquí
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };


  return (
    <>
      <NavBar />
      <div className="edit-user-profile">
        <form onSubmit={handleSubmit} className="profile-form" encType='multipart/form-data'>
          <div className="form-header">
            <img className="profile-picture" src={`http://localhost:3008/img/avatar/${currentUser?.avatar}`} alt={`${currentUser?.nombre} ${currentUser?.apellido}`} />
            <h2>Editar Perfil</h2>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
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
            <div className='form-group'>
              <label>Foto de Perfil:</label>
              <input type="file" id="fileInput" name="avatar" onChange={handleFileChange} style={{ display: 'none' }} />
              <button type="button" onClick={triggerFileInput} className="custom-file-upload">
                <img src={logo} alt="Logo" className="button-logo" />
                Seleccionar Archivo
              </button>
            </div>
            <div className="form-group">
              <label>Contraseña Actual (para confirmar cambios):</label>
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} placeholder="Contraseña Actual" />
            </div>
            <button type="submit" className="submit-btn">Confirmar Cambios</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserProfile;


