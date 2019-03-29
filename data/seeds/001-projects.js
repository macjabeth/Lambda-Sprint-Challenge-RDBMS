
exports.seed = function (knex, Promise) {
  return knex('projects').insert([
    {
      name: "Complete WebDB Sprint Challenge",
      description: "This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project."
    }
  ]);
};
