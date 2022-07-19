module.exports = mongoose => {
    let schema =
        mongoose.Schema(
            {
                recipeId: String,
                creatorId: String,
                starRating: String,
                ratingText: String,
                time: Date
            }
        );
    return mongoose.model("rating", schema);
};