const db = require("../models");
const Recipe = db.recipes;

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message: "Content can not be empty!"});
    }
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const recipe = new Recipe({
        "recipeName": req.body.recipeName,
        "recipeCategory": req.body.recipeCategory,
        "cookingTime": req.body.cookingTime,
        "difficulty": req.body.difficulty,
        "portionSize": req.body.portionSize,
        "ingredients": req.body.ingredients,
        "steps": req.body.steps,
        "creatorId": req.user._id,
        "image": req.body.image
    });

    recipe
        .save(recipe)
        .then(data => {
            return res.status(201).send("Recipe " + data.recipeName + " successfully created" );
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while creating recipes.",
                error: err
            });
        })
};

exports.findAll = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const recipeName = req.query.recipeName;
    let condition = recipeName ? { recipeName: { $regex: new RegExp(recipeName), $options: "i" } } : {};
    Recipe.find(condition)
        .then(data => {
            return res.status(200).send({message: 'Success', data: data});
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while retrieving recipes.",
                error: err
            });
        });
};

exports.findOne = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const id = req.params.id;
    Recipe.findById(id)
        .then(data => {
            if (!data){
                return res.status(404).send({ message: "No Recipe found with id " + id });
            } else  {
                return res.status(200).send({message: 'Success', data: data});
            }
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: "Internal error occurred while retrieving recipe with id " + id,
                    error: err});
        });
};

exports.update = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Recipe.findOneAndUpdate({_id:id, creatorId: req.user._id.valueOf() }, req.body, {new: true})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
                });
            } else {
                return res.status(200).send({ message: "Recipe was updated successfully." });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while updating recipe with id " + id,
                error: err
            });
        });
};

exports.delete = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const id = req.params.id;
    Recipe.findOneAndRemove({_id:id, creatorId: req.user._id.valueOf()})
        .then((data) => {
            if (!data) {
                return res.status(403).send({
                    message: "User is not allowed to delete this recipe"
                });
            } else {
                res.status(200).send({
                    message: "Recipe was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal error occurred while deleting recipe with id " + id,
                error: err
            });
        });
};

exports.deleteAll = (req, res) => {
    Recipe.deleteMany({})
        .then(data => {
            return res.status(200).send({
                message: `${data.deletedCount} Recipes were deleted successfully!`
            });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while deleting recipes",
                error: err
            });
        });
};
