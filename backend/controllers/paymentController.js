const mercadoPago = require('mercadopago')
const { User, Service, ServiceImage, Category, Comment, Region, Order, Favorite } = require('../database/models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const Stripe = require('stripe');
const stripe = new Stripe('tu_clave_secreta_de_stripe');
const { paypalClient } = require('../public/js/paypalCllient'); 
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');


const paymentController = {
    mercadoPago: async (req, res) => {

        const producto = req.body;

        try {
            const preference = {
                items: [{
                    title: producto.nombre,
                    unit_price: producto.precio,
                    currency_id: "USD",
                    quantity: 1,
                }],
                back_urls: {
                    success: `http://localhost:3000/reserva/${producto.id}`,
                    failure: `http://localhost:3000/reserva/${producto.id}`,
                },

                auto_return: "approved",
            };

            const respuesta = await mercadoPago.preferences.create(preference);
            res.status(200).json(respuesta.response.init_point);
        } catch (error) {
            console.error(error.message);
            res.status(500).json(error.message);
        }
    },
    stripe: async (req, res) => {
        try {
            const { producto } = req.body; // Asegúrate de que tu cliente envíe la información necesaria

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: producto.nombre,
                        },
                        unit_amount: producto.precio * 100,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `http://localhost:3000/success/${producto.id}`,
                cancel_url: `http://localhost:3000/cancel/${producto.id}`,
            });

            res.status(200).json({ url: session.url });
        } catch (error) {
            console.error('Error con Stripe:', error);
            res.status(500).json({ message: error.message });
        }
    },
    createPaypalTransaction: async (req, res) => {
        let request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '100.00' // Ajusta el monto según tu lógica de negocio
                }
            }]
        });

        try {
            const order = await paypalClient().execute(request);
            res.status(200).json({ id: order.result.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    capturePaypalTransaction: async (req, res) => {
        const orderId = req.body.orderID;

        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        try {
            const capture = await paypalClient().execute(request);
            const captureId = capture.result.purchase_units[0].payments.captures[0].id;
            res.status(200).json({ captureId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

};

module.exports = paymentController;
