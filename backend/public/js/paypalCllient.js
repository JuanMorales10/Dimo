const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
require('dotenv').config();

function environment() {
    let clientId = process.env.PAYPAL_API_CLIENT;
    let clientSecret = process.env.PAYPAL_API_SECRET;

    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function paypalClient() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { paypalClient };
