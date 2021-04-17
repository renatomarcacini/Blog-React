'use strict'
const controller = require('../bin/base/controllerBase');
const repository = require('../repositories/postRepository');

module.exports = {
    async get(req, res) {
        let { page, category } = req.query;
        if (!page)
            page = 1;

        try {
            const content = await repository.listPaginated(page, category);

            let totalItems =  0;
            if(category)
                totalItems = (await repository.litByCategory(category)).length;
            else
                totalItems = (await repository.list(category)).length;

            let pageTotal = totalItems;
            if (pageTotal % 5 !== 0) {
                pageTotal = parseInt(pageTotal / 5) + 1;
            }
            else {
                pageTotal = parseInt(pageTotal / 5);
            }

            res.status(200).json({ content, page, pageTotal, totalItems });
            return;
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async getById(req, res) {
        controller.getById(repository, req, res);
    },
    async getByTitlePage(req, res) {
        const { id } = req.params;
        try {
            const content = await repository.listByTittlePage(id);
            res.status(200).json(content);
        } catch (err) {
            console.info(err);
            res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async post(req, res) {
        controller.post(repository, req, res);
    },
    async put(req, res) {
        controller.put(repository, req, res);
    },
    async delete(req, res) {
        controller.delete(repository, req, res);
    },
}
