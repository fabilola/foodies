module.exports = mongoose => {
    let schema =
        mongoose.Schema(
            {
                recipeName: String,
                recipeCategory: String,
                cookingTime: String,
                difficulty: String,
                portionSize: String,
                ingredients: [Object],
                steps: [Object],
                creatorId: String,
                image: String

            }
        );
    return mongoose.model("recipe", schema);
};