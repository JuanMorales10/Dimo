import React, { useState } from 'react';
import './TabContainer.css'; // Asegúrate de que este archivo exista y contenga tus estilos CSS

const TabContainer = ({ details, comments, reservar, amenities, policies }) => {
    const [activeTab, setActiveTab] = useState('details'); // Asegúrate de que este sea uno de los nombres de las propiedades que estás pasando
  
    return (
      <div className="tab-container">
        <div className="tab-navigation">
          <button
            className={activeTab === 'details' ? 'active' : ''}
            onClick={() => setActiveTab('details')}
          >
            Detalle
          </button>
          <button
          className={activeTab === 'comments' ? 'active' : ''}
          onClick={() => setActiveTab('comments')}
        >
          Comentarios
        </button>
        <button
          className={activeTab === 'reservar' ? 'active' : ''}
          onClick={() => setActiveTab('reservar')}
        >
          Información
        </button>
        </div>
        <div className="tab-content">
          {activeTab === 'details' && <div className="tab-pane active">{details}</div>}
          {activeTab === 'comments' && <div className="tab-pane active">{comments}</div>}
          {activeTab === 'reservar' && <div className="tab-pane active">{reservar}</div>}
        </div>
      </div>
    );
  };

  export default TabContainer;
  