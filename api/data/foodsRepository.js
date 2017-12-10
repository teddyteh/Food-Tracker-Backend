var db = require('../models');

var WeightsRepository = {
    findByPage: function (pageNumber) {
        var foodsPerPage = 20;
        return db.Food.findAll({
            offset: pageNumber * foodsPerPage,
            limit: foodsPerPage
        })
    },

    addFood: function (user, name, description) {
        return db.Food.create({
            user: user,
            name: name,
            description: description
        });
    }
}

module.exports = WeightsRepository;