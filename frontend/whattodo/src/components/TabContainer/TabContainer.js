import React, { useState } from 'react';
import './TabContainer.css'; // Asegúrate de que este archivo exista y contenga tus estilos CSS

const TabContainer = ({ details, comments, tours, amenities, policies }) => {
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
        </div>
        <div className="tab-content">
          {activeTab === 'details' && <div className="tab-pane active">{details}</div>}
          {activeTab === 'comments' && <div className="tab-pane active">{comments}</div>}
          {/* ... contenido de otras pestañas ... */}
        </div>
      </div>
    );
  };

  export default TabContainer;
  