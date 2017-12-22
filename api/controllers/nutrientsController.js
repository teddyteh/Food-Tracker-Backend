var nutrientRepo = require('../data/nutrientsRepository');
var foodRepo = require('../data/foodsRepository');

function getNutrients(req, res) {
    nutrientRepo.findAll()
        .then(function (nutrients) {
            if (nutrients.length >= 1) {
                return res.json({nutrients: nutrients, success: true});
            } else {
                return res.json({
                    message: "Could not find any nutrient.",
                    success: true
                });
            }
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving nutrients.",
                error: error,
                success: false
            });
        });
}

function addNutrient(req, res) {
    var name = req.body.name;

    if (name) {
        nutrientRepo.addNutrient(name)
            .then(function (nutrient) {
                return res.json({nutrient: nutrient, success: true});
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding nutrient.",
                    error: error,
                    success: false
                });
            });
    } else {
        return res.json({
            message: "Nutrient name not given.",
            success: false
        });
    }
}

function getNutrientsForFood(req, res) {
    var food = req.query.food;

    if (food) {
        foodRepo.findById(food)
            .then(function (food) {
                if (food) {
                    // This will select only name from the Food table, and nothing from the FoodNutrient table
                    food.getNutrients({
                        attributes: ['name'],
                        joinTableAttributes: []
                    })
                        .then(function (nutrients) {
                            return res.json({nutrients: nutrients, sucess: true});
                        })
                        .catch(function (error) {
                            return res.json({
                                message: "Error retrieving nutrients for food.",
                                error: error,
                                sucess: false
                            });
                        });
                } else {
                    return res.json({
                        message: "Could not find food while getting nutrients for food.",
                        sucess: false
                    });
                }
            })
            .catch(function (error) {
                return res.json({
                    message: "Error retrieving food while getting nutrients for food.",
                    error: error,
                    sucess: false
                });
            });
    } else {
        return res.json({
            message: "Food not given.",
            success: false
        });
    }

}

function addNutrientForFood(req, res) {
    var food = req.body.food;
    var nutrient = req.body.nutrient;
    var amount = req.body.amount

    if (food && nutrient && amount) {
        foodRepo.findById(food)
            .then(function (food) {
                if (food) {

                    food.addNutrient(nutrient, {
                        through: {
                            amount: amount
                        }
                    })
                        .then(function (nutrientAdded) {
                            var result = nutrientAdded[0];

                            if (result) {
                                result = result[0];
                                // console.log(result);

                                if (result === 1) {
                                    return res.json({
                                        message: "Nutrient for food updated.",
                                        success: true
                                    });
                                } else {
                                    return res.json({nutrient: result, success: true});
                                }
                            } else {
                                return res.json({
                                    message: "No changes.",
                                    success: true
                                });
                            }
                        })
                        .catch(function (error) {
                            return res.json({
                                message: "Error adding nutrient for food.",
                                error: error,
                                success: false
                            });
                        })

                } else {
                    return res.json({
                        message: "Could not find food while adding nutrient for food.",
                        success: false
                    });
                }
            })
            .catch(function (error) {
                return res.json({
                    message: "Error retrieving food while adding nutrient for food.",
                    error: error,
                    success: false
                });
            });

    } else {
        return res.json({
            message: "Food, nutrient or amount not given.",
            success: false
        });
    }
}

module.exports = {
    getNutrients: getNutrients,
    addNutrient: addNutrient,
    getNutrientsForFood: getNutrientsForFood,
    addNutrientForFood: addNutrientForFood
};