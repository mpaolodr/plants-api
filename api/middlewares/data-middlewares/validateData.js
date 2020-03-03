const Users = require("../../../routers/users/user-model.js");

// for image uploads
const { dataUri } = require("../multer.js");
const { uploader } = require("../../config/cloud-config.js");

const validateSpecies = async (req, res, next) => {
  const plantData = req.body;

  // check if species is provided
  if (plantData.species_name) {
    let species = plantData.species_name.toLowerCase();
    // check if species already exists in database
    try {
      const exists = await Users.getSpecies({ name: species });
      if (exists) {
        plantData.species_name = exists.name;
        next();
      } else {
        // add species to database if it doesn't exist
        try {
          const addedSpecie = await Users.addSpecies({
            name: plantData.species_name
          });
          plantData.species_name = addedSpecie.name;
          next();
        } catch (err) {
          res.status(500).json({ error: "Problem processing request" });
        }
      }
    } catch (err) {
      res.status(500).json({ error: "Specie not found" });
    }
  } else {
    plantData.species_name = "default";
    next();
  }
};

const validateRequired = (req, res, next) => {
  const plantData = req.body;

  if (plantData.nickname && plantData.h2o_frequency) {
    next();
  } else {
    res.status(400).json({ error: "Please provide required fields" });
  }
};

const validateId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await Users.getUserById(id);
    if (user) {
      next();
    } else {
      res.status(500).json({ error: "User not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Invalid User Id!" });
  }
};

const validateImage = async (req, res, next) => {
  const plantData = req.body;

  if (req.file) {
    const file = dataUri(req).content;

    return uploader
      .upload(file)
      .then(result => {
        plantData.image = result.url;
        next();
      })
      .catch(err => {
        plantData.image = null;
        next();
      });
  } else {
    plantData.image = null;
    next();
  }
};

module.exports = {
  validateImage,
  validateId,
  validateRequired,
  validateSpecies
};

// const plantData = req.body;

//     if(plantData.nickname && plantData.h2o_frequency ) {
//         // check if species is provided
//         if(plantData.species) {
//             let species = plantData.species_name.toLowerCase();
//             // check if species already exists in database
//             try {
//                 const exists = await Users.getSpecies({name: species});

//                 if(exists) {

//                 } else {
//                     // add species to database if it doesn't exist
//                     try {
//                         const addedSpecie = await Users.addSpecies(exists);
//                         res.status(201).json(addedSpecie);
//                     } catch(err) {
//                         res.status(500).json({error: "Problem processing request"})
//                     }
//                 }
//             }catch(err) {
//                 res.status(500).json({error: "Specie not found"})
//             }

//         } else {
//             plantData.species_name = "default";

//         }

//     } else {
//         res.status(400).json({error: "Please provide nickname and frequency"})
//     }
