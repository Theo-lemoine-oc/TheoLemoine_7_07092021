const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require("fs");


//create message
exports.createMessage = (req, res, next) => {
    //image url declaration
    let attachmentURL;

    //identify who created the message
    let id = jwtUtils.getUserId(req.headers.authorization);
    models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName'],
            where: { id: id }
        })
        .then(user => {
            if (user !== null) {
                //message recovery
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                } else {
                    attachmentURL == null
                };
                if ((content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'message content is empty' })
                } else {
                    models.Message.create({
                            content: content,
                            attachment: attachmentURL,
                            UserId: user.id
                        })
                        .then((newMessage) => {
                            res.status(201).json(newMessage);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json(error)
        });
}

//list messages
exports.listMessages = (req, res, next) => {
    models.Message.findAll({
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName']
            }],
            //sort messages from newest to oldest
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => res.status(500).json(err))
}

//deleting a message
exports.deleteMessage = (req, res) => {
    let userOrder = req.body.userIdOrder;

    //user identification
    let id = jwtUtils.getUserId(req.headers.authorization)
    models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
            where: { id: id }
        })
        .then(user => {
            //checking that the user is either the admin or the message owner
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                models.Message
                    .findOne({
                        where: { id: req.body.messageId }
                    })
                    .then((messageFind) => {

                        if (messagetFind.attachment) {
                            const filename = messageFind.attachment.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                                models.Message
                                    .destroy({
                                        where: { id: messageFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        } else {
                            models.Message
                                .destroy({
                                    where: { id: messageFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('not authorized to delete this message') }
        })
        .catch(error => res.status(500).json(error));
};


//message modification
exports.updateMessage = (req, res) => {
    //retrieving user id for verification
    let userOrder = req.body.userIdOrder;

    //user identification
    let id = jwtUtils.getUserId(req.headers.authorization);
    models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
            where: { id: id }
        })
        .then(user => {
            //checking that the user is either the admin or the message owner
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                models.Message
                    .update({
                        content: req.body.newText,
                        attachment: req.body.newImg
                    }, { where: { id: req.body.messageId } })
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            } else {
                res.status(403).json({ error: 'not authorized to edit this message' })
            }
        })
        .catch(error => res.status(500).json(error));
}