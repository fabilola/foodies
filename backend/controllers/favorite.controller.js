const db = require("../models");
const Favorite = db.favorites;

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message: "Content can not be empty!"});
    }
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const favorite = new Favorite({
        "userId": req.user._id,
        "recipeId": req.body.recipeId
    });
    favorite
        .save(favorite)
        .then(() => {
            return res.status(201).send("Favorite successfully created" );
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while creating favorite.",
                error: err
            });
        })
};

exports.findAllByUserId = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const userId = req.params.id;
    Favorite.find({userId: userId})
        .then(data => {
            return res.status(200).send({message: 'Success', data: data});
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal error occurred while retrieving favorites.",
                error: err
            });
        });
};

exports.delete = (req, res) => {
    if ( !req.user ){
        return res.status(401).send({message: "User is not authorized"});
    }
    const id = req.params.id;
    Favorite.findOneAndRemove({_id:id, userId: req.user._id.valueOf()})
        .then((data) => {
            if (!data) {
                return res.status(403).send({
                    message: "User is not allowed to delete this favorite"
                });
            } else {
                res.status(200).send({
                    message: "Favorit was removed successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal error occurred while deleting favorite with id " + id,
                error: err
            });
        });
};