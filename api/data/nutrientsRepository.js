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
        return db.Nutrient.findAll({
            where: {
                id: {
                    [Op.or]: ids
                }
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
        return nutrients.map(currNutrient => currNutrient.id);
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