import IconButton from "@mui/material/IconButton";
import {Menu, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React,{ useState} from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MoreMenu = (props) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return  <div style={{display: "flex",justifyContent: "start"}}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <MoreHorizIcon/>
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
            <MenuItem  onClick={props.onDeleteClick}>
                <DeleteIcon fontSize={'small'}/>
                <Typography textAlign="center">Delete
                </Typography>
            </MenuItem>
            <MenuItem  onClick={props.onEditClick}>
                <EditIcon fontSize={'small'}/>
                <Typography textAlign="center">Edit
                </Typography>
            </MenuItem>
        </Menu>
    </div>
};

export default MoreMenu;