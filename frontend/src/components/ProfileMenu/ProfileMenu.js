import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {Menu, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React,{ useState} from "react";
import {useNavigate} from "react-router-dom";

const ProfileMenu = (props) => {
    const userData = props.userData;
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onProfileClick = () => {
        handleCloseUserMenu();
        navigate('/profile/'+ userData._id, {state:{profileData: userData}});
    }

    const onLogoutClick = () => {
        handleCloseUserMenu();
        props.logout();
    }

    return  <div>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="profile picture" src={userData.image} referrerPolicy="no-referrer"  />
        </IconButton>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorElUser}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem  onClick={onProfileClick}>
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem  onClick={onLogoutClick}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
    </div>
};

export default ProfileMenu;