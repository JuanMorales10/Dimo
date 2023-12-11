const { User, Service, ServiceImage, Category, Comment, Region, Order } = require('../database/models');
const { Op } = require('sequelize');
const moment = require('moment');


const serviceController = {
  getAllServices: async (req, res) => {
    try {

      const services = await Service.findAll({
        include: [{
          model: ServiceImage,
          as: 'images',
          attributes: ['url']
        }]
      });
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  },

  getServiceDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      const comments = await Comment.findAll({
        where: {
          servicio_id: id,
        },
      });

      const images = await ServiceImage.findAll({
        where: {
          service_id: id
        }
      })

      return res.status(200).json({
        service,
        comments,
        images
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los detalles del servicio' });
    }
  },

  getUserServices: async (req, res) => {
    try {
      const userId = req.params.id
      const userServices = await Service.findAll({
        where: {
          usuario_dni: userId,
        },
      });

      return res.json({
        success: true,
        services: userServices,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  },


  getCreateService: async (req, res) => {
    try {

      const categories = await Category.findAll();
      const regions = await Region.findAll({ raw: true });


      res.render('createService', { categories, regions });

    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Error al cargar el formulario' });
    }
  },
  postCreateService: async (req, res) => {
    try {

      const atp = req.body.atp === 'on' ? true : false;
      const disponibilidad = req.body.disponibilidad === 'on' ? true : false;
      const operating_hours_start = req.body.operating_hours_start;
      const operating_hours_end = req.body.operating_hours_end;
      const operating_days = req.body.operating_days;


      const serviceData = {
        usuario_dni: req.body.usuario_dni,
        categoria_id: req.body.categoria_id,
        id_region: req.body.id_region,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad,
        atp: atp,
        rating: req.body.rating || null,
        precio: req.body.precio,
        duracion: req.body.duracion || null,
        disponibilidad: disponibilidad || null,
        direccion: req.body.direccion,
        operating_hours_start,
        operating_hours_end,
        operating_days
      };

     

      const images = req.files;

      const newService = await Service.create(serviceData);

      

      if (images && images.length > 0) {
        for (const image of images) {
          const imageResult = await ServiceImage.create({
            service_id: newService.id,
            url: image.filename,
          });

          if (!imageResult) {
            return res.status(500).json({ error: 'Error al crear la imagen del servicio' });
          }
        }
      }

      return res.status(201).json({ message: 'Servicio creado exitosamente', service: newService });
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Datos de entrada no válidos' });
      } else {
        return res.status(500).json({ error: 'Error al crear el servicio' });
      }
    }
  },


  putUpdateService: async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);
  
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const updatedFields = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria_id: req.body.categoria_id,
        capacidad: req.body.capacidad,
        id_region: req.body.id_region,
        precio: req.body.precio,
        duracion: req.body.duracion || null,
        atp: req.body.atp === 'true',
        rating: req.body.rating || null,
        disponibilidad: req.body.disponibilidad === 'true',
        direccion: req.body.direccion,
        operating_hours_start: req.body.operating_hours_start,
        operating_hours_end: req.body.operating_hours_end,
        operating_days: req.body.operating_days
      };
  
      await service.update(updatedFields);
  
      return res.status(200).json({ message: 'Servicio actualizado con éxito', service });
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteService: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      await service.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
  },

  postComment: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const userId = req.session.user.id;
      const comment = await Comment.create({
        descripcion: req.body.comment,
        servicio_id: serviceId,
        usuario_dni: req.body.userdni,
      });
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al crear el comentario' });
    }
  },

  filterServices: async (req, res) => {
    try {
      const {
        categoria_id, regionId, precioMin, precioMax, disponibilidad, rating, capacidad, atp, nombre
      } = req.query;

      let filterCriteria = {};

      if (categoria_id) {
        filterCriteria.categoria_id = categoria_id;
      }

      if (regionId) {
        filterCriteria.id_region = regionId;
      }

      if (precioMin && precioMax) {
        filterCriteria.precio = { [Op.between]: [parseFloat(precioMin), parseFloat(precioMax)] };
      } else if (precioMin) {
        filterCriteria.precio = { [Op.gte]: parseFloat(precioMin) };
      } else if (precioMax) {
        filterCriteria.precio = { [Op.lte]: parseFloat(precioMax) };
      }

      if (disponibilidad !== undefined) {
        filterCriteria.disponibilidad = disponibilidad === 'true';
      }

      if (rating) {
        filterCriteria.rating = { [Op.gte]: parseInt(rating, 10) };
      }

      if (capacidad) {
        filterCriteria.capacidad = { [Op.eq]: parseInt(capacidad, 10) };
      }

      if (atp !== undefined) {
        filterCriteria.atp = atp === 'true';
      }

      if (nombre) {
        filterCriteria.nombre = { [Op.like]: `%${nombre}%` };
      }

      const services = await Service.findAll({
        where: filterCriteria,
        include: [
          {
            model: ServiceImage,
            as: 'images',
            attributes: ['url']
          },
          {
            model: Category,
            as: 'category'
          },
          // Incluye aquí otras asociaciones según sea necesario
        ]
      });

      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al filtrar los servicios' });
    }
  },

  searchServicesByName: async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ error: 'Nombre de servicio no proporcionado' });
      }
      const services = await Service.findAll({
        where: {
          nombre: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al buscar servicios por nombre' });
    }
  },

  getPopularServices: async (req, res) => {
    try {
      const services = await Service.findAll({
        order: [['rating', 'DESC']],
        limit: 10,
        include: [{
          model: ServiceImage,
          as: 'images',
          attributes: ['url']
        }]
      });
      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los servicios populares' });
    }
  },

  getAvailableServices: async (req, res) => {
    try {
      const services = await Service.findAll({
        where: {
          disponibilidad: true,
        },
      });
      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los servicios disponibles' });
    }
  },
  getAvailableSlots: async (req, res) => {
    try {
      const  id  = req.params.id; // El ID del servicio
      const { date } = req.query; // Suponiendo que quieres slots para una fecha específica

      // Verificar si se proporcionó la fecha
      if (!date) {
        return res.status(400).json({ message: 'Date parameter is required.' });
      }

      // Llamar a la función para calcular los slots disponibles
      const slots = await calculateAvailableSlots(id, date); 

      // Devolver los slots disponibles como respuesta
      res.status(200).json(slots);
    } catch (error) {
      console.error('Error getting available slots:', error);
      res.status(500).json({ message: 'Error getting available slots' });
    }
  }

};

