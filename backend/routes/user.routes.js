module.exports = app => {
    const user = require("../controllers/user.controller");
    let router = require("express").Router();

    router.get("/", user.findOne);
    router.get("/logout", user.logOut);
    router.get("/:id", user.findUser);

    app.use('/api/user', router);
};