const jwt = require("jsonwebtoken");
const auth = {};

auth.isLoggedin = function (req, res, next) {
    const authUser = req.header.authorization;
    if (!authUser) {
        const err = new Error("Login First!");
        err.status = 401;
        next(err);
        return;
    } else {
        const token = authUser.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                next();
            } else {
                const err = new Error("Login First!");
                err.status = 401;
                next(err);
                return;
            }
        })
    }
};

auth.isCurrentUser = function (req, res, next) {
    const token = req.header.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (decoded && decoded.id === req.params.id) {
            next();
        } else {
            const err = new Error("No Authorization");
            err.status = 401;
            next(err);
            return;
        }
    })
};

module.exports = auth;

