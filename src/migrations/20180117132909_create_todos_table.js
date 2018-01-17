/**
 * Create todo table.
 *
 * @param  {object} knex
 * @return {Promise}
 */

export function up(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('task').notNull();
    table.string('details').notNull();
    table.integer('user_id')
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
  return knex.schema.dropTable('todo');
}
