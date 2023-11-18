import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faIdCard,faKey,faImage } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logowhat.png'
import './RegistrationForm';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/img/pexels-roberto-nickson-2559941.jpg'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function RegistrationForm() {

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    dni: '',
    email: '',
    password: '',
    avatar: ''
  });



  useEffect(() => {

        const originalBackgroundImage = document.body.style.backgroundImage;
        const originalBackgroundSize = document.body.style.backgroundSize;
        const originalBackgroundPosition = document.body.style.backgroundPosition;
        const originalBackgroundRepeat = document.body.style.backgroundRepeat;
        const img = new Image();
        
        img.src = backgroundImage;
        img.onload = () => {
          // La imagen se ha cargado, cambia el fondo y oculta el spinner
          document.body.style.backgroundImage = `url(${backgroundImage})`;
          setLoading(false);
        };
    
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    
        return () => {
            document.body.style.backgroundImage = originalBackgroundImage;
            document.body.style.backgroundSize = originalBackgroundSize;
            document.body.style.backgroundPosition = originalBackgroundPosition;
            document.body.style.backgroundRepeat = originalBackgroundRepeat;
        };
      }, []);


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

  
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className='cont'>
    <div className="registration-container">
      {/* <h1>Whattodo</h1> */}
      <Link class="navbar-brand" to="/"><img src={logo} alt="descripción" className='logo' /></Link>
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
        <button type="submit" className='butan'>Crear Cuenta</button>
        </div>
      </form>
    </div>
    </div>
    </div>
   
  );
}

export default RegistrationForm;


<div class="cont" style="
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
    margin-right: 5vw;
"></div>