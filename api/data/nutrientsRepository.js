var db = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var NutrientsRepository = {
    findById: function (id) {
        return db.Nutrient.find({
            where: {
                id: id
            }
        });
    },

    findByIds: function (ids) {
        console.log("[nutrientsRepo findByIds()] ids " + JSON.stringify(ids));

        return db.Nutrient.findAll({
            where: {
                $or: ids
            }
        })
    },

    findAll: function () {
        return db.Nutrient.findAll();
    },

    addNutrient: function (name, amount) {
        return db.Nutrient.create({
            name: name
        });
    },

    getNutrientIds: function (nutrients) {
        let mappedNutrients = [];

        for (let i = 0; i < nutrients.length; i++) {
            let item = {};
            item.id = nutrients[i].id;

            mappedNutrients.push(item);
        }

        return mappedNutrients;
    },

    appendAmountToNutrientIds: function (fullNutrients, nutrientModels) {
        for (let i = 0; i < fullNutrients.length; i++) {
            nutrientModels[i].FoodNutrient = {
                amount: fullNutrients[i].amount
            }
        }

        return nutrientModels;
    }
}

module.exports = NutrientsRepository;