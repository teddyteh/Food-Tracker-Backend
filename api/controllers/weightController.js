var weightRepo = require('../data/weightsRepository');

function getUserWeights(req, res) {
    var user = req.query.user;

    weightsRepo.findByUser(user)
        .then(function (weights) {
            if (weights.length) {
                return res.json(user);
            }
            return res.json({
                message: "Could not find user."
            });
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving weights."
            });
        });
}

module.exports = {
    getUserWeights: getUserWeights
};