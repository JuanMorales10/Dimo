const { User, Service, ServiceImage, Category, Comment, Region, Order, Favorite } = require('../database/models');

const favoriteController = {
  addFavorite: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const userId = req.session.user.userId;

      console.log(userId)
      console.log(serviceId)

      // Verificar si ya existe en favoritos
      const existingFavorite = await Favorite.findOne({
        where: { usuario_dni: userId, servicio_id: serviceId }
      });

      if (existingFavorite) {
        return res.status(409).json({ message: "El servicio ya está en tus favoritos" });
      }

      // Crear nuevo favorito
      const newFavorite = await Favorite.create({ usuario_dni: userId, servicio_id: serviceId });

      console.log(newFavorite)
      return res.status(201).json({ message: "Servicio añadido a favoritos", favorite: newFavorite });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al añadir a favoritos" });
    }
  },

  removeFavorite: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const userId = req.session.user.userId;

      // Eliminar de favoritos
      const deleted = await Favorite.destroy({
        where: { usuario_dni: userId, servicio_id: serviceId }
      });

      console.log(deleted)

      if (deleted) {
        return res.status(200).json({ message: "Servicio eliminado de favoritos" });
      } else {
        return res.status(404).json({ message: "Favorito no encontrado" });
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar de favoritos" });
    }
  },
  isFavorite: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const userId = req.session.user.userId;

      // Verificar si ya existe en favoritos
      const existingFavorite = await Favorite.findOne({
        where: { usuario_dni: userId, servicio_id: serviceId }
      });
    
      return res.status(200).json({ isFavorited: !!existingFavorite });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al verificar favoritos" });
    }
  },
  favorites: async (req, res) => {
    try {
      const userId = req.session.user.userId;
  
      const favorites = await Favorite.findAll({
        where: { usuario_dni: userId },
        include: [{
          model: Service,
          as: 'service',
          attributes: ['id', 'nombre', 'descripcion', 'precio', 'categoria_id'],
          include: [{
            model: ServiceImage, 
            as: 'images',
            attributes: ['url'] 
          }]
        }],
        attributes: []
      });

      console.log(favorites)
  
      const services = favorites.map(fav => ({
        ...fav.service.get({ plain: true }),
        images: fav.service.images.map(img => img.url), // Extraer URLs de imágenes
        isFavorite: true
      }));

  
      return res.status(200).json(services);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los favoritos" });
    }
  },
};

module.exports = favoriteController;
