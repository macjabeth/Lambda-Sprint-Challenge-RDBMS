
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
      table.integer('project_id').unsigned().references('projects.id')
        .onDelete('CASCADE'); // Maybe? If I delete a project, the actions should be deleted too...
      table.string('description').notNullable();
      table.string('notes');
      table.boolean('completed').defaultTo(false);
    })
    .createTable('contexts', (table) => {
      table.increments();
      table.string('description').notNullable();
    })
    .createTable('action_context', (table) => {
      table.integer('action_id').unsigned().references('actions.id');
      table.integer('context_id').unsigned().references('contexts.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('action_context')
    .dropTableIfExists('contexts')
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
