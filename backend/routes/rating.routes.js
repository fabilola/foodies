module.exports = app => {
    const ratings = require("../controllers/rating.controller");
    let router = require("express").Router();
    router.post("/", ratings.create);
    router.delete("/:id", ratings.delete);
    router.get("/recipe/:id", ratings.findAllByRecipeId);

    app.use('/api/ratings', router);
};