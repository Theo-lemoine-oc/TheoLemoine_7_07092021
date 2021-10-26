const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

//signup
exports.signup = (req, res, next) => {
    //params
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;

    //checks that all the information has been entered
    if (email == null || firstName == null || lastName == null || password == null) {
        res.status(400).json({ error: 'missing parameters' })
    }

    if (EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password)) {
        //check if user does not already exist
        models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function(err, bcryptPassword) {
                        //create user
                        const newUser = models.User.create({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                password: bcryptPassword,
                                isAdmin: false
                            })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                } else {
                    res.status(409).json({ error: 'user already exists' })
                }
            })
            .catch(err => { res.status(500).json({ err }) })
    } else {
        console.log('email or password incorrect')
    }
};


//login
exports.login = (req, res, next) => {
    //parems
    let email = req.body.email;
    let password = req.body.password;

    //checks that all the information has been entered
    if (email == null || password == null) {
        res.status(400).json({ error: 'missing parameters' })
    }
    //check if user exists
    models.User.findOne({
            where: { email: email }
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: jwtUtils.generateTokenForUser(user),
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'user does not exist' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};

//recover a account
exports.getUserProfile = (req, res, next) => {
    let id = jwtUtils.getUserId(req.headers.authorization)
    models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
            where: { id: id }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};


//update account
exports.changePassword = (req, res) => {
    //get the user ID and the new password
    let userId = jwtUtils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)

    //if the new password is valid
    if (verifInput.validPassword(newPassword)) {
        //check it is different from the old one
        models.User.findOne({
                where: { id: userId }
            })
            .then(user => {
                console.log('user trouvé', user)
                bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt returns resComparePassword if the passwords are identical
                    if (resComparePassword) {
                        res.status(406).json({ error: 'same password' })
                    } else {
                        bcrypt.hash(newPassword, 10, function(err, bcryptNewPassword) {
                            models.User.update({ password: bcryptNewPassword }, { where: { id: user.id } })
                                .then(() => res.status(201).json({ confirmation: 'password changed successfully' }))
                                .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'invalid password' })
    }
}


//delete account
exports.deleteProfile = (req, res) => {
    //user id retrieval
    let userId = jwtUtils.getUserId(req.headers.authorization);

    if (userId != null) {
        //verify that the user exists
        models.User.findOne({
                where: { id: userId }
            })
            .then(user => {
                if (user != null) {
                    //delete all the user's posts
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('all posts have been deleted');
                            //delete user
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(401).json({ error: 'user does not exist' })
                }
            })
    } else {
        res.status(500).json({ error: 'cannot delete this account' })
    }
}