module.exports = serviceController;

const calculateAvailableSlots = async (serviceId, selectedDate) => {
  try {
    // Obtener detalles del servicio
    const service = await Service.findOne({
      where: { id: serviceId },
      attributes: ['operating_days', 'operating_hours_start', 'operating_hours_end', 'duracion']
    });
    if (!service) {
      throw new Error('Service not found');
    }

    const operatingDays = service.operating_days.split(',').map(day => day.trim());
    const dayOfWeekNumber = new Date(selectedDate).getDay();
    const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"];
    const dayOfWeekString = dayNames[dayOfWeekNumber];

    if (!operatingDays.includes(dayOfWeekString)) {
      return []; // No hay slots disponibles si el servicio no opera en ese día
    }

    // Establecer horarios de operación para la fecha seleccionada
    const operationStart = new Date(`${selectedDate}T${service.operating_hours_start}`);
    const operationEnd = new Date(`${selectedDate}T${service.operating_hours_end}`);

    // Convertir la duración a horas
    const durationHours = parseInt(service.duracion.split(':')[0]);

    // Calcular slots disponibles
    let slots = [];
    let lastEnd = operationStart;

    while (lastEnd < operationEnd) {
      const slotEnd = addHours(lastEnd, durationHours);
      const reservationOverlapCount = await Order.count({
        where: {
          service_id: serviceId,
          start_datetime: {
            [Op.lt]: slotEnd
          },
          end_datetime: {
            [Op.gt]: lastEnd
          }
        }
      });

      if (reservationOverlapCount === 0 && slotEnd <= operationEnd) {
        slots.push(new Date(lastEnd)); // Agrega el horario de inicio del slot disponible
      }

      lastEnd = addHours(lastEnd, durationHours);
    }

    // Devolver los slots en formato ISO String
    return slots.map(slot => slot.toISOString());
  } catch (error) {
    console.error('Error calculating available slots:', error);
    throw error;
  }
};

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

// const calculateAvailableSlots = async (serviceId, selectedDate) => {
//   try {
//     // Obtener detalles del servicio
//     const service = await Service.findByPk(serviceId);
//     if (!service) {
//       throw new Error('Service not found');
//     }

//     const operatingDays = service.operating_days;
//     const dayOfWeekNumber = new Date(selectedDate).getDay();
//     const dayNames = [ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"];
//     const dayOfWeekString = dayNames[dayOfWeekNumber];

//     // Verificar si el servicio opera en el día seleccionado
//     if (!operatingDays.includes(dayOfWeekString)) {
//       return []; // No hay slots disponibles si el servicio no opera en ese día
//     }

//     // Establecer horarios de operación para la fecha seleccionada
//     const operationStart = new Date(`${selectedDate}T${service.operating_hours_start}`);
//     const operationEnd = new Date(`${selectedDate}T${service.operating_hours_end}`);

//     // Obtener reservas existentes para ese día
//     const reservations = await Order.findAll({
//       where: {
//         service_id: serviceId,
//         start_datetime: {
//           [Op.between]: [operationStart, operationEnd]
//         }
//       }
//     });

//     // Calcular slots disponibles
//     let slots = [];
//     let lastEnd = operationStart;

//     for (let time = operationStart; time < operationEnd; time = addHours(time, service.duracion)) {
//       const slotEnd = addHours(time, service.duracion);
//       const isSlotAvailable = !reservations.some(reservation => {
//         const start = new Date(reservation.start_datetime);
//         const end = new Date(reservation.end_datetime);
//         return (time < end && slotEnd > start); // Chequea si hay solapamiento
//       });

//       if (isSlotAvailable) {
//         slots.push(time); // Agrega el horario de inicio del slot disponible
//       }
//     }

//     return slots.map(slot => slot.toISOString().split('T')[1]); // Devuelve solo las horas de los slots
//   } catch (error) {
//     console.error('Error calculating available slots:', error);
//     throw error;
//   }
// };

// function addHours(date, hours) {
//   return new Date(date.getTime() + hours * 60 * 60 * 1000);
// }



