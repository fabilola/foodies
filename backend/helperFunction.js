module.exports = {
    generateHtmlString: function  (recipe) {
        let htmlString = " ";
        htmlString += '<h1>' + recipe.recipeName + '</h1>';
        htmlString += '<h2> Details </h2>';
        htmlString += '<p> Category: ' + recipe.recipeCategory + '</p>';
        htmlString += '<p> Cooking Time in min: ' + recipe.cookingTime + '</p>';
        htmlString += '<p> Portion size: ' + recipe.portionSize + '</p>';
        htmlString += '<h2> Ingredients </h2>';
        htmlString += '<ul>';

        for (let ingredient in recipe.ingredients) {
            let amount = recipe.ingredients[ingredient].amount;
            let unit = recipe.ingredients[ingredient].unit;
            let item = recipe.ingredients[ingredient].item;

            htmlString += '<li>' + amount + ' '
                + unit + ' ' + item + '</li>';
        }
        htmlString += '</ul>';
        htmlString += '<h2> Steps </h2>';
        htmlString += '<ol>';

        for (let step in recipe.steps) {
            htmlString += '<li>' + recipe.steps[step].stepDescription + '</li>';
        }
        htmlString += '</ol>';

        return htmlString;
    }
}