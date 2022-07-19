module.exports = mongoose => {
    let schema =
        mongoose.Schema(
            {
                userId: String,
                recipeId: String,
            }
        );
    return mongoose.model("favorite", schema);
};