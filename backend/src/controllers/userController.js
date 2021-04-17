'use strict'
const controller = require('../bin/base/controllerBase');
const repository = require('../repositories/userRepository');
const connection = require('../database/connection');

const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables');

const md5 = require('md5');

module.exports = {
    async get(req, res) {
        try {
            const result = await connection('users')
                .select('id', 'name', 'email', 'photo','about');

            res.status(200).json(result);
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async getById(req, res) {
        try {
            const result = await connection('users')
                .where('id', req.params.id)
                .select('id', 'name', 'email', 'about', 'password');

            res.status(200).json(result);
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async getByName(req, res) {
        const { id } = req.params;
        try {
            const result = await repository.listByName(id);
            result.password = undefined;
            res.status(200).json(result);
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async post(req, res) {
        const { email, password } = req.body;
        try {
            const result = await connection('users').where('email', email).select('*');
            if (result.length > 0) {
                res.status(400).json({ message: `Email already in use` });
                return;
            }
        } catch (err) {
            res.status(400).json({ message: `Error processing: ${err}` });
            return;
        }
        req.body.password = md5(password);
        controller.post(repository, req, res);
    },
    async put(req, res) {
        const { password } = req.body;
        if(password){
            req.body.password = md5(password);
        }
        controller.put(repository, req, res);
    },
    async delete(req, res) {
        controller.delete(repository, req, res);
    },
    async authenticate(req, res) {
        let { email, password } = req.body;
        try {
            password = md5(password);
            const result = await connection('users').where({ email, password }).select('id', 'name', 'email');
            if (result.length > 0) {
                res.status(200).json({
                    user: result,
                    token: jwt.sign({ user: result }, variables.Security.secretKey, { expiresIn: '2h' })
                });
            }
            else {
                res.status(401).json({ message: `User or Password invalid` });

            }
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
}
