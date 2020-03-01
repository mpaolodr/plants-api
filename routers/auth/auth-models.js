const db = require("../../data/db-config.js");

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return db("users")
        .where({ id })
        .select("id", "username")
        .first();
    });
}

function getBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

module.exports = {
  add,
  getBy
};
