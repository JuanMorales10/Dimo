const { google } = require('googleapis');

const googleCalendarService = {
  // Inicializa el cliente de Google API
  initGoogleApi: function(credentials, accessToken) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]
    );

    // Configurar el token
    oAuth2Client.setCredentials(accessToken);

    return oAuth2Client;
  },


  // Crea un evento en el calendario
  createEvent: async function(auth, eventDetails) {
    const calendar = google.calendar({version: 'v3', auth});
    try {
      const event = await calendar.events.insert({
        calendarId: 'primary',
        resource: eventDetails,
      });
      console.log('Event created: %s', event.htmlLink);
      return event.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
};

module.exports = googleCalendarService;

