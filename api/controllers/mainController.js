function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user.' });
    }
}

function test(req, res) {
    return res.json({ message: 'test' });
}

module.exports = {
    loginRequired: loginRequired,
    test: test
};