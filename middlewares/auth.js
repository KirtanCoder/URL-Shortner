const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) { 
    const token = req.cookies?.token;   // ✅ cookie se token

    if (!token) {
        return res.redirect("/login");
    }

    const user = getUser(token);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const token = req.cookies?.token;   // ✅ cookie se token

    if (!token) {
        req.user = null;
        return next();
    }

    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};