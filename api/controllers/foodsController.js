var foodRepo = require('../data/foodsRepository');
var nutrientRepo = require('../data/nutrientsRepository');

function getFoods(req, res) {
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

function addFood(req, res) {
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

module.exports = {
    getFoods: getFoods,
    addFood: addFood
};