const { User, Service, ServiceImage, Category, Comment, Region } = require('../database/models');

const serviceController = {

  getAllServices: async (req, res) => {
    try {
      const services = await Service.findAll();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  },
  getServiceByRegion: async (req, res) => {
    try {
      let region = req.params.region;
  
      // Mapear el nombre de la región a su identificador correspondiente
      const regionMap = {
        RNorte: 1,      // Region Norte
        RPampeana: 2,   // Region Pampeana
        RDCuyo: 3,      // Region De Cuyo
        RPatagonia: 4,  // Region Patagonia
      };
  
      region = regionMap[region];
  
      if (region === undefined) {
        return res.status(400).json({ error: 'Región no válida' });
      }
  
      const services = await Service.findAll({
        where: {
          id_region: region
        }
      });
 
      return res.status(200).json(services);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los detalles del servicio' });
    }
  }
  
  ,

  getServiceDetails: async (req, res) => {
    const { id } = req.params;
    try {

      const service = await Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }


      const comments = await Comment.findAll({
        where: {
          servicio_id: id
        }
      })

      // return res.render('/', { service, comments });
      return res.status(200).json(service);

    } catch (error) {

      return res.status(500).json({
        error: 'Error al obtener los detalles del servicio'
      });
    }
  },
  getUserServices: async (req, res) => {
    try {
      const userId = req.session.user.id;

      const userServices = await Service.findAll({
        where: {
          usuario_dni: userId,
        },
      });

      res.render('user/services', { services: userServices });

    } catch (error) {

      res.status(500).send('Error interno del servidor');
    }
  },
  getCreateService: (req, res) => {

  },

  createService: async (req, res) => {
    try {

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

      return res.redirect('/servicio/' + newService.id);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear el servicio' });
    }
  },

  // Editar un servicio existente
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

      return res.redirect('/servicio/' + id)
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
  }
  ,


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

      console.log(req.body)

      const serviceId = req.params.id
      const userId = req.session.user.id

      const comment = await Comment.create({
        descripcion: req.body.comment,
        servicio_id: serviceId,
        usuario_dni: req.body.userdni
      })

      return res.status(204).send();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error al crear el comentario' })


    }
  }
};

module.exports = serviceController;
