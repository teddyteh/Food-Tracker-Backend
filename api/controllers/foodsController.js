var foodRepo = require('../data/foodsRepository');

function getFoods(req, res) {
    var pageNumber = req.body.pageNumber;

    if (!isNaN(pageNumber)) {
        foodRepo.findByPage(pageNumber)
            .then(function (foods) {
                if (foods.length >= 1) {
                    return res.json(foods);
                }
                return res.json({
                    message: "No food found for page " + pageNumber + "."
                });
            })
            .catch(function (error) {
                return res.json({
                    message: "Error retrieving foods for page " + pageNumber + "."
                });
            });
    } else {
        return res.json({
            message: "Page number not given" + "."
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
                if (food) {
                    return res.json(food);
                }
                return res.json({
                    message: "Could not add food for user " + user.name + "."
                });
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding food for user " + user.name + "."
                });
            });
    } else {
        return res.json({
            message: "Food not given" + "."
        });
    }
}

module.exports = {
    getFoods: getFoods,
    addFood: addFood
};