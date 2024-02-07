import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faIdCard,faPhone,faKey,faLocationDot,faImage } from '@fortawesome/free-solid-svg-icons';
import './RegistrationFormHost.css';
import backgroundImage from '../../assets/img/pexels-roberto-nickson-2559941.jpg'
import logo from '../../assets/img/logowhat.png'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function RegistrationForm() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
 

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const response = await fetch('http://localhost:3008/user/registerHost', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();

  
      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
        const errors = data.errors.reduce((acc, error) => {
          acc[error.path] = error.msg;
          return acc;
        }, {});
        setFormErrors(errors);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar el formulario. Intente de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };



  
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className='cont' >
    <div className="registration-container">
    <Link class="navbar-brand" to="/"><img src={logo} alt="descripción" className='logo' /></Link>
      <h3>Crea una Cuenta Nueva</h3>
      <div className="registration-container2">
      <form onSubmit={handleSubmit} className="registrationForm" encType='multipart/form-data'>
        <div className='formflex'>
        <FontAwesomeIcon icon={faUser} />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
        />
        </div>
        {formErrors.nombre && <div className="error-message">{formErrors.nombre}</div>}
        {formErrors.apellido && <div className="error-message">{formErrors.apellido}</div>}
        <div className='formcolumn'>
        <div className='formflex'>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          type="email"
          name="email"
          placeholder="Email"
        />
        </div>
        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        <div className='formflex'>
        <FontAwesomeIcon icon={faIdCard} />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
        />
        </div>
        {formErrors.dni && <div className="error-message">{formErrors.dni}</div>}
        <div className='formflex'>
        <FontAwesomeIcon icon={faImage} />
         <label for="file">Profile Image:</label>
        <input
          type="file"
          name="avatar"
        />
        </div>
        </div>
        <div className='formflex'>
        <FontAwesomeIcon icon={faPhone} />
        <input
          type="text"
          name="telefono"
          placeholder="Numero de Telefono"
        />
        <input
          type="text"
          name="nacionalidad"
          placeholder="Nacionalidad"
        />
        </div>
        {formErrors.telefono && <div className="error-message">{formErrors.telefono}</div>}
        {formErrors.nacionalidad && <div className="error-message">{formErrors.nacionalidad}</div>}
        <div className='formflex'>
        <FontAwesomeIcon icon={faLocationDot} />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Direccion"
        />
        </div>
        {formErrors.ciudad && <div className="error-message">{formErrors.ciudad}</div>}
        {formErrors.direccion && <div className="error-message">{formErrors.direccion}</div>}
        <div className='formflex'> 
        <FontAwesomeIcon icon={faKey} />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme Contraseña"
        />
        </div>
        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
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

