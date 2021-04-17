exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table){
        table.increments()
        table.string('name').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
