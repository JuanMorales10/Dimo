const { Order, Service, User } = require('../database/models');
const { validationResult } = require('express-validator');
const { sequelize } = require('../database/models/index');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const { google } = require('googleapis');

const ReservaController = {
  // createReserva : async (req, res) => {
  //   try {
  //     const { usuario_dni, service_id, start_datetime, end_datetime, cantidadPersonas, nombreReserva, nombreUsuario } = req.body;

  //     // Validación de los datos de entrada
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //     }

  //     // Verificar solapamientos de la reserva
  //     const overlappingOrder = await Order.findOne({
  //       where: {
  //         service_id,
  //         [Op.or]: [
  //           { start_datetime: { [Op.lt]: new Date(end_datetime) }, end_datetime: { [Op.gt]: new Date(start_datetime) } },
  //           { start_datetime: { [Op.gte]: new Date(start_datetime) }, end_datetime: { [Op.lte]: new Date(end_datetime) } }
  //         ]
  //       }
  //     });

  //     if (overlappingOrder) {
  //       return res.status(400).json({ message: "El horario ya está reservado." });
  //     }

  //     const newOrder = {
  //       usuario_dni,
  //       service_id,
  //       start_datetime,
  //       end_datetime,
  //       status: 'pending',
  //       cantidadPersonas,
  //       nombreReserva,
  //       nombreUsuario
  //     };

  //     console.log(newOrder)

  //     const reserva = await Order.create(newOrder);

  //         // Convertir las fechas a la hora local
  //   const startDateTimeLocal = moment(reserva.start_datetime).tz('America/Argentina/Buenos_Aires');
  //   const endDateTimeLocal = moment(reserva.end_datetime).tz('America/Argentina/Buenos_Aires');

  //   // Crear un objeto con la información de la reserva para enviar como respuesta
  //   const reservaResponse = {
  //     id: newOrder.service_id,
  //     ...reserva.dataValues,
  //     start_datetime: startDateTimeLocal.format(),
  //     end_datetime: endDateTimeLocal.format()
  //   };

  //     // Obtener los tokens de Google del usuario
  //     const user = await User.findOne({ where: { id: usuario_dni } });
  //     if (!user || !user.googleAccessToken || !user.googleRefreshToken) {
  //       throw new Error('No se pudo obtener los tokens de Google del usuario');
  //     }

  //     const oauth2Client = new google.auth.OAuth2(
  //       process.env.GOOGLE_CLIENT_ID,
  //       process.env.GOOGLE_CLIENT_SECRET,
  //       process.env.GOOGLE_REDIRECT_URI 
  //     );

  //     oauth2Client.setCredentials({
  //       access_token: user.googleAccessToken,
  //       refresh_token: user.googleRefreshToken
  //     });

  //     // Crear un evento en Google Calendar
  //     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  //     const event = {
  //       summary: nombreReserva,
  //       description: `Reserva para ${nombreUsuario}.`,
  //       start: {
  //         dateTime: start_datetime,
  //         timeZone: 'America/Argentina/Buenos_Aires'
  //       },
  //       end: {
  //         dateTime: end_datetime,
  //         timeZone: 'America/Argentina/Buenos_Aires'
  //       },
  //       attendees: [{ email: user.email }],
  //       reminders: {
  //         useDefault: false,
  //         overrides: [
  //           { method: 'email', minutes: 24 * 60 },
  //           { method: 'popup', minutes: 10 }
  //         ]
  //       }
  //     };

  //     const googleEventResponse = await calendar.events.insert({
  //       calendarId: 'primary',
  //       resource: event
  //     });

  //     return res.status(201).json({ reservaResponse, googleEventId: googleEventResponse.data.id });
  //   } catch (error) {
  //     console.error('Error en createReserva:', error);
  //     return res.status(500).json({ message: "Error al crear la reserva o el evento en Google Calendar", error: error.message });
  //   }
  // }
  createReserva: async (req, res) => {
    try {
      validarDatosEntrada(req);

      const { usuario_dni, service_id, start_datetime, end_datetime, cantidadPersonas, nombreReserva, nombreUsuario } = req.body;
      if (await verificarSolapamiento(service_id, start_datetime, end_datetime)) {
        return res.status(400).json({ message: "El horario ya está reservado." });
      }

      const newOrder = { usuario_dni, service_id, start_datetime, end_datetime, status: 'pending', cantidadPersonas, nombreReserva, nombreUsuario };
      console.log('Orden Creada: '+ newOrder)
      const reserva = await crearReservaDB(newOrder);
      console.log('Reserva creada en la BD')

      const user = await obtenerTokensGoogle(usuario_dni);
      console.log('Usuario Encontrado: '+ user)
      const oauth2Client = configurarClienteOAuth2(user);
      console.log('Configurado auth client')
      const eventDetails = prepararDetallesEvento(reserva, nombreReserva, nombreUsuario, start_datetime, end_datetime, user);
      console.log('Eventos de Google preparados:' + eventDetails)
      const googleEventId = await crearEventoGoogleCalendar(oauth2Client, eventDetails);

      return res.status(201).json({ reserva, googleEventId });
    } catch (error) {
      console.error('Error en createReserva:', error);
      return res.status(500).json({ message: "Error al crear la reserva o el evento en Google Calendar", error: error.message });
    }
  }
  ,
  getReservas: async (req, res) => {
    const userId = req.session.user.userId
    try {
      const reservas = await Order.findAll({
        where: {
          usuario_dni: userId
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['nombre']
          },
          {
            model: Service,
            as: 'service',
            attributes: ['nombre']
          }
        ]
      });

      // Transformar las reservas para el frontend
      const reservasTransformadas = reservas.map(reserva => ({
        id: reserva.id,
        title: `${reserva.service.nombre} - ${reserva.user.nombre}`,
        start: reserva.start_datetime,
        end: reserva.end_datetime,
        cantidadPersonas: reserva.cantidadPersonas,
        nombreUsuario: reserva.nombreUsuario,
        nombreReserva: reserva.nombreReserva

      }));

      return res.status(200).json(reservasTransformadas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener las reservas", error });
    }
  },
  checkUserReservation: async (req, res) => {
    console.log(req.session)
    try {

      const { serviceId } = req.query;
      const userId = req.session.user.userId

      const reservation = await Order.findOne({
        where: {
          usuario_dni: userId,
          service_id: serviceId
        }
      });

      console.log(reservation)

      const hasReserved = reservation !== null;



      return res.status(200).json({ hasReserved });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al verificar la reserva", error });
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

function validarDatosEntrada(req) {
  // Validación de los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error({ errors: errors.array() });
  }
}

async function verificarSolapamiento(service_id, start_datetime, end_datetime) {
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
  return overlappingOrder;
}

async function crearReservaDB(newOrder) {
  // Crear la reserva en la base de datos
  const reserva = await Order.create(newOrder);
  return reserva;
}


async function obtenerTokensGoogle(usuario_dni) {
  // Obtener los tokens de Google del usuario
  const user = await User.findOne({ where: { id: usuario_dni } });
  if (!user || !user.googleAccessToken || !user.googleRefreshToken) {
    throw new Error('No se pudo obtener los tokens de Google del usuario');
  }
  return user;
}

function configurarClienteOAuth2(user) {
  // Configurar cliente OAuth2 de Google
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken
  });
  return oauth2Client;
}


async function crearEventoGoogleCalendar(oauth2Client, reservaDetails) {
  console.log('Reserva Details: ', reservaDetails);
  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: reservaDetails, 
    });

    console.log("Evento creado:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error al crear el evento en Google Calendar:", error);
    throw error;
  }
}



function prepararDetallesEvento(reserva, nombreReserva, nombreUsuario, start_datetime, end_datetime, user) {
 
  const event = {
      summary: nombreReserva,
      description: `Reserva para ${nombreUsuario}.`,
      start: {
          dateTime: start_datetime,
          timeZone: 'America/Argentina/Buenos_Aires'
      },
      end: {
          dateTime: end_datetime,
          timeZone: 'America/Argentina/Buenos_Aires'
      },
      attendees: [{ email: user.email }],
      reminders: {
          useDefault: false,
          overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 }
          ]
      }
  };

  console.log(event)

  return event;
}


