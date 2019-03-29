
exports.seed = function (knex, Promise) {
  return knex('actions').insert([
    { description: 'Complete MVP', project_id: 1, notes: 'Focus on this first!' },
    { description: 'Complete Stretch', project_id: 1, notes: "Only work on this after you've completed MVP." }
  ]);
};
