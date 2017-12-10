var entryRepo = require('../data/entriesRepository');

function getUserEntries(req, res) {
    var user = req.user;

    entryRepo.findByUser(user.id)
        .then(function (entries) {
            if (entries.length >= 1) {
                return res.json(entries);
            } else {
                return res.json({
                    message: "No entries found for user " + user.name + "."
                });
            }
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving entries for user " + user.name + "."
            });
        });
}

function addEntry(req, res) {
    var user = req.user;
    var food = req.body.food;
    var serving = req.body.serving;

    if (food && serving) {
        entryRepo.addEntry(user.id, food, serving)
            .then(function (entry) {
                if (entry) {
                    return res.json(entry);
                }
                return res.json({
                    message: "Could not add entry for user " + name + "."
                });
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding entry for user " + user.name + "."
                });
            });
    }
}

module.exports = {
    getUserEntries: getUserEntries,
    addEntry: addEntry
};