import React, {useEffect, useState} from "react";
import {getUserData, logOut} from "../services/apiCalls";

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    userData: {}
});

export const AuthContextProvider = (props) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (data) => {
        setUserData(data);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        logOut().then((res)=>{
            if(res.ok){
                setUserData(null);
                setIsLoggedIn(false);
            }
        }).catch()
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userData: userData
    };

    useEffect(() => {
        getUserData().then((res) => {
            if( res.status === 204){
                logoutHandler();
            }
            else if (res.status === 200){
                res.json().then((r) => {
                    loginHandler(r)
                });
            }
        }).catch(() => {
            logoutHandler();
        })

    }, [isLoggedIn]);

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;