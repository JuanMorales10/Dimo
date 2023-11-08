import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faIdCard, faEye, faKey, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';

function LoginForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        dni: '',
        Password: '',
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
                <h3>LogIn</h3>
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
                                    value={formData.idNumber}
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
        </html>
    );
}

export default LoginForm;
