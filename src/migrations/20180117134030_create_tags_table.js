export function up(knex) {
  return knex.schema.createTable('tags', table => {
    table.increments('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('tag').notNull();
  });
}

export function down(knex) {
  return knex.schema.dropTable('tags');
}
