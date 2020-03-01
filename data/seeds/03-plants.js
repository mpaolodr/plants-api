exports.seed = function(knex) {
  return knex("plants").insert([
    {
      nickname: "money maker",
      species_name: "pilea",
      user_id: 1,
      h2o_frequency: "twice a day",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/618qjKv5aoL._AC_SX355_.jpg"
    },
    {
      nickname: "morris",
      species_name: "malvaceae",
      user_id: 2,
      h2o_frequency: "once a week",
      image:
        "https://cdn.webshopapp.com/shops/30495/files/265777268/pachira-aquatica-p-24-cm.jpg"
    },
    {
      nickname: "fig newton",
      species_name: "fig trees",
      user_id: 3,
      h2o_frequency: "once a week",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/61POinrSaZL._AC_SL1048_.jpg"
    },
    {
      nickname: "fernie",
      species_name: "asparagaceae",
      user_id: 3,
      h2o_frequency: "never",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71NP3gTJmeL._SX425_.jpg"
    },
    {
      nickname: "make it evergreen",
      species_name: "araceae",
      user_id: 1,
      h2o_frequency: "once a day",
      image: null
    },
    {
      nickname: "loudy",
      species_name: "asparagaceae",
      user_id: 2,
      h2o_frequency: "three times a day",
      image: null
    },
    {
      nickname: "yuucci",
      species_name: "asparagaceae",
      user_id: 1,
      h2o_frequency: "once a week",
      image: null
    },
    {
      nickname: "red hot",
      species_name: "aloe",
      user_id: 2,
      h2o_frequency: "twice a month",
      image: null
    },
    {
      nickname: "finnie",
      species_name: "aloe",
      user_id: 1,
      h2o_frequency: "never",
      image: null
    },
    {
      nickname: "millete",
      species_name: "fabaceae",
      user_id: 1,
      h2o_frequency: "three times a day",
      image: null
    },
    {
      nickname: "kudzu",
      species_name: "fabaceae",
      user_id: 1,
      h2o_frequency: "twice a week",
      image: null
    },
    {
      nickname: "marsh",
      species_name: "malvaceae",
      user_id: 1,
      h2o_frequency: "never",
      image: null
    },
    {
      nickname: "bob",
      species_name: "araceae",
      user_id: 2,
      h2o_frequency: "three times a day",
      image:
        "https://i.etsystatic.com/15265690/r/il/9c7e6c/1211862072/il_570xN.1211862072_3kuo.jpg"
    },
    {
      nickname: "ana",
      species_name: "araceae",
      user_id: 2,
      h2o_frequency: "three times a day",
      image: "https://images-na.ssl-images-amazon.com/images/I/51dYV4SY-AL.jpg"
    },
    {
      nickname: "pretentious",
      species_name: "pilea",
      user_id: 2,
      h2o_frequency: "let it die",
      image: null
    },
    {
      nickname:
        "to be deleted anyway so why bother thinking hard for the nickname",
      species_name: "pilea",
      user_id: 3,
      h2o_frequency: "let it die slowly",
      image: null
    }
  ]);
};
