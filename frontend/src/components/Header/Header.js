import React, {Fragment, useContext} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@mui/material";
import HeaderThemeProvider from "../../theme/HeaderThemeProvider";
import AuthContext from "../../store/AuthContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return <Fragment>
        <HeaderThemeProvider>
            <AppBar elevation={1}>
                <Toolbar style={{justifyContent: "space-around"}}>
                    <div>
                        <Typography variant="h6" component="div" color={'secondary'} >
                            <NavLink
                                to=""
                                className={'header__logo'}
                            >
                                <img className={'header__logo__img'} alt={'logo'} src={require('../../assets/hat.png')}/>
                                foodies
                            </NavLink>
                        </Typography>
                    </div>
                    <div className={'header__flex'}>
                        {
                            isLoggedIn &&
                            <NavLink
                                className={'header__links'}
                                to="browse"
                                style={({ isActive }) => ({
                                    color: isActive ? 'orangered' : '#545e6f',
                                })}>
                                <Typography>Browse Recipes</Typography>
                            </NavLink>
                        }
                        {
                            isLoggedIn &&
                            <NavLink
                                className={'header__links'}
                                to="create"
                                style={({ isActive }) => ({
                                    color: isActive ? 'orangered' : '#545e6f',
                                })}>
                                <Typography  >Create Recipe</Typography>
                            </NavLink>
                        }
                        {
                            isLoggedIn &&
                            <NavLink
                                className={'header__links'}
                                to="favorite"
                                style={({ isActive }) => ({
                                    color: isActive ? 'orangered' : '#545e6f',
                                })}>
                                <Typography>Favorite Recipes</Typography>
                            </NavLink>
                        }
                    </div>
                    <div className={'header__flex'}>
                        {isLoggedIn &&
                            <ProfileMenu userData={authCtx.userData.data} logout={authCtx.logout}/>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </HeaderThemeProvider>
    </Fragment>
};

export default Header;