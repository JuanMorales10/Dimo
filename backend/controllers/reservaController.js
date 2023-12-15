const { Order, Service, User } = require('../database/models');
const { validationResult } = require('express-validator');
const { sequelize } = require('../database/models/index');
const moment = require('moment-timezone');
const { Op } = require('sequelize');

const ReservaController = {
  createReserva: async (req, res) => {
    try {
      const { usuario_dni, service_id, start_datetime, end_datetime, duracion, nombreReserva, nombreUsuario } = req.body;
  
      // Validación de los datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Verificar solapamientos de la reserva
      const overlappingOrder = await Order.findOne({
        where: {
          service_id,
          [Op.or]: [
            { start_datetime: { [Op.lt]: new Date(end_datetime) }, end_datetime: { [Op.gt]: new Date(start_datetime) } },
            { start_datetime: { [Op.gte]: new Date(start_datetime) }, end_datetime: { [Op.lte]: new Date(end_datetime) } }
          ]
        }
      });
  
      if (overlappingOrder) {
        return res.status(400).json({ message: "El horario ya está reservado." });
      }
  
      const newOrder = {
        usuario_dni,
        service_id,
        start_datetime: start_datetime,
        end_datetime: end_datetime,
        status: 'pending',
        cantidadPersonas: req.body.cantidadPersonas,
        nombreReserva,
        nombreUsuario
      };

      console.log(newOrder)
  
      // Crear la reserva
      const reserva = await Order.create(newOrder);

     // Convertir las fechas a la hora local
    const startDateTimeLocal = moment(reserva.start_datetime).tz('America/Argentina/Buenos_Aires');
    const endDateTimeLocal = moment(reserva.end_datetime).tz('America/Argentina/Buenos_Aires');

    // Crear un objeto con la información de la reserva para enviar como respuesta
    const reservaResponse = {
      ...reserva.dataValues,
      start_datetime: startDateTimeLocal.format(),
      end_datetime: endDateTimeLocal.format()
    };

    console.log(reservaResponse);
    return res.status(201).json(reservaResponse);
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
/*

createReserva: async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { usuario_dni, service_id, start_datetime, end_datetime } = req.body;

    // Validación de los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await transaction.rollback();
      return res.status(400).json({ errors: errors.array() });
    }

    // Verificar solapamientos de la reserva
    const overlappingOrder = await Order.findOne({
      where: {
        service_id,
        [Op.or]: [
          { start_datetime: { [Op.lt]: new Date(end_datetime) }, end_datetime: { [Op.gt]: new Date(start_datetime) } },
          { start_datetime: { [Op.gte]: new Date(start_datetime) }, end_datetime: { [Op.lte]: new Date(end_datetime) } }
        ]
      }
    }, { transaction });

    if (overlappingOrder) {
      await transaction.rollback();
      return res.status(400).json({ message: "El horario ya está reservado." });
    }

    // Crear la reserva
    const newOrder = await Order.create({ usuario_dni, service_id, start_datetime, end_datetime, status: 'pending' });
    // const newOrder = await Order.create({ usuario_dni, service_id, start_datetime, end_datetime, status: 'pending' }, { transaction });
    if (newOrder) {
      // Preparar datos para el evento del calendario
      const eventData = {
        summary: 'Reserva en ' + service.nombre+' .-Dimo', // Ejemplo, ajusta según tus necesidades
        start: {
          dateTime: newOrder.start_datetime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires', // Ajusta a tu zona horaria
        },
        end: {
          dateTime: newOrder.end_datetime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires',
        },
        // ...otros campos que desees agregar
      };

      // Intentar agregar evento al calendario
      await addEventToCalendar(eventData);
    }

    await transaction.commit();
    return res.status(201).json(newOrder);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: "Error al crear la reserva", error });
  }
} */