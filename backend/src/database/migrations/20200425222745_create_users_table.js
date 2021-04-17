
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments()
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('photo').notNullable();
        table.string('password').notNullable();
        table.string('about').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
