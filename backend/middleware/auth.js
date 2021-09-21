const jwt = require('jsonwebtoken');

//Vérification du Token de l'utilisateur pour voir s'il correspond à l'id du user

module.exports = (req, res, next) => {
    try {
        //récupération du token dans le header de la requête d'autorisation
        const token = req.headers.authorization.split(' ')[1];
        //vérifie le token décodé avec la clé secrète initiée avec la création du token encodé initialement, on vérifie que les clés correspondent
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        //vérification que l'userId envoyé dans la requête correspond bien au userId encodé dans le token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};