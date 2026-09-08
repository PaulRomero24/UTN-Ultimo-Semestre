const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");

// Configuración con tu Access Token de prueba
mercadopago.configure({
    access_token: "TEST-2966283894664645-090815-46525c50734ef050fbbbd94227b6c3e2-179121138",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../cliente")));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "..", "cliente", "index.html"));
});

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            success: "http://localhost:8080/feedback",
            failure: "http://localhost:8080/feedback",
            pending: "http://localhost:8080/feedback", // Asignada URL válida para evitar el error 400
        },
		
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        })
        .catch(function (error) {
            console.error("Error en Mercado Pago:", error);
            // Responde siempre al frontend para no dejar la petición colgada
            res.status(500).json({ error: error.message });
        });
});

app.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

app.listen(8080, () => {
    console.log("The server is now running on Port 8080");
});