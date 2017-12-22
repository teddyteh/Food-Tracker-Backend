var db = require('../models');

var WeightsRepository = {
    findByUser: function (userId) {
        return db.Weight.findAll({
            where: {
                user_profile_id: userId
            }
        })
    },

    addWeight: function (userId, weight) {
        return db.Weight.create({
            user_profile_id: userId,
            weight: weight
        });
    }
}

module.exports = WeightsRepository;