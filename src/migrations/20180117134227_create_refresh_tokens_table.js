export function up(knex) {
  return knex.schema.createTable('tokens', table => {
    table.increments('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('token').notNull();
    table
      .integer('user_id')
      .unique()
      .notNull();
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tokens');
}
