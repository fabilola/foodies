import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../store/AppContext";
import {Box, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import FilterSection from "../../components/Filter/FilterSection";
import SearchIcon from '@mui/icons-material/Search';

const BrowseRecipes = (props) => {
    const { recipes, favorites } = useContext(AppContext);
    const [browseRecipes, setBrowseRecipes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterOn, setFilterOn] = useState(false);
    const [filter, setFilter] = useState([{categories:[], difficulty:[], range:[]}]);

    useEffect(() => {
        if( props.isFavorite) {
            const ids = favorites.map(value => value.recipeId);
            let favoriteFiltered = recipes.filter((recipe) =>
                ids.includes(recipe._id)
            )
            setBrowseRecipes([...favoriteFiltered])
        } else {
            setBrowseRecipes([...recipes])
        }
    }, [recipes, props.isFavorite]);

    const handleSearch = (event) => {
        const search = event.target.value;
        setSearchText(search);
        let filteredRecipes = recipes.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(search.toLowerCase())
        );
        setBrowseRecipes(filteredRecipes);
    };

    useEffect(()=> {
        if(filterOn){
            setSearchText('');
            let cats = filter[0].map(cat => cat.name);
            let filteredRecipes = [...recipes];
            if (cats.length !==0){
                filteredRecipes  = filteredRecipes.filter((recipe) =>
                    cats.includes(recipe.recipeCategory)
                );
            }
            let dif = filter[1].map(opt => opt.name);
            if (dif.length !== 0){
                filteredRecipes  = filteredRecipes.filter((recipe) =>
                    dif.includes(recipe.difficulty)
                );
            }
            if(filter[2] !== 0){
                filteredRecipes = filteredRecipes.filter((recipe) =>  recipe.cookingTime <= filter[2]);
            }
            setBrowseRecipes(filteredRecipes);
        } else {
            setBrowseRecipes(recipes);
        }
    }, [filter, filterOn])

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant={"h5"}>
                        { props.isFavorite ? 'Your Favorite Recipes' : 'Recipes'}
                    </Typography>
                    { !props.isFavorite &&
                        <TextField
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
                            }}
                        fullWidth={true}
                        size={'small'}
                        id="search"
                        margin="normal"
                        disabled={filterOn}
                        name={"unit"}
                        label="Search"
                        value={searchText}
                        onChange={(e) => handleSearch(e)
                        }
                    />}
                    <FilterSection setFilterOn={setFilterOn} setFilter={setFilter} filterOn={filterOn}/>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={4}>
                        { browseRecipes.length === 0 ?
                            <Typography color={'secondary'} style={{margin: '100 auto'}}>
                                {props.isFavorite ? "You don't have any favorites yet" :
                                    filterOn? " No recipes matching the applied filters" :
                                    " loading..."}
                            </Typography> :
                            browseRecipes.map(recipe =>
                            <Grid item xs={4} key={recipe.recipeName}>
                                <RecipeCard
                                    data={recipe}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </div>;
};

export default BrowseRecipes;