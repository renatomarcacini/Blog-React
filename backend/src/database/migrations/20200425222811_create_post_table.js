
exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments()
        table.string('title').notNullable();
        table.string('title_page').notNullable();
        table.string('short_text').notNullable();
        table.string('text').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('category_id').unsigned().notNullable();
        table.foreign('category_id').references('categories.id').onUpdate('cascade').onDelete('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
