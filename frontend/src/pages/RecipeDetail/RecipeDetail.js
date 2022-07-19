import React, {useContext, useState,useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AppContext from "../../store/AppContext";
import {
    Box,
    Chip,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import './RecipeDetails.css';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RatingForm from "../../components/RatingForm/RatingForm";
import {getAllRatingsByRecipeId} from "../../services/apiCalls";
import RatingListItem from "../../components/RatingForm/RatingListItem";
import StarIcon from "@mui/icons-material/Star";

const RecipeDetail = () => {
    const location = useLocation();
    const creatorData = location.state.creatorData;
    const [ratings, setRatings] = useState([]);
    const [overAllRating, setOverAllRating] = useState(0);
    const {recipes} = useContext(AppContext);
    const pathElements = location.pathname.split("/");
    const recipeId = pathElements[pathElements.length - 1];
    const recipeById = recipes.filter((recipe) => recipe._id === recipeId)[0];
    const navigate = useNavigate();

    const onCreatorClick = () =>{
        navigate('/profile/'+ creatorData._id, {state:{profileData: creatorData}});
    }

    const calcOverAllRating = (ratings) => {
        let countStars = 0;
        ratings.forEach(rating => {
            countStars += parseInt(rating.starRating);
        })
        const average =countStars / ratings.length;
        return Math.round(average * 10) / 10;
    }

    const fetchRatings = () => {
        getAllRatingsByRecipeId(recipeId).then((res) => {
            res.json().then((r) => {
                    setRatings(r.data);
                    setOverAllRating(r.data.length === 0 ? 0 :calcOverAllRating(r.data));
                }
            )
        }).catch();
    }

    useEffect(()=> {
        fetchRatings();

    }, [ ]);

    return <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    recipeById.image ?
                        <img className={'detail__img'} alt={'dish-photo'}  src={"data:image/jpeg;base64," + recipeById.image}/>
                        :
                        <img className={'detail__img'} src={require('../../assets/foodies_default.jpg')} alt={'dish-photo'}/>
                }
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9}>
                <Typography variant={"h3"} className={'detail__alignment'}>
                    {recipeById.recipeName}
                </Typography>
            </Grid>
            <Grid item xs={3} className={'create__spacing'}>
            </Grid>
            <Grid item xs={9} className={'create__spacing  detail__alignment'}>
                <Chip label={recipeById.recipeCategory} variant="outlined"
                      avatar={<DiscountOutlinedIcon/>}/>
                <Chip label={recipeById.cookingTime + ' min'} variant="outlined"
                      avatar={<AccessTimeOutlinedIcon/>}/>
                <Chip label={recipeById.difficulty} variant="outlined"
                      avatar={<SpeedOutlinedIcon/>}/>
                <div >
                    <Typography color={"secondary"} variant={"body1"} className={'detail__creator'}>
                        Recipe created by
                        <span className={'detail__creator__click'} onClick={onCreatorClick}>{' ' + creatorData.displayName}</span>
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={3} className={'create__spacing'}>
                <Typography variant={"h6"} color={"secondary"}>
                    01
                </Typography>
                <Typography variant={"h5"}>
                    Ingredients
                </Typography>
            </Grid>
            <Grid item xs={9} className={'create__spacing  detail__alignment'}>
                <List>
                    {recipeById.ingredients.map((ingredient, index) => {
                        return <ListItem key={index}>
                            <ListItemText
                                primary={'– ' + ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.item}
                            />
                        </ListItem>
                    })}
                </List>
                <Typography variant={'body2'} color={'secondary'}>
                    { `Ingredients for ${recipeById.portionSize} portion${recipeById.portionSize !== '1' ? 's' : ''}`}
                </Typography>
            </Grid>
            <Grid item xs={3} className={'create__spacing'}>
                <Typography variant={"h6"} color={"secondary"}>
                    02
                </Typography>
                <Typography variant={"h5"}>
                    Instructions
                </Typography>
            </Grid>
            <Grid item xs={9} className={'create__spacing  detail__alignment'}>
                <List>
                    {recipeById.steps.map((step, index) => {
                        return <ListItem key={index}>
                            <ListItemText
                                primary={(index + 1) + '. ' + step.stepDescription}
                            />
                        </ListItem>
                    })}
                </List>
            </Grid>
            <Grid item xs={3} className={'create__spacing'}>
                <Typography variant={"h6"} color={"secondary"}>
                    03
                </Typography>
                <Typography variant={"h5"}>
                    Rating
                </Typography>
            </Grid>
            <Grid item xs={9} className={'create__spacing  detail__alignment'}>
                <div className={'detail__flex'}>
                    <StarIcon sx={{ display: 'inline' }} fontSize={'large'}
                              color={'primary'} />
                    <Typography variant={'h6'} sx={{ display: 'inline' }}
                                className={'detail__spacing'}>
                        {overAllRating}
                        {overAllRating === 1 ? ' Star': ' Stars'} – {ratings.length} Ratings
                    </Typography>
                </div>

                <List>
                    {ratings.map((rating, index) => {
                        return <RatingListItem  key={index} rating={rating} onFetchRating={fetchRatings} />
                    })}
                </List>
                <RatingForm id={recipeId} onFetchRating={fetchRatings}/>
            </Grid>
        </Grid>
    </Box>

};

export default RecipeDetail;