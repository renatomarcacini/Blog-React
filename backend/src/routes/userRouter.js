'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { celebrate, Joi, Segments } = require('celebrate');
const authentication = require('../middlewares/authentication');

router.get('/', controller.get);

router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.getById);

router.get('/author/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), controller.getByName);

router.post('/', authentication, celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(250),
        email: Joi.string().required().max(250),
        photo: Joi.string().required(),
        password: Joi.string().required().max(250),
        about: Joi.string().required(),
    }),
}), controller.post);

router.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().max(250),
        password: Joi.string().required().max(250)
    }),
}), controller.authenticate);

router.put('/:id', authentication, celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(250),
        email: Joi.string().required().max(250),
        photo: Joi.string().required(),
        password: Joi.string().max(250),
        about: Joi.string().required(),
    })
}), controller.put);

router.delete('/:id', authentication, celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.delete);

module.exports = router;