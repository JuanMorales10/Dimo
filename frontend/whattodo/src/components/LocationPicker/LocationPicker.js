import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = () => <div style={{ color: 'red' }}>📍</div>; 

const LocationPicker = ({ apiKey, onLocationSelect }) => {
  const [center, setCenter] = useState({ lat: -32.89616581888548, lng: -68.8 });   
  const [markerPosition, setMarkerPosition] = useState(null); 
  const [zoom, setZoom] = useState(11); 
  const [locationName, setLocationName] = useState(''); 

  const handleMapClick = async ({ lat, lng }) => {
    setMarkerPosition({ lat, lng });
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
        const address = response.data.results[0]?.formatted_address;
        setLocationName(address);
        if (onLocationSelect) {
            onLocationSelect(address, lat, lng);
        }
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
    }
  };

  return (
    <>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker lat={markerPosition.lat} lng={markerPosition.lng} />}
        </GoogleMapReact>
      </div>
      {/* {locationName && (
        <div style={{ padding: '10px', fontSize: '1rem' }}>
          <strong>Ubicación Seleccionada:</strong> {locationName}
        </div>
      )} */}
    </>
  );
};

export default LocationPicker;







