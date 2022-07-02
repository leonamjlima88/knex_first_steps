const { onUpdateTrigger } = require('../../../knexfile');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async knex => knex.schema.createTable(
  'projects', 
  table => {
    table.increments('id');
    table.text('title');

    // relacionamento
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    table.timestamps(true, true);
  }
).then(() => knex.raw(onUpdateTrigger('projects')));

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => knex.schema.dropTable(
  'projects'
);