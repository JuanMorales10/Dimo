import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
const Marker = () => (
  <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    color: 'red',
    fontSize: '40px',
  }}>
    📍
  </div>
);


const LocationPicker = ({ apiKey, onLocationSelect }) => {
  const [center, setCenter] = useState({ lat: -32.89616581888548, lng: -68.8 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [locationName, setLocationName] = useState('');

  const handleMapClick = async ({ lat, lng }) => {
    const newMarkerPosition = { lat, lng };
    setMarkerPosition(newMarkerPosition);
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

  useEffect(() => {
    if (markerPosition) {
      setCenter(markerPosition);
    }
  }, [markerPosition]);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <Marker
            lat={markerPosition.lat}
            lng={markerPosition.lng}
            key={`${markerPosition.lat}-${markerPosition.lng}`}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default LocationPicker;
