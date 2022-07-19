const db = require("../models");
const Rating = db.ratings;

exports.create = (req, res) => {
    if(!req.body) {
       return res.status(400).send({message: "Content can not be empty!"});
    }
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const rating = new Rating({
        "recipeId": req.body.recipeId,
        "creatorId": req.user._id,
        "starRating": req.body.starRating,
        "ratingText": req.body.ratingText,
        "time": req.body.time
    });

    rating
        .save(rating)
        .then(() => {
           return res.status(201).send("Rating successfully created" );
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while creating rating.",
                error: err
            });
        })
};

exports.findAllByRecipeId = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const recipeId = req.params.id;
    Rating.find({recipeId: recipeId})
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

exports.delete = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const id = req.params.id;

    Rating.findOneAndRemove({_id:id, creatorId: req.user._id.valueOf()})
        .then((data) => {
            if (!data) {
                return res.status(403).send({
                    message: "User is not allowed to delete this rating"
                });
            } else {
                res.status(200).send({
                    message: "Rating was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal error occurred while deleting rating with id " + id,
                error: err
            });
        });
};