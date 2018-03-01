var db = require('../models');

var ServingsRepository = {
    findAll: function (user) {
        return db.ServingSize.findAll();
    },

    getServingSizeIds: function (servingSizes) {
        // servingSizes look like [{"id":1,"name":"Cup","amount":30,"created_at":null,"updated_at":null,"quantity":"0","active":true},{"id":2,"name":"oz","amount":34,"created_at":null,"updated_at":null,"quantity":"0","active":true}]
        return servingSizes.map(currServingSize  => currServingSize.id);
    }
}

module.exports = ServingsRepository;