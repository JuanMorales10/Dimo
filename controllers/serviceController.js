const { User, Service, ServiceImage } = require('../database/models');

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
  getUserServices: async (req, res) => {
    try {
      // Busca al usuario por su ID o algún otro identificador único
      const userId = req.session.user.id;

      // Consulta todos los servicios relacionados con el usuario
      const userServices = await Service.findAll({
        where: {
          usuario_dni: userId,
        },
      });

      // Renderiza la vista o devuelve los servicios como JSON
      res.render('user/services', { services: userServices });
    } catch (error) {
      // Maneja cualquier error que ocurra durante la consulta
      console.error('Error al obtener los servicios del usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  getCreateService: (req, res) => {

  },
  // Crear un nuevo servicio
  createService: async (req, res) => {
    try {
      // Obtén la información del servicio del cuerpo de la solicitud
      const serviceData = {
        usuario_dni: req.body.usuario_dni,
        categoria_id: req.body.categoria_id,
        id_region: req.body.id_region,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad,
        atp: req.body.atp || null,
        rating: req.body.rating || null,
        precio: req.body.precio,
        duracion: req.body.duracion || null,
        disponibilidad: req.body.disponibilidad || null,
      };

      // Obtenemos las imágenes subidas
      const images = req.files;

      // Creamos el servicio en la base de datos
      const newService = await Service.create(serviceData);

      // Asocia las imágenes al servicio recién creado
      if (images && images.length > 0) {
        for (const image of images) {
          await ServiceImage.create({
            service_id: newService.id,
            url: image.filename 
          });
        }
      }

      return res.redirect('/servicio/' + newService.id );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear el servicio' });
    }
  },

  // Editar un servicio existente
  putUpdateService: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria_id } = req.body;

    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      await service.update({
        nombre,
        descripcion,
        precio,
        categoria_id,
      });

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
