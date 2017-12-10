var db = require('../models');

var EntriesRepository = {
    findByUser: function (user) {
        return db.Entry.findAll({
            where: {
                user: user
            }
        })
    },

    addEntry: function (user, food, serving) {
        return db.Entry.create({
            user: user,
            food: food,
            serving: serving
        });
    }
}

module.exports = EntriesRepository;