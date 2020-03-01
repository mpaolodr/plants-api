const bc = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "test",
      password: bc.hashSync("test", 10),
      phone_number: "(000)000-000-000"
    },
    {
      username: "demo",
      password: bc.hashSync("demo", 10),
      phone_number: "(111)111-111-111"
    },
    {
      username: "marlon",
      password: bc.hashSync("demo_marlon", 10),
      phone_number: "(222)222-222-222"
    }
  ]);
};
