'use strict'
const base = require('../bin/base/repositoryBase');
const _base = new base('users');
const connection = require('../database/connection');

module.exports = {
    async create(data){
        return await _base.create(data);
    },
    async update(id, data){
        return await _base.update(id, data);
    },
    async delete(id){
        return await _base.delete(id);
    },
    async list(){
        return await _base.list();
    },
    async listById(id){
        return await _base.listById(id);
    },
    async listByName(name){
        return await connection('users').where('name', name).select('*').first();
    },
}