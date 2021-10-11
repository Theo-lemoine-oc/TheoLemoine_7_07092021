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
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        })
};