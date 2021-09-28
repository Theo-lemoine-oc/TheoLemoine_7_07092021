const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const cryptJs = require('crypto-js');

const User = require('../database/user');
const models = require('../models');

//Inscription
exports.signup = (req, res, next) => {
    var email = req.body.email;
    var name = req.body.name;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || name == null || lastname == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newUser = models.User.create({
                            email: email,
                            name: name,
                            lastname: lastname,
                            password: bcryptedPassword,
                            bio: bio,
                            isAdmin: 0
                        })
                        .then(function(newUser) {
                            return res.status(201).json({
                                'userId': newUser.id
                            })
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'cannot add user' });
                        })
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist !' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
};

//Connexion
exports.login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || name == null || lastname == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'invalid password' });
                    }
                })
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }

        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        })
};