
exports.seed = function (knex, Promise) {
  return knex('action_context').insert([
    { action_id: 1, context_id: 1 },
    { action_id: 1, context_id: 3 },
    { action_id: 1, context_id: 4 },
    { action_id: 2, context_id: 1 },
    { action_id: 2, context_id: 3 },
    { action_id: 2, context_id: 4 }
  ]);
};
