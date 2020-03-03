const router = require("express").Router();

// middlewares
const { multerUpload } = require("../../api/middlewares/multer.js");
const {
  validateId,
  validateSpecies,
  validateImage,
  validateRequired
} = require("../../api/middlewares/data-middlewares/validateData.js");

// models
const Users = require("./user-model.js");

// get user by id which will be passed on along with the token after login to give back user data
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.getUserById(id);
    const plants = await Users.getPlants(id);

    if (user) {
      res.status(200).json({
        ...user,
        plants
      });
    } else {
      res.status(500).json({ error: "Invalid User" });
    }
  } catch (err) {
    res.status(404).json({ error: "User not found!" });
  }
});

// get user plants
router.get("/:id/plants", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.getUserById(id);
    const plants = await Users.getPlants(id);

    if (user) {
      res.status(200).json(plants);
    } else {
      res.status(400).json({ error: "Invalid User" });
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

// get user plant by id
router.get("/:id/plants/:plantid", async (req, res) => {
  const { id, plantid } = req.params;
  try {
    const user = await Users.getUserById(id);
    const plant = await Users.getPlantById(plantid);

    if (user && plant) {
      res.status(200).json(plant);
    } else {
      res.status(404).json({ error: "User or Plant Id is invalid" });
    }
  } catch ({ name, message, error }) {
    res.status(500).json({ name, message, error });
  }
});

router.post(
  "/:id/plants",
  validateId,
  multerUpload,
  validateRequired,
  validateSpecies,
  validateImage,
  async (req, res) => {
    const { id } = req.params;
    const plantData = { ...req.body, user_id: id };

    try {
      const arr = await Users.addPlant(plantData);

      res.status(201).json(arr);
    } catch (err) {
      res.status(500).json({ error: "test" });
    }
  }
);

router.put(
  "/:id/plants/:plantid",
  validateId,
  multerUpload,
  validateRequired,
  validateSpecies,
  validateImage,
  async (req, res) => {
    const { _, plantid } = req.params;
    const plantData = req.body;

    try {
      const edited = await Users.updatePlant(plantData, plantid);
      res.status(200).json(edited);
    } catch (err) {
      res.status(500).json({ error: "Plant cannot be updated at this moment" });
    }
  }
);

// delete user plants
router.delete("/:id/plants/:plantid", async (req, res) => {
  const { id, plantid } = req.params;

  try {
    const user = await Users.getUserById(id);
    const plant = await Users.getPlantById(plantid);
    if (user && plant) {
      try {
        const deletedPlant = await Users.removePlant(plantid);

        res.status(200).json(plant);
      } catch (err) {
        res
          .status(500)
          .json({ error: "Request can't be processed at this moment" });
      }
    } else {
      if (!user) {
        res.status(500).json({ error: "Invalid User" });
      } else {
        res.status(500).json({ error: "Plant not found!" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: "User not found!" });
  }
});

module.exports = router;
