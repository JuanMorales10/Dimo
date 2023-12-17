const { Favorite, Service, User } = require('../database/models');

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
  }
};

module.exports = favoriteController;
