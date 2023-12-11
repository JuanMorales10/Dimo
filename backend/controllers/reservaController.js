const { Order, Service, User } = require('../database/models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const ReservaController = {
  createReserva: async (req, res) => {
    try {
      const { usuario_dni, service_id, start_datetime, end_datetime } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Verificar solapamientos de la reserva
      const overlappingOrder = await Order.findOne({
        where: {
          service_id: service_id,
          [Op.or]: [
            {
              start_datetime: {
                [Op.lt]: new Date(end_datetime)
              },
              end_datetime: {
                [Op.gt]: new Date(start_datetime)
              }
            },
            {
              start_datetime: {
                [Op.gte]: new Date(start_datetime)
              },
              end_datetime: {
                [Op.lte]: new Date(end_datetime)
              }
            }
          ]
        }
      });

      if (overlappingOrder) {
        return res.status(400).json({ message: "El horario ya está reservado." });
      }

      // Si no hay solapamientos, crear la reserva
      const newOrder = await Order.create({
        usuario_dni,
        service_id,
        start_datetime,
        end_datetime,
        status: 'pending' 
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al crear la reserva", error });
    }
  },

  getReservas: async (req, res) => {
    try {
      const reservas = await Order.findAll({
        include: [
          { model: User, as: 'user' },
          { model: Service, as: 'service' }
        ]
      });
      return res.status(200).json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener las reservas", error });
    }
  },

  updateReserva: async (req, res) => {
    try {
      const { id } = req.params;
      const { start_datetime, end_datetime } = req.body;

      // Verificar que la reserva existe
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      // Verificar solapamientos antes de actualizar
      const overlappingOrder = await Order.findOne({
        where: {
          service_id: order.service_id,
          id: { [Op.not]: id }, // Excluir la reserva actual
          // Resto de la condición igual que en createReserva
        }
      });

      if (overlappingOrder) {
        return res.status(400).json({ message: "El horario ya está reservado." });
      }

      // Actualizar la reserva
      await order.update({ start_datetime, end_datetime });

      return res.status(200).json({ message: "Reserva actualizada", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar la reserva", error });
    }
  },

  deleteReserva: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      await order.destroy();
      return res.status(200).json({ message: "Reserva eliminada" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar la reserva", error });
    }
  }
};

module.exports = ReservaController;
