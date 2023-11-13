import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faIdCard,faPhone,faKey,faLocationDot,faImage } from '@fortawesome/free-solid-svg-icons';
import './RegistrationFormHost.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    telefono: '',
    nacionalidad: 'Argentino',
    password: '',
    confirmPassword: '',
    avatar: '',
    ciudad:'',
    direccion:''
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
    <div className='container' >
    <div className="registration-container">
      <h1>Whattodo</h1>
      <h3>Crea una Cuenta Nueva de Anfitrion</h3>
      <div className="registration-container2">
      <form onSubmit={handleSubmit} className="registrationForm">
        <div className='formflex'>
        <FontAwesomeIcon icon={faUser} />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        </div>
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
          value={formData.dni}
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
        <FontAwesomeIcon icon={faPhone} />
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Numero de Telefono"
          required
        />
        <input
          type="text"
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          placeholder="Nacionalidad"
          required
        />
        </div>
        <div className='formflex'>
        <FontAwesomeIcon icon={faLocationDot} />
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          placeholder="Ciudad"
          required
        />
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Direccion"
          required
        />
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
    </div>
  );
}

export default RegistrationForm;

