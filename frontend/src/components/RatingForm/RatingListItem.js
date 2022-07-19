import useFetchUserDataById from "../../hooks/useFetchUserDataById";
import {
    Avatar, ListItem, ListItemAvatar, ListItemText,
    Typography
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./RatingListItem.css"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import usePersonalProfile from "../../hooks/usePersonalProfile";
import {deleteRatingById} from "../../services/apiCalls";
import React, {useContext} from "react";
import AppContext from "../../store/AppContext";


const RatingListItem = (props) => {
    const [userData] = useFetchUserDataById(props.rating.creatorId);
    const { setMsg, setOpen} = useContext(AppContext);
    const stars = [];
    for ( let i = 0; i < props.rating.starRating; i++){
        stars.push(<StarIcon key={i} sx={{ display: 'inline' }} fontSize="small" color={'primary'} />)
    }
    const personalProfile = usePersonalProfile(props.rating.creatorId);

    const onDeleteRating = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        const id = props.rating._id;
        deleteRatingById(requestOptions, id)
            .then((res) => {
                if(res.ok){
                    setMsg('Successfully deleted rating');
                    setOpen(true);
                }
                props.onFetchRating();
            })
            .catch(() => {
                setMsg("Coudln't delete rating, please try again later");
                setOpen(true);
            });
    }

    return <div>
        <ListItem alignItems="flex-start" disableGutters={true} secondaryAction={
            personalProfile &&
            <IconButton edge="end" aria-label="comments" onClick={onDeleteRating}>
                <DeleteIcon />
            </IconButton>
        }>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={userData.image}  referrerPolicy="no-referrer"/>
            </ListItemAvatar>
            <ListItemText
                primary={props.rating.ratingText}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {userData.displayName}
                        </Typography>
                        {" — "} {
                        new Date(props.rating.time).
                        toLocaleString('en-US', {  year: 'numeric', month: 'long'})}
                        {" — "}
                        <span >
                            {stars}
                        </span>
                    </React.Fragment>
                }
            />
        </ListItem>
    </div>
}

export default RatingListItem;