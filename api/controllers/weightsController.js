var weightRepo = require('../data/weightsRepository');

function getUserWeights(req, res) {
    weightRepo.findByUser(req.user)
        .then(function (weights) {
            if (weights.length >= 1) {
                return res.json(weights);
            }
            return res.json({
                message: "Could not find weights for user " + req.user.name + "."
            });
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving weights for user " + req.user.name + "."
            });
        });
}

function addWeight(req, res) {
    var weight = req.body.weight;

    if (weight) {
        weightRepo.addWeight(req.user.id, weight)
            .then(function (weight) {
                if (weight) {
                    return res.json(weight);
                }
                return res.json({
                    message: "Could not add weight for user " + req.user.name + "."
                });
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding weight for user " + req.user.name + "."
                });
            });
    } else {
        return res.json({
            message: "Weight not given" + "."
        });
    }
}

module.exports = {
    getUserWeights: getUserWeights,
    addWeight: addWeight
};