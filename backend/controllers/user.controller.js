const db = require("../models");
const User = db.users;

exports.findOne = (req, res) => {
    if ( req.user ){
        const id = req.user._id;
        User.findById(id)
            .then(data => {
                if (!data){
                    return res.status(404).send({ message: "No User found with id " + id });
                } else {
                    return res.status(200).send({message: 'Success', data: data});
                }
            })
            .catch(err => {
                return res
                    .status(500)
                    .send({ message: "Internal error occurred while retrieving user with id " + id,
                        error: err});
            });
    } else {
        return res.status(204).send({ message: "No logged in user ", data: {} });
    }
};

exports.findUser = (req, res) => {
    if ( req.user ){
        const id = req.params.id;
        User.findById(id)
            .then(data => {
                if (!data){
                    return res.status(404).send({ message: "No User found with id " + id });
                } else {
                    return res.status(200).send({message: 'User Success', data: data});
                }
            })
            .catch(err => {
                return res
                    .status(500)
                    .send({ message: "Internal error occurred while retrieving user with id " + id,
                        error: err});
            });
    } else {
        return res.status(401).send({ message: "User not authorized" });
    }
};

exports.
    logOut = (req,res) => {
    if(req.isAuthenticated){
        try{
            req.session.destroy();
            req.logout();

        }catch (error){
            res.status(500).send({message:"Oops! Something went wrong", error:error});
        }
    }
    return res.status(200).send({message:"Successfully logged out"});
};
