var db = require('../models');
var foodRepo = require('../data/foodsRepository');

var EntriesRepository = {
    findByUser: function (user) {
        return db.Entry.findAll({
            where: {
                user: user
            }
        })
    },

    findByPage: function (user, page, entriesPerPage) {
        return db.Entry.findAll({
            where: {
                user: user
            },
            limit: entriesPerPage,
            offset: page * entriesPerPage,
            order: "id desc"
        });
    },

    addEntry: function (user, food, serving, quantity) {
        return db.Entry.create({
            user: user,
            food: food,
            servingSize: serving,
            quantity: quantity
        });
    },

    addEntries: function (user, entries) {
        // entries look like this [{"food":{"local_id":1,"online_id":1},"servingSize":2,"quantity":1}]
        // mapped entries look like this [{"user": 1, "food":1,"serving_size":1,"quantity":1}]
        let mappedEntries = this.mapEntries(user, entries);

        console.log("[entriesrepo addEntries()] originalEntries " + JSON.stringify(entries));
        console.log("[entriesrepo addEntries()] mappedEntries " + JSON.stringify(mappedEntries));

        if (mappedEntries && mappedEntries.length > 0) {
            return db.Entry.bulkCreate(mappedEntries);
        }
    },

    mapEntries(user, entries) {
        let mappedEntries = [];

        // entries look like this [{"food":{"local_id":1,"online_id":1},"servingSize":2,"quantity":1}]
        if (entries && entries.length > 0) {
            for (let i = 0; i < entries.length; i++) {

                let currEntry = entries[i];

                let newCurrEntry = {};
                newCurrEntry.user = user;
                newCurrEntry.food = currEntry.food.online_id;
                newCurrEntry.serving_size = currEntry.servingSize;
                newCurrEntry.quantity = currEntry.quantity;

                mappedEntries.push(newCurrEntry);

            }
        }

        // mapped entries [{"user": 1, "food":1,"serving_size":1,"quantity":1}]
        return mappedEntries;
    }

}

module.exports = EntriesRepository;