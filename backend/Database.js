const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_LANG
});

sequelize
    .authenticate()
    .then(() => {
        console.log("La connexion a bien été établié !");
    })
    .catch(error => {
        console.error("Impossible de se connecter à la base de données ! ", error);
    });

module.exports = sequelize;
global.sequelize = sequelize;