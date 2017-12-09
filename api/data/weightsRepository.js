var db = require('../models');

var WeightsRepository = {
    findByUser: function (user) {
        return db.Weight.findAll({
            where: {
                user: user
            }
        })
    }
}

module.exports = WeightsRepository;