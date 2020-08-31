const User = require('../models/user');

exports.read = (req, res) => {
    // removes hashed password from returned user
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}