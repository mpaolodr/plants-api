exports.seed = function(knex) {
  return knex("species").insert([
    { name: "asparagaceae" },
    { name: "aloe" },
    { name: "fabaceae" },
    { name: "malvaceae" },
    { name: "pilea" },
    { name: "fig trees" },
    { name: "araceae" },
    { name: "default" }
  ]);
};
