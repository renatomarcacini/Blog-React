'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');
const { celebrate, Joi, Segments } = require('celebrate');
const authentication = require('../middlewares/authentication');

router.get('/', controller.get);

router.get('/:id', authentication, celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.getById);

router.get('/title/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), controller.getByTitlePage);

router.post('/', authentication, celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(250),
        title_page: Joi.string().required().max(250),
        short_text: Joi.string().required(),
        text: Joi.string().required(),
        user_id: Joi.number().required(),
        category_id: Joi.number().required()
    }),
}), controller.post);

router.put('/:id', authentication, celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    }),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().max(250),
        title_page: Joi.string().required().max(250),
        short_text: Joi.string().required(),
        text: Joi.string().required(),
        user_id: Joi.number().required(),
        category_id: Joi.number().required()
    }),
}), controller.put);

router.delete('/:id', authentication, celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.required()
    })
}), controller.delete);

module.exports = router;