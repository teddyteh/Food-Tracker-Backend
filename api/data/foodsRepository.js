var db = require('../models'),
    Sequelize = require('sequelize');
const Op = Sequelize.Op;

var FoodsRepository = {
    findById: function (id) {
        return db.Food.find({
            where: {
                id: id
            }
        })
    },

    findByLocalId: function (user, id) {
        return db.Food.find({
            where: {
                local_id: id,
                created_by: user
            }
        })
    },

    findByPage: function (pageNumber) {
        var foodsPerPage = 20;
        return db.Food.findAll({
            offset: pageNumber * foodsPerPage,
            limit: foodsPerPage
        })
    },

    findByUser: function (user) {
        return db.Food.findAll({
            where: {
                created_by: user
            }
        });
    },

    findUserFood: function (user, foodOnlineId, userLocalFoodId) {
        if (foodOnlineId) {
            return db.Food.findOne({
                where: {
                    created_by: user,
                    [Op.or]: [{id: foodOnlineId}, {local_id: userLocalFoodId}]
                }
            });
        } else {
            return db.Food.findOne({
                where: {
                    created_by: user,
                    local_id: userLocalFoodId
                }
            });
        }
    },

    createFood: function (user, userLocalFoodId, name, description, calories) {
        return db.Food.create({
            name: name,
            description: description,
            calories: calories,
            created_by: user,
            local_id: userLocalFoodId
        });
    },

    addNutrientsForFood: function (food, nutrients) {
        var success = true;

        nutrients.forEach(function (currNutrient) {
            food.addNutrient(currNutrient.id, {through: {amount: currNutrient.amount}})
                .then(function (result) {
                    if (result) {
                        result = result[0];
                        // console.log(result);

                        // if (result === 1) {
                        //     return res.json({
                        //         message: "Nutrient for food updated.",
                        //         success: true
                        //     });
                        // } else {
                        //     return res.json({nutrient: result, success: true});
                        // }
                    } else {
                        // return res.json({
                        //     message: "No changes.",
                        //     success: true
                        // });
                    }
                })
                .catch(function (error) {
                    success = false;
                })
        });

        return success;
    },

    addNutrientsForFood2: function (food, nutrients) {
        return food.setNutrients(nutrients);
    },

    removeAllFoodNutrients: function (food) {
        return food.setNutrients([]);
    },

    addServingSizesForFood: function (food, servingSizes) {
        var success = true;

        servingSizes.forEach(function (currServingSize) {
            food.addServingSize(currServingSize.id)
                .then(function (result) {
                    if (result) {
                        result = result[0];
                        // console.log(result);

                        // if (result === 1) {
                        //     return res.json({
                        //         message: "Nutrient for food updated.",
                        //         success: true
                        //     });
                        // } else {
                        //     return res.json({nutrient: result, success: true});
                        // }
                    } else {
                        // return res.json({
                        //     message: "No changes.",
                        //     success: true
                        // });
                    }
                })
                .catch(function (error) {
                    success = false;
                })
        });

        return success;
    },

    addServingSizes: function (food, servingSizes) {
        return food.setServingSizes(servingSizes);
    },

    removeAllFoodServingSizes: function (food) {
        return food.setServingSizes([]);
    },

    updateUserFood: function (existingFood, localId, name, description, calories) {
        return existingFood.update({
            local_id: localId,
            name: name,
            description: description,
            calories: calories
        });
    },
}

module.exports = FoodsRepository;