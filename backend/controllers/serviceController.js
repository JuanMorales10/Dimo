const { User, Service, ServiceImage, Category, Comment, Region, Order } = require('../database/models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');


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
      const id = req.params.id;
      const { date } = req.query;

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
    const service = await Service.findOne({
      where: { id: serviceId },
      attributes: ['operating_days', 'operating_hours_start', 'operating_hours_end', 'duracion']
    });
    if (!service) {
      throw new Error('Service not found');
    }


    console.log('Service: ', service)
    console.log(selectedDate)

    const operatingDays = service.operating_days.replace(/['"\[\]]+/g, '').split(',');
    const dayOfWeekNumber = new Date(selectedDate + 'T00:00:00Z').getDay();
    const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const dayOfWeekString = dayNames[dayOfWeekNumber];

    console.log(dayOfWeekString)


    if (!operatingDays.includes(dayOfWeekString)) {
      return []; // No hay slots disponibles si el servicio no opera en ese día
    }

    // Generar todos los slots del día
    const operationStart = moment.tz(`${selectedDate} ${service.operating_hours_start}`, 'YYYY-MM-DD HH:mm', 'America/Argentina/Buenos_Aires');
    const operationEnd = moment.tz(`${selectedDate} ${service.operating_hours_end}`, 'YYYY-MM-DD HH:mm', 'America/Argentina/Buenos_Aires');
    const duration = parseInt(service.duracion.split(':')[0]) * 60 + parseInt(service.duracion.split(':')[1]);
    let potentialStart = moment(operationStart);

    console.log(operationStart)
    console.log(operationEnd)

    let allSlots = [];

    while (potentialStart.isBefore(operationEnd)) {
      allSlots.push(potentialStart.format());
      potentialStart.add(duration, 'minutes');
    }

    const reservations = await Order.findAll({
      where: {
        service_id: serviceId,
        start_datetime: { [Op.lte]: operationEnd },
        end_datetime: { [Op.gte]: operationStart }
      }
    });

    // Asegúrate de que las reservas estén en la zona horaria local de Argentina
    const bookedSlots = reservations.map(reservation => ({
      start: moment(reservation.start_datetime).tz('America/Argentina/Buenos_Aires'),
      end: moment(reservation.end_datetime).tz('America/Argentina/Buenos_Aires')
    }));

    // Imprimir las fechas de las reservas en la zona horaria local
    bookedSlots.forEach(bookedSlot => {
      console.log("Start (Local Argentina):", bookedSlot.start.format());
      console.log("End (Local Argentina):", bookedSlot.end.format());
    });

    // Comparar con la zona horaria local
    const availableSlots = allSlots.filter(slot =>
      !bookedSlots.some(bookedSlot => {
        const slotMoment = moment(slot);
        return slotMoment.isSameOrAfter(bookedSlot.start) && slotMoment.isBefore(bookedSlot.end);
      })
    );

    console.log('Booked:', bookedSlots.map(slot => ({ start: slot.start.format(), end: slot.end.format() })));
    console.log('Available', availableSlots);

    return availableSlots;


    // console.log('start', operationStart)
    // console.log('End',operationEnd)

    // console.log(reservations)

    // reservations.forEach(reservation => {
    //   console.log("Start (Local Argentina):", moment(reservation.start_datetime).tz('America/Argentina/Buenos_Aires').format());
    //   console.log("Start (UTC):", moment(reservation.start_datetime).utc().format());
    // });

    // // Convertir las reservaciones a la zona horaria local de Argentina
    // const bookedSlots = reservations.map(reservation => ({
    //   start: moment(reservation.start_datetime).tz('America/Argentina/Buenos_Aires').toDate(),
    //   end: moment(reservation.end_datetime).tz('America/Argentina/Buenos_Aires').toDate()
    // }));

    // const availableSlots = allSlots.filter(slot => 
    //   !bookedSlots.some(bookedSlot => {
    //     const slotMoment = moment(slot);
    //     const startBooked = moment(bookedSlot.start);
    //     const endBooked = moment(bookedSlot.end);
    //     return slotMoment.isSameOrAfter(startBooked) && slotMoment.isBefore(endBooked);
    //   })
    // );

    // console.log('Booked:', bookedSlots);
    // console.log('Available', availableSlots);

    // return availableSlots;
  } catch (error) {
    console.error('Error calculating available slots:', error);
    throw error;
  }
};

function addTime(date, hours, minutes) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
}





