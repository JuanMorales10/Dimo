import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ServiceCard({ service, onEdit, onDelete }) {
  const [hover, setHover] = useState(false);


  return (
    <Card 
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      sx={{ maxWidth: 345, position: 'relative', margin: '1rem', borderRadius: '12px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)' }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3008//img/service/${service.images[0].url}`}
          alt={service.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {service.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{height:'100px', overflow:'overlay'}}>
            {service.descripcion}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{margin:'10px 0'}}>
            Precio: {service.precio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Direccion: {service.direccion}
          </Typography>
        </CardContent>
      </CardActionArea>
      {hover && (
        <CardActions sx={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Tooltip title="Editar" arrow>
            <IconButton onClick={() => onEdit(service.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" arrow>
            <IconButton onClick={() => onDelete(service.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
}
 export default ServiceCard;