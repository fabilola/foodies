import {Box, Grid, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import './ProfilePage.css'
import {useContext, useEffect, useState} from "react";
import {deleteRecipe} from "../../services/apiCalls";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import AppContext from "../../store/AppContext";
import useFetchRecipes from "../../hooks/useFetchRecipes";
import usePersonalProfile from "../../hooks/usePersonalProfile";
import MoreMenu from "../../components/MoreMenu/MoreMenu";

const ProfilePage = () => {
    const [profileData, setProfileData] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const {fetchRecipes}  = useFetchRecipes();
    const pathElements = location.pathname.split("/");
    const profileId = pathElements[pathElements.length - 1];
    const ctx = useContext(AppContext);
    const userRecipes = ctx.recipes.filter((recipe) => recipe.creatorId === profileId);
    const personalProfile = usePersonalProfile(profileId);

    useEffect(() => {
        setProfileData(location.state.profileData);
    },[location.state.profileData]);

    const onDeleteClick = (recipe) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        const id = recipe._id;
        deleteRecipe(requestOptions, id)
            .then((res) => {
                if(res.ok) {
                    ctx.setMsg('Successfully deleted recipe');
                    ctx.setOpen(true);
                }
                fetchRecipes();
            })
            .catch(() => {
                ctx.setMsg("Recipe couldn't be deleted, please try again later ");
                ctx.setOpen(true)
            });
    };

    return <div>
        <Avatar alt="profile picture" src={profileData.image} sx={{ width: 80, height: 80 }} referrerPolicy="no-referrer"
                className={'profile__center'} />
        <Typography variant={'h3'} className={'profile__title'}>
            {profileData.displayName}
        </Typography>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant={"h5"}>
                        {personalProfile ? 'Your Recipes' : profileData.displayName + '\'s Recipes'}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={2}>
                        {
                            userRecipes.length === 0 ?
                                <Typography color={'secondary'} style={{margin: '40px'}}>
                                    You don't have any recipes yet
                                </Typography> :
                                userRecipes.map(recipe =>
                                    <Grid item xs={4} key={recipe.recipeName}>
                                        <RecipeCard
                                            data={recipe}
                                        />
                                        {
                                            personalProfile &&
                                            <MoreMenu
                                                onDeleteClick={() =>onDeleteClick(recipe)}
                                                onEditClick={() => navigate(`/edit/${recipe._id}`,
                                                    {state:{recipeData: recipe}}
                                                )}
                                            />

                                        }
                                    </Grid>
                                )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </div>;
};

export default ProfilePage;