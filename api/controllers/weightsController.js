var weightRepo = require('../data/weightsRepository');

function getUserWeights(req, res) {
    weightRepo.findByUser(req.user.id)
        .then(function (weights) {
            if (weights.length >= 1) {
                return res.json({weights: weights, success: true});
            }
            return res.json({
                message: "Could not find weights for user.",
                success: true
            });
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving weights for user.",
                error: error,
                success: false
            });
        });
}

function addWeight(req, res) {
    var weight = req.body.weight;

    if (weight) {
        weightRepo.addWeight(req.user.id, weight)
            .then(function (weight) {
                return res.json({weight: weight, success: true});
            })
            .catch(function (error) {
                return res.json({
                    message: "Error adding weight for user.",
                    error: error,
                    success: false
                });
            });
    } else {
        return res.json({
            message: "Weight not given" + ".",
            success: false
        });
    }
}

module.exports = {
    getUserWeights: getUserWeights,
    addWeight: addWeight
};