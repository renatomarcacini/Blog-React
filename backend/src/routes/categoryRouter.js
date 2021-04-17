'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const { celebrate, Joi, Segments } = require('celebrate');

router.get('/', controller.get);

router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.getById);

router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(250)
    }),
}), controller.post);

router.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(250)
    })
}), controller.put);

router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.delete);

module.exports = router;