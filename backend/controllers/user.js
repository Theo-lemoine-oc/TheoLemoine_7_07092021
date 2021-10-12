const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

const User = require('../models');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

//Inscription
exports.signup = (req, res, next) => {
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || firstName == null || lastName == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    //max length firstname
    if (firstName.length > 13 || firstName.length < 3) {
        return res.status(400).json({ 'error': 'wrong firstname (must be length 3 - 13' });
    }
    //max length lastname
    if (lastName.length > 24 || lastName.length < 3) {
        return res.status(400).json({ 'error': 'wrong lastname (must be length 3 - 24' });
    }
    //regex for valid the email
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }
    //regex for valid the password
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'password invalid (must length 8 - 16 and include 1 uppercase, 1 lowercase and 1 number' });
    }

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function(userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' })
            }
        },
        function(userFound, bcryptedPassword, done) {
            var newUser = mdels.User.create({
                    email: email,
                    firstName: firstName,
                    lastName: firstName,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
        }
    ], function(newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
};


//Connexion
exports.login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function(userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        },
        function(userFound, resBycrypt, done) {
            if (resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'invalid password' });
            }
        }
    ], function(userFound) {
        if (userFound) {
            return res.status(201).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
        }
    });
};

//Récupérer un profil
exports.getUserProfile = (req, res, next) => {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token' });

    models.User.findOne({
        attributes: ['id', 'email', 'firstName', 'lastName', 'bio'],
        where: { id: userId }
    }).then(function(user) {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
    }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
    });
};

//Modification d'un profil
exports.updateUserProfile = (req, res, next) => {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    // Params
    var bio = req.body.bio;

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                    attributes: ['id', 'bio'],
                    where: { id: userId }
                }).then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function(userFound, done) {
            if (userFound) {
                userFound.update({
                    bio: (bio ? bio : userFound.bio)
                }).then(function() {
                    done(userFound);
                }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot update user' });
                });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },
    ], function(userFound) {
        if (userFound) {
            return res.status(201).json(userFound);
        } else {
            return res.status(500).json({ 'error': 'cannot update user profile' });
        }
    });
};