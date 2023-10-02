const { User, Service } = require('../database/models');

const serviceController = {

  // Listar todos los servicios
  getAllServices: async (req, res) => {
    try {
      const services = await Service.findAll();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  },

  // Ver detalles de un servicio específico
  getServiceDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los detalles del servicio' });
    }
  },


 getUserServices : async (req, res) => {
  try {
    // Busca al usuario por su ID o algún otro identificador único
    const userId = req.session.user.id; 

    // Consulta todos los servicios relacionados con el usuario
    const userServices = await Service.findAll({
      where: {
        usuario_dni: userId, 
      },
    });

    // Renderiza la vista o devuelve los servicios como JSON, según tus necesidades
    res.render('user/services', { services: userServices });
  } catch (error) {
    // Maneja cualquier error que ocurra durante la consulta
    console.error('Error al obtener los servicios del usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
},
  // Crear un nuevo servicio
  createService: async (req, res) => {
    try {
      const newService = await Service.create(req.body);
      return res.status(201).json(newService);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el servicio' });
    }
  },

  // Editar un servicio existente
  updateService: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      await service.update(req.body);
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
  },

  // Eliminar un servicio
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
};

module.exports = serviceController;
