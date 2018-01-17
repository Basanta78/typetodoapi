export function up(knex) {
  return knex.schema.createTable('tags_todo', table => {
    table
      .integer('tag_id')
      .references('tags.id')
      .onDelete('CASCADE');
    table
      .integer('todo_id')
      .references('todo.id')
      .onDelete('CASCADE');
  });
}

export function down(knex) {
  return knex.schema
    .dropTable('tags_todo')
    .dropTable('tags')
    .dropTable('todo');
}
