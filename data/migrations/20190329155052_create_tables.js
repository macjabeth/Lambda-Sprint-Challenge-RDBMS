
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.boolean('completed').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('actions', (table) => {
      table.increments();
      table.integer('project_id').unsigned().references('projects.id');
      table.string('description').notNullable();
      table.string('notes');
      table.boolean('completed').defaultTo(false);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
