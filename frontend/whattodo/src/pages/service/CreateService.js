import React from 'react';
import gast from '../../assets/img/gastonomia.jpg';
import vit from '../../assets/img/winery.jpg'
import aven from '../../assets/img/aventura.jpg'
import noche from '../../assets/img/noche.jpg'
import trans from '../../assets/img/transporte.jpg'
import LocationPicker from '../../components/LocationPicker';
import './CreateServiceForm.css';

function CreateServiceForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para procesar los datos del formulario
    };

    return (
        <form onSubmit={handleSubmit} className="create-service-form">
            <h2>Experience</h2>

            <div className="form-step">
                <h3>Paso 1</h3>
                <h5>
                    Elije la Categoria de tu Experiencia
                </h5>
                <div className="categories-container">
                    <div>
                    <button className="category-button">
                        <img src={gast} alt="Gastronomy" />
                    </button>
                    Gastronomia
                    </div>
                   <div>
                   <button className="category-button">
                        <img src={vit} alt="Wineries" />
                    </button>
                        Vitivinicola
                   </div>
                    <div>
                    <button className="category-button">
                        <img src={aven} alt="Adventure" />
                    </button>
                        Aventura
                    </div>
                    <div>
                    <button className="category-button">
                        <img src={trans} alt="Transport" />
                    </button>
                        Transporte
                    </div>
                    <div>
                    <button className="category-button">
                        <img src={noche} alt="Nightlife" />
                    </button>
                        Noche
                    </div>
                </div>
            </div>

            <div className="form-step">
                <h3>Paso 2</h3>
                <input type="text" placeholder="Nombra tu experiencia" />
                <label type="text" placeholder="Select your location" className='lab'>Selecciona tu ubicacion</label>
                <LocationPicker apiKey = 'AIzaSyAQqdFljkULy_PJaU_K71rLIcaX2VgYgrY' classNamelab/>
                <textarea placeholder="What does your experience different from others?"></textarea>
            </div>

            {/* Paso 3: Detalles */}
            <div className="form-step">
                <h3>Paso 3</h3>
                <h5>Detalla tu Experiencia</h5>
                <div className='formflexcreat'>
                    <label className='lab'>Precio:</label>
                    <input type="number"></input>
                </div>
                <div className='formflexcreat'>
                    <label className='lab'>Maximo de Personas:</label>
                    <input type="number" style={{width:'20%'}}></input>
                </div>
                <div className='formflexcreat'>
                    <label className='lab'>Apto para todo Publico:</label>
                    <input type='checkbox'  style={{width:'20%'}}></input>
                </div>
            </div>

            <div className="form-step">
                <h3>Step 4</h3>
                {/* Input para subir imágenes */}
            </div>

            <button type="submit" className="submit-button">Create Experience</button>
        </form>
    );
}

export default CreateServiceForm;
