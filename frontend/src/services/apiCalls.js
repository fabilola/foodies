import {BASIC_URL} from "../assets/constants";

export async function getAllRecipes() {
    const url = BASIC_URL + 'api/recipes';
    return await fetch(url, { credentials: 'include' });
}

export async function createRecipe(requestOptions) {
    const url = BASIC_URL + 'api/recipes';
    return await fetch(url , requestOptions);
}

export async function updateRecipe(requestOptions, id) {
    const url = BASIC_URL + 'api/recipes/' + id;
    return await fetch(url , requestOptions);
}

export async function deleteRecipe(requestOptions, id){
    const url = BASIC_URL + 'api/recipes/' + id;
    return await fetch(url, requestOptions);
}

export async function getUserData(){
    const url = BASIC_URL + 'api/user';
    return await fetch(url, { credentials: 'include' });
}

export async function getUserDataById(id){
    const url = BASIC_URL + 'api/user/' + id;
    return await fetch(url, { credentials: 'include' });
}

export async function logOut(){
    const url = BASIC_URL + 'api/user/logout';
    return await fetch(url, { credentials: 'include' });
}

export async function createRating(requestOptions) {
    const url = BASIC_URL + 'api/ratings';
    return await fetch(url , requestOptions);
}

export async function getAllRatingsByRecipeId(id) {
    const url = BASIC_URL + 'api/ratings/recipe/' + id;
    return await fetch(url, { credentials: 'include' });
}

export async function deleteRatingById(requestOptions, id) {
    const url = BASIC_URL + 'api/ratings/' + id;
    return await fetch(url, requestOptions);
}

export async function createFavorite(requestOptions) {
    const url = BASIC_URL + 'api/favorites';
    return await fetch(url, requestOptions);
}

export async function getAllFavoritesById(id) {
    const url = BASIC_URL + 'api/favorites/user/' + id;
    return await fetch(url, { credentials: 'include' });
}

export async function deleteFavoriteById(requestOptions, id) {
    const url = BASIC_URL + 'api/favorites/' + id;
    return await fetch(url, requestOptions);
}

export async function sendMail(requestOptions) {
    const url = BASIC_URL + 'api/email';
    return await fetch(url, requestOptions);
}