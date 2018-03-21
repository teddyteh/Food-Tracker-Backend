var foodRepo = require('../data/foodsRepository');
var nutrientRepo = require('../data/nutrientsRepository');
var servingRepo = require('../data/servingsRepository');

function getFood(req, res) {
    var pageNumber = req.query.pageNumber;

    if (!isNaN(pageNumber)) {
        foodRepo.findByPage(pageNumber)
            .then(function (foods) {
                if (foods.length >= 1) {
                    return res.json({foods: foods, success: true});
                }
                return res.json({
                    message: "Could not find any food for page " + pageNumber + ".",
                    success: true
                });
            })
            .catch(function (error) {
                return res.json({
                    message: "Error retrieving foods for page " + pageNumber + ".",
                    error: error,
                    success: false
                });
            });
    } else {
        return res.json({
            message: "Page number not given" + ".",
            success: false
        });
    }
}

function addFoodd(req, res) {
    var user = req.user;
    var name = req.body.name;
    var description = req.body.description;

    if (name && description) {
        foodRepo.addFood(user.id, name, description)
            .then(function (food) {
                return res.json({food: food, success: true});
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding food.",
                    error: error,
                    success: false
                });
            });
    } else {
        return res.json({
            message: "Name or description not given" + ".",
            success: false
        });
    }
}

function addOrUpdateFood(req, res) {
    var user = req.user;
    var localId = req.body.localId;
    var name = req.body.name;
    var description = req.body.description;
    var calories = req.body.calories;
    var nutrients = req.body.nutrients;
    var servingSizes = req.body.servingSizes;

    if (!localId) {
        return res.json({
            message: "Local food id not given.",
            success: false
        });
    }
    if (!name) {
        return res.json({
            message: "Name not given.",
            success: false
        });
    }
    // if (!description) {
    //     return res.json({
    //         message: "Description not given.",
    //         success: false
    //     });
    // }
    if (!calories) {
        return res.json({
            message: "Calories not given.",
            success: false
        });
    }

    console.log("[foodsController - addOrUpdareFood()] calories " + JSON.stringify(calories));
    console.log("[foodsController - addOrUpdareFood()] nutrients " + JSON.stringify(nutrients));
    console.log("[foodsController - addOrUpdareFood()] servingSizes " + JSON.stringify(servingSizes));

    foodRepo.findUserFood(user.id, localId)
        .then(function (existingFood) {
            console.log("[foodsController - addOrUpdareFood()] existingFood " + existingFood);

            if (!existingFood) {
                // New food
                foodRepo.createFood(user.id, localId, name, description, calories)
                    .then(function (createdFood) {

                        if (createdFood) {
                            addFoodNutrients(createdFood, nutrients);
                            addFoodServingSizes(createdFood, servingSizes);

                            return res.json({food: createdFood, success: true});
                        } else {
                            return res.json({success: false});
                        }

                    })
            } else {
                // Update food
                foodRepo.updateUserFood(existingFood, name, description, calories)
                    .then(function (updatedFood) {

                        if (updatedFood) {
                            addFoodNutrients(updatedFood, nutrients);
                            addFoodServingSizes(updatedFood, servingSizes);

                            return res.json({food: updatedFood, success: true});
                        } else {
                            return res.json({success: false});
                        }

                    })
            }
        })
        .catch(function (error) {
            return res.json({
                message: "Error adding food.",
                error: error,
                success: false
            });
        });
}

function addFoodNutrients(foodModel, nutrients) {
    if (nutrients) {
        // Extract nutrient ids from full nutrients
        let nutrientIds = nutrientRepo.getNutrientIds(nutrients);

        // Get nutrient models by ids
        nutrientRepo.findByIds(nutrientIds)
            .then(function (nutrientsFound) {
                console.log("[foodsController addFoodNutrients()] nutrientsFound");
                // Add property with FoodNutrient to the nutrient models, containing the amounts that go in the FoodNutrient join table
                let nutrientsWithAmount = nutrientRepo.appendAmountToNutrientIds(nutrients, nutrientsFound)
                console.log("nutrientsWithAmount " + JSON.stringify(nutrientsWithAmount));

                // Actually add the nutrients
                foodRepo.addNutrientsForFood2(foodModel, nutrientsWithAmount)
                    .then(function (nutrientsAdded) {
                        console.log("[foodsController addFoodNutrients()] nutrientsAdded " + JSON.stringify(nutrientsAdded));
                    });
            })
            .catch(function (error) {
                console.log("[foodsController addFoodNutrients()] error " + JSON.stringify(error));
            })
    }
}

function addFoodServingSizes(foodModel, servingSizes) {
    if (servingSizes) {
        // Extract food serving size ids from full serving sizes
        let servingSizeIds = servingRepo.getServingSizeIds(servingSizes);

        // Actually add the serving sizes
        foodRepo.addServingSizes(foodModel, servingSizeIds)
            .then(function (servingSizesAdded) {
                console.log("[foodsController addFoodServingSizes()] serving sizes added " + JSON.stringify(servingSizesAdded));
            })
            .catch(function (error) {
                console.log("[foodsController addFoodServingSizes()] error " + JSON.stringify(error));
            })
    }
}

module.exports = {
    getFood: getFood,
    addOrUpdateFood: addOrUpdateFood
};