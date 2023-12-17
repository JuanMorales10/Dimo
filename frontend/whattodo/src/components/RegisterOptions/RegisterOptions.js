import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterOptions.css'

const RegisterOptions = () => {
  const navigate = useNavigate();

  const handleSelectOption = (option) => {
    if (option === 'normal') {
      navigate('/register-normal');
    } else if (option === 'host') {
      navigate('/register-host');
    }
  };

  return (
    <div className="register-options-container">
    <h3 className="register-options-header">¿Cómo deseas registrarte?</h3>
    <div className='button-cont'>
    <button className="register-option-button" onClick={() => handleSelectOption('normal')}>Usuario Normal</button>
    <button className="register-option-button" onClick={() => handleSelectOption('host')}>Usuario Modo HOST</button>
    </div>
  </div>
  );
};

export default RegisterOptions;
