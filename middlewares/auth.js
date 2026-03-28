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
    const token = req.cookies?.token;

    if (!token) {
        req.user = null;
        res.locals.user = null; // ✅ ADD THIS LINE
        return next();
    }

    const user = getUser(token);

    req.user = user;
    res.locals.user = user; // ✅ already correct

    next();
}


module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}