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
                console.log("[entriesController - addEntry()] entryAdded " + JSON.stringify(entry));

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

function addEntries(req, res) {
    var user = req.user;
    var entries = req.body.entries;

    if (entries) {
        entryRepo.addEntries(user.id, entries)
            .then(function (entriesAdded) {
                console.log("[entriesController - addEntry()] entriesAdded " + JSON.stringify(entriesAdded));
                if (entriesAdded)
                    return res.json({entries: entriesAdded, success: true});
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding entries for user " + user.name + ".",
                    error: error,
                    succss: false
                });
            });
    } else {
        return res.json({
            message: "Entries not given.",
            success: false
        });
    }
}

module.exports = {
    getUserEntries: getUserEntries,
    addEntry: addEntry,
    addEntries: addEntries
};