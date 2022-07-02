/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = knex => knex.schema.alterTable(
  'users', 
  table => {
    table.timestamp('deleted_at');
  }
);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.alterTable(
  'users',
  table => {
    table.dropColumn('deleted_at');
  }
);