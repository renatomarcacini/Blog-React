'use strict'
const base = require('../bin/base/repositoryBase');
const _base = new base('posts');

const connection = require('../database/connection');

module.exports = {
    async create(data) {
        return await _base.create(data);
    },
    async update(id, data) {
        return await _base.update(id, data);
    },
    async delete(id) {
        return await _base.delete(id);
    },
    async list() {
        return await connection('posts').select('*');
    },
    async listPaginated(page, category) {
        if (page && category) {
            return await connection('posts')
                .join('categories', 'categories.id', '=', 'posts.category_id')
                .join('users', 'users.id', '=', 'posts.user_id')
                .where('categories.name', category)
                .limit(5)
                .offset((page - 1) * 5)
                .orderBy('created_at','desc')
                .select([
                    'posts.*',
                    'categories.name as category',
                    'users.name as author'
                ]);
        }
        else {
            return await connection('posts')
                .join('categories', 'categories.id', '=', 'posts.category_id')
                .join('users', 'users.id', '=', 'posts.user_id')
                .limit(5)
                .offset((page - 1) * 5)
                .orderBy('created_at','desc')
                .select([
                    'posts.*',
                    'categories.name as category',
                    'users.name as author'
                ]);
        }

    },
    async listById(id) {
        return await _base.listById(id);
    },
    async litByCategory(category='') {
        return await connection('posts')
            .join('categories', 'categories.id', '=', 'posts.category_id')
            .join('users', 'users.id', '=', 'posts.user_id')
            .where('categories.name', category)
            .orderBy('created_at','desc')
            .select([
                'posts.*',
                'categories.name as category',
                'users.name as author'
            ]);
    },
    async listByTittlePage(title_page='') {
        return await connection('posts')
            .join('categories', 'categories.id', '=', 'posts.category_id')
            .join('users', 'users.id', '=', 'posts.user_id')
            .where('title_page', title_page)
            .select([
                'posts.*',
                'categories.name as category',
                'users.name as author'
            ]).first();
    }
}