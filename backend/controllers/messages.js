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
                //post recovery
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                } else {
                    attachmentURL == null
                };
                if ((content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'message content is empty' })
                } else {
                    models.Post.create({
                            content: content,
                            attachment: attachmentURL,
                            UserId: user.id
                        })
                        .then((newPost) => {
                            res.status(201).json(newPost);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
}

//list messages
exports.listMessages = (req, res, next) => {
    models.Post.findAll({
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName']
            }],
            //sort messages from newest to oldest
            order: [
                ['createdAt', 'ASC']
            ]
        })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'no post to display' })
            }
        })
        .catch(err => res.status(500).json(err))
}

//deleting a post
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
                models.Post
                    .findOne({
                        where: { id: req.body.postId }
                    })
                    .then((postFind) => {

                        if (postFind.attachment) {
                            const filename = postFind.attachment.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                                models.Post
                                    .destroy({
                                        where: { id: postFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        } else {
                            models.Post
                                .destroy({
                                    where: { id: postFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('not authorized to delete this post') }
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
                models.Post
                    .update({
                        content: req.body.newText,
                        attachment: req.body.newImg
                    }, { where: { id: req.body.postId } })
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            } else {
                res.status(401).json({ error: 'not authorized to edit this post' })
            }
        })
        .catch(error => res.status(500).json(error));
}