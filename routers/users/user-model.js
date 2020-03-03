const db = require("../../data/db-config.js");

function getPlants(id) {
  return db("plants as p")
    .join("users as u", "p.user_id", "u.id")
    .join("species as s", "p.species_name", "s.name")
    .select(
      "p.id",
      "p.nickname",
      "p.h2o_frequency as frequency",
      "p.image",
      "p.species_name"
    )
    .where({ "p.user_id": id });
}
// return user data upon login and i don't want to return the password
function getUserById(id) {
  return db("users")
    .select("username", "phone_number")
    .where({ id })
    .first();
}

// just for editing
function getUserWithPassword(id) {
  return db("users")
    .where({ id })
    .first();
}
function updateUser(userData, id) {
  return db("users")
    .where({ id })
    .update(userData)
    .then(user => {
      return db("users")
        .where({ id })
        .first();
    });
}

function getPlantById(plantid) {
  return db("plants")
    .where({ id: plantid })
    .first();
}

function addPlant(plantData) {
  return db("plants")
    .insert(plantData, "id")
    .then(ids => {
      const [id] = ids;
      return db("plants")
        .where({ id })
        .first()
        .then(obj => {
          return getPlants(obj.user_id);
        });
    });
}

function updatePlant(plantData, plantid) {
  return db("plants")
    .where({ id: plantid })
    .update(plantData)
    .then(success => {
      return getPlantById(plantid);
    });
}

function removePlant(plantid) {
  return db("plants")
    .where({ id: plantid })
    .del();
}

function getSpecies(filter) {
  return db("species")
    .where(filter)
    .first();
}

function addSpecies(species) {
  return db("species")
    .insert(species, "id")
    .then(ids => {
      const [id] = ids;
      return db("species")
        .where({ id })
        .first();
    });
}

module.exports = {
  getPlants,
  getUserById,
  getPlantById,
  removePlant,
  getSpecies,
  addSpecies,
  addPlant,
  updatePlant,
  getUserWithPassword,
  updateUser
};
