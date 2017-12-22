var entryRepo = require('../data/entriesRepository');

function getUserEntries(req, res) {
    var user = req.user;

    entryRepo.findByUser(user.id)
        .then(function (entries) {
            if (entries.length >= 1) {
                return res.json({entries: entries, success: true});
            } else {
                return res.json({
                    message: "Could not find entries for user.",
                    success: true
                });
            }
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving entries for user.",
                error: error,
                success: false
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
                return res.json({entry: entry, success: true});
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding entry for user " + user.name + ".",
                    error: error,
                    succss: false
                });
            });
    } else {
        return res.json({
            message: "Food or serving not given.",
            success: false
        });
    }
}

module.exports = {
    getUserEntries: getUserEntries,
    addEntry: addEntry
};