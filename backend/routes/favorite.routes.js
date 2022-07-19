module.exports = app => {
    const favorite = require("../controllers/favorite.controller");
    let router = require("express").Router();
    router.post("/", favorite.create);
    router.delete("/:id", favorite.delete);
    router.get("/user/:id", favorite.findAllByUserId);

    app.use('/api/favorites', router);
};