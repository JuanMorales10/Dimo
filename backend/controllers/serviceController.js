const { User, Service, ServiceImage, Category, Comment, Region } = require('../database/models');

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
      const regions = await Region.findAll({raw:true}); 
     

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
            direccion: req.body.direccion
        };

      

        const images = req.files;

        const newService = await Service.create(serviceData);

        console.log(newService);

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
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      const updatedFields = {};
      const fieldsToUpdate = ['nombre', 'descripcion', 'precio', 'categoria_id', 'id_region', 'capacidad', 'duracion', 'disponibilidad', 'atp', 'rating'];
      fieldsToUpdate.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          updatedFields[field] = req.body[field];
        }
      });
      await service.update(updatedFields);
      return res.redirect('/servicio/' + id);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el servicio' });
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
      const { categoryId, regionId } = req.params;
      if (!categoryId || !regionId) {
        return res.status(400).json({ error: 'Categoría o región no válida' });
      }
      const services = await Service.findAll({
        where: {
          categoria_id: categoryId,
          id_region: regionId,
        },
      });
      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los servicios por categoría y región' });
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
};

module.exports = serviceController;
