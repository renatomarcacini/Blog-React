'use strict'
module.exports = {
    async get(repository, req, res) {
        try {
            const result = await repository.list();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async getById(repository, req, res) {
        try {
            const result = await repository.listById(req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            console.info(err);
            return res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async post(repository, req, res) {
        try {
            const [id] = await repository.create(req.body);
            return res.status(200).json(id);
        } catch (err) {
            console.info(err);
            return res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async put(repository, req, res) {
        try {
            const result = await repository.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (err) {
            console.info(err);
            return res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
    async delete(repository, req, res) {
        try {
            const result = await repository.delete(req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            console.info(err);
            return res.status(400).json({ message: `Error processing: ${err}` });
        }
    },
}