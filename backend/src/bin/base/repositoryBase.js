'use strict'
const connection = require('../../database/connection');
class RepositoryBase {

    constructor(model) {
        this._model = model;
    }

    async create(model) {
        return await connection(this._model).insert(model);
    }
    async update(id, model) {
        return await connection(this._model).where('id', id).update(model);
    }
    async list() {
        return await connection(this._model).select('*');
    }
    async listById(id) {
        return await connection(this._model).where('id', id).select('*').first();
    }
    async delete(id) {
        return await connection(this._model).where('id', id).del();
    }
}

module.exports = RepositoryBase;
