import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterOptions.css'

const RegisterOptions = () => {
  const history = useHistory();

  const handleSelectOption = (option) => {
    if (option === 'normal') {
      history.push('/register-normal');
    } else if (option === 'host') {
      history.push('/register-host');
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
