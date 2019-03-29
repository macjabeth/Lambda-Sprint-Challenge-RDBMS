
exports.seed = function (knex, Promise) {
  return knex('contexts').insert([
    { description: 'at home' },
    { description: 'at work' },
    { description: 'at computer' },
    { description: 'online' },
  ]);
};
