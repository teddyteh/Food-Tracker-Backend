var servingRepo = require('../data/servingsRepository');

function getServingSizes(req, res) {
    servingRepo.findAll()
        .then(function (servingSizes) {
            if (servingSizes.length >= 1) {
                return res.json({servingSizes: servingSizes, success: true});
            } else {
                return res.json({
                    message: "Could not find any serving size.",
                    success: true
                });
            }
        })
        .catch(function (error) {
            return res.json({
                message: "Error retrieving serving sizes.",
                error: error,
                success: false
            });
        });
}

module.exports = {
    getServingSizes: getServingSizes
};