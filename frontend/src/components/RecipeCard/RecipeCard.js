import './RecipeCard.css';
import {useNavigate} from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField,
    Typography
} from "@mui/material";
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import useFetchUserDataById from "../../hooks/useFetchUserDataById";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {createFavorite, deleteFavoriteById, sendMail} from "../../services/apiCalls";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useContext, useState} from "react";
import AppContext from "../../store/AppContext";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import IosShareIcon from '@mui/icons-material/IosShare';
import AuthContext from "../../store/AuthContext";
import Button from "@mui/material/Button";

const RecipeCard = props => {
    const navigate = useNavigate();
    const ctx = useContext(AppContext);
    const authCtx = useContext(AuthContext);
    const [userData] = useFetchUserDataById(props.data.creatorId);
    const [toMail, setToMail] = useState('');
    const [open, setOpen] = useState(false);
    const {fetchFavorites} = useFetchFavorites();
    const favorite = ctx.favorites.find(e => e.recipeId === props.data._id);
    const isFavorite = !!favorite;

    const onCardClickHandler = () => {
        navigate('/detail/'+ props.data._id, {state:{creatorData: userData}});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onToggleFavorite = () => {
        if (!isFavorite){
            const requestBody = {
                "recipeId" : props.data._id
            };
            const requestOptions = {
                method:  'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
                credentials: 'include'
            };
            createFavorite(requestOptions).then(
                (res) => {
                    if (res.ok) {
                        ctx.setMsg('Favorite successfully added');
                        ctx.setOpen(true);
                        fetchFavorites();
                    }
                }
            ).catch(() => {
                ctx.setMsg("Favorite couldn't be added, please try again later ");
                ctx.setOpen(true);
            })
        } else {
            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            };
            const id = favorite._id;
            deleteFavoriteById(requestOptions, id)
                .then((res) => {
                    if (res.ok) {
                        ctx.setMsg('Favorite successfully removed');
                        ctx.setOpen(true);
                        fetchFavorites();
                    }
                })
                .catch(() => {
                    ctx.setMsg("Favorite couldn't be removed, please try again later ");
                    ctx.setOpen(true);
                })
        }
    };

    const onEmailChange = event => {
        setToMail(event.target.value);
    }

    const onShareClick = () => {
        let recipe = props.data;
        const requestBody = {
            ...recipe,
            mail: toMail,
            displayName : authCtx.userData.data.displayName
        }
        const requestOptions = {
            method:  'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
            credentials: 'include'
        };

        sendMail(requestOptions).then((res)=>{
            setOpen(false);
            setToMail('');
            if(res.ok){
                ctx.setMsg('Successfully sent mail');
                ctx.setOpen(true);
            } else {
                ctx.setMsg("Mail couldn't be sent, please try again later ");
                ctx.setOpen(true);
            }
        }).catch();
    }

    const validateEmail = () => {
        return !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(toMail);
    }

    return (
    <div>
        <Card sx={{ maxWidth: 250}}>

                <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites" onClick={onToggleFavorite}>
                        {isFavorite ?
                            <FavoriteIcon color={'love'} />:
                            <FavoriteBorderIcon color={'love'} />
                        }
                    </IconButton>
                     <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
                        <IosShareIcon/>
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Share this Recipe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                to share this recipe with a friend, please enter the email address you would like to
                                send this recipe to.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                required
                                value={toMail}
                                onChange={onEmailChange}
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={onShareClick} disabled={validateEmail()}>Share</Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
                <CardActionArea onClick={onCardClickHandler}>
                    {
                        props.data.image ?
                            <CardMedia>
                                <img className={'recipeCard__img'} src={"data:image/jpeg;base64," + props.data.image}  alt="dish-photo"/>
                            </CardMedia>
                            :
                            <CardMedia>
                                <img className={'recipeCard__img'} src={require('../../assets/foodies_default.jpg')} alt="dish-photo"/>
                            </CardMedia>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div"
                                    textAlign={"left"}
                                    className={"recipeCard__bottom"}>
                            {props.data.recipeName}
                        </Typography>
                        <Typography gutterBottom variant="caption" component="div"
                                    textAlign={"left"}>
                            Recipe by {userData.displayName}
                        </Typography>
                        <div className={'recipeCard__description'}>
                            <div className={'recipeCard__description__box'} >
                                <AccessTimeOutlinedIcon fontSize={'small'} className={'recipeCard__icons'}/>
                                <Typography variant={'body2'}>{props.data.cookingTime + ' '} min</Typography>
                            </div>
                            <div className={'recipeCard__description__box'} >
                                <SpeedOutlinedIcon fontSize={'small'} className={'recipeCard__icons'}/>
                                <Typography variant={'body2'}>{props.data.difficulty}</Typography>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
        </Card>
    </div>
    )
};

export default RecipeCard;