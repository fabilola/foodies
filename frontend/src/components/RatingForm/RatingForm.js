import {Rating, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {createRating} from "../../services/apiCalls";
import AppContext from "../../store/AppContext";

const RatingForm = (props) => {
    const [ratingText, setRatingText] = useState( '');
    const [starRating, setStarRating] = useState( 1);
    const [errorCheck, setErrorCheck] = useState(false);
    const { setMsg, setOpen } = useContext(AppContext);

    const onRatingTextChange = event => {
        setRatingText(event.target.value);
    }

    const onStarRatingChange = (event, newValue) => {
        setStarRating(newValue);
    }

    const validateFormInput = () => {
        setErrorCheck(true);
        return ratingText.trim().length !== 0;
    }

    const onRateButtonClick = () => {
        if (validateFormInput()){
            setErrorCheck(false);
            let rateObj = {ratingText, starRating}
            let requestBody = {
                recipeId: props.id,
                ...rateObj,
                time: new Date()
            }
            setStarRating(1);
            setRatingText('');
            const requestOptions = {
                method:  'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
                credentials: 'include'
            };
            createRating(requestOptions).then( (res) =>
            {
                    if (res.ok) {
                        setMsg('Rating successfully posted');
                        setOpen(true);
                        props.onFetchRating();
                    }
                }
            ).catch(() => {
                setMsg("Rating couldn't be posted, please try again later ");
                setOpen(true);
            });
        }
    }

    return <div>
        <Typography variant={'h6'}  gutterBottom={true} > What do you think?</Typography>
            <Rating
                name="customized-color"
                value={starRating}
                onChange={onStarRatingChange}
                precision={1.0}
                icon={<StarIcon fontSize="inherit" color={'primary'} />}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <TextField
                required={true}
                error={errorCheck && !ratingText}
                margin={'normal'}
                fullWidth={true}
                size={'small'}
                id="outlined-multiline-flexible"
                label={'Your opinion'}
                multiline
                value={ratingText}
                name={'ratingText'}
                onChange={onRatingTextChange}
            />
        {
            errorCheck &&
            <Typography variant={'caption'} color={'error'} component={'p'}>
                Please fill in all required fields marked with '*'
            </Typography>
        }
        <Button onClick={onRateButtonClick} variant={"contained"}> Rate Recipe</Button>
    </div>
};

export default RatingForm;