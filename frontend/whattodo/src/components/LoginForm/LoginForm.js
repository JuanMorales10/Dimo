import React, { useState , useEffect, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard, faEye, faKey} from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';
import backgroundImage from '../../assets/img/pexels-roberto-nickson-2559941.jpg'
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';

function LoginForm() {
    const history = useHistory();
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        dni: '',
        password: '',
    });

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


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3008/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(response)

            const data = await response.json();

            console.log(data.user)
            login(data.user); 

            history.push('/');  
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };
    

    if (loading) {
        return <LoadingScreen />;
      }

    return (
        <div className='cont'>
            <div className="registration-container">
            <Link class="navbar-brand" to="/"><img src={logo} alt="descripción" className='logo' /></Link>
                <h3>LogIn</h3>
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
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="DNI"
                                    required
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
                            <div class="see-password2">
                                <input type="checkbox" name="" id="see-password"  style={{ marginBottom: '12px' }}/>
                                <FontAwesomeIcon icon={faEye}  className='seepass'/>
                            </div>
                        </div>
                        <div className='formflex'>
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    );
}

export default LoginForm;
