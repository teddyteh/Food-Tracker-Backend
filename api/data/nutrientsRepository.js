var db = require('../models');

var NutrientsRepository = {
    findById: function (id) {
        return db.Nutrient.find({
            where: {
                id: id
            }
        });
    },

    findAll: function () {
        return db.Nutrient.findAll();
    },

    addNutrient: function (name, amount) {
        return db.Nutrient.create({
            name: name,
            amount: amount
        });
    }
}

module.exports = NutrientsRepository;