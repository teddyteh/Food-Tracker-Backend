var db = require('../models');

var WeightsRepository = {
    findByUser: function (user) {
        return db.Weight.findAll({
            where: {
                user: user
            }
        })
    },

    addWeight: function(user, weight) {
        return db.Weight.create({
            user: user,
            weight: weight
        });
    }
}

module.exports = WeightsRepository;