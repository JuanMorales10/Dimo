const { google } = require('googleapis');
const axios = require('axios');

const googleAuth = {
  getClient: function(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]
    );
    // Aquí podrías configurar el token si ya lo tienes guardado
    // oAuth2Client.setCredentials({ access_token, refresh_token });
    return oAuth2Client;
  },

  getAuthUrl: function(oAuth2Client) {
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    return oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
  },

  exchangeCodeForToken: async function(code, oAuth2Client) {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      // Guardar tokens para su uso posterior
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }
};

module.exports = googleAuth;
