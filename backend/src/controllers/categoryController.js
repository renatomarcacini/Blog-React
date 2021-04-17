'use strict'
const controller = require('../bin/base/controllerBase');
const repository = require('../repositories/categoryRepository');

module.exports = {
    async get(req, res){
        controller.get(repository, req, res);
    },
    async getById(req, res){
        controller.getById(repository, req, res);
    },
    async post(req, res){
        controller.post(repository, req, res);
    },
    async put(req, res){
        controller.put(repository, req, res);
    },
    async delete(req, res){
        controller.delete(repository, req, res);
    },
}
