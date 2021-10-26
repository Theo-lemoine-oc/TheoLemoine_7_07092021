const express = require('express');
const path = require('path');

const helmet = require('helmet');
const nocache = require('nocache');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

//Utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données grâce à une variable d'environnement
require('dotenv').config();

//Création de l'application Express
const app = express();

//CORS
app.use(cors());

//Ajouter une limite de requêtes par @IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Vous avez réalisé trop de requêtes !"
})

//Remplacer le body-parser : transforme les données arrivant à la requête POST en objet JSON facilement exploitable
app.use(express.json());

//Sécuriser Express en définissant divers en-têtes HTTP
app.use(helmet());

//Désactiver la mise en cache du navigateur
app.use(nocache());

//Images
app.use("./images", express.static(path.join(__dirname, "images")));

//Ajouter notre limite de requêtes par @IP
app.use('/api', limiter);

//Permettre de se protéger contre les attaques XSS
app.use(xssClean());

//Routes
app.use('/api/auth', userRoutes);
app.use('/api/message/', messageRoutes);

//Export de l'application Express pour déclaration dans le server.js
module.exports = app;