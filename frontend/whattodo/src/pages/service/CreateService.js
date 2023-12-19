import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/UserContext/UserContext';
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
    const { token, user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        capacidad: '',
        id_region: 1,
        atp: '',
        rating: 0,
        precio: '',
        duracion: '',
        disponibilidad: true,
        direccion: '',
        operating_hours_start: '',
        operating_hours_end: '',
        operating_days: [],
    });
    const [selectedFiles, setSelectedFiles] = useState([]);



    const handleImageChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleInputChange = (event) => {
        const { name, checked, value } = event.target;
        if (name === 'atp') {
            setFormData({ ...formData, [name]: checked ? true : false });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleLocationSelect = (locationName, lat, lng) => {
        setFormData({ ...formData, direccion: locationName, latitud: lat, longitud: lng });
    };

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, categoria_id: category });
    };

    const handleDayChange = (event) => {
        const { value, checked } = event.target;
        setFormData(prevFormData => {
            const newOperatingDays = checked
                ? [...prevFormData.operating_days, value]
                : prevFormData.operating_days.filter(day => day !== value);
            return { ...prevFormData, operating_days: newOperatingDays };
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const submitData = new FormData();
        submitData.append('usuario_dni', user.profile.id);
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        selectedFiles.forEach(file => {
            submitData.append('image', file);
        });

       

        try {
            const response = await axios.post('http://localhost:3008/service/createService', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            // Manejar respuesta...
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            // Manejo de errores...
        }
    };

    return (
        <>
            <NavBar />
            <form onSubmit={handleSubmit} className="create-service-form">
                <div className='form-cont'>
                    <h2>Crear Experiencia</h2>

                    {/* Paso 1: Categoría */}
                    <div className='inside-1'>
                            <h3>Paso 1</h3>
                        <section className="form-step">
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
                                    <button type='button' className="category-button" onClick={() => handleCategorySelect('1')} name='categoria_id'>
                                        <img src={vit} alt="Wineries" />
                                    </button>
                                    Vitivinicola
                                </div>
                                <div>
                                    <button type='button' className="category-button" onClick={() => handleCategorySelect('4')} name='categoria_id'>
                                        <img src={aven} alt="Adventure" />
                                    </button>
                                    Aventura
                                </div>
                                <div>
                                    <button type='button' className="category-button" onClick={() => handleCategorySelect('3')} name='categoria_id'>
                                        <img src={trans} alt="Transport" />
                                    </button>
                                    Transporte
                                </div>
                                <div>
                                    <button type='button' className="category-button" onClick={() => handleCategorySelect('5')} name='categoria_id'>
                                        <img src={noche} alt="Nightlife" />
                                    </button>
                                    Noche
                                </div>
                            </div>
                        </section>
                            <h3>Paso 2</h3>
                        <section className="form-step">
                            <input type="text" placeholder="Nombra tu experiencia" name='nombre' onChange={handleInputChange} />
                            <label>Selecciona tu ubicacion</label>
                            <LocationPicker
                                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                onLocationSelect={handleLocationSelect}
                            />
                            {formData.direccion && (
                                <div style={{ padding: '10px', fontSize: '1rem' }}>
                                    <strong>Dirección Seleccionada:</strong> {formData.direccion}
                                </div>
                            )}
                            <textarea placeholder="Describe what are your guests gonna do during your experience" name='descripcion' onChange={handleInputChange}></textarea>
                        </section>
                    </div>
                    <div className='inside-2'>
                            <h3>Paso 3</h3>
                        <section className="form-step">
                            <div>
                                <h4>Días de Operación</h4>
                                <div className='days-cont'>
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            name="operating_days"
                                            value={day}
                                            onChange={handleDayChange}
                                            checked={formData.operating_days.includes(day)}
                                        />
                                        {day}
                                    </div>
                                ))}
                                </div>
                            </div>
                            <h4> Horarios de Operación</h4>
                            <div className='hor-flex'>
                            <label>Inicio</label>
                            <input
                                type="time"
                                name="operating_hours_start"
                                onChange={handleInputChange}
                                value={formData.operating_hours_start}
                                placeholder="Hora de inicio"
                            />
                            </div>
                            <div className='hor-flex'>
                            <label>Fin</label>
                            <input
                                type="time"
                                name="operating_hours_end"
                                onChange={handleInputChange}
                                value={formData.operating_hours_end}
                                placeholder="Hora de fin"
                            />
                            </div>
                        </section>

                            <h3>Paso 4</h3>
                        <section className="form-step">
                            <h5>Detalla tu Experiencia</h5>
                            <div className='column'>
                            <div className='row'>
                            <div className='formflexcreat'>
                                <label className='lab'>Precio:</label>
                                <input type="number" name='precio' onChange={handleInputChange}></input>
                            </div>
                            <div className='formflexcreat'>
                                <label className='lab'>Duración:</label>
                                <input type="time" name='duracion' onChange={handleInputChange} value={formData.duracion} />
                            </div>
                            </div>
                            <div className='row'>
                            <div className='formflexcreat'>
                                <label className='lab'>Maximo de Personas:</label>
                                <input type="number" style={{ width: '30%' }} name='capacidad' onChange={handleInputChange}></input>
                            </div>
                            <div className='formflexcreat'>
                                <label className='lab'>Apto para todo Publico:</label>
                                <input type='checkbox' style={{ width: '20%' }} name='atp' onChange={handleInputChange}></input>
                            </div>
                            </div>
                            </div>
                        </section>
                            <h3>Paso 5</h3>
                        <section className="form-step">
                            <h5>Sube imágenes sobre tu experiencia</h5>
                            <input type="file" onChange={handleImageChange} multiple name='images' />
                            <div className="image-preview-container">
                                {selectedFiles.map((file, index) => (
                                    <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="image-preview" />
                                ))}
                            </div>
                        </section>
                        <div className='sub-but'>
                        <button type="submit" className="submit-button">Crear Experiencia</button>
                        </div>
                    </div>

                </div>
            </form>
            <Footer />
        </>
    );
}

export default CreateServiceForm;
