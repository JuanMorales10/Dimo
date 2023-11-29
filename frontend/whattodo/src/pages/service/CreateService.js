import React, { useState } from 'react';
import axios from 'axios';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import gast from '../../assets/img/gastonomia.jpg';
import vit from '../../assets/img/winery.jpg';
import aven from '../../assets/img/aventura.jpg';
import noche from '../../assets/img/noche.jpg';
import trans from '../../assets/img/transporte.jpg';
import './CreateServiceForm.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

function CreateServiceForm() {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        usuario_dni: userFromStorage ? userFromStorage.id : '',
        nombre: '',
        descripcion: '',
        categoria_id : '',
        capacidad: '',
        id_region: 1,
        atp: '',
        rating: 4,
        precio: '',
        duracion: null,
        disponibilidad: null
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleImageChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, categoria_id: category });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        submitData.append('categoria', selectedCategory); 

        selectedFiles.forEach(file => {
            submitData.append('image', file);
        });

        console.log(selectedLocation)

        if (selectedLocation) {
            submitData.append('latitude', selectedLocation.lat);
            submitData.append('longitude', selectedLocation.lng);
        }



        try {
            const response = await axios.post('http://localhost:3008/service/createService', submitData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
          
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        
        }
    };

    return (
        <>
        <NavBar />
        <form onSubmit={handleSubmit} className="create-service-form">
            <h2>Experience</h2>
            <input type='hidden' value={formData.usuario_dni} name='usuario_dni'/>

            {/* Paso 1: Categoría */}
            <div className="form-step">
                <h3>Paso 1</h3>
                <h5>
                    Elije la Categoria de tu Experiencia
                </h5>
                <div className="categories-container">
                    <div>
                    <button type='button' className="category-button" onClick={() => handleCategorySelect('2')} name='categoria_id'>
                        <img src={gast} alt="Gastronomy" />
                    </button>
                    Gastronomia
                    </div>
                   <div>
                   <button  type='button'  className="category-button" onClick={() => handleCategorySelect('1')} name='categoria_id'>
                        <img src={vit} alt="Wineries" />
                    </button>
                        Vitivinicola
                   </div>
                    <div>
                    <button   type='button' className="category-button" onClick={() => handleCategorySelect('4')} name='categoria_id'>
                        <img src={aven} alt="Adventure" />
                    </button>
                        Aventura
                    </div>
                    <div>
                    <button   type='button'  className="category-button" onClick={() => handleCategorySelect('3')} name='categoria_id'>
                        <img src={trans} alt="Transport" />
                    </button>
                        Transporte
                    </div>
                    <div>
                    <button  type='button'  className="category-button" onClick={() => handleCategorySelect('5')} name='categoria_id'>
                        <img src={noche} alt="Nightlife" />
                    </button>
                        Noche
                    </div>
                </div>
            </div>
            <div className="form-step">
                <h3>Paso 2</h3>
                <input type="text" placeholder="Nombra tu experiencia" name='nombre' onChange={handleInputChange}/>
                <label>Selecciona tu ubicacion</label>
                <LocationPicker apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} />
                <textarea placeholder="Describe what are your guests gonna do during your experience" name='descripcion' onChange={handleInputChange}></textarea>
            </div>
            <div className="form-step">
                <h3>Paso 3</h3>
                <h5>Detalla tu Experiencia</h5>
                <div className='formflexcreat'>
                    <label className='lab'>Precio:</label>
                    <input type="number" name='precio' onChange={handleInputChange}></input>
                </div>
                <div className='formflexcreat'>
                    <label className='lab'>Maximo de Personas:</label>
                    <input type="number" style={{width:'20%'}} name='capacidad' onChange={handleInputChange}></input>
                </div>
                <div className='formflexcreat'>
                    <label className='lab'>Apto para todo Publico:</label>
                    <input type='checkbox'  style={{width:'20%'}} name='atp' onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="form-step">
                <h3>Paso 4</h3>
                <h5>Sube imágenes sobre tu experiencia</h5>
                <input type="file" onChange={handleImageChange} multiple name='images' />
                <div className="image-preview-container">
                    {selectedFiles.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="image-preview" />
                    ))}
                </div>
            </div>

            <button type="submit" className="submit-button">Crear Experiencia</button>
        </form>
        <Footer />
        </>
    );
}

export default CreateServiceForm;
