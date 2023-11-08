import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faIdCard,faKey,faImage } from '@fortawesome/free-solid-svg-icons';
import './RegistrationForm';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    dni: '',
    email: '',
    password: '',
    avatar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a un servidor o manejar la lógica de validación
    console.log(formData);
  };

  return (
    <html>
    <div className="registration-container">
      <h1>Whattodo</h1>
      <h3>Crea una Cuenta Nueva</h3>
      <div className="registration-container2">
      <form onSubmit={handleSubmit} className="registrationForm">
        <div className='formcolumn'>
        <div className='formflex'>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        </div>
        <div className='formflex'>
        <FontAwesomeIcon icon={faIdCard} />
        <input
          type="text"
          name="dni"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="DNI"
          required
        />
         </div>
        <div className='formflex'>
        <FontAwesomeIcon icon={faImage} />
         <label for="file">Profile Image:</label>
        <input
          type="file"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
        </div>
        </div>
        <div className='formflex'> 
        <FontAwesomeIcon icon={faKey} />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme Contraseña"
          required
        />
        </div>
        <div className='formflex'>
        <button type="submit">Crear Cuenta</button>
        </div>
      </form>
    </div>
    </div>
    </html>
  );
}

export default RegistrationForm;
